import { StyleSheet, Text, View, AppRegistry, FlatList, SafeAreaView, StatusBar, TouchableOpacity, Image, TextInput, useWindowDimensions   } from 'react-native';
import React, { useEffect, useState } from 'react';
import RenderHtml from 'react-native-render-html';
import { useNavigation, useRoute } from '@react-navigation/core';

const CommentItem = ({ item, onPress, backgroundColor, textColor }) => {

  const { width } = useWindowDimensions();
  let route = useRoute();

  return (
    <>
      <TouchableOpacity onPress={onPress} style={[styles.userCommentItem, "white"]}>
        <Image 
          style={styles.imageAvatar}
          resizeMode="contain"
          source={{uri: item.value.imagepath}}
        />
        <View style={[styles.title, textColor]}>
          <Text>{item.value.username}</Text>
          
          <RenderHtml
            contentWidth={width}
            source={{html: `${item.value.commentcontent}`}}
          />

        </View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  userCommentItem: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 15,
    flexDirection: 'row',
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
    flex: 2,
  },
  imageAvatar: {
    width: 70,
    height: 70,
    
    borderWidth: 2,
    borderColor: 'black',
  },
});


export default CommentItem;