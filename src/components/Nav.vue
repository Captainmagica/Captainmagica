<template>
    <el-header class="nav">
        <div class="nav-left">
            <img class="img" src="../assets/图标.png">
            <span class="title">教务系统</span>
        </div>
        <div class="nav-medium">
            <el-breadcrumb :separator-icon="ArrowRight">
                <el-breadcrumb-item :to="{path: '/'}">系统首页</el-breadcrumb-item>
                <el-breadcrumb-item v-if="route.path != '/'" :to="route.path">{{ route.name }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="nav-right">
            <img class="imgFigure" src="../assets/默认头像.png">
            <p class="role">{{ role }}</p>
        </div>
    </el-header>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'

const role = '管理员'

const route = useRoute()

</script>