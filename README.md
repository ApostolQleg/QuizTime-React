# QuizTime Client 🧠

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

A dynamic and interactive quiz platform built with React. This application allows users to create custom quizzes, take tests, track their results, and customize their profiles using generative animations.

**🔗 Backend Repository:** [QuizTime-React-backend](https://github.com/ApostolQleg/QuizTime-React-backend)

## ✨ Features

* **Authentication:** Secure login/register via Email (with verification codes) or Google OAuth.
* **Quiz Engine:**
    * Create, edit, and delete quizzes.
    * Support for multiple questions and options.
    * Pagination and search/filtering.
* **User Profile:**
    * **Avatar Generator:** Custom implementation of **Generators & Iterators** (`function*`) to create animated, mathematical color explosions for unique avatars.
    * Nickname coloring and customization.
    * "Danger Zone" for password changes and account deletion.
* **Results & Analytics:** Track history of taken quizzes and view detailed scores.
* **UI/UX:** Fully responsive design using **Tailwind CSS** with a custom dark mode theme.

## 🛠️ Tech Stack

* **Core:** React, React Router DOM
* **Build Tool:** Vite
* **Styling:** Tailwind CSS
* **State Management:** React Hooks (Context API for Auth)
* **HTTP Client:** Fetch API
* **Utils:** Google OAuth, Generators/Iterators for animations

## 🚀 Getting Started

### Prerequisites
* Node.js (v16+)
* npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone [https://github.com/ApostolQleg/QuizTime-React.git](https://github.com/ApostolQleg/QuizTime-React.git)
    cd QuizTime-React
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Create a `.env` file in the root directory:
    ```env
    VITE_API_URL=http://localhost:3000/api
    VITE_AUTH_URL=http://localhost:3000/auth
    VITE_GOOGLE_CLIENT_ID=your_google_client_id
    ```

4.  Start the development server:
    ```bash
    npm run dev
    ```

## 👨‍💻 Authors

* **Oleg Bondarenko** - *Lead Developer*
    * National Technical University of Ukraine "Igor Sikorsky Kyiv Polytechnic Institute"
    * Faculty of Informatics and Computer Engineering (FIOT)
    * Group: **IM-54**
* **dimpennn** - *Partner Developer*

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.