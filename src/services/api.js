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
    }
    return axios.post(URL_BACKEND, data);
}

const callFetchAccount = () => {
    return axios.get('/api/v1/auth/account')
}

const logoutUserAPI = () => {
    const URL_BACKEND = '/api/v1/auth/logout';
    return axios.post(URL_BACKEND);
}

const fetchListUser = (query) => {
    const URL_BACKEND = `/api/v1/user?${query}`;
    return axios.get(URL_BACKEND);
}

const deleteUserAPI = (id) => {
    const URL_BACKEND = `/api/v1/user/${id}`;
    return axios.delete(URL_BACKEND)
}

export {
    registerUserAPI, loginUserAPI, callFetchAccount, logoutUserAPI,
    fetchListUser, deleteUserAPI
}