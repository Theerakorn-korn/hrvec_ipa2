<template>
  <div>
      
    <v-container>
    <base-material-card
        icon="mdi-clipboard-text"
        title="ผู้ใช้งานระบบ"
        class="px-5 py-3"
        :elevation="hover ? 24 : 6"
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
                :elevation="hover ? 24 : 6"
                dense
                filled
                class="mb-2"
              />
            </v-col>
            <v-col cols="12" lg="6" class="text-right">
              <v-btn
                :elevation="hover ? 24 : 6"
                large
                right
                depressed
                color="primary"
                @click.native="personnelAdd()"
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
          :items="personnels"
          :search="search"
          :class="elevation - 3" 
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
              :elevation="hover ? 24 : 6"
              @click.stop="personnelEdit(item.id_rc)"
            >
              mdi-pencil
            </v-icon>          
          </template>
            <template v-slot:[`item.action_s`]="{ item }">            
            <v-icon
              color="red"
              :elevation="hover ? 24 : 6"
              @click.stop="personnelDelete(item.id_rc)"
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

      <!--addpersonneldialog  -->
      <v-layout row justify-center>
        <v-dialog v-model="addpersonneldialog" persistent max-width="50%">
          <v-card class="mx-auto pa-5" :elevation="hover ? 24 : 6">
            <base-material-card
              icon="mdi-account-multiple"
              title="เพิ่มข้อมูลสมาชิก"
              class="px-5 py-3 text_google"
              :elevation="hover ? 24 : 6"
            >
            </base-material-card>

            <v-card-text>
            <v-form ref="addpersonnelform" lazy-validation>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex md6>
                    <v-select :items="userstatus" item-text="user_status_name" item-value="user_status_sub" v-model="addpersonnel.personnel_status" label="personnel Type" required
                      :rules="[v => !!v || '']"></v-select>
                  </v-flex>                  
                  <v-flex md6>
                    <v-text-field label="personnelname" v-model="addpersonnel.personnel_name" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>
                  <v-flex md6>

                  </v-flex>
                  <v-flex md6>
                    <v-text-field label="Password" v-model="addpersonnel.personnel_password" type="password" require :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>
                  <v-flex md6>
                    <v-text-field label="Confirm Password" v-model="addpersonnel.personnel_confirmpassword" type="password" required :rules="[v => v==addpersonnel.personnel_password]"></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-divider></v-divider>
                  </v-flex>
                  <v-flex md6>
                    <v-text-field label="Firstname" v-model="addpersonnel.personnel_firstname" require :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>
                  <v-flex md6>
                    <v-text-field label="Lastname" v-model="addpersonnel.personnel_lastname" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>
                  <v-flex xs12 v-if="addpersonnel.personnel_status == 'E' || addpersonnel.personnel_status == 'T'">
                    <v-autocomplete :items="colleges" item-text="college_name" item-value="college_ID" v-model="addpersonnel.college_ID" label="College"
                      required :rules="[v => !!v || '']">                      
                      </v-autocomplete>                    
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
                @click.stop="addpersonneldialog = false"
                round
                ><v-icon dark>mdi-close</v-icon> ยกเลิก</v-btn
              >
              <v-btn
                large
                color="success"
                @click.stop="addpersonnelSubmit()"
                round
              >
                <v-icon dark>mdi-content-save</v-icon>&nbsp;&nbsp;บันทึก
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model deletepersonneldialog -->
      <v-layout>
        <v-dialog v-model="deletepersonneldialog" persistent max-width="40%">
          <v-card class="mx-auto pa-5" :elevation="hover ? 24 : 6">                     
             <base-material-card
              color="error"
              icon="mdi-delete"
              title="ลบข้อมูลผู้ใช้"
              class="px-5 py-3 text_google"
              :elevation="hover ? 24 : 6"
             
            >
            </base-material-card>

            <v-card-text class="text_google">
              
        <v-card>        
          <v-card-text>
            <v-form ref="deletepersonnelform" lazy-validation>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    ยืนยันการลบข้อมูลผู้ใช้ {{ editpersonnel.personnel_name }} <span v-if="editpersonnel.college_name">{{ editpersonnel.college_name }}</span>
                  </v-flex>                                 
                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>        
        </v-card>
    
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn large flat @click.stop="deletepersonneldialog = false"
                ><v-icon dark>mdi-close</v-icon>ยกเลิก</v-btn
              >
              <v-btn large
                color="red darken-3"
                @click.stop="deletepersonnelSubmit()"
                dark
              >
                <v-icon dark>mdi-delete</v-icon>&nbsp;ลบ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model editpersonneldialog -->
      <v-layout row justify-center>
         <v-dialog v-model="editpersonneldialog" persistent max-width="80%">
        <v-card class="mx-auto pa-6" :elevation="hover ? 24 : 6">
           <base-material-card
              color="yellow"
              icon="mdi-clipboard-text"
              title="แก้ไขข้อมูลผู้ใช้งานระบบ"
              class="px-5 py-3 text_google"
              :elevation="hover ? 24 : 6"
            ></base-material-card>
          <v-card-text>
            <v-form ref="editpersonnelform" lazy-validation>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex md6>
                    <v-select :items="personnelstatus" item-text="text" item-value="value" v-model="editpersonnel.personnel_status" label="personnel Type" required
                      :rules="[v => !!v || '']"></v-select>
                  </v-flex>
                  <v-flex md6>
                    <v-text-field label="personnelname" v-model="editpersonnel.personnel_name" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>
                  <v-flex md6>
                    <v-text-field label="Password" v-model="editpersonnel.personnel_password" type="password"></v-text-field>
                  </v-flex>
                  <v-flex md6>
                    <v-text-field label="Confirm Password" v-model="editpersonnel.personnel_confirmpassword" type="password"></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-divider></v-divider>
                  </v-flex>
                  <v-flex md6>
                    <v-text-field label="Firstname" v-model="editpersonnel.personnel_firstname" require :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>
                  <v-flex md6>
                    <v-text-field label="Lastname" v-model="editpersonnel.personnel_lastname" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>
                  <v-flex xs12 v-if="editpersonnel.personnel_status == 'B'">
                    <v-select :items="colleges" item-text="college_name" item-value="college_ID" v-model="editpersonnel.college_ID" label="College"
                      required :rules="[v => !!v || '']"></v-select>
                  </v-flex>
                </v-layout>
              </v-container>
              <small>* จำเป็น</small>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn large flat @click.stop="editpersonneldialog = false" round>
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn large color="warning" @click.stop="editpersonnelSubmit()" round>
                <v-icon dark>mdi-pencil</v-icon>&nbsp;บันทึก
              </v-btn>

          </v-card-actions>
        </v-card>
      </v-dialog>
      </v-layout>
    </v-container>

    
    <v-container fluid>      

 <v-snackbar v-model="snackbar.show" top :multi-line="multiLine" :timeout="snackbar.timeout" :color="snackbar.color">
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
      // loading: true,       
     ApiKey: 'HRvec2021',
      valid: true,
      addpersonneldialog: false,
      editpersonneldialog: false,
      deletepersonneldialog: false,
      snackbar: {
        show: false,
        color: '',
        timeout: 5000,
        icon: '',
        text: ''
      },
      personnels: [],
      addpersonnel: {},
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
     
    college: {},
      provinces: [],
      prefectures: [],
      
     collgegs: [],
     personnelstatus:[],   
   userstatus:{},
      regions: [],
      region_ena: true
    };
  },
async mounted() {
      let result
      result = await this.$http.post('collegetype.php', {
        ApiKey: this.ApiKey
      })
      this.collegetypes = result.data
      result = await this.$http.post('college.php', {
        ApiKey: this.ApiKey
      })
      
      this.colleges = result.data
      result = await this.$http.post('province.php', {
        ApiKey: this.ApiKey
      })
      this.provinces = result.data
      
      result = await this.$http.post('region.php', {
        ApiKey: this.ApiKey
      })
      this.regions = result.data  

      let user_status_result     
      user_status_result = await this.$http.post('crud_user_status.php?crud=read', {
        ApiKey: this.ApiKey
      })
        this.userstatus = user_status_result.data
     // this.personnelQueryAll()
      
    },
    methods: {
      async personnelQueryAll() {
          this.loading = true
        let result = await this.$http.post('personnel.php', {
          ApiKey: this.ApiKey
        }).finally(() => this.loading = false)
        this.personnels = result.data
      },
       async personnelAdd() {
      this.addpersonnel = {};
      this.addpersonneldialog = true;
    },
      async addpersonnelSubmit() {
        if (this.$refs.addpersonnelform.validate()) {         
          this.addpersonnel.ApiKey = this.ApiKey;
          let result = await this.$http.post('personnel.insert.php', this.addpersonnel)        
          if (result.data.status == true) {
            this.personnel = result.data
            this.snackbar.icon = 'mdi-font-awesome'
            this.snackbar.color = 'success'
            this.snackbar.text = 'บันทึกข้อมูลเรียบร้อย'
            this.snackbar.show = true
            this.personnelQueryAll()
          } else {
            this.snackbar.icon = 'mdi-close-network'
            this.snackbar.color = 'red'
            this.snackbar.text = 'บันทึกข้อมูลผิดพลาด'
            this.snackbar.show = true
             this.personnelQueryAll()
          }
          this.addpersonneldialog = false
        }
      },
      async personnelEdit(id_rc) {
        let result = await this.$http.post('personnel.php', {
          ApiKey: this.ApiKey,
          id_rc: id_rc
        })
        this.editpersonnel = result.data
        this.editpersonnel.personnel_password = ''
        this.editpersonneldialog = true
      },
      async editpersonnelSubmit() {
        if (this.$refs.editpersonnelform.validate()) {
          this.editpersonnel.ApiKey = this.ApiKey;
          if(this.editpersonnel.personnel_password == '')
            delete this.editpersonnel.personnel_password
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
      async personnelDelete(id_rc) {
        let result = await this.$http.post('personnel.php', {
          ApiKey: this.ApiKey,
          id_rc: id_rc
        })
        this.editpersonnel = result.data
        this.deletepersonneldialog = true
      },
      async deletepersonnelSubmit() {
        if (this.$refs.deletepersonnelform.validate()) {
          this.editpersonnel.ApiKey = this.ApiKey;
          if(this.editpersonnel.personnel_status == 'D')
            await this.$http.post('committee.delete.php', {
              ApiKey: this.ApiKey,
              id_rc: this.editpersonnel.id_rc
            })
          let result = await this.$http.post('personnel.delete.php', this.editpersonnel)
          if (result.data.status == true) {
            this.personnel = result.data
            this.snackbar.icon = 'mdi-font-awesome'
            this.snackbar.color = 'success'
            this.snackbar.text = 'ลบข้อมูลเรียบร้อย'
            this.snackbar.show = true
            this.personnelQueryAll()
          } else {
            this.snackbar.icon = 'mdi-close-network'
            this.snackbar.color = 'red'
            this.snackbar.text = 'ลบข้อมูลผิดพลาด'
            this.snackbar.show = true
          }
          this.deletepersonneldialog = false
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
