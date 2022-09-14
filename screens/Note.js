import { View, Text, StatusBar, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import SearchScreen from './SearchScreen';
import BottomIcon from '../Components/BottomIcon';
import Colors from '../Components/constants/Colors';
import NoteModal from '../Components/NoteModal';

const Note = ({user}) => {
    const [greetings, setGreetings] =useState();
    const [modalVisible, setModalVisible] = useState(false);

    const findTime=()=>{
        const time = new Date().getHours();
        if(time ===0 || time<12)return setGreetings('Morning');
        if(time ===1 || time<17)return setGreetings('Afternoon');
        setGreetings('Evening')

    }

    useEffect(()=>{
        findTime();
    },[])

    const handleOnsubmit=(title, desc)=>{

    }
  return (
    <>
    <StatusBar barStyle='dark-content' backgroundColor={Colors.LIGHT}/>
   <View style={styles.container}>
      <Text style={styles.header}>{`Good ${greetings} ${user.name} `}</Text>
      <SearchScreen containerStyle={{marginVertical:15}}/>
      <View style={[StyleSheet.absoluteFillObject, styles.emptyHeaderContainer]}>
        <Text style={styles.emptyheader}>Make Note</Text>
        <BottomIcon antIcoName='plus' style={styles.addbtn} onPress={() => setModalVisible(true)}/>
      </View>
    </View>
    <NoteModal visible={true} onClose={() => setModalVisible(false)} onSubmit={handleOnsubmit}/>
    </>
    
  )
}

const styles =StyleSheet.create({
  header:{
        fontSize:25,
        fontWeight:'bold',
        marginBottom:50,
       
      
        backgroundColor:'red'
 

    },
    container:{
      paddingHorizontal:20,
      flex:1


    },
    emptyHeaderContainer:{
      justifyContent:'center',
      flex:1,
      alignItems:'center',
      zIndex:-1,
      



    },
    emptyheader:{
      fontSize:30,
      textTransform:'uppercase',
      fontWeight:'bold',
      opacity:0.2,

    },
    addbtn:{
      position:'absolute',
      right:15,
      bottom:50,
    }

})

export default Note;