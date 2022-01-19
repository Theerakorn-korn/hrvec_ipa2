<template>
  <div>
      
    <v-container>
    <base-material-card
        icon="mdi-clipboard-text"
        title="สาขาวิชา"
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
                @click.native="branchAdd()"
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
          :items="branchs"
          :search="search"
       > 

         <template v-slot:[`item.actions`]="{ item }">
            <v-icon
              color="yellow"
              
              @click.stop="branchEdit(item.id_rp)"
            >
              mdi-pencil
            </v-icon>          
          </template>
            <template v-slot:[`item.action_s`]="{ item }">            
            <v-icon
              color="red"
              
              @click.stop="branchDelete(item.id_rp)"
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

      <!--addbranchdialog  -->
      <v-layout row justify-center>
        <v-dialog v-model="addbranchdialog" persistent max-width="50%">
          <v-card class="mx-auto pa-5" >
            <base-material-card
              icon="mdi-account-multiple"
              title="เพิ่มข้อมูลสาขาวิชาเอก"
              class="px-5 py-3 text_google"
              
            >
            </base-material-card>

            <v-card-text>
            <v-form ref="addbranchform" lazy-validation>
              <v-container grid-list-md>
                <v-layout wrap>   
                      <v-flex md6>
                    <v-text-field label="รหัส" v-model="addbranch.id_branch" require :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>                                 
                  <v-flex md6>
                    <v-text-field label="สาขาวิชาเอก" v-model="addbranch.name_branch" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>                 
                  <v-flex md12>
                    <v-textarea label="รายละเอียด" v-model="addbranch.detail_branch" require :rules="[v => !!v || '']"></v-textarea>
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
                @click.stop="addbranchdialog = false"
                rounded
                ><v-icon dark>mdi-close</v-icon> ยกเลิก</v-btn
              >
              <v-btn
                large
                color="success"
                @click.stop="addbranchSubmit()"
                rounded
              >
                <v-icon dark>mdi-content-save</v-icon>&nbsp;&nbsp;บันทึก
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model deletebranchdialog -->
      <v-layout>
        <v-dialog v-model="deletebranchdialog" persistent max-width="80%">
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
            <v-form ref="deletebranchform" lazy-validation>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    ยืนยันการลบข้อมูลสาขาวิชาเอก {{ editbranch.name_branch }} 
                  </v-flex>                                 
                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>        
        </v-card>
    
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn large  @click.stop="deletebranchdialog = false"
                ><v-icon dark>mdi-close</v-icon>ยกเลิก</v-btn
              >
              <v-btn large
                color="red darken-3"
                @click.stop="deletebranchSubmit()"
                dark
              >
                <v-icon dark>mdi-delete</v-icon>&nbsp;ลบ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model editbranchdialog -->
      <v-layout row justify-center>
         <v-dialog v-model="editbranchdialog" persistent max-width="80%">
        <v-card class="mx-auto pa-6" >
           <base-material-card
              color="yellow"
              icon="mdi-clipboard-text"
              title="แก้ไขข้อมูลสาขาวิชา"
              class="px-5 py-3 text_google"
              
            ></base-material-card>
          <v-card-text>
            <v-form ref="editbranchform" lazy-validation>
              <v-container grid-list-md>
                <v-layout wrap>                
                   <v-flex md6>
                    <v-text-field label="รหัส" v-model="editbranch.id_branch" require :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>                                 
                  <v-flex md6>
                    <v-text-field label="สาขาวิชาเอก" v-model="editbranch.name_branch" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>                 
                  <v-flex md12>
                    <v-textarea label="รายละเอียด" v-model="editbranch.detail_branch" require :rules="[v => !!v || '']"></v-textarea>
                  </v-flex>           

                </v-layout>
              </v-container>            
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn large  @click.stop="editbranchdialog = false" rounded>
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn large color="warning" @click.stop="editbranchSubmit()" rounded>
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
      addbranchdialog: false,
      editbranchdialog: false,
      deletebranchdialog: false,
      snackbar: {
        show: false,
        color: '',
        timeout: 5000,
        icon: '',
        text: ''
      },
      branchs: [],
      addbranch: {},
      editbranch: {},
      search: '',
      pagination: {},      
      headers: [
        { text: "รหัสรายการ", align: "center", value: "id_rp" },
        { text: "รหัสสาขา", align: "center", value: "id_branch" },              
        { text: "ชื่อสาขาวิชา", align: "left", value: "name_branch" },
        { text: "รายละเอียด", align: "left", value: "detail_branch" },     
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
       branchstatus:[],
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

      this.branchQueryAll()
      
          },
    methods: {
      async branchQueryAll() {
          this.loading = true
        let result = await this.$http.post('branch.php', {
          ApiKey: this.ApiKey
        }).finally(() => this.loading = false)
        this.branchs = result.data
      },
       async branchAdd() {
      this.addbranch = {};
      this.addbranchdialog = true;
    },
      async addbranchSubmit() {
        if (this.$refs.addbranchform.validate()) {         
          this.addbranch.ApiKey = this.ApiKey;
          let result = await this.$http.post('branch.insert.php', this.addbranch)        
          if (result.data.status == true) {
            this.branch = result.data
            this.snackbar.icon = 'mdi-font-awesome'
            this.snackbar.color = 'success'
            this.snackbar.text = 'บันทึกข้อมูลเรียบร้อย'
            this.snackbar.show = true
            this.branchQueryAll()
          } else {
            this.snackbar.icon = 'mdi-close-network'
            this.snackbar.color = 'red'
            this.snackbar.text = 'บันทึกข้อมูลผิดพลาด'
            this.snackbar.show = true
             this.branchQueryAll()
          }
          this.addbranchdialog = false
        }
      },
      async branchEdit(id_rp) {
        let result = await this.$http.post('branch.php', {
          ApiKey: this.ApiKey,
          id_rp: id_rp
        })
        this.editbranch = result.data      
        this.editbranchdialog = true
      },
      async editbranchSubmit() {
        if (this.$refs.editbranchform.validate()) {
          this.editbranch.ApiKey = this.ApiKey;         
          let result = await this.$http.post('branch.update.php', this.editbranch)
          if (result.data.status == true) {
            this.branch = result.data
            this.snackbar.icon = 'mdi-font-awesome'
            this.snackbar.color = 'success'
            this.snackbar.text = 'แก้ไขข้อมูลเรียบร้อย'
            this.snackbar.show = true
            this.branchQueryAll()
          } else {
            this.snackbar.icon = 'mdi-close-network'
            this.snackbar.color = 'red'
            this.snackbar.text = 'แก้ไขข้อมูลผิดพลาด'
            this.snackbar.show = true
          }
          this.editbranchdialog = false
        }
      },
      async branchDelete(id_rp) {
        let result = await this.$http.post('branch.php', {
          ApiKey: this.ApiKey,
          id_rp: id_rp
        })
        this.editbranch = result.data
        this.deletebranchdialog = true
      },
      async deletebranchSubmit() {
        if (this.$refs.deletebranchform.validate()) {
          this.editbranch.ApiKey = this.ApiKey;
          let result = await this.$http.post('branch.delete.php', this.editbranch)
          if (result.data.status == true) {
            this.branch = result.data
            this.snackbar.icon = 'mdi-font-awesome'
            this.snackbar.color = 'success'
            this.snackbar.text = 'ลบข้อมูลเรียบร้อย'
            this.snackbar.show = true
            this.branchQueryAll()
          } else {
            this.snackbar.icon = 'mdi-close-network'
            this.snackbar.color = 'red'
            this.snackbar.text = 'ลบข้อมูลผิดพลาด'
            this.snackbar.show = true
          }
          this.deletebranchdialog = false
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
