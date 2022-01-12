<template>
  <div>
      
    <v-container>
    <base-material-card
        icon="mdi-clipboard-text"
        title="ข้าราชการครูและบุคลากรทางการศึกษา"
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
                 v-on:keyup.enter="OnEnter()"   
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
                @click.native="personnel_temporaryAdd()"
              >
                <v-icon>mdi-plus-circle-outline</v-icon>เพื่อรายการ
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
       <v-data-table 
       :headers="headers" 
       :items="personnel_temporarys"      
        class="elevation-1"
        :loading="loading"
         :search="search"
              >            
               <template v-slot:[`item.actions`]="{ item }">
            <v-icon
              color="yellow"
              
              @click.stop="personnel_temporaryEdit(item.id_rc)"
            >
              mdi-pencil
            </v-icon>          
          </template>
            <template v-slot:[`item.action_s`]="{ item }">            
            <v-icon
              color="red"
              
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
        <v-dialog v-model="addpersonnel_temporarydialog" persistent max-width="80%">
          <v-card class="mx-auto pa-5" >
            <base-material-card
              icon="mdi-account-multiple"
              title="เพิ่มข้อมูลข้าราชการครูและบุคลากรทางการศึกษา"
              class="px-5 py-3 text_google"
              
            >
            </base-material-card>

            <v-card-text>
            <v-form ref="addpersonnel_temporaryform" lazy-validation>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex md6>
                    <v-select :items="userstatus"  item-text="user_status_name" item-value="user_status_sub" v-model="addpersonnel_temporary.user_status" label="Type" required
                      :rules="[v => !!v || '']"></v-select>
                  </v-flex>        
                  <v-flex xs12 v-if="addpersonnel_temporary.user_status == 'tech' || addpersonnel_temporary.user_status == 'se_director' || addpersonnel_temporary.user_status == 'director'">
                    <v-autocomplete :items="colleges" item-text="college_name" item-value="college_code" v-model="addpersonnel_temporary.college_code" label="วิทยาลัย" @change="man_powerQuery()"
                      required :rules="[v => !!v || '']">                      
                      </v-autocomplete>                    
                  </v-flex>                   
                    <v-flex xs12>
                    <v-divider></v-divider>
                  </v-flex>  
                   <v-flex md12>
                    <v-text-field label="คำสั่งที่" v-model="addpersonnel_temporary.order_app_now" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>       
                  <v-flex md6>
                    <v-text-field label="รหัสบัตรประชาชน" v-model="addpersonnel_temporary.id_card" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>
                  <v-flex md6>
                  </v-flex>
                  <v-flex md4>
                    <v-text-field label="คำนำหน้าชื่อ" v-model="addpersonnel_temporary.title_s" require :rules="[v => !!v || '']"></v-text-field>
                  </v-flex> 
                  <v-flex md4>
                    <v-text-field label="ชื่อ" v-model="addpersonnel_temporary.frist_name" require :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>
                  <v-flex md4>
                    <v-text-field label="นามสกุล" v-model="addpersonnel_temporary.last_name" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>
                  <v-flex md6>
                    <v-autocomplete :items="userstatus" item-text="user_status_name" item-value="user_status_name" label="ตำแหน่ง" v-model="addpersonnel_temporary.position_name" required :rules="[v => !!v || '']"></v-autocomplete>
                  </v-flex>
                   <v-flex md6>
                    <v-autocomplete :items="man_powers" item-text="college_position" item-value="id_position" label="เลขที่ตำแหน่ง" v-model="addpersonnel_temporary.id_position" required :rules="[v => !!v || '']"></v-autocomplete>
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
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :return-value.sync="date"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="addpersonnel_temporary.birthday"
                            label="วันเดือนปีเกิด"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            locale="th"
                            required :rules="[v => !!v || '']"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="addpersonnel_temporary.birthday"
                          no-title
                          scrollable
                          locale="th"
                        >
                          <v-spacer></v-spacer>
                          <v-btn
                            text
                            color="primary"
                            @click="menu = false"
                          >
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.menu.save(date)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-menu>    
                      {{ brith_day }}                  
                              <!--     <span>อายุปี : {{ cal_date_age }} </span><br>
                                  <span>เดือน :{{ birth_month }}</span><br>
                                  <span>ปี :{{ birth_year }}</span><br>
                                  <span>ปี :{{ retrire_year }}</span>
                                   -->
                                   <span>ปีเกษียณ :{{ retrire_year }}</span>   
                                  </v-flex>
                                    <v-flex md6>


                <v-menu
                        ref="menu2"
                        v-model="menu2"
                        :close-on-content-click="false"
                        :return-value.sync="date"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="addpersonnel_temporary.date_app_now"
                            label="วันเดือนปีที่บรรจุ"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            locale="th"
                            required :rules="[v => !!v || '']"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="addpersonnel_temporary.date_app_now"
                          no-title
                          scrollable
                          locale="th"
                        >
                          <v-spacer></v-spacer>
                          <v-btn
                            text
                            color="primary"
                            @click="menu2 = false"
                          >
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.menu2.save(date)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-menu>
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
              <v-btn large @click.stop="deletepersonnel_temporarydialog = false"
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
        <v-card class="mx-auto pa-6" >
           <base-material-card
              color="yellow"
              icon="mdi-clipboard-text"
              title="แก้ไขข้อมูลผู้ใช้งานระบบ"
              class="px-5 py-3 text_google"
              
            ></base-material-card>
          <v-card-text>
            <v-form ref="editpersonnel_temporaryform" lazy-validation>
              <v-container grid-list-md>
                 <v-layout wrap>
                  <v-flex md6>
                    <v-select v-model="editpersonnel_temporary.user_status" :items="userstatus" item-text="user_status_name" item-value="user_status_sub" label="Type" required
                      :rules="[v => !!v || '']"></v-select>
                  </v-flex>        
                  <v-flex xs12 v-if="editpersonnel_temporary.user_status == 'tech' || editpersonnel_temporary.user_status == 'se_director' || editpersonnel_temporary.user_status == 'director'">
                    <v-autocomplete v-model="editpersonnel_temporary.college_code" :items="colleges" item-text="college_name" item-value="college_code"  label="วิทยาลัย" @change="man_powerQuery()"
                      required :rules="[v => !!v || '']">                      
                      </v-autocomplete>                    
                  </v-flex>                   
                    <v-flex xs12>
                    <v-divider></v-divider>
                  </v-flex>  
                   <v-flex md12>
                    <v-text-field label="คำสั่งที่" v-model="editpersonnel_temporary.order_app_now" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>       
                  <v-flex md6>
                    <v-text-field label="รหัสบัตรประชาชน" v-model="editpersonnel_temporary.id_card" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>
                  <v-flex md6>
                  </v-flex>
                  <v-flex md4>
                    <v-text-field label="คำนำหน้าชื่อ" v-model="editpersonnel_temporary.title_s" require :rules="[v => !!v || '']"></v-text-field>
                  </v-flex> 
                  <v-flex md4>
                    <v-text-field label="ชื่อ" v-model="editpersonnel_temporary.frist_name" require :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>
                  <v-flex md4>
                    <v-text-field label="นามสกุล" v-model="editpersonnel_temporary.last_name" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>
                  <v-flex md6>
                    <v-autocomplete v-model="editpersonnel_temporary.position_name" :items="userstatus" item-text="user_status_name" item-value="user_status_name" label="ตำแหน่ง"  required :rules="[v => !!v || '']"></v-autocomplete>
                  </v-flex>
                   <v-flex md6>
                    <v-autocomplete v-model="editpersonnel_temporary.id_position" :items="man_powers" item-text="college_position" item-value="id_position" label="เลขที่ตำแหน่ง"  required :rules="[v => !!v || '']"></v-autocomplete>
                  </v-flex>
                  <v-flex md6>
                    <v-autocomplete v-model="editpersonnel_temporary.rang_name" :items="rang_names" item-text="text" item-value="value" label="วิทยฐานะ"  required :rules="[v => !!v || '']"></v-autocomplete>
                  </v-flex>
                   <v-flex md6>
                    <v-select v-model="editpersonnel_temporary.rang_level" :items="rang_levels" label="ระดับ"  required :rules="[v => !!v || '']"></v-select>
                  </v-flex>
                   <v-flex md6>
                    <v-text-field label="คุณวิฒิ" v-model="editpersonnel_temporary.ed_abb" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>
                   <v-flex md6>
                    <v-text-field label="สาขาวิชา" v-model="editpersonnel_temporary.ed_name" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>
                     <v-flex md6>
                <v-menu
                        ref="menu3"
                        v-model="menu3"
                        :close-on-content-click="false"
                        :return-value.sync="date"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="editpersonnel_temporary.birthday"
                            label="วันเดือนปีเกิด"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            locale="th"
                            required :rules="[v => !!v || '']"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="editpersonnel_temporary.birthday"
                          no-title
                          scrollable
                          locale="th"
                        >
                          <v-spacer></v-spacer>
                          <v-btn
                            text
                            color="primary"
                            @click="menu3 = false"
                          >
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.menu3.save(date)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-menu>    
                      {{ brith_day }}                  
                              <!--     <span>อายุปี : {{ cal_date_age }} </span><br>
                                  <span>เดือน :{{ birth_month }}</span><br>
                                  <span>ปี :{{ birth_year }}</span><br>
                                  <span>ปี :{{ retrire_year }}</span>
                                   -->
                                   <span>ปีเกษียณ :{{ retrire_year }}</span>   
                                  </v-flex>
                                    <v-flex md6>


                <v-menu
                        ref="menu4"
                        v-model="menu4"
                        :close-on-content-click="false"
                        :return-value.sync="date"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="editpersonnel_temporary.date_app_now"
                            label="วันเดือนปีที่บรรจุ"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            locale="th"
                            required :rules="[v => !!v || '']"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="editpersonnel_temporary.date_app_now"
                          no-title
                          scrollable
                          locale="th"
                        >
                          <v-spacer></v-spacer>
                          <v-btn
                            text
                            color="primary"
                            @click="menu4 = false"
                          >
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.menu4.save(date)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-menu>
                  </v-flex>                            
                  <v-flex md6>
                    <v-text-field label="เบอร์โทร" v-model="editpersonnel_temporary.tel_p" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>
                   <v-flex md6>
                    <v-text-field label="E-mail" v-model="editpersonnel_temporary.e_mail" required :rules="[v => !!v || '']"></v-text-field>
                  </v-flex>

                </v-layout>

               
              </v-container>
              <small>* จำเป็น</small>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn large @click.stop="editpersonnel_temporarydialog = false" rounded>
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
        { text: "ลำดับ", align: "center", value: "id_rc"},
        { text: "วิทยาลัย",width: "20%", align: "center", value: "college_name" },              
        { text: "รหัสบัตรประชาชน", align: "center", value: "id_card" },
        { text: "คำนำ", align: "center", value: "title_s" },
        { text: "ชื่อ", align: "center", value: "frist_name" },
        { text: "สกุล", align: "center", value: "last_name" },
        { text: "ตำแหน่ง", align: "center", value: "position_name"  },
        { text: "เลขที่ตำแหน่ง", align: "center", value: "id_position" },       
        { text: "วิทยฐานะ", align: "center", value: "rang_name"  },
        { text: "ระดับ", align: "center", value: "rang_level"  },
        { text: "วันเดือนปีเกิด", align: "center", value: "brith_day" },
        { text: "วันเดือนปีบรรจุ", align: "center", value: "appoin_day" },
        { text: "เกษียณ", align: "center", value: "retrire_year"  },      
        { text: "แก้ไข", align: "center", value: "actions", icon: "mdi-file-document-edit" },
        { text: "ลบ", align: "center", value: "action_s" , icon: "mdi-delete-forever" },
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
      menu: false,      
      menu2: false,
      menu3: false,
      menu4: false,
  
    };
    
  },

     
 
async mounted() {

  await this.personnel_temporaryQueryAll()

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
    },


    methods: {

  async OnEnter(){
       let result = await this.$http.post('personnel_temporary.php', {
          ApiKey: this.ApiKey,
          frist_name: this.search
        })
        this.personnel_temporarys = result.data  
        console.log(result.data) 
        console.log(this.search)  
    },


     async man_powerQuery(){
         let man_power_result     
      man_power_result = await this.$http.post('man_power.php', {
        ApiKey: this.ApiKey,
        college_code : this.addpersonnel_temporary.college_code
      })
        this.man_powers = man_power_result.data
      },

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
          this.addpersonnel_temporary.p_word = this.p_word;
          this.addpersonnel_temporary.brith_day = this.brith_day;
          this.addpersonnel_temporary.brith_month = this.brith_month;
          this.addpersonnel_temporary.brith_year = this.brith_year;
          this.addpersonnel_temporary.appoin_day = this.appoin_day;
          this.addpersonnel_temporary.appoin_month = this.appoin_month;
          this.addpersonnel_temporary.appoin_year = this.appoin_year;
          this.addpersonnel_temporary.retrire_year = this.retrire_year;
        
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
        this.editpersonnel_temporarydialog = true
      },
      async editpersonnel_temporarySubmit() {
        if (this.$refs.editpersonnel_temporaryform.validate()) {
          this.editpersonnel_temporary.ApiKey = this.ApiKey;     
          this.editpersonnel_temporary.p_word = this.p_word;
          this.editpersonnel_temporary.brith_day = this.brith_day;
          this.editpersonnel_temporary.brith_month = this.brith_month;
          this.editpersonnel_temporary.brith_year = this.brith_year;
          this.editpersonnel_temporary.appoin_day = this.appoin_day;
          this.editpersonnel_temporary.appoin_month = this.appoin_month;
          this.editpersonnel_temporary.appoin_year = this.appoin_year;
          this.editpersonnel_temporary.retrire_year = this.retrire_year;    
          let result = await this.$http.post('personnel_temporary.update.admin.php', this.editpersonnel_temporary)
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
        console.log(result.date)
      },

      async deletepersonnel_temporarySubmit() {
        if (this.$refs.deletepersonnel_temporaryform.validate()) {
          this.editpersonnel_temporary.ApiKey = this.ApiKey;         
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
    },
    computed: {
      pages() {
        if (this.pagination.rowsPerPage == null ||
          this.pagination.totalItems == null
        ) return 0

        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      },  
      p_word(){
            let today = new Date(this.addpersonnel_temporary.birthday || this.editpersonnel_temporary.birthday);
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = today.getFullYear()+543;
            let password = dd + '/' + mm + '/' + yyyy;
            return password
      },
      brith_day(){
         let today = new Date(this.addpersonnel_temporary.birthday || this.editpersonnel_temporary.birthday);
            let dd = parseInt(String(today.getDate()).padStart(2, '0'));  
            return dd
      },
      brith_month(){
          let today = new Date(this.addpersonnel_temporary.birthday || this.editpersonnel_temporary.birthday);         
            let mm = parseInt(String(today.getMonth() + 1).padStart(2, '0'));       
            return mm
      },
      brith_year(){
           let today = new Date(this.addpersonnel_temporary.birthday || this.editpersonnel_temporary.birthday);       
            let yyyy = today.getFullYear()+543;        
            return yyyy
      },

      appoin_day(){
         let today = new Date(this.addpersonnel_temporary.date_app_now || this.editpersonnel_temporary.date_app_now);
            let dd = parseInt(String(today.getDate()).padStart(2, '0'));  
            return dd
      },
      appoin_month(){
          let today = new Date(this.addpersonnel_temporary.date_app_now || this.editpersonnel_temporary.date_app_now);
          let mm = parseInt(String(today.getMonth() + 1).padStart(2, '0')); //January is 0!
          return mm
      },
      appoin_year(){
         let today = new Date(this.addpersonnel_temporary.date_app_now || this.editpersonnel_temporary.date_app_now);        
        let yyyy = today.getFullYear()+543;      
        return yyyy
      },
     date_today_cal() {
            let today = new Date(this.addpersonnel_temporary.birthday || this.editpersonnel_temporary.birthday);
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = today.getFullYear();

            today = yyyy + '-' + mm + '-' + dd;
            return today
          },
      retrire_year(){
          let mm = this.brith_month
          let yy_retire = this.brith_year
          let result
          if(mm >9){
              result = yy_retire + 61
          }else{
              result = yy_retire + 60
          }
          return result
      },
      cal_date_age(){
           let today = new Date(this.date_today_cal);
                let DOB = new Date(this.addpersonnel_temporary.birthday || this.editpersonnel_temporary.birthday);
              
                let totalMonths = (today.getFullYear() - DOB.getFullYear()) * 12 + today.getMonth() - DOB.getMonth();
                totalMonths += today.getDay() < DOB.getDay() ? -1 : 0;
                let years = today.getFullYear() - DOB.getFullYear();
                if (DOB.getMonth() > today.getMonth())
                    years = years - 1;
                else if (DOB.getMonth() === today.getMonth())
                    if (DOB.getDate() > today.getDate())
                        years = years - 1;

                let days;
                let months;

                if (DOB.getDate() > today.getDate()) {
                    months = (totalMonths % 12);
                    if (months == 0)
                        months = 11;
                    let x = today.getMonth();
                    switch (x) {
                        case 1:
                        case 3:
                        case 5:
                        case 7:
                        case 8:
                        case 10:
                        case 12: {
                            let a = DOB.getDate() - today.getDate();
                            days = 31 - a;
                            break;
                        }
                        default: {
                            let a = DOB.getDate() - today.getDate();
                            days = 30 - a;
                            break;
                        }
                    }

                }
                else {
                    days = today.getDate() - DOB.getDate();
                    if (DOB.getMonth() === today.getMonth())
                        months = (totalMonths % 12);
                    else
                        months = (totalMonths % 12);
                }
                let age = years + ' ปี ' + months + ' เดือน ' + days + ' วัน'; 
                   return age;  
      },   
     
      cal_date_age_gov(){
           let today = new Date(this.date_today_cal);
                let DOB = new Date(this.addpersonnel_temporary.date_app_now || this.editpersonnel_temporary.date_app_now);
              
                let totalMonths = (today.getFullYear() - DOB.getFullYear()) * 12 + today.getMonth() - DOB.getMonth();
                totalMonths += today.getDay() < DOB.getDay() ? -1 : 0;
                let years = today.getFullYear() - DOB.getFullYear();
                if (DOB.getMonth() > today.getMonth())
                    years = years - 1;
                else if (DOB.getMonth() === today.getMonth())
                    if (DOB.getDate() > today.getDate())
                        years = years - 1;

                let days;
                let months;

                if (DOB.getDate() > today.getDate()) {
                    months = (totalMonths % 12);
                    if (months == 0)
                        months = 11;
                    let x = today.getMonth();
                    switch (x) {
                        case 1:
                        case 3:
                        case 5:
                        case 7:
                        case 8:
                        case 10:
                        case 12: {
                            let a = DOB.getDate() - today.getDate();
                            days = 31 - a;
                            break;
                        }
                        default: {
                            let a = DOB.getDate() - today.getDate();
                            days = 30 - a;
                            break;
                        }
                    }

                }
                else {
                    days = today.getDate() - DOB.getDate();
                    if (DOB.getMonth() === today.getMonth())
                        months = (totalMonths % 12);
                    else
                        months = (totalMonths % 12);
                }
                let age = years + ' ปี ' + months + ' เดือน ' + days + ' วัน'; 
                   return age;  
      },   
     
    },  
}
</script>
