import React, { createContext, useContext, useEffect, useState } from 'react'

import AsyncStorage from "@react-native-async-storage/async-storage";




const NoteContext = createContext()

const NoteProvider = ({children}) => {
  const [mynotes, setMynotes] = useState([]);


  useEffect(() => {
  
    findContent();
  }, []);

  // const findContent = async () => {
  //   const result = await AsyncStorage.getItem("mynotes");
  //   console.log(result);
  //   if (result !== null) setMynotes(JSON.parse(result))
 
  // };

  const findContent = async () => {
    try {
      const result = await AsyncStorage.getItem("mynotes");
      if (result !== null) setMynotes(JSON.parse(result));
    } catch (error) {
      console.error("Error fetching notes from AsyncStorage:", error);
    }
  };
  


  return (
    <NoteContext.Provider value={{mynotes, setMynotes, findContent}}>
        {children}
    </NoteContext.Provider>
  )
}
const findContent = async () => {
  try {
    const result = await AsyncStorage.getItem("mynotes");
    if (result !== null) setMynotes(JSON.parse(result));
  } catch (error) {
    console.error("Error fetching notes from AsyncStorage:", error);
  }
};


// const styles = Stylesheet.creat({
//     container:{

//     }
// })

export const useNotes =()=> useContext(NoteContext)
export default NoteProvider;