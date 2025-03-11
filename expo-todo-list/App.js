import React, {useState} from "react";
import {SafeAreaView, FlatList, StyleSheet, Text, View, TextInput, Button} from "react-native";
import {CheckBox} from "@rneui/themed";
export default function App(){
  const [tasks, setTasks] = useState([
    { key: "1", description: "Homework", completed: false },
    { key: "2", description: "Clean Kitchen", completed: false },
    { key: "3", description: "Laundry", completed: false },
  ]);
  const [newTask, setNewTask] = useState("");
  const toggleComplete = (key)=>{
    setTasks((prevTasks)=>
      prevTasks.map((task)=>
        task.key === key ? {...task, completed: !task.completed} : task
      )
    );
  };
  const addTask = ()=>{
    if (newTask.trim()!== "") {
      setTasks((prevTasks)=>[
        ...prevTasks,
        {key: (prevTasks.length + 1).toString(), description: newTask, completed: false},
      ]);
      setNewTask("");
    }
  };
  let renderItem = ({item})=>{
    return (
      <View style={styles.itemContainer}>
        <CheckBox checked={item.completed} onPress={() => toggleComplete(item.key)} />
        <Text style={[styles.taskText, item.completed && styles.completedText]}>
          {item.description}
        </Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a task..."
          value={newTask}
          onChangeText={setNewTask}
        />
        <Button title="Add" onPress={addTask} />
      </View>
      <FlatList data={tasks} renderItem={renderItem} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  completedText: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
    color: "black",
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});