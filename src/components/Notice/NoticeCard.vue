<template>
    <el-card class="card" body-style="height: 50%">
        <template #header>
            <div class="card-header">
                <span>教务通知</span>
            </div>
         </template>
         <el-timeline>
            <!-- 使用slice分割教务通知数组，使主页只显示前三条通知 -->
            <el-timeline-item v-for="item in notice.notices.slice(0, 3)" :timestamp="item.date">
                <el-popover placement="right" :width="200" trigger="hover">
                    <template #reference>
                        {{ item.content }}
                    </template>       
                    <template #default>
                        <p>{{ item.content }}</p>
                    </template>     
                </el-popover>
            </el-timeline-item>
         </el-timeline>
    </el-card>
    
</template>

<script setup lang="ts">
import { useNoticeStore } from '@/stores/NoticeStore';
const notice = useNoticeStore()
interface Notice{
        id: number,
        content: string,
        time: Date,
    }
   
</script>