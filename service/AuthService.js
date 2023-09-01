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
}