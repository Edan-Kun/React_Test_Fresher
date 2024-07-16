import axios from '../utils/axios-customize';

const registerUserAPI = (fullName, email, password, phone) => {
    const URL_BACKEND = '/api/v1/user/register';
    const data = {
        fullName: fullName,
        email: email,
        password: password,
        phone: phone
    }
    return axios.post(URL_BACKEND, data);
}

const loginUserAPI = (username, password) => {
    const URL_BACKEND = '/api/v1/auth/login';
    const data = {
        username: username,
        password: password,
        delay: 3000
    }
    return axios.post(URL_BACKEND, data);
}

const logoutUserAPI = () => {
    const URL_BACKEND = '/api/v1/auth/logout';
    return axios.post(URL_BACKEND);
}

const fetchAccount = () => {
    const URL_BACKEND = '/api/v1/auth/account';
    return axios.get(URL_BACKEND);
}

export { registerUserAPI, loginUserAPI, fetchAccount, logoutUserAPI }