import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, AppRegistry, FlatList, SafeAreaView, StatusBar, TouchableOpacity, TextInput, Dimensions, useWindowDimensions, ScrollView   } from 'react-native';
import PostStatusApi from '../../api/PostStatusApi';

import { useNavigation, useRoute } from '@react-navigation/core';
import CommentItem from '../../components/CommentItem';

import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { REACT_APP_API_URL } from '../../api/axiosClient'; 


function CreateNewPostStatusScreen({props}) {

  let route = useRoute();
  let navigation = useNavigation();

  let [ isLoading, setIsLoading ] = useState(true);
  let [ isLogin, setIsLogin] = useState(false);

  const [selectedId, setSelectedId] = useState(null);

  let [myComment, setMyComment] = useState('');

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    let asyncWork = async () => {
      await checkUserSignedIn();
      
      await stopLoading();
    }

    asyncWork();
  }, [isLoading])

  
  let stopLoading = async () => {
    setIsLoading(false);
  }

  let checkUserSignedIn = async () => {
    let context = this;
    try {
       let value = await AsyncStorage.getItem('accessToken');
       if (value != null){
          // do something
          console.log(value);
          setIsLogin(true);
       }
       else {
          // do something else
          console.log(value);
          setIsLogin(false);
      }
    } catch (error) {
      // Error retrieving data
      console.log("có lỗi");
    }
  }

  let handleSubmitSendComment = async () => {
    // let promise1 = async (userid, accessToken) => {
    //   PostStatusApi.insertComment(userid, route.params.postStatusId, myComment, accessToken, function(result) {
    //     if (result.isSuccess === true) {
    //       // setMyComment('');
    //       // set_re_render(true);
    //     }
        
    //   });
    // }

    let promise1 = async () => {
      navigation.replace("PostStatusCommentScreen", {postStatusId: route.params.postStatusId});
    }

    let userid = await AsyncStorage.getItem('userid');
    let accessToken = await AsyncStorage.getItem('accessToken');
    
    await UploadPhotoAsync(userid, accessToken);
    await promise1();
  }
  
  let openAndTakeImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult);

    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
  }

  let UploadPhotoAsync = async (userid, accessToken) => {
    

    await uploadAsync(accessToken, userid);
  
    // Display the camera to the user and wait for them to take a photo or to cancel
    // the action
    // let result = await ImagePicker.launchCameraAsync({
    //   allowsEditing: true,
    //   aspect: [4, 3],
    // });
  
    // if (result.cancelled) {
    //   return;
    // }
    
    let uploadAsync = async (accessToken, userid) => {
      // ImagePicker saves the taken photo to disk and returns a local URI to it
      //let localUri = result.uri;
      let localUri = selectedImage;
      let filename = localUri.split('/').pop();
    
      // Infer the type of the image
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
    
      // Upload the image using the fetch and FormData APIs
      let data = new FormData();
      // Assume "photo" is the name of the form field the server expects
      data.append('file', { uri: localUri, name: filename, type });
      data.set("token", accessToken);
      data.set("userid", userid);
      data.set("dataTextContent", myComment);
    
      return await fetch(REACT_APP_API_URL, {
        method: 'POST',
        body: data,
        headers: {
          'content-type': 'multipart/form-data',
        },
      });
    }
    
  }
  

  return (
    <>
    {
    isLoading ? (
      <>
      <View>
        <Text>Loading...</Text>
      </View>
      </>
    ) : (
      <ScrollView>
      <View>
        <Text style={styles.title1}> Comments </Text>
      </View>

      {!isLogin ? (<></>) : (
        <>
        <View>
          <Text style={styles.emailandpasswordtile}>Post:</Text>
          <TextInput 
            style={styles.commentinput}
            placeholder="what do you think ?"
            onChangeText={setMyComment}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <View>
          <Text style={styles.emailandpasswordtile}>
            To share a photo from your phone with a friend, just press the button below!
          </Text>
          
          {selectedImage !== null ? (
            <>
            <View style={styles.container}>
              <Image
                source={{ uri: selectedImage.localUri }}
                style={styles.thumbnail}
              />
            </View>
            </>
          ):(<></>)}

          <Button 
            title="Pick a photo" 
            type="outline" 
            onPress={openAndTakeImagePickerAsync}
          />
          
          <Button 
            title="Submit my comment" 
            type="outline" 
            onPress={handleSubmitSendComment}
          />
        </View>
        
        </>
      )}
        
        

      </ScrollView>
    )}
    </>
  );
}

const styles = StyleSheet.create({
  flatList1: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  container: {
    
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnail: {
    width: 300,
    height: 400,
    resizeMode: 'cover',
  },
  title1: {
    fontSize: 20,
    textAlign: 'left',
    marginTop: 10
  },
  title2: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 5
  },
  title3: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 5,
    paddingLeft: 30,
    paddingRight: 30
  },
  emailandpasswordtile: {
    marginHorizontal: 15,
    
  },
  commentinput: {
    height: 200,
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
  courseLogo: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'black',
    marginHorizontal: 95,
    marginTop: 10
  },
  ButtonLoginView: {
    marginHorizontal: 125,
    marginTop: 15,
    width: 150
  },
  button: {
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
});

export default CreateNewPostStatusScreen;