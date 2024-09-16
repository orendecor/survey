Loom:
https://www.loom.com/share/6f6b8a8fc0e945348512d5391384631b?sid=aedbdb63-ceae-4318-8b06-6cf697de870b

## Plan

- UI
  - high level form deisgn
  - question component
- Functionality
- Sharing through query param mechanism

validation?


# Survey Builder and Viewer Task

## Introduction

At **Archetype**, delivering intuitive, user-friendly software is essential to our mission. The **Survey Builder and Viewer** project is a way to look into how you think about creating seamless, user-centered experiences that simplify complex tasks like survey creation.

This project matters because:
1. **User Experience**: We prioritize UX to ensure users can easily interact with the product.
2. **Flexibility**: A customizable survey tool allows users to tailor surveys for different needs, aligning with Archetype’s scalable solutions.
3. **Market Differentiation**: A beautiful, easy-to-use interface sets us apart in a competitive landscape.

## Task Description

The goal of this task is to build a **Survey Builder and Viewer** application using **React**, **TypeScript**, **Tailwind CSS**, and **Vite**. The Survey Builder allows users to create different types of questions, while the Survey Viewer enables users to interact with the generated survey. The final app should allow users to toggle between building a survey and previewing it.

## Acceptance Criteria

1. **Survey Builder:**
   - Users should be able to add the following types of questions:
     - Text input
     - Multiple-choice (with customizable options)
     - Checkboxes (with customizable options)
     - Rating scale (1-5)
     - Date picker
   - Each question should support custom labels. For multiple-choice and checkbox questions, users should be able to dynamically add or remove options.

2. **Survey Viewer:**
   - Displays the questions built in the Survey Builder.
   - End users should be able to:
     - Enter responses in text input fields.
     - Select one or more options for multiple-choice and checkbox questions.
     - Provide a rating on a scale from 1 to 5.
     - Pick a date using the date picker.
   - Upon submission, responses should be captured in the state and logged to the console.

3. **Toggle Between Views:**
   - The app should include a button to toggle between the **Survey Builder** (edit mode) and the **Survey Viewer** (preview mode).
   - The survey state should persist when switching between views, allowing users to make changes without losing progress.

4. **State Persistence and Sharing:**
   - Currently, there is no way to save the survey and share it with others. Implement functionality to save the survey state and enable sharing with other users.

## What We're Evaluating
It's up to you to determine the order of attack, what priority each feature takes, and how you want to approach solving the problem.

1. **User Experience (UX):**
   - The current UX is intentionally subpar—let's transform it into a delightful and intuitive experience that users will love.
   
2. **Error Handling and State Management:**
   - There is no error handling for invalid inputs or empty states, and no feedback for loading states. Improving these will significantly enhance the UX. Add proper validation, empty state messaging, and loading indicators.

3. **Visual Design:**
   - The app’s design is currently very basic. Make it visually appealing with a polished, professional look that aligns with modern UI/UX standards.

## Running React on CoderPad

This project runs a React app served by Vite. Changes are automatically reflected as you type, and others in the Pad can see the updates. You can add as many files as needed and include any NPM packages.

To start, modify the `App.tsx` file and see the changes reload on the right panel.

### TypeScript

The project is pre-configured for TypeScript, but you can also add `.js` or `.jsx` files if needed.

### IntelliSense

IntelliSense is running across the project, offering syntax error detection and quick hints to resolve errors or TypeScript issues.

### Shell Access

You can inspect your container in more detail using the provided shell, which can be used to install additional NPM packages or execute test suites if defined.

**Note**: While you can edit files via the shell, it's recommended to use the editor for changes, so others in the Pad can see the updates in real-time.

### Hot Module Reloading (HMR)

Vite provides Hot Module Reloading, meaning changes to project files are automatically applied (after a 2-second debounce). Errors are displayed in the output, and system-wide errors appear in the logs.

Changes to files like `index.html` or `vite.config.ts` will reload the entire app, while changes to other files (like `App.tsx`) won’t cause a full reload.

### About Vite

[Vite](https://vitejs.dev) was chosen for its fast startup times and quick browser updates using native ES Modules. You can customize the Vite configuration by editing the `vite.config.ts` file if needed.

### Container Limits

The container has some limitations:
- CPU usage is currently unlimited but may change in the future.
- Network bandwidth is limited to 75mb for the container's duration.
- Memory is limited to 2 GB.

### Assets

SVG files are supported natively and can be imported directly into your React components. Other assets must be hosted externally or referenced directly in HTML tags.
