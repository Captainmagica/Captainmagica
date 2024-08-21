<template>
    <div class="common-layout">
        <div class="main-top">
            <SearchInput />
        </div>
        <div class="main-medium">
            <ManageButton />
        </div>
        <div class="main-bottom">
            <TeacherInfoTable/>
        </div>
    </div>
</template>

<script lang="ts" setup>
import TeacherInfoTable from '@/components/Teacher_InfoTable.vue'
import SearchInput from '@/components/SearchTeacher.vue';
import ManageButton from '@/components/TeacherManage_Button.vue'
</script>