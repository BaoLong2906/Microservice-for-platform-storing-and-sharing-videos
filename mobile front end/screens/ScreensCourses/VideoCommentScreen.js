import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, TextInput, View, AppRegistry, Dimensions, ScrollView, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import SigninAPI from '../../api/SigninAPI';
import VideoAPI from '../../api/VideoApi';

import { Video, AVPlaybackStatus } from 'expo-av';

import { REACT_APP_API_URL } from '../../api/axiosClient'; 

import { WebView } from 'react-native-webview';
import { useNavigation, useRoute } from '@react-navigation/core';
import CommentItem from '../../components/CommentItem';

import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

function VideoCommentScreen({props}) {

  let route = useRoute();
  let navigation = useNavigation();
  console.log(route.params.videoid);

  let [ videoCommentsDataState, setVideoCommentsDataState ] = useState('');
  let [ isLoading, setIsLoading ] = useState(true);
  let [ isLogin, setIsLogin] = useState(false);
  
  let [mycomment, onChangeMyComment] = useState("");

  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    let asyncWork = async () => {
      await checkUserSignedIn();
      await getAllCommentInVideoByVideoId();
      await stopLoading();
    }

    asyncWork();
  }, [isLoading])

  let getAllCommentInVideoByVideoId = async () => {
    await VideoAPI.requestFindAllCommentInVideoByVideoId(route.params.videoid, function(result) {
      //console.log('VideoComments: ' + JSON.stringify(result.videocomments));
      console.log("hi: " + JSON.stringify(result));
      if (result.videocomments === 'dont exist any video comment with that videoid like that') {
        setVideoCommentsDataState('');
      } else {
        setVideoCommentsDataState(result);
      }
      //setIsLoading(false);
    });
  }

  let convertJSONtoArray = (result) => {
    console.log(result.videocomments);
    if (!result) {
      return [];
    }
    console.log(result.videocomments);
    const arr = [];
    Object.keys(result.videocomments).forEach(key => arr.push({id: key, value: result.videocomments[key]}))
    //console.log(arr);
    return arr;
  }

  const renderCommentItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.id === selectedId ? 'white' : 'black';
    

    let handlePress = () => {
      setSelectedId(item.id);
      //navigation.navigate("WatchVideoCoursesScreen", {courseid: route.params.courseid, videoid: item.value.videoid})
    }

    return (
      <CommentItem
        item={item}
        onPress={handlePress}
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

  let stopLoading = async () => {
    setIsLoading(false);
  }

  let handleOnSubmmit = () => {
    let asyncWork = async () => {
      let userid = await AsyncStorage.getItem('userid');
      let accessToken = await AsyncStorage.getItem('accessToken');
      await promise1(userid, accessToken);
      await promise2();
    }
    
    const promise2 = () => {
      return new Promise((resolve, reject) => {
        navigation.replace("VideoCommentScreen", {courseid: route.params.courseid, videoid: route.params.videoid})
      });
    }
    
    const promise1 = async (userid, accessToken) => {
      console.log("hi: " + userid + route.params.videoid + mycomment);
      VideoAPI.insertComment(userid, route.params.videoid, mycomment, accessToken, function(result) {
        if (result.isSuccess === true) {
          
        }
        
      });
    }

    asyncWork();
    
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
      <>
      <View>
        <Text style={styles.title1}> Comments </Text>
      </View>

      {!isLogin ? (<></>) : (
        <View>
          <Text style={styles.emailandpasswordtile}>Fill your new comments here:</Text>
          <TextInput 
            style={styles.commentinput}
            placeholder="what do you think ?"
            onChangeText={onChangeMyComment}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
          <Button 
            title="Submit my comment" 
            type="outline" 
            onPress={handleOnSubmmit}
          />
        </View>  
      )}
      

      <SafeAreaView style={{flex: 2.5}}>
          <FlatList 
            data={convertJSONtoArray(videoCommentsDataState)}
            renderItem={renderCommentItem}
            keyExtractor={(item) => item.id}
            extraData={selectedId}
          />
          
      </SafeAreaView>
      </>
    )}
    </>
  );
}

const styles = StyleSheet.create({
  flatList1: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
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
    marginHorizontal: 15
  },
  commentinput: {
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
  }
});

export default VideoCommentScreen;