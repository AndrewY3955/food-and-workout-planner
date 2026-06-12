/**
 * Main Application Controller
 * Handles UI rendering, event listeners, and state updates
 */

class Dashboard {
    constructor() {
        this.profile = Storage.getProfile();
        this.init();
    }

    init() {
        this.render();
        this.attachEventListeners();
        this.startAutoRefresh();
    }

    /**
     * Main render function - updates all dashboard sections
     */
    render() {
        this.updateQuickStats();
        this.updateNutritionCard();
        this.updateFoodLog();
        this.updateWorkoutLog();
        this.updateAICoach();
    }

    /**
     * Update the hero banner with Goal - Food = Remaining
     */
    updateQuickStats() {
        const profile = Storage.getProfile();
        const summary = Storage.getDailySummary();

        const goalCalories = profile.goalCalories;
        const foodLogged = summary.totalCalories;
        const remaining = Math.max(0, goalCalories - foodLogged);

        document.getElementById('goal-calories').textContent = goalCalories.toLocaleString();
        document.getElementById('food-logged').textContent = foodLogged.toLocaleString();
        document.getElementById('remaining-calories').textContent = remaining.toLocaleString();

        // Update remaining color based on status
        const remainingElement = document.getElementById('remaining-calories');
        if (remaining < 0) {
            remainingElement.style.color = '#E74C3C'; // Red for over
        } else if (remaining < 200) {
            remainingElement.style.color = '#F39C12'; // Orange for close
        } else {
            remainingElement.style.color = '#0066EE'; // Blue for normal
        }
    }

    /**
     * Update macro progress bars and consumption display
     */
    updateNutritionCard() {
        const profile = Storage.getProfile();
        const foodLogs = Storage.getFoodLogs();

        const goalCalories = profile.goalCalories;
        const macroTargets = MacroCalculator.calculateMacroTargets(goalCalories);
        const consumedMacros = MacroCalculator.calculateConsumedMacros(foodLogs);

        // Carbs
        const carbsProgress = MacroCalculator.getProgressPercentage(consumedMacros.carbs, macroTargets.carbs);
        document.getElementById('carbs-progress').style.width = carbsProgress + '%';
        document.getElementById('carbs-display').textContent = `${consumedMacros.carbs} / ${macroTargets.carbs}g`;

        // Protein
        const proteinProgress = MacroCalculator.getProgressPercentage(consumedMacros.protein, macroTargets.protein);
        document.getElementById('protein-progress').style.width = proteinProgress + '%';
        document.getElementById('protein-display').textContent = `${consumedMacros.protein} / ${macroTargets.protein}g`;

        // Fats
        const fatsProgress = MacroCalculator.getProgressPercentage(consumedMacros.fats, macroTargets.fats);
        document.getElementById('fats-progress').style.width = fatsProgress + '%';
        document.getElementById('fats-display').textContent = `${consumedMacros.fats} / ${macroTargets.fats}g`;
    }

    /**
     * Render food logs organized by meal type
     */
    updateFoodLog() {
        const mealTypes = ['breakfast', 'lunch', 'dinner', 'snacks'];

        mealTypes.forEach(mealType => {
            const logs = Storage.getFoodLogsByMealType(mealType);
            const tbody = document.getElementById(`${mealType}-items`);
            tbody.innerHTML = '';

            if (logs.length === 0) {
                tbody.innerHTML = '<tr><td colspan="3" class="text-center text-gray-400 py-3 text-xs">No items logged</td></tr>';
            } else {
                logs.forEach(log => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td class="text-left">
                            <span class="font-medium text-sm">${log.name}</span>
                            <span class="text-xs text-gray-500 ml-1">${log.quantity}${log.unit}</span>
                        </td>
                        <td class="text-right font-bold text-sm">${log.calories}</td>
                        <td class="text-center">
                            <button class="text-red-500 hover:text-red-700 cursor-pointer font-bold" onclick="Dashboard.instance.removeFoodItem('${log.id}')">×</button>
                        </td>
                    `;
                    tbody.appendChild(row);
                });
            }
        });

        // Add sample ADD FOOD button handlers
        document.querySelectorAll('.btn-text').forEach((btn, idx) => {
            if (btn.textContent.includes('ADD FOOD')) {
                btn.addEventListener('click', () => this.showFoodAddDialog());
            }
            if (btn.textContent.includes('SCAN')) {
                btn.addEventListener('click', () => this.showBarcodeScanner());
            }
        });
    }

    /**
     * Render workout logs in tabular format
     */
    updateWorkoutLog() {
        const workoutLogs = Storage.getWorkoutLogs();
        const tbody = document.getElementById('workout-items');
        tbody.innerHTML = '';

        if (workoutLogs.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" class="text-center text-gray-400 py-3 text-xs">No workouts logged</td></tr>';
        } else {
            workoutLogs.forEach(log => {
                const row = document.createElement('tr');
                const isCompleted = log.completed ? '✓' : '';
                row.innerHTML = `
                    <td class="text-left font-medium text-sm">${log.exercise}</td>
                    <td class="text-center">${log.set}</td>
                    <td class="text-center">${log.weight} ${log.unit}</td>
                    <td class="text-center">${log.reps}</td>
                    <td class="text-center">
                        <input type="checkbox" ${log.completed ? 'checked' : ''} 
                               onchange="Dashboard.instance.toggleWorkoutCompletion('${log.id}', this.checked)"
                               class="w-4 h-4 cursor-pointer">
                    </td>
                `;
                tbody.appendChild(row);
            });
        }

        // Load notes if exists
        const savedNotes = localStorage.getItem('workoutNotes');
        document.getElementById('workout-notes').value = savedNotes || '';
    }

    /**
     * Update AI Coach insights and recommendations
     */
    updateAICoach() {
        const insight = AICoach.generateInsight();
        const recommendations = AICoach.generateRecommendations();
        const status = AICoach.getStatusBadge();

        document.getElementById('ai-insight').textContent = insight;

        const recList = document.getElementById('ai-recommendations');
        recList.innerHTML = '';
        recommendations.forEach(rec => {
            const li = document.createElement('li');
            li.textContent = rec;
            recList.appendChild(li);
        });
    }

    /**
     * Event listeners
     */
    attachEventListeners() {
        // Save workout notes
        document.getElementById('workout-notes').addEventListener('change', (e) => {
            localStorage.setItem('workoutNotes', e.target.value);
        });

        // Save workout button
        document.querySelector('.btn-primary').addEventListener('click', () => {
            this.saveWorkout();
        });

        // Recalculate metrics button
        const buttons = document.querySelectorAll('.btn-primary');
        buttons[buttons.length - 1].addEventListener('click', () => {
            this.recalculateMetrics();
        });

        // Profile button
        document.getElementById('profile-btn').addEventListener('click', () => {
            this.showProfileModal();
        });
    }

    /**
     * Remove food item from log
     */
    removeFoodItem(foodId) {
        Storage.removeFoodLog(foodId);
        this.render();
    }

    /**
     * Toggle workout completion
     */
    toggleWorkoutCompletion(workoutId, completed) {
        Storage.updateWorkout(workoutId, { completed });
        this.render();
    }

    /**
     * Save workout to storage
     */
    saveWorkout() {
        const exercise = prompt('Enter exercise name:');
        if (!exercise) return;

        const set = prompt('Enter set number:') || 1;
        const weight = prompt('Enter weight (lbs/kg):') || 0;
        const reps = prompt('Enter reps:') || 0;

        Storage.addWorkout(exercise, parseInt(set), parseFloat(weight), parseInt(reps));
        this.render();
        alert('Workout saved!');
    }

    /**
     * Show food add dialog (simplified version)
     */
    showFoodAddDialog() {
        const foodName = prompt('Enter food name:');
        if (!foodName) return;

        const calories = prompt('Enter calories:') || 0;
        const protein = prompt('Enter protein (g):') || 0;
        const carbs = prompt('Enter carbs (g):') || 0;
        const fats = prompt('Enter fats (g):') || 0;

        const mealType = prompt('Meal type (breakfast/lunch/dinner/snacks):') || 'breakfast';

        Storage.addFoodLog(
            {
                name: foodName,
                calories: parseFloat(calories),
                protein: parseFloat(protein),
                carbs: parseFloat(carbs),
                fats: parseFloat(fats)
            },
            mealType
        );
        this.render();
    }

    /**
     * Barcode scanner placeholder
     */
    showBarcodeScanner() {
        alert('Barcode scanner feature coming soon!');
    }

    /**
     * Show profile modal
     */
    showProfileModal() {
        const profile = Storage.getProfile();
        const goalCalories = prompt('Enter daily calorie goal:', profile.goalCalories);
        if (goalCalories) {
            Storage.updateProfile({ goalCalories: parseFloat(goalCalories) });
            this.render();
        }
    }

    /**
     * Recalculate metrics
     */
    recalculateMetrics() {
        this.render();
        alert('Metrics recalculated!');
    }

    /**
     * Auto-refresh every minute
     */
    startAutoRefresh() {
        setInterval(() => {
            this.render();
        }, 60000);
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    Dashboard.instance = new Dashboard();
});