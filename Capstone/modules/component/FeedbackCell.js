import React, {Component} from 'react';
import { View, Text, StyleSheet } from "react-native";
import { Feedback } from "./Feedback";

export default function FeedbackCell({ item }: { item: Feedback }) {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.id}>{item.id}</Text> */}
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.time}>{item.time}</Text>
      {/* <Text style={styles.body}>{item.body}</Text> */}
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      borderRadius: 10,
      borderColor: "white",
      borderWidth: 1,
      padding: 10,
      marginBottom: 10,
      color: "white",
      backgroundColor: "#fcb456",
      justifyContent:'center',
      alignItems:'center'
    },
    id: {
      color: "gray",
      fontSize: 15,
      fontWeight: "bold",
      marginBottom: 5,
    },
    title: {
      color: "white",
      fontSize: 15,
      marginBottom: 5,
    },
    time: {
        color: "white",
        fontSize: 13,
      },
    body: {
      color: "white",
      fontSize: 15,
    },
  });