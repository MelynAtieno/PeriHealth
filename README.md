# PeriHealth (MVP)

PeriHealth is a React Native (Expo) app that aims to support women experiencing perimenopause and menopause. It allows you to log daily symptoms, review past symptom entries, export/share a PDF symptom report, and chat with other app users.

## Features

- Authentication: Email/password sign up and log in
- Symptom logging: One entry per day with checkboxes and optional notes
- Past entries: View previous symptoms and delete a symptom entry if needed
- PDF export/share: Generate a clean PDF report including the user’s name, symptoms, and notes.
- Community chat: Real-time shared chat room powered by Firestore
- Friendly error messages and keyboard dismissal on auth screens
- Basic tests for auth and symptom logging flows (Jest + Testing Library)

## Tech stack

- React Native + Expo Router
- Firebase Auth and Firestore
- UI: react-native-paper, @expo/vector-icons
- Export/Share: expo-print, expo-sharing
- Testing: jest-expo, @testing-library/react-native

## Project structure

```
PeriHealth/
	frontend/
		app/                # Expo Router screens
		components/         # Reusable UI
		constants/          # Theme, labels
		hooks/              # Hooks
		scripts/            # Helpers (reset script)
		firebaseConfig.js   # Firebase initialization (update with your project)
		jest.config.js      # Jest config for React Native/Expo
		jest.setup.js       # Global test setup/mocks
```

## Quick start (frontend)

1) Install dependencies

```
cd frontend
npm install
```

2) Start the app on Expo Go

On your terminal, run:

```
npx expo start
```

Then open in:
- Expo Go on a device (scan the QR)
- Android emulator: `npm run android`

## Firebase setup

Add a `firebaseConfig.js` file in the `frontend` folder.
Create a firebase project and enable Email/Password authentication and Firestore database in test mode.
Update `firebaseConfig.js` with your Firebase project values. The file should be wired for React Native persistence. Create these Firestore collections when using the app:

- `users/{uid}/symptoms/{YYYY-MM-DD}` documents with fields: `userId`, `date` (ISO string), `symptoms` (string[]), `notes` (string|null), `createdAt` (serverTimestamp)
- `communityMessages/{autoId}` with fields: `text`, `userId`, `createdAt` (serverTimestamp)

Suggested Firestore security rules (adjust to your needs):

```
rules_version = '2';
service cloud.firestore {
	match /databases/{database}/documents {
		match /users/{userId}/symptoms/{day} {
			allow read, write: if request.auth != null && request.auth.uid == userId;
		}

		match /communityMessages/{messageId} {
			allow read, create: if request.auth != null;
			allow update, delete: if false; // lock down edits/deletes for MVP
		}
	}
}
```

## Tests

Run the test suite from the `frontend` folder:

```
npm test
```

Includes tests for signup, login (friendly error handling), and logging symptoms.

## Areas for future improvement
- Improve PDF formatting and include date ranges
- Add more tests for community chat and PDF export
- Add email verification
- Allow users to change their password and reset it via email
- Allow users to edit/delete their chat messages
- Add dark mode support
- Improve accessibility (ARIA labels, focus management)




