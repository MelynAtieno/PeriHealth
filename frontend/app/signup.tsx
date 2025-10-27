import React from "react";
import { router } from "expo-router";
import { View, Text, TextInput, StyleSheet, TouchableOpacity} from "react-native";
import { auth } from "../../firebaseConfig.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "expo-router";

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


export default function SignupScreen() {
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const router = useRouter();
    const onSubmit = async() =>{
        try{
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
            const uid = userCredentials.user.uid;
            router.replace('/(tabs)/symptoms');
        } catch (error){
            console.error("Signup failed!", error);
        }
    }

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
                    Please Sign Up</Text>

            <TextInput placeholder="Username" value={username} onChangeText={setUsername} placeholderTextColor="#a3a3a3ff" style={styles.input}/>
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} placeholderTextColor="#a3a3a3ff" style={styles.input}/>
            <TextInput placeholder="Password" value={password} onChangeText={setPassword} placeholderTextColor="#a3a3a3ff" style={styles.input}/>

            <TouchableOpacity style={styles.button} onPress={() => {}}><Text style={{ fontWeight: 'bold'}}>SIGN UP</Text></TouchableOpacity>

            <Text style={{marginTop: 20, fontSize: 15}}>Already have an account?</Text>

           <TouchableOpacity onPress={onSubmit}><Text style={{ fontWeight: 'bold', marginTop: 20,  fontSize: 20}}>LOG IN</Text></TouchableOpacity>


        </View>
    )
}

export const screenOptions = {
    headerShown: false,
};


