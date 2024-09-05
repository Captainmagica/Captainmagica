<template>
    <div class="common-layout">
        <div class="main-top">
            <SearchTest />
        </div>
        <div class="main-medium">
            <ManageButton />
        </div>
        <div class="main-bottom">
            <TestArrangement_Table />
        </div>
    </div>
</template>

<script lang="ts" setup>
import SearchTest from './SearchTest.vue';
import ManageButton from './ManageButton.vue';
import TestArrangement_Table from './TestArrangement_Table.vue';
import '@/assets/css/content.css'



</script>