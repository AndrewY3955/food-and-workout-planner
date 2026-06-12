/**
 * AI Coach Engine - Rule-Based Deterministic Logic
 * Generates personalized fitness insights based on user data
 * No external API calls - all logic is client-side
 */

const AICoach = {
    // Rules evaluation matrices
    rules: {
        calorieStatus: [
            { condition: (logged, goal) => logged > goal * 1.1, insight: 'You\'re exceeding your calorie goal by over 10%. Consider portion control or lighter meals.' },
            { condition: (logged, goal) => logged > goal * 0.95, insight: 'You\'re close to your calorie target. Great job tracking!' },
            { condition: (logged, goal) => logged >= goal * 0.8 && logged <= goal * 0.95, insight: 'You\'re tracking well and within your goal range.' },
            { condition: (logged, goal) => logged < goal * 0.5, insight: 'You\'re significantly under your calorie goal. Make sure you\'re eating enough.' },
            { condition: (logged, goal) => true, insight: 'Keep logging your meals for personalized insights.' }
        ],
        
        proteinStatus: [
            { condition: (consumed, target) => consumed >= target * 0.95, insight: 'Excellent protein intake! You\'re hitting your target.' },
            { condition: (consumed, target) => consumed >= target * 0.75, insight: 'Good protein intake. Try to add a bit more to reach your target.' },
            { condition: (consumed, target) => true, insight: 'Increase protein sources like chicken, eggs, or Greek yogurt.' }
        ],

        carbsStatus: [
            { condition: (consumed, target) => consumed >= target * 0.95, insight: 'Your carb intake is optimized for your goals.' },
            { condition: (consumed, target) => consumed < target * 0.5, insight: 'Your carb intake is low. Add carbs around your workouts for energy.' },
            { condition: (consumed, target) => true, insight: 'Your carbs are balanced. Keep it steady.' }
        ],

        fatsStatus: [
            { condition: (consumed, target) => consumed >= target * 0.95, insight: 'Fat intake is on point. Good job with healthy fats!' },
            { condition: (consumed, target) => consumed < target * 0.5, insight: 'Include healthy fats like avocados, nuts, and olive oil.' },
            { condition: (consumed, target) => true, insight: 'Your fat intake is appropriate.' }
        ],

        workoutStatus: [
            { condition: (logs) => logs.length >= 5, insight: '💪 Outstanding! You\'ve logged 5+ exercises today. Great workout!' },
            { condition: (logs) => logs.length >= 3, insight: '🏋️ Solid workout session! You\'re on track.' },
            { condition: (logs) => logs.length >= 1, insight: '✓ Good start! Keep the momentum going.' },
            { condition: (logs) => true, insight: 'No workouts logged yet. Add your exercises to track progress.' }
        ]
    },

    /**
     * Evaluate a single rule against conditions
     */
    evaluateRule(ruleArray, ...args) {
        for (const rule of ruleArray) {
            if (rule.condition(...args)) {
                return rule.insight;
            }
        }
        return 'Keep tracking!';
    },

    /**
     * Generate AI insight based on current daily data
     */
    generateInsight() {
        const profile = Storage.getProfile();
        const summary = Storage.getDailySummary();
        const foodLogs = Storage.getFoodLogs();
        const workoutLogs = Storage.getWorkoutLogs();

        const goalCalories = profile.goalCalories;
        const macroTargets = MacroCalculator.calculateMacroTargets(goalCalories);
        const consumedMacros = MacroCalculator.calculateConsumedMacros(foodLogs);

        // Evaluate different aspects
        let primaryInsight = '';

        // Determine primary focus
        if (summary.foodCount === 0) {
            primaryInsight = '📊 Start by logging your breakfast to unlock personalized insights.';
        } else if (summary.totalCalories > goalCalories * 1.15) {
            primaryInsight = this.evaluateRule(this.rules.calorieStatus, summary.totalCalories, goalCalories);
        } else if (summary.totalCalories < goalCalories * 0.5) {
            primaryInsight = '🥗 You\'re significantly under your calorie goal. Add more nutritious meals throughout the day.';
        } else if (consumedMacros.protein < macroTargets.protein * 0.7) {
            primaryInsight = '🍗 Your protein is low. Add protein-rich foods like chicken, fish, or legumes.';
        } else if (workoutLogs.length === 0) {
            primaryInsight = '🏃 No workouts logged today. Add your exercise session to complete your fitness profile!';
        } else {
            primaryInsight = this.evaluateRule(this.rules.calorieStatus, summary.totalCalories, goalCalories);
        }

        return primaryInsight;
    },

    /**
     * Generate recommendation array
     */
    generateRecommendations() {
        const profile = Storage.getProfile();
        const summary = Storage.getDailySummary();
        const foodLogs = Storage.getFoodLogs();
        const workoutLogs = Storage.getWorkoutLogs();

        const goalCalories = profile.goalCalories;
        const macroTargets = MacroCalculator.calculateMacroTargets(goalCalories);
        const consumedMacros = MacroCalculator.calculateConsumedMacros(foodLogs);

        const recommendations = [];

        // Calorie recommendations
        if (summary.totalCalories === 0) {
            recommendations.push('Start logging meals to see personalized advice');
        } else if (summary.totalCalories > goalCalories) {
            recommendations.push('Your calories are above target—consider lighter dinner options');
        } else if (summary.totalCalories < goalCalories * 0.6) {
            recommendations.push('Add a healthy snack to reach your calorie goal');
        }

        // Protein recommendations
        if (consumedMacros.protein < macroTargets.protein * 0.8) {
            recommendations.push('Boost protein: add Greek yogurt, eggs, or lean meat');
        }

        // Carb recommendations
        if (consumedMacros.carbs < macroTargets.carbs * 0.7 && workoutLogs.length > 0) {
            recommendations.push('You worked out today—carb up before/after for recovery');
        }

        // Workout recommendations
        if (workoutLogs.length === 0) {
            recommendations.push('Log your workout to track progress');
        } else if (workoutLogs.length < 3) {
            recommendations.push('Add more exercises to complete your session');
        }

        // Daily consistency
        if (summary.foodCount >= 3 && workoutLogs.length >= 3) {
            recommendations.push('🔥 Excellent consistency today! Keep up the great work');
        }

        return recommendations.length > 0 ? recommendations : ['Keep logging to unlock more insights'];
    },

    /**
     * Calculate performance score (0-100)
     */
    calculatePerformanceScore() {
        const profile = Storage.getProfile();
        const summary = Storage.getDailySummary();
        const foodLogs = Storage.getFoodLogs();
        const workoutLogs = Storage.getWorkoutLogs();

        const goalCalories = profile.goalCalories;
        const macroTargets = MacroCalculator.calculateMacroTargets(goalCalories);
        const consumedMacros = MacroCalculator.calculateConsumedMacros(foodLogs);

        let score = 0;

        // Calorie accuracy (40 points)
        const calorieAccuracy = Math.abs(summary.totalCalories - goalCalories) / goalCalories;
        score += Math.max(0, 40 - (calorieAccuracy * 40));

        // Macro balance (40 points)
        const proteinAccuracy = Math.min(1, consumedMacros.protein / macroTargets.protein);
        const carbAccuracy = Math.min(1, consumedMacros.carbs / macroTargets.carbs);
        const fatAccuracy = Math.min(1, consumedMacros.fats / macroTargets.fats);
        score += (proteinAccuracy + carbAccuracy + fatAccuracy) / 3 * 40;

        // Workout logging (20 points)
        score += Math.min(20, workoutLogs.length * 4);

        return Math.round(score);
    },

    /**
     * Get status badge based on performance
     */
    getStatusBadge() {
        const score = this.calculatePerformanceScore();
        if (score >= 90) return '🌟 Excellent';
        if (score >= 75) return '✅ Great';
        if (score >= 60) return '📈 Good';
        if (score >= 40) return '⚠️ Fair';
        return '📋 Getting Started';
    }
};
