<template>
  <div>     
    <v-container>
    <base-material-card
        icon="mdi-clipboard-text"
        title="ประเภทวิชา/หมวดวิชา/สาขาวิชา : จากระบบ ศธ.02 "
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
             <!--  <v-btn
                
                large
                right
                depressed
                color="primary"
                @click.native="rate_work_course_stdAdd()"
              >
                <v-icon>mdi-plus-circle-outline</v-icon>เพิ่มรายการ
              </v-btn> -->
            </v-col>
          </v-row>
        </v-card>
        <v-data-table
          color="success"
          :loading="loading"
          :headers="headers"
          :items="rate_work_course_stds"
          :search="search"
          
       > 

        <!--  <template v-slot:[`item.actions`]="{ item }">
            <v-icon
              color="yellow"
              
              @click.stop="rate_work_course_stdEdit(item.id_rp)"
            >
              mdi-pencil
            </v-icon>          
          </template>
            <template v-slot:[`item.action_s`]="{ item }">            
            <v-icon
              color="red"
              
              @click.stop="rate_work_course_stdDelete(item.id_rp)"
            >
              mdi-delete
            </v-icon>
          </template> -->
          <v-alert
            slot="no-results"
            :value="true"
            color="error"
            icon="mdi-alert"
          >ไม่พบผลลัพธ์ "{{ search }}" ที่คุณกำลังค้นหา.</v-alert>
        </v-data-table>
      </base-material-card>

      <!--addrate_work_course_stddialog  -->
      <v-layout row justify-center>
        <v-dialog v-model="addrate_work_course_stddialog" persistent max-width="50%">
          <v-card class="mx-auto pa-5" >
            <base-material-card
              icon="mdi-account-multiple"
              title="เพิ่มข้อมูลสาขาวิชาเอก"
              class="px-5 py-3 text_google"
              
            >
            </base-material-card>

            <v-card-text>
            <v-form ref="addrate_work_course_stdform" lazy-validation>
              <v-container grid-list-md>
                <v-layout wrap>   
                      <v-flex md6>
                    <v-text-field label="รหัส" v-model="addrate_work_course_std.id_rate_work_course_std" require :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>                                 
                  <v-flex md6>
                    <v-text-field label="สาขาวิชาเอก" v-model="addrate_work_course_std.name_rate_work_course_std" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>                 
                  <v-flex md12>
                    <v-textarea label="รายละเอียด" v-model="addrate_work_course_std.detail_rate_work_course_std" require :rules="[v => !!v || '']"></v-textarea>
                  </v-flex>                
                </v-layout>
              </v-container>           
            </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="warning"
                large
                @click.stop="addrate_work_course_stddialog = false"
                rounded
                ><v-icon dark>mdi-close</v-icon> ยกเลิก</v-btn
              >
              <v-btn
                large
                color="success"
                @click.stop="addrate_work_course_stdSubmit()"
                rounded
              >
                <v-icon dark>mdi-content-save</v-icon>&nbsp;&nbsp;บันทึก
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model deleterate_work_course_stddialog -->
      <v-layout>
        <v-dialog v-model="deleterate_work_course_stddialog" persistent max-width="80%">
          <v-card class="mx-auto pa-5" >                     
             <base-material-card
              color="error"
              icon="mdi-delete"
              title="ลบข้อมูลสาขาวิชาเอก"
              class="px-5 py-3 text_google"
              
             
            >
            </base-material-card>

            <v-card-text class="text_google">
              
        <v-card>        
          <v-card-text>
            <v-form ref="deleterate_work_course_stdform" lazy-validation>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    ยืนยันการลบข้อมูลสาขาวิชาเอก {{ editrate_work_course_std.name_rate_work_course_std }} 
                  </v-flex>                                 
                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>        
        </v-card>
    
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn large  @click.stop="deleterate_work_course_stddialog = false"
                ><v-icon dark>mdi-close</v-icon>ยกเลิก</v-btn
              >
              <v-btn large
                color="red darken-3"
                @click.stop="deleterate_work_course_stdSubmit()"
                dark
              >
                <v-icon dark>mdi-delete</v-icon>&nbsp;ลบ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model editrate_work_course_stddialog -->
      <v-layout row justify-center>
         <v-dialog v-model="editrate_work_course_stddialog" persistent max-width="80%">
        <v-card class="mx-auto pa-6" >
           <base-material-card
              color="yellow"
              icon="mdi-clipboard-text"
              title="แก้ไขข้อมูลสาขาวิชา"
              class="px-5 py-3 text_google"
              
            ></base-material-card>
          <v-card-text>
            <v-form ref="editrate_work_course_stdform" lazy-validation>
              <v-container grid-list-md>
                <v-layout wrap>                
                   <v-flex md6>
                    <v-text-field label="รหัส" v-model="editrate_work_course_std.id_rate_work_course_std" require :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>                                 
                  <v-flex md6>
                    <v-text-field label="สาขาวิชาเอก" v-model="editrate_work_course_std.name_rate_work_course_std" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>                 
                  <v-flex md12>
                    <v-textarea label="รายละเอียด" v-model="editrate_work_course_std.detail_rate_work_course_std" require :rules="[v => !!v || '']"></v-textarea>
                  </v-flex>           

                </v-layout>
              </v-container>            
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn large  @click.stop="editrate_work_course_stddialog = false" rounded>
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn large color="warning" @click.stop="editrate_work_course_stdSubmit()" rounded>
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
      addrate_work_course_stddialog: false,
      editrate_work_course_stddialog: false,
      deleterate_work_course_stddialog: false,
      snackbar: {
        show: false,
        color: '',
        timeout: 5000,
        icon: '',
        text: ''
      },
      rate_work_course_stds: [],
      addrate_work_course_std: {},
      editrate_work_course_std: {},
      search: '',
      pagination: {},      
      headers: [
        { text: "หลักสูตรปีการศึกษา", align: "center", value: "year_course" },
        { text: "รหัสประเภทวิชา", align: "center", value: "id_type_course" },              
        { text: "ประเภทวิชา", align: "left", value: "type_course" },
        { text: "รหัสสาขาวิชา", align: "left", value: "id_course_branch" },     
        { text: "ชื่อสาขาวิชา", align: "left", value: "branch_name_th" },     
        { text: "ชื่อสาขาวิชา-ENG", align: "left", value: "branch_name_eng" },     
        { text: "รหัสสาขางาน", align: "left", value: "id_course_branch_sub" },     
        { text: "ชื่อสาขางาน", align: "left", value: "branch_sub_name_th" },     
        { text: "ชื่อสาขางาน-ENG", align: "left", value: "branch_sub_name_eng" },     
        /* { text: "แก้ไข", align: "center", value: "actions", icon: "mdi-file-document-edit" },
        { text: "ลบ", align: "center", value: "action_s" , icon: "mdi-delete-forever" }, */
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
       rate_work_course_stdstatus:[],
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

      this.rate_work_course_stdQueryAll()
      
          },
    methods: {
      async rate_work_course_stdQueryAll() {
          this.loading = true
        let result = await this.$http.post('rate_work_course_std.php', {
          ApiKey: this.ApiKey
        }).finally(() => this.loading = false)
        this.rate_work_course_stds = result.data
      },
       async rate_work_course_stdAdd() {
      this.addrate_work_course_std = {};
      this.addrate_work_course_stddialog = true;
    },
      async addrate_work_course_stdSubmit() {
        if (this.$refs.addrate_work_course_stdform.validate()) {         
          this.addrate_work_course_std.ApiKey = this.ApiKey;
          let result = await this.$http.post('rate_work_course_std.insert.php', this.addrate_work_course_std)        
          if (result.data.status == true) {
            this.rate_work_course_std = result.data
            this.snackbar.icon = 'mdi-font-awesome'
            this.snackbar.color = 'success'
            this.snackbar.text = 'บันทึกข้อมูลเรียบร้อย'
            this.snackbar.show = true
            this.rate_work_course_stdQueryAll()
          } else {
            this.snackbar.icon = 'mdi-close-network'
            this.snackbar.color = 'red'
            this.snackbar.text = 'บันทึกข้อมูลผิดพลาด'
            this.snackbar.show = true
             this.rate_work_course_stdQueryAll()
          }
          this.addrate_work_course_stddialog = false
        }
      },
      async rate_work_course_stdEdit(id_rp) {
        let result = await this.$http.post('rate_work_course_std.php', {
          ApiKey: this.ApiKey,
          id_rp: id_rp
        })
        this.editrate_work_course_std = result.data      
        this.editrate_work_course_stddialog = true
      },
      async editrate_work_course_stdSubmit() {
        if (this.$refs.editrate_work_course_stdform.validate()) {
          this.editrate_work_course_std.ApiKey = this.ApiKey;         
          let result = await this.$http.post('rate_work_course_std.update.php', this.editrate_work_course_std)
          if (result.data.status == true) {
            this.rate_work_course_std = result.data
            this.snackbar.icon = 'mdi-font-awesome'
            this.snackbar.color = 'success'
            this.snackbar.text = 'แก้ไขข้อมูลเรียบร้อย'
            this.snackbar.show = true
            this.rate_work_course_stdQueryAll()
          } else {
            this.snackbar.icon = 'mdi-close-network'
            this.snackbar.color = 'red'
            this.snackbar.text = 'แก้ไขข้อมูลผิดพลาด'
            this.snackbar.show = true
          }
          this.editrate_work_course_stddialog = false
        }
      },
      async rate_work_course_stdDelete(id_rp) {
        let result = await this.$http.post('rate_work_course_std.php', {
          ApiKey: this.ApiKey,
          id_rp: id_rp
        })
        this.editrate_work_course_std = result.data
        this.deleterate_work_course_stddialog = true
      },
      async deleterate_work_course_stdSubmit() {
        if (this.$refs.deleterate_work_course_stdform.validate()) {
          this.editrate_work_course_std.ApiKey = this.ApiKey;
          let result = await this.$http.post('rate_work_course_std.delete.php', this.editrate_work_course_std)
          if (result.data.status == true) {
            this.rate_work_course_std = result.data
            this.snackbar.icon = 'mdi-font-awesome'
            this.snackbar.color = 'success'
            this.snackbar.text = 'ลบข้อมูลเรียบร้อย'
            this.snackbar.show = true
            this.rate_work_course_stdQueryAll()
          } else {
            this.snackbar.icon = 'mdi-close-network'
            this.snackbar.color = 'red'
            this.snackbar.text = 'ลบข้อมูลผิดพลาด'
            this.snackbar.show = true
          }
          this.deleterate_work_course_stddialog = false
        }
      },     
    },
    computed: {
      pages() {
        if (this.pagination.rowsPerPage == null ||
          this.pagination.totalItems == null
        ) return 0

        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      },
        color() {
      return "blue darken-4";
    }
    },

  

 

  
}
</script>
