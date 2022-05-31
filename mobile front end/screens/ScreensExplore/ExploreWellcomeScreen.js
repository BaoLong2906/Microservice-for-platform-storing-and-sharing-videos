import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Dimensions, ScrollView, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import PostStatusApi from '../../api/PostStatusApi';

import { Video, AVPlaybackStatus } from 'expo-av';

import { REACT_APP_API_URL } from '../../api/axiosClient'; 

import { WebView } from 'react-native-webview';

import { useNavigation, useRoute } from '@react-navigation/core';
import PostStatus from '../../components/PostStatus';

import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ExploreWellcomeScreen({props}) {

  let route = useRoute();
  let navigation = useNavigation();
    
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  let [ isLoading, setIsLoading ] = useState(true);
  let [ isLogin, setIsLogin] = useState(false);
  
  let [myPostContent, onChangeMyPostContent] = useState("");

  let [ postStatusDataState, setPostStatusDataState ] = useState('');

  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    let asyncWork = async () => {
      await checkUserSignedIn();
      await getPostStatus();
      await stopLoading();
    }

    asyncWork();
  }, [isLoading])
  
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

  let getPostStatus = () => {
    
    return PostStatusApi.requestPostStatus(function(result) {
      //console.log('dữ liệu các bài post được render: ' + JSON.stringify(result));
      console.log(result);
      setPostStatusDataState(result);
    });
    
  }

  let convertJSONtoArray = (result) => {
    console.log(result);
    if (!result) {
      return [];
    }
    console.log(result);
    const arr = [];
    Object.keys(result).forEach(key => arr.push({id: key, value: result[key]}))
    //console.log(arr);
    return arr;
  }

  const renderPostStatus = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.id === selectedId ? 'white' : 'black';
    

    let handlePress = () => {
      setSelectedId(item.id);
      //navigation.navigate("WatchVideoCoursesScreen", {courseid: route.params.courseid, videoid: item.value.videoid})
    }

    return (
      <PostStatus
        item={item}
        onPress={handlePress}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  let handleButtonCreateNewPost = () => {
    navigation.navigate("CreateNewPostStatusScreen");
  }

  return(
    <>
      {!isLogin ? (<></>) : (
        <>
        <View>
          <Button 
            title="Create new post" 
            type="outline" 
            onPress={handleButtonCreateNewPost}
          />
        </View>
        </>
      )}
      {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Setting!</Text>
      </View> */}

      {isLoading ? (
        <View>
          <Text>Loading...</Text>
        </View>
      ) : (
        <>
        {/* <View>
        <Text>{JSON.stringify(postStatusDataState)}</Text>
        </View> */}
        
        <SafeAreaView style={{flex: 1}}>
          <FlatList 
            data={convertJSONtoArray(postStatusDataState)}
            renderItem={renderPostStatus}
            keyExtractor={(item) => item.id}
            extraData={selectedId}
          /> 
        </SafeAreaView>
        </>
      )}

      
      {/* <WebView
        style={styles.container}
        originWhitelist={['*']}
        source={{ html: `<video style={{borderRadius: '15px', border: '2px solid black'}} id='videoplayer' width='800px' controls autoPlay src='${REACT_APP_API_URL}/video/3/1'></video>` }}
      />  */}
    </>
  );
}

var styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    width: 500,
    //backgroundColor: '#ecf0f1',
  },

  video: {
    alignSelf: 'center',
    width: 320,
    height: 200,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ExploreWellcomeScreen;