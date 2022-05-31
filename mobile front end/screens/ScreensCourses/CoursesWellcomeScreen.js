import { useFocusEffect } from '@react-navigation/core';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, AppRegistry, ScrollView } from 'react-native';
import SigninAPI from '../../api/SigninAPI';

import Carousel from 'react-native-snap-carousel';
import CoursesCarousel from '../../components/CoursesCarousel';
import CourseApi from '../../api/CourseApi';

function CoursesWellcomeScreen({navigation}) {

  let [re_render, set_re_render] = useState(false);

  let [ coursesDataState, setCoursesDataState ] = useState([]);
  let [ coursesFrontendMobileDataState, setCoursesFrontendMobileDataState] = useState([]);
  let [ coursesFrontendWebDataState, setCoursesFrontendWebDataState] = useState([]);
  let [ coursesBackendDataState, setCoursesBackendDataState] = useState([]);
  let [ coursesBlockchainDataState, setCoursesBlockchainDataState] = useState([]);
  let [ coursesAIDataState, setCoursesAIDataState] = useState([]);

  let [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Screen was focused
      // Do something
      // if data change, let setState re_render
      set_re_render(!re_render);
      
    });

    let asyncAPI = async () => {
      await Promise.all([
        getAllCourses(),
        getAllFrontendMobileCourses(),
        getAllFrontendWebCourses(),
        getAllBackendCourses(),
        getAllBlockchainCourses(),
        getAllAICourses()
      ]);

      await stopLoading();


    }
    
    asyncAPI();


    return unsubscribe;
  }, [re_render, isLoading]);
  
  console.log(re_render);

  let getAllCourses =  () => {
    //console.log('dữ liệu các bài post được render: ' + JSON.stringify(result));
    return CourseApi.requestGetAllCourse(function(result) {
      console.log('1');
      setCoursesDataState(result);
      console.log(convertJSONtoArray(result));
    });
  }

  let getAllFrontendMobileCourses =  () => {
    return CourseApi.requestGetAllCourseByCategoryname("FrontEnd-Mobile", function(result) {
      console.log('2');
      setCoursesFrontendMobileDataState(result);
    })
  }

  let getAllFrontendWebCourses =  () => {
    return CourseApi.requestGetAllCourseByCategoryname("FrontEnd-Web", function(result) {
      console.log('3');
      setCoursesFrontendWebDataState(result);
    })
  }

  let getAllBackendCourses =  () => {
    return CourseApi.requestGetAllCourseByCategoryname("BackEnd", function(result) {
      console.log('4');
      setCoursesBackendDataState(result);
    })
  }

  let getAllBlockchainCourses =  () => {
    return CourseApi.requestGetAllCourseByCategoryname("Blockchain", function(result) {
      console.log('5');
      setCoursesBlockchainDataState(result);
    })
  }

  let getAllAICourses =  () => {
    return CourseApi.requestGetAllCourseByCategoryname("Artificial Intelligence", function(result) {
      console.log('6');
      setCoursesAIDataState(result);
    })
  }

  let stopLoading = async () => {
    setIsLoading(false);
  }

  let convertJSONtoArray = (result) => {
    console.log(result.courses);
    const arr = [];
    Object.keys(result.courses).forEach(key => arr.push({name: key, value: result.courses[key]}))
    //console.log(arr);
    return arr;
  }

  return(
    <>
      <ScrollView>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'baseline' }}>
          <Text style={styles.title1}>All courses</Text>
          {isLoading ? (<Text>loading...</Text>) : (<CoursesCarousel carouselItems={convertJSONtoArray(coursesDataState)} navigation={navigation}/>)}
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'baseline' }}>
          <Text style={styles.title1}>Mobile Frontend Courses</Text>
          {isLoading ? (<Text>loading...</Text>) : (<CoursesCarousel carouselItems={convertJSONtoArray(coursesFrontendMobileDataState)} navigation={navigation}/>)}
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'baseline' }}>
          <Text style={styles.title1}>Backend Courses</Text>
          {isLoading ? (<Text>loading...</Text>) : (<CoursesCarousel carouselItems={convertJSONtoArray(coursesBackendDataState)} navigation={navigation}/>)}
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'baseline' }}>
          <Text style={styles.title1}>Web Frontend Courses</Text>
          {isLoading ? (<Text>loading...</Text>) : (<CoursesCarousel carouselItems={convertJSONtoArray(coursesFrontendWebDataState)} navigation={navigation}/>)}
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'baseline' }}>
          <Text style={styles.title1}>Blockchain Courses</Text>
          {isLoading ? (<Text>loading...</Text>) : (<CoursesCarousel carouselItems={convertJSONtoArray(coursesBlockchainDataState)} navigation={navigation}/>)}
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'baseline' }}>
          <Text style={styles.title1}>AI Courses</Text>
          {isLoading ? (<Text>loading...</Text>) : (<CoursesCarousel carouselItems={convertJSONtoArray(coursesAIDataState)} navigation={navigation}/>)}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  title1: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 20
    
  },
});

export default CoursesWellcomeScreen;