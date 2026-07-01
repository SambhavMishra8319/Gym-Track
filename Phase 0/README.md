# 🏋️‍♂️ GymTrack – Workout Planner & Fitness Companion

GymTrack is a modern workout planner designed to help users **plan, track, and stay consistent** with their fitness journey.  
It provides structured workout routines, progress tracking, and an intuitive interface for managing daily workouts.

---

## 🚀 Features

- 🗓️ **Workout Planning**
  - Create and manage daily & weekly workout routines
  - Add exercises with sets, reps, and rest time

- 📊 **Progress Tracking**
  - Track completed workouts
  - Monitor consistency and improvement over time

- 🔐 **User Authentication**
  - Secure login & signup using Firebase Authentication
  - Google Sign-In support

- 📱 **Cross-Platform Support**
  - Works on Web
  - Android app built using Capacitor

- 🎨 **Modern UI**
  - Clean, responsive design
  - Mobile-friendly layout

---

## 🛠️ Tech Stack

**Frontend**
- React.js
- Tailwind CSS

**Backend / Services**
- Firebase Authentication
- Firebase Firestore / Realtime Database

**Mobile**
- Capacitor
- Android Studio

---

## 📂 Project Structure

gymtrack/
│── src/
│ ├── components/
│ ├── pages/
│ ├── firebase/
│ ├── assets/
│ └── App.jsx
│── android/
│── public/
│── package.json
│── README.md




---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/gymtrack.git
cd gymtrack
2️⃣ Install Dependencies
bash
Copy code
npm install
3️⃣ Firebase Configuration
Create a Firebase project

Enable Authentication (Email & Google)

Add your Firebase config in:

arduino
Copy code
src/firebase/config.js
4️⃣ Run the Project
bash
Copy code
npm run dev
📱 Build Android App
bash
Copy code
npm run build
npx cap add android
npx cap sync
npx cap open android
Then build the APK from Android Studio.

🔮 Future Enhancements
🧠 AI-based workout recommendations

📈 Advanced analytics & progress charts

🥗 Diet & calorie tracking

⏰ Workout reminders & notifications

🌐 Cloud backup & multi-device sync

🤝 Contributing
Contributions are welcome!
Feel free to fork the repository and submit a pull request.

📜 License
This project is licensed under the MIT License.
