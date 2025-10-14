import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';


export default function RootLayout() {

  return (
   <Tabs 
    screenOptions={{ 
      headerShown: true,
      tabBarActiveTintColor: "#2F80ED",
      tabBarInactiveTintColor: "gray"
     }}
   >
    <Tabs.Screen
      name="symptoms"
      options={{ 
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="medkit" color={color} size={size} />
        ),
        headerTitle: 'Log Your Symptoms'
       }}
    />
    <Tabs.Screen
      name="learn"
      options={{ 
        tabBarIcon: ({color, size}) => (
          <Ionicons name = "book-sharp" color={color} size={size} />
        ),
        headerTitle: 'Gain Insights'

       }}
    />
    <Tabs.Screen
      name="community"
      options={{ 
        title: 'Community',
        headerTitle: 'Community Forum' 
      }}
    />
    <Tabs.Screen
      name="profile"
      options={{ 
        title: 'Profile',
        headerTitle: 'Your Profile'
       }}
    />
   </Tabs>
  );
}
