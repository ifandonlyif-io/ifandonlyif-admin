<script setup>
import moment from 'moment';
import DiscordService from '~/service/DiscordService';

let channels = ref([])
let service = new DiscordService();

onMounted(() => {
    service.getChannels()
        .then(res => res.json())
        .then(res => {
            console.log(res)
            channels.value = res.data
        })
        .catch(err => {
            console.log(err)
        })
})

</script>

<template>
    <ConfirmDialog></ConfirmDialog>
    <Toast />
    <div class="grid">
        <div class="col-10 card">
            <h3 class="p-2">channels can report</h3>
            <DataTable :value="channels">
                <Column field="name" header="頻道名稱"></Column>
                <Column header="審核時間">
                    <template #body="slotProps">
                        {{ moment(slotProps.data.createdAt).format('YYYY-MM-DD HH:mm:ss') }}
                    </template>
                </Column>
                <Column header="操作">
                    <template #body="slotProps">
                        <Button
                            label="lock" 
                            icon="pi pi-lock" 
                            class="p-button-danger" 
                            @click="lockChannel(slotProps.data.id)"
                            size="small">
                        </Button>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>