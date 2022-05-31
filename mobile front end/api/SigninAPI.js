import axios from 'axios';
import axiosClient from './axiosClient';
//import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { REACT_APP_API_URL } from './axiosClient'; 


class SigninAPI {

  static requestAuthWithEmailAndPassword = (email, password, callback) => {
      
      axios.post(REACT_APP_API_URL + "/login", { email, password })
      .then(res => {

          console.log("đã nhận json data từ server thông qua requestAuthWithEmailAndPassword !");
          //console.log(res);
          console.log(res.data);

          // nếu không tồn tại trường báo lỗi errorLogin
          if (!res.data.errorLogin) {
            AsyncStorage.setItem('accessToken', res.data.accessToken);
            AsyncStorage.setItem('refreshToken', res.data.refreshToken);
            AsyncStorage.setItem('username', res.data.username);
            AsyncStorage.setItem('userid', res.data.id.toString());
            AsyncStorage.setItem('role', res.data.role.toString());
            AsyncStorage.setItem('profileurl', res.data.profileurl);
          }

          // nếu tồn tại trường báo lỗi errorLogin
          if (res.data.errorLogin) {
              alert(res.data.errorLogin);
              return;
          }
            
          callback("done");
      })    
  }

    
}


export default SigninAPI;