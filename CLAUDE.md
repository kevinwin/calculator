# CLAUDE.md

This file provides guidance for AI assistants working with this codebase.

## Project Overview

A React-based calculator web application modeled after the macOS High Sierra calculator. The app supports basic arithmetic operations, keyboard input, and features a responsive display that scales to fit large numbers.

**Live Demo:** https://kevinwin.com/calculator

## Tech Stack

- **React 16.4.2** - Class-based components (no hooks)
- **Create React App** - react-scripts 1.1.4 (older CRA version)
- **big.js** - Arbitrary-precision decimal arithmetic for accurate calculations
- **CSS Grid** - Layout system for calculator buttons
- **gh-pages** - Deployment to GitHub Pages

## Project Structure

```
calculator/
├── public/
│   ├── index.html      # HTML template
│   ├── favicon.ico     # App icon
│   └── manifest.json   # PWA manifest
├── src/
│   ├── index.js        # App entry point, renders <App />
│   ├── App.js          # Main application logic & state management
│   ├── App.css         # App-level styles (mostly unused boilerplate)
│   ├── App.test.js     # Unit tests for createWorkingNumber function
│   ├── Calculator.js   # Stateless presentational component (buttons/display)
│   ├── Calculator.css  # Main styling (CSS Grid layout, color variables)
│   ├── index.css       # Base styles
│   └── registerServiceWorker.js  # PWA service worker
├── package.json
└── .gitignore
```

## Key Files

### `src/App.js`
Main application logic containing:
- **State management**: `partialCalculation`, `lastClicked`, `scale`, `total`
- **Calculation logic**: Uses string parsing with regex to track operands/operators
- **Exported utility functions**:
  - `createWorkingNumber()` - Builds display number from user input
  - `createWorkingPercent()` - Divides current value by 100
  - `createToggledNumber()` - Toggles positive/negative sign
  - `getLastLeftOperand()` / `getLastRightOperand()` / `getLastOperator()` - Parse calculation state
  - `calculateNextTotal()` - Performs arithmetic using big.js
  - `handleKeydown()` - Keyboard event handler

### `src/Calculator.js`
Stateless presentational component that renders the calculator UI. Receives all handlers and state as props from App.

### `src/Calculator.css`
Contains CSS custom properties (variables) for theming:
- `--calculator-bg-color`
- `--main-display-color`
- `--sign-color` (orange operation buttons)
- `--number-button-color`

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (localhost:3000)
npm start

# Run tests
npm test

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## Architecture Notes

### State Management
The calculator uses a string-based approach to track calculations:
- `partialCalculation` stores the full expression as a string (e.g., "123+456")
- Regex patterns extract left operand, operator, and right operand
- `total` reflects the current display value

### Arithmetic Precision
Uses `big.js` library for all calculations to avoid floating-point precision issues common with JavaScript's native number type.

### Display Scaling
The display automatically scales down when numbers exceed the container width, handled in `componentDidUpdate()` by comparing display width to available space.

### Keyboard Support
Full keyboard support including:
- Numbers (0-9) and decimal (.)
- Operators (+, -, *, /)
- Enter/= for equals
- Escape for clear
- Option+Minus for sign toggle (macOS)

## Testing

Tests are located in `src/App.test.js` and cover the `createWorkingNumber` function:
- Decimal handling
- Number concatenation
- Zero edge cases

Run tests with: `npm test`

## Code Conventions

- **Component style**: Class components (React 16 patterns, pre-hooks)
- **State updates**: Use `this.setState()` with callback pattern for derived state
- **CSS**: Use CSS custom properties for theming; CSS Grid for layout
- **Naming**: camelCase for functions/variables, PascalCase for components

## Known TODOs

From the codebase comments:
- Add backspace functionality (noted in `handleKeydown`)

## Deployment

The app deploys to GitHub Pages at `https://kevinwin.com/calculator`:

```bash
npm run deploy  # Runs build then pushes to gh-pages branch
```

## Important Considerations for AI Assistants

1. **React version**: This uses React 16.4 class components - do not introduce hooks
2. **CRA version**: Uses react-scripts 1.1.4 - be aware of older tooling limitations
3. **big.js usage**: Always use big.js for arithmetic to maintain precision
4. **Regex parsing**: The calculation state uses regex - be careful when modifying parsing logic
5. **No TypeScript**: This is a JavaScript project without type checking
