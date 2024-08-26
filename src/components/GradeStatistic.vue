<!-- 成绩统计 -->
<template>
    <el-card class="card" style="height: 50%;">
        <template #header>
            <div class="card-header">
                <span>成绩统计</span>
            </div>
         </template>
         <el-timeline>
            <el-timeline-item v-for="item in announces" :timestamp="item.time">
                {{ item.content }}
            </el-timeline-item>
         </el-timeline>
    </el-card>
</template>

<script setup lang="ts">
const announces = [
    {
        content: "系统正式上线，开始内测",
        time: "2024-7-5",
    },
    {
        content: "系统测试正常，暂无问题",
        time: "2024-8-1",
    },
    {
        content: "测试完成，正式投入使用",
        time: "2024-8-31",
    }
]
</script>