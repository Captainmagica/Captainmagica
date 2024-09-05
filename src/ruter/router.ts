import Notice from '@/components/Notice/Notice.vue';
import TestArrangement from '@/components/TestArrangement/TestArrangement.vue';
import { useLoginStore } from '@/stores/Login';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/login',
        },
        {
            path: '/login',
            component: () => import('@/components/Login.vue')
        },
        {
            path: '/home',
            name: '首页',
            component: () => import('@/components/Home.vue'),
        },
        {
            name: '管理员信息',
            path: '/adminInfo',
            component: () => import('@/components/Admin/Admin_Info.vue'),
        },
        {
            name: '教师信息',
            path: '/teacherInfo',
            component: () => import('@/components/Teacher/Teacher_Info.vue'),
        },
        {
            name: '教务通知',
            path: '/notice',
            component: Notice
        },
        {
            name: '学生信息',
            path: '/studentInfo',
            component: () => import('@/components/Student/Student_Info.vue'),
        },
        {
            name: '个人信息',
            path: '/adminSelfMes',
            component: () => import('@/components/Admin/SelfMessage.vue'),
        },
        {
            name: '修改密码',
            path: '/changePassword',
            component: () => import('@/components/ChangePassword.vue')
        },
        {
            name: '考试安排',
            path: '/testArrange',
            component: TestArrangement
        }
    ]
});

router.beforeEach((to, from, next) => {
    const login = useLoginStore();
    if (to.path !== '/login' && !login.isLoggedIn) {
      next('/login');
    } else {
      next();
    }
  });
export default router;
