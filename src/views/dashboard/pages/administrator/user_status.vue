<template>
  <div>
      
    <v-container>
    <base-material-card
        icon="mdi-clipboard-text"
        title="กำหนดสถานะผู้ใช้งานระบบ"
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
            <v-col cols="12" lg="6" class="text-right">
              <v-btn
                
                large
                right
                depressed
                color="primary"
                @click.native="user_statusAdd()"
              >
                <v-icon>mdi-plus-circle-outline</v-icon>เพื่อรายการ
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
        <v-data-table
          color="success"
          :loading="loading"
          :headers="headers"
          :items="user_statuss"
          :search="search"
         
       > 

         <template v-slot:[`item.actions`]="{ item }">
            <v-icon
              color="yellow"
              
              @click.stop="user_statusEdit(item.id_us)"
            >
              mdi-pencil
            </v-icon>          
          </template>
            <template v-slot:[`item.action_s`]="{ item }">            
            <v-icon
              color="red"
              
              @click.stop="user_statusDelete(item.id_us)"
            >
              mdi-delete
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

      <!--adduser_statusdialog  -->
      <v-layout row justify-center>
        <v-dialog v-model="adduser_statusdialog" persistent max-width="50%">
          <v-card class="mx-auto pa-5" >
            <base-material-card
              icon="mdi-account-multiple"
              title="เพิ่มข้อมูลสมาชิก"
              class="px-5 py-3 text_google"
              
            >
            </base-material-card>

            <v-card-text>
            <v-form ref="adduser_statusform" lazy-validation>
              <v-container grid-list-md>
                <v-layout wrap>                 
                  <v-flex md6>
                    <v-text-field label="สถานะ" v-model="adduser_status.user_status_name" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>                  
                  <v-flex md6>
                    <v-text-field label="อักษรย่อ" v-model="adduser_status.user_status_sub" require :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>                
                </v-layout>
              </v-container>
              <small>* จำเป็น</small>
            </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="warning"
                large
                @click.stop="adduser_statusdialog = false"
                rounded
                ><v-icon dark>mdi-close</v-icon> ยกเลิก</v-btn
              >
              <v-btn
                large
                color="success"
                @click.stop="adduser_statusSubmit()"
                rounded
              >
                <v-icon dark>mdi-content-save</v-icon>&nbsp;&nbsp;บันทึก
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model deleteuser_statusdialog -->
      <v-layout>
        <v-dialog v-model="deleteuser_statusdialog" persistent max-width="40%">
          <v-card class="mx-auto pa-5" >                     
             <base-material-card
              color="error"
              icon="mdi-delete"
              title="ลบข้อมูลผู้ใช้"
              class="px-5 py-3 text_google"
              
             
            >
            </base-material-card>

            <v-card-text class="text_google">
              
        <v-card>        
          <v-card-text>
            <v-form ref="deleteuser_statusform" lazy-validation>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    ยืนยันการลบข้อมูลผู้ใช้ {{ edituser_status.user_status_name }}
                  </v-flex>                                 
                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>        
        </v-card>
    
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn large @click.stop="deleteuser_statusdialog = false"
                ><v-icon dark>mdi-close</v-icon>ยกเลิก</v-btn
              >
              <v-btn large
                color="red darken-3"
                @click.stop="deleteuser_statusSubmit()"
                dark
              >
                <v-icon dark>mdi-delete</v-icon>&nbsp;ลบ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model edituser_statusdialog -->
      <v-layout row justify-center>
         <v-dialog v-model="edituser_statusdialog" persistent max-width="80%">
        <v-card class="mx-auto pa-6" >
           <base-material-card
              color="yellow"
              icon="mdi-clipboard-text"
              title="แก้ไขข้อมูลผู้ใช้งานระบบ"
              class="px-5 py-3 text_google"
              
            ></base-material-card>
          <v-card-text>
            <v-form ref="edituser_statusform" lazy-validation>
              <v-container grid-list-md>
                <v-layout wrap>
                 
                  <v-flex md6>
                    <v-text-field label="สถานะ" v-model="edituser_status.user_status_name" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>
                  <v-flex md6>
                    <v-text-field label="อักษรย่อ" v-model="edituser_status.user_status_sub" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>                 
                </v-layout>
              </v-container>
              <small>* จำเป็น</small>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn large  @click.stop="edituser_statusdialog = false" rounded>
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn large color="warning" @click.stop="edituser_statusSubmit()" rounded>
                <v-icon dark>mdi-pencil</v-icon>&nbsp;บันทึก
              </v-btn>

          </v-card-actions>
        </v-card>
      </v-dialog>
      </v-layout>
    </v-container>

    
    <v-container fluid>  
      <v-snackbar v-model="snackbar.show" multi-line vertical top auto-height :timeout="snackbar.timeout" :color="snackbar.color">
        <v-icon large>{{snackbar.icon}}</v-icon>
        <br> {{snackbar.text}}
        <v-btn dark  @click="snackbar.show = false">
          Close
        </v-btn>
      </v-snackbar>  
    </v-container>
  </div>
</template>
<script>

export default { 
  name: "user_status",
  data() {
    return {
       loading: true,
     ApiKey: 'HRvec2021',
      valid: true,
      adduser_statusdialog: false,
      edituser_statusdialog: false,
      deleteuser_statusdialog: false,
      snackbar: {
        show: false,
        color: '',
        timeout: 5000,
        icon: '',
        text: ''
      },
      user_statuss: [],
      adduser_status: {},
      edituser_status: {},
      search: '',
      pagination: {},      
      headers: [       
        { text: "สถานะ", align: "left", value: "user_status_name" },              
        { text: "อักษรย่อ", align: "center", value: "user_status_sub" },        
        { text: "แก้ไข", align: "center", value: "actions", icon: "mdi-file-document-edit" },
        { text: "ลบ", align: "center", value: "action_s" , icon: "mdi-delete-forever" },
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
   
    };
  },
async mounted() {
           this.user_statusQueryAll()
    },
    methods: {
      async user_statusQueryAll() {
          this.loading = true
        let result = await this.$http.post('crud_user_status.php?crud=read', {
          ApiKey: this.ApiKey
        }).finally(() => this.loading = false)
        this.user_statuss = result.data
      },
       async user_statusAdd() {
      this.adduser_status = {};
      this.adduser_statusdialog = true;
    },
      async adduser_statusSubmit() {
        if (this.$refs.adduser_statusform.validate()) {         
          this.adduser_status.ApiKey = this.ApiKey;
          let result = await this.$http.post('crud_user_status.php?crud=create', this.adduser_status)
        
         if (result.data.status == true) {           
            this.user_status = result.data
            this.snackbar.icon = 'mdi-font-awesome'
            this.snackbar.color = 'success'
            this.snackbar.text = 'บันทึกข้อมูลเรียบร้อย'
            this.snackbar.show = true
            this.user_statusQueryAll()
          } else {
             console.log(result.data.status)
            this.snackbar.icon = 'mdi-close-network'
            this.snackbar.color = 'red'
            this.snackbar.text = 'บันทึกข้อมูลผิดพลาด'
            this.snackbar.show = true   
              this.user_statusQueryAll()         
          }
          this.adduser_statusdialog = false
        }
      },
      async user_statusEdit(id_us) {
        let result = await this.$http.post('crud_user_status.php?crud=read', {
          ApiKey: this.ApiKey,
          id_us: id_us
        })
        this.edituser_status = result.data
        this.edituser_status.user_status_password = ''
        this.edituser_statusdialog = true
      },
      async edituser_statusSubmit() {
        if (this.$refs.edituser_statusform.validate()) {
          this.edituser_status.ApiKey = this.ApiKey;         
          let result = await this.$http.post('crud_user_status.php?crud=update', this.edituser_status)
          console.log(result)
          if (result.data.status == true) {
            this.user_status = result.data
            this.snackbar.icon = 'mdi-font-awesome'
            this.snackbar.color = 'success'
            this.snackbar.text = 'แก้ไขข้อมูลเรียบร้อย'
            this.snackbar.show = true
            this.user_statusQueryAll()
          } else {
            this.snackbar.icon = 'mdi-close-network'
            this.snackbar.color = 'red'
            this.snackbar.text = 'แก้ไขข้อมูลผิดพลาด'
            this.snackbar.show = true
          }
          this.edituser_statusdialog = false
        }
      },
      async user_statusDelete(id_us) {
        let result = await this.$http.post('crud_user_status.php?crud=read', {
          ApiKey: this.ApiKey,
          id_us: id_us
        })
        this.edituser_status = result.data
        this.deleteuser_statusdialog = true
      },
      async deleteuser_statusSubmit() {
        if (this.$refs.deleteuser_statusform.validate()) {
          this.edituser_status.ApiKey = this.ApiKey;          
          let result = await this.$http.post('crud_user_status.php?crud=delete', this.edituser_status)
          
          if (result.data.status == true) {
            this.user_status = result.data
            this.snackbar.icon = 'mdi-font-awesome'
            this.snackbar.color = 'success'
            this.snackbar.text = 'ลบข้อมูลเรียบร้อย'
            this.snackbar.show = true
            this.user_statusQueryAll()
          } else {
            this.snackbar.icon = 'mdi-close-network'
            this.snackbar.color = 'red'
            this.snackbar.text = 'ลบข้อมูลผิดพลาด'
            this.snackbar.show = true
          }
          this.deleteuser_statusdialog = false
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
