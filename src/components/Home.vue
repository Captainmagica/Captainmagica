<template>
      <div style="display: flex; margin-bottom: 3px;" >
        <AnnounceCard style="flex: 1; margin-right: 3px;"></AnnounceCard>
        <TestArrangement style="flex: 1;"></TestArrangement>
      </div>
      <div style="display: flex;">
        <AttendanceInfo style="flex: 1; margin-right: 3px;"></AttendanceInfo>
        <GradeStatistic style="flex: 1;" ></GradeStatistic>
      </div>
  </template>
  
  <script lang="ts" setup>
  import AnnounceCard from './Announce/AnnounceCard.vue';
  import TestArrangement from './TestArrangement.vue';
  import AttendanceInfo from './AttendanceInfo.vue';
  import GradeStatistic from './GradeStatistic.vue';
  import '../assets/css/content.css';


  </script>
  