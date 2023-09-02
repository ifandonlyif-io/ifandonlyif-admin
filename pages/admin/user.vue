<script setup>
import { ref } from 'vue';
import { onMounted } from 'vue';
import AuthService from '@/service/AuthService';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';

const authService = new AuthService();
const toast = useToast();
const confirm = useConfirm();

let users = ref([]);

let isAddUserShow = ref(false);

function addUser() {
    isAddUserShow.value = true;
}

function submitNewUser() {
    if (newUser.value.email == '') {
        toast.add({ severity: 'error', summary: 'error', detail: 'email is required' });
        return;
    }
    if (newUser.value.name == '') {
        toast.add({ severity: 'error', summary: 'error', detail: 'name is required' });
        return;
    }
    if (newUser.value.password == '') {
        toast.add({ severity: 'error', summary: 'error', detail: 'password is required' });
        return;
    }

    authService.addUser(newUser.value)
        .then((res) => {
            if (!res.ok) {
                throw res
            }
            return res.json()
        })
        .then(res => {
            console.log(res)
            toast.add({ severity: 'success', summary: 'success', detail: 'user added' });
            isAddUserShow.value = false;
            getUsers();
        })
        .catch(err => {
            err.json().then(err => {
                console.log(err)
                toast.add({ severity: 'error', summary: 'error', detail: err.message });
            })
        })
}

function deleteUser(id, name) {
    console.log('delete user: ', id)
    confirm.require({
        message: `Delete this user: ${name} ?`,
        header: 'Delete Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            authService.deleteUser(id)
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    toast.add({ severity: 'info', summary: 'Confirmed', detail: 'This user have been deleted', life: 3000 });
                    getUsers();
                })
                .catch(err => {
                    console.log(err)
                })
        },
        reject: () => {}
    });
}


let newUser = ref({
    email: '',
    name: '',
    password: ''
})

function getUsers() {
    authService.getUsers()
        .then(res => res.json())
        .then(res => {
            console.log(res)
            users.value = res.data.users
        })
        .catch(err => {
            console.log(err)
        })
}

onMounted(() => {
    getUsers();
})

</script>

<template>
    <div class="grid">
        <div class="col-10 card">
            <h3 class="p-2">manage users</h3>
            <Button label="add user" icon="pi pi-plus" size="small" @click="addUser" class="mb-3"/>
            <DataTable :value="users">
                <Column field="email" header="email">
                </Column>
                <Column field="name" header="name">
                </Column>
                <Column header="actions">
                    <template #body="slotProps">
                        <Button label="delete" 
                            icon="pi pi-trash" 
                            class="p-button-danger" 
                            size="small" 
                            @click="deleteUser(slotProps.data.id, slotProps.data.name)" />
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
    <Dialog v-model:visible="isAddUserShow" modal header="new user" style="width: 300px;">
        <div class="grid">
            <div class="col-12">
                <InputText placeholder="email" v-model="newUser.email"/>
            </div>
            <div class="col-12">
                <InputText placeholder="name" v-model="newUser.name"/>
            </div>
            <div class="col-12">
                <InputText placeholder="password" v-model="newUser.password"/>
            </div>
            <div class="col-12">
                <Button label="add" @click="submitNewUser"/>
            </div>
        </div>
    </Dialog>
    <Toast />
    <ConfirmDialog></ConfirmDialog>
</template>

<style lang="scss" scoped>

</style>