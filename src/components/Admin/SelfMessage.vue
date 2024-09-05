<template>
    <el-card style="height: 99%; width: 99%;" body-style="height: 100%; width: 100%; padding: 0%;">
        <div style="display: flex; justify-content: center; align-items: end; height: 30%;">
            <el-upload :limit="1" action="http://localhost:5172/api/AdminAvatars/upload" :show-file-list="false" :before-upload="BeforeAvatarUpload" :on-error="HandleAvatarError">
                    <img :src="image_url" alt="加载失败" class="imgFigure-large" />
                </el-upload>
        </div>
        <div style="display: flex; justify-content: center; align-items: start; height:70%; padding: 20px;">
            <el-form style="font-weight: 700;" label-width="auto" v-model="login.user">
                <el-form-item label="用户名" >
                    <el-input disabled="true" v-model="login.user.username"></el-input>
                </el-form-item>
                <el-form-item label="姓名" >
                    <el-input v-model="login.user.name"></el-input>
                </el-form-item>
                <el-form-item label="电话" >
                    <el-input v-model="login.user.phone_number"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" >
                    <el-input v-model="login.user.email"></el-input>
                </el-form-item>
                <el-from-item>
                    <template #default>
                        <div style="display:flex; justify-content: center; align-items: center;">
                            <el-button type="primary" @click="OnSubmit">提交</el-button>
                        </div>
                    </template>
                </el-from-item>
            </el-form>
        </div>
    </el-card>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue'
import { useAdminStore, type Admin } from '@/stores/AdminStore';
import { ElMessage, type UploadProps } from 'element-plus';
import { useLoginStore } from '@/stores/Login';
import axios from 'axios';
const admin = useAdminStore()

const login = useLoginStore()
const image_url = ref(login.image_data)
const HandleAvatarError: UploadProps['onError'] = () =>{
    ElMessage.error("上传失败!")
}

const BeforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.size / 1024 / 1024 / 1024 > 500) {
    ElMessage.error('头像文件大小必须小于500KB!')
    return false
  }
  const reader = new FileReader();  
  reader.onload = (e) => {
    image_url.value = (e.target as FileReader).result as string;
  };
  reader.readAsDataURL(rawFile);
  // 阻止文件上传
  return false;
}

const OnSubmit = ()=>{
    const submitAdmin = {
        id: login.user.id,
        username: login.user.username,
        phone_number: login.user.phone_number,
        email: login.user.email
    }
    const submitAvatar = {
        id: login.user.id,
        image_data: image_url.value
    }
    console.log(submitAvatar);
    axios.put(`http://localhost:5172/api/AdminInfo/${submitAdmin.id}`, login.user).then(()=>{
        if(submitAvatar.image_data != ''){
            axios.put(`http://localhost:5172/api/AdminAvatars/${submitAdmin.id}`, submitAvatar).then(()=>{
                ElMessage.success("更新成功！")
                login.image_data = image_url.value
                admin.UpdateAdminInfo()
            })
        }
    })
    .catch(()=>{
        ElMessage.error("更新失败！")
    })
}

</script>
