//https://cannabis-server.herokuapp.com
import axios from 'axios'
export const axiosInstance = axios.create({
    baseURL: 'https://hennies.herokuapp.com',  // online website URL
    // baseURL: 'http://localhost:8080/',
    // baseURL: 'http://localhost:3000',
});
