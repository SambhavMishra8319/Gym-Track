# Workout Planner (React + Tailwind + Firebase)

## Features
- Log workouts (date, exercises, sets, reps, weight, notes)
- Store workouts in Firebase Firestore
- View history and simple analytics
- Anonymous user id stored locally

## Setup
1. Install dependencies

```bash
npm install
```

2. Configure Tailwind (already included in config files)

3. Create a Firebase project and enable Firestore. Copy the config values into `src/firebase.js`.

4. Run dev server

```bash
npm run dev
```

## Notes & Next steps
- Add authentication (Google/Auth) for multi-device sync
- Add editing & deleting of workouts
- Add charts (Recharts) for visual analytics
- Add export (CSV) and import features
