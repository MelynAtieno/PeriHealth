import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Tabs } from 'expo-router';
import { Button } from 'react-native';
import SymptomsScreen from './(tabs)/symptoms';
import LearnScreen from './(tabs)/learn';
import CommunityScreen from './(tabs)/community';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
   <Tabs 
    screenOptions={{ 
      headerShown: false,
      tabBarActiveTintColor: "#2F80ED",
      tabBarInactiveTintColor: "gray"

     }}
   >
    <Tabs.Screen
      name="symptoms"    
      options={{ title: 'Symptoms' }}
    />
    <Tabs.Screen
      name="learn"    
      options={{ title: 'Learn' }}
    />
    <Tabs.Screen
      name="community"
      options={{ title: 'Community' }}
    />
    <Tabs.Screen
      name="profile"
      options={{ title: 'Profile' }}
    />
   </Tabs>
  );
}
