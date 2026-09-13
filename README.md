# Dev Stack Builder

A responsive React website that helps developers explore popular technologies and build a personal development stack.

## Features
- Browse 12 technologies loaded from a local JSON file.
- Add/remove technologies with duplicate protection and React-Toastify feedback.
- Responsive navbar, technology grid, stack sidebar, hero section, and footer.

## Tech Stack
- React + Vite
- JavaScript (ES6+)
- CSS
- React-Toastify
- JSON

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## React Questions

### 1. What is JSX, and why is it used in React?
JSX is a syntax that lets us write HTML-like UI inside JavaScript. React uses it to describe what the interface should look like in a clear way.

### 2. What is the difference between props and state?
Props are values passed from a parent component to a child. State is data owned by a component that can change and cause the UI to update.

### 3. What does the `useState` hook do, and where did you use it in this project?
`useState` stores changing data inside a function component. Here it is used for the technology list, loading state, selected stack, and mobile menu state.

### 4. What does the `useEffect` hook do, and why did you need it to load the JSON data?
`useEffect` runs side effects after rendering. It is used here to simulate a short fetch/loading period before placing the local JSON data into component state.

### 5. Why does every item in a `.map()` list need a unique `key` prop?
React uses the key to identify each list item between renders. A stable unique key helps React update only the items that actually changed.

### 6. What is conditional rendering? Show one place you used it.
Conditional rendering means showing different UI depending on a condition. The stack panel shows an empty message when `stack.length === 0`, otherwise it shows the selected technologies.

### 7. How do you pass data from a parent component to a child component, and how does a child send something back to the parent?
A parent passes data through props. A child can call a callback function received through props to send an event or value back to the parent. This project passes `stack` to `StackPanel` and callbacks such as `onRemove` back to the parent.
