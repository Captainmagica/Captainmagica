<template>
    <el-card style="display: flex; width: 99%; height: 99%;" body-style="height: 100%; width: 100%; padding: 0%;">
        <div class="flex-div">
            <el-form :model="login.user" label-width="auto" :rules="rules">
                <el-form-item label="原始密码：" prop="password">
                    <el-input v-model="login.user.password" type="password"> </el-input>
                </el-form-item>
                <el-form-item label="新密码：" prop="newPassword">
                    <el-input v-model="newPassword" type="password"></el-input>
                </el-form-item>
                <el-form-item label="确认新密码：" prop="SnewPassword">
                    <el-input v-model="newPassword" type="password"></el-input>
                </el-form-item>
            </el-form>
        </div>
    </el-card>
</template>

<script lang="ts" setup>
import { useLoginStore } from '@/stores/Login';
import { ref } from 'vue';

const login = useLoginStore()
const newPassword = ref('')

const rules = {
    password:[
        {required: true}
    ],
    newPassword:[
        {required: true}
    ],
    SnewPassword:[
        {required: true}
    ]
}
</script>