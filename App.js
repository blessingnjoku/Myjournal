import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Note from './screens/Note';
import UserName from './screens/UserName';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NoteContent from './Components/NoteContent';
import { NavigationContainer } from '@react-navigation/native';
import NoteProvider from './app/contextApi/NoteProvider';

const Stack = createNativeStackNavigator();
const App =()=> {

 const [user, setUser]=useState({})
    const findUser=async()=>{
      const data= await AsyncStorage.getItem('user');
      if(data !== null){
      setUser(JSON.parse(data))
      }

      

    }
    useEffect(()=>{
      findUser();
     
    },[])
    const RenderNoteScreen=(props)=><Note {...props} user={user}/>

    if(!user.name)return <UserName  onFinish={findUser}/>;
  return (
    <NavigationContainer>
      <NoteProvider>
      <Stack.Navigator screenOptions={{headerTitle:'', headerTransparent:true}}>
      <Stack.Screen name="Note" component={RenderNoteScreen} />
      <Stack.Screen name="NoteContent" component={NoteContent} />

    </Stack.Navigator>
      </NoteProvider>

    
    </NavigationContainer>
   

    
    
  );
}

const styles = StyleSheet.create({
  container: {
   
  },
});
export default App;
