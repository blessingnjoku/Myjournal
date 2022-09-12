import { View, Text, TextInput , StyleSheet, StatusBar, Dimensions} from 'react-native'
import React from 'react'
import Colors from '../Components/constants/Colors';

const UserName = () => {
  return (
    <>
    <StatusBar hidden/>
    <View style={styles.container}>
      <Text style={styles.Title}>Please enter your name to continue</Text>
      <TextInput placeholder='Enter your name' style={styles.textInput}/>
    </View>
    </>
  )
}
const width   =Dimensions.get('window').width -50;
const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
     
    },
    textInput:{
        borderWidth:2,
        borderColor:Colors.PRI,
        width,
        height:50,
        borderRadius:10,
        padding:15,
        fontSie:25,
        color:Colors.PRI


        
    },

    Title:{
        alignSelf:'flex-start',
        paddingLeft:25,
        marginBottom:5,
        opacity:0.5,

    }
  });


export default UserName;