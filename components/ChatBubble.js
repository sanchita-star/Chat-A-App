// /components/ChatBubble.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ChatBubble({ message, isSender }) {
  return (
    <View style={[styles.container, isSender ? styles.sender : styles.receiver]}>
      <Text style={[styles.text, isSender ? styles.senderText : styles.receiverText]}>
        {message.text}
      </Text>
      {message.timestamp && (
        <Text style={styles.time}>
          {new Date(message.timestamp?.seconds * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: "75%",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  sender: {
    backgroundColor: "#007bff",
    alignSelf: "flex-end",
  },
  receiver: {
    backgroundColor: "#e5e5e5",
    alignSelf: "flex-start",
  },
  text: {
    fontSize: 16,
  },
  senderText: {
    color: "#fff",
  },
  receiverText: {
    color: "#000",
  },
  time: {
    fontSize: 10,
    color: "#555",
    alignSelf: "flex-end",
    marginTop: 3,
  },
});
