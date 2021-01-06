const { default: Vancouver } = require("../Services/Logos/Vancouver")
import axios from 'axios';
import {Ziggy} from '../../assets/js/ziggy'
import _route from '../../../vendor/tightenco/ziggy/src/js/route.js'


const route = (name, params, absolute) => _route(name, params, absolute, Ziggy)


// // Add a response interceptor
// axios.interceptors.response.use(function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     console.log(response)
//     return response;
//   }, function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     console.log(error.config.headers)
//     return Promise.reject(error);
//   });




it('works', done => {
  expect(true).toBe(true);
  console.log(route('users.sources.index', {user: 50}) + '')
    // console.log(Vancouver.api);
    // let sourceIndex = Vancouver.api.index();

    // // console.log(sourceIndex);
    // expect(sourceIndex).toBeInstanceOf(Promise)
    // expect(true).toBe(true)
    // return sourceIndex.then(data => {
    //     console.log(data);
    //     expect(true).toBeInstanceOf(true)
    // }).catch(error => {
    //     console.log(error.response)
    // })
})