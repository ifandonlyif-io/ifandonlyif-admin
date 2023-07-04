<script setup>
import ConfirmDialog from 'primevue/confirmdialog';

import { onMounted } from 'vue';
import DiscordService from '@/service/DiscordService';
import moment from 'moment';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from "primevue/usetoast";

const confirm = useConfirm();
const toast = useToast();

let service = new DiscordService();
let appliances = ref([])

function loadProjects() {
    service.getAppliance()
        .then(res => res.json())
        .then(res => {
            console.log(res)
            appliances.value = res.data
        })
        .catch(err => {
            console.log(err)
        })
}

onMounted(() => {
    loadProjects()
})

function approve(appliance) {
    confirm.require({
        message: `Allow ${appliance.channelName} to report?`,
        header: 'Verify Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            console.log('appliance verified')
            service.approve(appliance.id, true)
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    loadProjects()
                    toast.add({ severity: 'info', summary: 'Confirmed', detail: 'This channel have been verified', life: 3000 });
                })
                .catch(err => {
                    console.log(err)
                })
        }
    })
}

function reject(appliance) {
    confirm.require({
        message: `Don't allow ${appliance.channelName} to report?`,
        header: 'Reject Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            console.log('appliance verified')
            service.approve(appliance.id, false)
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    loadProjects()
                    toast.add({ severity: 'info', summary: 'Confirmed', detail: 'This channel have been reject', life: 3000 });
                })
                .catch(err => {
                    console.log(err)
                })
        }
    })

}

</script>

<template>
    <ConfirmDialog></ConfirmDialog>
    <Toast />
    <div class="grid">
        <div class="col-10 card">
            <h3 class="p-2">Appliance from channels</h3>
            <DataTable :value="appliances">
                <Column field="channelName" header="channel name"></Column>
                <Column field="createdAt" header="apply at">
                    <template #body="slotProps">
                        {{moment(slotProps.data.createdAt).format('YYYY-MM-DD HH:mm:ss')}}
                    </template>
                </Column>
                <Column header="status" style="min-width:100px">
                    <template #body="slotProps">
                        <Tag severity="warning" v-if="!slotProps.data.isApproved.Valid">to be approved</Tag>
                        <Tag severity="success" 
                            v-if="slotProps.data.isApproved.Valid && slotProps.data.isApproved.Bool">
                            approved
                        </Tag>
                        <Tag severity="danger" 
                            v-if="slotProps.data.isApproved.Valid && !slotProps.data.isApproved.Bool">
                            rejected
                        </Tag>
                    </template>
                </Column>
                <Column header="options">
                    <template #body="slotProps">
                        <Button 
                            label="approve" 
                            icon="pi pi-check" 
                            size="small" 
                            @click="approve(slotProps.data)"
                            v-if="!slotProps.data.isApproved.Valid" />
                        <Button 
                            label="reject" 
                            icon="pi pi-times"
                            size="small" 
                            @click="reject(slotProps.data)" 
                            v-if="!slotProps.data.isApproved.Valid"/>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>