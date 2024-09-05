<template>
    <div class="login">
        <div class="loginDiv">
            <div style="text-align: center; font-size: 20px; margin-bottom: 20px; color: rgb(51, 51, 51);">
                欢迎登录教务管理系统
            </div>
            <el-form label-width="auto" ref="loginFormRef" :rules="rules" :model="user" @keyup.enter="OnSubmit">
                <el-form-item prop="username">
                    <el-input v-model="user.username" :prefix-icon="User" placeholder="请输入账号" clearable></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="user.password" type="password" show-password :prefix-icon="Lock" placeholder="请输入密码" clearable></el-input>
                </el-form-item>
                <el-form-item prop="role">
                    <el-select v-model="user.role" placeholder="请选择身份">
                        <el-option value="管理员">管理员</el-option>
                        <el-option value="教师">教师</el-option>
                        <el-option value="学生">学生</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item >
                    <div style="width: 100%;; display: flex; justify-content: center;">
                        <el-button type="primary" style="width: 100%;" @click="OnSubmit">提交</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Lock, User } from '@element-plus/icons-vue';
import { type FormRules, type FormInstance, ElMessage } from 'element-plus';
import {  reactive, ref } from 'vue';
import { useLoginStore } from '@/stores/Login';
import axios from 'axios';
import router from '@/ruter/router';
const loginFormRef = ref<FormInstance>()

const user = reactive({
    username: '',
    password: '',
    role: ''
})
const login = useLoginStore()
const rules = reactive<FormRules>({
    username:[
        {required: true, message:'请输入账号', trigger:'change'}
    ],
    password:[
        {required: true, message:'请输入密码', trigger:'change'}
    ]
})

const OnSubmit = ()=>{
    loginFormRef.value?.validate((valid) => {
        if(valid){
            axios.post('http://localhost:5172/api/Login', user).then(async() => {
                // 获取当前用户信息
                await axios.get(`http://localhost:5172/api/AdminInfo/getByUsername/${user.username}`).then((response)=>{
                    login.user = response.data[0]
                    login.image_data = response.data[0].image_data
                    console.log(login.user);
                })
                ElMessage.success("登录成功！")
                login.setLoggedIn(true)
                //使用浏览器的本地存储保存登录状态
                localStorage.setItem('isLoggedIn', 'true')
                localStorage.setItem('user', JSON.stringify(login.user))
                localStorage.setItem('image_data', JSON.stringify(login.image_data))
                
                //历史记录栈中添加一个记录后再次添加一个完全相同的路由时不会刷新页面
                //故使用时间戳作为参数使得登录后页面可以刷新
                const timestamp = new Date().getTime()
                router.replace({path: '/home', query: { timestamp }})
                Object.assign(login.user, user)
                //清空登录表单信息
                loginFormRef.value?.resetFields()
            })
            .catch(()=>{
                ElMessage.error("登录失败，请检查用户名或密码及身份是否正确！")
            })
        }
    })
}

</script>