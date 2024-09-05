<template>
    <el-table :data="student.studentInfo" :cell-style="{ textAlign: 'center'}" 
    :header-cell-style="{ 'text-align': 'center' }" @selection-change="handleSelectionChange">
        <el-table-column type="selection" :header-row-style="{ 'background-color': '#f8f8f8' }"></el-table-column>
        <el-table-column prop="id" label="序号" sortable ></el-table-column>
        <el-table-column prop="imageData" label="头像">
            <template v-slot="scope" class="avatar-uploader">
                <div style="display: flex; justify-content: center; align-items: center;">
                    <img :src="scope.row.image_data" alt="加载失败" class="avatar avatar-uploader" />
                </div>
            </template>
        </el-table-column>
        <el-table-column prop="username" label="用户名" ></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column prop="college_name" label="学院"></el-table-column>
        <el-table-column prop="speciality_name" label="专业"></el-table-column>
        <el-table-column prop="class_name" label="班级"></el-table-column>
        <el-table-column prop="score" label="总学分"></el-table-column>
        <el-table-column min-width="140px">
            <template v-slot="scope">
                <el-button type="primary" size="small" @click="HandleEdit(scope.row)">编辑</el-button>
                <el-button type="danger" size="small" @click="HandleDelete(scope.row.id)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-dialog v-model="editDialogVisible">
        <el-form :model="newStudent" label-width="auto" :rules="rules" ref="ruleFormRef" @keyup.enter="OnSubmit(ruleFormRef)">
            <el-form-item label="用户名：" prop="username">
                <el-input v-model="newStudent.username" clearable></el-input>
            </el-form-item>
            <el-form-item label="姓名：" prop="name">
                <el-input v-model="newStudent.name" clearable/>
            </el-form-item>
            <el-form-item label="头像：" prop="avatarUrl">
                <el-upload class="avatar-uploader" :limit="1" action="http://localhost:5172/api/StudentAvatars" :show-file-list="false" :before-upload="BeforeAvatarUpload " :on-error="HandleAvatarError">
                    <img :src="newStudent.avatarUrl" alt="加载失败" class="avatar avatar-uploader" />
                </el-upload>
            </el-form-item>
            <el-form-item label="学院：" prop="college_name">
                <el-select v-model="selectedCollege">
                    <el-option v-for="item in colleges" :key="item.college_id" :label="item.college_name" :value="item.college_name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="专业：" prop="speciality_name">
                <el-select v-model="selectedSpeciality">
                    <el-option v-for="item in specialities" :key="item.speciality_id" :label="item.speciality_name" :value="item.speciality_name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="班级：" prop="class_name">
                <el-select v-model="selectedClass">
                    <el-option v-for="item in classes" :key="item.class_id" :label="item.class_name" :value="item.class_name"></el-option>
                </el-select>
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
import { Plus } from '@element-plus/icons-vue';
import { reactive, watch } from 'vue';
import { ref } from 'vue';
import type { FormRules, UploadProps, FormInstance} from 'element-plus'
import { useStudentStore } from '@/stores/StudentStore';
import '@/assets/css/content.css'

const student = useStudentStore()
const editDialogVisible = ref(false)
let selectedCollege = ref()
let selectedSpeciality = ref()
let selectedClass = ref()
let newStudent = reactive({
    id: '',
    username: '',
    name: '',
    role: '学生',
    college_name: '',
    speciality_name: '',
    class_name: '',
    avatarUrl:''
})

const originalStudent = reactive({
    id: '',
    username: '',
    name: '',
    college_name: '',
    speciality_name: '',
    class_name: '',
    avatarUrl:''
});

interface RuleForm {
  username: string,
  name: string,
}

export interface College{
    college_id: number,
    college_name: string
}

export interface Specialities{
    speciality_id: number,
    speciality_name: string
}

export interface Class{
    class_id: number,
    class_name: string
}
const colleges = ref<College[]>([])
const specialities = ref<Specialities[]>([])
const classes = ref<Class[]>([])

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
    newStudent.avatarUrl = (e.target as FileReader).result as string;
  };
  reader.readAsDataURL(rawFile);
  // 阻止文件上传
  return false;
}

const HandleDelete = (id: number) => {
    axios.delete(`http://localhost:5172/api/Students/${id}`)
    .then(()=>{
        Promise.all([
            student.UpdateStudentInfo(),
            ElMessage.success("删除成功！")
        ])
    })
    .catch(()=>{
        ElMessage.error("删除失败！")
    })
}



const HandleEdit = (row: any) => {
    newStudent.username = row.username;
    newStudent.name = row.name;
    newStudent.id = row.id
    newStudent.avatarUrl = row.image_data
    newStudent.class_name = row.class_name
    newStudent.speciality_name = row.speciality_name
    newStudent.college_name = row.college_name
    // 保存初始数据,以便重置按钮对原来数据进行恢复
    originalStudent.id = row.id;
    originalStudent.username = row.username;
    originalStudent.name = row.name;
    originalStudent.class_name = row.class_name
    originalStudent.speciality_name = row.speciality_name
    originalStudent.college_name = row.college_name
    originalStudent.avatarUrl = row.image_data
    editDialogVisible.value = true;
    //获取学院专业班级数据
    axios.get("http://localhost:5172/api/Colleges")
    .then((response)=>{
        colleges.value = response.data
        selectedCollege.value = row.college_name
    })
    .catch(() =>{
        console.log("学院数据获取失败");
    })
    axios.get("http://localhost:5172/api/Specialities")
    .then((response)=>{
        specialities.value = response.data
        selectedSpeciality.value = row.speciality_name
    })
    .catch(() =>{
        console.log("专业数据获取失败");
    })
    axios.get("http://localhost:5172/api/Classes")
    .then((response)=>{
        classes.value = response.data
        selectedClass.value = row.class_name
    })
    .catch(() =>{
        console.log("班级数据获取失败");
    })
}

const OnSubmit = async(formEl: FormInstance | undefined) => {
    if (!newStudent.avatarUrl) {
    ElMessage.warning('请先上传头像');
    return;
  }
  if (!formEl) return
  await formEl.validate()
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
  
  let StudentData = {
        id: newStudent.id,
        username: newStudent.username,
        name: newStudent.name,
        class_id: submitClassId.value,
        speciality_id: submitSpecialityId.value,
        college_id: submitCollegeId.value,
     }

    axios.put(`http://localhost:5172/api/Students/${StudentData.id}`, StudentData)
    .then(() => {
        const image = {
            id: StudentData.id,
            image_data: newStudent.avatarUrl
        }

        axios.put(`http://localhost:5172/api/StudentAvatars/${StudentData.id}`, image)
        .then(async() => {
            editDialogVisible.value = false;
            await Promise.all([
                student.UpdateStudentInfo(),
                ElMessage.success("修改成功！")
            ])
            newStudent.avatarUrl = ''
        })
        .catch(() => {
            ElMessage.error("修改失败！");
        });
    })
    .catch(() => {
            ElMessage.error("修改失败！");
    });
}

const handleSelectionChange = (selection: []) => {
    student.selectedRows = selection
};

const HandleReset = () => {
    newStudent.id = originalStudent.id;
    newStudent.username = originalStudent.username;
    newStudent.name = originalStudent.name;
    newStudent.avatarUrl = originalStudent.avatarUrl;
    selectedClass.value = originalStudent.class_name
    selectedCollege.value = originalStudent.college_name
    selectedSpeciality.value = originalStudent.speciality_name
}


</script>