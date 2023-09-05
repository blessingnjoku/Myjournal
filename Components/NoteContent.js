import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { Header } from "@react-navigation/stack";
import Colors from "./constants/Colors";
import BottomIcon from "./BottomIcon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNotes } from "../app/contextApi/NoteProvider";
import NoteModal from "./NoteModal";

const formatData = (ms) => {
  const date = new Date(ms);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hrs = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();
 
  return `${day}/${month}/${year} - ${hrs}:${min}:${sec}`;
};

const NoteContent = (props) => {
  // const { note } = props.route.params;
  const [note, setNote] = useState(props.route.params.note)
  const headerHeight = Header.HEIGHT;
  const { setMynotes}=useNotes()
  const [showModal, setShowModal] =useState()
  const [isEdit, setIsEdit]=useState(false)

  const deleteNote = async () => {
    const result = await AsyncStorage.getItem("note");
    // In deleteNote function, change "note" to "notes"


    let notes = [];
    if (result !== null) notes = JSON.parse(result);
  
    const newNotes = notes.filter((n) => n.id !== note.id);
    setMynotes(newNotes)
    await AsyncStorage.setItem("notes", JSON.stringify(newNotes));

    props.navigation.goBack();
  };

  const DeleteAlert = () => {
    Alert.alert(
      "are you sure?",
      "this will delete this parmenently",

      [
        {
          text: "delete",
          onPress: deleteNote,
        },
        {
          text: "no thank",
          onPress: () => console.log("no"),
        },
      ],
      {
        cancelable: true,
      }
    );
  };
  const handleUpdate=async(title, desc, time)=>{
    const result = await AsyncStorage.getItem('notes')
    let notes = []
    if(result !== null) notes = JSON.parse(result)

    const newNotes=notes.filter(n=>{
      if(n.id==note.id){
        n.title=title
        n.desc=desc
        n.isUpdated=true
        n.time=time

        setNote(n)

      }
      return n
    })
    setMynotes(newNotes)
    await AsyncStorage.setItem('note', JSON.stringify(newNotes))

  }
  const handleClose=()=>{
    setShowModal(false)
    setIsEdit(false);


  }
  const openEditModal=()=>{
    setIsEdit(true)
    setShowModal(true)
  }


  
  return (
    <>
      <ScrollView
        contentContainerStyle={[styles.container, { paddingTop: headerHeight }]}
      >
        <Text style={styles.time}>{note.isUpdated? `Updated At ${formatData(note.time)}`:`Created At ${formatData(note.time)}`}</Text>
        <Text style={styles.title}>{note.title}</Text>
        <Text style={styles.desc}>{note.desc}</Text>
      </ScrollView>
      <View style={styles.btnContainer}>
        <BottomIcon
          antIcoName="edit"
          style={{ marginBottom: 18 }}
          onPress={openEditModal}
        />
        <BottomIcon
          antIcoName="delete"
          style={{ backgroundColor: Colors.ERROR }}
          onPress={DeleteAlert}
        />
      </View>
      <NoteModal isEdit={isEdit} note={note} onClose={handleClose} onSubmit={handleUpdate} visible={showModal}/>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 30,
  },
  title: {
    fontSize: 30,
    color: Colors.PRI,
    fontWeight: "bold",
  },
  desc: {
    fontSize: 20,
    opacity: 0.5,
  },
  time: {
    textAlign: "right",
    fontSize: 12,
    opacity: 0.5,
  },
  btnContainer: {
    position: "absolute",
    right: 15,
    bottom: 0,
  },
});

export default NoteContent;
