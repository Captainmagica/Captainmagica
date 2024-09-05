<template>
    <el-input style="width: 240px; height: 32px;" placeholder="请输入关键字进行查询" v-model="input" @keyup.enter="student.SearchStudent(input)" />
    <el-button style="margin: 10px;" type="primary" @click="student.SearchStudent(input)" :icon="Search">查询</el-button>
    <el-button type="info" style="margin-left: 0;" :icon="RefreshLeft" @click="SearchReset()">重置</el-button>
</template>

<script lang="ts" setup>
    import '@/assets/css/content.css'
    import { ref } from 'vue'
    import { RefreshLeft, Search } from '@element-plus/icons-vue';
    import { useStudentStore } from '@/stores/StudentStore';
    const input = ref('')
    const student = useStudentStore()
    const SearchReset = () => {
        student.UpdateStudentInfo()
        input.value = ''
    }
</script>