// /chatlogic/chatService.js
import { db } from "../Firebase/firebase";
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";

// Send a message
export const sendMessage = async (chatId, senderId, receiverId, text) => {
  try {
    await addDoc(collection(db, "chats", chatId, "messages"), {
      senderId,
      receiverId,
      text,
      timestamp: new Date(),
    });
  } catch (error) {
    console.log("Error sending message:", error);
  }
};

// Listen for messages in real-time
export const listenMessages = (chatId, setMessages) => {
  const q = query(
    collection(db, "chats", chatId, "messages"),
    orderBy("timestamp", "asc")
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const msgs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setMessages(msgs);
  });

  return unsubscribe; // call this to stop listening when component unmounts
};
