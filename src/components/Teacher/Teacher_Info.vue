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
import TeacherInfoTable from '@/components/Teacher/Teacher_InfoTable.vue'
import SearchInput from '@/components/Teacher/SearchTeacher.vue';
import ManageButton from '@/components/Teacher/TeacherManage_Button.vue'
</script>