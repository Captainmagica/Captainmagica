<template>
    <Login v-if="route.path === '/login'"></Login>
    <div v-else class="common-layout">
        <!-- 导航 -->
        <Navbar />
        <el-container style="height: 100%;">
            <!-- 左菜单 -->
             <el-aside id="aside" :style="{width: asideWidth}" style="height: calc(100vh - 44px); overflow: hidden; border-right: 16px solid white; position: relative; overflow: hidden;">
                <AsideMenu @SetCollapse="changeAsideWidth"/>
             </el-aside>
            <!-- 主显示区域 -->
            <el-main id="main">
                <router-view :key="$route.fullPath"/>
            </el-main>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import { RouterView, useRoute, useRouter } from 'vue-router';
import Navbar from './components/Nav.vue';
import AsideMenu from './components/Aside_Menu.vue';
import '@/assets/css/content.css'
import {  onMounted, ref } from 'vue';
import Login from './components/Login.vue';
import { useLoginStore } from './stores/Login';
const route = useRoute()
const router = useRouter()
const asideWidth = ref<string>("63.18px"); 
const changeAsideWidth = (isCollapse:boolean)=>{
    asideWidth.value = isCollapse ? "63.18px" : "160px";
}


const storedLoginStatus = localStorage.getItem('isLoggedIn');

//应用初始化时检查 localStorage 中是否保存了登录状态，并将其恢复：
if (storedLoginStatus === 'true') {
    useLoginStore().setLoggedIn(true);
}
const login = useLoginStore()
//刷新页面后判断是否登录，若登录则恢复当前登录用户信息
onMounted(() => {
    const storedUser = localStorage.getItem('user');
    const storeAvatar = localStorage.getItem('image_data')
    if (storedUser) {
        login.user = JSON.parse(storedUser);
        login.isLoggedIn = true;
        login.image_data = JSON.parse(storeAvatar as string)
    } else {
        router.replace('/login');
    }
});
</script>

