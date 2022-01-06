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
                    name: 'เมนูรายการ',
                    path: '/admin/home_menu',
                    component: () =>
                        import ('@/views/dashboard/pages/administrator/home_menu'),
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
                {
                    name: 'ข้อมูลข้าราชการครูและบุคลการทางการศึกษา',
                    path: '/admin/personnel_tem',
                    component: () =>
                        import ('@/views/dashboard/pages/administrator/personnel_temporary'),
                },
                {
                    name: 'สาขาวิชา',
                    path: '/admin/branch',
                    component: () =>
                        import ('@/views/dashboard/pages/administrator/branch'),
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
                    path: '/personnel_education',
                    component: () =>
                        import ('@/views/dashboard/pages/user/personnel_education'),
                },
                {
                    name: 'ข้อมูลประสบการณ์',
                    path: '/personnel_experience',
                    component: () =>
                        import ('@/views/dashboard/pages/user/personnel_experience'),
                }, 
                {
                    name: 'ข้อมูลประวัติการทำงาน',
                    path: '/personnel_work_history',
                    component: () =>
                        import ('@/views/dashboard/pages/user/personnel_work_history'),
                }, 
                {
                    name: 'ข้อมูลผลงาน รางวัล',
                    path: '/personnel_award',
                    component: () =>
                        import ('@/views/dashboard/pages/user/personnel_award'),
                },  
                {
                    name: 'ข้อมูลวินัย โทษ',
                    path: '/personnel_discipline',
                    component: () =>
                        import ('@/views/dashboard/pages/user/personnel_discipline'),
                },  
                {
                    name: 'การย้ายสายการสอน',
                    path: '/transference_personnel',
                    component: () =>
                        import ('@/views/dashboard/pages/user/transference_personnel'),
                }, 
            ] 
        },
        {
            name: 'พิมพ์แบบแสดงความประสงค์ขอย้าย',
            path: '/user/print_info/:id_ref',
            component: () =>
            import ('@/print_info'),
        },    
        {
            name: 'พิมพ์แบบรายงานเงือนไขสาขาวิชา',
            path: '/college/print_condition/:id_ref',
            component: () =>
            import ('@/print_condition'),
        },    
        {
            path: "/college",
            component: () =>
                import ('@/views/dashboard/college'),
            children: [{
                    name: 'รายงาน',
                    path: '',
                    component: () =>
                        import ('@/views/dashboard/pages/college/Dashboard'),
                },
                {
                    name: 'รายงาน',
                    path: '/college/Dashboard',
                    component: () =>
                        import ('@/views/dashboard/pages/college/Dashboard'),
                },
                {
                    name: 'ข้อมูลเกี่ยวกับบุคคล',
                    path: '/college/personnel',
                    component: () =>
                        import ('@/views/dashboard/pages/college/personnel'),
                },
                {
                    name: 'ข้อมูลคุณวุฒิการศึกษา',
                    path: '/college/personnel_education',
                    component: () =>
                        import ('@/views/dashboard/pages/college/personnel_education'),
                },
                {
                    name: 'ข้อมูลประสบการณ์',
                    path: '/college/personnel_experience',
                    component: () =>
                        import ('@/views/dashboard/pages/college/personnel_experience'),
                },
                {
                    name: 'ข้อมูลประวัติการทำงาน',
                    path: '/college/personnel_work_history',
                    component: () =>
                        import ('@/views/dashboard/pages/college/personnel_work_history'),
                },
                {
                    name: 'ข้อมูลผลงาน รางวัล',
                    path: '/college/personnel_award',
                    component: () =>
                        import ('@/views/dashboard/pages/college/personnel_award'),
                },
                {
                    name: 'ข้อมูลโทษ วินัย',
                    path: '/college/personnel_discipline',
                    component: () =>
                        import ('@/views/dashboard/pages/college/personnel_discipline'),
                },                     
                        
                {
                    name: 'ข้อมูลบุคคลใช้งานระบบ',
                    path: '/college/personnel',
                    component: () =>
                        import ('@/views/dashboard/pages/college/personnel'),
                },
                {
                    name: 'ข้อมูลข้าราชการครูและบุคลการทางการศึกษา',
                    path: '/college/personnel_tem',
                    component: () =>
                        import ('@/views/dashboard/pages/college/personnel_temporary'),
                },
                {
                    name: 'เงือนไขการย้าย',
                    path: '/college/conditions_branch',
                    component: () =>
                        import ('@/views/dashboard/pages/college/conditions_branch'),
                },
                
                

            ]
        },
    ],
})