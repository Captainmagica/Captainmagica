<template>
  <div class="common-layout">
        <!-- 导航 -->
        <Navbar />
        <el-container>
            <!-- 左菜单 -->
             <el-aside id="aside" :style="{width: asideWidth}">
                <AsideMenu @SetCollapse="changeAsideRange"/>
             </el-aside>
            <!-- 主显示区域 -->
            <el-main id="main">
                <router-view />
            </el-main>
        </el-container>
    </div>
</template>

<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router';
  import Navbar from './components/Nav.vue';
  import AsideMenu from './components/Aside_Menu.vue';
  import '@/assets/css/content.css'
  import {  ref } from 'vue';

const asideWidth = ref<string>("63.18px");
const changeAsideRange = (isCollapse:boolean)=>{
    asideWidth.value = isCollapse ? "63.18px" : "160px";
}
</script>

<style>
</style>
