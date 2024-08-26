import { defineStore } from "pinia";
import { ref} from "vue"
import axios from "axios"
import type { RuleForm } from "@/components/Admin/AdminManage_Button.vue";
import {ElMessage} from 'element-plus'
import router from "@/ruter/router";
import { useRoute } from "vue-router";
import type { AnnounceInfo } from "@/components/Announce/Announce";

const tableStore = defineStore("table", () => {
    const adminInfo = ref()
    const selectedRows = ref([])
    const teacherInfo = ref()
    const studentInfo = ref()
    const announces = ref<AnnounceInfo[]>([])
    const route = useRoute()
    

    axios.get("http://localhost:5172/api/AdminInfo/GetAdminInfoWithAdminAvatars").then((response) => {
        adminInfo.value = response.data
    })

    axios.get("http://localhost:5172/api/Teachers/GetTeacherInfoWithTeacherAvatars").then((response) => {
        teacherInfo.value = response.data
    })

    axios.get("http://localhost:5172/api/Students/GetStudentsInfo").then((response) => {
        studentInfo.value = response.data
    })

    axios.get("http://localhost:5172/api/Announces").then((response) => {
         announces.value = response.data;
         for(let item of announces.value)
         {
            item.date = item.date.split('T')[0]
         }
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

    const UpdateStudentInfo = () => {
        axios.get("http://localhost:5172/api/Students/GetStudentsInfo").then((response) => {
            studentInfo.value = response.data
        })
    }

    const UpdateAnnounce = () => {
        axios.get("http://localhost:5172/api/Announces").then((response) => {
            announces.value = response.data
            for(let item of announces.value)
            {
                item.date = item.date.split('T')[0]
            }
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

    const SearchStudent = async (mes: string) => {
        if (!mes.trim()) {
            return;
        }
        
        try {
            const response = await axios.get(`http://localhost:5172/api/Students/search?searchTerm=${mes}`);   
            studentInfo.value = response.data;
        } catch (error) {
            ElMessage.error("查询失败！");
        }
    }

    const SearchAnnounce = async (mes: string) => {
        UpdateAdminInfo()
        axios.get(`http://localhost:5172/api/Announces/search?searchTerm=${mes}`).then((response) => {
            announces.value = response.data
            for(let item of announces.value)
            {
                    item.date = item.date.split('T')[0]
            }
        })
        
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

    const DeleteStudentSelectedRows = () => {
        for(const item of selectedRows.value){
            axios.delete(`http://localhost:5172/api/Students/${(item as RuleForm).id}`).then(() => {
                UpdateStudentInfo()
            })
        }
    }

    const DeleteAnnounceSelectRows = () => {
        for(const item of selectedRows.value){
            console.log(item);
            axios.delete(`http://localhost:5172/api/Announces/${(item as RuleForm).id}`).then(() => {
                UpdateAnnounce()
            })
        }
    }
    
    return {
        adminInfo,
        teacherInfo,
        studentInfo,
        selectedRows,
        announces,
        UpdateAdminInfo,
        DeleteAdminSelectedRows,
        DeleteTeacherSelectedRows,
        UpdateTeacherInfo,
        SearchAdmin,
        SearchTeacher,
        UpdateStudentInfo,
        DeleteStudentSelectedRows,
        SearchStudent,
        SearchAnnounce,
        UpdateAnnounce,
        DeleteAnnounceSelectRows
    }
})

export default tableStore