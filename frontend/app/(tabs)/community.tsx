import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, StyleSheet, Platform, Keyboard, RefreshControl } from "react-native";
import { TextInput } from "react-native-paper";


export default function CommunityScreen() {
    const [message, setMessage] = useState("");
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const [refreshing, setRefreshing] = useState(false);

    // Limit effective keyboard height to 230px to avoid excessive gaps on some devices
    const effectiveKeyboardHeight = Math.min(keyboardHeight || 0, 230);

    const handleSend = () => {
        const trimmed = message.trim();
        if (!trimmed) return;
        // TODO: Wire up to community messages backend
        setMessage("");
    };

    useEffect(() => {
        const showEvent = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
        const hideEvent = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

        const onShow = (e: any) => {
            const h = e.endCoordinates ? e.endCoordinates.height : 0;
            setKeyboardHeight(h);
        };
        const onHide = () => setKeyboardHeight(0);

        const showSub = Keyboard.addListener(showEvent, onShow);
        const hideSub = Keyboard.addListener(hideEvent, onHide);

        return () => {
            showSub.remove();
            hideSub.remove();
        };
    }, []);

    const onRefresh = () => {
        // Placeholder refresh behavior: simulate reload
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 800);
    };

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.content}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <View style={styles.placeholder}> 
                    
                </View>
            </ScrollView>

            <View style={[styles.inputBar, { position: 'absolute', left: 0, right: 0, bottom: effectiveKeyboardHeight ? effectiveKeyboardHeight + 2 : 6, elevation: 6 }]}> 
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
    
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    content: {
        padding: 16,
        paddingBottom: 8,
    },
    placeholder: {
        alignItems: "center",
        marginTop: 24,
    },
    placeholderTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 8,
    },
    placeholderText: {
        fontSize: 14,
        color: "#505050ff",
    },
    inputBar: {
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: "#e5e7eb",
        backgroundColor: "#fff",
        padding: 10,
        zIndex: 10,
        },
    textInput: {
        backgroundColor: "#fff",
        borderRadius: 10
    },

});