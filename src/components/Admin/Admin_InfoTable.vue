<template>
    <el-table :data="admin.adminInfo" :cell-style="{ textAlign: 'center'}" 
    :header-cell-style="{ 'text-align': 'center' }" @selection-change="handleSelectionChange">
        <el-table-column type="selection" :header-row-style="{ 'background-color': '#f8f8f8' }"></el-table-column>
        <el-table-column prop="id" label="序号" sortable ></el-table-column>
        <el-table-column prop="username" label="用户名" ></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column label="电话号码" width="130">
            <template v-slot="scope">
                {{ scope.row.phone_number ? scope.row.phone_number : '--' }}
            </template>
        </el-table-column>
        <el-table-column label="邮箱" width="180">
            <template v-slot="scope">
                {{ scope.row.email ? scope.row.email : '--' }}
            </template>
        </el-table-column>
        <el-table-column prop="image_data" label="头像">
            <template v-slot="scope" class="avatar-uploader">
                <div style="display: flex; justify-content: center; align-items: center;">
                    <img :src="scope.row.image_data" alt="加载失败" class="avatar avatar-uploader" />
                </div>
            </template>
        </el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column min-width="140px">
            <template v-slot="scope">
                <el-button type="primary" size="small" @click="HandleEdit(scope.row)">编辑</el-button>
                <el-button type="danger" size="small" @click="HandleDelete(scope.row.id)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-dialog v-model="editDialogVisible">
        <el-form :model="newAdmin" label-width="auto" :rules="rules" ref="ruleFormRef" @keyup.enter="OnSubmit(ruleFormRef)">
            <el-form-item label="用户名：" prop="username">
                <el-input v-model="newAdmin.username" clearable></el-input>
            </el-form-item>
            <el-form-item label="姓名：" prop="name">
                <el-input v-model="newAdmin.name" clearable/>
            </el-form-item>
            <el-form-item label="电话号码：" prop="phone_number">
                <el-input v-model="newAdmin.phone_number" clearable/>
            </el-form-item>
            <el-form-item label="头像：" prop="avatarUrl">
                <el-upload class="avatar-uploader" :limit="1" action="http://localhost:5172/api/AdminAvatars/upload" :show-file-list="false" :before-upload="BeforeAvatarUpload " :on-error="HandleAvatarError">
                    <img :src="newAdmin.avatarUrl" alt="加载失败" class="avatar avatar-uploader" />
                </el-upload>
            </el-form-item>
            <el-form-item label="邮箱：" prop="email">
                <el-input v-model="newAdmin.email" clearable/>
            </el-form-item>
            <el-form-item>   
                <template #default>
                        <div style="display:flex; justify-content: center; align-items: center; width: 100%;">
                            <el-button type="primary" @click="OnSubmit(ruleFormRef)">提交</el-button>
                            <el-button @click="HandleReset()">重置</el-button>
                        </div>
                </template>       
            </el-form-item>
        </el-form>
    </el-dialog>
</template>


<script lang="ts" setup>
import axios from 'axios'
import { ElMessage,ElTable} from 'element-plus';
import { reactive, watch } from 'vue';
import { ref } from 'vue';
import type { FormInstance, FormRules, UploadProps} from 'element-plus'
import { useAdminStore } from '@/stores/AdminStore';
import '@/assets/css/content.css'
import type { Admin } from '@/stores/AdminStore';

const editDialogVisible = ref(false)
const admin = useAdminStore()
let newAdmin = reactive<Admin>({
    id: '',
    username: '',
    name: '',
    phone_number: '',
    email: '',
    role: '管理员',
    avatarUrl:''
})

const originalAdmin = reactive<Admin>({
    id: '',
    username: '',
    name: '',
    phone_number: '',
    email: '',
    role: '管理员',
    avatarUrl:''
});

interface RuleForm {
  username: string,
  name: string,
  phone_number: string,
  email: string
}

const ruleFormRef = ref<FormInstance>()

const rules = reactive<FormRules<RuleForm>>({
    username:[
        {required: true, message: '请输入用户名', trigger: 'change'},
        { min: 3, max: 20, message: '长度在3到20之间', trigger: 'change' }
    ],
    name:[
        {required: true, message: '请输入姓名', trigger: 'change'},
        { min: 2, message: '请输入两个或以上字符', trigger: 'change' }
    ],
})

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
    newAdmin.avatarUrl = (e.target as FileReader).result as string;
  };
  reader.readAsDataURL(rawFile);
  // 阻止文件上传
  return false;
}

const HandleDelete = (id: number) => {
    axios.delete(`http://localhost:5172/api/AdminInfo/${id}`)
    .then(()=>{
        admin.UpdateAdminInfo(),
        ElMessage.success("删除成功！")
    })
    .catch(()=>{
        ElMessage.error("删除失败！")
    })
}



const HandleEdit = (row: any) => {
    newAdmin.username = row.username;
    newAdmin.name = row.name;
    newAdmin.phone_number = row.phone_number;
    newAdmin.email = row.email;
    newAdmin.id = row.id
    newAdmin.avatarUrl = row.image_data
    // 保存初始数据,以便重置按钮对原来数据进行恢复
    originalAdmin.id = row.id;
    originalAdmin.username = row.username;
    originalAdmin.name = row.name;
    originalAdmin.phone_number = row.phone_number;
    originalAdmin.email = row.email;
    originalAdmin.avatarUrl = row.image_data;
    
    editDialogVisible.value = true;
}

const OnSubmit = async(formEl: FormInstance | undefined) => {
    if (!newAdmin.avatarUrl) {
    ElMessage.warning('请先上传头像');
    return;
  }
  if (!formEl) return
  await formEl.validate();
  let adminData = {
        id: newAdmin.id,
        username: newAdmin.username,
        name: newAdmin.name,
        phone_number: newAdmin.phone_number,
        email: newAdmin.email,
        role: newAdmin.role
    };
    axios.put(`http://localhost:5172/api/AdminInfo/${adminData.id}`, adminData)
    .then(() => {
        const image = {
            id: adminData.id,
            image_data: newAdmin.avatarUrl
        }
        axios.put(`http://localhost:5172/api/AdminAvatars/${adminData.id}`, image)
        .then(() => {
            editDialogVisible.value = false;
            admin.UpdateAdminInfo()
            ElMessage.success("修改成功！");
            newAdmin.avatarUrl = ''
        })
        .catch(() => {
            ElMessage.error("修改失败！");
        });
    })
}

const handleSelectionChange = (selection: []) => {
    admin.selectedRows = selection
};

const HandleReset = () => {
    Object.assign(newAdmin, originalAdmin)
}
</script>