import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, AppRegistry, FlatList, SafeAreaView, StatusBar, TouchableOpacity, TextInput, Dimensions, useWindowDimensions   } from 'react-native';
import PostStatusApi from '../../api/PostStatusApi';

import { useNavigation, useRoute } from '@react-navigation/core';
import CommentItem from '../../components/CommentItem';

import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

function PostStatusCommentScreen({props}) {

  let route = useRoute();
  let navigation = useNavigation();

  let [ isLoading, setIsLoading ] = useState(true);
  let [ isLogin, setIsLogin] = useState(false);

  const [selectedId, setSelectedId] = useState(null);

  let [myComment, setMyComment] = useState('');
  let [listComment, setListComment] = useState([]);

  useEffect(() => {
    let asyncWork = async () => {
      await checkUserSignedIn();
      await getCommentByPostId(route.params.postStatusId);
      await stopLoading();
    }

    asyncWork();
  }, [isLoading])

  let getCommentByPostId = (postid) => {
    
    return PostStatusApi.getCommentByPostId(postid, function(result) {
      // console.log('test1: ' + props.postid);
      //console.log('test4: ' + JSON.stringify(result));
      if (result === 'dont exist any comment') {
        return;
      }
      setListComment(result);
    });
    
  }

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

  const renderPostStatusCommentItem = ({ item }) => {
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

  let handleSubmitSendComment = async () => {
    let promise1 = async (userid, accessToken) => {
      PostStatusApi.insertComment(userid, route.params.postStatusId, myComment, accessToken, function(result) {
        if (result.isSuccess === true) {
          // setMyComment('');
          // set_re_render(true);
        }
        
      });
    }

    let promise2 = async () => {
      navigation.replace("PostStatusCommentScreen", {postStatusId: route.params.postStatusId});
    }

    let userid = await AsyncStorage.getItem('userid');
    let accessToken = await AsyncStorage.getItem('accessToken');
    await promise1(userid, accessToken);
    await promise2();
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
            placeholder="what do you think about this status?"
            onChangeText={setMyComment}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
          <Button 
            title="Submit my comment" 
            type="outline" 
            onPress={handleSubmitSendComment}
          />
        </View>  
      )}

      <SafeAreaView style={{flex: 2.5}}>
        <FlatList 
          data={convertJSONtoArray(listComment)}
          renderItem={renderPostStatusCommentItem}
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

export default PostStatusCommentScreen;