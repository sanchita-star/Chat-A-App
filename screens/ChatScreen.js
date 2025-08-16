// /screens/ChatScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { auth, db } from "../Firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { sendMessage, listenMessages } from "../chatlogic/chatService";
import ChatBubble from "../components/ChatBubble";

export default function HomeScreen({ route, navigation }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [currentUserName, setCurrentUserName] = useState("");
  const currentUserId = auth.currentUser.uid;
  const { receiverId, receiverName } = route.params;

  // Fetch current user name from Firestore
  useEffect(() => {
    const fetchCurrentUserName = async () => {
      const usersRef = collection(db, "users");
      const snapshot = await getDocs(usersRef);
      const me = snapshot.docs.find(doc => doc.id === currentUserId);
      setCurrentUserName(me?.data()?.name || "Me");
    };
    fetchCurrentUserName();
  }, []);

  useEffect(() => {
    if (!receiverId) navigation.navigate("UserListScreen");
  }, [receiverId]);

  const chatId =
    currentUserId < receiverId
      ? `${currentUserId}_${receiverId}`
      : `${receiverId}_${currentUserId}`;

  useEffect(() => {
    if (receiverId) {
      const unsubscribe = listenMessages(chatId, setMessages);
      return () => unsubscribe();
    }
  }, [receiverId]);

  const handleSend = () => {
    if (text.trim() !== "") {
      sendMessage(chatId, currentUserId, receiverId, text);
      setText("");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={90}
    >
      {/* Top Section */}
      <View style={styles.topSection}>
        <Text style={styles.title}>{receiverName}</Text>
        <View style={styles.userBadge}>
          <Text style={styles.badgeText}>{currentUserName}</Text>
        </View>
      </View>

      {/* Middle Section */}
      <View style={styles.middleSection}>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ChatBubble
              message={item}
              isSender={item.senderId === currentUserId}
            />
          )}
          contentContainerStyle={{ paddingBottom: 80 }}
        />

        {/* Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            placeholder="Type a message..."
          />
          <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
            <Text style={{ color: "#fff" }}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Made by Sancho</Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topSection: {
    padding: 5,
    backgroundColor: "#fff",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  middleSection: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#ffe0b2", // coordinated middle background
  },
  footer: {
     padding: 15,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontFamily:  'Lato-Regular' ,
  },
  inputContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 25,
    backgroundColor: "#fff",
  },
  sendButton: {
    backgroundColor: "#007bff",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    marginLeft: 10,
  },
  userBadge: {
    backgroundColor: "#007bff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    color: "#fff",
    fontWeight: "bold",
  },
  footerText: {
    fontSize: 14,
    color: "#070707ff",
    fontWeight: "bold",
  },
});
