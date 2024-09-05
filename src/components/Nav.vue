<template>
    <el-header class="nav">
        <div class="nav-left">
            <img class="img" src="@/assets/图标.png">
            <span class="title">教务系统</span>
        </div>
        <div class="nav-medium">
            <el-breadcrumb :separator-icon="ArrowRight">
                <el-breadcrumb-item :to="{ path: '/home' }">系统首页</el-breadcrumb-item>
                <el-breadcrumb-item v-if="route.path !== '/home'" :to="route.path">{{ route.name }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="nav-right">
            <el-dropdown>
                <div class="dropdown-trigger" style="display: flex; justify-content: center; align-items: center;">
                    <img class="imgFigure" :src="login.image_data">
                    <p class="role">{{ role }}</p>
                </div>        
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="JumpToAdminSelfMes">个人信息</el-dropdown-item>
                        <el-dropdown-item @click="JumpToChangPassword">修改密码</el-dropdown-item>
                        <el-dropdown-item @click="Unlogin">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </el-header>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import { useLoginStore } from '@/stores/Login';
const role = '管理员'
const route = useRoute()
const router = useRouter()
const login = useLoginStore()
const JumpToAdminSelfMes = () => {
    router.push('/adminSelfMes')
}

const Unlogin = () => {
    router.replace('/login')
    login.setLoggedIn(false)
    localStorage.setItem('isLoggedIn', 'false')
}

const JumpToChangPassword = () => {
    router.replace('/changePassword')
}
</script>
