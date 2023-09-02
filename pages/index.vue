<script setup>
import { useLayout } from '@/layouts/composables/layout';
import { ref, computed } from 'vue';
import AppConfig from '@/layouts/AppConfig.vue';
import AuthService from '@/service/AuthService';

const { layoutConfig } = useLayout();
let email = ref('');
let password = ref('');

let emailInvalid = ref(false)
let passwordInvalid = ref(false)
let invalidMessage = ref('')

let loginResponse = ref({})

let authService = new AuthService();

const logoUrl = computed(() => {
    return `/layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});

definePageMeta({
    layout: false
});

function login() {
    if (!email.value && !password.value) {
        emailInvalid.value = true
        passwordInvalid.value = true
        invalidMessage.value = 'Email and Password are required'
        return
    }

    if (!email.value) {
        emailInvalid.value = true
        invalidMessage.value = 'Email is required'
        return
    }
    
    if (!password.value) {
        passwordInvalid.value = true
        invalidMessage.value = 'Password is required'
        return
    }

    authService.login(email.value, password.value)
        .then((res) => {
            if (!res.ok) {
                emailInvalid.value = true
                passwordInvalid.value = true
                invalidMessage.value = 'Email or Password is incorrect'
                return
            }
            return res.json()
        })
        .then(res => {
            localStorage.setItem('token', res.data.token)
            navigateTo('home')
            console.log(res)
        })
}

watch(email, () => {
    emailInvalid.value = false
    invalidMessage.value = ''
})

watch(password, () => {
    passwordInvalid.value = false
    invalidMessage.value = ''
})

</script>

<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <!-- <img :src="logoUrl" alt="Sakai logo" class="mb-5 w-6rem flex-shrink-0" /> -->
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <!-- <img src="/demo/images/login/avatar.png" alt="Image" height="50" class="mb-3" /> -->
                        <div class="text-900 text-3xl font-medium mb-3">ifandonlyif Admin</div>
                        <!-- <span class="text-600 font-medium">Sign in to continue</span> -->
                    </div>

                    <div>
                        <label for="email1" class="block text-900 text-xl font-medium mb-2">Email</label>
                        <InputText 
                            id="email1"
                            v-model="email" 
                            type="text" 
                            placeholder="Email address" 
                            class="w-full md:w-30rem mb-5"
                            :class="{'border-red-500': emailInvalid}" 
                            style="padding: 1rem" />

                        <label for="password1" class="block text-900 font-medium text-xl mb-2">Password</label>
                        <Password
                            id="password1" 
                            v-model="password" 
                            placeholder="Password" 
                            :toggleMask="true" 
                            class="w-full mb-3" 
                            :class="{'border-red-500': passwordInvalid}"
                            inputClass="w-full" 
                            :inputStyle="{ padding: '1rem' }"></Password>

                        <div class="flex align-items-center justify-content-between mb-5 gap-5">
                            <div class="flex">
                                <small class="text-red-500" v-if="invalidMessage">{{ invalidMessage }}</small>
                                <!-- <Checkbox id="rememberme1" v-model="checked" binary class="mr-2"></Checkbox>
                                <label for="rememberme1">Remember me</label> -->
                            </div>
                            <!-- <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">Forgot password?</a> -->
                        </div>
                        <Button label="Sign In" class="w-full p-3 text-xl" @click="login"></Button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <AppConfig simple />
    <Toast></Toast>
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}
.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
