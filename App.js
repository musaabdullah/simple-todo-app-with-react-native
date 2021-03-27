import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState, useEffect} from 'react';
import {StyleSheet, Text, View, Button, TextInput, FlatList, Image, ScrollView, TouchableOpacity, Keyboard} from 'react-native';
import axios from 'axios';


export default function App() {
  
  // console.log("Hello world");
  const [input, setInput] = useState("");
  const [list, setList] = useState([
    {id: 1, todo: "Learn javascript", completed: "false"},
    {id: 2, todo: "Learn React js", completed: "true"},
    {id: 3, todo: "Learn React native", completed: "false"}
  ]);

  const handleInput = (enterinput) => {
    setInput(enterinput);
   
    console.log(input);
  }

  const handleSubmit = () => {
    setList([...list, { id: Math.random(), todo: input, completed: "false"}])
    console.table(list);
    setInput("");
  }

  const handleCompleted = (id) => {
    setList(list.map((item) => {
      if(item.id === id) {
      return {
        ...item,  completed: !item.completed
      }
    }
    return item
    } ));
  }

  const handleRemove = (id) => {
    setList(list.filter((item) => item.id !== id));
    console.table(list)
  }

  return (
    <View style={styles.container} onPress={() => {Keyboard.dismiss()}}>
      <View style={styles.input}>
        <TextInput  onChangeText={handleInput} value={input} style={styles.text} placeholder="Enter Todo" />
        <Button  onPress={() => handleSubmit()} style={styles.button} title="Enter todo"/>
      </View>
      <View style={styles.list}>
        <FlatList data={list} keyExtractor={(item) => item.id} renderItem={({item}) => ( 
          <TouchableOpacity>
          <View style={styles.sublist}>
            <Text style={{width: "70%", fontSize: 20}}>{item.todo}</Text>
           
            <Button  onPress={() => handleRemove(item.id)} color="red" title="Remove" />  
           
         
          </View>
          </TouchableOpacity>
        )} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    marginTop: 20,
    width: "80%",
  },
  sublist: {
    display: "flex",
    flexDirection: "row",
    marginVertical: 10,
    // backgroundColor: "gray",
    padding: 4
  },
  container: {
    marginTop: 100,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: "gray",
  },
  input: {
    width: "80%",
    // backgroundColor: "red",
  },
  text:{
    padding: 7,
    borderWidth: 1,
    borderColor: "blue",
    borderStyle: 'solid',
    fontSize: 20,
    marginVertical: 5,
    // cursor: "pointer",
    borderRadius: 4
  },
  button: {
    padding: 5,

  }
});
