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
                {
                    name: 'report chart',
                    path: 'pages/chart_report',
                    component: () =>
                        import ('@/views/dashboard/pages/chart_report'),
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
                    name: 'กำหนดรอบการย้ายข้าราชการครูและบุคลากรทางการศึกษา',
                    path: '/admin/period',
                    component: () =>
                        import ('@/views/dashboard/pages/administrator/period'),
                },
                {
                    name: 'กำหนดการสถานศึกษา',
                    path: '/admin/period_college',
                    component: () =>
                        import ('@/views/dashboard/pages/administrator/period_college'),
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
                    name: 'สาขางาน',
                    path: '/admin/branch_sub',
                    component: () =>
                        import ('@/views/dashboard/pages/administrator/branch_sub'),
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
                    name: 'สายงานสอนและสายสนับสนุนการสอน',
                    path: '/admin/transference_personnel',
                    component: () =>
                        import ('@/views/dashboard/pages/administrator/transference_personnel'),
                },
                {
                    name: 'สายงานสอนและสายสนับสนุนการสอน รายละเอียด ประมวผลผลแบบที่ 1',
                    path: '/admin/transference_location',
                    component: () =>
                        import ('@/views/dashboard/pages/administrator/transference_location'),
                },

                {
                    name: 'สายงานสอนและสายสนับสนุนการสอน ประกอบการพิจารณา',
                    path: '/admin/transference_location_detail',
                    component: () =>
                        import ('@/views/dashboard/pages/administrator/transference_location_detail'),
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
                    name: 'ดำเนินการประมวลผลการย้าย กรณีสับเปลี่ยนแบบปกติ',
                    path: '/admin/process_transfer_switch_normal',
                    component: () =>
                        import ('@/views/dashboard/pages/administrator/process_transfer_switch_normal'),
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
                {
                    name: 'ศูนย์กลางส่งออกเอกสาร ประกอบการพิจารณาย้าย',
                    path: '/admin/transference_export_report',
                    component: () =>
                        import ('@/views/dashboard/pages/administrator/transference_export_report'),
                },
                

                {
                    name: 'ครูผู้ช่วย',
                    path: '/admin/assistant_teacher',                    
                    component: () =>
                    import ('@/views/dashboard/pages/administrator/assistant_teacher'),
                }, 
                {
                    name: 'รายละเอียดการประเมินครูผู้ช่วย',
                    path: '/admin/assistant_teacher_detail',                    
                    component: () =>
                    import ('@/views/dashboard/pages/administrator/assistant_teacher_detail'),
                }, 

                {
                    name: 'ประเภทวิชา/หมวดวิชา/สาขาวิชา',
                    path: '/admin/rate_work_course_std',                    
                    component: () =>
                    import ('@/views/dashboard/pages/administrator/rate_work_course_std'),
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
            name: 'พิมพ์ บัญชีรายละเอียดการพิจารณาย้าย',
            path: '/admin/print_report_movement_filter/:id_oa:times_s:year_s:tech',
            component: () =>
            import ('@/print_report_movement_filter'),
        }, 
        {
            name: 'พิมพ์ บัญชีรายละเอียดการพิจารณาย้าย แบบที่ 2 ',
            path: '/admin/print_report_movement_filter_2/:id_oa:times_s:year_s:tech',
            component: () =>
            import ('@/print_report_movement_filter_2'),
        },       
        
        {
            name: 'พิมพ์ บัญชีรายละเอียดการพิจารณาย้าย อ.ก.ค.ศ.',
            path: '/admin/print_report_movement_filter_o/:id_oa:times_s:year_s:tech',
            component: () =>
            import ('@/print_report_movement_filter_o'),
        }, 
        {
            name: 'พิมพ์คำสั่ง แต่งตั้งรักษาการในตำแหน่ง',
            path: '/admin/print_report_movement/:id_oa:times_s:year_s:tech',
            component: () =>
            import ('@/print_report_movement'),
        }, 
        {
            name: 'พิมพ์รายงาน การเขียนย้ายออนไลน์ประกอบการพิจารณา แบบที่ 1',
            path: '/admin/print_report_movement_online/:times_s/:year_s/:teach',
            component: () =>
            import ('@/print_report_movement_online'),
        }, 
        {
            name: 'พิมพ์รายงาน การเขียนย้ายออนไลน์ประกอบการพิจารณา แบบที่ 2',
            path: '/admin/print_report_movement_online_2/:times_s/:year_s/:teach',
            component: () =>
            import ('@/print_report_movement_online_2'),
        },  
        {
            name: 'พิมพ์รายงาน การเขียนย้ายออนไลน์ประกอบการพิจารณา แบบที่ 3',
            path: '/admin/print_report_movement_online_3/:times_s/:year_s/:teach',
            component: () =>
            import ('@/print_report_movement_online_3'),
        },   
        {
            name: 'พิมพ์รายงาน การเขียนย้ายออนไลน์ประกอบการพิจารณา(ค้างพิจารณา) แบบที่ 4',
            path: '/admin/print_report_movement_online_4/:id_oa/:times_s/:year_s/:teach',
            component: () =>
            import ('@/print_report_movement_online_4'),
        },   
        {
            name: 'พิมพ์รายงาน ผู้เสนอย้ายไม่บันทึกข้อมูล',
            path: '/admin/print_report_personnel_can/',
            component: () =>
            import ('@/print_report_personnel_can'),
        },  
        {
            name: 'พิมพ์รายงาน สรุปตำแหน่งว่าง',
            path: '/admin/print_report_manpower',
            component: () =>
            import ('@/print_report_manpower'),
        },
        {
            name: 'พิมพ์รายงาน สถานศึกษาไม่ดำเนินการบันทึกเงือนไขสาขาวิชา',
            path: '/admin/print_report_college_condition/:times_s/:year_s',
            component: () =>
            import ('@/print_report_college_condition'),
        },  
        {
            name: 'พิมพ์รายงาน ข้อมูลผู้เสนอย้าย และเงินเดือน',
            path: '/admin/print_report_movement_filter_salary/:id_oa/:times_s/:year_s/:teach',
            component: () =>
            import ('@/print_report_movement_filter_salary'),
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
                {
                    name: 'ข้อมูลทั่วไป',
                    path: '/college/rate_workforce_g',
                    component: () =>
                        import ('@/views/dashboard/pages/college/rate_workforce_g'),
                },     
                {
                    name: 'รายงานข้อมูลสถานศึกษา (อัตรากำลัง)',
                    path: '/college/rate_workforce',
                    component: () =>
                        import ('@/views/dashboard/pages/college/rate_workforce'),
                },   
                {
                    name: 'รายงานข้อมูลสถานศึกษา (อัตรากำลัง) สรุป',
                    path: '/college/rate_workforce_pro',
                    component: () =>
                        import ('@/views/dashboard/pages/college/rate_workforce_pro'),
                },   
                
                {
                    name: 'ข้อมูลหมวดวิชา',
                    path: '/college/rate_workforce_course/:rate_work_course_id',                    
                    component: () =>
                    import ('@/views/dashboard/pages/college/rate_workforce_course'),
                }, 
                {
                    name: 'ประมวลผลอัตรากำลัง',
                    path: '/college/rate_workforce_cal',                    
                    component: () =>
                    import ('@/views/dashboard/pages/college/rate_workforce_cal'),
                }, 
                {
                    name: 'ครูผู้ช่วย',
                    path: '/college/assistant_teacher',                    
                    component: () =>
                    import ('@/views/dashboard/pages/college/assistant_teacher'),
                }, 
                            
                

            ]
        },
    ],
})