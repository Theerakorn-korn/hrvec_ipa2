<template>
  <div>
      
    <v-container>
    <base-material-card
        icon="mdi-clipboard-text"
        title="ผู้ใช้งานระบบ-ข้าราชการครูและบุคลการทางการศึกษา"
        class="px-5 py-3"
        
      >
        <v-card class="mb-4 pa-2">
          <v-row>
            <v-col cols="12" lg="6" class="text-right">
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="ค้นหา ระบุคำ หรือ ส่วนข้อความเกี่ยวข้อง"
                single-line
                hide-details
                
                dense
                filled
                class="mb-2"
              />
            </v-col>           
          </v-row>
        </v-card>
        <v-data-table
          color="success"
          :loading="loading"
          :headers="headers"
          :items="personnels"
          :search="search"
       > 
 <template v-slot:[`item.user_status`]="{ item }">
   <span v-if="item.user_status=='tech'">ครู</span>
   <span v-if="item.user_status=='se_director'">รองผู้อำนวยการ</span>
   <span v-if="item.user_status=='director'">ผู้อำนวยการ</span>
   <span v-if="item.user_status=='supervision'">ศึกษานิเทศก์</span>
         
          </template>
          
         <template v-slot:[`item.actions`]="{ item }">
            <v-icon
              color="yellow"
              
              @click.stop="personnelEdit(item.id_rc)"
            >
              mdi-pencil
            </v-icon>          
          </template>            
          <v-alert
            slot="no-results"
            :value="true"
            color="error"
            icon="mdi-alert"
          >ไม่พบผลลัพธ์ "{{ search }}" ที่คุณกำลังค้นหา.</v-alert>
        </v-data-table>
      </base-material-card>

   

      <!-- V-model editpersonneldialog -->
      <v-layout row justify-center>
         <v-dialog v-model="editpersonneldialog" persistent max-width="80%">
        <v-card class="mx-auto pa-6" >
           <base-material-card
              color="yellow"
              icon="mdi-clipboard-text"
              title="แก้ไขข้อมูลผู้ใช้งานระบบ"
              class="px-5 py-3 text_google"
              
            ></base-material-card>
          <v-card-text>
            <v-form ref="editpersonnelform" lazy-validation>
              <v-container grid-list-md>
                <v-layout wrap> 
                    <v-flex md6>
                   {{ editpersonnel.id_card }}
                  </v-flex>                                
                  <v-flex md6>
                    <v-text-field label="Password" v-model="editpersonnel.p_word" type="password"></v-text-field>
                  </v-flex>
                  <v-flex md6>
                    <v-text-field label="Confirm Password" v-model="editpersonnel.personnel_confirmpassword" type="password"></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-divider></v-divider>
                  </v-flex>   
                </v-layout>
              </v-container>
              <small>* จำเป็น</small>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn large @click.stop="editpersonneldialog = false" rounded>
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn large color="warning" @click.stop="editpersonnelSubmit()" rounded>
                <v-icon dark>mdi-pencil</v-icon>&nbsp;บันทึก
              </v-btn>

          </v-card-actions>
        </v-card>
      </v-dialog>
      </v-layout>
    </v-container>

    
    <v-container fluid>      

 <v-snackbar v-model="snackbar.show" top  :timeout="snackbar.timeout" :color="snackbar.color">
      <v-icon large>{{snackbar.icon}}</v-icon>
      <v-card-text>
        {{snackbar.text}}
      </v-card-text>
     
      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackbar.show = false">Close</v-btn>
      </template>
    </v-snackbar>


    </v-container>
  </div>
</template>
<script>
export default {  
  data() {
    return {
    loading: true,       
     ApiKey: 'HRvec2021',
      valid: true,     
      editpersonneldialog: false,      
      snackbar: {
        show: false,
        color: '',
        timeout: 5000,
        icon: '',
        text: ''
      },
      personnels: [],    
      editpersonnel: {},
      search: '',
      pagination: {},      
      headers: [
        { text: "ลำดับ", align: "center", value: "id_rc" },                
        { text: "รหัสสถานศึกษา", align: "center", value: "college_code" },    
        { text: "ชื่อสถานศึกษา", align: "center", value: "college_name" },    
        { text: "ชื่อ", align: "center", value: "frist_name" },         
        { text: "นามสกุล", align: "center", value: "last_name" },         
        { text: "สถานะ", align: "center", value: "user_status" },  
        { text: "แก้ไข", align: "center", value: "actions", icon: "mdi-file-document-edit" },       
      ],
      rowsperpage: [
        25,
        50,
        100,
        {
          text: "All",
          value: -1,
        },
      ],    
  personnelstatus:[],   
   userstatus:{},     
    };
  },
async mounted() {      
     await this.personnelQueryAll()      
    },
    methods: {
      async personnelQueryAll() {
          this.loading = true
        let result = await this.$http.post('personnel.php', {
          ApiKey: this.ApiKey
        }).finally(() => this.loading = false)
        this.personnels = result.data
      },
    
      async personnelEdit(id_rc) {
        let result = await this.$http.post('personnel.php', {
          ApiKey: this.ApiKey,
          id_rc: id_rc
        })
        this.editpersonnel = result.data      
        this.editpersonneldialog = true
      },
      async editpersonnelSubmit() {
        if (this.$refs.editpersonnelform.validate()) {
          this.editpersonnel.ApiKey = this.ApiKey;        
          let result = await this.$http.post('personnel.update.php', this.editpersonnel)
          if (result.data.status == true) {
            this.personnel = result.data
            this.snackbar.icon = 'mdi-font-awesome'
            this.snackbar.color = 'success'
            this.snackbar.text = 'แก้ไขข้อมูลเรียบร้อย'
            this.snackbar.show = true
            this.personnelQueryAll()
          } else {
            this.snackbar.icon = 'mdi-close-network'
            this.snackbar.color = 'red'
            this.snackbar.text = 'แก้ไขข้อมูลผิดพลาด'
            this.snackbar.show = true
          }
          this.editpersonneldialog = false
        }
      },             
    },
    computed: {
      pages() {
        if (this.pagination.rowsPerPage == null ||
          this.pagination.totalItems == null
        ) return 0

        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      }
    },

  

 

  
}
</script>
