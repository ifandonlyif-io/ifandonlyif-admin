<script setup>
import ConfirmDialog from 'primevue/confirmdialog';

import { onMounted } from 'vue';
import ProjectService from '@/service/ProjectService';
import moment from 'moment';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from "primevue/usetoast";

const confirm = useConfirm();
const toast = useToast();

let service = new ProjectService();

let projects = ref([])

function loadProjects() {
    service.getUnverifiedProjects()
        .then(res => res.json())
        .then(res => {
            console.log(res)
            projects.value = res
        })
        .catch(err => {
            console.log(err)
        })
}

onMounted(() => {
    loadProjects()
})

function verify(project) {
    confirm.require({
        message: `Verify this project? (${project.httpAddress})`,
        header: 'Verify Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            console.log('verified')
            service.verify(project.id)
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    loadProjects()
                    toast.add({ severity: 'info', summary: 'Confirmed', detail: 'This project have been verified', life: 3000 });
                })
                .catch(err => {
                    console.log(err)
                })
        },
        reject: () => {}
    });
}

function disprove(project) {
    console.log('disproved');
    confirm.require({
        message: `Disprove this project? (${project.httpAddress})`,
        header: 'Disprove Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            console.log('disproved')
            service.disapprove(project.id)
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    loadProjects()
                    toast.add({ severity: 'info', summary: 'Confirmed', detail: 'This project have been disproved', life: 3000 });
                })
                .catch(err => {
                    console.log(err)
                })
        }
    });
}
</script>

<template>
    <ConfirmDialog></ConfirmDialog>
    <Toast />
    <div class="grid">
        <div class="col-10 card">
            <h3 class="p-2">Unverified projects</h3>
            <DataTable :value="projects">
                <Column field="httpAddress" header="project link">
                    <template #body="slotProps">
                        <a :href="slotProps.data.httpAddress" target="_blank">{{ slotProps.data.httpAddress }}</a>
                    </template>
                </Column>
                <Column field="createdAt" header="reported at">
                    <template #body="slotProps">
                        {{ moment(slotProps.data.createdAt).format('YYYY/MM/DD HH:mm:ss') }}
                    </template>
                </Column>
                <Column field="reporterName" header="reporter"></Column>
                <Column field="guildName" header="report channel"></Column>
                <Column field="" header="options" style="min-width:100px">
                    <template #body="slotProps">
                        <Button @click="verify(slotProps.data)" icon="pi pi-check" label="verify" size="small"></Button>
                        <Button @click="disprove(slotProps.data)" icon="pi pi-times" label="disprove" size="small"></Button>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>
