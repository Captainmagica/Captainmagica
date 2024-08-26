<template>
    <div class="common-layout">
        <div class="main-top">
            <SearchInput />
        </div>
        <div class="main-medium">
            <ManageButton />
        </div>
        <div class="main-bottom">
            <StudentInfoTable />
        </div>
    </div>
</template>

<script lang="ts" setup>
import StudentInfoTable from '@/components/Student/Student_InfoTable.vue'
import SearchInput from '@/components/Student/SearchStudent.vue';
import ManageButton from '@/components/Student/StudentManage_Button.vue'
</script>