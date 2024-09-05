<!-- 侧边菜单栏 -->
<template>
        <div class="inner-container" style="height: calc(100vh - 44px); overflow: hidden;" :style="{width: menu?.style.width}">
            <el-menu id="menu" style="max-height: 100vh; overflow-y: auto;" index="1" :default-active="$route.path" class="el-menu-vertical-demo" @mouseover="SetCollapse(false)"
            @mouseleave="SetCollapse(true)" :collapse="isCollapse" :collapse-transition="false" router>
                <el-menu-item index="/home">
                    <el-icon class="iconfont icon-zhuye"></el-icon>
                    <span>系统首页</span>
                </el-menu-item>
                <el-sub-menu index="2">
                    <template #title>
                        <el-icon class="iconfont icon-tongzhi"></el-icon>
                        <span>信息管理</span>
                    </template>
                    <el-menu-item index="/notice">
                        <span>教务通知</span>
                    </el-menu-item>
                    <el-menu-item index="/testArrange">
                        <span>考试安排</span>
                    </el-menu-item>
                    <el-menu-item index="/attendInfo">
                        <span>考勤信息</span>
                    </el-menu-item>
                    <el-menu-item index="/gradeStatistic">
                        <span>成绩统计</span>
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
        </div>
</template>

<script lang="ts" setup>

import { onMounted, ref } from 'vue'
import '@/assets/css/content.css'
import {useRouter, useRoute} from 'vue-router'

const $router = useRouter()
const $route = useRoute()

let isCollapse = ref(true);

let menu: HTMLElement | null = null
let main: HTMLElement | null = null
onMounted(() => {
    menu = document.getElementById("menu");
    main = document.getElementById("main");
});
const emits = defineEmits(['SetCollapse', 'SetMenuHeight'])

// 实现左侧div块与菜单栏同时变化（缩略或展开）
function SetCollapse(collapse: boolean) {
    isCollapse.value = collapse
    menu = document.getElementById("menu")
    main = document.getElementById("main")
    if ( menu && main) {
        emits('SetCollapse', isCollapse.value)
        menu.style.width = isCollapse.value ? "63.18px" : "160px"
        main.style.width = `calc(100% - ${menu.style.width})`
    }
}

</script>