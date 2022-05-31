//import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, AppRegistry, FlatList, SafeAreaView, StatusBar, TouchableOpacity, TextInput, Dimensions, useWindowDimensions   } from 'react-native';
import { WebView } from 'react-native-webview';
import { RenderHTML } from 'react-native-render-html';
import SigninAPI from '../../api/SigninAPI';
import UserAPI from '../../api/UserAPI';

//import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './LoginScreen';
import { useRoute } from '@react-navigation/core';

import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


function ProfileWellcomeScreen({navigation}) {

  let route = useRoute();
  let { width } = useWindowDimensions();
  let [profileDataState, setProfileDataState] = useState();
  let [contentAboutme, setContentAboutme] = useState();
  let [isHasAnyBlog, setIsHasAnyBlog] = useState(false);
  let [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    let asyncWork = async () => {
      
      await Promise.all([
        requestFindProfile(),
        requestFindBlogAboutmeByUserID(),
      ]);
      
      
      await stopLoading();
    }  
    
    asyncWork();

  }, [isLoading])

  let requestFindProfile = async () => {
    
    let profileurl = await AsyncStorage.getItem('profileurl');
    
    await UserAPI.requestFindProfile(profileurl, (result) => {
      console.log(result);
      if (result.profileData) {
        setProfileDataState(result.profileData);
      }
    });
  }

  let requestFindBlogAboutmeByUserID = async () => {


    let userid = await AsyncStorage.getItem('userid');

    await UserAPI.requestFindBlogAboutmeByUserID(Number.parseInt(userid), function(result) {
      console.log(result);
      //console.log("vuivuiiiiiiiiiiiiiii " + JSON.stringify(result))
      
      if (result) {

        setContentAboutme(result.userBlogAboutContent.content);
        //setIsHasAnyBlog(true);
      } else {
        // hiện button write something.
      }
    });
  }

  let stopLoading = async () => {
    setIsLoading(false);
  }

  let handleSelectEditProfile = () => {
    
  }

  let handleSelectMyCourses = () => {
    
  }

  let handleSelectMyVideos = () => {
    
  }

  return(
    <>
      { isLoading || !contentAboutme? (
        <Text>Loading...</Text>
      ) : (
        <>
          <View style={styles.container}>
            <Image
              style={styles.avatarSytle}
              source={{uri: profileDataState.imagepath}}
            />
            <Text style={styles.title1}>
              {profileDataState.username}
            </Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <View style={{borderRadius: 15, paddingBottom: 10, marginHorizontal: 5}}>
              <Button
                title="Edit profile"
                type="outline"
                onPress={handleSelectEditProfile}
              />
            </View>
            <View style={{borderRadius: 15, paddingBottom: 10, marginHorizontal: 5}}>
              <Button
                title="My courses"
                type="outline"
                onPress={handleSelectMyCourses}
              />
            </View>
            <View style={{borderRadius: 15, paddingBottom: 10, marginHorizontal: 5}}>
              <Button
                title="My videos"
                type="outline"
                onPress={handleSelectMyVideos}
              />
            </View>
          </View>
          
          <WebView
            style={styles.contentAboutmeStyle}
            originWhitelist={['*']}
            // scalesPageToFit={isAndroid() ? false : true}
            // injectedJavaScript={INJECTEDJAVASCRIPT}
            source={{ html: `<head><meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0"><body><div style="font-size:12px;">${contentAboutme}</div></body></html>`}}
          />
          {/* <RenderHTML 
            source={{html: `<div id='container'>${contentAboutme}</div>`} } 
            contentWidth={width}
          /> */}
        </>
      )}
    </>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  avatarSytle: {
      width: 200,
      height: 200,
      borderRadius: 100,
      borderWidth: 2,
      borderColor: 'black',
      marginHorizontal: 95,
      marginTop: 10
  },
  title1: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10
  },
  title2: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 5
  },
  contentAboutmeStyle: {
    flex: 1,
    width: Dimensions.get('screen').width * 1.2,
    justifyContent: 'center',
  },
  wrapContentAboutmeStyle: {
    borderRadius: 15,
    borderColor: 'black',
    borderWidth: 3,
  },
  videoStyle: {
    justifyContent: 'center',
    width: Dimensions.get('screen').width * 1.2,
    //backgroundColor: '#ecf0f1',
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