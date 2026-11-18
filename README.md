# Tip Calculator App

A responsive tip and bill-splitting calculator built with React. Users can enter a bill amount, choose a preset or custom tip percentage, and divide the total across multiple people in real time.

🔗 **[Live Demo]** https://tip-calculator-virid.vercel.app/

## Features

- **Real-Time Calculation:** Instantly computes the tip amount and total per person as inputs change.
- **Custom & Preset Tips:** Supports quick-select percentages (e.g., 5%, 10%, 15%, 25%, 50%) alongside a custom tip input.
- **Input Validation:** Prevents invalid inputs such as zero people or negative bill amounts.
- **One-Click Reset:** Clears all fields and restores default values.

## Tech Stack

- **Framework:** [React](https://react.dev) (with Hooks: `useState`)
- **Build Tool:** [Vite](https://vite.dev) 
- **Styling:** Vanilla CSS

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/OkIbrahim/TipCalculator.git
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
- Managing derived state without redundant `useEffect` hooks.
- Handling edge cases in controlled numeric inputs (e.g., `NaN` or division by zero).
