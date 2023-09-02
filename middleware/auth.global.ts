import AuthService from "~/service/AuthService";

export default defineNuxtRouteMiddleware((to, from) => {
    if (!process.client) {
        return;
    }

    const authService = new AuthService();

    if (localStorage.getItem('token')) {
        authService.checkLoginStatus(localStorage.getItem('token'))
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then((res) => {
                useState('user', res.user);
                if(to.path === '/') {
                    navigateTo('/home');
                }

                if(to.path === '/admin/user') {
                    if (!res.data.isAdmin) {
                        navigateTo('/home');
                    }
                }
            })
            .catch(err => {
                localStorage.removeItem('token');
                navigateTo('/');
            });
    } else {
        navigateTo('/');
    }
})