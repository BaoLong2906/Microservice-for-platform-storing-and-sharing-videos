import React from 'react';
import { StyleSheet, Text, View, Image, Button, Alert, AppRegistry, FlatList, SafeAreaView, StatusBar, TouchableOpacity, TextInput, ImageBackground  } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { BlurView } from 'expo-blur';



export default class VideosCarousel extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      activeIndex:0,
    }
  }
  
  _renderItem = ({item, index}) => {
    console.log(item);
    return ( 
      <View 
        style={styles.cardCourse} 
        onTouchEnd={() => this.props.navigation.navigate('CourseDetail', {userid: item.value.userid, courseid: item.value.courseid})}
      >
        <ImageBackground source={{uri: item.value.thumbnailpath}} resizeMode="cover" style={styles.image}>
          <BlurView intensity={90} tint="light" style={styles.wrapText} >
            <Text style={styles.text1}>{item.value.coursename}</Text>
            <Text>{item.value.username}</Text>
          </BlurView>
        </ImageBackground>
      </View>
    );
    }

    render () {
      return (
        <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
                <Carousel
                  layout={"default"}
                  ref={ref => this.carousel = ref}
                  data={this.props.carouselItems}
                  sliderWidth={300}
                  itemWidth={300}
                  renderItem={this._renderItem}
                  onSnapToItem = { index => this.setState({activeIndex:index}) } />
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  text: {
    color: "white",
    fontSize: 20,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0"
  },
  text1: {
    fontSize: 20,

  },
  wrapText: {
    backgroundColor:'floralwhite',
    borderRadius: 5,
    
    borderColor: 'black',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 100
    
  },
  cardCourse: {
    backgroundColor:'floralwhite',
    borderRadius: 5,
    borderWidth: 3,
    borderColor: 'black',
    height: 260,
    marginLeft: 25,
    marginRight: 25,
    //justifyContent: "center"
  }
});

// carouselItems: [
//   {
//       title:"Item 1",
//       text: "Text 1",
//   },
//   {
//       title:"Item 2",
//       text: "Text 2",
//   },
//   {
//       title:"Item 3",
//       text: "Text 3",
//   },
//   {
//       title:"Item 4",
//       text: "Text 4",
//   },
//   {
//       title:"Item 5",
//       text: "Text 5",
//   },
// ]