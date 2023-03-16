import axios from "axios"


export const ApiService = axios.create({
	baseURL: 'https://conselho-service.onrender.com'
})

export const useApi = () => ({
	login: async (email, password) => {
		const response = await ApiService.post('/auth/login', { email, password });
		return response.data;
	},
	loggedUser: async(token) => {
		const response = await ApiService.get('/user/me', { token })
		return response.data
	},
	register: async (name, email, password) => {
		const response = await ApiService.post('/auth/register', { name, email, password });
		return response.data;
	}
})
