<template>
  <div>
    <v-container class="text_google">
      <base-material-card
        icon="mdi-clipboard-text"
        title="ประสบการณ์"
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
                @click.native="personnel_experienceAdd()"
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
          :items="personnel_experiences"
          :search="search"         
        >  
                  
       <!--  <template v-slot:[`item.actions`]="{ item }">
            <v-icon
              color="yellow"
              
              @click.stop="personnel_experienceEdit(item.id_red)"
            >
              mdi-pencil
            </v-icon>          
          </template>
            <template v-slot:[`item.action_s`]="{ item }">            
            <v-icon
              color="red"
              
              @click.stop="personnel_experienceDelete(item.id_red)"
            >
              mdi-delete
            </v-icon>
          </template>       -->
          <v-alert
            slot="no-results"
            :value="true"
            color="error"
            icon="mdi-alert"
          >ไม่พบผลลัพธ์ "{{ search }}" ที่คุณกำลังค้นหา.</v-alert>
        </v-data-table>
      </base-material-card>

      <!--addpersonnel_experiencedialog  -->
     <!--  <v-layout row justify-center>
        <v-dialog v-model="addpersonnel_experiencedialog" persistent max-width="80%" overlay-opacity="0.6">
          <v-card class="mx-auto pa-5" >
            <base-material-card
              icon="mdi-clipboard-text"
              title="เพิ่มประสบการณ์"
              class="px-5 py-3 text_google"
              
            ></base-material-card>
            <v-card-text class="text_google">
              <v-form
                ref="addpersonnel_experienceform"               
                lazy-validation                
              >
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md12>
                      <v-row>
                        <v-col cols="12" lg="6">
                          {{ addpersonnel_experience.education_level }}
                          <v-combobox
                            v-model="addpersonnel_experience.education_level"
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
                         v-model="addpersonnel_experience.id_branch"
                        :rules="[(v) => !!v || '']"
                      ></v-autocomplete>
                        
                        </v-col>


                        <v-col cols="12" lg="6">
                          <v-text-field
                            v-model="addpersonnel_experience.faculty_name"
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
                            v-model="addpersonnel_experience.branch_name"
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
                            v-model="addpersonnel_experience.academy_name"
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
                                v-model="addpersonnel_experience.year_finish"
                                label="สำเร็จปีการศึกษา : "
                                prepend-icon="mdi-calendar"                                                         
                              ></v-text-field>
                        </v-col>
                        
                       
                        <v-col cols="12" lg="6">
                          <v-text-field
                            v-model="addpersonnel_experience.academic_results"
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
                @click.stop="addpersonnel_experienceSubmit()"
                rounded
              > <v-icon dark>mdi-content-save</v-icon>&nbsp;&nbsp;บันทึก</v-btn>
                      <v-btn  large color="warning" @click.stop="addpersonnel_experiencedialog = false" rounded>
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

      <!-- V-model deletepersonnel_experiencedialog -->
      <!-- <v-layout>
        <v-dialog v-model="deletepersonnel_experiencedialog" persistent max-width="40%">
          <v-card class="mx-auto pa-5" >
            <base-material-card
              color="error"
              icon="mdi-delete"
              title="ลบข้อมูล"
              class="px-5 py-3 text_google"
              
            ></base-material-card>
            <v-card-text class="text_google">
              <v-form ref="deletepersonnel_experienceform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12>
                      ยืนยันการลบข้อมูล :
                      <h3>{{ editpersonnel_experience.education_level }}</h3>
                    </v-flex>
                    <v-flex xs12 md6></v-flex>
                    <v-flex xs12 md6></v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn large @click.stop="deletepersonnel_experiencedialog = false">
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn large color="red darken-3" @click.stop="deletepersonnel_experienceubmit()" dark>
                <v-icon dark>mdi-delete</v-icon>&nbsp;ลบ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout> -->

      <!-- V-model editpersonnel_experiencedialog -->
      <!-- <v-layout row justify-center>
        <v-dialog v-model="editpersonnel_experiencedialog" persistent max-width="80%">
          <v-card class="mx-auto pa-5" >
            <base-material-card
              color="yellow"
              icon="mdi-clipboard-text"
              title="แก้ไขข้อมูลการศึกษา"
              class="px-5 py-3 text_google"
              
            ></base-material-card>
            <v-card-text>
              <v-form ref="editpersonnel_experienceform" lazy-validation>
                <v-container grid-list-md>
                   <v-layout wrap>
                    <v-flex md12>
                      <v-row>
                        <v-col cols="12" lg="6">
                          <v-combobox
                            v-model="editpersonnel_experience.education_level"
                            :items="education_level"
                            label="ระดับการศึกษา"
                            dense
                            :rules="[(v) => !!v || '']"
                          ></v-combobox>
                        
                        </v-col>
             <v-col cols="12" lg="6">
                          <v-combobox
                            v-model="editpersonnel_experience.personnel_id_branch"
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
                            v-model="editpersonnel_experience.faculty_name"
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
                            v-model="editpersonnel_experience.branch_name"
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
                            v-model="editpersonnel_experience.academy_name"
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
                                v-model="editpersonnel_experience.year_finish"
                                label="ปีการศึกษาที่จบ :"
                                prepend-icon="mdi-calendar"  
                              ></v-text-field>
                        </v-col>
                        
                       
                        <v-col cols="12" lg="6">
                          <v-text-field
                            v-model="editpersonnel_experience.academic_results"
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
              <v-btn large  @click.stop="editpersonnel_experiencedialog = false" rounded>
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn large color="warning" @click.stop="editpersonnel_experienceSubmit()" rounded>
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
      addpersonnel_experiencedialog: false,
      editpersonnel_experiencedialog: false,
      deletepersonnel_experiencedialog: false,
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
        { text: "คำนำหน้าชื่อ", align: "center", value: "title_s" },
        { text: "ชื่อ", align: "left", value: "frist_name" },
        { text: "นามสุกลุ", align: "left", value: "last_name" },      
        { text: "ปี", align: "center", value: "year_s" },
        { text: "รายการ", align: "left", value: "course_name" },
        { text: "สถานที่", align: "left", value: "course_location" },
        { text: "หน่วยงานที่จัด", align: "left", value: "agency_name" },
        { text: "วันที่เริ่มต้น", align: "center", value: "date_time_begin" },
        { text: "วันที่สิ้นสุด", align: "center", value: "date_time_end" },
        { text: "จำนวนชั่วโมง", align: "center", value: "number_hours" },   
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
      personnel_experience: [],
      addpersonnel_experience: {},
      editpersonnel_experience: [],
      personnel_experiences: [],
      personnel_experience_sub: [],   
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
     this.personnel_experiencesQueryAll()
  },

  methods: {
    async personnel_experiencesQueryAll() {     
         this.loading = true
          let userSession = JSON.parse(sessionStorage.getItem('user')) || 0   
        let result = await this.$http.post('personnel_experience.php', {
          ApiKey: this.ApiKey,
            user_name: userSession.user_name 
        }).finally(() => this.loading = false)
        this.personnel_experiences = result.data     
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
