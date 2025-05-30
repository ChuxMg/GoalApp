import { useState } from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);
  const [editingGoalId, setEditingGoalId] = useState(null);

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  function endAddGoalhandler() {
    setModalIsVisible(false);
    setEditingGoalId(null); // Reset editing state if modal is cancelled
  }

  function addGoalHandler(enteredGoalText) {
    if (editingGoalId) {
      setCourseGoals((currentCourseGoals) =>
        currentCourseGoals.map((goal) =>
          goal.id === editingGoalId ? { ...goal, text: enteredGoalText } : goal
        )
      );
      setEditingGoalId(null);
    } else {
      setCourseGoals((currentCourseGoals) => [
        ...currentCourseGoals,
        { text: enteredGoalText, id: Math.random().toString() },
      ]);
    }

    setModalIsVisible(false); // Close modal after add/update
  }

  function startEditGoalHandler(id) {
    setEditingGoalId(id);
    setModalIsVisible(true); // Open modal for editing
  }

  function deleteGoalHandler(id) {
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => goal.id !== id);
    });
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <View style={styles.appContainer}>
        <Button
          title="Add New Goal"
          color="#41B06E"
          onPress={startAddGoalHandler}
        />
        <GoalInput
          visible={modalIsVisible}
          onGoalHandler={addGoalHandler}
          onCancel={endAddGoalhandler}
          editingGoal={
            editingGoalId
              ? courseGoals.find((goal) => goal.id === editingGoalId)
              : null
          }
        />
        <View style={styles.goalsContainer}>
          <FlatList
            data={courseGoals}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  text={itemData.item.text}
                  id={itemData.item.id}
                  onDeleteItem={deleteGoalHandler}
                  onLongPress={startEditGoalHandler} // Pass the handler here
                />
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
            alwaysBounceVertical={false}
          />
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },

  goalsContainer: {
    flex: 5,
  },
});
