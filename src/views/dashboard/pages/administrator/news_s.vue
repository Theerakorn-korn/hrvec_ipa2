<template>
  <div>
      
    <v-container>
    <base-material-card
        icon="mdi-clipboard-text"
        title="ข้อมูลข่าวสารประชาสัมพันธ์"
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
                @click.native="news_sAdd()"
              >
                <v-icon>mdi-plus-circle-outline</v-icon>เพิ่มรายการ
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
        <v-data-table
          color="success"
          :loading="loading"
          :headers="headers"
          :items="news_ss"
          :search="search"          
       > 

         <template v-slot:[`item.actions`]="{ item }">
            <v-icon
              color="yellow"
              
              @click.stop="news_sEdit(item.id_new)"
            >
              mdi-pencil
            </v-icon>          
          </template>
            <template v-slot:[`item.action_s`]="{ item }">            
            <v-icon
              color="red"
              
              @click.stop="news_sDelete(item.id_new)"
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

      <!--addnews_sdialog  -->
      <v-layout row justify-center>
        <v-dialog v-model="addnews_sdialog" persistent max-width="50%">
          <v-card class="mx-auto pa-5" >
            <base-material-card
              icon="mdi-account-multiple"
              title="เพิ่มข้อมูลข่าวสารประชาสัมพันธ์"
              class="px-5 py-3 text_google"
              
            >
            </base-material-card>

            <v-card-text>
             <v-form ref="addnews_sform" lazy-validation>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex md12>
                    <v-text-field label="หัวข้อ" v-model="addnews_s.topic_s" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>
                    <v-flex md12>
                    <v-text-field label="รายละเอียด" v-model="addnews_s.detail_s" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>
                    <v-flex xs12>                   
                    เลือกไฟล์ : PDF
                    <input type="file" ref="file2" id="file2">
                  </v-flex> 
                    <v-flex md12>
                    <v-text-field type="date"  label="วันที่" v-model="addnews_s.date_times" required :rules="[v => !!v || '']"></v-text-field>
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
                @click.stop="addnews_sdialog = false"
                rounded
                ><v-icon dark>mdi-close</v-icon> ยกเลิก</v-btn
              >
              <v-btn
                large
                color="success"
                @click.stop="addnews_sSubmit()"
                rounded
              >
                <v-icon dark>mdi-content-save</v-icon>&nbsp;&nbsp;บันทึก
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model deletenews_sdialog -->
      <v-layout>
        <v-dialog v-model="deletenews_sdialog" persistent max-width="40%">
          <v-card class="mx-auto pa-5" >                     
             <base-material-card
              color="error"
              icon="mdi-delete"
              title="ลบข้อมูลข่าวสารประชาสัมพันธ์"
              class="px-5 py-3 text_google"
              
             
            >
            </base-material-card>

            <v-card-text class="text_google">
              
        <v-card>        
          <v-card-text>
            <v-form ref="deletenews_sform" lazy-validation>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    ยืนยันการลบข้อมูลข่าวสารประชาสัมพันธ์ {{ editnews_s.topic_s }}
                  </v-flex>                                
                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>        
        </v-card>
    
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn large  @click.stop="deletenews_sdialog = false"
                ><v-icon dark>mdi-close</v-icon>ยกเลิก</v-btn
              >
              <v-btn large
                color="red darken-3"
                @click.stop="deletenews_sSubmit()"
                dark
              >
                <v-icon dark>mdi-delete</v-icon>&nbsp;ลบ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model editnews_sdialog -->
      <v-layout row justify-center>
         <v-dialog v-model="editnews_sdialog" persistent max-width="80%">
        <v-card class="mx-auto pa-6" >
           <base-material-card
              color="yellow"
              icon="mdi-clipboard-text"
              title="แก้ไขข้อมูลผู้ใช้งานระบบ"
              class="px-5 py-3 text_google"
              
            ></base-material-card>
          <v-card-text>
            <v-form ref="editnews_sform" lazy-validation>
              <v-container grid-list-md>
                <v-layout wrap>  
                   <v-flex md12>
                    <v-text-field label="หัวข้อ" v-model="editnews_s.topic_s" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>
                    <v-flex md12>
                    <v-text-field label="รายละเอียด" v-model="editnews_s.detail_s" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>
                  <v-flex xs12>                   
                    เลือกไฟล์ : PDF
                    <input type="file" ref="file2" id="file2">
                  </v-flex> 
                    <v-flex md12>
                    <v-text-field type="date"  label="วันที่" v-model="editnews_s.date_times" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>             


                </v-layout>
              </v-container>
              <small>* จำเป็น</small>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn large  @click.stop="editnews_sdialog = false" rounded>
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn large color="warning" @click.stop="editnews_sSubmit()" rounded>
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
      addnews_sdialog: false,
      editnews_sdialog: false,
      deletenews_sdialog: false,
      snackbar: {
        show: false,
        color: '',
        timeout: 5000,
        icon: '',
        text: ''
      },
      news_ss: [],
      addnews_s: {},
      editnews_s: {},
      search: '',
      pagination: {},      
      headers: [       
        { text: "หัวข้อ", align: "left", value: "topic_s" }, 
        { text: "รายละเอียด", align: "left", value: "detail_s" }, 
        { text: "ไฟล์แนบ", align: "left", value: "link_file" }, 
        { text: "วันที่", align: "left", value: "date_times" }, 
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
     news_sstatus:[],
      regions: [],
      region_ena: true
    };
  },
async mounted() {     
      this.news_sQueryAll()      
    },
    methods: {
      async news_sQueryAll() {
          this.loading = true
        let result = await this.$http.post('news_s.php', {
          ApiKey: this.ApiKey
        }).finally(() => this.loading = false)
        this.news_ss = result.data
      },

       async news_sAdd() {
      this.addnews_s = {};
      this.addnews_sdialog = true;
    },


      async addnews_sSubmit() {
          let result = ''  
            let uploaded = null
            
      if (this.$refs.file2.files[0]) {
          if (this.$refs.file2.files[0].type != '') {
            let formData = new FormData()
            let filename = this.addnews_s.topic_s + '.' + 'new.pdf'
            formData.append('file', this.$refs.file2.files[0])
            formData.append('filename', '../HRvecfiles/'+filename)
            formData.append('ApiKey', this.ApiKey)
            result = await this.$http.post('uploadfile.php', formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
            if (result.data.status == true){                
              this.addnews_s.link_file = filename 
            }
            uploaded = true         
          } else {
            uploaded = false
          }
        }     
          this.addnews_s.ApiKey = this.ApiKey        
          result = await this.$http.post('news_s.insert.php', this.addnews_s) 
          if (result.data.status || uploaded) {
            await this.news_sQueryAll()
            this.snackbar.icon = 'mdi-font-awesome'
            this.snackbar.color = 'success'
            this.snackbar.text = 'บันทึกข้อมูลเรียบร้อย'
            this.snackbar.show = true          
          } else {
           if (!uploaded) {
            this.snackbar.icon = 'mdi-close-network'
            this.snackbar.color = 'red'
            this.snackbar.text = 'ไฟล์ที่แนบไม่ถูกต้อง กรุณาแนบไฟล์เป็น jpg หรือ jpeg เท่านั้น'
            this.snackbar.show = true
          } else {
            this.snackbar.icon = 'mdi-close-network'
            this.snackbar.color = 'red'
            this.snackbar.text = 'บันทึกข้อมูลผิดพลาด'
            this.snackbar.show = true
          }
          }
          this.addnews_sdialog = false
     
      },
      async news_sEdit(id_new) {
        let result = await this.$http.post('news_s.php', {
          ApiKey: this.ApiKey,
          id_new: id_new
        })
        this.editnews_s = result.data       
        this.editnews_sdialog = true
      },
      async editnews_sSubmit() {
        if (this.$refs.editnews_sform.validate()) {
          this.editnews_s.ApiKey = this.ApiKey;         
          let result = await this.$http.post('news_s.update.php', this.editnews_s)
          if (result.data.status == true) {
            this.news_s = result.data
            this.snackbar.icon = 'mdi-font-awesome'
            this.snackbar.color = 'success'
            this.snackbar.text = 'แก้ไขข้อมูลเรียบร้อย'
            this.snackbar.show = true
            this.news_sQueryAll()
          } else {
            this.snackbar.icon = 'mdi-close-network'
            this.snackbar.color = 'red'
            this.snackbar.text = 'แก้ไขข้อมูลผิดพลาด'
            this.snackbar.show = true
          }
          this.editnews_sdialog = false
        }
      },
      async news_sDelete(id_new) {        
        let result = await this.$http.post('news_s.php', {
          ApiKey: this.ApiKey,
          id_new: id_new
        })
        this.editnews_s = result.data
        this.deletenews_sdialog = true
      },
      async deletenews_sSubmit() {
         let result_delete = await this.$http.post('deletefile.php', {
          ApiKey: this.ApiKey,
          filename: '../HRvecfiles/'+this.editnews_s.link_file
        })
        if (this.$refs.deletenews_sform.validate()) {
          this.editnews_s.ApiKey = this.ApiKey;       
          let result = await this.$http.post('news_s.delete.php', this.editnews_s)
          if (result.data.status == true) {
            this.news_s = result.data
            this.snackbar.icon = 'mdi-font-awesome'
            this.snackbar.color = 'success'
            this.snackbar.text = 'ลบข้อมูลเรียบร้อย'
            this.snackbar.show = true
            this.news_sQueryAll()
          } else {
            this.snackbar.icon = 'mdi-close-network'
            this.snackbar.color = 'red'
            this.snackbar.text = 'ลบข้อมูลผิดพลาด'
            this.snackbar.show = true
          }
          this.deletenews_sdialog = false
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
