export default defineEventHandler(async (event) => {
    let body = await readBody(event);

    let isValid = false;

    if (body.email === 'admin' && body.password === 'admin') {
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