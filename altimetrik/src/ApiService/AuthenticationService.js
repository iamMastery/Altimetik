import axios from 'axios';

class AuthenticationService{
    getUsers(){
        
        return axios.get("http://localhost:5000/api/users/")
    }
}
export default new AuthenticationService();
