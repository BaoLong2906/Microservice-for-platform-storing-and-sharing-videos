//import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, AppRegistry, FlatList, SafeAreaView, StatusBar, TouchableOpacity, TextInput  } from 'react-native';
import SigninAPI from '../../api/SigninAPI';

import { AsyncStorage } from 'react-native';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './LoginScreen';

function ProfileWellcomeScreen({navigation}) {

  const [selectedId, setSelectedId] = useState(null);

  //let [isLoading, setIsLoading] = useState(true);
  
  let handlePress = () => {
    setSelectedId(item.id);
  }

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  let checkUserSignedIn = async () => {
    let context = this;
    try {
       let value = await AsyncStorage.getItem('accessToken');
       if (value != null){
          // do something
          console.log('hi');
          setTurnTo('PROFILE_FRAGMENT');
          //setIsLoading(false);
       }
       else {
          // do something else
          // setIsLoading(false);
          // return (
          //   <LoginScreen/>
          // );
          
          console.log(value);
          
          //setIsLoading(false);
      }
    } catch (error) {
      // Error retrieving data
      console.log("có lỗi");
    }
    
  }


  return(
    <>
      {/* {content} */}
      <SafeAreaView style={styles.flatList1}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
        />
      </SafeAreaView>

    </>
  );
}

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.title}</Text>
  </TouchableOpacity>
);

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  usernameinput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  passwordinput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  }
});

export default ProfileWellcomeScreen;