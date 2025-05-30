import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { useState } from "react";


function GoalItem(props) {
  const [isEditButtonVisible, setIsEditButtonVisible] = useState(false); // Add state variable

  const handleItemPress = () => {
    if (isEditButtonVisible) {
      setIsEditButtonVisible(false);
    }
    // If there was an original onPress for the item (like select/view details),
    // it could be called here, potentially after checking !isEditButtonVisible
    // or if the tap was not to close the edit button.
    // For now, only closing the edit button.
  };


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
      <TouchableOpacity onLongPress={() => setIsEditButtonVisible(true)}>
        <View style={styles.goalItemContainer}>
          <Pressable
            android_ripple={{ color: "#210644" }}
            style={({ pressed }) => pressed && styles.pressedItem}
            onPress={handleItemPress} // Added onPress handler
          >
            <View style={styles.goalItem}>
              <Text style={styles.goalText}>{props.text}</Text>
            </View>
          </Pressable>

          {/* Conditionally render Edit button outside Pressable */}
          {isEditButtonVisible && (
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => {
                props.onLongPress(props.id);
                setIsEditButtonVisible(false);
              }}
            >
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
}

export default GoalItem;

const styles = StyleSheet.create({
  goalItemContainer: {
    // Style for the new wrapper view
    marginVertical: 8,
    marginHorizontal: 8, // Added horizontal margin
    backgroundColor: "#41B06E", // Background applied to container
    borderRadius: 6, // Border radius applied to container
    overflow: "hidden", // Ensure children (like Pressable ripple) conform to border radius
  },

  goalItem: {
    padding: 8,
  },
  pressedItem: {
    opacity: 0.5,
  },
  goalText: {
    color: "white",
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

  // Style for the Edit button
  editButton: {
    backgroundColor: "#007bff", // Blue color for edit button
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 8,
    marginHorizontal: 16, // Align with typical item content indentation
    alignSelf: "center", // Center button if it's narrower than text
  },
  editButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
