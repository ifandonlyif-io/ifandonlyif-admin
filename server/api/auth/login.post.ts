export default defineEventHandler(async (event) => {
    let body = await readBody(event);

    let isValid = false;
    const config = useRuntimeConfig();

    if (body.email === 'admin' && body.password === config.adminPassword) {
        isValid = true;
    }

    return {
        success: isValid,
        token: 'random-token',
        user: {
            email: body.email,
            name: 'admin'
        }
    };
});