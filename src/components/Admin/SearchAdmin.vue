<template>
    <el-input style="width: 240px; height: 32px;" placeholder="请输入关键字进行查询" v-model="input" @keyup.enter="admin.SearchAdmin(input)" />
    <el-button style="margin: 10px;" type="primary" @click="admin.SearchAdmin(input)" :icon="Search">查询</el-button>
    <el-button type="info" style="margin-left: 0;" :icon="RefreshLeft" @click="SearchReset()">重置</el-button>
</template>

<script lang="ts" setup>
import '@/assets/css/content.css'
import { ref } from 'vue'
import { RefreshLeft, Search } from '@element-plus/icons-vue';
import { useAdminStore } from '@/stores/AdminStore';
const input = ref('')
const admin = useAdminStore()
const SearchReset = () => {
    admin.UpdateAdminInfo()
    input.value = ''
}
</script>