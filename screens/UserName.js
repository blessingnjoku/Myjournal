import { View, Text, TextInput , StyleSheet, StatusBar, Dimensions, ImageBackground} from 'react-native'
import { useState } from 'react'
import Colors from '../Components/constants/Colors';
import BottomIcon from '../Components/BottomIcon';
import book from '../assets/images/book.jpg'
import AsyncStorage from '@react-native-async-storage/async-storage';



const UserName = ({onFinish}) => {
    const [name, setName] = useState('');
    const handleOnchangeText =(text)=>{
        setName(text);

    }
    const handleSubmit =async()=>{
        const user={name:name}
        await AsyncStorage.setItem('user', JSON.stringify(user));
        if(onFinish) return onFinish();
    }
    // console.log(user);

  return (
    <>
    <StatusBar hidden/>
    <View style={styles.container}>
   
    <Text style={styles.Title}>Please enter your name to continue</Text>
      <TextInput placeholder='Enter your name' style={styles.textInput} value={name} onChangeText={handleOnchangeText}/>
      {name?.trim().length >= 3 ?(
            <BottomIcon antIcoName='arrowright' onPress={handleSubmit} />
        ):null}
  
      
      
    </View>
    </>
  )
}
const { width } = Dimensions.get('window') - 50
// const {width }= Dimensions.get('window').width -50;
const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
       
     
    },
    textInput:{
        borderWidth:2,
        borderColor:Colors.PRI,
        width,
        height:50,
        borderRadius:10,
        padding:15,
        fontSize:25,
        color:Colors.PRI,
        marginBottom:10,
        textTransform:'capitalize'
        
    },

    Title:{
        alignSelf:'flex-start',
        paddingLeft:25,
        marginBottom:5,
        opacity:0.5,

    }
  });


export default UserName;