<template>
    <el-button type="primary" plain :icon="CirclePlus" @click="AddAnnounce()">新增通知</el-button>
    <el-button type="danger" plain :icon="Delete" @click="tableStore().DeleteAnnounceSelectRows()">批量删除</el-button>

    <el-dialog v-model="addDialogVisible" align-center title="新增通知">
        <el-form label-width="auto" ref="formRef" :rules="addRules">
            <el-form-item label="通知内容：">
                <el-input type="textarea" v-model="newInfo.content"></el-input>
            </el-form-item>
            <el-form-item label="选择时间：" prop="date">
                <el-date-picker
                v-model="newInfo.date"
                type="date"
                placeholder="选择日期"
                size="default"
                value-format="YYYY-MM-DD"
            />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSubmit">提交</el-button>
                <el-button @click="ResetForm(newInfo)">重置</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue'
import {  CirclePlus, Delete, Plus  } from '@element-plus/icons-vue'
import type { UploadProps, FormRules, FormInstance } from 'element-plus'
import { ElMessage  } from 'element-plus'
import type { AnnounceInfo } from './Announce'
import { ValidateDate, ResetForm, OnSubmit } from './Announce'
import tableStore from '@/stores/table'

const addDialogVisible =  ref(false)
const formRef = ref<FormInstance>()
const newInfo = reactive<AnnounceInfo>({
    content: '',
    date: '',
})
const AddAnnounce = () => {
    addDialogVisible.value = true
}

const rules = reactive<FormRules>({
    date: [
        { required: true, validator: ValidateDate(newInfo), trigger: 'change' },
    ],
});

const handleSubmit = async () => {
    if (formRef.value) {
        addDialogVisible.value = await OnSubmit(formRef.value, newInfo);
    } else {
        console.error("Form reference is not available.");
    }
};

const addRules = reactive<FormRules>({
    date: [
        { required: true, validator: ValidateDate(newInfo), trigger: 'change' },
    ],
});

</script>