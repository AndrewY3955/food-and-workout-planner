# 🍎 Food & Workout Planner

A professional fitness dashboard application inspired by MyFitnessPal's design system. Track food intake, log workouts, and get real-time AI coaching—all running in your browser with zero server overhead.

## ✨ Features

### 🎯 Core Dashboard
- **Hero Banner**: Goal - Food = Remaining calorie calculation
- **Macro Progress Bars**: Real-time carbs, protein, fats tracking
- **High-Density UI**: Professional, text-dense layout
- **Sticky Header**: Easy access to profile settings

### 🍽️ Food Logging
- Track meals by type: Breakfast, Lunch, Dinner, Snacks
- Log calories, protein, carbs, and fats
- Add/remove food entries instantly
- Daily summary totals

### 💪 Workout Logging
- Log exercises with sets, weight, and reps
- Track completion status
- Performance notes field
- Multiple split types (PPL, Upper/Lower, Full Body, Bro Split)

### 🤖 AI Coach Engine
- Deterministic rule-based insights (no API calls)
- Personalized recommendations
- Performance scoring (0-100)
- Status badges (Excellent, Great, Good, Fair, Getting Started)

### 💾 Data Persistence
- Browser localStorage—no backend required
- Data survives page refresh and browser close
- All data stored locally on your device

## 🎨 Design System

**Color Palette**
- Background: `#F4F5F7` (Light Gray)
- Cards: `#FFFFFF` (Pure White)
- Text: `#2A2E33` (Dark Charcoal)
- Primary: `#0066EE` (MyFitnessPal Blue)

**Built With**
- HTML5
- Tailwind CSS (utility-first styling)
- Vanilla JavaScript (ES6+)
- Browser localStorage API

## 🚀 Quick Start

1. **Open in Browser**: Simply open `index.html` in any modern web browser
2. **No Installation**: Zero dependencies, no build step required
3. **Start Logging**: Click the meal sections to add food or workouts
4. **Data Saves Automatically**: All information stored locally

### Example Usage

```javascript
// Add a food log
Storage.addFoodLog(
  {
    name: 'Chicken Breast',
    calories: 165,
    protein: 31,
    carbs: 0,
    fats: 3.6
  },
  'lunch'
);

// Get daily summary
const summary = Storage.getDailySummary();
console.log(summary.totalCalories); // Total calories logged today
```

## 📊 Project Structure

```
food-and-workout-planner/
├── index.html          # Main dashboard (UI)
├── storage.js          # localStorage wrapper (Data)
├── macros.js           # Macro calculation engine (Math)
├── ai-engine.js        # Rule-based AI coach (Logic)
├── app.js              # Dashboard controller (State)
├── modals.js           # Modal forms for data input (UX)
├── README.md           # This file
└── SPECIFICATION.md    # Complete spec & roadmap
```

## 🧮 How It Works

### Macro Calculations
The app uses client-side formulas to calculate daily macro targets:

```
Carbs (g)   = (Total Calories × 40%) / 4
Protein (g) = (Total Calories × 30%) / 4
Fats (g)    = (Total Calories × 30%) / 9
```

### AI Insights
The AI Coach evaluates your daily data and generates insights:
- ✅ Calorie accuracy vs. goal
- ✅ Macro balance (carbs, protein, fats)
- ✅ Workout logging consistency
- ✅ Performance scoring

## 📝 Default Settings

```json
{
  "goalCalories": 2000,
  "weight": 180,
  "height": 70,
  "age": 30,
  "macroPercentages": {
    "carbs": 40,
    "protein": 30,
    "fats": 30
  }
}
```

**Customize** by clicking the profile icon in the top-right corner.

## 🔍 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (12.2+)
- ✅ Mobile browsers (basic support)

## 📚 Documentation

- **Full Specification**: See `SPECIFICATION.md` for complete technical details, data schema, and development roadmap
- **Storage API**: All data management via browser localStorage
- **Macro Math**: Real-time calculations with no external APIs

## 🎯 Current Version

**v1.0.1 - Enhanced Input UX** 🚀

### What's Included
- [x] Professional MyFitnessPal-inspired UI
- [x] Full food & workout logging
- [x] Real-time macro calculations
- [x] Deterministic AI coaching
- [x] Browser-based data persistence
- [x] Modal forms (replaces prompt dialogs)
- [x] Input validation
- [x] Delete confirmations

### Coming Soon (Phase 6+)
- [ ] Food presets (quick-add common items)
- [ ] Barcode scanner
- [ ] Workout templates
- [ ] Analytics & charts
- [ ] Mobile optimization
- See `SPECIFICATION.md` for full roadmap

## 🛠️ Development

### No Build Required
Simply edit HTML/JS files and refresh your browser. Tailwind CSS is loaded via CDN.

### Debugging
Open browser DevTools Console to access storage directly:

```javascript
// View user profile
Storage.getProfile()

// View today's food logs
Storage.getFoodLogs()

// Clear all data (for testing)
Storage.clearAllData()
```

## 💡 Tips

1. **Mobile Use**: Open on your phone for on-the-go tracking
2. **Bookmarks**: Bookmark `index.html` for quick access
3. **Offline**: Works completely offline after first load
4. **Data Export**: Copy localStorage data to backup manually

## 📄 License

MIT License - Feel free to fork, modify, and use

## 🤝 Contributing

Want to help? Check `SPECIFICATION.md` for the development roadmap and submit pull requests!

---

**Built with ❤️ for fitness tracking efficiency**
