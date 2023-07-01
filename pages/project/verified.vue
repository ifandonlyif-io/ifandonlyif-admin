<script setup>
import { onMounted } from 'vue';
import ProjectService from '@/service/ProjectService';
import moment from 'moment';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

let service = new ProjectService();

let projects = ref([])

onMounted(() => {
    service.getVerifiedProjects()
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
            <h3 class="p-2">Verified project</h3>
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
                <Column header="verified at">
                    <template #body="slotProps">
                        {{ moment(slotProps.data.verifiedAt.Time).format('YYYY/MM/DD HH:mm:ss') }}
                    </template>
                </Column>
                <Column field="reporterName" header="reporter"></Column>
                <Column field="guildName" header="report channel"></Column>
            </DataTable>
        </div>
    </div>
</template>