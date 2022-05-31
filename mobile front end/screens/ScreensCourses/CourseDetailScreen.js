import { useFocusEffect, useNavigation } from '@react-navigation/core';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, AppRegistry, ScrollView, Image, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import SigninAPI from '../../api/SigninAPI';
import CourseApi from '../../api/CourseApi';
import VideoItem from '../../components/VideoItem';

function CourseDetailScreen({route}) {

  // we can get userid and courseid with route.
  const navigation = useNavigation();
  const [selectedId, setSelectedId] = useState(null);

  let [ isLoading, setIsLoading] = useState(true);
  let [ videosInforDataState, setVideosInforDataState ] = useState([]);

  let [courseNameState, setCourseNameState] = useState('');
  let [authorNameState, setAuthorNameState] = useState('');
  let [courseDescriptionState, setCourseDescriptionState] = useState('');
  let [courseThumbnailState, setCourseThumbnailState] = useState('');

  useEffect(() => {
    getAllVideoInforByCourseId();
  }, [isLoading])

  let getAllVideoInforByCourseId = () => {
    CourseApi.requestGetVideoInforByCourseId(route.params.courseid, function(result) {
      //console.log('dữ liệu các bài post được render: ' + JSON.stringify(result));
      
      if (result === 'dont exist any courses infor with that courseid') {
        setCourseThumbnailState('https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Question_dropshade.svg/1200px-Question_dropshade.svg.png');
        setCourseNameState('Sorry, but this course not ready');
        setVideosInforDataState('');
        setIsLoading(false);
        return;
      }

      setCourseNameState(result.coursesinfor[0].coursename);
      setAuthorNameState(result.coursesinfor[0].username);
      setCourseDescriptionState(result.coursesinfor[0].coursedescription);
      setCourseThumbnailState(result.coursesinfor[0].coursethumbnailpath);

      setVideosInforDataState(result);
      console.log(result);
      //console.log(convertJSONtoArray(videosInforDataState));
      setIsLoading(false);
    });
  }

  let convertJSONtoArray = (result) => {
    if (!result) {
      return [];
    }
    console.log(result.coursesinfor);
    const arr = [];
    Object.keys(result.coursesinfor).forEach(key => arr.push({id: key, value: result.coursesinfor[key]}))
    //console.log(arr);
    return arr;
  }

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.id === selectedId ? 'white' : 'black';
    

    let handlePress = () => {
      setSelectedId(item.id);
      console.log(item.value.id);
      navigation.navigate("WatchVideoCoursesScreen", {courseid: route.params.courseid, videoid: item.value.id});
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
          <Text>
            Loading...
          </Text>
        ) : (
          <>
          <View style={{flex: 1}}>
            <View>
              <Image
                  style={styles.courseLogo}
                  source={{uri: courseThumbnailState}}
              />
            </View>

            <View>
              <Text style={styles.title1}>
                {courseNameState}
              </Text>
              <Text style={styles.title2}>
                Author: {authorNameState}
              </Text>
              <Text style={styles.title3}>
                Description: {courseDescriptionState}
              </Text>
            </View>
          </View>
          
          
          <SafeAreaView style={styles.flatList1}>
            <FlatList
              data={convertJSONtoArray(videosInforDataState)}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              extraData={selectedId}
            />
          </SafeAreaView>
          </>
        )
      }

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
    textAlign: 'center',
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

export default CourseDetailScreen;