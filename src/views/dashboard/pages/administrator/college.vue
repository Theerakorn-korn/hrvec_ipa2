<template>
  <div>
      
    <v-container>
    <base-material-card
        icon="mdi-clipboard-text"
        title="ข้อมูลสถานศึกษา"
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
                @click.native="collegeAdd()"
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
          :items="colleges"
          :search="search"          
       > 

         <template v-slot:[`item.actions`]="{ item }">
            <v-icon
              color="yellow"
              
              @click.stop="collegeEdit(item.college_ID)"
            >
              mdi-pencil
            </v-icon>          
          </template>
            <template v-slot:[`item.action_s`]="{ item }">            
            <v-icon
              color="red"
              
              @click.stop="collegeDelete(item.college_ID)"
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

      <!--addcollegedialog  -->
      <v-layout row justify-center>
        <v-dialog v-model="addcollegedialog" persistent max-width="50%">
          <v-card class="mx-auto pa-5" >
            <base-material-card
              icon="mdi-account-multiple"
              title="เพิ่มข้อมูลสถานศึกษา"
              class="px-5 py-3 text_google"
              
            >
            </base-material-card>

            <v-card-text>
             <v-form ref="addcollegeform" lazy-validation>
              <v-container grid-list-md>
                <v-layout wrap>                
                   <v-flex md12>
                    <v-text-field label="รหัสสถานศึกษา" v-model="addcollege.college_code" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>
                   <v-flex md12>
                    <v-text-field label="ชื่อสถานศึกษา" v-model="addcollege.college_name" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>                  
                        <v-flex md6>
                    <v-autocomplete label="อำเภอ"  v-model="addcollege.prefecture_ID" :items="prefectures" item-text="prefecture_name" item-value="prefecture_ID" required :rules="[v => !!v || '']"></v-autocomplete>
                 {{ addcollege.prefecture_ID }}
                 </v-flex>
                   <v-flex md6>
                    <v-autocomplete label="จังหวัด"  v-model="addcollege.province_ID" :items="provinces" item-text="province_name" item-value="province_ID" required :rules="[v => !!v || '']"></v-autocomplete>
                  {{ addcollege.province_ID }}
                  </v-flex>
                   <v-flex md6>
                    <v-autocomplete label="ประเภท"  v-model="addcollege.collegetype_ID" :items="collegetypes" item-text="collegetype_name" item-value="collegetype_ID" required :rules="[v => !!v || '']"></v-autocomplete>
                 {{ addcollege.collegetype_ID }}
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
                @click.stop="addcollegedialog = false"
                rounded
                ><v-icon dark>mdi-close</v-icon> ยกเลิก</v-btn
              >
              <v-btn
                large
                color="success"
                @click.stop="addcollegeSubmit()"
                rounded
              >
                <v-icon dark>mdi-content-save</v-icon>&nbsp;&nbsp;บันทึก
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model deletecollegedialog -->
      <v-layout>
        <v-dialog v-model="deletecollegedialog" persistent max-width="40%">
          <v-card class="mx-auto pa-5" >                     
             <base-material-card
              color="error"
              icon="mdi-delete"
              title="ลบข้อมูลสถานศึกษา"
              class="px-5 py-3 text_google"
              
             
            >
            </base-material-card>

            <v-card-text class="text_google">
              
        <v-card>        
          <v-card-text>
            <v-form ref="deletecollegeform" lazy-validation>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    ยืนยันการลบข้อมูล <br>
                    {{ editcollege.college_name }}
                  </v-flex>                                
                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>        
        </v-card>
    
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn large  @click.stop="deletecollegedialog = false"
                ><v-icon dark>mdi-close</v-icon>ยกเลิก</v-btn
              >
              <v-btn large
                color="red darken-3"
                @click.stop="deletecollegeSubmit()"
                dark
              >
                <v-icon dark>mdi-delete</v-icon>&nbsp;ลบ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model editcollegedialog -->
      <v-layout row justify-center>
         <v-dialog v-model="editcollegedialog" persistent max-width="80%">
        <v-card class="mx-auto pa-6" >
           <base-material-card
              color="yellow"
              icon="mdi-clipboard-text"
              title="แก้ไขข้อมูลผู้ใช้งานระบบ"
              class="px-5 py-3 text_google"
              
            ></base-material-card>
          <v-card-text>
            <v-form ref="editcollegeform" lazy-validation>
              <v-container grid-list-md>
                <v-layout wrap>               
                                       <v-flex md12>
                    <v-text-field label="รหัสสถานศึกษา" v-model="editcollege.college_code" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>
                   <v-flex md12>
                    <v-text-field label="ชื่อสถานศึกษา" v-model="editcollege.college_name" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>                  
                        <v-flex md6>
                    <v-autocomplete label="อำเภอ"  v-model="editcollege.prefecture_ID" :items="prefectures" item-text="prefecture_name" item-value="prefecture_ID" required :rules="[v => !!v || '']"></v-autocomplete>
             
                 </v-flex>
                   <v-flex md6>
                    <v-autocomplete label="จังหวัด"  v-model="editcollege.province_ID" :items="provinces" item-text="province_name" item-value="province_ID" required :rules="[v => !!v || '']"></v-autocomplete>
               
                  </v-flex>
                   <v-flex md6>
                    <v-autocomplete label="ประเภท"  v-model="editcollege.collegetype_ID" :items="collegetypes" item-text="collegetype_name" item-value="collegetype_ID" required :rules="[v => !!v || '']"></v-autocomplete>
                 
                  </v-flex>                     
                </v-layout>
              </v-container>
              <small>* จำเป็น</small>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn large  @click.stop="editcollegedialog = false" rounded>
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn large color="warning" @click.stop="editcollegeSubmit()" rounded>
                <v-icon dark>mdi-pencil</v-icon>&nbsp;บันทึก
              </v-btn>

          </v-card-actions>
        </v-card>
      </v-dialog>
      </v-layout>
    </v-container>

    
    <v-container fluid>      

 <v-snackbar v-model="snackbar.show" top :timeout="snackbar.timeout" :color="snackbar.color">
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
      addcollegedialog: false,
      editcollegedialog: false,
      deletecollegedialog: false,
      snackbar: {
        show: false,
        color: '',
        timeout: 5000,
        icon: '',
        text: ''
      },
      colleges: [],
      addcollege: {},
      editcollege: {},
      colleges: [],
      userstatus: [],
      search: '',
      pagination: {},      
      headers: [       
        { text: "รหัสสถานศึกษา", align: "left", value: "college_code" }, 
        { text: "ชื่อสถานศึกษา", align: "left", value: "college_name" }, 
        { text: "อำเภอ", align: "left", value: "prefecture_name" }, 
        { text: "จังหวัด", align: "left", value: "province_name" }, 
        { text: "ประเภท", align: "left", value: "collegetype_name" },       
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
      collegetypes: [],    
     collgegs: [],
     collegestatus:[],
      regions: [],
      region_ena: true
    };
  },
async mounted() {
    await this.collegeQueryAll()

    let result_prefec = await this.$http.post('prefecture.php', {
          ApiKey: this.ApiKey
        })
    this.prefectures = result_prefec.data

        
    let result_provin = await this.$http.post('province.php', {
        ApiKey: this.ApiKey
      })
      this.provinces = result_provin.data     
            
     let result_collegety = await this.$http.post('collegetype.php', {
        ApiKey: this.ApiKey
      })
      this.collegetypes = result_collegety.data

     let result_region = await this.$http.post('region.php', {
        ApiKey: this.ApiKey
      })
      this.regions = result_region.data  

       let user_status_result     
      user_status_result = await this.$http.post('crud_user_status.php?crud=read', {
        ApiKey: this.ApiKey
      })
        this.userstatus = user_status_result.data   
    },



    methods: {
      async collegeQueryAll() {
          this.loading = true
        let result = await this.$http.post('college.php', {
          ApiKey: this.ApiKey
        }).finally(() => this.loading = false)
        this.colleges = result.data
      },

       async collegeAdd() {
      this.addcollege = {};
      this.addcollegedialog = true;
    },
      async addcollegeSubmit() {
        if (this.$refs.addcollegeform.validate()) {         
          this.addcollege.ApiKey = this.ApiKey;
          let result = await this.$http.post('college.insert.php', this.addcollege) 
          let result_info = await this.$http.post('collegeinfo.insert.php', this.addcollege)      
          if (result.data.status == true && result_info.data.status == true) {
            this.colleges = result.data
            this.snackbar.icon = 'mdi-font-awesome'
            this.snackbar.color = 'success'
            this.snackbar.text = 'บันทึกข้อมูลเรียบร้อย'
            this.snackbar.show = true
            this.collegeQueryAll()
          } else {
            this.snackbar.icon = 'mdi-close-network'
            this.snackbar.color = 'red'
            this.snackbar.text = 'บันทึกข้อมูลผิดพลาด'
            this.snackbar.show = true
             this.collegeQueryAll()
          }
          this.addcollegedialog = false
        }
      },

      async collegeEdit(college_ID) {
        let result = await this.$http.post('college.php', {
          ApiKey: this.ApiKey,
          college_ID: college_ID
        })
        this.editcollege = result.data       
        this.editcollegedialog = true
      
       
      },
      async editcollegeSubmit() {
        if (this.$refs.editcollegeform.validate()) {
          this.editcollege.ApiKey = this.ApiKey;         
          let result = await this.$http.post('college.update.php', this.editcollege)
          if (result.data.status == true) {
            this.college = result.data
            this.snackbar.icon = 'mdi-font-awesome'
            this.snackbar.color = 'success'
            this.snackbar.text = 'แก้ไขข้อมูลเรียบร้อย'
            this.snackbar.show = true
            this.collegeQueryAll()
          } else {
            this.snackbar.icon = 'mdi-close-network'
            this.snackbar.color = 'red'
            this.snackbar.text = 'แก้ไขข้อมูลผิดพลาด'
            this.snackbar.show = true
          }
          this.editcollegedialog = false
        }
      },
      async collegeDelete(college_ID) {
        let result = await this.$http.post('college.php', {
          ApiKey: this.ApiKey,
          college_ID: college_ID
        })
        this.editcollege = result.data
        this.deletecollegedialog = true
      },
      async deletecollegeSubmit() {
        if (this.$refs.deletecollegeform.validate()) {
          this.editcollege.ApiKey = this.ApiKey;          
          let result = await this.$http.post('college.delete.php', this.editcollege)
          if (result.data.status == true) {
            this.college = result.data
            this.snackbar.icon = 'mdi-font-awesome'
            this.snackbar.color = 'success'
            this.snackbar.text = 'ลบข้อมูลเรียบร้อย'
            this.snackbar.show = true
            this.collegeQueryAll()
          } else {
            this.snackbar.icon = 'mdi-close-network'
            this.snackbar.color = 'red'
            this.snackbar.text = 'ลบข้อมูลผิดพลาด'
            this.snackbar.show = true
          }
          this.deletecollegedialog = false
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
