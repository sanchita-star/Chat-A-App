//userlistscreen
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { db, auth } from "../Firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function UserListScreen({ navigation }) {
  const [users, setUsers] = useState([]);
  const [currentUserName, setCurrentUserName] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      if (!auth.currentUser) return;

      const usersRef = collection(db, "users");
      const snapshot = await getDocs(usersRef);

      // Exclude current user from the list
      const userList = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(u => u.id !== auth.currentUser.uid);

      // Get current user's name for badge
      const me = snapshot.docs.find(doc => doc.id === auth.currentUser.uid);
      setCurrentUserName(me?.data()?.name || "Me");

      setUsers(userList);
    };

    fetchUsers();
  }, []);

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        navigation.replace("LoginScreen");
      })
      .catch(error => {
        Alert.alert("Logout Error", error.message);
      });
  };

  return (
    <View style={styles.container}>
      {/* Top Section: User Badge + Logout */}
      <View style={styles.topSection}>
        <View style={styles.userBadge}>
          <Text style={styles.badgeText}>{currentUserName}</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Middle Section: User List */}
      <View style={styles.middleSection}>
        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.userButton}
              onPress={() =>
                navigation.navigate("ChatScreen", {
                  receiverId: item.id,
                  receiverName: item.name,
                })
              }
            >
              <Text style={styles.userText}>{item.name || "Unnamed User"}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Made by Sancho</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topSection: {
    padding: 10,
    backgroundColor: "#fff",
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
  userButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  userText: {
    fontSize: 16,
    fontFamily:  'Lato-Regular' ,
  },
  userBadge: {
    backgroundColor: "#007bff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  badgeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: "#ff4d4d",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  footerText: {
    fontSize: 14,
    color: "#070707ff",
    fontWeight: "bold",
  },
});
