import React, { useState, useEffect } from "react";
import {View, StyleSheet, Platform, Keyboard, RefreshControl, Pressable, FlatList, ActivityIndicator} from "react-native";
import { TextInput } from "react-native-paper";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { addDoc, collection, serverTimestamp, query, orderBy, onSnapshot, limit} from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import MessageBubble from "../../components/MessageBubble";


export default function CommunityScreen() {
    const [messages, setMessages] = useState<Array<any>>([]);
    const [inputText, setInputText] = useState<string>("");
    const [isSending, setIsSending] = useState(false);
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const [refreshing, setRefreshing] = useState(false);

    const flatListRef = React.useRef<FlatList<any> | null>(null);

    // Limit effective keyboard height to 230px to avoid excessive gaps on some devices
    const effectiveKeyboardHeight = Math.min(keyboardHeight || 0, 230);


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

    const handleSend = async () => {
        const text = inputText.trim();
        if (!text) return;

        setIsSending(true);

        try {
            const user = auth.currentUser;
            if (!user) throw new Error("Please log in to send messages.");
            await addDoc(collection(db, "communityMessages"), {
                text,
                userId: user.uid,
                createdAt: serverTimestamp(),
            });
            setInputText("");
        } catch (error) {
            alert("Error sending message");
        } finally{
            setIsSending(false);
        }
    }

    useEffect(() => {
        const q = query(
            collection(db, "communityMessages"),
            orderBy("createdAt", "asc"),
            limit(100));
        
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const msgs = snapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    text: data.text,
                    userId: data.senderId,
                    createdAt: data.createdAt,
                };
            });
            setMessages(msgs);

            // Scroll to bottom when new messages arrive
            requestAnimationFrame(() => {
                flatListRef.current?.scrollToEnd({ animated: true });
            });
        });
        
        return () => unsubscribe();
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={messages}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={{ marginBottom: 12 }}>
                        <MessageBubble message={item} isMe={item.senderId === auth.currentUser?.uid} />
                    </View>
                )}
                contentContainerStyle={styles.content}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />
                
            

            <View style={[styles.inputBar, { position: 'absolute', left: 0, right: 0, bottom: effectiveKeyboardHeight ? effectiveKeyboardHeight + 2 : 6, elevation: 6 }]}> 
                <View style={styles.inputRow}>
                            <TextInput
                                placeholder="Type your message..."
                                mode="flat"
                                value={inputText}
                                onChangeText={setInputText}
                                style={[styles.textInput, styles.textInputInner]}
                                multiline={true}
                                numberOfLines={4}
                                textAlignVertical="top"
                                contentStyle={{ minHeight: 40, maxHeight: 120, paddingVertical: 8 }}
                                theme={{ colors: { placeholder: '#6b7280', text: '#000', primary: '#cdd9f6' } }}
                                selectionColor="#cdd9f6"
                            />
                    <Pressable
                        onPress={handleSend}
                        disabled={!inputText.trim() || isSending}
                        style={({ pressed }) => [styles.sendButton, { opacity: pressed ? 0.7 : 1, justifyContent: 'center', alignItems: 'center' }]}
                    >
                        {isSending ? (
                            <ActivityIndicator size="small" color="#4F7CFF" />
                        ) : (
                        <MaterialIcons name="send" size={40} color={inputText.trim() ? '#6080e9ff' : '#cdd9f6'} />
                        )}
                    </Pressable>
                </View>
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
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.2,
        shadowRadius: 3.5,
        },
    textInput: {
        backgroundColor: "#fff",
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInputInner: {
        flex: 1,
        marginRight: 6,
    },
    sendButton: {
        margin: 0,
        color: '#000'
    },

});