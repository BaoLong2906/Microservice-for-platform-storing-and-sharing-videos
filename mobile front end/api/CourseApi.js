import axios from 'axios';
import axiosClient from './axiosClient';
import { REACT_APP_API_URL } from './axiosClient';

class CourseApi {
  static requestGetAllCourse = (callback) => {
    return axios.post(REACT_APP_API_URL + "/course/get-allcourse")
    .then(res => {
      //console.log(res);
      //console.log(JSON.stringify(res.data));
      console.log("đã nhận json data từ server thông qua requestGetAllCourse !");
      callback(res.data);
    })
  }

  static requestGetVideoInforByCourseId = (courseid, callback) => {
    axios.post(REACT_APP_API_URL + "/course/get-course-infor-by-course-id", {courseid: courseid})
    .then(res => {
      //console.log(res);
      //console.log(res.data);
      console.log("đã nhận json data từ server thông qua requestGetVideoInforByCourseId !");
      if (res.data.coursesinfor === 'dont exist any courses infor with that courseid') {
        return callback('dont exist any courses infor with that courseid');
      }
      callback(res.data);
    })
  }

  static requestGetAllCourseByCategoryname = (categoryname, callback) => {
    return axios.post(REACT_APP_API_URL + "/course/get-allcourse-by-categoryname", {categoryname: categoryname})
    .then(res => {
      //console.log(res);
      //console.log(res.data);
      console.log("đã nhận json data từ server thông qua requestGetAllCourseByCategoryname !");
      callback(res.data);
    })
  }

  
}

export default CourseApi;