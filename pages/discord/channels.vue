<script setup>
import moment from 'moment';
import DiscordService from '~/service/DiscordService';
import ConfirmDialog from 'primevue/confirmdialog';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';

let channels = ref([])
let service = new DiscordService();

const confirm = useConfirm();
const toast = useToast();

onMounted(() => {
    loadChannels();
})

function loadChannels() {
    service.getChannels()
        .then(res => res.json())
        .then(res => {
            console.log(res);
            channels.value = res.data;
    })
    .catch(err => {
        console.log(err);
    });
}

function lockChannel(id) {
    confirm.require({
        message: 'Are you sure you want to lock this channel?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            service.lockChannel(id)
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    if (res.data.lockedAt.Valid) {
                        toast.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'Channel locked',
                            life: 3000
                        });
                    loadChannels();
                    } else {
                        toast.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: res.message,
                            life: 3000
                        });
                    }
                })
                .catch(err => {
                    toast.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: err.data.message,
                            life: 3000
                        });
                })
        },
    });
}

function unlockChannel(id) {
    confirm.require({
        message: 'Are you sure you want to unlock this channel?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            service.unlockChannel(id)
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    if (!res.data.lockedAt.Valid) {
                        toast.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'Channel unlocked',
                            life: 3000
                        });
                        loadChannels()
                    } else {
                        toast.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: res.data.message,
                            life: 3000
                        });
                    }
                })
                .catch(err => {
                    toast.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: err.data.message,
                            life: 3000
                        });
                })
        },
    });
}

</script>

<template>
    <ConfirmDialog></ConfirmDialog>
    <Toast />
    <div class="grid">
        <div class="col-10 card">
            <h3 class="p-2">Channels can report</h3>
            <DataTable :value="channels">
                <Column field="name" header="channel name"></Column>
                <Column header="approved at">
                    <template #body="slotProps">
                        {{ moment(slotProps.data.createdAt).format('YYYY-MM-DD HH:mm:ss') }}
                    </template>
                </Column>
                <Column header="options">
                    <template #body="slotProps">
                        <Button
                            label="lock" 
                            icon="pi pi-lock" 
                            class="p-button-danger" 
                            @click="lockChannel(slotProps.data.id)"
                            v-if="slotProps.data.lockedAt.Valid === false"
                            size="small" />
                        <Button
                            label="unlock" 
                            icon="pi pi-unlock" 
                            class="p-button-success" 
                            @click="unlockChannel(slotProps.data.id)"
                            v-else
                            size="small" />
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>