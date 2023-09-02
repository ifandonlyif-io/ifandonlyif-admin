<script setup>
import { ref } from 'vue';
import AppMenuItem from './AppMenuItem.vue';
import AuthService from '~/service/AuthService';

const authService = new AuthService();

const model = ref([
    {
        label: 'verify reported projects',
        items:[
            {label: 'unverified projects', to: '/home'},
            {label: 'verified prjects', to: '/project/verified'},
            {label: 'disproved projects', to: '/project/disproved'}
        ]
    },
    {
        label: 'discord bot management',
        items: [
            { label: 'appliances', to: '/discord/appliance' },
            { label: 'channel management', to: '/discord/channels' },
        ]
    },
    {
        label: 'admin management',
        items: [
            { label: 'user management', to: '/admin/user' }
        ]
    },
]);

let user = ref({});

function permissionCheck(item) {
    console.log(item);
    if (item.label == 'admin management') {
        if (!user.value.isAdmin) {
            return false;
        }
    }
    return true;
}

onMounted(() => {
    authService.checkLoginStatus(localStorage.getItem('token'))
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
        })
        .then((res) => {
            user.value = res.data;
            console.log(user.value);
        })
});

</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator && permissionCheck(item)" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
        <!-- <li>
            <a href="https://www.primefaces.org/primeblocks-vue/#/" target="_blank">
                <img src="/layout/images/banner-primeblocks.png" alt="Prime Blocks" class="w-full mt-3" />
            </a>
        </li> -->
    </ul>
</template>

<style lang="scss" scoped></style>
