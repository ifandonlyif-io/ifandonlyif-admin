export default class AuthService {
    constructor() {
        const config = useRuntimeConfig()
        this.apiBase = config.public.apiBase
    }

    login(email, password) {
        let formData = new FormData()
        formData.append('email', email)
        formData.append('password', password)

        return fetch(`${this.apiBase}/api/admin/login`, {
            method: 'POST',
            body: formData
        })
    }

    checkLoginStatus(token) {
        return fetch(`${this.apiBase}/api/admin/me`, {
            method: 'GET',
            headers: {
                token: token
            }
        })
    }

    getUsers() {
        return fetch(`${this.apiBase}/api/admin/user-management/users`, {
            method: 'GET',
            headers: {
                token: localStorage.getItem('token')
            }
        })
    }

    addUser(data) {
        return fetch(`${this.apiBase}/api/admin/user-management/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                token: localStorage.getItem('token')
            },
            body: JSON.stringify(data)
        })
    }

    deleteUser(id) {
        return fetch(`${this.apiBase}/api/admin/user-management/user/${id}`, {
            method: 'DELETE',
            headers: {
                token: localStorage.getItem('token')
            }
        })
    }
}