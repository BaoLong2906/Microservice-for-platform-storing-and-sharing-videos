import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, AppRegistry, Dimensions, ScrollView, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import SigninAPI from '../../api/SigninAPI';
import VideoAPI from '../../api/VideoApi';

import { Video, AVPlaybackStatus } from 'expo-av';

import { REACT_APP_API_URL } from '../../api/axiosClient'; 

import { WebView } from 'react-native-webview';
import { useNavigation, useRoute } from '@react-navigation/core';
import VideoItem from '../../components/VideoItem';

import { Button } from 'react-native-elements';

function WatchVideoCoursesScreen({props}) {
  
  // we can get userid and courseid with route.
  let navigation = useNavigation();
  let route = useRoute();
  
  let [ title , setTitle] = useState('');
  let [ videosInforDataState, setVideosInforDataState ] = useState('');
  let [ isLoading, setIsLoading ] = useState(true);

  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    getAllVideoInforByCourseId();
  }, [isLoading, title])

  let getAllVideoInforByCourseId = () => {
    VideoAPI.requestFindAllVideoInforInCourseByCourseId(route.params.courseid, function (result) {
      setTitle(result.videosinfor[0].coursename);
      setVideosInforDataState(result);
      setIsLoading(false);
    });
  }

  let convertJSONtoArray = (result) => {
    if (!result) {
      return [];
    }
    console.log(result.videosinfor);
    const arr = [];
    Object.keys(result.videosinfor).forEach(key => arr.push({id: key, value: result.videosinfor[key]}))
    //console.log(arr);
    return arr;
  }

  const renderVideoItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.id === selectedId ? 'white' : 'black';
    

    let handlePress = () => {
      setSelectedId(item.id);
      navigation.navigate("WatchVideoCoursesScreen", {courseid: route.params.courseid, videoid: item.value.videoid})
    }

    return (
      <VideoItem
        item={item}
        onPress={handlePress}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
    <>
    {
      isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <>
        <View style={{ flex: 1.5 }}>
          <Text style={styles.title1}>Course - {title}</Text>
          <WebView
            style={styles.videoStyle}
            originWhitelist={['*']}
            source={{ html: `<video style={{borderRadius: '15px', border: '2px solid black'}} id='videoplayer' width='800px' controls autoPlay src='${REACT_APP_API_URL}/video/${route.params.courseid}/${route.params.videoid}'></video>` }}
          />
        </View>

        <SafeAreaView style={{flex: 2.5}}>
          <FlatList 
            data={convertJSONtoArray(videosInforDataState)}
            renderItem={renderVideoItem}
            keyExtractor={(item) => item.id}
            extraData={selectedId}
            ListHeaderComponent={
              AboutthisVideo(
                {
                  videosInforData: videosInforDataState,
                  videoid: route.params.videoid
                }
              )
            }
            ListFooterComponent={
              Button({
                title: "Watch comments this video",
                type: "outline",
                onPress: () => navigation.navigate("VideoCommentScreen", {courseid: route.params.courseid, videoid: route.params.videoid})
              })
            }
          />
          
        </SafeAreaView>
        </>
      )
    }
    </>
  );
}

let AboutthisVideo = ({videosInforData, videoid}) => {
  if (videosInforData.videosinfor) { 
    for (let i = 0; i < Object.keys(videosInforData.videosinfor).length; i++) {
      if ( JSON.stringify(videosInforData.videosinfor[i].videoid) == videoid ) {
        return (
          <View style={{
              flex: 1, 
              backgroundColor: 'pink', 
              borderRadius: 15, 
              justifyContent: 'center', 
              marginHorizontal: 10,
              marginTop: 10
            }}
          >
 
            <Text style={styles.title2}>
              Author: {videosInforData.videosinfor[i].username}
            </Text>

            <Text style={styles.title2}>
              Course name: {videosInforData.videosinfor[i].coursename}
            </Text>

            <Text style={styles.title2}>
              Video name: {videosInforData.videosinfor[i].videoname}
            </Text>

            <Text style={styles.title2}>
              Descriptiton: {videosInforData.videosinfor[i].videodescription}
            </Text>
          </View>
        );
      }

    }
  } else {
    return (
      <>
        <View>
          <Text>
            Xin lỗi, đã xãy ra sự cố.
          </Text>
        </View>
      </>
    );
  }

}

var styles = StyleSheet.create({
  videoStyle: {
    justifyContent: 'center',
    width: Dimensions.get('screen').width * 1.2,
    //backgroundColor: '#ecf0f1',
  },
  title1: {
    marginLeft: 10,
    marginVertical: 5,
    fontSize: 15,
    fontWeight: "bold",
    justifyContent: 'center',
    alignItems: 'center', 
  },
  title2: {
    marginLeft: 12,
    padding: 5,
    fontSize: 10,
    fontWeight: 'bold',
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
  flatList1: {
    marginTop: StatusBar.currentHeight || 0,
  },
});

export default WatchVideoCoursesScreen;