<template>
    <el-table :data="notice.notices" :cell-style="{ textAlign: 'center'}" 
    :header-cell-style="{ 'text-align': 'center' }" @selection-change="handleSelectionChange" :default-sort="{prop: 'date', order: 'ascending'}">
        <el-table-column type="selection" :header-row-style="{ 'background-color': '#f8f8f8' }"></el-table-column>
        <el-table-column prop="id" label="序号" sortable ></el-table-column>
        <el-table-column prop="content" label="内容"></el-table-column>
        <el-table-column prop="date" label="日期" sortable></el-table-column>
        <el-table-column min-width="140px">
            <template v-slot="scope">
                <el-button type="primary" size="small" @click="HandleEdit(scope.row)">编辑</el-button>
                <el-button type="danger" size="small" @click="HandleDelete(scope.row.id)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-dialog v-model="addDialogVisible" align-center>
        <el-form label-width="auto" :rules="updateRules" ref="formRef" :model="currentInfo">
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
                <template #default>
                        <div style="display:flex; justify-content: center; align-items: center; width: 100%;">
                            <el-button type="primary" @click="handleSubmit">提交</el-button>
                            <el-button @click="handleReset">重置</el-button>
                        </div>
                </template>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts" setup>
import { useNoticeStore } from '@/stores/NoticeStore';
import { type FormRules, type FormInstance, ElMessage } from 'element-plus';
import {reactive, ref} from 'vue';
import type { NoticeInfo } from '@/stores/NoticeStore';
import axios from 'axios';

const notice = useNoticeStore()

let addDialogVisible = ref(false);
const currentInfo = reactive<NoticeInfo>({
    content: '',
    date: '',
})
const originInfo = reactive<NoticeInfo>({
    content: '',
    date: '',
})

let formRef = ref<FormInstance>();


const handleSelectionChange = (selection: []) => {
    notice.selectedRows = selection;
};

const handleReset = () => {
  if (formRef.value) {
    formRef.value.resetFields('date'); // 重置表单数据和验证状态
    notice.ResetForm(currentInfo, originInfo); // 重置表单数据
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
        formRef.value.validate(async (valid) => {
            if (valid) {
                addDialogVisible.value = await notice.OnSubmit(formRef, currentInfo, originInfo, id.value);
            } else {
                console.error("Form validation failed.");
            }
        });
    }
};

const updateRules = reactive<FormRules>({
    date: [
        { required: true, validator: notice.ValidateDate(currentInfo), trigger: 'change' },
    ],
});

const HandleDelete = (id: number) => {
    axios.delete(`http://localhost:5172/api/Notices/${id}`).then(()=>{
        ElMessage.success('删除成功')
        notice.UpdateNotice()
    })
};

const handleDateChange = () => {
    console.log(currentInfo.date);
}
</script>
