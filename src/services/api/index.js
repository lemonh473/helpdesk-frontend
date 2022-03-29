import axios from 'axios'
import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css';

const API = axios.create({
    baseURL: "http://localhost:8000/api/v1",
    headers: {
      "Content-type": "application/json",
    }
})

// Add request interceptor
API.interceptors.request.use(
  config => {
    let data = JSON.parse(localStorage.getItem('session'))
    let accessToken = data ? data.access_token : null
    
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }
    
    return config
  },
  err => {
    Vue.prototype.$message.error('request timeout')
    return Promise.reject(err)
  }
)

// Add response interceptor
API.interceptors.response.use(
  response => {
    if (response.data.message) {
      createToast({
          title: response.data.message
      }, {
          type: 'success'
      })
    }
    return response
  },
  err => {
    if (err.response.data.error) {
      createToast({
        title: err.response.data.error
      }, {
          type: 'danger'
      })
      Vue.prototype.$message.error(err.response.data.message)
      return Promise.reject(err.response.data.message)
    } else {
      Vue.prototype.$message.error(err.toString())
      return Promise.resolve(err)
    }
  }
)

export default API