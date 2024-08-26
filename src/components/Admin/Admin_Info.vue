<template>
    <div class="common-layout">
        <div class="main-top">
            <SearchInput />
        </div>
        <div class="main-medium">
            <ManageButton />
        </div>
        <div class="main-bottom">
            <AdminInfoTable />
        </div>
    </div>
</template>

<script lang="ts" setup>
import SearchInput from '@/components/Admin/SearchAdmin.vue'
import ManageButton from './AdminManage_Button.vue'
import AdminInfoTable from './Admin_InfoTable.vue'


import '@/assets/css/content.css'



</script>