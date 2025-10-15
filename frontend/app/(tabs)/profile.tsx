import { Button } from "@react-navigation/elements";
import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";

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
            }}><Text style={{
                fontSize: 40,
                fontWeight: 'bold',
                textAlign: 'center',
                }}>J</Text></View>
            <Text style={{fontSize:25, fontWeight:'bold'}}>Jane Doe</Text>
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
            <TouchableOpacity style={styles.button} onPress={() => {}}>
                <Text style={{fontWeight:'bold'}}>LOG OUT</Text>
            </TouchableOpacity>
            </View>
        </ScrollView>
    )
}