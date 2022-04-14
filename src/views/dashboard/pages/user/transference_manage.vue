<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="12">
        <base-material-card color="primary">
          <template v-slot:heading>
            <h2 class="h1 font-weight-light text_google">
              <v-icon large left>mdi-file-send</v-icon
              >การย้ายสายงานบริหารสถานศึกษา
            </h2>
          </template>
          <v-card class="pa-2 ma-6">
            <v-card-title>
              <div class="font-weight-light v-size--x-large">
                <v-icon large left>mdi-account-details</v-icon> ข้อมูลเบื้องต้น
                รหัสรายการอ้างอิง {{ manage_id_ref }}
              </div>
            </v-card-title>
            <v-row>
              <v-col cols="12" sm="6">
                <v-alert
                  border="left"
                  colored-border
                  color="green darken-1"
                  elevation="2"
                  type="info"
                >
                  <h2>
                    ชื่อ-นามสกุล : {{ user.title_s }}{{ user.frist_name }}
                    {{ user.last_name }}
                  </h2>
                  <h3>รหัสบัตรประชาชน : {{ user.id_card }}</h3>
                  <h3>เลขที่ตำแหน่ง : {{ user.id_position }}</h3>
                  <h3>วิทยฐานะ : {{ user.rang_name }}</h3>
                  <h3>สังกัด (สถานศึกษา) : {{ user.college_name }}</h3>
                  <h3>
                    รับเงินเดือนอันดับ : {{ user.rang_name }} ({{
                      user.rang_level
                    }}) ขั้น
                  </h3>
                  <h3>เงินเดือน : {{ user.salary_s }} บาท</h3>
                  <h3>
                    เกิดวันที่ : {{ user.brith_day }} เดือน
                    {{ user.brith_month }} พ.ศ.
                    {{ user.brith_year }}
                  </h3>
                  <h3>ปัจจุบันอายุ {{ get_Age }}</h3>
                  <hr />
                  <h3>
                    วันที่เริ่มบรรจุเข้ารับราชการ : {{ date_appoin_ch || "-" }}
                  </h3>
                  <h3>ระยะเวลาตั้งแต่บรรจุเข้ารับราชการ : {{ get_gov_Age }}</h3>
                  <h3>สถานะภาพ : {{ marital_status }}</h3>
                </v-alert>
              </v-col>

              <v-col cols="12" sm="6" align="center">
                <v-alert
                  border="left"
                  colored-border
                  color="green darken-1"
                  elevation="2"
                  type="info"
                >
                  <h2>
                    ปีงบประมาณ : {{ parseInt(periods.period_year) + 543 }}
                  </h2>
                  <h3>เขียนที่ : {{ user.college_name }}</h3>
                  <h3>วันที่ยื่นคำร้อง : {{ date_today }}</h3>
                  <h3>{{ get_gov_Age_year }}</h3>
                  <hr />
                  <div v-if="user.date_app_now === ''">
                    <v-alert prominent type="error">
                      <v-row>
                        <v-col class="grow">
                          <h3>
                            ให้งานบุคลากร วิทยาลัย
                            ดำเนินการเกี่ยวกับวันที่ปฏิบัติงาน ณ
                            สถานศึกษาปัจจุบันให้เรียบร้อย
                          </h3>
                        </v-col>
                      </v-row>
                    </v-alert>
                  </div>
                  <div v-else>
                    <h3>
                      วันที่เริ่มปฏิบัติหน้าที่ในสถานศึกษาปัจจุบัน :
                      {{
                        user.date_app_now
                          | moment("add", "543 years")
                          | moment("D MMMM YYYY")
                      }}
                    </h3>
                    <h2>ปฏิบัติหน้าที่เป็นเวลา : {{ get_Appoint_Age }}</h2>
                  </div>

                  <v-btn
                    v-if="transference_manages.manage_id_ref === manage_id_ref"
                    x-large
                    color="info"
                    dark
                    class="ma-2"
                    :href="'#/user/print_info_manage/' + manage_id_ref"
                    target="_blank"
                  >
                    <v-icon>mdi-printer</v-icon>
                    <span>พิมพ์แบบแสดงความประสงค์ขอย้าย</span>
                  </v-btn>
                </v-alert>
              </v-col>

              <v-col cols="12" sm="12">
                <v-alert
                  border="left"
                  colored-border
                  type="error"
                  elevation="2"
                  v-if="user.tel_p === ''"
                >
                  <h2 class="red--text">
                    กรุณาปรับปรุงข้อมูลติดต่อ เบอร์โทร E-mail
                    ยังหน้าข้อมูลผู้ใช้งานระบบให้เรียบร้อย
                    <v-btn color="red" large rounded dark to="/UserProfile">
                      <v-icon>mdi-account-circle</v-icon>
                      ข้อมูลผู้ใช้งานระบบ</v-btn
                    >
                  </h2>
                </v-alert>
                <v-alert
                  border="left"
                  colored-border
                  type="error"
                  elevation="2"
                  v-if="personnel_work_history.count_work === '0'"
                >
                  <h2 class="red--text">
                    กรุณา บันทึกประวัติการรับราชการให้เรียบร้อย
                    <v-btn
                      color="red"
                      large
                      rounded
                      dark
                      to="/personnel_work_history"
                    >
                      <v-icon>mdi-account-circle</v-icon>
                      ประวัติการรับราชการ</v-btn
                    >
                  </h2>
                </v-alert>
                <v-alert
                  border="left"
                  colored-border
                  color="green darken-1"
                  elevation="2"
                  type="info"
                >
                  <v-card v-if="personnel_education_check.count_ed === '0'">
                    <v-alert prominent type="error">
                      <v-row align="center">
                        <v-col class="grow">
                          <h2>
                            ให้ดำเนินการบันทึกข้อมูลคุณวุฒิการศึกษาของท่านเรียบร้อย
                          </h2>
                        </v-col>
                        <v-col class="shrink">
                          <v-btn large rounded dark to="/personnel_education">
                            <v-icon>mdi-school</v-icon> วุฒิการศึกษา</v-btn
                          >
                        </v-col>
                      </v-row>
                    </v-alert>
                  </v-card>
                  <v-card v-else>
                    <v-card-title class="mt-8">
                      <v-avatar size="56">
                        <v-icon large left>mdi-cast-education</v-icon>
                      </v-avatar>
                      <p class="ml-3">ประวัติการศึกษา</p>
                    </v-card-title>

                    <v-card-text>
                      <v-timeline align-top dense>
                        <v-timeline-item
                          v-for="item in personnel_educations"
                          :key="item.id_red"
                          small
                        >
                          <div>
                            <div class="font-weight-normal">
                              {{ item.education_level }} คณะวิชา :
                              {{ item.faculty_name }} สาขาวิชา :
                              {{ item.branch_name }} สำเร็จปีการศึกษา :
                              {{ item.year_finish }}
                            </div>
                          </div>
                        </v-timeline-item>
                      </v-timeline>
                    </v-card-text>
                  </v-card>
                </v-alert>
              </v-col>
            </v-row>
          </v-card>

          <v-form v-if="transference_manages.manage_id_ref === manage_id_ref">
            <v-alert border="right" colored-border type="error" elevation="2">
              <h1>
                ท่านได้ยืนแบบแสดงความประสงค์ขอย้าย
                ของข้าราชการครูและบุคลากรทางการศึกษา สายงานบริหารสถานศึกษา
                ผ่านระบบออนไลน์เป็นที่เรียนร้อย กรุณา
                พิมพ์แบบแสดงความประสงค์ขอย้าย
                เพื่อเสนอความเห็นชอบจากผู้บังคับบัญชาต่อไป
              </h1>
            </v-alert>
          </v-form>
          <v-alert
            border="right"
            colored-border
            type="error"
            elevation="2"
            v-if="get_gov_Age_year === 0"
          >
            <h1>
              ตามนัยหนังสือสำนักงาน ก.ค.ศ. ที่ ศธ 0206.4/ว 7 ลงวันที่ 12 พฤษภาคม
              2564 หลักเกณฑ์และวิธีการย้ายผู้บริหารสถานศึกษา
              สังกัดกระทรวงศึกษาธิการ
              ผู้ขอย้ายดำรงตำแหน่งในสถานศึกษาปัจจุบันไม่น้อยกว่า 12 เดือน
              โดยให้นับระยะเวลาการดำรงตำแหน่งถึงวันที่ 30 กันยายน
              ของปีที่ยื่นคำร้องขอย้ายประจำปี
            </h1>
          </v-alert>
          <v-form
            ref="addtransference_manageform"
            lazy-validation
            v-if="
              (get_gov_Age_year > 0 && user.user_status === 'se_director') ||
                (user.user_status === 'director' &&
                  transference_manages.manage_id_ref !== manage_id_ref)
            "
          >
            <v-card class="pa-2 ma-2">
              <v-card-title>
                <div class="font-weight-light v-size--x-large">
                  <v-icon large left>mdi-electron-framework</v-icon>
                  ความรู้ความสามารถในการพัฒนาสถานศึกษา
                </div>
              </v-card-title>
              <v-row>
                <v-col cols="12" sm="12">
                  <v-textarea
                    v-model="addtransference_manage.manage_knowledge"
                    outlined
                  ></v-textarea>
                </v-col>
              </v-row>

              <v-card-title>
                <div class="font-weight-light v-size--x-large">
                  <v-icon large left>mdi-electron-framework</v-icon>
                  ประสบการณ์
                </div>
              </v-card-title>
              <v-row>
                <v-col cols="12" sm="12">
                  <v-textarea
                    v-model="addtransference_manage.manage_experience"
                    outlined
                  ></v-textarea>
                </v-col>
              </v-row>
              <v-card-title>
                <div class="font-weight-light v-size--x-large">
                  <v-icon large left>mdi-electron-framework</v-icon>
                  ข้อมูลคู่สมรส
                </div>
              </v-card-title>
              <v-card class="pa-2">
                <v-row>
                  <v-col cols="12" md="4">
                    <v-text-field
                      outlined
                      v-model="addtransference_manage.manage_spouse"
                      label="คู่สมรสชื่อ : "
                    ></v-text-field
                  ></v-col>
                  <v-col cols="12" md="4"
                    ><v-text-field
                      outlined
                      v-model="addtransference_manage.manage_spouse_occupation"
                      label="คู่สมรสประกอบอาชีพ : "
                    ></v-text-field
                  ></v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      outlined
                      v-model="addtransference_manage.manage_spouse_location"
                      label="สถานที่ประกอบอาชีพของคู่สมรส : "
                    ></v-text-field
                  ></v-col>
                  <v-col cols="12" md="4">
                    <v-autocomplete
                      outlined
                      v-model="addtransference_manage.manage_domicile"
                      :items="provices_sh"
                      item-text="province_name"
                      item-value="province_ID"
                      label="ภูมิลำเนาของข้าพเจ้า จังหวัด : "
                    ></v-autocomplete
                  ></v-col>
                  <v-col cols="12" md="4">
                    <v-autocomplete
                      outlined
                      v-model="addtransference_manage.manage_spouse_domicile"
                      :items="provices_sh"
                      item-text="province_name"
                      item-value="province_ID"
                      label="ภูมิลำเนาของคู่สมรส จังหวัด : "
                    ></v-autocomplete
                  ></v-col>
                </v-row>
              </v-card>
              <v-card-title>
                <div class="font-weight-light v-size--x-large">
                  <v-icon large left>mdi-electron-framework</v-icon>
                  ข้อมูลที่อยู่ปัจจุบัน
                </div>
              </v-card-title>
              <v-card class="pa-2">
                <v-row>
                  <v-col cols="12" md="12">
                    <v-textarea
                      rows="2"
                      outlined
                      v-model="addtransference_manage.manage_address_now"
                      label="บ้านเลขที่ หมู่ที่ ถนน ตำบล/แขวง อำเภอ/เขต จังหวัด รหัสไปรษณีย์: "
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-card>
              <v-card-title>
                <div class="font-weight-light v-size--x-large">
                  <v-icon large left>mdi-electron-framework</v-icon>
                  ข้อมูลที่อยู่เมื่อได้ย้ายแล้ว
                </div>
              </v-card-title>
              <v-card class="pa-2">
                <v-row>
                  <v-col cols="12" md="12">
                    <v-textarea
                      rows="2"
                      outlined
                      v-model="addtransference_manage.manage_after_move"
                      label="บ้านเลขที่ หมู่ที่ ถนน ตำบล/แขวง อำเภอ/เขต จังหวัด รหัสไปรษณีย์: "
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-card>

              <v-card-title>
                <div class="font-weight-light v-size--x-large">
                  <v-icon large left>mdi-electron-framework</v-icon>
                  ข้อมูลติดต่อ
                </div>
              </v-card-title>
              <v-card class="pa-2">
                <v-row>
                  <v-col cols="12" md="12">
                    <v-alert
                      border="left"
                      colored-border
                      type="error"
                      elevation="2"
                      v-if="user.tel_p === ''"
                    >
                      กรุณาปรับปรุงข้อมูลยังหน้าข้อมูลผู้ใช้งานระบบ
                    </v-alert>

                    <v-alert
                      border="left"
                      colored-border
                      type="info"
                      elevation="2"
                      v-else
                    >
                      โทรศัพท์ที่สามารถติดต่อได้โดยตรง : {{ user.tel_p }} E-mail
                      : {{ user.e_mail }}
                    </v-alert>
                  </v-col>
                </v-row>
              </v-card>
            </v-card>

            <v-card>
              <v-card-title class="mt-8">
                <v-avatar size="56">
                  <v-icon large left>mdi-cast-education</v-icon>
                </v-avatar>
                <p class="ml-3">ประวัติการรับราชการ</p>
              </v-card-title>

              <v-data-table
                :headers="header_work"
                :items="personnel_work_history"
                class="elevation-1"
              >
                <template v-slot:[`item`]="{ index, item }">
                  <tr>
                    <td class="text-center">{{ index + 1 }}</td>
                    <td class="text-center">
                      {{
                        item.date_begin
                          | moment("add", "543 years")
                          | moment("D MMMM YYYY")
                      }}
                    </td>
                    <td class="text-center">{{ item.position_s }}</td>
                    <td class="text-center">{{ item.college_name }}</td>
                    <td class="text-center"></td>
                  </tr>
                </template>
              </v-data-table>
            </v-card>

            <v-card class="pa-2 ma-2">
              <v-card-title>
                <div class="font-weight-light v-size--x-large">
                  <v-icon large left>mdi-account-reactivate-outline</v-icon>
                  อยู่ระหว่างลาศึกษาต่อเต็มเวลาหรือไม่
                </div>
              </v-card-title>

              <v-row>
                <v-col cols="12" sm="12">
                  <v-row>
                    <v-alert
                      class="mx-auto justify-center pa-2 ma-2"
                      border="bottom"
                      colored-border
                      type="warning"
                      elevation="2"
                    >
                      <v-radio-group
                        row
                        v-model="addtransference_manage.manage_on_study_leave"
                      >
                        <v-radio value="no_leave">
                          <template v-slot:label>
                            <div>
                              <strong class="primary--text">ไม่อยู่</strong>
                            </div>
                          </template>
                        </v-radio>
                        <v-radio value="leave">
                          <template v-slot:label>
                            <div>
                              <strong class="warning--text">อยู่</strong>
                            </div>
                          </template>
                        </v-radio>
                      </v-radio-group>
                    </v-alert>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-card class="pa-2 ma-2">
                    <v-row>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="
                            addtransference_manage.manage_study_leave_location
                          "
                          :disabled="
                            addtransference_manage.manage_on_study_leave ===
                              'no_leave'
                          "
                          outlined
                          label="อยู่ระหว่างลาศึกษาต่อที่ :"
                          prepend-icon="mdi-office-building-marker"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="
                            addtransference_manage.manage_study_leave_level
                          "
                          :disabled="
                            addtransference_manage.manage_on_study_leave ===
                              'no_leave'
                          "
                          outlined
                          label="เคยลาศึกษาต่อ (ครั้งล่าสุด) ระดับ :"
                          prepend-icon="mdi-office-building-marker"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-autocomplete
                          v-model="
                            addtransference_manage.manage_study_leave_college
                          "
                          outlined
                          :items="colleges"
                          item-text="college_name"
                          item-value="college_code"
                          label="สถานศึกษา"
                          prepend-icon="mdi-office-building-marker"
                          :disabled="
                            addtransference_manage.manage_on_study_leave ===
                              'no_leave'
                          "
                        />
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-dialog
                          ref="dialog_1"
                          v-model="modal_1"
                          :return-value.sync="date"
                          persistent
                          width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              outlined
                              v-model="
                                addtransference_manage.manage_study_leave_start
                              "
                              label="ตั้งแต่วันที่ :"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              :disabled="
                                addtransference_manage.manage_on_study_leave ===
                                  'no_leave'
                              "
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="
                              addtransference_manage.manage_study_leave_start
                            "
                            scrollable
                            locale="th"
                          >
                            <v-spacer></v-spacer>
                            <v-btn
                              text
                              color="primary"
                              @click="modal_1 = false"
                            >
                              Cancel
                            </v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.dialog_1.save(date)"
                            >
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-dialog>
                      </v-col>

                      <v-col cols="12" sm="6">
                        <v-dialog
                          ref="dialog_2"
                          v-model="modal_2"
                          :return-value.sync="date"
                          persistent
                          width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              outlined
                              v-model="
                                addtransference_manage.manage_study_leave_end
                              "
                              label="ถึงวันที่ :"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              :disabled="
                                addtransference_manage.manage_on_study_leave ===
                                  'no_leave'
                              "
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="
                              addtransference_manage.manage_study_leave_end
                            "
                            scrollable
                            locale="th"
                          >
                            <v-spacer></v-spacer>
                            <v-btn
                              text
                              color="primary"
                              @click="modal_2 = false"
                            >
                              Cancel
                            </v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.dialog_2.save(date)"
                            >
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-dialog>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>

            <v-card class="pa-2 ma-2">
              <v-card-title>
                <div class="font-weight-light v-size--x-large">
                  <v-icon large left>mdi-electron-framework</v-icon>
                  ข้อมูลอื่น ๆ
                </div>
              </v-card-title>
              <v-row class="m-0 p-1">
                <v-col cols="12" sm="12">
                  <v-textarea
                    v-model="addtransference_manage.manage_performance"
                    outlined
                    label="ผลการปฏิบัติงาน (ระบุ)"
                  ></v-textarea>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-card class="pa-2 ma-2">
                    <v-card-title>
                      <div class="font-weight-light v-size--x-large">
                        <v-icon large left>mdi-electron-framework</v-icon>
                        การรักษาวินัยและจรรยาบรรณ
                      </div>
                    </v-card-title>
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-alert
                          class="mx-auto justify-center pa-2 ma-2"
                          border="bottom"
                          colored-border
                          type="warning"
                          elevation="2"
                        >
                          <h3>เคยถูกลงโทษทางวินัยหรือไม่</h3>
                          <v-radio-group
                            v-model="addtransference_manage.manage_disciplinary"
                          >
                            <v-radio value="no_discip">
                              <template v-slot:label>
                                <div>
                                  <strong class="primary--text"
                                    >ไม่เคยถูกลงโทษทางวินัย</strong
                                  >
                                </div>
                              </template>
                            </v-radio>
                            <v-radio value="discip">
                              <template v-slot:label>
                                <div>
                                  <strong class="warning--text"
                                    >เคยถูกลงโทษทางวินัย</strong
                                  >
                                </div>
                                <v-checkbox
                                  v-model="
                                    addtransference_manage.manage_disciplinary_1
                                  "
                                  label="ภาคทัณ์"
                                  value="1"
                                  :disabled="
                                    addtransference_manage.manage_disciplinary ===
                                      'no_discip'
                                  "
                                ></v-checkbox>
                                <v-checkbox
                                  v-model="
                                    addtransference_manage.manage_disciplinary_2
                                  "
                                  label="ตัดเงินเดือน"
                                  value="1"
                                  :disabled="
                                    addtransference_manage.manage_disciplinary ===
                                      'no_discip'
                                  "
                                ></v-checkbox>
                                <v-checkbox
                                  v-model="
                                    addtransference_manage.manage_disciplinary_3
                                  "
                                  label="ลดเงินเดือน"
                                  value="1"
                                  :disabled="
                                    addtransference_manage.manage_disciplinary ===
                                      'no_discip'
                                  "
                                ></v-checkbox>
                              </template>
                            </v-radio>
                          </v-radio-group>
                        </v-alert>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-alert
                          class="mx-auto justify-center pa-2 ma-2"
                          border="bottom"
                          colored-border
                          type="warning"
                          elevation="2"
                        >
                          <h3>
                            เคยถูกพิจารณาเกี่ยวกับการประกอบวิชาชีพครู/ผู้บริหารสถานศึกษาหรือไม่
                          </h3>
                          <v-radio-group
                            v-model="addtransference_manage.manage_license"
                          >
                            <v-radio value="no_license">
                              <template v-slot:label>
                                <div>
                                  <strong class="primary--text">ไม่เคย</strong>
                                </div>
                              </template>
                            </v-radio>
                            <v-radio value="license">
                              <template v-slot:label>
                                <div>
                                  <strong class="warning--text">เคย</strong>
                                </div>
                                <v-checkbox
                                  v-model="
                                    addtransference_manage.manage_license_1
                                  "
                                  label="ตักเตือน"
                                  value="1"
                                  :disabled="
                                    addtransference_manage.manage_license ===
                                      'no_license'
                                  "
                                ></v-checkbox>
                                <v-checkbox
                                  v-model="
                                    addtransference_manage.manage_license_2
                                  "
                                  label="ภาคทัณฑ์"
                                  value="1"
                                  :disabled="
                                    addtransference_manage.manage_license ===
                                      'no_license'
                                  "
                                ></v-checkbox>
                                <v-checkbox
                                  v-model="
                                    addtransference_manage.manage_license_3
                                  "
                                  label="พักใช้ใบอนุญาต"
                                  value="1"
                                  :disabled="
                                    addtransference_manage.manage_license ===
                                      'no_license'
                                  "
                                ></v-checkbox>
                                <v-checkbox
                                  v-model="
                                    addtransference_manage.manage_license_4
                                  "
                                  label="เพิกถอนใบอนุญาต"
                                  value="1"
                                  :disabled="
                                    addtransference_manage.manage_license ===
                                      'no_license'
                                  "
                                ></v-checkbox>
                              </template>
                            </v-radio>
                          </v-radio-group> </v-alert
                      ></v-col>
                    </v-row>
                    <v-row> </v-row>
                  </v-card>
                </v-col>
              </v-row>
              <v-card-title>
                <div class="font-weight-light v-size--x-large">
                  <v-icon large left>mdi-electron-framework</v-icon>
                  ปริมาณงานหน่วยงานการศึกษาปัจจุบัน
                </div>
              </v-card-title>
              <v-card>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="addtransference_manage.manage_personnel"
                      outlined
                      label="จำนวนบุคลากร คน:"
                      prepend-icon="mdi-office-building-marker"
                      type="number"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6"
                    ><v-text-field
                      v-model="addtransference_manage.manage_classroom"
                      outlined
                      label="จำนวนห้องเรียน ห้อง:"
                      prepend-icon="mdi-office-building-marker"
                      type="number"
                    ></v-text-field
                  ></v-col>
                  <v-col cols="12" md="6"
                    ><v-text-field
                      v-model="addtransference_manage.manage_std_all"
                      outlined
                      label="จำนวนนักเรียนรวม คน:"
                      prepend-icon="mdi-office-building-marker"
                      type="number"
                    ></v-text-field
                  ></v-col>
                  <v-col cols="12" md="6"
                    ><v-text-field
                      v-model="addtransference_manage.manage_std_vc"
                      outlined
                      label="ปวช. จำนวน คน:"
                      prepend-icon="mdi-office-building-marker"
                      type="number"
                    ></v-text-field
                  ></v-col>
                  <v-col cols="12" md="6"
                    ><v-text-field
                      v-model="addtransference_manage.manage_std_hvc"
                      outlined
                      label="ปวส. จำนวน คน:"
                      prepend-icon="mdi-office-building-marker"
                      type="number"
                    ></v-text-field
                  ></v-col>
                  <v-col cols="12" md="6"
                    ><v-text-field
                      v-model="addtransference_manage.manage_std_sc"
                      outlined
                      label="ระยะสั้น จำนวน คน:"
                      prepend-icon="mdi-office-building-marker"
                      type="number"
                    ></v-text-field
                  ></v-col>
                </v-row>
              </v-card>
            </v-card>

            <v-card class="pa-2 ma-2">
              <v-card-title>
                <div class="font-weight-light v-size--x-large">
                  <v-icon large left>mdi-office-building-marker</v-icon>
                  อยู่ระหว่างช่วยปฏิบัติราชการหรือไม่
                </div>
              </v-card-title>
              <v-row>
                <v-col cols="12" sm="12">
                  <v-row>
                    <v-alert
                      class="mx-auto justify-center pa-2 ma-2"
                      border="bottom"
                      colored-border
                      type="warning"
                      elevation="2"
                    >
                      <v-radio-group
                        row
                        v-model="addtransference_manage.manage_service_status"
                      >
                        <v-radio value="not_service">
                          <template v-slot:label>
                            <div>
                              <strong class="primary--text">ไม่อยู่</strong>
                            </div>
                          </template>
                        </v-radio>
                        <v-radio value="gov_service">
                          <template v-slot:label>
                            <div>
                              <strong class="warning--text"
                                >ช่วยปฏิบัติราชการ</strong
                              >
                            </div>
                          </template>
                        </v-radio>
                      </v-radio-group>
                    </v-alert>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-card class="pa-2 ma-2">
                    <v-row>
                      <v-col cols="12" sm="6">
                        <v-autocomplete
                          v-model="addtransference_manage.manage_service_status"
                          outlined
                          :items="colleges"
                          item-text="college_name"
                          item-value="college_code"
                          label="ช่วยปฏิบัติราชการที่ :"
                          prepend-icon="mdi-office-building-marker"
                          :disabled="
                            addtransference_manage.manage_service_status ===
                              'not_service'
                          "
                        />
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-dialog
                          ref="dialog_3"
                          v-model="modal_3"
                          :return-value.sync="date"
                          persistent
                          width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              outlined
                              v-model="
                                addtransference_manage.manage_service_datetime
                              "
                              label="ตั้งแต่วันที่ :"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              :disabled="
                                addtransference_manage.manage_service_status ===
                                  'not_service'
                              "
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="
                              addtransference_manage.manage_service_datetime
                            "
                            scrollable
                            locale="th"
                          >
                            <v-spacer></v-spacer>
                            <v-btn
                              text
                              color="primary"
                              @click="modal_3 = false"
                            >
                              Cancel
                            </v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.dialog_3.save(date)"
                            >
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-dialog>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>

            <v-card class="pa-2 ma-2">
              <v-card-title>
                <div class="font-weight-light v-size--x-large">
                  <v-icon large left>mdi-office-building-marker</v-icon>
                  ขอย้ายกรณี
                </div>
              </v-card-title>
              <v-row>
                <v-col cols="12" sm="12">
                  <v-row>
                    <v-alert
                      class="mx-auto justify-center pa-2 ma-2"
                      border="bottom"
                      colored-border
                      type="warning"
                      elevation="2"
                    >
                      <v-radio-group
                        row
                        v-model="addtransference_manage.manage_case_move"
                      >
                        <v-radio value="normal">
                          <template v-slot:label>
                            <div>
                              <strong
                                class="primary--text"
                                v-on:click="clear_gov_service()"
                                >ปกติ</strong
                              >
                            </div>
                          </template>
                        </v-radio>
                        <v-radio value="special">
                          <template v-slot:label>
                            <div>
                              <strong class="warning--text">พิเศษ</strong>
                            </div>
                          </template>
                        </v-radio>
                      </v-radio-group>
                    </v-alert>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-card class="pa-2 ma-2">
                    <v-row>
                      <v-col cols="12" sm="12">
                        <v-textarea
                          v-model="addtransference_manage.manage_case_detail"
                          outlined
                          prepend-icon="mdi-office-building-marker"
                          rows="2"
                          label="พิเศษ กรณี :"
                          :disabled="
                            addtransference_manage.manage_case_move === 'normal'
                          "
                        ></v-textarea>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>

            <v-card class="pa-2 ma-2">
              <v-card-title>
                <div class="font-weight-light v-size--x-large">
                  <v-icon large left>mdi-flag-letiant</v-icon>
                  ข้าพเจ้ามีความประสงค์ขอย้ายไปดำรงตำแหน่งที่
                </div>
              </v-card-title>
              <v-col cols="12" sm="12">
                <v-card class="pa-2 ma-2">
                  <v-row>
                    <v-col cols="12" sm="12">
                      <v-card class="px-5 py-3">
                        <v-btn
                          x-large
                          color="success"
                          dark
                          rounded
                          @click.stop="
                            addtransference_manage_locationdialogsubmit()
                          "
                        >
                          <v-icon>mdi-selection-multiple-marker</v-icon>
                          <span> เลือกหน่วยงานแห่งใหม่</span>
                        </v-btn>

                        <v-data-table
                          :headers="header_trans"
                          :items="transference_manage_locations"
                        >
                          <template v-slot:[`item.action`]="{ item }">
                            <v-icon
                              color="red"
                              @click.stop="
                                transference_manage_locationDelete(
                                  item.manage_location_id_tfl
                                )
                              "
                            >
                              mdi-delete
                            </v-icon>
                          </template>
                        </v-data-table>

                        <v-card class="pa-2 ma-2">
                          <v-card-title>
                            <div class="font-weight-light v-size--x-large">
                              <v-icon large left
                                >mdi-office-building-marker</v-icon
                              >
                              ถ้าไม่ได้ตามที่ระบุ
                            </div>
                          </v-card-title>
                          <v-row>
                            <v-col cols="12" sm="12">
                              <v-row>
                                <v-alert
                                  class="mx-auto justify-center pa-2 ma-2"
                                  border="bottom"
                                  colored-border
                                  type="warning"
                                  elevation="2"
                                >
                                  <v-radio-group
                                    row
                                    v-model="
                                      addtransference_manage.manage_move_if
                                    "
                                  >
                                    <v-radio value="suspend">
                                      <template v-slot:label>
                                        <div>
                                          <strong
                                            class="primary--text"
                                            v-on:click="clear_gov_service()"
                                            >ขอระงับการย้าย</strong
                                          >
                                        </div>
                                      </template>
                                    </v-radio>
                                    <v-radio value="another">
                                      <template v-slot:label>
                                        <div>
                                          <strong class="warning--text"
                                            >หน่วยงานการศึกษาใดก็ได้ใน</strong
                                          >
                                        </div>
                                      </template>
                                    </v-radio>
                                  </v-radio-group>
                                </v-alert>
                              </v-row>
                            </v-col>
                            <v-col cols="12" sm="12">
                              <v-card class="pa-2 ma-2">
                                <v-row>
                                  <v-col cols="12" sm="12">
                                    <v-autocomplete
                                      v-model="
                                        addtransference_manage.manage_move_if_detail
                                      "
                                      :items="provices_sh"
                                      item-text="province_name"
                                      item-value="province_ID"
                                      outlined
                                      prepend-icon="mdi-office-building-marker"
                                      rows="2"
                                      label="อศจ. :"
                                      :disabled="
                                        addtransference_manage.manage_move_if ===
                                          'suspend'
                                      "
                                    ></v-autocomplete>
                                  </v-col>
                                </v-row>
                              </v-card>
                            </v-col>
                          </v-row>
                        </v-card>
                      </v-card>
                    </v-col>
                    <v-col cols="12" sm="12">
                      <h3>
                        ขอย้ายสับเปลี่ยนกับ :
                        {{ personnel_temporarys.title_s }}
                        {{ personnel_temporarys.frist_name }}
                        {{ personnel_temporarys.last_name }}
                      </h3>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="addtransference_manage.manage_switch_position"
                        :counter="13"
                        outlined
                        label="บัตรประชาชน"
                        prepend-icon="mdi-account-details"
                        request
                        v-on:keyup.enter="OnEnter()"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="3">
                      <v-text-field
                        :value="personnel_temporarys.position_name"
                        :counter="100"
                        outlined
                        label="ตำแหน่ง :"
                        prepend-icon="mdi-account-star"
                        request
                        disabled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="3">
                      <v-text-field
                        :value="personnel_temporarys.rang_name"
                        :counter="100"
                        outlined
                        label="วิทยฐานะ :"
                        prepend-icon="mdi-account-details"
                        request
                        disabled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-text-field
                        :value="personnel_temporarys.id_position"
                        :counter="100"
                        outlined
                        label="เลขที่ตำแหน่ง :"
                        prepend-icon="mdi-account-details"
                        request
                        disabled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-text-field
                        :value="personnel_temporarys.salary_s"
                        :counter="100"
                        outlined
                        label="เงินเดือน :"
                        prepend-icon="mdi-account-details"
                        request
                        disabled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-text-field
                        :value="personnel_temporarys.college_name"
                        :counter="100"
                        outlined
                        label="สังกัด :"
                        prepend-icon="mdi-flag-letiant"
                        request
                        disabled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12">
                      <span
                        >*
                        กรณีย้ายสับเปลี่ยนให้กรอกหมายเลขบัตรประจำตัวประชาชนของผู้ที่ท่านประสงค์สับเปลี่ยน
                        และกดปุ่ม Enter เพื่อดำเนินการค้นหา
                        หากไม่ปรากฏแสดงว่าไม่มีบุคคลดังกล่าวในระบบ
                      </span>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-card>

            <v-card class="pa-2 ma-2">
              <v-card-title>
                <div class="font-weight-light v-size--x-large">
                  <v-icon large left>mdi-details</v-icon>
                  หลักฐานประกอบการพิจารณา
                </div>
              </v-card-title>

              <v-row>
                <v-col cols="12" sm="12">
                  <v-row class="pa-4 mt-0">
                    <v-col cols="12" sm="4">
                      <v-checkbox
                        v-model="addtransference_manage.manage_evidence_info_1"
                        value="1"
                        label="สำเนา กพ.7/ก.ค.ศ.16"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-checkbox
                        v-model="addtransference_manage.manage_evidence_info_2"
                        value="1"
                        label="สำเนาทะเบียนบ้านของตน"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-checkbox
                        v-model="addtransference_manage.manage_evidence_info_3"
                        value="1"
                        label="สำเนาใบสำคัญการสมรส"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-checkbox
                        v-model="addtransference_manage.manage_evidence_info_4"
                        value="1"
                        label="ใบรับรองแพทย์"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-checkbox
                        v-model="addtransference_manage.manage_evidence_info_5"
                        value="1"
                        label="บันทึกประจำวัน ตำรวจ/ฝ่ายปกครอง"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-checkbox
                        v-model="addtransference_manage.manage_evidence_info_6"
                        value="1"
                        label="บันทึกข้อตกลงของผู้ขอย้ายสับเปลี่ยนทุกคน"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-checkbox
                        v-model="addtransference_manage.manage_evidence_info_7"
                        value="1"
                        label="วิสัยทัศน์ในการบริหารจัดการศึกษา"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="8">
                      <v-row align="center">
                        <v-card-title>
                          <div class="font-weight-light v-size--x-large">
                            อื่นๆ :
                          </div>
                        </v-card-title>
                        <v-checkbox
                          v-model="
                            addtransference_manage.manage_evidence_info_8
                          "
                          value="1"
                          hide-details
                          class="shrink mr-2 mt-0"
                        ></v-checkbox>
                        <v-textarea
                          outlined
                          v-model="
                            addtransference_manage.manage_evidence_info_8_detail
                          "
                          :disabled="
                            !addtransference_manage.manage_evidence_info_8
                          "
                          label="(ระบุ) : "
                        ></v-textarea>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>

            <v-card class="pa-2 ma-2">
              <v-card-title>
                <div
                  class="font-weight-light v-size--x-large"
                  color="pink darken-2"
                >
                  <v-icon large left>mdi-account-details</v-icon>
                  เหตุผลการขอย้าย
                </div>
              </v-card-title>

              <v-col cols="12" sm="12">
                <v-card class="pa-2">
                  <v-card-text>
                    <v-row align="center">
                      <v-textarea
                        outlined
                        v-model="addtransference_manage.manage_reason_detail"
                        label="(ระบุ) : "
                      ></v-textarea>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-card>
          </v-form>
          <v-alert
            border="right"
            colored-border
            type="error"
            elevation="2"
            v-if="get_gov_Age_year === 0"
          >
            <h1>
              ตามนัยหนังสือสำนักงาน ก.ค.ศ. ที่ ศธ 0206.4/ว 7 ลงวันที่ 12 พฤษภาคม
              2564 หลักเกณฑ์และวิธีการย้ายผู้บริหารสถานศึกษา
              สังกัดกระทรวงศึกษาธิการ
              ผู้ขอย้ายดำรงตำแหน่งในสถานศึกษาปัจจุบันไม่น้อยกว่า 12 เดือน
              โดยให้นับระยะเวลาการดำรงตำแหน่งถึงวันที่ 30 กันยายน
              ของปีที่ยื่นคำร้องขอย้ายประจำปี
            </h1>
          </v-alert>
          <v-card class="pa-1 d-flex justify-center" v-else>
            <div>
              <v-row>
                <div class="text-center">
                  <h3 class="red--text">
                    * เมื่อกดปุ่มบันทึกและยืนยันข้อมูลแล้ว
                    ท่านจะไม่สามารถแก้ไขข้อมูลใดๆ ได้
                    กรุณาตรวจสอบข้อมูลให้ถูกต้องการกดปุ่ม บันทึก
                  </h3>
                  <h2 class="success--text">
                    * เมื่อกดปุ่มบันทึกแล้วจะปรากฎปุ่มสำหรับพิมพ์แบบเสนอขอย้าย
                  </h2>
                </div>
              </v-row>
              <v-row>
                <v-col align="center">
                  <v-btn
                    v-if="transference_manages.manage_id_ref === manage_id_ref"
                    x-large
                    color="info"
                    dark
                    class="ma-2"
                    :href="'#/user/print_info_manage/' + manage_id_ref"
                    target="_blank"
                  >
                    <v-icon>mdi-printer</v-icon>
                    <span>พิมพ์แบบแสดงความประสงค์ขอย้าย</span>
                  </v-btn>

                  <v-btn
                    v-else
                    x-large
                    color="success"
                    dark
                    rounded
                    class="ma-2"
                    @click.stop="confirmsSubmit()"
                  >
                    <v-icon>mdi-content-save</v-icon>
                    <span>บันทึกรายการ</span>
                  </v-btn>
                </v-col>
              </v-row>
            </div>
          </v-card>
        </base-material-card>

        <!--addtransference_manage_locationdialog  -->
        <v-layout>
          <v-dialog
            v-model="addtransference_manage_locationdialog"
            persistent
            max-width="60%"
          >
            <v-card class="mx-auto pa-5">
              <base-material-card
                icon="mdi-account-multiple"
                title="เลือกวิทยาลัย"
                class="px-5 py-3"
              >
                รหัสรายการอ้างอิง {{ manage_id_ref }}
              </base-material-card>
              <v-card-text>
                <v-form
                  ref="addtransference_manage_locationform"
                  lazy-validation
                >
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex md2>
                        <v-select
                          v-model="
                            addtransference_manage_location.manage_location_sequence_n
                          "
                          :items="order_need"
                          outlined
                          label="ลำดับที่ :"
                        >
                        </v-select>
                      </v-flex>
                      <v-flex md10>
                        <v-autocomplete
                          v-model="
                            addtransference_manage_location.manage_location_college_code
                          "
                          :items="colleges"
                          item-text="college_name"
                          item-value="college_code"
                          outlined
                          label="สังกัด :"
                          prepend-icon="mdi-flag-letiant"
                          request
                          :rules="[v => !!v || '']"
                        ></v-autocomplete>
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
                  @click.stop="addtransference_manage_locationdialog = false"
                  ><v-icon dark>mdi-close</v-icon> ยกเลิก</v-btn
                >
                <v-btn
                  large
                  color="success"
                  @click.stop="addtransference_manage_locationSubmit()"
                >
                  <v-icon dark>mdi-content-save</v-icon>&nbsp;&nbsp;บันทึก
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-layout>

        <!-- V-model deleteuserdialog -->
        <v-layout>
          <v-dialog
            v-model="delettransference_manage_locationdialog"
            persistent
            max-width="40%"
          >
            <v-card class="mx-auto pa-5">
              <base-material-card
                color="error"
                icon="mdi-delete"
                title="ลบรายการ"
                class="px-5 py-3 text_google"
              >
              </base-material-card>

              <v-card-text class="text_google">
                <v-card>
                  <v-card-text>
                    <v-form
                      ref="deletetransference_manage_locationform"
                      lazy-validation
                    >
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12>
                            ยืนยันการลบ
                            <span>
                              {{
                                edittransference_manage_location.college_name
                              }}
                            </span>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  large
                  @click.stop="delettransference_manage_locationdialog = false"
                  ><v-icon dark>mdi-close</v-icon>ยกเลิก</v-btn
                >
                <v-btn
                  large
                  color="red darken-3"
                  @click.stop="deletetransference_manage_locationSubmit()"
                  dark
                >
                  <v-icon dark>mdi-delete</v-icon>&nbsp;ลบ
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-layout>

        <!-- V-model confirm -->
        <v-layout>
          <v-dialog v-model="confirm_dialog" persistent max-width="40%">
            <v-card class="mx-auto pa-5">
              <base-material-card
                color="warning"
                icon="mdi-content-save"
                title="ยืนยันรายการ"
                class="px-5 py-3 text_google"
              >
              </base-material-card>

              <v-card-text class="text_google">
                <v-card>
                  <v-card-text>
                    <v-form ref="addtransference_manageform" lazy-validation>
                      <v-container grid-list-md>
                        <v-alert
                          outlined
                          type="warning"
                          prominent
                          border="left"
                        >
                          <h2>
                            เตือน
                          </h2>
                          <h3>
                            หากกดปุ่มบันทึกท่านไม่สามารถ แก้ไขข้อมูลใดๆ ได้แล้ว
                            กรุณาตรวจสอบให้ถูกต้องก่อนการบันทึก
                          </h3>
                        </v-alert>
                      </v-container>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn large rounded @click.stop="confirm_dialog = false"
                  ><v-icon dark>mdi-close</v-icon>ยกเลิก</v-btn
                >
                <v-btn
                  large
                  color="warning"
                  @click.stop="addtransference_manageSubmit()"
                  dark
                  rounded
                >
                  <v-icon dark>mdi-content-save</v-icon>&nbsp;ยืนยัน
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-layout>
      </v-col>
    </v-row>

    <v-container fluid>
      <v-snackbar
        v-model="snackbar.show"
        top
        :timeout="snackbar.timeout"
        :color="snackbar.color"
      >
        <v-icon large>{{ snackbar.icon }}</v-icon>
        <v-card-text>
          {{ snackbar.text }}
        </v-card-text>

        <template v-slot:action="{ attrs }">
          <v-btn color="red" text v-bind="attrs" @click="snackbar.show = false"
            >Close</v-btn
          >
        </template>
      </v-snackbar>
    </v-container>
  </v-container>
</template>

<script>
export default {
  name: "HrvecTransferencePersonnel",

  data() {
    return {
      loading: true,
      ApiKey: "HRvec2021",
      isHidden: false,
      timestamp: "",
      colleges: [],
      personnel_search: {},
      show_personnel: [],
      transference_manage_locations: [],
      search: "",
      addtransference_manage_locationdialog: false,
      delettransference_manage_locationdialog: false,
      Search_Personneldialog: false,
      confirm_dialog: false,
      user: {},
      transference_manage: [],
      transference_manages: [],

      addtransference_manage: {
        manage_on_study_leave: "no_leave",
        manage_disciplinary: "no_discip",
        manage_license: "no_license",
        manage_case_move: "normal",
        manage_move_if: "suspend",
        manage_switch_position: "-",
        manage_service_status: "not_service"
      },

      addtransference_manage_location: {},
      edittransference_manage_location: [],
      provinces: [],
      provices_sh: [],
      prefectures: [],
      personnel_educations: [],
      personnel_education_check: [],
      district: [],
      district_post_s: [],
      snackbar: {
        show: false,
        color: "",
        timeout: 5000,
        icon: "",
        text: ""
      },
      order_need: [1, 2, 3],
      header_trans: [
        { text: "ลำดับ", align: "center", value: "manage_location_sequence_n" },
        {
          text: "รหัสอ้างอิง",
          align: "center",
          value: "manage_location_id_ref"
        },
        { text: "ตำแหน่ง", align: "center", value: "manage_location_position" },
        { text: "วิทยาลัย", align: "center", value: "college_name" },
        { text: "ยกเลิก", align: "center", value: "action" }
      ],
      header_work: [
        { text: "ลำดับ", align: "center", value: "index" },
        { text: "วันเดือนปี", align: "center", value: "date_begin" },
        { text: "ตำแหน่ง/ระดับ", align: "center", value: "position_s" },
        { text: "สังกัด", align: "center", value: "college_code" },
        { text: "หมายเหตุ", align: "center", value: "action" }
      ],

      isEditing: null,
      show1: false,
      pagination: {},
      personnel_marriages: [],
      rowsperpage: [
        25,
        50,
        100,
        {
          text: "All",
          value: -1
        }
      ],
      personnel_temporarys: [],
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      modal_1: false,
      modal_2: false,
      modal_3: false,
      modal_4: false,
      menu2: false,
      periods: [],
      period_enable: "1",
      personnel_work_history: [],
      personnel_work_history_check: [],
      transference_manage_location_update: {}
    };
  },

  async mounted() {  

    let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
    let result_provice;
    result_provice = await this.$http.post("province_sh.php", {
      ApiKey: this.ApiKey
    });
    this.provices_sh = result_provice.data;

    let result;
    result = await this.$http.post("college.php", {
      ApiKey: this.ApiKey
    });
    this.colleges = result.data;

    let result_user;
    result_user = await this.$http.post("personnel_temporary.php", {
      ApiKey: this.ApiKey,
      id_card: userSession.id_card
    });
    this.user = result_user.data;

    await this.transference_manageAll();
    await this.transference_manage_locationQueryAll();
    await this.personnel_educationsQueryAll();
    await this.personnel_educations_checkQueryAll();
    await this.personnel_work_historyQueryAll();
    await this.periodQuery();
  },

  methods: {
    async periodQuery(){
       let result_period;
    result_period = await this.$http.post("period.php", {
      ApiKey: this.ApiKey,
      period_enable: "OK",      
       period_type: this.user_status_type
    });
    this.periods = result_period.data;

    if (
      this.periods.period_enable === "1" &&
      this.periods.period_type === "manage"
    ) {
    } else {
      this.$router.push("/UserProfile");
    }
    },
    async personnel_work_historyQueryAll() {
      this.loading = true;
      let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
      let result = await this.$http
        .post("personnel_work_history.php", {
          ApiKey: this.ApiKey,
          id_card: userSession.id_card
        })
        .finally(() => (this.loading = false));
      this.personnel_work_history = result.data;
    },

    async personnel_work_historyCheck() {
      this.loading = true;
      let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
      let result = await this.$http
        .post("personnel_work_history.php", {
          ApiKey: this.ApiKey,
          id_card: userSession.id_card,
          count_check: "Ok"
        })
        .finally(() => (this.loading = false));
      this.personnel_work_history_check = result.data;
    },

    async personnel_educationsQueryAll() {
      this.loading = true;
      let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
      let result = await this.$http
        .post("personnel_education.php", {
          ApiKey: this.ApiKey,
          id_card: userSession.id_card
        })
        .finally(() => (this.loading = false));
      this.personnel_educations = result.data;
    },

    async personnel_educations_checkQueryAll() {
      this.loading = true;
      let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
      let result = await this.$http
        .post("personnel_education.check.php", {
          ApiKey: this.ApiKey,
          id_card: userSession.id_card
        })
        .finally(() => (this.loading = false));
      this.personnel_education_check = result.data;
    },

    async OnEnter() {
      let result = await this.$http
        .post("personnel_temporary.php", {
          ApiKey: this.ApiKey,
          id_card: this.addtransference_manage.manage_switch_position
        })
        .finally(() => (this.loading = false));
      this.personnel_temporarys = result.data;
    },
    async transference_manageAll() {
      this.loading = true;
      let result = await this.$http
        .post("transference_manage.php", {
          ApiKey: this.ApiKey,
          manage_id_ref: this.manage_id_ref
        })
        .finally(() => (this.loading = false));
      this.transference_manages = result.data;
    },
    async transference_manage_locationQueryAll() {
      let result = await this.$http.post("transference_manage_location.php", {
        ApiKey: this.ApiKey,
        manage_location_id_ref: this.manage_id_ref
      });
      this.transference_manage_locations = result.data;
    },

    //First >> Insert transference Location
    async addtransference_manage_locationdialogsubmit() {
      this.addtransference_manage_location = {};
      this.addtransference_manage_locationdialog = true;
    },

    async Search_Personnel() {
      this.personnel_select = {};
      this.Search_Personneldialog = true;
    },

    async addtransference_manage_locationSubmit() {
      if (this.$refs.addtransference_manage_locationform.validate()) {
        this.addtransference_manage_location.ApiKey = this.ApiKey;
        this.addtransference_manage_location.manage_location_id_ref = this.manage_id_ref;
        this.addtransference_manage_location.manage_location_id_card = this.user.id_card;
        this.addtransference_manage_location.manage_location_position = this.user.position_name;

        let result = await this.$http.post(
          "transference_manage_location.insert.php",
          this.addtransference_manage_location
        );

        if (result.data.status == true) {
          this.snackbar.icon = "mdi-checkbox-marked-circle";
          this.snackbar.color = "success";
          this.snackbar.text = "บันทึกข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.transference_manage_locationQueryAll();
        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text =
            "บันทึกข้อมูลผิดพลาด รายการลำดับ หรือ ชื่อหน่วยงานแหน่งใหม่ซ้ำ";
          this.snackbar.show = true;
        }
        this.addtransference_manage_locationdialog = false;
      }
    },

    //Confirm data

    async confirmsSubmit() {
      this.confirm_dialog = true;
    },

    //Delete transference Location
    async transference_manage_locationDelete(manage_location_id_tfl) {
      let result = await this.$http.post("transference_manage_location.php", {
        ApiKey: this.ApiKey,
        manage_location_id_tfl: manage_location_id_tfl
      });
      this.edittransference_manage_location = result.data;
      this.delettransference_manage_locationdialog = true;
    },
    async deletetransference_manage_locationSubmit() {
      if (this.$refs.deletetransference_manage_locationform.validate()) {
        this.edittransference_manage_location.ApiKey = this.ApiKey;
        let result = await this.$http.post(
          "transference_manage_location.delete.php",
          this.edittransference_manage_location
        );
        if (result.data.status == true) {
          this.transference_manage_location = result.data;
          this.snackbar.icon = "mdi-font-awesome";
          this.snackbar.color = "success";
          this.snackbar.text = "ลบข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.transference_manage_locationQueryAll();
        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text = "ลบข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.delettransference_manage_locationdialog = false;
      }
    },

    // Add transference_manage
    async addtransference_manageSubmit() {
      if (this.$refs.addtransference_manageform.validate()) {
        this.addtransference_manage.ApiKey = this.ApiKey;

        this.addtransference_manage.manage_id_ref = this.manage_id_ref;
        this.addtransference_manage.manage_time_s = this.periods.period_times;
        this.addtransference_manage.manage_year_s =
          parseInt(this.periods.period_year) + 543;
        this.addtransference_manage.manage_year_age = this.get_Age;

        this.addtransference_manage.manage_year_budget =
          parseInt(this.periods.period_year) + 543;
        this.addtransference_manage.manage_id_card = this.user.id_card;
        this.addtransference_manage.manage_date_time = this.date_today;
        this.addtransference_manage.manage_age_app_time = this.get_Appoint_Age;
        this.addtransference_manage.manage_age_time = this.get_gov_Age;
        this.addtransference_manage.manage_college_code_now = this.user.college_code;

        this.transference_manage_location_update.ApiKey = this.ApiKey;
        this.transference_manage_location_update.manage_location_id_ref = this.manage_id_ref;
        this.transference_manage_location_update.manage_location_status_confirm =
          "Save";

        let result = await this.$http.post(
          "transference_manage.insert.php",
          this.addtransference_manage
        );
      

        let result_up = await this.$http.post(
          "transference_manage_location.update.php",
          this.transference_manage_location_update
        );

        if (result.data.status == true && result_up.data.status == true) {
          this.snackbar.icon = "mdi-checkbox-marked-circle";
          this.snackbar.color = "success";
          this.snackbar.text = "บันทึกข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.transference_manageAll();
        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text = "บันทึกข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }

        this.addtransference_manage_locationdialog = false;
        this.confirm_dialog = false;
      }
    },
    loadOnce() {
      location.reload();
    }
  },
  computed: {
    user_status_type() {
      let user_status = this.user.user_status;
      let result;
      if (user_status == "tech") {
        result = "teacher";
      } else if (user_status == "director"){
        result = "manage";
      }
      else if (user_status == "se_director"){
        result = "manage";
      }
      return result;
    },
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
    month_now() {
      const d = new Date();
      let month = d.getMonth() + 1;
      return month;
    },

    manage_id_ref() {
      let manage_id_ref_cr;
      manage_id_ref_cr =
        this.periods.period_times +
        "" +
        parseInt(parseInt(this.periods.period_year) + 543) +
        "" +
        this.user.id_card;
      return manage_id_ref_cr;
    },
    marital_status() {
      let marital_status = this.user.marital_status;
      let marital_result;
      if (marital_status == "single") {
        marital_result = "โสด";
      } else if (marital_status == "married") {
        marital_result = "สมรส";
      } else if (marital_status == "widow") {
        marital_result = "หม้าย";
      } else if (marital_status == "divorce") {
        marital_result = "หย่า";
      } else if (marital_status == "separate") {
        marital_result = "แยกกันอยู่";
      }
      return marital_result;
    },
    date_today() {
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, "0");
      let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      let yyyy = today.getFullYear() + 543;
      today = dd + "/" + mm + "/" + yyyy;
      return today;
    },

    dmy_app_cal() {
      let month = this.user.appoin_month;
      let day = this.user.appoin_day;
      let year = this.user.appoin_year - 543;
      let result = month + "/" + day + "/" + year;
      return result;
    },

    date_appoin_ch() {
      let monthNames = [
        "",
        "มกราคม",
        "กุมภาพันธ์",
        "มีนาคม",
        "เมษายน",
        "พฤษภาคม",
        "มิถุนายน",
        "กรกฎาคม",
        "สิงหาคม",
        "กันยายน",
        "ตุลาคม",
        "พฤศจิกายน",
        "ธันวาคม"
      ];
      let day = this.user.appoin_day;
      let month = monthNames[parseInt(this.user.appoin_month)];
      let year = this.user.appoin_year;
      let years = parseInt(year);
      let today = day + " " + month + " " + years;
      return today;
    },

    cal_age_gov() {
      const today = new Date();
      const birthDate = new Date(this.dmy_app_cal);
      const yearsDifference = today.getFullYear() - birthDate.getFullYear();
      if (
        today.getMonth() < birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() &&
          today.getDate() < birthDate.getDate())
      ) {
        return yearsDifference - 1;
      }
      return yearsDifference;
    },
    date_today_cal() {
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, "0");
      let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      let yyyy = today.getFullYear();

      today = yyyy + "-" + mm + "-" + dd;
      return today;
    },

    date_month_cal() {
      let dd = "30";
      let mm = "9";
      let yyyy = parseInt(this.periods.period_year);
      let date = yyyy + "-" + mm + "-" + dd;
      return date;
    },

    get_Age() {
      let today = new Date(this.date_today_cal);
      let DOB = new Date(
        parseInt(this.user.brith_year) -
          543 +
          "-" +
          this.user.brith_month +
          "-" +
          this.user.brith_day
      );
      let totalMonths =
        (today.getFullYear() - DOB.getFullYear()) * 12 +
        today.getMonth() -
        DOB.getMonth();
      totalMonths += today.getDay() < DOB.getDay() ? -1 : 0;
      let years = today.getFullYear() - DOB.getFullYear();
      if (DOB.getMonth() > today.getMonth()) years = years - 1;
      else if (DOB.getMonth() === today.getMonth())
        if (DOB.getDate() > today.getDate()) years = years - 1;

      let days;
      let months;

      if (DOB.getDate() > today.getDate()) {
        months = totalMonths % 12;
        if (months == 0) months = 11;
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
      } else {
        days = today.getDate() - DOB.getDate();
        if (DOB.getMonth() === today.getMonth()) months = totalMonths % 12;
        else months = totalMonths % 12;
      }
      let age = years + " ปี " + months + " เดือน " + days + " วัน";
      return age;
    },

    get_Appoint_Age() {
      let today = new Date(this.date_month_cal);
      let DOB = new Date(this.user.date_app_now);

      let totalMonths =
        (today.getFullYear() - DOB.getFullYear()) * 12 +
        today.getMonth() -
        DOB.getMonth();
      totalMonths += today.getDay() < DOB.getDay() ? -1 : 0;
      let years = today.getFullYear() - DOB.getFullYear();
      if (DOB.getMonth() > today.getMonth()) years = years - 1;
      else if (DOB.getMonth() === today.getMonth())
        if (DOB.getDate() > today.getDate()) years = years - 1;

      let days;
      let months;

      if (DOB.getDate() > today.getDate()) {
        months = totalMonths % 12;
        if (months == 0) months = 11;
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
      } else {
        days = today.getDate() - DOB.getDate();
        if (DOB.getMonth() === today.getMonth()) months = totalMonths % 12;
        else months = totalMonths % 12;
      }
      let age = years + " ปี " + months + " เดือน " + days + " วัน";
      return age;
    },

    get_gov_Age() {
      let today = new Date(this.date_today_cal);
      let DOB = new Date(
        parseInt(this.user.appoin_year) -
          543 +
          "-" +
          this.user.appoin_month +
          "-" +
          this.user.appoin_day
      );
      let totalMonths =
        (today.getFullYear() - DOB.getFullYear()) * 12 +
        today.getMonth() -
        DOB.getMonth();
      totalMonths += today.getDay() < DOB.getDay() ? -1 : 0;
      let years = today.getFullYear() - DOB.getFullYear();
      if (DOB.getMonth() > today.getMonth()) years = years - 1;
      else if (DOB.getMonth() === today.getMonth())
        if (DOB.getDate() > today.getDate()) years = years - 1;

      let days;
      let months;

      if (DOB.getDate() > today.getDate()) {
        months = totalMonths % 12;
        if (months == 0) months = 11;
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
      } else {
        days = today.getDate() - DOB.getDate();
        if (DOB.getMonth() === today.getMonth()) months = totalMonths % 12;
        else months = totalMonths % 12;
      }
      let age = years + " ปี " + months + " เดือน " + days + " วัน";
      return age;
    },

    get_gov_Age_year_service() {
      let today = new Date(this.date_today_cal);
      let DOB = new Date(this.addtransference_manage.ser_date);
      let totalMonths =
        (today.getFullYear() - DOB.getFullYear()) * 12 +
        today.getMonth() -
        DOB.getMonth();
      totalMonths += today.getDay() < DOB.getDay() ? -1 : 0;
      let years = today.getFullYear() - DOB.getFullYear();
      if (DOB.getMonth() > today.getMonth()) years = years - 1;
      else if (DOB.getMonth() === today.getMonth())
        if (DOB.getDate() > today.getDate()) years = years - 1;

      let days;
      let months;

      if (DOB.getDate() > today.getDate()) {
        months = totalMonths % 12;
        if (months == 0) months = 11;
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
      } else {
        days = today.getDate() - DOB.getDate();
        if (DOB.getMonth() === today.getMonth()) months = totalMonths % 12;
        else months = totalMonths % 12;
      }
      let age = years;
      return age;
    },

    get_gov_Age_month_service() {
      let today = new Date(this.date_today_cal);
      let DOB = new Date(this.addtransference_manage.ser_date);
      let totalMonths =
        (today.getFullYear() - DOB.getFullYear()) * 12 +
        today.getMonth() -
        DOB.getMonth();
      totalMonths += today.getDay() < DOB.getDay() ? -1 : 0;
      let years = today.getFullYear() - DOB.getFullYear();
      if (DOB.getMonth() > today.getMonth()) years = years - 1;
      else if (DOB.getMonth() === today.getMonth())
        if (DOB.getDate() > today.getDate()) years = years - 1;

      let days;
      let months;

      if (DOB.getDate() > today.getDate()) {
        months = totalMonths % 12;
        if (months == 0) months = 11;
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
      } else {
        days = today.getDate() - DOB.getDate();
        if (DOB.getMonth() === today.getMonth()) months = totalMonths % 12;
        else months = totalMonths % 12;
      }
      let age = months;
      return age;
    },

    get_gov_Age_year() {
      let today = new Date(this.date_month_cal);
      let DOB = new Date(this.user.date_app_now);

      let totalMonths =
        (today.getFullYear() - DOB.getFullYear()) * 12 +
        today.getMonth() -
        DOB.getMonth();
      totalMonths += today.getDay() < DOB.getDay() ? -1 : 0;
      let years = today.getFullYear() - DOB.getFullYear();
      if (DOB.getMonth() > today.getMonth()) years = years - 1;
      else if (DOB.getMonth() === today.getMonth())
        if (DOB.getDate() > today.getDate()) years = years - 1;

      let days;
      let months;

      if (DOB.getDate() > today.getDate()) {
        months = totalMonths % 12;
        if (months == 0) months = 11;
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
      } else {
        days = today.getDate() - DOB.getDate();
        if (DOB.getMonth() === today.getMonth()) months = totalMonths % 12;
        else months = totalMonths % 12;
      }
      let age = years;
      return age;
    }
  }

  /* watch: {
    async date_transference(newVal, oldVal) {
      await this.transference_manageAll();
    }
  } */
};
</script>

<style lang="scss" scoped></style>
