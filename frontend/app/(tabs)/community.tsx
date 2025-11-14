import React, { useState } from "react";
import { ScrollView, View, Text, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { TextInput } from "react-native-paper";


export default function CommunityScreen() {
    const [message, setMessage] = useState("");

    const handleSend = () => {
        const trimmed = message.trim();
        if (!trimmed) return;
        // TODO: Wire up to community messages backend when ready
        console.log("Sending message:", trimmed);
        setMessage("");
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
        >
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.placeholder}> 
                    
                </View>
            </ScrollView>

            <View style={styles.inputBar}>
                <TextInput
                    label="Type your message..."
                    mode="outlined"
                    value={message}
                    onChangeText={setMessage}
                    style={styles.textInput}
                    right={
                        <TextInput.Icon
                            icon="send"
                            onPress={handleSend}
                            forceTextInputFocus={false}
                        />
                    }
                    returnKeyType="send"
                    onSubmitEditing={handleSend}
                />
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    content: {
        padding: 16,
        paddingBottom: 96, // keep content above the input bar
    },
    placeholder: {
        alignItems: "center",
        marginTop: 24,
    },
    placeholderTitle: {
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 8,
    },
    placeholderText: {
        fontSize: 14,
        color: "#666",
    },
    inputBar: {
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: "#e5e7eb",
        backgroundColor: "#fff",
        padding: 10,
    },
    textInput: {
        backgroundColor: "#fff",
    },
});