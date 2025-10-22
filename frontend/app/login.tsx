import { router } from "expo-router";
import { View, Text, TextInput, StyleSheet, TouchableOpacity} from "react-native";

const styles = StyleSheet.create({
    input: {
        borderRadius: 10,
        borderColor: "#ccc",
        padding: 10,
        marginBottom:30,
        backgroundColor: "#fff",
        width: "85%", 
        height: 50, 
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
    },
    button: {
        margin: 20,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#CDD9F6',
        width: "50%",
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,
        
    }

})


export default function LoginScreen() {
    return (
        <View style={{        
            padding: 20,
            alignItems: 'center',
            backgroundColor: '#ffffff',
            height: '100%'
         
        }}>
            
            <Text style={{
                fontWeight:'bold', 
                fontSize:50,
                marginBottom:40,
                marginTop: 100
                }}>
                    Welcome Back!</Text>


            <TextInput placeholder="Email" placeholderTextColor="#a3a3a3ff" style={styles.input}/>
            <TextInput placeholder="Password" placeholderTextColor="#a3a3a3ff" style={styles.input}/>

            <TouchableOpacity style={styles.button} onPress={() => router.push('/signup')}><Text style={{ fontWeight: 'bold'}}>LOG IN</Text></TouchableOpacity>

           

        </View>
    )
}

export const screenOptions = {
    headerShown: false,
};