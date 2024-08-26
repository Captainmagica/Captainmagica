<template>
    <el-card class="card" body-style="height: 50%">
        <template #header>
            <div class="card-header">
                <span>教务通知</span>
            </div>
         </template>
         <el-timeline>
            <el-timeline-item v-for="item in tableStore().announces" :timestamp="item.date">
                {{ item.content }}
            </el-timeline-item>
         </el-timeline>
    </el-card>
    
</template>

<script setup lang="ts">
import tableStore from '@/stores/table';
import axios from 'axios';
import {ref} from 'vue'

interface Announce{
        id: number,
        content: string,
        time: Date,
    }
   
</script>