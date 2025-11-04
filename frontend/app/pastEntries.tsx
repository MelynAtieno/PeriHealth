import { auth, db} from "../firebaseConfig";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { ScrollView, View, Text, TouchableOpacity} from "react-native";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    goBackButton: {
        margin: 20,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#8e8f90ff',
        width: 120,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,        
    }

})

export default function pastEntries() {

    const router = useRouter();

    const user = auth.currentUser;
    if (!user) {
        alert('Please log in to view your past entries.');
        return;
    }



    return(
        <ScrollView style={{marginTop:100}} contentContainerStyle={{alignItems:'center'}}>
            <View>
                <Text style={{fontWeight:'bold', fontSize:20}}>Past Entries will be displayed here.</Text>
                <TouchableOpacity style={styles.goBackButton} onPress={() => router.back()}>
                    <Text style={{fontWeight: 'bold', fontSize: 20}}>GO BACK</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>   
    )
}