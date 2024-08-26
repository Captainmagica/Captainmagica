<!-- 侧边菜单栏 -->
<template>
    <el-menu id="menu" index="1" :default-active="$route.path" class="el-menu-vertical-demo" @mouseover="SetCollapse(false)"
            @mouseleave="SetCollapse(true)" :collapse="isCollapse" :collapse-transition="false" router>
            <el-menu-item index="/home">
                <el-icon class="iconfont icon-zhuye"></el-icon>
                <span>系统首页</span>
            </el-menu-item>
            <el-sub-menu index="2">
                <template #title>
                    <el-icon class="iconfont icon-xinxiguanli messageImg"></el-icon>
                    <span>信息管理</span>
                </template>
                <el-menu-item index="/announce">
                    <span>教务通知</span>
                </el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="3">
                <template #title>
                    <el-icon class="iconfont icon-yonghu"></el-icon>
                    <span>用户管理</span>
                </template>
                <el-menu-item index="/adminInfo">
                    <span>管理员信息</span>
                </el-menu-item>
                <el-menu-item index="/teacherInfo">
                    <span>教师信息</span>
                </el-menu-item>
                <el-menu-item index="/studentInfo">
                    <span>学生信息</span>
                </el-menu-item>
            </el-sub-menu>
        </el-menu>
</template>

<script lang="ts" setup>

import { ref } from 'vue'
import '@/assets/css/content.css'
import {useRouter, useRoute} from 'vue-router'

const $router = useRouter()
const $route = useRoute()

let isCollapse = ref(true);

let menu: HTMLElement | null = null
let main: HTMLElement | null = null

const emits = defineEmits(['SetCollapse'])

// 实现左侧div块与菜单栏同时变化（缩略或展开）
function SetCollapse(collapse: boolean) {
    isCollapse.value = collapse
    menu = document.getElementById("menu")
    main = document.getElementById("main")
    if ( menu && main) {
        emits('SetCollapse', isCollapse.value)
        menu.style.width = isCollapse.value ? "63.18px" : "160px"
        main.style.width = `${100 % - menu.style.width}`
    }
}

</script>