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
        tabBarLabel: "",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="medkit" color={color} size={size} />
        ),
        headerTitle: 'Log Your Symptoms'
       }}
    />
    <Tabs.Screen
      name="learn"
      options={{ 
        tabBarLabel: "",
        tabBarIcon: ({color, size}) => (
          <Ionicons name = "book-sharp" color={color} size={size} />
        ),
        headerTitle: 'Gain Insights'

       }}
    />
    <Tabs.Screen
      name="community"
      options={{ 
        tabBarLabel: "",
        tabBarIcon: ({color, size}) => (
          <Ionicons name ="chatbubbles-sharp" color={color} size={size} />
        ),
        headerTitle: 'Community Forum' 
      }}
    />
    <Tabs.Screen
      name="profile"
      options={{ 
        tabBarLabel: "",
        tabBarIcon: ({color, size}) =>(
          <Ionicons name="person-circle-sharp" color={color} size={size} />
        ),
        headerTitle: 'Your Profile'
       }}
    />
   </Tabs>
  );
}
