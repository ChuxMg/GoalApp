// import { StyleSheet, View, Text, Pressable } from "react-native";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";


function GoalItem(props) {
  const renderRightActions = () => {
    return (
      <TouchableOpacity
        onPress={() => props.onDeleteItem(props.id)}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <Pressable
        android_ripple={{ color: "#210644" }}
        // onPress={props.onDeleteItem.bind(this, props.id)}
        // onPress={props.onDeleteItem.bind(this, props.id)} // Removed this line
        style={({ pressed }) => pressed && styles.pressedItem}
      >
        <View style={styles.goalItem}>
          <Text style={styles.goalText}>{props.text}</Text>
        </View>
      </Pressable>
    </Swipeable>
  );
}

export default GoalItem;

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: "#41B06E",
  },
  pressedItem: {
    opacity: 0.5,
  },
  goalText: {
    color: "white",
    padding: 8,
  },
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 75,
    marginVertical: 8,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
