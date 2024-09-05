<!-- 考试安排 -->
<template>
    <el-card class="card">
        <template #header>
            <div class="card-header">
                <span>考试安排</span>
            </div>          
         </template>
        <el-timeline>
            <el-timeline-item v-for="item in test.testArrangements.slice(0, 3)" :timestamp="item.date">
                <el-popover placement="right" trigger="hover">
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
import { useTestArrangementStore } from '@/stores/TestArrangementStore';

const test = useTestArrangementStore()
</script>