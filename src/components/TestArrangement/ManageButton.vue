<template>
    <el-button type="primary" plain :icon="CirclePlus" @click="AddTest()">新增考试</el-button>
    <el-button type="danger" plain :icon="Delete" @click="test.DeleteTestArrangementSelectRows()">批量删除</el-button>

    <el-dialog v-model="addDialogVisible" align-center title="新增考试">
        <el-form label-width="auto" ref="formRef" :rules="addRules" :model="newInfo">
            <el-form-item label="标题：">
                <el-input type="textarea" v-model="newInfo.content"></el-input>
            </el-form-item>
            <el-form-item label="内容：" prop="date">
                <el-date-picker
                v-model="newInfo.date"
                type="date"
                placeholder="选择日期"
                size="default"
                value-format="YYYY-MM-DD"
            />
            </el-form-item>
            <el-form-item>
                <template #default>
                        <div style="display:flex; justify-content: center; align-items: center; width: 100%;">
                            <el-button type="primary" @click="handleSubmit">提交</el-button>
                            <el-button @click="HandleReset">重置</el-button>
                        </div>
                </template>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue'
import {  CirclePlus, Delete, Plus  } from '@element-plus/icons-vue'
import type { UploadProps, FormRules, FormInstance } from 'element-plus'
import { ElMessage  } from 'element-plus'
import type { NoticeInfo } from '@/stores/NoticeStore'
import { useTestArrangementStore, type TestInfo } from '@/stores/TestArrangementStore'

const test = useTestArrangementStore()
const addDialogVisible =  ref(false)
const formRef = ref<FormInstance>()
const newInfo = reactive<TestInfo>({
    content: '',
    date: '',
})
const AddTest = () => {
    addDialogVisible.value = true
}

const rules = reactive<FormRules>({
    date: [
        { required: true, validator: test.ValidateDate(newInfo), trigger: 'change' },
    ],
});

const handleSubmit = async () => {
    if (formRef.value) {
        formRef.value.validate(async (valid) => {
            if (valid) {
                addDialogVisible.value = await test.OnSubmit(newInfo);
            } else {
                console.error("Form validation failed.");
            }
        });
    }
};

const addRules = reactive<FormRules>({
    date: [
        { required: true, validator: test.ValidateDate(newInfo), trigger: 'change' },
    ],
});

const HandleReset = () => {
    formRef.value?.resetFields()
    test.ResetForm(newInfo)
}
</script>