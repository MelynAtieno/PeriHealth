import { ScrollView, Text, TouchableOpacity, View, StyleSheet, TextInput} from "react-native";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Checkbox } from "react-native-paper";
import { auth, db } from "../firebaseConfig";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";

const styles = StyleSheet.create({
    cancelButton: {
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
    },
    button: {
        margin: 20,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#CDD9F6',
        width: 120,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,
    },
    checkbox: {
        marginBottom:10,
        borderRadius:10,
        margin:10,
        padding: 10,   
        borderBottomWidth:2,
        borderBottomColor:'#ccc',
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10, 
        width: 180 
    },
    checkLabel:{
        fontWeight: 'bold',
        fontSize: 18,
    }

    
});


export default function SymptomsForm() {

    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const today = new Date().toLocaleDateString();
    const [notes, setNotes] = useState('');

    type SymptomsState = {
        hotFlashes: boolean;
        nightSweats: boolean;
        moodSwings: boolean;
        insomnia: boolean;
        fatigue: boolean;
        brainFog: boolean;
        headaches: boolean;
        jointPain: boolean;
        vaginalDryness: boolean;
        lowLibido: boolean;
        anxiety: boolean;
        bloating: boolean;
        
    }

    const [symptoms, setSymptoms] = useState<SymptomsState>({
        hotFlashes: false,
        nightSweats: false,
        moodSwings: false,
        insomnia: false,
        fatigue: false,
        brainFog: false,
        headaches: false,
        jointPain: false,
        vaginalDryness: false,
        lowLibido: false,
        anxiety: false,
        bloating: false

    })


    const handleSave = async () => {
        setLoading(true);
        // Collect selected symptoms
        const selectedSymptoms = (Object.keys(symptoms) as Array<keyof SymptomsState>).filter(key => symptoms[key]);

        // Validate input. No empty fields
        if(!selectedSymptoms.length && !notes) {
            alert("Please select at least one symptom or add notes.");
            return;
        }

        // Get the logged in user
        const user = auth.currentUser;
        if(!user) {
            alert("You must be logged in to save symptoms.");
            setLoading(false);
            return;
        }
        const userId = user.uid;

        // Firebase data object
        const symptomData = {
            userId,
            date: new Date().toISOString(),
            symptoms: selectedSymptoms,
            notes: notes || null,
            createdAt: serverTimestamp()
        }

        // Firestore path to save data. One record per user per day
        const day = new Date().toISOString().slice(0,10); // YYYY-MM-DD format
        const docRef = doc(db, 'users', userId, 'symptoms', day);

        // Save data to Firestore
        try{
            await setDoc(docRef, symptomData, { merge: true });
            alert("Symptoms saved successfully!");    
            router.back();
            setSymptoms(Object.fromEntries(Object.keys(symptoms).map(key => [key, false])) as SymptomsState);
            setNotes('');
        } catch (error) {
            alert( error instanceof Error? error.message: "Error saving symptoms. Please try again.");
        
        } finally {
            setLoading(false);
        }     

    }

    return (
        <ScrollView style={{marginTop:100}} contentContainerStyle={{alignItems:'center'}} >
            <View>
                
                <View style={{marginBottom:20, alignItems:'center'}}>
                <Text style={{fontWeight:'bold', fontSize:15}}>Date: {today}</Text>

                <Text style={{fontWeight:'bold', fontSize:20, marginTop:20}}>Select your symptoms</Text>
                </View>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
                    <Checkbox.Item style={styles.checkbox}
                        label="Hot flashes"
                        labelStyle={styles.checkLabel}
                        status={symptoms.hotFlashes ? 'checked' : 'unchecked'}
                        onPress={() => setSymptoms(prev =>({...prev, hotFlashes: !prev.hotFlashes}))}
                    />
                    <Checkbox.Item style={styles.checkbox}
                        label="Night Sweats"
                        labelStyle={styles.checkLabel}
                        status={symptoms.nightSweats ? 'checked' : 'unchecked'}
                        onPress={() => setSymptoms(prev =>({...prev, nightSweats: !prev.nightSweats}))}
                    />
                    <Checkbox.Item style={styles.checkbox}
                        label="Mood Swings"
                        labelStyle={styles.checkLabel}
                        status={symptoms.moodSwings ? 'checked' : 'unchecked'}
                        onPress={() => setSymptoms(prev =>({...prev, moodSwings: !prev.moodSwings}))}
                    />
                    <Checkbox.Item style={styles.checkbox}
                        label="Insomnia"
                        labelStyle={styles.checkLabel}
                        status={symptoms.insomnia ? 'checked' : 'unchecked'}
                        onPress={() => setSymptoms(prev =>({...prev, insomnia: !prev.insomnia}))}
                    />
                    <Checkbox.Item style={styles.checkbox}
                        label="Fatigue"
                        labelStyle={styles.checkLabel}
                        status={symptoms.fatigue ? 'checked' : 'unchecked'}
                        onPress={() => setSymptoms(prev =>({...prev, fatigue: !prev.fatigue}))}
                    />
                    <Checkbox.Item style={styles.checkbox}
                        label="Brain fog"
                        labelStyle={styles.checkLabel}
                        status={symptoms.brainFog ? 'checked' : 'unchecked'}
                        onPress={() => setSymptoms(prev =>({...prev, brainFog: !prev.brainFog}))}
                    />
                    <Checkbox.Item style={styles.checkbox}
                        label="Headaches"
                        labelStyle={styles.checkLabel}
                        status={symptoms.headaches ? 'checked' : 'unchecked'}
                        onPress={() => setSymptoms(prev =>({...prev, headaches: !prev.headaches}))}
                    />
                    <Checkbox.Item style={styles.checkbox}
                        label="Joint/muscle pain"
                        labelStyle={styles.checkLabel}
                        status={symptoms.jointPain ? 'checked' : 'unchecked'}
                        onPress={() => setSymptoms(prev =>({...prev, jointPain: !prev.jointPain}))}
                    />
                    <Checkbox.Item style={styles.checkbox}
                        label="Vaginal dryness"
                        labelStyle={styles.checkLabel}
                        status={symptoms.vaginalDryness ? 'checked' : 'unchecked'}
                        onPress={() => setSymptoms(prev =>({...prev, vaginalDryness: !prev.vaginalDryness}))}
                    />
                    <Checkbox.Item style={styles.checkbox}
                        label="Low libido"
                        labelStyle={styles.checkLabel}
                        status={symptoms.lowLibido ? 'checked' : 'unchecked'}
                        onPress={() => setSymptoms(prev =>({...prev, lowLibido: !prev.lowLibido}))}
                    />
                    <Checkbox.Item style={styles.checkbox}
                        label="Anxiety"
                        labelStyle={styles.checkLabel}
                        status={symptoms.anxiety ? 'checked' : 'unchecked'}
                        onPress={() => setSymptoms(prev =>({...prev, anxiety: !prev.anxiety}))}
                    />
                    <Checkbox.Item style={styles.checkbox}
                        label="Bloating"
                        labelStyle={styles.checkLabel}
                        status={symptoms.bloating ? 'checked' : 'unchecked'}
                        onPress={() => setSymptoms(prev =>({...prev, bloating: !prev.bloating}))}
                    />
                </View>
                <View style={{alignItems:'center', marginTop:10, marginBottom:5}}>
                    <TextInput
                        placeholder="Add notes..."
                        placeholderTextColor="#a3a3a3ff"
                        value={notes}
                        onChangeText={setNotes}
                        multiline
                        style={{
                            height: 100,
                            width: 380,
                            borderWidth: 1,
                            borderColor: '#ccc',
                            borderRadius: 10,
                            padding: 5,        
                            textAlignVertical: 'top',
                            marginVertical: 5,
                        }}
                        />
                </View>

                <View style={{
                    flexDirection:'row', 
                    alignItems:'center', 
                    justifyContent:'center',
                    gap:15,
                    marginBottom: 10,    
                    }}>
                    <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20}}>CANCEL</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={handleSave} disabled={loading}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20}}>{ loading? 'Saving...': 'SAVE'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}
