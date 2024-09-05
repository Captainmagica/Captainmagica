<template>
    <div class="common-layout">
        <div class="main-top">
            <SearchNotice />
        </div>
        <div class="main-medium">
            <ManageButton />
        </div>
        <div class="main-bottom">
            <NoticeTable />
        </div>
    </div>
</template>

<script lang="ts" setup>
import SearchNotice from './SearchNotice.vue';
import ManageButton from './ManageButton.vue';
import NoticeTable from './NoticeTable.vue';

</script>
