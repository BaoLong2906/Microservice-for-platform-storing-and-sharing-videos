import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, Button, Alert, AppRegistry, FlatList, SafeAreaView, StatusBar, TouchableOpacity, TextInput  } from 'react-native';
import SigninAPI from '../../api/SigninAPI';

import AsyncStorage from '@react-native-async-storage/async-storage';

function LoginScreen({navigation, re_render}) {

  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");

  useEffect(() => {
    let asyncWork = async () => {
      await AsyncStorage.clear();
      await checkUserSignedIn();
    }

    asyncWork();

  }, [])

  let handlePress = () => {
    SigninAPI.requestAuthWithEmailAndPassword(email, password, function(workState) {
      if (workState === "done") {
        navigation.replace('ProfileScreen');
      }
    });    
  }

  let checkUserSignedIn = async () => {
    let context = this;
    try {
       let value = await AsyncStorage.getItem('accessToken');
       if (value != null){
          // do something
          console.log(value);
          navigation.replace('ProfileScreen');
       }
       else {
          // do something else
          console.log(value);
      }
    } catch (error) {
      // Error retrieving data
      console.log("có lỗi");
    }
  }

  return (
    <>
        
        <View>
          <Text style={styles.title}>Wellcome to Genki Dama</Text>
          <Image
            style={styles.tinyLogo}
            source={require('../../assets/images/genkilogo.png')}
          />
        </View>
          
        <View>
          <Text style={styles.emailandpasswordtile}>Your email:</Text>
          <TextInput 
            style={styles.emailinput}
            placeholder="Fill your email here"
            onChangeText={onChangeEmail}
          /> 
        </View>

        <View>
          <Text style={styles.emailandpasswordtile}>Your password:</Text>
          <TextInput 
            style={styles.passwordinput} 
            secureTextEntry={true}
            placeholder="Fill your password here"
            onChangeText={onChangePassword}
          /> 
        </View>

        <View>
          <Text style={{marginLeft: 15}}>Don't have account ? Sign-up here</Text>
        </View>

        <View style={styles.ButtonLoginView}>
          <Button
            title="Login"
            
            onPress={handlePress}
          />
        </View>
      
    </>
  );
}

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
    fontSize: 24,
    textAlign: 'center',
  },
  emailandpasswordtile: {
    marginHorizontal: 15
  },
  emailinput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
  },
  passwordinput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 15,
    padding: 10
  },
  tinyLogo: {
    width: 200,
    height: 200,
    marginBottom: 10,
    marginHorizontal: 95
  },
  ButtonLoginView: {
    marginHorizontal: 125,
    marginTop: 15,
    width: 150
  }
});

export default LoginScreen;