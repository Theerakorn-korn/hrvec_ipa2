<template>
  <div>
    <v-container class="text_google">
      <base-material-card
        icon="mdi-clipboard-text"
        title="วุฒิการศึกษา"
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
           <!--  <v-col cols="12" lg="6" class="text-right">
              <v-btn
                
                large
                right
                depressed
                color="primary"
                @click.native="personnel_educationAdd()"
              >
                <v-icon>mdi-plus-circle-outline</v-icon>เพิ่มรายการ
              </v-btn>
            </v-col> -->
          </v-row>
        </v-card>

        <v-data-table
          color="success"
          :loading="loading"
          :headers="headers"
          :items="personnel_educations"
          :search="search"         
        >  
                  
        <template v-slot:[`item.actions`]="{ item }">
            <v-icon
              color="yellow"
              
              @click.stop="personnel_educationEdit(item.id_red)"
            >
              mdi-pencil
            </v-icon>          
          </template>
            <template v-slot:[`item.action_s`]="{ item }">            
            <v-icon
              color="red"
              
              @click.stop="personnel_educationDelete(item.id_red)"
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

      <!--addpersonnel_educationdialog  -->
     <!--  <v-layout row justify-center>
        <v-dialog v-model="addpersonnel_educationdialog" persistent max-width="80%" overlay-opacity="0.6">
          <v-card class="mx-auto pa-5" >
            <base-material-card
              icon="mdi-clipboard-text"
              title="เพิ่มวุฒิการศึกษา"
              class="px-5 py-3 text_google"
              
            ></base-material-card>
            <v-card-text class="text_google">
              <v-form
                ref="addpersonnel_educationform"               
                lazy-validation                
              >
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md12>
                      <v-row>
                        <v-col cols="12" lg="6">
                          {{ addpersonnel_education.education_level }}
                          <v-combobox
                            v-model="addpersonnel_education.education_level"
                            :items="education_level"
                            item-value="education_level"
                            label="ระดับการศึกษา"
                            dense
                            :rules="[(v) => !!v || '']"
                          ></v-combobox>
                        
                        </v-col>

                        <v-col cols="12" lg="6">                                           
                           <v-autocomplete                         
                        :items="branch_s"
                        item-text="name_branch"
                        item-value="id_branch"                        
                        label="ประเภท :"
                        prepend-icon="mdi-account-details"
                        request
                         v-model="addpersonnel_education.id_branch"
                        :rules="[(v) => !!v || '']"
                      ></v-autocomplete>
                        
                        </v-col>


                        <v-col cols="12" lg="6">
                          <v-text-field
                            v-model="addpersonnel_education.faculty_name"
                            dense
                            label="คณะวิชา : "
                            item-value="cat_name"
                            prepend-icon="mdi-barcode"
                            request
                            :rules="[(v) => !!v || '']"
                          ></v-text-field>
                        </v-col>
                         <v-col cols="12" lg="6">
                          <v-text-field
                            v-model="addpersonnel_education.branch_name"
                            dense
                            label="สาขาวิชา : "
                            item-value="cat_name"
                            prepend-icon="mdi-barcode"
                            request
                            :rules="[(v) => !!v || '']"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" lg="6">
                          <v-text-field
                            v-model="addpersonnel_education.academy_name"
                            dense
                            label="สถานศึกษาที่จบ : "
                            item-value="cat_name"
                            prepend-icon="mdi-barcode"
                            request
                            :rules="[(v) => !!v || '']"
                          ></v-text-field>
                        </v-col>
                         <v-col cols="12" lg="6">
                          <v-text-field
                                v-model="addpersonnel_education.year_finish"
                                label="สำเร็จปีการศึกษา : "
                                prepend-icon="mdi-calendar"                                                         
                              ></v-text-field>
                        </v-col>
                        
                       
                        <v-col cols="12" lg="6">
                          <v-text-field
                            v-model="addpersonnel_education.academic_results"
                            dense
                            label="ผลการเรียนเรียน : "
                            item-value="cat_name"
                            prepend-icon="mdi-barcode"
                            request
                            :rules="[(v) => !!v || '']"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-flex>
                  </v-layout>
                  <v-spacer></v-spacer>
                  <v-row>
                    <v-col cols="12" lg="12" class="text-right">
                     <v-btn
                large
                color="success"
                @click.stop="addpersonnel_educationSubmit()"
                rounded
              > <v-icon dark>mdi-content-save</v-icon>&nbsp;&nbsp;บันทึก</v-btn>
                      <v-btn  large color="warning" @click.stop="addpersonnel_educationdialog = false" rounded>
                        <v-icon dark>mdi-close</v-icon>ยกเลิก
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-layout> -->

      <!-- V-model deletepersonnel_educationdialog -->
      <!-- <v-layout>
        <v-dialog v-model="deletepersonnel_educationdialog" persistent max-width="40%">
          <v-card class="mx-auto pa-5" >
            <base-material-card
              color="error"
              icon="mdi-delete"
              title="ลบข้อมูล"
              class="px-5 py-3 text_google"
              
            ></base-material-card>
            <v-card-text class="text_google">
              <v-form ref="deletepersonnel_educationform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12>
                      ยืนยันการลบข้อมูล :
                      <h3>{{ editpersonnel_education.education_level }}</h3>
                    </v-flex>
                    <v-flex xs12 md6></v-flex>
                    <v-flex xs12 md6></v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn large @click.stop="deletepersonnel_educationdialog = false">
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn large color="red darken-3" @click.stop="deletepersonnel_educationubmit()" dark>
                <v-icon dark>mdi-delete</v-icon>&nbsp;ลบ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout> -->

      <!-- V-model editpersonnel_educationdialog -->
      <!-- <v-layout row justify-center>
        <v-dialog v-model="editpersonnel_educationdialog" persistent max-width="80%">
          <v-card class="mx-auto pa-5" >
            <base-material-card
              color="yellow"
              icon="mdi-clipboard-text"
              title="แก้ไขข้อมูลการศึกษา"
              class="px-5 py-3 text_google"
              
            ></base-material-card>
            <v-card-text>
              <v-form ref="editpersonnel_educationform" lazy-validation>
                <v-container grid-list-md>
                   <v-layout wrap>
                    <v-flex md12>
                      <v-row>
                        <v-col cols="12" lg="6">
                          <v-combobox
                            v-model="editpersonnel_education.education_level"
                            :items="education_level"
                            label="ระดับการศึกษา"
                            dense
                            :rules="[(v) => !!v || '']"
                          ></v-combobox>
                        
                        </v-col>
             <v-col cols="12" lg="6">
                          <v-combobox
                            v-model="editpersonnel_education.personnel_id_branch"
                            :items="branch_s"
                            item-text="name_branch"
                            item-value="id_branch"
                            label="ประเภท"
                            dense
                            :rules="[(v) => !!v || '']"
                          ></v-combobox>
                        
                        </v-col>


                        <v-col cols="12" lg="6">
                          <v-text-field
                            v-model="editpersonnel_education.faculty_name"
                            dense
                            label="คณะวิชา : "
                            item-value="cat_name"
                            prepend-icon="mdi-barcode"
                            request
                            :rules="[(v) => !!v || '']"
                          ></v-text-field>
                        </v-col>
                         <v-col cols="12" lg="6">
                          <v-text-field
                            v-model="editpersonnel_education.branch_name"
                            dense
                            label="สาขาวิชา : "
                            item-value="cat_name"
                            prepend-icon="mdi-barcode"
                            request
                            :rules="[(v) => !!v || '']"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" lg="6">
                          <v-text-field
                            v-model="editpersonnel_education.academy_name"
                            dense
                            label="สถานศึกษาที่จบ : "
                            item-value="cat_name"
                            prepend-icon="mdi-barcode"
                            request
                            :rules="[(v) => !!v || '']"
                          ></v-text-field>
                        </v-col>
                         <v-col cols="12" lg="6">
                          <v-text-field
                                v-model="editpersonnel_education.year_finish"
                                label="ปีการศึกษาที่จบ :"
                                prepend-icon="mdi-calendar"  
                              ></v-text-field>
                        </v-col>
                        
                       
                        <v-col cols="12" lg="6">
                          <v-text-field
                            v-model="editpersonnel_education.academic_results"
                            dense
                            label="ผลการเรียนเรียน : "
                            item-value="cat_name"
                            prepend-icon="mdi-barcode"
                            request
                            :rules="[(v) => !!v || '']"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn large  @click.stop="editpersonnel_educationdialog = false" rounded>
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn large color="warning" @click.stop="editpersonnel_educationSubmit()" rounded>
                <v-icon dark>mdi-pencil</v-icon>&nbsp;แก้ไขข้อมูล
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout> -->
    </v-container>
    <v-container fluid>
      <v-snackbar
        v-model="snackbar.show"
        multi-line
        vertical
        top        
        :timeout="snackbar.timeout"
        :color="snackbar.color"
      >
        <v-icon large>{{ snackbar.icon }}</v-icon>
        <br />
        {{ snackbar.text }}
        <v-btn dark @click="snackbar.show = false">Close</v-btn>
      </v-snackbar>
    </v-container>
  </div>
</template>
<script>
export default {  
  data() {
    return {
      ApiKey: 'HRvec2021',
       loading: true,
      updateImageDialog: false,
      search: "",
      addpersonnel_educationdialog: false,
      editpersonnel_educationdialog: false,
      deletepersonnel_educationdialog: false,
      showimagedialog: false,
      snackbar: {
        show: false,
        color: "",
        timeout: 5000,
        icon: "",
        text: "",
      },
      currentPK: null,
      headers: [  
        { text: "คำนำหน้าชื่อ", align: "left", value: "title_s" },        
        { text: "ชื่อ", align: "left", value: "frist_name" },        
        { text: "นามสกุล", align: "left", value: "last_name" },        
        { text: "ประเภทสาขาวิชา", align: "left", value: "name_branch" },
        { text: "ระดับการศึกษา", align: "left", value: "education_level" },
        { text: "คณะวิชา", align: "left", value: "faculty_name" },        
        { text: "สาขาวิชา", align: "left", value: "branch_name" },
        { text: "จบจาก", align: "left", value: "academy_name" },
        { text: "ปีที่จบ", align: "center", value: "year_finish" },
        { text: "ผลการเรียน", align: "center", value: "academic_results" },       
      /*   { text: "แก้ไข", align: "center", value: "actions", icon: "mdi-file-document-edit" },
        { text: "ลบ", align: "center", value: "action_s" , icon: "mdi-delete-forever" },    */  
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
       pagination: {},      
      personnel_education: [],
      addpersonnel_education: {},
      editpersonnel_education: [],
      personnel_educations: [],
      personnel_education_sub: [],   
      branch_s: [],      
      education_level: ["ปริญญาตรี", "ปริญญาโท", "ปริญญาเอก"],
    };
  },

  async mounted() {

    let result_branch
        result_branch = await this.$http.post('branch.php', {
        ApiKey: this.ApiKey       
      })
      this.branch_s = result_branch.data       
     this.personnel_educationsQueryAll()
  },

  methods: {
    async personnel_educationsQueryAll() {     
         this.loading = true
          let userSession = JSON.parse(sessionStorage.getItem('user')) || 0   
        let result = await this.$http.post('personnel_education.php', {
          ApiKey: this.ApiKey,
            user_name: userSession.user_name 
        }).finally(() => this.loading = false)
        this.personnel_educations = result.data     
      },
  },

  computed: {
   pages() {
        if (this.pagination.rowsPerPage == null ||
          this.pagination.totalItems == null
        ) return 0

        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      }   
  } 
};
</script>
