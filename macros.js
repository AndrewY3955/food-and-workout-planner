/**
 * Macros Module - Client-side macro calculation engine
 * Handles real-time carbs, protein, and fats calculations
 */

const MacroCalculator = {
    // Target macro distribution percentages (customizable)
    targetPercentages: {
        carbs: 40,    // 40% of calories
        protein: 30,  // 30% of calories
        fats: 30      // 30% of calories
    },

    // Caloric values per gram
    caloriesPerGram: {
        carbs: 4,
        protein: 4,
        fats: 9
    },

    /**
     * Calculate macro targets based on total daily calories
     * Formula:
     * Carbs (g) = (Total Calories × Carb Percentage) / 4
     * Protein (g) = (Total Calories × Protein Percentage) / 4
     * Fats (g) = (Total Calories × Fat Percentage) / 9
     */
    calculateMacroTargets(totalCalories, percentages = null) {
        const percentages_to_use = percentages || this.targetPercentages;

        const carbCalories = totalCalories * (percentages_to_use.carbs / 100);
        const proteinCalories = totalCalories * (percentages_to_use.protein / 100);
        const fatCalories = totalCalories * (percentages_to_use.fats / 100);

        return {
            carbs: Math.round(carbCalories / this.caloriesPerGram.carbs),
            protein: Math.round(proteinCalories / this.caloriesPerGram.protein),
            fats: Math.round(fatCalories / this.caloriesPerGram.fats),
            percentages: percentages_to_use
        };
    },

    /**
     * Calculate macros from food logs
     * Sums all protein, carbs, fats consumed
     */
    calculateConsumedMacros(foodLogs) {
        return {
            carbs: Math.round(foodLogs.reduce((sum, log) => sum + (log.carbs || 0), 0)),
            protein: Math.round(foodLogs.reduce((sum, log) => sum + (log.protein || 0), 0)),
            fats: Math.round(foodLogs.reduce((sum, log) => sum + (log.fats || 0), 0))
        };
    },

    /**
     * Calculate macro percentages of consumed macros
     */
    calculateMacroPercentages(consumed) {
        const totalCalories = (consumed.carbs * 4) + (consumed.protein * 4) + (consumed.fats * 9);
        
        if (totalCalories === 0) {
            return { carbs: 0, protein: 0, fats: 0 };
        }

        return {
            carbs: Math.round((consumed.carbs * 4 / totalCalories) * 100),
            protein: Math.round((consumed.protein * 4 / totalCalories) * 100),
            fats: Math.round((consumed.fats * 9 / totalCalories) * 100)
        };
    },

    /**
     * Get progress percentage for a macro
     */
    getProgressPercentage(consumed, target) {
        if (target === 0) return 0;
        return Math.min((consumed / target) * 100, 100);
    },

    /**
     * Update macro percentages based on slider input
     * Updates the target percentages dynamically
     */
    updateMacroPercentages(carbs, protein, fats) {
        // Ensure percentages sum to 100
        const total = carbs + protein + fats;
        if (total !== 100) {
            console.warn(`Macro percentages must sum to 100%, got ${total}%`);
            return false;
        }

        this.targetPercentages = {
            carbs: carbs,
            protein: protein,
            fats: fats
        };

        // Save to storage
        const profile = Storage.getProfile();
        profile.macroPercentages = this.targetPercentages;
        Storage.saveProfile(profile);

        return true;
    },

    /**
     * Estimate calories from macros
     */
    estimateCaloriesFromMacros(carbs, protein, fats) {
        return (carbs * this.caloriesPerGram.carbs) + 
               (protein * this.caloriesPerGram.protein) + 
               (fats * this.caloriesPerGram.fats);
    },

    /**
     * Load macro percentages from user profile
     */
    loadFromProfile() {
        const profile = Storage.getProfile();
        if (profile && profile.macroPercentages) {
            this.targetPercentages = profile.macroPercentages;
        }
    }
};

// Initialize macro calculator with stored percentages
MacroCalculator.loadFromProfile();
