<template>  
      <div style="display: flex; margin-bottom: 1px;" >
        <NoticeCard style="flex: 1; margin-right: 1px;"></NoticeCard>
        <TestArrangementCard style="flex: 1;"></TestArrangementCard>
      </div>
      <div style="display: flex;">
        <AttendanceInfo style="flex: 1; margin-right: 1px;"></AttendanceInfo>
        <GradeStatistic style="flex: 1;" ></GradeStatistic>
      </div>
  </template>
  
  <script lang="ts" setup>
import NoticeCard from './Notice/NoticeCard.vue';
import TestArrangementCard from './TestArrangement/TestArrangementCard.vue';
import AttendanceInfo from './AttendanceInfo.vue';
import GradeStatistic from './GradeStatistic.vue';
import '../assets/css/content.css';


  </script>
  