import ApiService from "../../../service/ApiService";
import StorageService from "../../../service/StorageService";
import { ACCESS_TOKEN } from "../../../config/const";
import NavigationService from "../../../service/NavigationService";

const loginUrl = 'login';

login = async (email, password) => {
    service = await ApiService();
    return service.post(loginUrl, {
        email: email,
        password: password
    })
}

function logout() {
    StorageService.remove(ACCESS_TOKEN);
    NavigationService.navigate('Auth');
}

// add other navigation functions that you need and export them

export default {
  login,
  logout,
};