# Part 1: Basic JavaScript & CSS

## Overview
This project contains solutions for the XSF FullStack Developer Test - Part 1, which focuses on basic JavaScript functions and CSS styling.

## Project Structure
```
PT1_BasicJS_CSS/
├── index.html          # Main HTML file to display all solutions
├── css/
│   └── styles.css      # Styling for the demo page
├── js/
│   ├── main.js         # Combined JavaScript with all functions
│   ├── question-a.js   # Question A: Convert Tel Format
│   ├── question-b.js   # Question B: Convert Contact Format
│   ├── question-c.js   # Question C: Filter and Sort by Age
│   └── question-d.js   # Question D: Display Bullet List
└── README.md           # This file
```

## Questions & Solutions

### Question A: Convert Tel Format
**Objective:** Merge telephone numbers for entries with the same code.

**Input:**
```javascript
[
  { name: "Alex", tel: "0991112222", code: "xsf0001" },
  { name: "Jane", tel: "0812221234", code: "xsf0002" },
  { name: "Alex", tel: "0832214433", code: "xsf0001" },
  { name: "Alex", tel: "0991113122", code: "xsf0003" }
]
```

**Output:**
```javascript
[
  { name: "Alex", tel: ["0991112222", "0832214433"], code: "xsf0001" },
  { name: "Jane", tel: "0812221234", code: "xsf0002" },
  { name: "Alex", tel: "0991113122", code: "xsf0003" }
]
```

**Solution:** Uses a `Map` to group entries by code and combines telephone numbers into an array when duplicates are found.

---

### Question B: Convert Contact Format
**Objective:** Flatten contact array and distribute customer and address to each contact.

**Input:**
```javascript
{
  customer: "Xsurface",
  contact: [
    { name: "Max" },
    { name: "Mike" },
    { name: "Adam" }
  ],
  address: "Sukhumvit 62"
}
```

**Output:**
```javascript
[
  { name: "Max", customer: "Xsurface", address: "Sukhumvit 62" },
  { name: "Mike", customer: "Xsurface", address: "Sukhumvit 62" },
  { name: "Adam", customer: "Xsurface", address: "Sukhumvit 62" }
]
```

**Solution:** Maps over the contact array and spreads customer and address properties to each contact object.

---

### Question C: Filter and Sort by Age
**Objective:** Filter people under 30 years old, sort by age (ascending), and return only names.

**Input:**
```javascript
[
  { name: "A", age: "30" },
  { name: "B", age: "9" },
  { name: "C", age: "20" },
  { name: "D", age: "18" },
  { name: "E", age: "11" },
  { name: "F", age: "60" },
  { name: "G", age: "27" },
  { name: "H", age: "90" },
  { name: "I", age: "21" },
  { name: "J", age: "12" }
]
```

**Output:**
```javascript
["B", "J", "D", "I", "G", "A"]
```

**Solution:** Filters ages < 30, sorts numerically by age, and maps to return only the name field.

---

### Question D: Display Bullet List
**Objective:** Take the output from Question C and format it as a bullet list.

**Input:** Same as Question C

**Output:**
```
• This is B, It correctly outputs from question C.
• This is J, It correctly outputs from question C.
• This is D, It correctly outputs from question C.
• This is I, It correctly outputs from question C.
• This is G, It correctly outputs from question C.
• This is A, It correctly outputs from question C.
```

**Solution:** Reuses the function from Question C and maps each name to a formatted string.

---

## How to Run

### Option 1: Open in Browser
1. Navigate to the `PT1_BasicJS_CSS` folder
2. Open `index.html` in your web browser
3. View all solutions displayed on the page

### Option 2: Run Individual Files in Node.js
```bash
cd PT1_BasicJS_CSS/js
node question-a.js
node question-b.js
node question-c.js
node question-d.js
```

### Option 3: Test in Browser Console
1. Open `index.html` in a browser
2. Open Developer Tools (F12)
3. Check the Console tab to see outputs
4. Functions are available globally for testing

## Technologies Used
- **HTML5** - Structure
- **CSS3** - Styling with gradients, animations, and responsive design
- **Vanilla JavaScript (ES6+)** - Logic implementation using modern JS features:
  - Arrow functions
  - Array methods (map, filter, sort)
  - Template literals
  - Destructuring
  - Spread operator
  - Map data structure

## Key Features
- ✅ Clean, readable code without comments
- ✅ Modern ES6+ JavaScript syntax
- ✅ Responsive design
- ✅ Animated UI elements
- ✅ Console logging for debugging
- ✅ Modular code structure

## Browser Compatibility
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

**Developer:** XSF Candidate  
**Date:** January 15, 2026  
**Test:** XSF FullStack Developer Test - Part 1
