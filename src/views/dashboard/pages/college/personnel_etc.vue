<template>
  <div>
    <v-container fluid>
      <base-material-card
        icon="mdi-clipboard-text"
        title="ข้อมูล ลูกจ้างประจำ พนักงานราชการ ครูอัตราจ้างหรือลูกจ้างชั่วคราว"
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
                @click.native="personnel_etcAdd()"
              >
                <v-icon>mdi-plus-circle-outline</v-icon>เพิ่มรายการ
              </v-btn>
            </v-col>
            <v-col cols="12" md="5">
              <v-select
                v-model="selectedHeaders"
                :items="headers"
                label="เลือกคอลัมน์ที่ต้องการแสดง"
                multiple
                outlined
                return-object
              >

                <template v-slot:selection="{ item, index }">
                  <v-chip v-if="index < 6">
                    <span>{{ item.text }}</span>
                  </v-chip>
                  <span v-if="index === 6" class="grey--text caption"
                    >(+{{ selectedHeaders.length - 6 }} คอลัมน์)</span
                  >
                </template>
              </v-select>                    
            </v-col>
            <v-col cols="12" md="7" class="text-center">
               <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            ประเภท
          </th>
          <th class="text-left">
            จำนวน (คน)
          </th>
           <th class="text-left">
            ประเภท
          </th>
          <th class="text-left">
            จำนวน (คน)
          </th>
        </tr>

      </thead>
      <tbody>
       <tr>
         <td align="left">ผู้อำนวยการ</td>
         <td align="left">{{ personnel_etcsCounts.directors }}</td>
          <td align="left">รองผู้อำนวยการ</td>
         <td align="left">{{ personnel_etcsCounts.se_directors }}</td>
       </tr>        
          <tr>
         <td align="left">ข้าราชการครู</td>
         <td align="left">{{ personnel_etcsCounts.teachers }}</td>
          <td align="left">ศึกษานิเทศก์</td>
         <td align="left">{{ personnel_etcsCounts.supervisions }}</td>
       </tr>      
          <tr>
         <td align="left">สนับสนุน</td>
         <td align="left">{{ personnel_etcsCounts.support_38 }}</td>
          <td align="left">ลูกจ้างประจำ</td>
         <td align="left">{{ personnel_etcsCounts.permanents }}</td>
       </tr>
         <tr>
         <td align="left">พนักงานราชการ</td>
         <td align="left">{{ personnel_etcsCounts.governments }}</td>
          <td align="left">ครูอัตราจ้างหรือลูกจ้างชั่วคราว</td>
         <td align="left">{{ personnel_etcsCounts.temporarys }}</td>
       </tr>       
      </tbody>
    </template>
  </v-simple-table>              
            </v-col>
          </v-row>
        </v-card>

        <v-data-table
          color="success"
          :loading="loading"
          :headers="showHeaders"
          :items="personnel_etcs"
          :search="search"
        >
         <template v-slot:[`item.personnel_etc_budget`]="{ item }">
           <span v-if="item.personnel_etc_budget==='budget'">จากงบประมาณ</span>  
           <span v-else-if="item.personnel_etc_budget==='income'">จากรายได้สถานศึกษา</span>  
          </template>

          <template v-slot:[`item.actions`]="{ item }">
            <v-icon
              color="yellow"
              @click.stop="personnel_etcEdit(item.personnel_etc_id)"
            >
              mdi-pencil
            </v-icon>
          </template>
          <template v-slot:[`item.action_s`]="{ item }">
            <v-icon
              color="red"
              @click.stop="personnel_etcDelete(item.personnel_etc_id)"
            >
              mdi-delete
            </v-icon>
          </template>
          <v-alert
            slot="no-results"
            :value="true"
            color="error"
            icon="mdi-alert"
            >ไม่พบผลลัพธ์ "{{ search }}" ที่คุณกำลังค้นหา.</v-alert
          >
        </v-data-table>
      </base-material-card>

      <!--addpersonnel_etcdialog  -->
      <v-layout row justify-center>
        <v-dialog
          v-model="addpersonnel_etcdialog"
          persistent
          max-width="60%"
          overlay-opacity="0.6"
        >
          <v-card class="mx-auto pa-5">
            <base-material-card
              icon="mdi-clipboard-text"
              title="เพิ่มข้อมูล ลูกจ้างประจำ พนักงานราชการ ครูอัตราจ้างหรือลูกจ้างชั่วคราว"
              class="px-5 py-3 text_google"
            ></base-material-card>
            <v-card-text class="text_google">
              <v-form ref="addpersonnel_etcform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md12>
                      <v-row>
                        <v-col cols="12" md="12">
                          <v-select
                            outlined
                            v-model="addpersonnel_etc.personnel_etc_m_type"
                            :items="type_personnel"
                            item-text="text"
                            item-value="value"
                            label="ประเภทบุคลากร"
                            :rules="[v => !!v || '']"
                          ></v-select>
                        </v-col>
                      </v-row>
                      <hr />
                      <v-row>
                        <v-col cols="12" md="6">
                          <v-text-field
                            outlined
                            v-model="addpersonnel_etc.personnel_etc_id_card"
                            label="รหัสบัตรประชาชน"
                            :rules="[v => !!v || '']"
                          ></v-text-field>
                          <v-text-field
                            outlined
                            v-model="addpersonnel_etc.personnel_etc_title"
                            label="คำนำหน้าชื่อ"
                            :rules="[v => !!v || '']"
                          ></v-text-field>
                          <v-text-field
                            outlined
                            v-model="addpersonnel_etc.personnel_etc_fristname"
                            label="ชื่อ"
                            :rules="[v => !!v || '']"
                          ></v-text-field>
                          <v-text-field
                            outlined
                            v-model="addpersonnel_etc.personnel_etc_lastname"
                            label="นามสกุล"
                            :rules="[v => !!v || '']"
                          ></v-text-field>
                          <v-text-field
                            outlined
                            v-model="addpersonnel_etc.personnel_etc_positon"
                            label="ตำแหน่ง"
                          ></v-text-field>
                          <v-text-field
                            outlined
                            v-model="addpersonnel_etc.personnel_etc_id_position"
                            label="เลขที่ตำแหน่ง"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field
                            outlined
                            v-model="addpersonnel_etc.personnel_etc_level"
                            v-if="
                              addpersonnel_etc.personnel_etc_m_type ===
                                'permanent' || addpersonnel_etc.personnel_etc_m_type ===
                                'director' || addpersonnel_etc.personnel_etc_m_type ===
                                'se_directo' || addpersonnel_etc.personnel_etc_m_type ===
                                'teacher' || addpersonnel_etc.personnel_etc_m_type ===
                                'supervision'
                            "
                            label="อันดับ/ระดับ"
                          ></v-text-field>
                          <v-text-field
                            outlined
                            v-model="addpersonnel_etc.personnel_etc_rang"
                            v-if="
                              'permanent' || addpersonnel_etc.personnel_etc_m_type ===
                                'director' || addpersonnel_etc.personnel_etc_m_type ===
                                'se_directo' || addpersonnel_etc.personnel_etc_m_type ===
                                'teacher' || addpersonnel_etc.personnel_etc_m_type ===
                                'supervision'
                            "
                            label="วิทยฐานะ"
                          ></v-text-field>
                          <v-text-field
                            outlined
                            v-model="addpersonnel_etc.personnel_etc_type"
                            v-if="
                              addpersonnel_etc.personnel_etc_m_type ===
                                'government'
                            "
                            label="ประเภท"
                          ></v-text-field>
                          <v-text-field
                            outlined
                            v-model="addpersonnel_etc.personnel_etc_about"
                            v-if="
                              addpersonnel_etc.personnel_etc_m_type ===
                                'government'
                            "
                            label="ด้าน"
                          ></v-text-field>
                          <v-select
                            outlined
                            v-model="addpersonnel_etc.personnel_etc_budget"
                            v-if="
                              addpersonnel_etc.personnel_etc_m_type ===
                                'temporary'
                            "
                            label="งบประมาณ"
                            :items="budget_type"
                            item-text="text"
                            item-value="value"
                          ></v-select>
                          <v-text-field
                            outlined
                            v-model="addpersonnel_etc.personnel_etc_education_1"
                            label="วุฒิการศึกษา(สาขาวิชา) ต่ำกว่า ป.ตรี"
                          ></v-text-field>
                          <v-text-field
                            outlined
                            v-model="addpersonnel_etc.personnel_etc_education_2"
                            label="วุฒิการศึกษา(สาขาวิชา) ปริญญาตรี"
                          ></v-text-field>
                          <v-text-field
                            outlined
                            v-model="addpersonnel_etc.personnel_etc_education_3"
                            label="วุฒิการศึกษา(สาขาวิชา) ปริญญาโท"
                          ></v-text-field>
                          <v-text-field
                            outlined
                            v-model="addpersonnel_etc.personnel_etc_education_4"
                            label="วุฒิการศึกษา(สาขาวิชา) ปริญญาเอก"
                          ></v-text-field>
                          <v-autocomplete
                            outlined
                            v-model="addpersonnel_etc.personnel_etc_branch"
                            :items="rate_work_course_stds"
                            item-text="branch_name_th"
                            item-value="id_course_branch"
                            label="สาขาวิชาที่สอน (เฉพาะผู้ที่ทำหน้าที่สอน)"
                          ></v-autocomplete>
                        </v-col>
                      </v-row>
                    </v-flex>
                  </v-layout>
                  <v-spacer></v-spacer>
                  <hr />
                  <v-row>
                    <v-col cols="12" lg="12" class="text-right">
                      <v-btn
                        large
                        color="success"
                        @click.stop="addpersonnel_etcSubmit()"
                        rounded
                      >
                        <v-icon dark>mdi-content-save</v-icon
                        >&nbsp;&nbsp;บันทึก</v-btn
                      >
                      <v-btn
                        large
                        color="warning"
                        @click.stop="addpersonnel_etcdialog = false"
                        rounded
                      >
                        <v-icon dark>mdi-close</v-icon>ยกเลิก
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model deletepersonnel_etcdialog -->
      <v-layout>
        <v-dialog
          v-model="deletepersonnel_etcdialog"
          persistent
          max-width="40%"
        >
          <v-card class="mx-auto pa-5">
            <base-material-card
              color="error"
              icon="mdi-delete"
              title="ลบข้อมูล"
              class="px-5 py-3 text_google"
            ></base-material-card>
            <v-card-text class="text_google">
              <v-form ref="deletepersonnel_etcform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12>
                      ยืนยันการลบข้อมูล :
                      <h3>{{ editpersonnel_etc.personnel_etc_id_card }}</h3>
                    </v-flex>
                    <v-flex xs12 md6>{{ editpersonnel_etc.personnel_etc_title }}{{ editpersonnel_etc.personnel_etc_fristname }} {{ editpersonnel_etc.personnel_etc_lastname }}</v-flex>
                    <v-flex xs12 md6></v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn large @click.stop="deletepersonnel_etcdialog = false">
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn
                large
                color="red darken-3"
                @click.stop="deletepersonnel_etcubmit()"
                dark
              >
                <v-icon dark>mdi-delete</v-icon>&nbsp;ลบ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model editpersonnel_etcdialog -->
      <v-layout row justify-center>
        <v-dialog v-model="editpersonnel_etcdialog" persistent max-width="50%">
          <v-card class="mx-auto pa-5">
            <base-material-card
              color="yellow"
              icon="mdi-clipboard-text"
              title="แก้ไขข้อมูล"
              class="px-5 py-3 text_google"
            ></base-material-card>
            <v-card-text>
              <v-form ref="editpersonnel_etcform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md12>
                      <v-row>
                        <v-col cols="12" md="12">
                          <v-select
                            outlined
                            v-model="editpersonnel_etc.personnel_etc_m_type"
                            :items="type_personnel"
                            item-text="text"
                            item-value="value"
                            label="ประเภทบุคลากร"
                            :rules="[v => !!v || '']"
                          ></v-select>
                        </v-col>
                      </v-row>
                      <hr />
                      <v-row>
                        <v-col cols="12" md="6">
                          <v-text-field
                            outlined
                            v-model="editpersonnel_etc.personnel_etc_id_card"
                            label="รหัสบัตรประชาชน"
                            :rules="[v => !!v || '']"
                          ></v-text-field>
                          <v-text-field
                            outlined
                            v-model="editpersonnel_etc.personnel_etc_title"
                            label="คำนำหน้าชื่อ"
                            :rules="[v => !!v || '']"
                          ></v-text-field>
                          <v-text-field
                            outlined
                            v-model="editpersonnel_etc.personnel_etc_fristname"
                            label="ชื่อ"
                            :rules="[v => !!v || '']"
                          ></v-text-field>
                          <v-text-field
                            outlined
                            v-model="editpersonnel_etc.personnel_etc_lastname"
                            label="นามสกุล"
                            :rules="[v => !!v || '']"
                          ></v-text-field>
                          <v-text-field
                            outlined
                            v-model="editpersonnel_etc.personnel_etc_positon"
                            label="ตำแหน่ง"

                          ></v-text-field>
                          <v-text-field
                            outlined
                            v-model="
                              editpersonnel_etc.personnel_etc_id_position
                            "
                            label="เลขที่ตำแหน่ง"
                       
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field
                            outlined
                            v-model="editpersonnel_etc.personnel_etc_level"
                            v-if="
                              editpersonnel_etc.personnel_etc_m_type ===
                                'permanent'
                            "
                            label="อันดับ/ระดับ"
                          
                          ></v-text-field>
                          <v-text-field
                            outlined
                            v-model="editpersonnel_etc.personnel_etc_rang"
                            v-if="
                              editpersonnel_etc.personnel_etc_m_type ===
                                'permanent'
                            "
                            label="วิทยฐานะ"
                          
                          ></v-text-field>
                          <v-text-field
                            outlined
                            v-model="editpersonnel_etc.personnel_etc_type"
                            v-if="
                              editpersonnel_etc.personnel_etc_m_type ===
                                'government'
                            "
                            label="ประเภท"
                          
                          ></v-text-field>
                          <v-text-field
                            outlined
                            v-model="editpersonnel_etc.personnel_etc_about"
                            v-if="
                              editpersonnel_etc.personnel_etc_m_type ===
                                'government'
                            "
                            label="ด้าน"
                         
                          ></v-text-field> 
                          <v-select
                            outlined
                            v-model="editpersonnel_etc.personnel_etc_budget"
                            v-if="
                              editpersonnel_etc.personnel_etc_m_type ===
                                'temporary'
                            "
                            label="งบประมาณ"
                            :items="budget_type"
                            item-text="text"
                            item-value="value"
                          ></v-select>


                          <v-text-field
                            outlined
                            v-model="
                              editpersonnel_etc.personnel_etc_education_1
                            "
                            label="วุฒิการศึกษา(สาขาวิชา) ต่ำกว่า ป.ตรี"
                          
                          ></v-text-field>
                          <v-text-field
                            outlined
                            v-model="
                              editpersonnel_etc.personnel_etc_education_2
                            "
                            :items="rate_work_course_stds"
                            item-text="branch_name_th"
                            item-value="id_course_branch"
                            label="วุฒิการศึกษา(สาขาวิชา) ปริญญาตรี"
                         
                          ></v-text-field>
                          <v-text-field
                            outlined
                            v-model="
                              editpersonnel_etc.personnel_etc_education_3
                            "
                            :items="rate_work_course_stds"
                            item-text="branch_name_th"
                            item-value="id_course_branch"
                            label="วุฒิการศึกษา(สาขาวิชา) ปริญญาโท"
                           
                          ></v-text-field>
                          <v-text-field
                            outlined
                            v-model="
                              editpersonnel_etc.personnel_etc_education_4
                            "
                            :items="rate_work_course_stds"
                            item-text="branch_name_th"
                            item-value="id_course_branch"
                            label="วุฒิการศึกษา(สาขาวิชา) ปริญญาเอก"
                           
                          ></v-text-field>
                          <v-autocomplete
                            outlined
                            v-model="editpersonnel_etc.personnel_etc_branch"
                            :items="rate_work_course_stds"
                            item-text="branch_name_th"
                            item-value="id_course_branch"
                            label="สาขาวิชาที่สอน (เฉพาะผู้ที่ทำหน้าที่สอน)"
                           
                          ></v-autocomplete>
                        </v-col>
                      </v-row>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                large
                @click.stop="editpersonnel_etcdialog = false"
                rounded
              >
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn
                large
                color="warning"
                @click.stop="editpersonnel_etcSubmit()"
                rounded
              >
                <v-icon dark>mdi-pencil</v-icon>&nbsp;แก้ไขข้อมูล
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
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
      ApiKey: "HRvec2021",
      loading: true,
      updateImageDialog: false,
      search: "",
      addpersonnel_etcdialog: false,
      editpersonnel_etcdialog: false,
      deletepersonnel_etcdialog: false,
      showimagedialog: false,
      snackbar: {
        show: false,
        color: "",
        timeout: 5000,
        icon: "",
        text: ""
      },
      currentPK: null,
      headers: [],
      selectedHeaders: [],
      headersMap: [
       
        { text: "รหัส", align: "center", value: "personnel_etc_id_card" },
        { text: "คำนำหน้าชื่อ", align: "center", value: "personnel_etc_title" },
        { text: "ชื่อ", align: "center", value: "personnel_etc_fristname" },
        { text: "นามสกุล", align: "center", value: "personnel_etc_lastname" },
        { text: "ตำแหน่ง", align: "center", value: "personnel_etc_positon" },
        {
          text: "เลขที่ตำแหน่ง",
          align: "center",
          value: "personnel_etc_id_position"
        },
        { text: "อันดับ/ระดับ", align: "center", value: "personnel_etc_level" },
        { text: "วิทยฐานะ", align: "center", value: "personnel_etc_rang" },
        { text: "ประเภท", align: "center", value: "personnel_etc_type" },
        { text: "ด้าน", align: "center", value: "personnel_etc_about" },
        {
          text: "เงินที่ใช้จ้าง",
          align: "center",
          value: "personnel_etc_budget"
        },
        {
          text: "ต่ำกว่า ป.ตรี",
          align: "center",
          value: "personnel_etc_education_1"
        },
        {
          text: "ปริญญาตรี",
          align: "center",
          value: "personnel_etc_education_2"
        },
        {
          text: "ปริญญาโท",
          align: "center",
          value: "personnel_etc_education_3"
        },
        {
          text: "ปริญญาเอก",
          align: "center",
          value: "personnel_etc_education_4"
        },
        {
          text: "สาขาวิชาสอน",
          align: "center",
          value: "personnel_etc_branch_n"
        },
        {
          text: "แก้ไข",
          align: "center",
          value: "actions",
          icon: "mdi-file-document-edit"
        },
        {
          text: "ลบ",
          align: "center",
          value: "action_s",
          icon: "mdi-delete-forever"
        }
      ],
      rowsperpage: [
        25,
        50,
        100,
        {
          text: "All",
          value: -1
        }
      ],
      pagination: {},
      personnel_etc: [],
      addpersonnel_etc: {},
      editpersonnel_etc: [],
      personnel_etcs: [],
      personnel_etc_sub: [],
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      menu2: false,
      menu3: false,
      menu4: false,
      colleges: {},
      provinces: [],
      prefectures: [],
      regions: [],
      region_ena: true,
      rate_work_course_stds: [],
      type_personnel: [
        { text: "ผู้อำนวยการ", value: "director" },
        { text: "รองผู้อำนวยการ", value: "se_directo" },
        { text: "ข้าราชการครู", value: "teacher" },
        { text: "ศึกษานิเทศก์", value: "supervision" },
        { text: "38", value: "38" },
        { text: "ลูกจ้างประจำ", value: "permanent" },        
        { text: "พนักงานราชการ", value: "government" },
        { text: "ครูอัตราจ้างหรือลูกจ้างชั่วคราว", value: "temporary" }
      ],
      budget_type: [
        { text: "จากงบประมาณ", value: "budget" },
        { text: "จากรายได้สถานศึกษา", value: "income" }
      ],
      personnel_etcsCounts:[],
    };
  },
  async created() {
    this.headers = Object.values(this.headersMap);
    this.selectedHeaders = this.headers;
  },
  async mounted() {
    this.personnel_etcsQueryAll();
    this.rate_work_course_stdsQueryAll();
    this.personnel_etcsCount();   
  },

  methods: {
    async rate_work_course_stdsQueryAll() {
      let result = await this.$http.post("rate_work_course_std.php", {
        ApiKey: this.ApiKey
      });
      this.rate_work_course_stds = result.data;
    },

    async personnel_etcsQueryAll() {
      this.loading = true;
      let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
      let result = await this.$http
        .post("personnel_etc.php", {
          ApiKey: this.ApiKey,
          personnel_etc_college_code: userSession.user_name
        })
        .finally(() => (this.loading = false));
      this.personnel_etcs = result.data;
    },

    async personnel_etcsCount() {     
      let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
      let result = await this.$http
        .post("personnel_etc.php", {
          ApiKey: this.ApiKey,
          count_personnel: "Ok",
          personnel_etc_college_code: userSession.user_name
        })        
      this.personnel_etcsCounts = result.data;
    
    },

    //Add data
    async personnel_etcAdd() {
      this.addpersonnel_etc = {};
      this.addpersonnel_etcdialog = true;
    },

    async addpersonnel_etcSubmit() {
      if (this.$refs.addpersonnel_etcform.validate()) {
        let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
        this.addpersonnel_etc.ApiKey = this.ApiKey;
        this.addpersonnel_etc.personnel_etc_college_code =
          userSession.user_name;
        console.log(this.addpersonnel_etc);

        let result = await this.$http.post(
          "personnel_etc.insert.php",
          this.addpersonnel_etc
        );
        if (result.data.status == true) {
          this.personnel_etc = result.data;
          this.snackbar.icon = "mdi-font-awesome";
          this.snackbar.color = "success";
          this.snackbar.text = "บันทึกข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.personnel_etcsQueryAll();
    this.personnel_etcsCount();   

        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text = "บันทึกข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.addpersonnel_etcdialog = false;
      }
    },

    //Edit data
    async personnel_etcEdit(personnel_etc_id) {
      let result = await this.$http.post("personnel_etc.php", {
        ApiKey: this.ApiKey,
        personnel_etc_id: personnel_etc_id
      });
      this.editpersonnel_etc = result.data;
      this.editpersonnel_etcdialog = true;
console.log(result.data)
    },

    async editpersonnel_etcSubmit() {
      if (this.$refs.editpersonnel_etcform.validate()) {
        this.editpersonnel_etc.ApiKey = this.ApiKey;
       
        let result = await this.$http.post(
          "personnel_etc.update.php",
          this.editpersonnel_etc
        );
        if (result.data.status == true) {
          this.personnel_etc = result.data;
          this.snackbar.icon = "mdi-content-save";
          this.snackbar.color = "success";
          this.snackbar.text = "แก้ไขข้อมูลเรียบร้อย";
          this.snackbar.show = true;
           this.personnel_etcsQueryAll();
    this.personnel_etcsCount();   
        } else {
          this.snackbar.icon = "mdi-alert";
          this.snackbar.color = "red";
          this.snackbar.text = "แก้ไขข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.editpersonnel_etcdialog = false;
      }
    },

    //DELETE data
    async personnel_etcDelete(personnel_etc_id) {
      let result = await this.$http.post("personnel_etc.php", {
        ApiKey: this.ApiKey,
        personnel_etc_id: personnel_etc_id
      });
      this.editpersonnel_etc = result.data;
      this.deletepersonnel_etcdialog = true;
      
    },

    async deletepersonnel_etcubmit() {
      if (this.$refs.deletepersonnel_etcform.validate())
        this.editpersonnel_etc.ApiKey = this.ApiKey;
      {
        let result = await this.$http.post(
          "personnel_etc.delete.php",
          this.editpersonnel_etc
        );
        if (result.data.status == true) {
          this.snackbar.icon = "mdi-content-save";
          this.snackbar.color = "success";
          this.snackbar.text = "ลบข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.personnel_etcsQueryAll();
    this.personnel_etcsCount();   
        } else {
          this.snackbar.icon = "mdi-alert";
          this.snackbar.color = "red";
          this.snackbar.text = "ลบข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.deletepersonnel_etcdialog = false;
      }
    }
  },

  computed: {
    pages() {
      if (
        this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      )
        return 0;

      return Math.ceil(
        this.pagination.totalItems / this.pagination.rowsPerPage
      );
    },
    showHeaders() {
      return this.headers.filter(s => this.selectedHeaders.includes(s));
    }
  }
};
</script>
<style>
.v-data-table thead th {
  font-size: 16px !important;
}
</style>
