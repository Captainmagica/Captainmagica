<template>
    <el-button type="primary" plain :icon="CirclePlus" @click="addDialogVisible = true">新增数据</el-button>
    <el-button type="danger" plain :icon="Delete" @click="admin.DeleteAdminSelectedRows()">批量删除</el-button>

    <el-dialog id="dialog" v-model="addDialogVisible" align-center title="新增数据" style="min-width: 300px;" @closed="resetForm(ruleFormRef)">
        <el-form :model="newAdmin" label-width="auto" :rules="rules" ref="ruleFormRef" @keyup.enter="OnSubmit(ruleFormRef)">
            <el-form-item label="用户名：" prop="username">
                <el-input v-model="newAdmin.username" clearable/>
            </el-form-item>
            <el-form-item label="姓名：" prop="name">
                <el-input v-model="newAdmin.name" clearable/>
            </el-form-item>
            <el-form-item label="电话号码：" prop="phone_number">
                <el-input v-model="newAdmin.phone_number" clearable/>
            </el-form-item>
            <el-form-item label="头像：">
                <el-upload class="avatar-uploader" :limit="1" action="http://localhost:5172/api/AdminAvatars/upload" :show-file-list="false" :before-upload="beforeAvatarUpload " :on-error="handleAvatarError">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                </el-upload>
            </el-form-item>
            <el-form-item label="邮箱：" prop="email">
                <el-input v-model="newAdmin.email" clearable/>
            </el-form-item>
            <el-form-item>   
                <template #default>
                        <div style="display:flex; justify-content: center; align-items: center; width: 100%;">
                            <el-button type="primary" @click="OnSubmit(ruleFormRef)">提交</el-button>
                            <el-button @click="resetForm(ruleFormRef)">重置</el-button>
                        </div>
                </template>     
            </el-form-item>
        </el-form>
    </el-dialog>

</template>


<script setup lang="ts">
import {reactive, ref} from 'vue'
import {  CirclePlus, Delete, Plus  } from '@element-plus/icons-vue'
import type { UploadProps, FormRules, FormInstance } from 'element-plus'
import { ElMessage  } from 'element-plus'
import axios from 'axios'
import { useAdminStore } from '@/stores/AdminStore'

const buttonWidth = '150px'
const admin = useAdminStore()

export interface AdminRuleForm {
  id: number,
  username: string,
  name: string,
  phone_number: string,
  email: string
  role: string
}

const rules = reactive<FormRules<AdminRuleForm>>({
    username:[
        {required: true, message: '请输入用户名', trigger: 'blur'},
        { min: 3, max: 20, message: '长度在3到20之间', trigger: 'blur' }
    ],
    name:[
        {required: true, message: '请输入姓名', trigger: 'blur'},
        { min: 2, message: '请输入两个或以上字符', trigger: 'blur' }
    ],
})

let addDialogVisible = ref(false)
let newAdmin = reactive(<AdminRuleForm>({
    id: 0,
    username: '',
    name: '',
    phone_number: '',
    email: '',
    role: '管理员',
}))

const id = ref()

const imageUrl = ref('')
const handleAvatarError: UploadProps['onError'] = () =>{
    ElMessage.error("上传失败!")
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('头像文件大小必须小于2MB!')
    return false
  }
  const reader = new FileReader();  
  reader.onload = (e) => {
    // console.log((e.target as FileReader).result as string);
    imageUrl.value = (e.target as FileReader).result as string;
  };
  reader.readAsDataURL(rawFile);
  // 阻止文件上传
  return false;
}

const ruleFormRef = ref<FormInstance>()
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  imageUrl.value = ''
}

const OnSubmit = async (formEl: FormInstance | undefined) => {
    if (!imageUrl.value) {
    ElMessage.warning('请先上传头像');
    return;
  }

  if (!formEl) return
  try {
        await formEl.validate(); // 如果验证失败，会抛出错误
        // 验证成功后继续处理提交逻辑
        let adminData = {
            username: newAdmin.username,
            name: newAdmin.name,
            phone_number: newAdmin.phone_number,
            email: newAdmin.email,
            role: newAdmin.role
        };
        
        const response = await axios.post('http://localhost:5172/api/AdminInfo', adminData);
        id.value = response.data.id;

        const imgData = {
            id: id.value,
            image_data: imageUrl.value
        };

        Promise.all([
            await axios.post('http://localhost:5172/api/AdminAvatars/upload', imgData),
            admin.UpdateAdminInfo()
        ]);

        resetForm(ruleFormRef.value); // 清空表单
        addDialogVisible.value = false;
        ElMessage.success("添加成功！");
    } catch (error) {
        // 验证失败，或者网络请求失败
        ElMessage.error("添加失败！");
    }
}

</script>



