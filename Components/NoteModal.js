import { View, Text, StyleSheet, Modal, StatusBar, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { useState } from 'react'
import Colors from './constants/Colors'
import BottomIcon from './BottomIcon';

const NoteModal = ({visible, onClose, onSubmit}) => {

const [title, setTitle]= useState('');
const [desc, setDesc]= useState('');

    const handleCLoseModal =()=>{
        Keyboard.dismiss();
    }

    const handleOnchangeText =(text,valueFor)=>{

        if(valueFor === 'title')setTitle(text);
        if(valueFor === 'desc' ) setDesc(text);
    }
    const handleSubmit=()=>{
        if(!title.trim() && !desc.trim())return onClose();
        onSubmit(title, desc)
        setDesc('');
        setTitle('');
        onClose();

    }
    
  return (
    <>
    <StatusBar hidden/>
   <Modal visible={visible} animationType='fade'>
   <View style={styles.container}>
   <TextInput style={[styles.input, styles.title]}  placeholder='Title' value={title} onChangeText={text => handleOnchangeText(text,'title')}/>
   <TextInput style={[styles.input, styles.desc]} placeholder="Your content" multiline  value={desc} onChangeText={text=>handleOnchangeText(text,'desc')}/>
   
   </View>
   <View style={styles.btnContainer}>
   <BottomIcon size={15} antIcoName = 'check' onPress={handleSubmit}/>
   
   {title.trim() || desc.trim()?(<BottomIcon size={15} antIcoName = 'close' style={{marginLeft:15}}/>
   
   ):null
   }
   </View>
   <TouchableWithoutFeedback onPress={handleCLoseModal}>
    <View style={[styles.closebtn, StyleSheet.absoluteFillObject]}></View>
   </TouchableWithoutFeedback>
       

    </Modal>
    </>
   
  )
}
const styles =StyleSheet.create({
    container:{
        paddingTop:15,
        paddingHorizontal:20,
        marginTop:20,
        


    },
    title:{
        height:40,
        marginBottom:15,
        fontWeight:'bold',

    },
    input:{
        fontSize:20,
        color:Colors.DARK,
        borderBottomColor:Colors.PRI,
        borderBottomWidth:2,
    },
    desc:{
        height:100,
    },
    closebtn:{
        flex:1,
        zIndex:-1,
        

    },
    btnContainer:{
        flexDirection:'row',
        justifyContent:'center',
        paddingVertical:15,


    }


})

export default NoteModal