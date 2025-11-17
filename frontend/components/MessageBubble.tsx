import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function MessageBubble({message, isMe}: {message: any, isMe: boolean}) {
    const time = message.createdAt && typeof message.createdAt.toDate === 'function' ?
        message.createdAt.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "";
  return (
    <View style={[styles.row, isMe ? styles.rowRight : styles.rowLeft]}>
        <View style={[styles.bubble, isMe ? styles.myBubble : styles.theirBubble]}>
            <Text style={styles.text}>{message.text}</Text>
            <Text style={styles.time}>{time}</Text>
        </View>
      
    </View>
  );

}

const styles = StyleSheet.create({
  row: { marginVertical: 6, flexDirection: "row" },
  rowRight: { justifyContent: "flex-end" },
  rowLeft: { justifyContent: "flex-start" },
  bubble: { maxWidth: "80%", padding: 8, borderRadius: 12 },
  myBubble: { backgroundColor: "#CDD9F6", alignItems: "flex-end" },
  theirBubble: { backgroundColor: "#ECE6F0", alignItems: "flex-start", borderWidth: 1, borderColor: "#eee" },
  text: { color: "#111", fontSize: 15 },
  time: { fontSize: 10, color: "#666", marginTop: 4 },
});
