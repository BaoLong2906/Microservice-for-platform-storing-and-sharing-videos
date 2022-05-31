import { StyleSheet, Text, View, AppRegistry, FlatList, SafeAreaView, StatusBar, TouchableOpacity, Image, TextInput  } from 'react-native';
import React, { useEffect, useState } from 'react';


let VideoItem = ({ item, onPress, backgroundColor, textColor }) => {

  return (
    <TouchableOpacity onPress={onPress} style={[styles.videoItem, backgroundColor]}>
      <Image 
        style={styles.imageVideo}
        resizeMode="contain"
        source={{uri: item.value.videothumbnailpath}}
      />
      <Text style={[styles.title, textColor]}>{item.value.videoname}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  videoItem: {
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
    flex: 2
  },
  imageVideo: {
    width: 100,
    height: 100,
    
    borderWidth: 2,
    borderColor: 'black',
  },
});

export default VideoItem;