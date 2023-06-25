

export default defineNuxtRouteMiddleware((to, from) => {
    if (!process.client) {
        return;
    }

    if (to.path === '/') {
        if (localStorage.getItem('token')) {2
            return navigateTo('/home');
        }
        return;
    }

    if (!localStorage.getItem('token')) {
        return navigateTo('/');
    }
})