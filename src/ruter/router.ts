import {createRouter,createWebHistory} from 'vue-router'
import AdminInfo from '@/components/Admin/Admin_Info.vue'
import Home from '@/components/Home.vue'
import TeacherInfo from '@/components/Teacher/Teacher_Info.vue'
import StudentInfo from '@/components/Student/Student_Info.vue'
import Announce from '@/components/Announce/Announce.vue'

const router = createRouter({
    history:createWebHistory(),
    routes:[
        {
            path: '/',
            redirect: '/home',
        },
        {
            name:'首页',
            path:'/home',
            component: Home,
        },
        {
            name: '管理员信息',
            path: '/adminInfo',
            component: AdminInfo,
        },
        {
            name: '教师信息',
            path: '/teacherInfo',
            component: TeacherInfo,
        },
        {
            name: '教务通知',
            path: '/announce',
            component: Announce,
        },
        {
            name: '学生信息',
            path: '/studentInfo',
            component: StudentInfo,
        },
    ]
})
export default router