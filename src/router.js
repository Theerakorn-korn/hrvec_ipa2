import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            component: () =>
                import ('@/views/dashboard/Index'),
            children: [
                 // Dashboard
        {
            name: 'ข้อมูลทั่วไป',
            path: '',
            component: () => import('@/views/dashboard/Dashboard'),
          },      
               
                {
                    name: 'Login เข้าสู่ระบบ',
                    path: 'pages/login',
                    component: () =>
                        import ('@/views/dashboard/pages/login'),
                },
                {
                    name: 'ข่าวประชาสัมพันธ์ ข้อกำหนด เกณฑ์',
                    path: 'components/notifications',
                    component: () =>
                        import ('@/views/dashboard/component/Notifications'),
                },
                {
                    name: 'Icons',
                    path: 'components/icons',
                    component: () =>
                        import ('@/views/dashboard/component/Icons'),
                },
                {
                    name: 'Typography',
                    path: 'components/typography',
                    component: () =>
                        import ('@/views/dashboard/component/Typography'),
                },
                {
                    name: 'Google Maps',
                    path: 'maps/google-maps',
                    component: () =>
                        import ('@/views/dashboard/maps/GoogleMaps'),
                },
                {
                    name: 'Register',
                    path: 'Register',
                    component: () =>
                        import ('@/views/dashboard/Register'),
                },              
            ],
        },
        {
            path: "/admin",
            component: () =>
                import ('@/views/dashboard/admin'),
            children: [{
                    name: 'Dashboard',
                    path: '',
                    component: () =>
                        import ('@/views/dashboard/pages/administrator/Dashboard'),
                },
                {
                    name: 'Dashboard',
                    path: '/Dashboard',
                    component: () =>
                        import ('@/views/dashboard/pages/administrator/Dashboard'),
                },
                {
                    name: 'member',
                    path: '/member',
                    component: () =>
                        import ('@/views/dashboard/pages/administrator/member'),
                },
                {
                    name: 'add_member',
                    path: '/add_member',
                    component: () =>
                        import ('@/views/dashboard/pages/administrator/add_member'),
                },
                {
                    name: 'product',
                    path: '/product',
                    component: () =>
                        import ('@/views/dashboard/pages/administrator/product'),
                },
                {
                    name: 'test_member',
                    path: '/test_member',
                    component: () =>
                        import ('@/views/dashboard/pages/administrator/test_member'),
                },               
            ]
        },
        {
            path: "/user",
            component: () =>
                import ('@/views/dashboard/user'),
            children: [
                {
                    name: 'ข้อมูลผู้ใช้งานระบบ',
                    path: '',
                    component: () =>
                        import ('@/views/dashboard/pages/user/UserProfile'),
                },
                {
                    name: 'ข้อมูลผู้ใช้งานระบบ',
                    path: '/UserProfile',
                    component: () =>
                        import ('@/views/dashboard/pages/user/UserProfile'),
                },               
                {
                    name: 'ข้อมูลคุณวุฒิการศึกษา',
                    path: '/ducation_evel',
                    component: () =>
                        import ('@/views/dashboard/pages/user/ducation_evel'),
                },
            ]
        },
    ],
})