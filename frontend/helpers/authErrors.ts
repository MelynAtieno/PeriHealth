export function getFriendlyAuthErrorMessage(err: any): string {
  const code = err?.code?.toString() ?? '';

  switch (code) {
    case 'auth/email-already-in-use':
      return 'An account already exists with this email. Try logging in or use another email.';
    case 'auth/invalid-email':
      return 'That email address doesn’t look valid. Please check it and try again.';
    case 'auth/weak-password':
      return 'Password is too weak. Try using at least 6 characters.';
    case 'auth/user-not-found':
      return 'No account found with this email. Please sign up first.';
    case 'auth/wrong-password':
      return 'Incorrect password. Try again or reset your password.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please wait a few minutes and try again.';
    case 'auth/network-request-failed':
      return 'Network error — check your internet connection and try again.';
    case 'auth/operation-not-allowed':
      return 'This sign-in method is not enabled. Contact support.';
    default:
      return 'Something went wrong. Please try again.';
  }
}
