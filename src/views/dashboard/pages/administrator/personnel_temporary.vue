<template>
  <div>
      
    <v-container>
    <base-material-card
        icon="mdi-clipboard-text"
        title="ข้าราชการครูและบุคลากรทางการศึกษา"
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
                @click.native="personnel_temporaryAdd()"
              >
                <v-icon>mdi-plus-circle-outline</v-icon>เพื่อรายการ
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
       <v-data-table :headers="headers" :items="personnel_temporarys" :search="search" :rows-per-page-items="rowsperpage" :pagination.sync="pagination"
              class="elevation-1">
              <template v-slot:[`item.id_rc`]="{ item }">  
         {{ item.id_rc }}
          </template>       
               <template v-slot:[`item.college_code`]="{ item }">  
         {{ item.college_name }}
          </template>
          <template v-slot:[`item.title_s`]="{ item }">  
         {{ item.title_s }} {{ item.frist_name }} {{ item.last_name }}
          </template>
          <template v-slot:[`item.brith_day`]="{ item }">  
         {{ item.brith_day }}/{{ item.brith_month }}/{{ item.brith_year }}
          </template>
            <template v-slot:[`item.appoin_day`]="{ item }">  
         {{ item.appoin_day }}/{{ item.appoin_month }}/{{ item.appoin_year }}
          </template>
               <template v-slot:[`item.actions`]="{ item }">
            <v-icon
              color="yellow"
              :elevation="hover ? 24 : 6"
              @click.stop="personnel_temporaryEdit(item.id_rc)"
            >
              mdi-pencil
            </v-icon>          
          </template>
            <template v-slot:[`item.action_s`]="{ item }">            
            <v-icon
              color="red"
              :elevation="hover ? 24 : 6"
              @click.stop="personnel_temporaryDelete(item.id_rc)"
            >
              mdi-delete
            </v-icon>
          </template>
              <v-alert slot="no-results" :value="true" color="error" icon="warning">
                Your search for "{{ search }}" found no results.
              </v-alert>
            </v-data-table>
      </base-material-card>

      <!--addpersonnel_temporarydialog  -->
      <v-layout row justify-center>
        <v-dialog v-model="addpersonnel_temporarydialog" persistent max-width="50%">
          <v-card class="mx-auto pa-5" :elevation="hover ? 24 : 6">
            <base-material-card
              icon="mdi-account-multiple"
              title="เพิ่มข้อมูลข้าราชการครูและบุคลากรทางการศึกษา"
              class="px-5 py-3 text_google"
              :elevation="hover ? 24 : 6"
            >
            </base-material-card>

            <v-card-text>
            <v-form ref="addpersonnel_temporaryform" lazy-validation>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex md6>
                    <v-select :items="userstatus"  item-text="user_status_name" item-value="user_status_sub" v-model="addpersonnel_temporary.personnel_temporary_status" label="Type" required
                      :rules="[v => !!v || '']"></v-select>
                  </v-flex>         
                   <v-flex xs12 v-if="addpersonnel_temporary.personnel_temporary_status == 'E' || addpersonnel_temporary.personnel_temporary_status == 'T'">
                    <v-autocomplete :items="colleges" item-text="college_name" item-value="college_code" v-model="addpersonnel_temporary.college_code" label="สถานศึกษา"
                      required :rules="[v => !!v || '']">                      
                      </v-autocomplete>                    
                  </v-flex>         
                  <v-flex md6>
                    <v-text-field label="รหัสบัตรประชาชน" v-model="addpersonnel_temporary.id_card" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>
                  <v-flex md6>

                  </v-flex>
                  <v-flex md6>
                    <v-text-field label="คำนำหน้าชื่อ" v-model="addpersonnel_temporary.title_s" require :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>                 
                  <v-flex xs12>
                    <v-divider></v-divider>
                  </v-flex>
                  <v-flex md6>
                    <v-text-field label="ชื่อ" v-model="addpersonnel_temporary.frist_name" require :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>
                  <v-flex md6>
                    <v-text-field label="นามสกุล" v-model="addpersonnel_temporary.last_name" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>
                              <v-flex md6>
                    <v-autocomplete :items="position_names" item-text="text" item-value="value" label="ตำแหน่ง" v-model="addpersonnel_temporary.position_name" required :rules="[v => !!v || '']"></v-autocomplete>
                  </v-flex>
                               <v-flex md6>
                    <v-autocomplete :items="man_powers" item-text="id_position" item-value="id_position" label="เลขที่ตำแหน่ง" v-model="addpersonnel_temporary.id_position" required :rules="[v => !!v || '']"></v-autocomplete>
                  </v-flex>
                               <v-flex md6>
                    <v-autocomplete :items="rang_names" item-text="text" item-value="value" label="วิทยฐานะ" v-model="addpersonnel_temporary.rang_name" required :rules="[v => !!v || '']"></v-autocomplete>
                  </v-flex>
                               <v-flex md6>
                    <v-select :items="rang_levels" label="ระดับ" v-model="addpersonnel_temporary.rang_level" required :rules="[v => !!v || '']"></v-select>
                  </v-flex>
                               <v-flex md6>
                    <v-text-field label="คุณวิฒิ" v-model="addpersonnel_temporary.ed_abb" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>
                             <v-flex md6>
                    <v-text-field label="สาขาวิชา" v-model="addpersonnel_temporary.ed_name" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>
                     <v-flex md6>
        <v-menu
          ref="menu1"
          v-model="menu1"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="addpersonnel_temporary.birthday"
              label="วันเดือนปีเกิด"
              hint="MM/DD/YYYY format"
              persistent-hint
              prepend-icon="mdi-calendar"
              v-bind="attrs"
              @blur="date = parseDate(addpersonnel_temporary.birthday)"
              v-on="on"
              required :rules="[v => !!v || '']"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date"
            locale="th"
            no-title
            @input="menu1 = false"
          ></v-date-picker>
        </v-menu>        
                  <span>ปีเกิด : {{ parseInt(reversedYearbrith)+543 }} เดือนเกิด {{ parseInt(reversedMonthbrith) }} </span>
                   
                  </v-flex>
                     <v-flex md6>
                     <v-menu
          ref="menu1"
          v-model="menu1"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="addpersonnel_temporary.date_appoinment"
              label="วันเดือนปีบรรจุ"
              hint="MM/DD/YYYY format"
              persistent-hint
              prepend-icon="mdi-calendar"
              v-bind="attrs"
              @blur="date_t = parseDate_t(addpersonnel_temporary.date_appoinment)"
              v-on="on"
              required :rules="[v => !!v || '']"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date_t"
            locale="th"
            no-title
            @input="menu1 = false"
          ></v-date-picker>
        </v-menu>        
                   ปีที่บรรจุ : {{ parseInt(reversedYearadd)+543  }} 
                  </v-flex>
                     <v-flex md6>
                    <v-text-field label="ปีที่เกษียณ" v-model="addpersonnel_temporary.retrire_year" required :rules="[v => !!v || '']">  
                     
                    </v-text-field>
                   <span>ปีเกษียณ : </span>  
                   <span v-if="parseInt(reversedMonthbrith) >= 10"> {{ parseInt(parseInt(reversedYearbrith)+543)+61 }} </span>                 
                   <span v-if="parseInt(reversedMonthbrith) < 10"> {{ parseInt(parseInt(reversedYearbrith)+543)+60 }} </span>         
                  </v-flex>                
                  <v-flex md6>
                    <v-text-field label="เบอร์โทร" v-model="addpersonnel_temporary.tel_p" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>
                   <v-flex md6>
                    <v-text-field label="E-mail" v-model="addpersonnel_temporary.e_mail" required :rules="[v => !!v || '']"></v-text-field>
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
                @click.stop="addpersonnel_temporarydialog = false"
                rounded
                ><v-icon dark>mdi-close</v-icon> ยกเลิก</v-btn
              >
              <v-btn
                large
                color="success"
                @click.stop="addpersonnel_temporarySubmit()"
                rounded
              >
                <v-icon dark>mdi-content-save</v-icon>&nbsp;&nbsp;บันทึก
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model deletepersonnel_temporarydialog -->
      <v-layout>
        <v-dialog v-model="deletepersonnel_temporarydialog" persistent max-width="40%">
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
            <v-form ref="deletepersonnel_temporaryform" lazy-validation>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    ยืนยันการลบข้อมูลผู้ใช้ {{ editpersonnel_temporary.college_code }} <span v-if="editpersonnel_temporary.college_name">{{ editpersonnel_temporary.college_name }}</span>
                  </v-flex>                                 
                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>        
        </v-card>
    
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn large flat @click.stop="deletepersonnel_temporarydialog = false"
                ><v-icon dark>mdi-close</v-icon>ยกเลิก</v-btn
              >
              <v-btn large
                color="red darken-3"
                @click.stop="deletepersonnel_temporarySubmit()"
                dark
              >
                <v-icon dark>mdi-delete</v-icon>&nbsp;ลบ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model editpersonnel_temporarydialog -->
      <v-layout row justify-center>
         <v-dialog v-model="editpersonnel_temporarydialog" persistent max-width="80%">
        <v-card class="mx-auto pa-6" :elevation="hover ? 24 : 6">
           <base-material-card
              color="yellow"
              icon="mdi-clipboard-text"
              title="แก้ไขข้อมูลผู้ใช้งานระบบ"
              class="px-5 py-3 text_google"
              :elevation="hover ? 24 : 6"
            ></base-material-card>
          <v-card-text>
            <v-form ref="editpersonnel_temporaryform" lazy-validation>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex md6>
                    <v-select :items="personnel_temporarystatus" item-text="text" item-value="value" v-model="editpersonnel_temporary.personnel_temporary_status" label="personnel_temporary Type" required
                      :rules="[v => !!v || '']"></v-select>
                  </v-flex>
                  <v-flex md6>
                    <v-text-field label="personnel_temporaryname" v-model="editpersonnel_temporary.college_code" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>
                  <v-flex md6>
                    <v-text-field label="Password" v-model="editpersonnel_temporary.personnel_temporary_password" type="password"></v-text-field>
                  </v-flex>
                  <v-flex md6>
                    <v-text-field label="Confirm Password" v-model="editpersonnel_temporary.personnel_temporary_confirmpassword" type="password"></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-divider></v-divider>
                  </v-flex>
                  <v-flex md6>
                    <v-text-field label="Firstname" v-model="editpersonnel_temporary.personnel_temporary_firstname" require :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>
                  <v-flex md6>
                    <v-text-field label="Lastname" v-model="editpersonnel_temporary.personnel_temporary_lastname" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>
                  <v-flex xs12 v-if="editpersonnel_temporary.personnel_temporary_status == 'B'">
                    <v-select :items="colleges" item-text="college_name" item-value="college_ID" v-model="editpersonnel_temporary.college_ID" label="College"
                      required :rules="[v => !!v || '']"></v-select>
                  </v-flex>
                </v-layout>
              </v-container>
              <small>* จำเป็น</small>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn large flat @click.stop="editpersonnel_temporarydialog = false" rounded>
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn large color="warning" @click.stop="editpersonnel_temporarySubmit()" rounded>
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
      addpersonnel_temporarydialog: false,
      editpersonnel_temporarydialog: false,
      deletepersonnel_temporarydialog: false,
      snackbar: {
        show: false,
        color: '',
        timeout: 5000,
        icon: '',
        text: ''
      },      
      personnel_temporarys: [],
      addpersonnel_temporary: {},
      editpersonnel_temporary: {},
      search: '',
      pagination: {},      
      headers: [
        { text: "ลำดับ", align: "center", value:"id_rc"},
        { text: "วิทยาลัย", align: "center", value:"college_code" },              
        { text: "รหัสบัตรประชาชน", align: "center", value:"id_card" },
        { text: "ชื่อ-นามสกุล", align: "center", value:"title_s" },
        { text: "ตำแหน่ง", align: "center", value:"position_name"  },
        { text: "เลขที่ตำแหน่ง", align: "center", value:"id_position" },       
        { text: "วิทยฐานะ", align: "center", value:"rang_name"  },
        { text: "ระดับ", align: "center", value:"rang_level"  },
        { text: "วันเดือนปีเกิด", align: "center", value:"brith_day" },
        { text: "วันเดือนปีบรรจุ", align: "center", value:"appoin_day" },
        { text: "เกษียณ", align: "center", value:"retrire_year"  },      
        { text: "แก้ไข", align: "center", value: "actions", icon: "mdi-file-document-edit" },
        { text: "ลบ", align: "center", value: "action_s" , icon: "mdi-delete-forever" },
      ],
      position_names:[
          { text: "ครูผู้ช่วย", value: "ครูผู้ช่วย"},
          { text: "ครู", value: "ครู"},
          { text: "รองผู้อำนวยการ", value: "รองผู้อำนวยการ"},
          { text: "ผู้อำนวยการ", value: "ผู้อำนวยการ"},
          { text: "ศึกษานิเทศก์", value: "ศึกษานิเทศก์"},
      ],
      rang_names:[
          { text: "-", value: "-"},
          { text: "ชำนาญการ", value: "ชำนาญการ"},
          { text: "ชำนาญการพิเศษ", value: "ชำนาญการพิเศษ"},
          { text: "เชี่ยวชาญ", value: "เชี่ยวชาญ"},
          { text: "เชี่ยวชาญพิเศษ", value: "เชี่ยวชาญพิเศษ"},
      ],
      rang_levels:['-',1,2,3,4,5],
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
       userstatus:[],
       man_powers:[],
     collgegs: [],
     personnel_temporarystatus:[],
      regions: [],
      region_ena: true,  
  date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
  date_t: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
  
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

     // this.personnel_temporaryQueryAll()

    let user_status_result     
      user_status_result = await this.$http.post('crud_user_status.php?crud=read', {
        ApiKey: this.ApiKey
      })
        this.userstatus = user_status_result.data

let man_power_result     
      man_power_result = await this.$http.post('crud_man_power.php?crud=read', {
        ApiKey: this.ApiKey
      })
        this.man_powers = man_power_result.data
    },
    methods: {
      async personnel_temporaryQueryAll() {
          this.loading = true
        let result = await this.$http.post('personnel_temporary.php', {
          ApiKey: this.ApiKey
        }).finally(() => this.loading = false)
        this.personnel_temporarys = result.data       
      },

       async personnel_temporaryAdd() {
      this.addpersonnel_temporary = {};
      this.addpersonnel_temporarydialog = true;
    },
      async addpersonnel_temporarySubmit() {
        if (this.$refs.addpersonnel_temporaryform.validate()) {         
          this.addpersonnel_temporary.ApiKey = this.ApiKey;
          let result = await this.$http.post('personnel_temporary.insert.php', this.addpersonnel_temporary)        
          if (result.data.status == true) {
            this.personnel_temporary = result.data
            this.snackbar.icon = 'mdi-font-awesome'
            this.snackbar.color = 'success'
            this.snackbar.text = 'บันทึกข้อมูลเรียบร้อย'
            this.snackbar.show = true
            this.personnel_temporaryQueryAll()
          } else {
            this.snackbar.icon = 'mdi-close-network'
            this.snackbar.color = 'red'
            this.snackbar.text = 'บันทึกข้อมูลผิดพลาด'
            this.snackbar.show = true
             this.personnel_temporaryQueryAll()
          }
          this.addpersonnel_temporarydialog = false
        }
      },
      async personnel_temporaryEdit(id_rc) {
        let result = await this.$http.post('personnel_temporary.php', {
          ApiKey: this.ApiKey,
          id_rc: id_rc
        })
        this.editpersonnel_temporary = result.data
        this.editpersonnel_temporary.personnel_temporary_password = ''
        this.editpersonnel_temporarydialog = true
      },
      async editpersonnel_temporarySubmit() {
        if (this.$refs.editpersonnel_temporaryform.validate()) {
          this.editpersonnel_temporary.ApiKey = this.ApiKey;
          if(this.editpersonnel_temporary.personnel_temporary_password == '')
            delete this.editpersonnel_temporary.personnel_temporary_password
          let result = await this.$http.post('personnel_temporary.update.php', this.editpersonnel_temporary)
          if (result.data.status == true) {
            this.personnel_temporary = result.data
            this.snackbar.icon = 'mdi-font-awesome'
            this.snackbar.color = 'success'
            this.snackbar.text = 'แก้ไขข้อมูลเรียบร้อย'
            this.snackbar.show = true
            this.personnel_temporaryQueryAll()
          } else {
            this.snackbar.icon = 'mdi-close-network'
            this.snackbar.color = 'red'
            this.snackbar.text = 'แก้ไขข้อมูลผิดพลาด'
            this.snackbar.show = true
          }
          this.editpersonnel_temporarydialog = false
        }
      },
      async personnel_temporaryDelete(id_rc) {
        let result = await this.$http.post('personnel_temporary.php', {
          ApiKey: this.ApiKey,
          id_rc: id_rc
        })
        this.editpersonnel_temporary = result.data
        this.deletepersonnel_temporarydialog = true
      },
      async deletepersonnel_temporarySubmit() {
        if (this.$refs.deletepersonnel_temporaryform.validate()) {
          this.editpersonnel_temporary.ApiKey = this.ApiKey;
          if(this.editpersonnel_temporary.personnel_temporary_status == 'D')
            await this.$http.post('committee.delete.php', {
              ApiKey: this.ApiKey,
              id_rc: this.editpersonnel_temporary.id_rc
            })
          let result = await this.$http.post('personnel_temporary.delete.php', this.editpersonnel_temporary)
          if (result.data.status == true) {
            this.personnel_temporary = result.data
            this.snackbar.icon = 'mdi-font-awesome'
            this.snackbar.color = 'success'
            this.snackbar.text = 'ลบข้อมูลเรียบร้อย'
            this.snackbar.show = true
            this.personnel_temporaryQueryAll()
          } else {
            this.snackbar.icon = 'mdi-close-network'
            this.snackbar.color = 'red'
            this.snackbar.text = 'ลบข้อมูลผิดพลาด'
            this.snackbar.show = true
          }
          this.deletepersonnel_temporarydialog = false
        }
      }, 
      formatDate (date) {
        if (!date) return null
        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
      formatDate_t (date_t) {
        if (!date_t) return null
        const [year, month, day] = date_t.split('-')
        return `${month}/${day}/${year}`
      },
      parseDate (date) {
        if (!date) return null
        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },    
      parseDate_t (date_t) {
        if (!date_) return null
        const [month, day, year] = date_t.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },    
    },
    computed: {
      pages() {
        if (this.pagination.rowsPerPage == null ||
          this.pagination.totalItems == null
        ) return 0

        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      },
      computedDateFormatted () {
        return this.formatDate(this.date)
      },
       computedDateFormatted_t () {
        return this.formatDate_t(this.date_t)
      },
      reversedYearadd: function () {
      // `this` points to the vm instance
      return this.date_t.split('-',1)
    },
    reversedYearbrith: function () {
      // `this` points to the vm instance
      return this.date.split('-',1)
    },
     reversedMonthbrith: function () {
        const [year, month, day] = this.date.split('-')
        return `${month.padStart(1, '0')}`
    }
    },
watch: {
      date (val) {
        this.addpersonnel_temporary.birthday = this.formatDate(this.date)
      },
        date_t (val) {
        this.addpersonnel_temporary.date_appoinment = this.formatDate_t(this.date_t)
      },
    },
  

 

  
}
</script>
