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
                    path: 'news',
                    component: () =>
                        import ('@/views/dashboard/news_munual'),
                      
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
                {
                    name: 'อัตรากำลัง',
                    path: '/admin/man_power',
                    component: () =>
                        import ('@/views/dashboard/pages/administrator/man_power'),
                },
                {
                    name: 'สถานศึกษา',
                    path: '/admin/college',
                    component: () =>
                        import ('@/views/dashboard/pages/administrator/college'),
                },
                 {
                    name: 'รายละเอียดสถานศึกษา',
                    path: '/admin/collegeinfo',
                    component: () =>
                        import ('@/views/dashboard/pages/administrator/collegeinfo'),
                },
                {
                    name: 'เงือนไขการรับย้ายของสถานศึกษา',
                    path: '/admin/conditions_transfer',
                    component: () =>
                        import ('@/views/dashboard/pages/administrator/conditions_transfer'),
                },
                {
                    name: 'เงือนไขการรับย้ายสาขาวิชา',
                    path: '/admin/conditions_branch',
                    component: () =>
                        import ('@/views/dashboard/pages/administrator/conditions_branch'),
                },
                {
                    name: 'สายงานการสอนและสายสนับสนุนการสอน',
                    path: '/admin/transference_personnel',
                    component: () =>
                        import ('@/views/dashboard/pages/administrator/transference_personnel'),
                },
                {
                    name: 'สายงานการสอนและสายสนับสนุนการสอน รายละเอียด',
                    path: '/admin/transference_location',
                    component: () =>
                        import ('@/views/dashboard/pages/administrator/transference_location'),
                },
                {
                    name: 'ข่าวสาร',
                    path: '/admin/news_s',
                    component: () =>
                        import ('@/views/dashboard/pages/administrator/news_s'),
                },
                {
                    name: 'คู่มือ',
                    path: '/admin/manual_s',
                    component: () =>
                        import ('@/views/dashboard/pages/administrator/manual_s'),
                },
                {
                    name: 'ดำเนินการประมวลผลการย้าย แบบที่ 2 ',
                    path: '/admin/process_transfer',
                    component: () =>
                        import ('@/views/dashboard/pages/administrator/process_transfer'),
                },
                {
                    name: 'ดำเนินการประมวลผลการย้าย แบบ 3 สับเปลี่ยนตำแหน่ง',
                    path: '/admin/process_transfer_switch',
                    component: () =>
                        import ('@/views/dashboard/pages/administrator/process_transfer_switch'),
                },

                
                {
                    name: 'คำสั่งแต่งตั้งรักษาการในตำแหน่ง',
                    path: '/admin/Order_appoint',
                    component: () =>
                        import ('@/views/dashboard/pages/administrator/Order_appoint'),
                },                
                {
                    name: 'สรุปผลการประมวลผลการย้าย',
                    path: '/admin/conditons_transfer_success',
                    component: () =>
                        import ('@/views/dashboard/pages/administrator/conditons_transfer_success'),
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
            name: 'พิมพ์คำสั่ง แต่งตั้งรักษาการในตำแหน่ง',
            path: '/admin/print_report_movement/:times_s:year_s',
            component: () =>
            import ('@/print_report_movement'),
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
                    name: 'รายละเอียดสถานศึกษา',
                    path: '/college/collegeinfo',
                    component: () =>
                        import ('@/views/dashboard/pages/college/collegeinfo'),
                },
                
                {
                    name: 'เมนูรายการ',
                    path: '/college/home_menu',
                    component: () =>
                        import ('@/views/dashboard/pages/college/home_menu'),
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
                
                {
                    name: 'ประวัติข้อมูลเงือนไขการย้าย',
                    path: '/college/history_conditions',
                    component: () =>
                        import ('@/views/dashboard/pages/college/history_conditions'),
                },   
                {
                    name: 'การย้ายสายการสอนและสายสนับสนุน',
                    path: '/college/transference_personnel',
                    component: () =>
                        import ('@/views/dashboard/pages/college/transference_personnel'),
                },   
                            
                

            ]
        },
    ],
})