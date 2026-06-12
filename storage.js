/**
 * Storage Module - Browser localStorage API wrapper
 * Handles persistent data for user profiles, food logs, and workouts
 */

const Storage = {
    // Initialize default profile if not exists
    initProfile() {
        if (!this.getProfile()) {
            const defaultProfile = {
                userId: 'user_' + Date.now(),
                name: 'User',
                goalCalories: 2000,
                weight: 180, // lbs
                height: 70, // inches
                age: 30,
                activityLevel: 'moderate',
                macroPercentages: {
                    carbs: 40,
                    protein: 30,
                    fats: 30
                },
                createdAt: new Date().toISOString()
            };
            this.saveProfile(defaultProfile);
        }
    },

    // Profile Management
    getProfile() {
        const profile = localStorage.getItem('userProfile');
        return profile ? JSON.parse(profile) : null;
    },

    saveProfile(profile) {
        localStorage.setItem('userProfile', JSON.stringify(profile));
    },

    updateProfile(updates) {
        const profile = this.getProfile();
        const updated = { ...profile, ...updates };
        this.saveProfile(updated);
        return updated;
    },

    // Food Log Management
    getFoodLogs(date = null) {
        const targetDate = date ? new Date(date).toDateString() : new Date().toDateString();
        const allLogs = localStorage.getItem('foodLogs');
        const logs = allLogs ? JSON.parse(allLogs) : {};
        return logs[targetDate] || [];
    },

    addFoodLog(food, mealType = 'breakfast') {
        const targetDate = new Date().toDateString();
        const allLogs = localStorage.getItem('foodLogs');
        const logs = allLogs ? JSON.parse(allLogs) : {};
        
        if (!logs[targetDate]) {
            logs[targetDate] = [];
        }

        const foodEntry = {
            id: 'food_' + Date.now(),
            name: food.name,
            calories: food.calories,
            protein: food.protein || 0,
            carbs: food.carbs || 0,
            fats: food.fats || 0,
            mealType: mealType,
            quantity: food.quantity || 1,
            unit: food.unit || 'g',
            addedAt: new Date().toISOString()
        };

        logs[targetDate].push(foodEntry);
        localStorage.setItem('foodLogs', JSON.stringify(logs));
        return foodEntry;
    },

    removeFoodLog(foodId) {
        const targetDate = new Date().toDateString();
        const allLogs = localStorage.getItem('foodLogs');
        const logs = allLogs ? JSON.parse(allLogs) : {};
        
        if (logs[targetDate]) {
            logs[targetDate] = logs[targetDate].filter(item => item.id !== foodId);
            localStorage.setItem('foodLogs', JSON.stringify(logs));
        }
    },

    getFoodLogsByMealType(mealType, date = null) {
        const allLogs = this.getFoodLogs(date);
        return allLogs.filter(log => log.mealType === mealType);
    },

    // Workout Log Management
    getWorkoutLogs(date = null) {
        const targetDate = date ? new Date(date).toDateString() : new Date().toDateString();
        const allWorkouts = localStorage.getItem('workoutLogs');
        const workouts = allWorkouts ? JSON.parse(allWorkouts) : {};
        return workouts[targetDate] || [];
    },

    addWorkout(exercise, set, weight, reps, completed = false) {
        const targetDate = new Date().toDateString();
        const allWorkouts = localStorage.getItem('workoutLogs');
        const workouts = allWorkouts ? JSON.parse(allWorkouts) : {};
        
        if (!workouts[targetDate]) {
            workouts[targetDate] = [];
        }

        const workoutEntry = {
            id: 'workout_' + Date.now(),
            exercise: exercise,
            set: set,
            weight: weight,
            unit: 'lbs',
            reps: reps,
            completed: completed,
            addedAt: new Date().toISOString()
        };

        workouts[targetDate].push(workoutEntry);
        localStorage.setItem('workoutLogs', JSON.stringify(workouts));
        return workoutEntry;
    },

    updateWorkout(workoutId, updates) {
        const targetDate = new Date().toDateString();
        const allWorkouts = localStorage.getItem('workoutLogs');
        const workouts = allWorkouts ? JSON.parse(allWorkouts) : {};
        
        if (workouts[targetDate]) {
            const index = workouts[targetDate].findIndex(w => w.id === workoutId);
            if (index !== -1) {
                workouts[targetDate][index] = { ...workouts[targetDate][index], ...updates };
                localStorage.setItem('workoutLogs', JSON.stringify(workouts));
            }
        }
    },

    removeWorkout(workoutId) {
        const targetDate = new Date().toDateString();
        const allWorkouts = localStorage.getItem('workoutLogs');
        const workouts = allWorkouts ? JSON.parse(allWorkouts) : {};
        
        if (workouts[targetDate]) {
            workouts[targetDate] = workouts[targetDate].filter(w => w.id !== workoutId);
            localStorage.setItem('workoutLogs', JSON.stringify(workouts));
        }
    },

    // Daily Summary
    getDailySummary(date = null) {
        const foodLogs = this.getFoodLogs(date);
        const totalCalories = foodLogs.reduce((sum, log) => sum + log.calories, 0);
        const totalProtein = foodLogs.reduce((sum, log) => sum + log.protein, 0);
        const totalCarbs = foodLogs.reduce((sum, log) => sum + log.carbs, 0);
        const totalFats = foodLogs.reduce((sum, log) => sum + log.fats, 0);

        return {
            totalCalories,
            totalProtein,
            totalCarbs,
            totalFats,
            foodCount: foodLogs.length
        };
    },

    // Clear all data (for development/testing)
    clearAllData() {
        localStorage.removeItem('userProfile');
        localStorage.removeItem('foodLogs');
        localStorage.removeItem('workoutLogs');
        localStorage.removeItem('aiInsights');
    }
};

// Initialize storage on load
Storage.initProfile();