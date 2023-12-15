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

const fetAllUsers = (page, limit) => {
  return axios.get(`http://localhost:3001/api/user/read?page=${page}&limit=${limit}`)
}

const deleteUser = (user) => {
  return axios.delete(`http://localhost:3001/api/user/delete`, {data:{id:user.id}})
}

const fetchGroup = (user) => {
  return axios.get(`http://localhost:3001/api/group/read`)
}
export {registerNewUser, loginUser, fetAllUsers, deleteUser, fetchGroup}