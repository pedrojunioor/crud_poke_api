import axios from 'axios'

const api =  axios.create({
    baseURL: 'https://pokeapi.co/api/v2/'
})
const api2 =  axios.create()

export default api