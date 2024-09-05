<template>
    <el-input style="width: 240px; height: 32px;" placeholder="请输入关键字进行查询" v-model="input" @keyup.enter="announce.SearchNotice" />
    <el-button style="margin: 10px;" type="primary" @click="announce.SearchNotice(input)" :icon="Search">查询</el-button>
    <el-button type="info" style="margin-left: 0;" :icon="RefreshLeft" @click="SearchReset()">重置</el-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useNoticeStore } from '@/stores/NoticeStore';
import { Search, RefreshLeft } from '@element-plus/icons-vue';
const input = ref('')

const announce = useNoticeStore()
const SearchReset = () => {
    announce.UpdateNotice()
    input.value = ''
}
</script>