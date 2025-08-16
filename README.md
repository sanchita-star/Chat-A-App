# 💬 Chat App Project

## 🌟 Overview
This is a **real-time chat application** built with **React Native** and **Firebase**.  
It allows users to **register, login, and chat** with other users instantly. The app includes a user list, chat screen, and real-time message updates.  

---

## ✨ Features

- **📝 User Authentication:**  
  Users can sign up and login using **email and password** (Firebase Authentication).

- **👥 User List:**  
  Shows all registered users except the currently logged-in user. Users can select another user to start a chat.

- **⚡ Real-Time Messaging:**  
  Messages are sent and received instantly using **Firebase Firestore**.

- **🏷️ User Badge:**  
  Displays the currently logged-in user's name at the top of the screen.

- **📌 Footer Section:**  
  Every screen includes a footer displaying **“Made by Sancho”**.

- **✅ Input Validation:**  
  Checks for empty name, email, or password during signup and login.

- **📲 Keyboard Avoidance:**  
  Chat input moves above the keyboard for a seamless user experience.

---

## 🖥 Screens

1. **🔑 Login Screen:**  
   - Enter email and password to login.  
   - Navigate to Signup if the user doesn't have an account.

2. **🆕 Signup Screen:**  
   - Enter name, email, and password to create a new account.  
   - User data is saved in **Firebase Firestore**.

3. **👤 User List Screen:**  
   - Displays a list of other users.  
   - Shows the current user's badge at the top.  
   - Logout functionality included.

4. **💬 Home / Chat Screen:**  
   - Real-time messaging with selected user.  
   - Messages displayed using **chat bubbles**.  
   - Input bar to type and send messages.  
   - Current user’s name badge displayed.

---

## 🛠 Tech Stack

- **Frontend:** React Native  
- **Backend:** Firebase Authentication & Firestore  
- **State Management:** React Hooks (`useState`, `useEffect`)  
- **Navigation:** React Navigation  

---

## 👩‍💻 Author

- **Sancho:**
- **Made with ❤️ using React Native & Firebase**
