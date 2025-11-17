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
// Internal @firebase/auth import for getReactNativePersistence (mock for safety)
jest.mock('@firebase/auth', () => ({ getReactNativePersistence: jest.fn(() => ({ mocked: true })) }));

import { Alert } from 'react-native';
import LoginScreen from '../login';
import { signInWithEmailAndPassword } from 'firebase/auth';
jest.mock('firebase/firestore', () => {
  const getFirestore = jest.fn(() => ({ mock: true }));
  return { getFirestore };
});

describe('LoginScreen', () => {
  beforeEach(() => {
    (signInWithEmailAndPassword as jest.Mock).mockReset();
  });

  it('renders and calls sign in on submit', async () => {
    (signInWithEmailAndPassword as jest.Mock).mockResolvedValue({ user: { uid: 'u1' } });

    const { getByPlaceholderText, getByText } = render(<LoginScreen />);

    fireEvent.changeText(getByPlaceholderText('Email'), 'bob@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.press(getByText(/LOG IN/i));

    await waitFor(() => expect(signInWithEmailAndPassword).toHaveBeenCalled());
  });

  it('shows friendly error when login fails', async () => {
    (signInWithEmailAndPassword as jest.Mock).mockRejectedValue({ code: 'auth/wrong-password' });
    const alertSpy = jest.spyOn(Alert, 'alert');

    const { getByPlaceholderText, getByText, findByText } = render(<LoginScreen />);
    fireEvent.changeText(getByPlaceholderText('Email'), 'bob@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'badpassword');
    fireEvent.press(getByText(/LOG IN/i));

    await waitFor(() => expect(signInWithEmailAndPassword).toHaveBeenCalled());
    expect(alertSpy).toHaveBeenCalledWith('Sign in failed', expect.stringMatching(/incorrect password/i));

  // inline error text should also appear (use regex directly)
  await findByText(/incorrect password/i);
    alertSpy.mockRestore();
  });
});
