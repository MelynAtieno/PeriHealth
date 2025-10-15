import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#ECE6F0",
        borderRadius: 20,
        width: "90%",
        margin: 24,
        padding: 24,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 3.84,

    },
    cardHeading: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 12
    },
    cardSummary: {
        textAlign: "justify",
        fontSize: 15,
    }

 });
export default function LearnScreen() {
    return (
        <ScrollView>
            <View style={styles.card}>            
            <Text style={styles.cardHeading}>Surviving Menopause</Text>
            <Text style={styles.cardSummary}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Nulla vehicula vel augue ac pellentesque. 
                Mauris odio neque, viverra in ante eu, vestibulum scelerisque quam. 
                Vestibulum pulvinar nunc libero. Aenean vestibulum.</Text>
            </View>
        </ScrollView>
    )
}