<template>
    <el-input style="width: 240px; height: 32px;" placeholder="请输入关键字进行查询" v-model="input" @keyup.enter="" />
    <el-button style="margin: 10px;" type="primary" @click="test.SearchTestArrangement(input)" :icon="Search">查询</el-button>
    <el-button type="info" style="margin-left: 0;" :icon="RefreshLeft" @click="SearchReset()">重置</el-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Search, RefreshLeft } from '@element-plus/icons-vue';
import { useTestArrangementStore } from '@/stores/TestArrangementStore';
const input = ref('')

const test = useTestArrangementStore()
const SearchReset = () => {
    test.UpdateTestArrangement()
    input.value = ''
}
</script>