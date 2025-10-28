import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";

const styles = StyleSheet.create({
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
    },
    symptomsMenu: {
        marginBottom:10,
        borderRadius:10,
        margin:15,
        padding: 10,   
        borderBottomWidth:2,
        borderBottomColor:'#ccc',
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,     

    }
})
export default function SymptomsScreen() {

    const today = new Date().toLocaleDateString();

    return (
        <ScrollView>
            <Text>Hi there!</Text>
            <Text>Today is: {today}</Text>

            <TouchableOpacity style={styles.button} onPress={() => console.log("Button pressed")}><Text style={{fontWeight:'bold'}}>LOG SYMPTOMS</Text></TouchableOpacity>

            <View>
            <TouchableOpacity style={styles.symptomsMenu} onPress={() => console.log("Button pressed")}>
                <Text style={{fontWeight:'bold', fontSize: 20}}>View Past Entries</Text></TouchableOpacity>
            <TouchableOpacity style={styles.symptomsMenu} onPress={() => console.log("Button pressed")}>
                <Text style={{fontWeight:'bold', fontSize:20}}>Download Symptoms</Text></TouchableOpacity>
            </View>
        </ScrollView>
    );
}