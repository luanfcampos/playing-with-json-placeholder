const BASE = 'https://jsonplaceholder.typicode.com'

export const api = {
    getAll: async () => {
        let response = await fetch(`${BASE}/post`)
        let json = await response.json()
        return json
    },
    addNew: async (title: string, body: string, userId: number) => {
        let response = await fetch(`${BASE}/post`,{
        method: 'POST',
        body: JSON.stringify({title, body, userId}),
        headers: {
            'Content-Type': 'application/json'
        }
        })
        let json = await response.json()
        return json
    }
}