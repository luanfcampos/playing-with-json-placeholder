import axios from "axios"
const BASE = 'https://jsonplaceholder.typicode.com'

export const api = {
    getAll: async () => {
        let  response = await axios.get(`${BASE}/posts`)
        return response.data
    },
    addNew: async (title: string, body: string, userId: number) => {
        let response = await axios.post(`${BASE}/posts`, {
            title, body, userId
        })

        return response.data
    }
}