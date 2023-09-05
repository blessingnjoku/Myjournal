import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import SearchScreen from "./SearchScreen";
import BottomIcon from "../Components/BottomIcon";
import Colors from "../Components/constants/Colors";
import NoteModal from "../Components/NoteModal";
import JournalContentBox from "../Components/JournalContentBox";
import {useNotes } from "../app/contextApi/NoteProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";





const Note = ({ user, navigation }) => {
  const [greetings, setGreetings] = useState();
  const [modalVisible, setModalVisible] = useState(false);
 const {mynotes,  setMynotes}= useNotes()

  const findGreetings = () => {
    const time = new Date().getHours();
    if (time === 0 || time < 12) return setGreetings("Morning");
    if (time === 1 || time < 17) return setGreetings("Afternoon");
    setGreetings("Evening");
  };

  useEffect(() => {
    findGreetings();
  
  }, []);

 

  const handleOnsubmit = async (title, desc) => {
    const note = { id: Date.now(), title, desc, timer: Date.now() };
    const updatedContent = [...mynotes, note];
    setMynotes(updatedContent);
    await AsyncStorage.setItem("mynotes", JSON.stringify(updatedContent));
  };

  const ViewNote = (note) => {
    navigation.navigate("NoteContent", { note });
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.LIGHT} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.header}>{`Good ${greetings} ${user.name} `}</Text>
          {mynotes.length ? (
            <SearchScreen containerStyle={{ marginVertical: 15 }} />
          ) : null}

          <FlatList
            numColumns={2}
            data={mynotes}
            columnWrapperStyle={{
              justifyContent: "space-between",
              marginBottom: 15,
            }}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <JournalContentBox item={item} onPress={() => ViewNote(item)} />
            )}
          />
          {!mynotes.length ? (
            <View
              style={[
                StyleSheet.absoluteFillObject,
                styles.emptyHeaderContainer,
              ]}
            >
              <Text style={styles.emptyheader}>Make Note</Text>
            </View>
          ) : null}
        </View>
      </TouchableWithoutFeedback>
      <BottomIcon
        antIcoName="plus"
        style={styles.addBtn}
        onPress={() => setModalVisible(true)}
      />

      <NoteModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleOnsubmit}
      />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 50,
  },
  container: {
    paddingHorizontal: 20,
    flex: 1,
    zIndex: 1,
  },
  emptyHeaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: -1,
  },
  emptyheader: {
    fontSize: 30,
    textTransform: "uppercase",
    fontWeight: "bold",
    opacity: 0.2,
  },
  addBtn: {
    position: "absolute",
    right: 15,
    bottom: 0,
    fontSize: 50,
    zIndex:1,
  },
});

export default Note;
