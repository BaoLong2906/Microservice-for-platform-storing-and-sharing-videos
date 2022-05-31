import { StyleSheet, Text, View, AppRegistry, FlatList, SafeAreaView, StatusBar, TouchableOpacity, Image, TextInput, Dimensions  } from 'react-native';
import React, { useEffect, useState } from 'react';

import { Button } from 'react-native-elements';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { useNavigation, useRoute } from '@react-navigation/core';

let PostStatus = ({ item, onPress, backgroundColor, textColor }) => {

  const { width } = useWindowDimensions();
  let route = useRoute();
  let navigation = useNavigation();

  let handlePress = async () => {
    navigation.navigate('PostStatusCommentScreen', {postStatusId: item.value.id});
  }

  return (
    <View style={[styles.postStatusFrame, "white"]}>
      <View style={{flexDirection: "row"}}>
        <Image 
          style={styles.imageAvatar}
          resizeMode="contain"
          source={{uri: item.value.imagepath}}
        />
        <Text style={[styles.title, textColor]}>{item.value.username}</Text>
      </View>
      
      <View style={{marginTop: 10}}>
        <RenderHtml
          contentWidth={width}
          source={{html: `${item.value.textcontent}`}}
        />
        <Image 
          style={styles.imagePostStatus}
          resizeMode="contain"
          source={{uri: item.value.postimagepath}}
        />
      </View>

      <View style={{width: 200, marginTop: 10}}>
        <Button 
          title="Show comment" 
          type="outline"
          onPress={handlePress} 
        />
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  postStatusFrame: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 15,
    flex: 1,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,  
    elevation: 5
  },
  title: {
    fontSize: 15,
    marginLeft: 10,
    textAlignVertical: 'center',
    flex: 2
  },
  imageAvatar: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  imagePostStatus: {
    width: Dimensions.get("screen").width / 1.25,
    height: 200,
    borderWidth: 2,
    borderColor: 'black',
    marginTop: 10,
  },
});

export default PostStatus;