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
            <h3 class="p-2">verified project</h3>
            <DataTable :value="projects">
                <Column field="httpAddress" header="專案連結">
                    <template #body="slotProps">
                        <a :href="slotProps.data.httpAddress" target="_blank">{{ slotProps.data.httpAddress }}</a>
                    </template>
                </Column>
                <Column field="createdAt" header="回報時間">
                    <template #body="slotProps">
                        {{ moment(slotProps.data.createdAt).format('YYYY/MM/DD HH:mm:ss') }}
                    </template>
                </Column>
                <Column header="審核時間">
                    <template #body="slotProps">
                        {{ moment(slotProps.data.verifiedAt.Time).format('YYYY/MM/DD HH:mm:ss') }}
                    </template>
                </Column>
                <Column field="reporterName" header="回報人"></Column>
                <Column field="guildName" header="回報頻道"></Column>
            </DataTable>
        </div>
    </div>
</template>