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
        marginBottom:15,
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

            <View style={{marginLeft: 15, marginTop:15, marginBottom:10}}>
            <Text style={{fontSize: 40, fontWeight: 'bold', marginBottom: 10}}>Hi there!</Text>
            <Text style={{fontWeight:'bold', fontSize: 30}}>Today: {today}</Text>
            </View>

            <View style={{alignItems:'center', marginTop:20, marginBottom:20}}>
                <View style={{borderRadius: 200, height: 200, width: 200, backgroundColor:'orange'}}></View>
            <TouchableOpacity style={styles.button} onPress={() => console.log("Button pressed")}><Text style={{fontWeight:'bold'}}>LOG SYMPTOMS</Text></TouchableOpacity>
            </View>

            <View style={{marginTop:20}}>
            <TouchableOpacity style={styles.symptomsMenu} onPress={() => console.log("Button pressed")}>
                <Text style={{fontWeight:'bold', fontSize: 20}}>View Past Entries</Text></TouchableOpacity>
            <TouchableOpacity style={styles.symptomsMenu} onPress={() => console.log("Button pressed")}>
                <Text style={{fontWeight:'bold', fontSize:20}}>Download Symptoms</Text></TouchableOpacity>
            </View>
        </ScrollView>
    );
}