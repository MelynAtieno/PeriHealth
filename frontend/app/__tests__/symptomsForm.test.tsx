import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

// Mock router to avoid navigation side-effects
jest.mock('expo-router', () => ({ useRouter: () => ({ back: jest.fn() }) }));

// Mock firebase config to provide a deterministic current user and db object
// Path correction: firebaseConfig lives at frontend/firebaseConfig.js (two levels up)
jest.mock('../../firebaseConfig', () => ({
  auth: { currentUser: { uid: 'user123' } },
  db: { mock: true }
}));

// Mock firestore methods used by the form
jest.mock('firebase/firestore', () => {
  const setDoc = jest.fn(() => Promise.resolve());
  const serverTimestamp = jest.fn(() => ({ mockTimestamp: true }));
  const doc = jest.fn((db: any, ...path: string[]) => ({ db, path }));
  return { setDoc, serverTimestamp, doc };
});

import SymptomsForm from '../symptomsForm';
import { setDoc, doc } from 'firebase/firestore';

// Simple helper to get today (matches component logic using new Date())
const todayDay = () => new Date().toISOString().slice(0, 10);

describe('SymptomsForm', () => {
  beforeEach(() => {
    (setDoc as jest.Mock).mockClear();
    (doc as jest.Mock).mockClear();
  });

  it('saves a symptom log with notes only', async () => {
    const { getByPlaceholderText, getByText } = render(<SymptomsForm />);

    // Provide notes so validation passes (at least one symptom OR notes)
    fireEvent.changeText(getByPlaceholderText('Add notes...'), 'Felt mild fatigue today');

    // Press SAVE
    fireEvent.press(getByText(/SAVE/i));

    // Wait for setDoc to be called
    await waitFor(() => expect(setDoc).toHaveBeenCalled());

    // Expect doc path includes user id and day segment
    expect(doc).toHaveBeenCalledWith(expect.any(Object), 'users', 'user123', 'symptoms', todayDay());

    // Inspect saved payload
    const payload = (setDoc as jest.Mock).mock.calls[0][1];
    expect(payload).toMatchObject({
      userId: 'user123',
      notes: 'Felt mild fatigue today',
      symptoms: [], // no symptom checkboxes selected
    });
    expect(typeof payload.date).toBe('string');
  });
});
