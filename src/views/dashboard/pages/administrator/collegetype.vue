<template>
  <div>
      
    <v-container>
    <base-material-card
        icon="mdi-clipboard-text"
        title="ข้อมูลประเภทสถานศึกษา"
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
                @click.native="collegetypeAdd()"
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
          :items="collegetypes"
          :search="search"
          :class="elevation - 3" 
       > 

         <template v-slot:[`item.actions`]="{ item }">
            <v-icon
              color="yellow"
              :elevation="hover ? 24 : 6"
              @click.stop="collegetypeEdit(item.collegetype_ID)"
            >
              mdi-pencil
            </v-icon>          
          </template>
            <template v-slot:[`item.action_s`]="{ item }">            
            <v-icon
              color="red"
              :elevation="hover ? 24 : 6"
              @click.stop="collegetypeDelete(item.collegetype_ID)"
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

      <!--addcollegetypedialog  -->
      <v-layout row justify-center>
        <v-dialog v-model="addcollegetypedialog" persistent max-width="50%">
          <v-card class="mx-auto pa-5" :elevation="hover ? 24 : 6">
            <base-material-card
              icon="mdi-account-multiple"
              title="เพิ่มข้อมูลประเภทสถานศึกษา"
              class="px-5 py-3 text_google"
              :elevation="hover ? 24 : 6"
            >
            </base-material-card>

            <v-card-text>
             <v-form ref="addcollegetypeform" lazy-validation>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex md12>
                    <v-text-field label="ชื่อประเภทสถานศึกษา" v-model="addcollegetype.collegetype_name" required :rules="[v => !!v || '']"></v-text-field>
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
                @click.stop="addcollegetypedialog = false"
                round
                ><v-icon dark>mdi-close</v-icon> ยกเลิก</v-btn
              >
              <v-btn
                large
                color="success"
                @click.stop="addcollegetypeSubmit()"
                round
              >
                <v-icon dark>mdi-content-save</v-icon>&nbsp;&nbsp;บันทึก
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model deletecollegetypedialog -->
      <v-layout>
        <v-dialog v-model="deletecollegetypedialog" persistent max-width="40%">
          <v-card class="mx-auto pa-5" :elevation="hover ? 24 : 6">                     
             <base-material-card
              color="error"
              icon="mdi-delete"
              title="ลบข้อมูลประเภทสถานศึกษา"
              class="px-5 py-3 text_google"
              :elevation="hover ? 24 : 6"
             
            >
            </base-material-card>

            <v-card-text class="text_google">
              
        <v-card>        
          <v-card-text>
            <v-form ref="deletecollegetypeform" lazy-validation>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    ยืนยันการลบข้อมูลประเภทสถานศึกษา {{ editcollegetype.collegetype_name }}
                  </v-flex>                                
                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>        
        </v-card>
    
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn large flat @click.stop="deletecollegetypedialog = false"
                ><v-icon dark>mdi-close</v-icon>ยกเลิก</v-btn
              >
              <v-btn large
                color="red darken-3"
                @click.stop="deletecollegetypeSubmit()"
                dark
              >
                <v-icon dark>mdi-delete</v-icon>&nbsp;ลบ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model editcollegetypedialog -->
      <v-layout row justify-center>
         <v-dialog v-model="editcollegetypedialog" persistent max-width="80%">
        <v-card class="mx-auto pa-6" :elevation="hover ? 24 : 6">
           <base-material-card
              color="yellow"
              icon="mdi-clipboard-text"
              title="แก้ไขข้อมูลผู้ใช้งานระบบ"
              class="px-5 py-3 text_google"
              :elevation="hover ? 24 : 6"
            ></base-material-card>
          <v-card-text>
            <v-form ref="editcollegetypeform" lazy-validation>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex md12>
                    <v-text-field label="ชื่อประเภทสถานศึกษา" v-model="editcollegetype.collegetype_name" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
              <small>* จำเป็น</small>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn large flat @click.stop="editcollegetypedialog = false" round>
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn large color="warning" @click.stop="editcollegetypeSubmit()" round>
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
       loading: true,       
     ApiKey: 'HRvec2021',
      valid: true,
      addcollegetypedialog: false,
      editcollegetypedialog: false,
      deletecollegetypedialog: false,
      snackbar: {
        show: false,
        color: '',
        timeout: 5000,
        icon: '',
        text: ''
      },
      collegetypes: [],
      addcollegetype: {},
      editcollegetype: {},
      search: '',
      pagination: {},      
      headers: [       
        { text: "ชื่อประเภท", align: "left", value: "collegetype_name" }, 
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
     collegetypestatus:[],
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

      this.collegetypeQueryAll()      
    },
    methods: {
      async collegetypeQueryAll() {
          this.loading = true
        let result = await this.$http.post('collegetype.php', {
          ApiKey: this.ApiKey
        }).finally(() => this.loading = false)
        this.collegetypes = result.data
      },
       async collegetypeAdd() {
      this.addcollegetype = {};
      this.addcollegetypedialog = true;
    },
      async addcollegetypeSubmit() {
        if (this.$refs.addcollegetypeform.validate()) {         
          this.addcollegetype.ApiKey = this.ApiKey;
          let result = await this.$http.post('collegetype.insert.php', this.addcollegetype)        
          if (result.data.status == true) {
            this.collegetype = result.data
            this.snackbar.icon = 'mdi-font-awesome'
            this.snackbar.color = 'success'
            this.snackbar.text = 'บันทึกข้อมูลเรียบร้อย'
            this.snackbar.show = true
            this.collegetypeQueryAll()
          } else {
            this.snackbar.icon = 'mdi-close-network'
            this.snackbar.color = 'red'
            this.snackbar.text = 'บันทึกข้อมูลผิดพลาด'
            this.snackbar.show = true
             this.collegetypeQueryAll()
          }
          this.addcollegetypedialog = false
        }
      },
      async collegetypeEdit(collegetype_ID) {
        let result = await this.$http.post('collegetype.php', {
          ApiKey: this.ApiKey,
          collegetype_ID: collegetype_ID
        })
        this.editcollegetype = result.data
        this.editcollegetype.collegetype_password = ''
        this.editcollegetypedialog = true
      },
      async editcollegetypeSubmit() {
        if (this.$refs.editcollegetypeform.validate()) {
          this.editcollegetype.ApiKey = this.ApiKey;
          if(this.editcollegetype.collegetype_password == '')
            delete this.editcollegetype.collegetype_password
          let result = await this.$http.post('collegetype.update.php', this.editcollegetype)
          if (result.data.status == true) {
            this.collegetype = result.data
            this.snackbar.icon = 'mdi-font-awesome'
            this.snackbar.color = 'success'
            this.snackbar.text = 'แก้ไขข้อมูลเรียบร้อย'
            this.snackbar.show = true
            this.collegetypeQueryAll()
          } else {
            this.snackbar.icon = 'mdi-close-network'
            this.snackbar.color = 'red'
            this.snackbar.text = 'แก้ไขข้อมูลผิดพลาด'
            this.snackbar.show = true
          }
          this.editcollegetypedialog = false
        }
      },
      async collegetypeDelete(collegetype_ID) {
        let result = await this.$http.post('collegetype.php', {
          ApiKey: this.ApiKey,
          collegetype_ID: collegetype_ID
        })
        this.editcollegetype = result.data
        this.deletecollegetypedialog = true
      },
      async deletecollegetypeSubmit() {
        if (this.$refs.deletecollegetypeform.validate()) {
          this.editcollegetype.ApiKey = this.ApiKey;
          if(this.editcollegetype.collegetype_status == 'D')
            await this.$http.post('committee.delete.php', {
              ApiKey: this.ApiKey,
              collegetype_ID: this.editcollegetype.collegetype_ID
            })
          let result = await this.$http.post('collegetype.delete.php', this.editcollegetype)
          if (result.data.status == true) {
            this.collegetype = result.data
            this.snackbar.icon = 'mdi-font-awesome'
            this.snackbar.color = 'success'
            this.snackbar.text = 'ลบข้อมูลเรียบร้อย'
            this.snackbar.show = true
            this.collegetypeQueryAll()
          } else {
            this.snackbar.icon = 'mdi-close-network'
            this.snackbar.color = 'red'
            this.snackbar.text = 'ลบข้อมูลผิดพลาด'
            this.snackbar.show = true
          }
          this.deletecollegetypedialog = false
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
