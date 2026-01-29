# Frontend Mentor - Typing Speed Test

<img width="1440" height="1056" alt="image" src="https://github.com/user-attachments/assets/d2718f23-5401-4e31-85d0-f02bfca7fbb6" />


## Welcome! 👋

Thanks for checking out this front-end coding challenge.

[Frontend Mentor](https://www.frontendmentor.io) challenges help you improve your coding skills by building realistic projects.

# Frontend Mentor - Typing Speed Test solution

This is a solution to the **Typing Speed Test challenge** on Frontend Mentor.  
The project focuses on building an interactive typing test application with real-time feedback, performance tracking, and persistent user progress.

Frontend Mentor challenges help improve coding skills by building realistic projects using real-world requirements.

---

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

---

## Overview

### The challenge

Users should be able to:

- Start a typing test by clicking the passage or typing
- Switch between **Timed (60s)** mode and **Passage** mode
- Select difficulty levels (**Easy, Medium, Hard**)
- See real-time **WPM, accuracy, and time**
- Get visual feedback for correct and incorrect characters
- Correct mistakes using backspace (errors still affect accuracy)
- View test results on completion
- Establish a personal best score
- See a celebration message when beating their high score
- Have their personal best persist using `localStorage`
- View a responsive layout with hover and focus states

---

### Screenshot

![Typing Speed Test Screenshot](./preview.jpg)

---

### Links

- **Solution URL:** https://www.frontendmentor.io/solutions/typing-speed-test  
- **Live Site URL:** https://your-live-site-url.com  

_(Replace these with your actual links before submission)_

---

## My process

### Built with

- Semantic HTML5
- CSS (Flexbox & responsive layout)
- Vanilla JavaScript
- Local JSON data (`data.json`)
- `localStorage` for persistence
- Mobile-first workflow

---

### What I learned

This project helped me strengthen my understanding of:

- Managing application state in vanilla JavaScript
- Character-by-character comparison for real-time typing feedback
- Timer logic for different application modes
- Calculating WPM and typing accuracy correctly
- Persisting user data using `localStorage`
- Structuring JavaScript logic for readability and scalability

Example of logic used for character comparison:

```js
if (typedChar === expectedChar) {
  span.classList.add("correct");
} else {
  span.classList.add("incorrect");
}
