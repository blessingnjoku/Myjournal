import { View, Text, StyleSheet, TextInput} from 'react-native'
import Colors from '../Components/constants/Colors'

const SearchScreen = ({containerStyle}) => {
  return (
    <View style={[styles.container, { ...containerStyle}]}>
      <TextInput style={styles.searchbar} placeholder='search here... '></TextInput>
    </View>
  )
}

const styles = StyleSheet.create({
    searchbar:{
      borderWidth:0.5,
      borderColor:Colors.PRI,
      height:40,
      borderRadius:40,
      paddingLeft:15,
      fontSize:20,
      

    }
})

export default SearchScreen