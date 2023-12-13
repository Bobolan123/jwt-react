import axios from "axios"


const registerNewUser = (email, phone, username, password) => {
    return axios.post('http://localhost:3001/api/register', {
        email, phone, username, password
      })
}

const loginUser = (username, password) => {
    return axios.post('http://localhost:3001/api/login', {
        username, password
      })
}

export {registerNewUser, loginUser}