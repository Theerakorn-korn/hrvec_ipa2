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
                    name: 'เข้าสู่ระบบสำหรับ วิทยาลัย อศจ. สถาบัน กจ2',
                    path: 'pages/loginAdmin',
                    component: () =>
                        import ('@/views/dashboard/pages/loginAdmin'),
                },              
            ],
        },
        {
            path: "/admin",
            component: () =>
                import ('@/views/dashboard/admin'),
            children: [{
                    name: 'รายงาน',
                    path: '',
                    component: () =>
                        import ('@/views/dashboard/pages/administrator/Dashboard'),
                },
                {
                    name: 'รายงาน',
                    path: '/admin/Dashboard',
                    component: () =>
                        import ('@/views/dashboard/pages/administrator/Dashboard'),
                },
                {
                    name: 'ข้อมูลเกี่ยวกับบุคคล',
                    path: '/admin/personnel',
                    component: () =>
                        import ('@/views/dashboard/pages/administrator/personnel'),
                },
                {
                    name: 'ข้อมูลคุณวุฒิการศึกษา',
                    path: '/admin/personnel_education',
                    component: () =>
                        import ('@/views/dashboard/pages/administrator/personnel_education'),
                },
                {
                    name: 'ข้อมูลประสบการณ์',
                    path: '/admin/personnel_experience',
                    component: () =>
                        import ('@/views/dashboard/pages/administrator/personnel_experience'),
                },
                {
                    name: 'ข้อมูลประวัติการทำงาน',
                    path: '/admin/personnel_work_history',
                    component: () =>
                        import ('@/views/dashboard/pages/administrator/personnel_work_history'),
                },
                {
                    name: 'ข้อมูลผลงาน รางวัล',
                    path: '/admin/personnel_award',
                    component: () =>
                        import ('@/views/dashboard/pages/administrator/personnel_award'),
                },
                {
                    name: 'ข้อมูลโทษ วินัย',
                    path: '/admin/personnel_discipline',
                    component: () =>
                        import ('@/views/dashboard/pages/administrator/personnel_discipline'),
                },
                {
                    name: 'กลุ่มผู้ใช้งานระบบ',
                    path: '/admin/user',
                    component: () =>
                        import ('@/views/dashboard/pages/administrator/user'),
                },
                {
                    name: 'สถานะผู้ใช้งานระบบ',
                    path: '/admin/user_status',
                    component: () =>
                        import ('@/views/dashboard/pages/administrator/user_status'),
                },
                {
                    name: 'ข้อมูลประเภทสถานศึกษา',
                    path: '/admin/collegetype',
                    component: () =>
                        import ('@/views/dashboard/pages/administrator/collegetype'),
                },
                {
                    name: 'ข้อมูลรอบปี',
                    path: '/admin/period',
                    component: () =>
                        import ('@/views/dashboard/pages/administrator/period'),
                },
                {
                    name: 'ข้อมูลบุคคลใช้งานระบบ',
                    path: '/admin/personnel',
                    component: () =>
                        import ('@/views/dashboard/pages/administrator/personnel'),
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
                    path: '/education',
                    component: () =>
                        import ('@/views/dashboard/pages/user/education'),
                },
                {
                    name: 'ข้อมูลประสบการณ์',
                    path: '/experience',
                    component: () =>
                        import ('@/views/dashboard/pages/user/experience'),
                }, 
                {
                    name: 'ข้อมูลประวัติการทำงาน',
                    path: '/workhistory',
                    component: () =>
                        import ('@/views/dashboard/pages/user/workhistory'),
                }, 
                {
                    name: 'ข้อมูลผลงาน รางวัล',
                    path: '/award',
                    component: () =>
                        import ('@/views/dashboard/pages/user/award'),
                },  
                {
                    name: 'ข้อมูลวินัย โทษ',
                    path: '/discipline',
                    component: () =>
                        import ('@/views/dashboard/pages/user/discipline'),
                },  
                {
                    name: 'การย้ายสายการสอน',
                    path: '/transference_personnel',
                    component: () =>
                        import ('@/views/dashboard/pages/user/transference_personnel'),
                },                 
            ]
        },
    ],
})