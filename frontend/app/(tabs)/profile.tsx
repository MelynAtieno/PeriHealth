import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { auth, db } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";

const styles = StyleSheet.create({
    menuOption: {
        marginBottom:10,
        borderRadius:15,
        margin:15,
        padding: 10,   
        borderBottomWidth:1,
        borderBottomColor:'#ccc',
        borderBottomLeftRadius:15,
        borderBottomRightRadius:15,     

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
});

export default function ProfileScreen() {
    const router = useRouter();
    const [username, setUsername] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const user = auth.currentUser;
        if (!user) { setLoading(false); return; }
        const fallback = user.displayName || (user.email ? user.email.split('@')[0] : 'User');
        (async () => {
            try {
                const ref = doc(db, 'users', user.uid);
                const snap = await getDoc(ref);
                const data: any = snap.exists() ? snap.data() : {};
                setUsername(data?.username || data?.displayName || fallback);
            } catch {
                setUsername(fallback);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const initialLetter = (username || '').charAt(0).toUpperCase() || 'U';

    return (
        <ScrollView>
            <View style={{
                marginBottom:10,
                borderBottomWidth:1,
                borderBottomColor:'#ccc',
                borderBottomLeftRadius:15,
                borderBottomRightRadius:15,
                shadowColor: "#000",            
                }}>
                <View style={{
                    flexDirection:'row', 
                    alignItems:'center', 
                    gap:15, 
                    margin:15,
                    padding: 10,
                    }}>
                    <View style ={{
                        width:50,
                        height:50,
                        borderRadius:50,
                        backgroundColor:'#cfc7d6ff',
                        shadowColor: "#000",
                        shadowOffset: {width: 0, height: 4},
                        shadowOpacity: 0.3,
                        shadowRadius: 3.84,
                        alignItems:'center',
                        justifyContent:'center'
                    }}>
                        <Text style={{
                            fontSize: 28,
                            fontWeight: 'bold',
                            textAlign: 'center',
                        }}>{initialLetter}</Text>
                    </View>
                    {loading ? (
                        <ActivityIndicator />
                    ) : auth.currentUser ? (
                        <Text style={{fontSize:25, fontWeight:'bold'}}>{username}</Text>
                    ) : (
                        <Text style={{fontSize:18}}>Not logged in</Text>
                    )}
                </View>
            </View>

            <View>
                <TouchableOpacity onPress={() => {}}>
                <View style={styles.menuOption}>                
                    <Text style={{fontSize: 18, fontWeight:'bold'}}>Account</Text>                
                </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {}}>
                <View style={styles.menuOption}><Text style={{fontSize: 18, fontWeight:'bold'}}>Settings</Text></View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {}}>
                <View style={styles.menuOption}><Text style={{fontSize: 18, fontWeight:'bold'}}>Legal Information</Text></View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() =>{}}>
                <View style={styles.menuOption}><Text style={{fontSize: 18, fontWeight:'bold'}}>Help</Text></View>
                </TouchableOpacity>
            </View>

            <View
                style={{alignItems:'center', marginTop:20, marginBottom:30}}>
            <TouchableOpacity
                style={styles.button}
                onPress={async () => {
                    try {
                        await signOut(auth);
                        router.replace('/signup');
                    } catch (e: any) {
                        console.error('Logout failed:', e);
                        alert(e?.message || 'Failed to log out.');
                    }
                }}
                disabled={loading || !auth.currentUser}
            >
                <Text style={{fontWeight:'bold'}}>{auth.currentUser ? 'LOG OUT' : 'LOG IN'}</Text>
            </TouchableOpacity>
        
            </View>
        </ScrollView>
    )
}