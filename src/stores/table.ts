import { defineStore } from "pinia";
import { ref} from "vue"
import axios from "axios"
import type { RuleForm } from "@/components/AdminManage_Button.vue";
import {ElMessage} from 'element-plus'

const tableStore = defineStore("table", () => {
    let adminInfo = ref()
    let selectedRows = ref([])
    let teacherInfo = ref()
    axios.get("http://localhost:5172/api/AdminInfo/GetAdminInfoWithAdminAvatars").then((response) => {
        adminInfo.value = response.data
    })

    axios.get("http://localhost:5172/api/Teachers/GetTeacherInfoWithTeacherAvatars").then((response) => {
        teacherInfo.value = response.data
    })

    const UpdateAdminInfo = () => {
        axios.get("http://localhost:5172/api/AdminInfo/GetAdminInfoWithAdminAvatars").then((response) => {
            adminInfo.value = response.data
        })
    }

    const UpdateTeacherInfo = () =>{
        axios.get("http://localhost:5172/api/Teachers/GetTeacherInfoWithTeacherAvatars").then((response) => {
            teacherInfo.value = response.data
        })
    }

    const SearchAdmin = async (mes: string) => {
        if (!mes.trim()) {
            return;
        }
        
        try {
            const response = await axios.get(`http://localhost:5172/api/AdminInfo/search?searchTerm=${mes}`);   
            adminInfo.value = response.data;
        } catch (error) {
            ElMessage.error("查询失败！");
        }
    }

    const SearchTeacher = async (mes: string) => {
        if (!mes.trim()) {
            return;
        }
        
        try {
            const response = await axios.get(`http://localhost:5172/api/Teachers/search?searchTerm=${mes}`);   
            teacherInfo.value = response.data;
        } catch (error) {
            ElMessage.error("查询失败！");
        }
    }

    const DeleteAdminSelectedRows = () => {
        for(const item of selectedRows.value){
            console.log(item);
            axios.delete(`http://localhost:5172/api/AdminInfo/${(item as RuleForm).id}`).then(() => {
                UpdateAdminInfo()
            })
        }
    }

    const DeleteTeacherSelectedRows = () => {
        for(const item of selectedRows.value){
            axios.delete(`http://localhost:5172/api/Teachers/${(item as RuleForm).id}`).then(() => {
                UpdateTeacherInfo()
            })
        }
    }
    
    return {
        adminInfo,
        teacherInfo,
        UpdateAdminInfo,
        selectedRows,
        DeleteAdminSelectedRows,
        DeleteTeacherSelectedRows,
        UpdateTeacherInfo,
        SearchAdmin,
        SearchTeacher
    }
})

export default tableStore