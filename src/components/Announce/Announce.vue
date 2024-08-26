<template>
    <div class="common-layout">
        <div class="main-top">
            <SearchInput />
        </div>
        <div class="main-medium">
            <ManageButton />
        </div>
        <div class="main-bottom">
            <AnnounceTable />
        </div>
    </div>
</template>

<script lang="ts" setup>
import SearchInput from '@/components/Announce/SearchInput.vue'
import ManageButton from '@/components/Announce/ManageButton.vue'
import AnnounceTable from './AnnounceTable.vue';

</script>
