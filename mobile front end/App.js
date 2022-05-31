import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, AppRegistry } from 'react-native';

import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import ExploreWellcomeScreen from './screens/ScreensExplore/ExploreWellcomeScreen';
import OtherProfileScreen from './screens/ScreensExplore/ExploreWellcomeScreen';
import PostStatusCommentScreen from './screens/ScreensExplore/PostStatusCommentScreen';
import CreateNewPostStatusScreen from './screens/ScreensExplore/CreateNewPostStatusScreen';
import CoursesWellcomeScreen from './screens/ScreensCourses/CoursesWellcomeScreen';
import CourseDetailScreen from './screens/ScreensCourses/CourseDetailScreen';
import WatchVideoCoursesScreen from './screens/ScreensCourses/WatchVideoCoursesScreen';
import VideoCommentScreen from './screens/ScreensCourses/VideoCommentScreen';
import ProfileWellcomeScreen from './screens/ScreensProfile/ProfileWellcomeScreen';
import MyCoursesScreen from './screens/ScreensProfile/MyCoursesScreen';
import MyVideosScreen from './screens/ScreensProfile/MyVideosScreen';
import EditAboutmeScreen from './screens/ScreensProfile/EditAboutmeScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesome, MaterialIcons, MaterialCommunityIcons, Entypo, Feather  } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoginScreen from './screens/ScreensProfile/LoginScreen';

const CoursesStack = createNativeStackNavigator();
function CoursesStackScreen() {
  return (
    <CoursesStack.Navigator>
      
      <CoursesStack.Screen 
        name="CoursesScreen" 
        component={CoursesWellcomeScreen}
        options={{
          title: 'Course',
          headerShown: false
        }}  
      />

      <CoursesStack.Screen
        name="CourseDetail"
        component={CourseDetailScreen}
        options={{
          title: 'CourseDetail',
          headerShown: false
        }}
      />

      <CoursesStack.Screen
        name="WatchVideoCoursesScreen"
        component={WatchVideoCoursesScreen}
        options={{
          title: 'WatchVideoCourses',
          headerShown: false
        }}
      />

      <CoursesStack.Screen
        name="VideoCommentScreen"
        component={VideoCommentScreen}
        options={{
          title: 'VideoComment',
          headerShown: false
        }}
      />

    </CoursesStack.Navigator>
  );
}

const ExploreStack = createNativeStackNavigator();
function ExploreStackScreen() {
  return (
    <ExploreStack.Navigator>
      <ExploreStack.Screen 
        name="ExploreScreen"
        component={ExploreWellcomeScreen}
        options={{
          title: 'Explore',
          headerShown: false
        }}
      />
      <ExploreStack.Screen 
        name="OtherProfileScreen"
        component={OtherProfileScreen}
        options={{
          title: 'OtherProfile',
          headerShown: false
        }}
      />
      <ExploreStack.Screen
        name="PostStatusCommentScreen"
        component={PostStatusCommentScreen}
        options={{
          title: 'PostStatusComment',
          headerShown: false
        }}
      />
      <ExploreStack.Screen 
        name="CreateNewPostStatusScreen"
        component={CreateNewPostStatusScreen}
        options={{
          title: 'CreateNewPostStatus',
          headerShown: false
        }}
      />
    </ExploreStack.Navigator>
  );
}

const ProfileStack = createNativeStackNavigator();
function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          title: 'Login',
          headerShown: false
        }}
      />
      
      <ProfileStack.Screen
        name="ProfileScreen"
        component={ProfileWellcomeScreen}
        options={{
          title: 'Profile',
          headerShown: false
        }}
      />

      <ProfileStack.Screen
        name="MyCoursesScreen"
        component={MyCoursesScreen}
        options={{
          title: 'MyCourses',
          headerShown: false
        }}
      />

      <ProfileStack.Screen
        name="MyVideosScreen"
        component={MyVideosScreen}
        options={{
          title: 'MyVideos',
          headerShown: false
        }}
      />

      <ProfileStack.Screen
        name="EditAboutmeScreen"
        component={EditAboutmeScreen}
        options={{
          title: 'EditAboutme',
          headerShown: false
        }}
      />
      
    </ProfileStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {

  const isLoadingComplete = useCachedResources();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Course') {
              iconName = 'video';
              //color = focused ? 'black' : 'gray';
              return <Entypo name={iconName} size={size} color={color} />;
            } else if (route.name === 'Explore') {
              iconName = 'explore';
              //color = focused ? 'black' : 'gray';
              return <MaterialIcons name={iconName} size={size} color={color}/>;
            } else if (route.name === 'Profile') {
              iconName="user";
              return <Feather name={iconName} size={size} color={color}/>;
            }

            // You can return any component that you like here!
            // return <Entypo name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        
        <Tab.Screen 
          name="Course" 
          component={CoursesStackScreen} 
          options={{
            headerShown: false
          }}
        />

        <Tab.Screen 
          name="Explore" 
          component={ExploreStackScreen}
          options={{
            headerShown: false
          }}
        />

        <Tab.Screen 
          name="Profile"
          component={ProfileStackScreen}
          options={{
            headerShown: false
          }}
        />



        

      </Tab.Navigator>
      <StatusBar hidden />
    </NavigationContainer>
  );

  // return (
  //   <View style={styles.container}>
  //     <Text>Open up App.js to start working on your app happy hacking ok nhaaaaaaaaaaaaaaaaa!</Text>
  //     <StatusBar style="auto" />
  //   </View>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



