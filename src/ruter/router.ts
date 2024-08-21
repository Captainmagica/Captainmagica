import {createRouter,createWebHistory} from 'vue-router'
import AdminInfo from '@/components/Admin_Info.vue'
import Home from '@/components/Home.vue'
import TeacherInfo from '@/components/Teacher_Info.vue'
const router = createRouter({
    history:createWebHistory(),
    routes:[
        {
            name:'首页',
            path:'/',
            component:Home,
            children:[
                {
                    name: '管理员信息',
                    path: 'adminInfo',
                    component: AdminInfo
                },
                {
                    name: '教师信息',
                    path: 'teacherInfo',
                    component: TeacherInfo
                }
            ]
        },
    ]
})
export default router