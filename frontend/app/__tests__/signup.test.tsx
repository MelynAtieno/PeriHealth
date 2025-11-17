import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

// Mocks
jest.mock('expo-router', () => ({ useRouter: () => ({ replace: jest.fn(), push: jest.fn(), back: jest.fn() }) }));
// Provide a broader firebase/auth mock so firebaseConfig can import needed symbols without failing
jest.mock('firebase/auth', () => {
  const createUserWithEmailAndPassword = jest.fn();
  const signInWithEmailAndPassword = jest.fn();
  const getAuth = jest.fn(() => ({ mock: true }));
  const initializeAuth = jest.fn(() => ({ mock: true }));
  const getReactNativePersistence = jest.fn(() => ({ mockPersistence: true }));
  return {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    getAuth,
    initializeAuth,
    getReactNativePersistence,
  };
});
jest.mock('firebase/firestore', () => {
  const setDoc = jest.fn();
  const doc = jest.fn();
  const getFirestore = jest.fn(() => ({ mock: true }));
  return { setDoc, doc, getFirestore };
});
// Internal @firebase/auth import for getReactNativePersistence (mock for safety)
jest.mock('@firebase/auth', () => ({ getReactNativePersistence: jest.fn(() => ({ mocked: true })) }));

import { Alert } from 'react-native';
import SignupScreen from '../signup';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc } from 'firebase/firestore';

describe('SignupScreen', () => {
  beforeEach(() => {
    (createUserWithEmailAndPassword as jest.Mock).mockReset();
    (setDoc as jest.Mock).mockReset();
  });

  it('renders and calls auth + firestore on submit', async () => {
    // arrange: make the auth/createUser resolve
    (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue({ user: { uid: 'test-uid' } });
    (setDoc as jest.Mock).mockResolvedValue(undefined);

  const { getByPlaceholderText, getByTestId } = render(<SignupScreen />);

    // act: fill fields and press button
    fireEvent.changeText(getByPlaceholderText('Username'), 'Alice');
    fireEvent.changeText(getByPlaceholderText('Email'), 'alice@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
  fireEvent.press(getByTestId('signupButton'));

    // assert: wait for auth to be called
    await waitFor(() => expect(createUserWithEmailAndPassword).toHaveBeenCalled());
    expect(setDoc).toHaveBeenCalled();
  });

  it('shows friendly error when signup fails', async () => {
    // arrange: make auth fail with a known firebase code
    (createUserWithEmailAndPassword as jest.Mock).mockRejectedValue({ code: 'auth/email-already-in-use' });
    const alertSpy = jest.spyOn(Alert, 'alert');

  const { getByPlaceholderText, getByTestId } = render(<SignupScreen />);
    fireEvent.changeText(getByPlaceholderText('Username'), 'Alice');
    fireEvent.changeText(getByPlaceholderText('Email'), 'alice@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
  fireEvent.press(getByTestId('signupButton'));

    await waitFor(() => expect(createUserWithEmailAndPassword).toHaveBeenCalled());
    // expect Alert called with friendly message
    expect(alertSpy).toHaveBeenCalledWith('Sign up failed', expect.stringMatching(/already exists/i));
    // ensure we did not call setDoc
    expect(setDoc).not.toHaveBeenCalled();
    alertSpy.mockRestore();
  });
});
