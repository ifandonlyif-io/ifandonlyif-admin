<script setup>
import { onMounted } from 'vue';
import ProjectService from '@/service/ProjectService';
import moment from 'moment';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const confirm = useConfirm();
const toast = useToast();

let service = new ProjectService();

let projects = ref([])

onMounted(() => {
    service.getDisapprovedProjects()
        .then(res => res.json())
        .then(res => {
            console.log(res)
            projects.value = res
        })
        .catch(err => {
            console.log(err)
        })
})

</script>

<template>
    <div class="grid">
        <div class="col-10 card">
            <h3 class="p-2">Disproved projects</h3>
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
                <Column header="disproved at">
                    <template #body="slotProps">
                        {{ moment(slotProps.data.disprovedAt.Time).format('YYYY/MM/DD HH:mm:ss') }}
                    </template>
                </Column>
                <Column field="reporterName" header="reporter"></Column>
                <Column field="guildName" header="report channel"></Column>
            </DataTable>
        </div>
    </div>
</template>