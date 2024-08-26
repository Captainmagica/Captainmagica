<template>
    <el-table :data="tableStore().announces" :cell-style="{ textAlign: 'center'}" 
    :header-cell-style="{ 'text-align': 'center' }" @selection-change="handleSelectionChange">
        <el-table-column type="selection" :header-row-style="{ 'background-color': '#f8f8f8' }"></el-table-column>
        <el-table-column prop="id" label="序号" sortable ></el-table-column>
        <el-table-column prop="content" label="内容"></el-table-column>
        <el-table-column prop="date" label="日期"></el-table-column>
        <el-table-column min-width="140px">
            <template v-slot="scope">
                <el-button type="primary" size="small" @click="HandleEdit(scope.row)">编辑</el-button>
                <el-button type="danger" size="small" @click="HandleDelete(scope.row.id)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-dialog v-model="addDialogVisible" align-center>
        <el-form label-width="auto" :rules="updateRules" ref="formRef" v-model="currentInfo">
            <el-form-item label="通知内容：">
                <el-input type="textarea" v-model="currentInfo.content"></el-input>
            </el-form-item>
            <el-form-item label="选择时间：" prop="date">
                <template #default>
                    <el-date-picker
                    v-model="currentInfo.date"
                    type="date"
                    placeholder="选择日期"
                    size="default"
                    @change="handleDateChange()"
                    value-format="YYYY-MM-DD"
                    />
                </template>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSubmit">提交</el-button>
                <el-button @click="handleReset">重置</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts" setup>
import tableStore from '@/stores/table';
import { type FormRules, type FormInstance, ElMessage } from 'element-plus';
import {reactive, ref} from 'vue';
import type { AnnounceInfo } from './Announce';
import { ValidateDate, ResetForm, OnSubmit } from './Announce';
import axios from 'axios';
import { el } from 'element-plus/es/locales.mjs';

let addDialogVisible = ref(false);
const currentInfo = reactive<AnnounceInfo>({
    content: '',
    date: '',
})
const originInfo = reactive<AnnounceInfo>({
    content: '',
    date: '',
})

let formRef = ref<FormInstance>();


const handleSelectionChange = (selection: []) => {
    tableStore().selectedRows = selection;
};

const handleReset = () => {
  if (formRef.value) {
    formRef.value.resetFields(); // 重置表单数据和验证状态
    ResetForm(currentInfo, originInfo); // 重置表单数据
  }
};

const id = ref()
const HandleEdit = (row: any) => {
    id.value = row.id
    currentInfo.content = row.content;
    currentInfo.date = row.date;
    addDialogVisible.value = true;
    originInfo.content = row.content;
    originInfo.date = row.date;
};


const handleSubmit = async () => {
    if (formRef.value) {
        addDialogVisible.value = await OnSubmit(formRef.value, currentInfo, originInfo, id.value);
    } else {
        console.error("Form reference is not available.");
    }
};

const updateRules = reactive<FormRules>({
    date: [
        { required: true, validator: ValidateDate(currentInfo), trigger: 'change' },
    ],
});

const HandleDelete = (id: number) => {
    axios.delete(`http://localhost:5172/api/Announces/${id}`).then(()=>{
        ElMessage.success('删除成功')
        tableStore().UpdateAnnounce()
    })
};

const handleDateChange = () => {
    console.log(currentInfo.date);
}
</script>
