# Food & Workout Planner - Project Specification & Todo List

## 📋 Project Overview

**Food & Workout Planner** is a high-density, professional fitness dashboard application modeled after MyFitnessPal's corporate design system. The app is a client-side only solution (zero server overhead) that uses browser localStorage for persistent data management and deterministic rule-based AI for fitness insights.

### Core Philosophy
- **No Backend Required**: All data persists via localStorage API
- **Professional Design**: Clean, light-mode palette inspired by MyFitnessPal
- **High-Density UI**: Text-dense, compact tables and cards for efficient data display
- **Client-Side Math**: All calorie and macro calculations happen in the browser
- **Deterministic AI**: Rule-based insights without expensive API calls

---

## 🎨 Final Design Specifications

### Color Palette
- **Background**: Light Gray `#F4F5F7`
- **Cards/Containers**: Pure White `#FFFFFF`
- **Text**: Dark Charcoal `#2A2E33`
- **Primary Actions**: MyFitnessPal Blue `#0066EE`
- **Secondary Borders**: `#E8EAED`
- **Success/Green**: `#27AE60`
- **Warning/Orange**: `#F39C12`
- **Danger/Red**: `#E74C3C`

### Typography
- **Font Family**: System font stack (`-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`)
- **Header**: Bold, 24px
- **Section Titles**: Bold, 14px, Uppercase
- **Body Text**: 13px
- **Caption Text**: 12px, Gray

### Layout Framework
- **Framework**: Tailwind CSS (utility-first)
- **Sticky Header**: 56px fixed top with Dashboard title + profile icon
- **Max Width**: 1024px centered container on desktop
- **Padding**: 16px horizontal, 8px vertical (compact)
- **Border Radius**: 4px (crisp, not rounded)

---

## 🏗️ Application Architecture

### Module Structure

#### 1. **index.html** ✅ COMPLETED
Main entry point with:
- Sticky header with profile button
- Hero banner (Goal - Food = Remaining)
- Nutrition card with macro progress bars
- Food logging section (Breakfast, Lunch, Dinner, Snacks)
- Workout logger with split selector
- AI Coach insights panel

#### 2. **storage.js** ✅ COMPLETED
Browser localStorage wrapper providing:
- Profile management (goals, weight, age, macro percentages)
- Food log CRUD operations (organized by date)
- Workout log CRUD operations (organized by date)
- Daily summary calculations
- Data persistence without database

#### 3. **macros.js** ✅ COMPLETED
Mathematical macro calculation engine:
- Carbs (g) = (Total Calories × Carb %) / 4
- Protein (g) = (Total Calories × Protein %) / 4
- Fats (g) = (Total Calories × Fat %) / 9
- Consumed macro totals from food logs
- Progress percentage calculations
- Macro ratio adjustments

#### 4. **ai-engine.js** ✅ COMPLETED
Deterministic rule-based AI Coach:
- Calorie status evaluation
- Protein, carb, fat intake analysis
- Workout logging recognition
- Performance score (0-100)
- Personalized recommendations
- Status badges (Excellent, Great, Good, Fair, Getting Started)

#### 5. **app.js** ✅ COMPLETED
Main application controller:
- Dashboard class for UI rendering
- Event listener attachment
- State management
- Auto-refresh every 60 seconds
- Modal interactions for adding food/workouts

---

## ✅ COMPLETED FEATURES

### Phase 1: Core Infrastructure ✅
- [x] Professional MyFitnessPal-inspired UI layout
- [x] Tailwind CSS design system implementation
- [x] Sticky header with profile button
- [x] Hero banner (Goal - Food = Remaining calculation)
- [x] localStorage-based data persistence
- [x] Profile initialization with defaults

### Phase 2: Macro Calculations ✅
- [x] Real-time calorie tracking
- [x] Carbs/Protein/Fats macro calculations
- [x] Progress bar rendering (0-100%)
- [x] Consumed vs. target display
- [x] Dynamic macro percentage support

### Phase 3: Food Logging ✅
- [x] Food log CRUD operations
- [x] Meal type organization (Breakfast, Lunch, Dinner, Snacks)
- [x] Calorie/macro input
- [x] Delete food items
- [x] Daily summary totals

### Phase 4: Workout Logging ✅
- [x] Workout CRUD operations
- [x] Exercise name, sets, weight, reps tracking
- [x] Completion checkboxes
- [x] Workout notes field
- [x] Split type selector (PPL, Upper/Lower, Full Body, Bro Split)

### Phase 5: AI Coach Engine ✅
- [x] Rule-based deterministic insights
- [x] Calorie status evaluation
- [x] Macro balance recommendations
- [x] Workout recognition
- [x] Performance scoring (0-100)
- [x] Status badges
- [x] Personalized recommendations array

---

## 📝 TODO: Future Enhancements

### Phase 6: Enhanced Food Logging
- [ ] Food database/search integration (optional API like USDA FoodData Central)
- [ ] Barcode scanner functionality (using device camera API)
- [ ] Quick-add preset foods (chicken breast, rice, eggs, etc.)
- [ ] Portion size presets (oz, grams, cups, servings)
- [ ] Meal templates (save common meal combos)
- [ ] Recipe builder (combine multiple foods)
- [ ] Favorite foods quick access

### Phase 7: Advanced Workout Features
- [ ] Workout program templates (PPL, GZCLP, 5/3/1, etc.)
- [ ] Exercise database with form videos
- [ ] One-rep max (1RM) calculator
- [ ] Progression tracking (weight/reps over time)
- [ ] Rest day management
- [ ] Volume tracking (sets × reps × weight)
- [ ] Workout history charts

### Phase 8: Analytics & Visualizations
- [ ] Weekly calorie trending chart
- [ ] Macro distribution pie chart
- [ ] Historical macro tracking
- [ ] Workout streak counter
- [ ] Daily consistency heatmap
- [ ] Body weight trend (optional manual entry)
- [ ] Performance metrics dashboard

### Phase 9: User Settings & Customization
- [ ] Profile setup modal (first-run onboarding)
- [ ] Calorie goal adjustment
- [ ] Macro percentage sliders (instead of fixed 40/30/30)
- [ ] Weight unit toggle (lbs/kg)
- [ ] Date range picker (view past days)
- [ ] Data export (CSV/JSON)
- [ ] Settings page (theme, language, notifications)

### Phase 10: Mobile Optimization
- [ ] Touch-friendly button sizes (48x48px minimum)
- [ ] Swipe navigation between days
- [ ] Fullscreen food input modal
- [ ] Optimized keyboard behavior
- [ ] Mobile-specific layout adjustments
- [ ] Offline mode support
- [ ] PWA manifest for app-like experience

### Phase 11: Social & Sharing
- [ ] Daily summary share screenshot
- [ ] Progress photos storage
- [ ] Social integrations (optional)
- [ ] Achievement badges
- [ ] Weekly email digest

### Phase 12: Advanced AI Features
- [ ] Meal timing suggestions (based on workout schedule)
- [ ] Macro adjustment recommendations (based on progress)
- [ ] Adaptive calorie targets
- [ ] Injury/recovery protocol suggestions
- [ ] Personalized food swaps (keep same macros, better nutrition)

---

## 🔧 Technical Implementation Details

### Current Tech Stack
```
Frontend:    HTML5 + Tailwind CSS + Vanilla JavaScript (ES6+)
State:       Browser localStorage API
Math:        Client-side calculations (no external APIs)
Data:        JSON in localStorage
Persistence: Browser cache (survives page refresh)
```

### Key Functions by Module

**Storage Module**
```javascript
Storage.initProfile()               // Initialize with defaults
Storage.getProfile()                // Retrieve user profile
Storage.addFoodLog(food, mealType)  // Log food item
Storage.getFoodLogs(date)           // Get daily food logs
Storage.getWorkoutLogs(date)        // Get daily workouts
Storage.getDailySummary()           // Get daily totals
```

**MacroCalculator Module**
```javascript
MacroCalculator.calculateMacroTargets(calories)      // Calc carbs/protein/fats targets
MacroCalculator.calculateConsumedMacros(foodLogs)    // Sum macros from logs
MacroCalculator.getProgressPercentage(consumed, target) // 0-100% progress
MacroCalculator.updateMacroPercentages(c, p, f)     // Adjust macro split
```

**AICoach Module**
```javascript
AICoach.generateInsight()           // Smart fitness insight
AICoach.generateRecommendations()   // Array of recommendations
AICoach.calculatePerformanceScore() // 0-100 score
AICoach.getStatusBadge()            // Status emoji + text
```

**Dashboard Controller**
```javascript
Dashboard.render()                  // Full UI refresh
Dashboard.updateQuickStats()        // Goal - Food = Remaining
Dashboard.updateNutritionCard()     // Macro progress bars
Dashboard.updateFoodLog()           // Food table rendering
Dashboard.updateWorkoutLog()        // Workout table rendering
Dashboard.updateAICoach()           // AI insights panel
```

---

## 📊 Data Schema (localStorage)

### Profile Object
```json
{
  "userId": "user_1718198400000",
  "name": "User",
  "goalCalories": 2000,
  "weight": 180,
  "height": 70,
  "age": 30,
  "activityLevel": "moderate",
  "macroPercentages": {
    "carbs": 40,
    "protein": 30,
    "fats": 30
  },
  "createdAt": "2026-06-12T18:15:00Z"
}
```

### Food Log Object
```json
{
  "id": "food_1718198400123",
  "name": "Chicken Breast",
  "calories": 165,
  "protein": 31,
  "carbs": 0,
  "fats": 3.6,
  "mealType": "lunch",
  "quantity": 100,
  "unit": "g",
  "addedAt": "2026-06-12T12:30:00Z"
}
```

### Workout Log Object
```json
{
  "id": "workout_1718198400456",
  "exercise": "Bench Press",
  "set": 1,
  "weight": 225,
  "unit": "lbs",
  "reps": 8,
  "completed": true,
  "addedAt": "2026-06-12T06:00:00Z"
}
```

---

## 🎯 Success Metrics

### v1.0 Goals (Current - ✅ COMPLETED)
- [x] Functional dashboard with all core sections
- [x] Add/remove food and workout entries
- [x] Real-time macro calculations
- [x] Persistent data storage
- [x] Professional MyFitnessPal-inspired UI
- [x] Deterministic AI coaching

### v1.1 Goals (Next Priority)
- [ ] Enhanced food input UX (modals instead of prompts)
- [ ] Barcode scanner for food lookup
- [ ] Workout templates and presets
- [ ] Better mobile responsiveness

### v2.0 Goals (Long-term Vision)
- [ ] Analytics dashboard with charts
- [ ] Historical data visualization
- [ ] Advanced AI recommendations
- [ ] Social/sharing features

---

## 🚀 How to Use

### Initial Setup
1. Open `index.html` in a modern web browser
2. App automatically initializes with default profile (2000 cal goal)
3. Click profile icon to customize calorie goal

### Daily Usage
1. **Log Breakfast**: Click "+ ADD FOOD" under Breakfast section
2. **Fill in Details**: Food name, calories, protein, carbs, fats
3. **Repeat for Lunch/Dinner/Snacks**: Track throughout day
4. **Log Workout**: Enter exercise, sets, weight, reps
5. **Check AI Coach**: See personalized insights update in real-time
6. **Data Persists**: All data saved to browser localStorage

### Data Persistence
- All data stored in browser's localStorage
- Survives page refresh, browser close, and restart
- No cloud sync (v1.0 by design)
- Clear data: Open DevTools Console → `Storage.clearAllData()`

---

## 🐛 Known Limitations (v1.0)

1. **UI Uses Prompts**: Food/workout entry uses `prompt()` dialogs (not ideal UX)
2. **No Food Database**: Must manually enter macro values
3. **No Barcode Scanner**: Placeholder only
4. **Desktop-Focused**: Limited mobile optimization
5. **Single User**: No multi-profile support
6. **No Sync**: Data not synced across devices
7. **No History Visualization**: Can't see charts/trends yet

---

## 📦 File Structure
```
food-and-workout-planner/
├── index.html        # Main dashboard HTML
├── storage.js        # localStorage wrapper
├── macros.js         # Macro calculation engine
├── ai-engine.js      # Rule-based AI coach
├── app.js            # Dashboard controller
├── README.md         # This file
└── SPEC.md           # Full specification (this file)
```

---

## 🔐 Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support (iOS 12.2+)
- Mobile browsers: ✅ Basic support (optimize in Phase 10)

---

## 📄 License & Attribution

This project uses:
- **Tailwind CSS**: MIT License
- **MyFitnessPal Design Inspiration**: UI/UX pattern reference only
- **Font Stack**: System fonts (no external dependencies)

---

## 📞 Support & Feedback

For issues, enhancements, or questions:
1. Check the TODO list above
2. Review the Data Schema section
3. Inspect localStorage via DevTools Console: `JSON.parse(localStorage.getItem('userProfile'))`

---

**Last Updated**: June 12, 2026  
**Current Version**: 1.0  
**Status**: ✅ MVP COMPLETE - Ready for Phase 6+ enhancements
