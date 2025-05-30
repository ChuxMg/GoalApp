import { useEffect, useState } from "react";
import {
  StyleSheet,
  Button,
  TextInput,
  View,
  Modal,
  Image,
} from "react-native";

function GoalInput(props) {
  const [enteredGoalText, setEnteredGoalText] = useState("");

  useEffect(() => {
    if (props.editingGoal) {
      setEnteredGoalText(props.editingGoal.text);
    } else {
      setEnteredGoalText(""); //Clear text if not editing
    }
  }, [props.editingGoal]);

  function goalInputHandler(enteredText) {
    setEnteredGoalText(enteredText);
  }

  function addOrUpdateGoalHandler() {
    props.onGoalHandler(enteredGoalText);
  }

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <Image
          style={styles.image}
          source={require("../assets/images/goal.png")}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Your course goal!"
          onChangeText={goalInputHandler}
          value={enteredGoalText}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Cancel" onPress={props.onCancel} color="#EC3944" />
          </View>
          <View style={styles.button}>
            <Button
              title={props.editingGoal ? "Update Goal" : "Add Goal"}
              onPress={addOrUpdateGoalHandler}
              color="#141E46"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default GoalInput;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#41B06E",
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#FFF5E0",
    backgroundColor: "#FFF5E0",
    color: "#141E46",
    borderRadius: 6,
    width: "100%",
    padding: 16,
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: "row",
  },
  button: {
    width: 100,
    marginHorizontal: 8,
  },
});
