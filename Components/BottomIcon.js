import { View, Text, StyleSheet} from 'react-native'
import React from 'react'
import {AntDesign} from '@expo/vector-icons'
import Colors from './constants/Colors'


const BottomIcon = ({antIcoName, size, color, style,onPress}) => {
  return (
    <AntDesign name={antIcoName} size={size||24} color={color || Colors.DARK} style={[styles.icon, {...styles}] } onPress={onPress}/>
  )
}

const styles= StyleSheet.create({
    icon:{
        backgroundColor:Colors.PRI,
        padding: 15,
        borderRadius:50,
        elevation:5,
        
    },
    color:{
        backgroundColor:Colors.LIGHT,
    }
})


export default BottomIcon