import { StyleSheet, Text, View } from "react-native";

export default function HelloScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🔥 HELLO WORLD — TELA FUNCIONANDO! 🔥</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111"
  },
  text: { 
    color: "#fff", 
    fontSize: 22,
  }
});
