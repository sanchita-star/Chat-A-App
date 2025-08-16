// screens/LoginScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/firebase";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Logged in:", userCredential.user.email);
        navigation.replace("UserListScreen", {
          receiverId: "uid_of_other_user",
          receiverName: "Raghav",
        });
      })
      .catch((error) => {
        Alert.alert("Login Failed", error.message);
      });
  };

  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={styles.topSection}>
        <Text style={styles.title}>Login</Text>
      </View>

      {/* Middle Section */}
      <View style={styles.middleSection}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />

        <View style={{ marginVertical: 10 }}>
  <Button
    title="Login"
    onPress={() => navigation.navigate("UserListScreen")}
  />
</View>

<View style={{ marginVertical: 10 }}>
  <Button
    title="Go to Signup"
    onPress={() => 
      navigation.navigate("SignupScreen")
    }
     

  />
</View>
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
    padding: 5,
    backgroundColor: "#fff",
    alignItems: "center",
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
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  footerText: {
    fontSize: 14,
    color: "#070707ff",
    fontWeight: "bold",
  },
});
