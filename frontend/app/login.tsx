import React from "react";
import { useRouter } from "expo-router";
import { View, Text, TextInput, StyleSheet, TouchableOpacity} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

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

    const router = useRouter();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');

    const handleLogin = async() => {
        setLoading(true);
        setError("")
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.replace('/(tabs)/symptoms');

        } catch (error) {
            let errorMessage = "Login failed!";
            if (error instanceof Error) {
                errorMessage = error.message;
            } else if (typeof error === "string") {
                errorMessage = error;
            }
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

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
                Welcome Back!
            </Text>

            {/* Error message */}
            {error ? (
                <Text style={{ color: 'red', marginBottom: 20, fontSize: 16 }}>{error}</Text>
            ) : null}

            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor="#a3a3a3ff"
                style={styles.input}
                editable={!loading}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                placeholderTextColor="#a3a3a3ff"
                style={styles.input}
                secureTextEntry
                editable={!loading}
            />

            <TouchableOpacity
                style={[styles.button, loading && { opacity: 0.6 }]}
                onPress={handleLogin}
                disabled={loading}
            >
                <Text style={{ fontWeight: 'bold' }}>
                    {loading ? 'Logging in...' : 'LOG IN'}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export const screenOptions = {
    headerShown: false,
};