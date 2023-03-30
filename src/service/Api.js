import axios from "axios"
import Cookies from 'js-cookie'

export const ApiService = axios.create({
	// baseURL: 'https://conselho-service.onrender.com'
  baseURL: 'http://localhost:3000'
});

export const useApi = () => ({
	login: async (email, password) => {
		const response = await ApiService.post('/auth/login', { email, password });
		return response.data;
	},
	loggedUser: async (token) => {
		const response = await ApiService.get('/users/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
		return response.data
	},
	register: async (name, email, password) => {
		const response = await ApiService.post('/auth/register', { name, email, password });
		return response.data;
	},
  getInstitutions: async () => {
    const response = await ApiService.get('/institutions', {
      headers: {
        'Authorization': `Bearer ${Cookies.get('Token')}`
      }
    });

    return response.data;
  },
  enterWithCode: async code => {
    const response = await ApiService.post(`/institutions/invite/${code}`, null, {
      headers: {
        'Authorization': `Bearer ${Cookies.get('Token')}`
      }
    });

    return response.data.instance;
  }
});
