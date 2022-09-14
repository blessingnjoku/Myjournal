import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Note from './screens/Note';
import UserName from './screens/UserName';

const App =()=> {
 const [user, setUser]=useState({})
    const findUser=async()=>{
      const data= await AsyncStorage.getItem('user');
      if(data!== null){
      setUser(JSON.parse(data))
      }

      

    }
    useEffect(()=>{
      findUser()
      
     
    },[])

    if(!user.name)return <UserName  onFinish={findUser}/>;
  return (
    
   <Note user={user}/>
    
    
  );
}

const styles = StyleSheet.create({
  container: {
   
  },
});
export default App;
