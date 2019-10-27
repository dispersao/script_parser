const axios = require('axios')
axios.defaults.baseURL = process.env.API;
axios.defaults.headers.post['Content-Type'] = 'json';

let token

const create = async (service, element) => {
  return tokenPromise.then(() => doRequest(service, 'post', element))
}

const logUser = () => {
  let identifier = process.env.USER
  let password = process.env.PASS

  try {
    return axios.post('/auth/local',{
      identifier,
      password
    }).then(response => {
      token = response.data.jwt
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // console.log(axios.defaults.headers.common['Authorization'] )
      return token
    })
  } catch(e) {
    console.log(e.toJSON())
    return Promise.reject(e)
  }
}


const doRequest = async (service, type, element) => {
  try {
    // console.log(axios.defaults.headers.common['Authorization'])
    return axios[type](`/${service}`,element)
    .then(response => {
      // console.log(response.data)
      return response.data
    })
  } catch(e) {
    // console.log(e.toJSON())
  }
}

const tokenPromise = logUser()

module.exports = create
