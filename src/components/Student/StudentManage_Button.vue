<template>
    <el-button type="primary" plain :icon="CirclePlus" @click="AddStudent()">新增数据</el-button>
    <el-button type="danger" plain :icon="Delete" @click="tableStore().DeleteStudentSelectedRows()">批量删除</el-button>

    <el-dialog id="dialog" v-model="addDialogVisible" align-center title="新增数据" style="min-width: 300px;" @closed="resetForm(ruleFormRef)">
        <el-form :model="newStudent" label-width="auto" :rules="rules" ref="ruleFormRef" @keyup.enter="OnSubmit(ruleFormRef)">
            <el-form-item label="用户名：" prop="username">
                <el-input v-model="newStudent.username" clearable></el-input>
            </el-form-item>
            <el-form-item label="姓名：" prop="name">
                <el-input v-model="newStudent.name" clearable/>
            </el-form-item>
            <el-form-item label="头像：" prop="avatarUrl">
                <el-upload class="avatar-uploader" :limit="1" action="http://localhost:5172/api/StudentAvatars/upload" :show-file-list="false" :before-upload="beforeAvatarUpload " :on-error="handleAvatarError">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                </el-upload>
            </el-form-item>
            <el-form-item label="学院：" prop="college_name">
                <el-select v-model="selectedCollege" placeholder="请选择学院">
                    <el-option v-for="item in colleges" :key="item.college_id" :label="item.college_name" :value="item.college_name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="专业：" prop="speciality_name">
                <el-select v-model="selectedSpeciality" placeholder="请选择专业">
                    <el-option v-for="item in specialities" :key="item.speciality_id" :label="item.speciality_name" :value="item.speciality_name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="班级：" prop="class_name">
                <el-select v-model="selectedClass" placeholder="请选择班级">
                    <el-option v-for="item in classes" :key="item.class_id" :label="item.class_name" :value="item.class_name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>   
                <el-button type="primary" @click="OnSubmit(ruleFormRef)">提交</el-button>
                <el-button @click="resetForm(ruleFormRef)">重置</el-button>
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
import tableStore from '@/stores/table'
import type {College, Class, Specialities} from '@/components/Student/Student_InfoTable.vue'
const buttonWidth = '150px'


export interface RuleForm {
  id: number,
  username: string,
  name: string,
  role: string,
  score: number,
  college_id: string,
  speciality_id: string,
  class_id: string,
  avatarUrl: string
}

const rules = reactive<FormRules<RuleForm>>({
    username:[
        {required: true, message: '请输入用户名', trigger: 'blur'},
        { min: 3, max: 20, message: '长度在3到12之间', trigger: 'blur' }
    ],
    name:[
        {required: true, message: '请输入姓名', trigger: 'blur'},
        { min: 2, message: '请输入两个或以上字符', trigger: 'blur' }
    ],
})

let addDialogVisible = ref(false)
let newStudent = reactive(<RuleForm>({
    id: 0,
    username: '',
    name: '',
    role: '学生',
    college_id: '',
    speciality_id: '',
    class_id: '',
    score: 0,
    avatarUrl:''
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

const AddStudent = () => {
    addDialogVisible.value = true
    Promise.all([
        axios.get("http://localhost:5172/api/Colleges")
        .then((response)=>{
            colleges.value = response.data
        })
        .catch(() =>{
            console.log("学院数据获取失败");
        }),
        axios.get("http://localhost:5172/api/Specialities")
        .then((response)=>{
            specialities.value = response.data
        })
        .catch(() =>{
        console.log("专业数据获取失败");
        }),
        axios.get("http://localhost:5172/api/Classes")
        .then((response)=>{
            classes.value = response.data
        })
        .catch(() =>{
            console.log("班级数据获取失败");
        })
    ])
}
    
const colleges = ref<College[]>([])
const specialities = ref<Specialities[]>([])
const classes = ref<Class[]>([])
let selectedCollege = ref()
let selectedSpeciality = ref()
let selectedClass = ref()


const OnSubmit = async (formEl: FormInstance | undefined) => {
    if (!imageUrl.value) {
    ElMessage.warning('请先上传头像');
    return;
  }

  if (!formEl) return
  try {
        await formEl.validate(); // 如果验证失败，会抛出错误

        
        let submitClassId = ref()
        let submitSpecialityId = ref()
        let submitCollegeId = ref()
        await Promise.all([
        axios.get(`http://localhost:5172/api/Classes/classname/${selectedClass.value}`).then((response)=>{
            submitClassId.value = response.data.class_id
        }),
        axios.get(`http://localhost:5172/api/Colleges/collegename/${selectedCollege.value}`).then((response)=>{
            submitCollegeId.value = response.data.college_id
        }),
        axios.get(`http://localhost:5172/api/Specialities/specialityname/${selectedSpeciality.value}`).then((response)=>{
            submitSpecialityId.value = response.data.speciality_id
        })
        ])
        // 验证成功后继续处理提交逻辑
        let StudentData = {
            username: newStudent.username,
            name: newStudent.name,
            role: newStudent.role,
            class_id: submitClassId.value,
            speciality_id: submitSpecialityId.value,
            college_id: submitCollegeId.value,
        };
        console.log(StudentData);
        const response = await axios.post('http://localhost:5172/api/Students', StudentData);
        id.value = response.data.id;

        const imgData = {
            id: id.value,
            image_data: imageUrl.value
        };

        Promise.all([
            await axios.post('http://localhost:5172/api/StudentAvatars/upload', imgData),
            tableStore().UpdateStudentInfo()
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



