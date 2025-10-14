import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';


export default function RootLayout() {

  return (
   <Tabs 
    screenOptions={{ 
      headerShown: true,
      headerStyle: {
        backgroundColor: "#CDD9F6",
        height: 120,
        shadowColor: 'transparent'
      },
      tabBarIconStyle:{ marginTop: 10 },
      tabBarStyle: { 
        height: 90, 
        paddingBottom: 10,
        backgroundColor: "#cdd9f6"
       },
      tabBarActiveTintColor: "#6080e9ff",
      tabBarInactiveTintColor: "black"
     }}
   >
    <Tabs.Screen
      name="symptoms"
      options={{ 
        tabBarLabel: "",
        tabBarIcon: ({ color }) => (
          <Ionicons name="medkit" color={color} size={30} />
        ),
        headerTitle: 'Log Your Symptoms'
       }}
    />
    <Tabs.Screen
      name="learn"
      options={{ 
        tabBarLabel: "",
        tabBarIcon: ({color}) => (
          <Ionicons name = "book-sharp" color={color} size={30} />
        ),
        headerTitle: 'Gain Insights'

       }}
    />
    <Tabs.Screen
      name="community"
      options={{ 
        tabBarLabel: "",
        tabBarIcon: ({color}) => (
          <Ionicons name ="chatbubbles-sharp" color={color} size={30} />
        ),
        headerTitle: 'Community Forum' 
      }}
    />
    <Tabs.Screen
      name="profile"
      options={{ 
        tabBarLabel: "",
        tabBarIcon: ({color}) =>(
          <Ionicons name="person-circle-sharp" color={color} size={30} />
        ),
        headerTitle: 'Your Profile'
       }}
    />
   </Tabs>
  );
}
