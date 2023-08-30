import axios from 'axios';
import AuthHeader from './auth-header';

const API_URL='http://localhost:8080/api/test/';

class DataService{
    getPublicContent(){
        return axios.get(API_URL+"all")
    }
    getUserBoard(){
        return axios.get(API_URL+"user",{headers:AuthHeader()})
    }
    getAdminBoard(){
        return axios.get(API_URL+"admin",{headers:AuthHeader()})
    }
    getModeratorBoard(){
        return axios.get(API_URL+"mod",{headers:AuthHeader()})
    }
}

export default new DataService();
