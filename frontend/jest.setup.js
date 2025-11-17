// Global Jest setup for React Native tests
// Mocks Alert.alert so tests don't spawn modal dialogs; captures calls for assertions.
import { Alert } from 'react-native';

// Mock @expo/vector-icons to silence react-native-paper icon warnings in Jest
// Provides a minimal createIconSet function and common icon components used by paper.
jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  const Placeholder = (props) => React.createElement('Icon', props);
  return {
    Ionicons: Placeholder,
    MaterialCommunityIcons: Placeholder,
    MaterialIcons: Placeholder,
    FontAwesome: Placeholder,
    Entypo: Placeholder,
    Feather: Placeholder,
    AntDesign: Placeholder,
    EvilIcons: Placeholder,
    SimpleLineIcons: Placeholder,
    createIconSet: () => Placeholder,
  };
});

// Spy on Alert.alert and provide a noop implementation.
jest.spyOn(Alert, 'alert').mockImplementation((title, message) => {
  // Log alerts during test runs for debugging.
  console.log('[Alert suppressed]', title, message);
});

// Reset mock call history before each test to keep assertions isolated.
beforeEach(() => {
  // Clear call history; cast via any since this is a JS file
  (Alert.alert).mockClear && (Alert.alert).mockClear();
});
