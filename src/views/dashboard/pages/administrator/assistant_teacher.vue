<template>
  <div>
        <v-bottom-navigation color="info" horizontal :background-color="color" dark>
      <v-btn to="/admin/assistant_teacher_detail">
        <span>รายละเอียดการประเมินครูผู้ช่วยเอก </span>
        <v-icon>mdi-account-star</v-icon>
      </v-btn>

      <v-btn to="/admin/assistant_teacher">
        <span>ข้อมูลครูผู้ช่วย</span>
        <v-icon>mdi-account-settings</v-icon>
      </v-btn>
    </v-bottom-navigation>
    <v-container fluid>
      <base-material-card
        icon="mdi-clipboard-text"
        title="ครูผู้ช่วย"
        class="px-5 py-3"
      >
        <v-card class="mb-4 pa-2">
          <v-row>
            <v-col cols="12" lg="6" class="text-right">
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="ค้นหา ระบุคำ หรือ ส่วนข้อความเกี่ยวข้อง"             
                v-on:keyup.enter="OnEnter()"               
                filled
                class="mb-2"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-select filled label="ค้นหา :" v-model="select_per" :items="select_personel">

              </v-select>
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
          <template v-slot:[`item.select_item`]="{ item }">
            <v-checkbox
              v-model="search"
              :value="item.college_code"
            ></v-checkbox>
          </template>

          <template v-slot:[`item.brith_day`]="{ item }">
            {{
              item.brith_day + "/" + item.brith_month + "/" + item.brith_year
            }}
          </template>
          <template v-slot:[`item.appoin_day`]="{ item }">
            {{
              item.appoin_day + "/" + item.appoin_month + "/" + item.appoin_year
            }}
          </template>


          

          <template v-slot:[`item.evaluate_s`]="{ item }">
            <v-chip
              color="green"
              dark
              v-if="item.report_id_card === item.id_card"
            >
              <h2>
                <v-icon>mdi-checkbox-marked-circle</v-icon> ส่งผลการประเมิน
              </h2>
            </v-chip>
            <v-chip
              v-else-if="item.last_time_ass === '1' || item.last_time_ass === '2' || item.last_time_ass === '3' || item.last_time_ass === '4'"
              color="info"
              @click.stop="evaluate_assistant(item.id_card)"
              dark
            >
              <h2>{{ item.last_time_ass }}</h2>
            </v-chip>
            <v-chip
              v-else
              dark
              color="red"
              @click.stop="evaluate_assistant(item.id_card)"
            >
              <h2> <v-icon class="pa-1">mdi-cursor-pointer</v-icon> ไม่ได้เริ่มประเมิน</h2>
            </v-chip>
          </template>

           <template v-slot:[`item.prints`]="{ item }">
            <v-chip
              color="info"
              dark
              v-if="item.report_id_card === item.id_card"
            >
              <h2>
                <v-icon>mdi-printer</v-icon> พิมพ์รายงาน
              </h2>
            </v-chip>
            <v-chip
             v-else-if="item.last_time_ass === '1' || item.last_time_ass === '2' || item.last_time_ass === '3' || item.last_time_ass === '4'"
              color="info" 
              dark           
            >
              <h2>อยู่ระหว่างการประเมิน</h2>
            </v-chip>
            <v-chip
              v-else
              color="red"  
              dark        
            >
              <h2>ไม่ได้เริ่มประเมิน</h2>
            </v-chip>
          </template>

          <template v-slot:[`item.actions`]="{ item }">
            <v-icon
              color="yellow"
              @click.stop="personnel_temporaryEdit(item.id_rc)"
            >
              mdi-pencil
            </v-icon>
          </template>

          <template v-slot:[`item.cancels`]="{ item }">
            <v-icon color="red" @click.stop="evaluate_assistant(item.id_card)">
              mdi-cancel
            </v-icon>
          </template>

          <v-alert slot="no-results" :value="true" color="error" icon="warning">
            Your search for "{{ search }}" found no results.
          </v-alert>
        </v-data-table>
      </base-material-card>

      <!-- V-model evaluate_assistantdialog -->
      <v-layout row justify-center>
        <v-dialog v-model="evaluate_assistantdialog" persistent max-width="80%">
          <v-card class="mx-auto pa-6">
            <base-material-card
              color="green"
              icon="mdi-clipboard-text"
              title="บันทึกคะแนนการประเมิน รายบุคคล"
              class="px-5 py-3 text_google"
            ></base-material-card>
            <v-card-text>
              <v-form ref="evaluate_assistantform" lazy-validation>
                <v-container grid-list-md>
                  <v-card>
                    <template slot="progress">
                      <v-progress-linear
                        color="deep-purple"
                        height="10"
                        indeterminate
                      ></v-progress-linear>
                    </template>

                    <v-card-title
                      ><v-icon large color="info">mdi-account-check</v-icon>
                      <h2>ข้อมูลครูผู้ช่วย ผู้รับการประเมิน</h2></v-card-title
                    >
                    <v-card-text>
                      <div class="my-4">
                        <h3>
                          สถานศึกษา :
                          {{ personnel_temporary_id_card.college_name }}
                        </h3>
                        รหัสบัตรประชาชน :
                        {{ personnel_temporary_id_card.id_card }} <br />
                        ชื่อ-นามสกุล :
                        {{ personnel_temporary_id_card.frist_names }} <br />
                        วันที่บรรจุ :
                        {{ personnel_temporary_id_card.date_app }} <br />
                        คำสั่งที่บรรจุ :
                        {{ personnel_temporary_id_card.order_app_now }}
                        <h3>ครั้งที่ประเมิน : {{ times_s }}</h3>
                      </div>
                      <div class="my-4"></div>
                    </v-card-text>

                    <v-divider class="mx-4"></v-divider>

                    <v-card-title class="text-center">
                      <h3>ส่งผลการประเมิน</h3>
                    </v-card-title>
                    <v-row>
                      <v-col cols="12" class="text-right">
                        <v-btn
                          v-if="times_s !== 'ครบการประเมิน'"
                          color="success"
                          elevation="4"
                          large
                          rounded
                          @click="assistant_teacher_add()"
                        >
                          <v-icon>mdi-content-save</v-icon>
                          <span>บันทึกผลการประเมิน</span>
                        </v-btn>
                      </v-col>
                      <v-col cols="12">
                        <v-data-table
                          :headers="headers_aassistant_teacher"
                          :items="assistant_teachers"
                          class="elevation-1"
                          :loading="loading"
                        >
                          |<!--  moment("add","543 years") | moment("D MMMM YYYY") -->

                          <template
                            v-slot:[`item.assistant_teacher_datetime`]="{
                              item
                            }"
                          >
                            {{
                              item.assistant_teacher_datetime
                                | moment("add", "543 years")
                                | moment("D MMMM YYYY")
                            }}
                          </template>

                          <template
                            v-slot:[`item.assistant_teacher_status`]="{ item }"
                          >
                            <v-chip
                              v-if="item.assistant_teacher_status === 'confirm'"
                              color="green"
                              dark
                            >
                              <h2>ส่งผลการประเมินเรียบร้อย</h2>
                            </v-chip>
                            <v-chip v-else color="warning" dark>
                              <h2>อยู่ระหว่างการประเมินผล</h2>
                            </v-chip>
                          </template>

                          <template
                            v-slot:[`item.assistant_teacher_comment`]="{ item }"
                          >
                            <v-icon
                              v-if="item.assistant_teacher_status === 'confirm'"
                              color="green"
                              large
                            >
                              mdi-cube-send
                            </v-icon>
                            <v-icon
                              v-else
                              large
                              color="yellow"
                              @click.stop="
                                assistant_teacherEdit(item.assistant_teacher_id)
                              "
                            >
                              mdi-pencil
                            </v-icon>
                          </template>
                        </v-data-table>
                      </v-col>
                    </v-row>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-row>
                        <v-col cols="12" md="12" class="text-center">
                          <v-chip
                            dark
                            color="red"
                            v-if="
                              times_s === 'ครบการประเมิน' &&
                                result_assistant_teacher_reports.assistant_teacher_re_id_card !==
                                  personnel_temporary_id_card.id_card
                            "
                          >
                            <h2>
                              <v-icon>mdi-alert</v-icon>
                              เมื่อกดรายงานผลการประเมินและยืนยันผลการประเมิน
                              สถานศึกษาจะไม่สามารถดำเนินการแก้ไขข้อมูลได้แล้ว
                              กรุณาตรวจสอบให้ถูกต้องก่อนกดปุ่มยืนยัน
                            </h2>
                          </v-chip>
                        </v-col>
                        <v-col cols="12" md="6" class="text-right">
                          <v-btn
                            @click="cancel_assistant_teacher_report()"
                            color="red"
                            large
                            rounded
                            v-if="
                              result_assistant_teacher_reports.assistant_teacher_re_id_card ===
                                personnel_temporary_id_card.id_card
                            "
                          >
                            <v-icon>mdi-alert</v-icon>
                            &nbsp; ยกเลิกรายการ
                          </v-btn>
                        </v-col>
                        <v-col cols="12" md="6" class="text-right">
                          <v-btn
                            large
                            @click.stop="evaluate_assistantdialog = false"
                            rounded
                          >
                            <v-icon dark>mdi-close</v-icon>ยกเลิก
                          </v-btn>

                          <v-btn
                            v-if="
                              times_s === 'ครบการประเมิน' &&
                                result_assistant_teacher_reports.assistant_teacher_re_id_card !==
                                  personnel_temporary_id_card.id_card
                            "
                            large
                            color="green"
                            @click.stop="evaluate_assistantSubmit()"
                            rounded
                          >
                            <v-icon dark>mdi-content-save</v-icon
                            >&nbsp;รายงานผลการประเมิน
                          </v-btn>
                          <v-btn
                            color="info"
                            large
                            rounded
                            v-if="
                              result_assistant_teacher_reports.assistant_teacher_re_id_card ===
                                personnel_temporary_id_card.id_card
                            "
                          >
                            <v-icon>mdi-printer</v-icon>
                            &nbsp; พิมพ์รายงาน
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-card-actions>
                  </v-card>
                </v-container>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model assistant_teacherdialog -->
      <v-layout row justify-center>
        <v-dialog v-model="assistant_teacherdialog" persistent max-width="60%">
          <v-card class="mx-auto pa-6">
            <base-material-card
              color="green"
              icon="mdi-clipboard-text"
              title="บันทึกคะแนนประเมิน"
              class="px-5 py-3 text_google"
            ></base-material-card>
            <v-card-text>
              <v-form ref="assistant_teacherdialogform" lazy-validation>
                <v-container grid-list-md>
                  <v-card-text>
                    <div class="my-4">
                      <h3>
                        สถานศึกษา :
                        {{ personnel_temporary_id_card.college_name }}
                      </h3>
                      รหัสบัตรประชาชน :
                      {{ personnel_temporary_id_card.id_card }} <br />
                      ชื่อ-นามสกุล :
                      {{ personnel_temporary_id_card.frist_names }} <br />
                      วันที่บรรจุ :
                      {{ personnel_temporary_id_card.date_app }} <br />
                      คำสั่งที่บรรจุ :
                      {{ personnel_temporary_id_card.order_app_now }} <br />
                      <br />

                      <h3>ครั้งที่ประเมิน : {{ times_s }}</h3>
                    </div>
                    <div class="my-4"></div>
                  </v-card-text>
                  <v-layout wrap>
                    <v-flex md12 class="text-center">
                      <h3>คะแนนประเมิน</h3>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        v-model="addassistant_teacher.assistant_teacher_score"
                        type="number"
                        label="คะแนน"
                        required
                        :rules="[
                          v => !!v || '',
                          v => (!!v && v <= 100) || 'กรอกคะแนนไม่ถูกต้อง'
                        ]"
                      ></v-text-field>
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
                            v-model="
                              addassistant_teacher.assistant_teacher_datetime
                            "
                            label="วันที่ประเมิน"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            locale="th"
                            required
                            :rules="[v => !!v || '']"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="
                            addassistant_teacher.assistant_teacher_datetime
                          "
                          no-title
                          scrollable
                          locale="th"
                        >
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="menu2 = false">
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
                  </v-layout>
                </v-container>
                <strong class="red--text"
                  >* ปีที่ 1 (ไม่ต่ำกว่าร้อยละ 50 จึงจะถือว่า
                  ผ่านการประเมิน)</strong
                >
                <br />
                <strong class="red--text"
                  >* ปีที่ 2 (ไม่ต่ำกว่าร้อยละ 60 จึงจะถือว่า
                  ผ่านการประเมิน)</strong
                >
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
              color="warning"
                large
                @click.stop="assistant_teacherdialog = false"
                rounded
              >
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn
                large
                color="green"
                @click.stop="assistant_teacherdialogSubmit()"
                rounded
              >
                <v-icon dark>mdi-content-save</v-icon>&nbsp;บันทึก
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model assistant_teacherEditdialog -->
      <v-layout row justify-center>
        <v-dialog
          v-model="assistant_teacherEditdialog"
          persistent
          max-width="60%"
        >
          <v-card class="mx-auto pa-6">
            <base-material-card
              color="warning"
              icon="mdi-clipboard-text"
              title="แก้ไขคะแนนประเมิน"
              class="px-5 py-3 text_google"
            ></base-material-card>
            <v-card-text>
              <v-form ref="assistant_teacherEditform" lazy-validation>
                <v-container grid-list-md>
                  <v-card-text>
                    <div class="my-4">
                      <h3>
                        สถานศึกษา :
                        {{ personnel_temporary_id_card.college_name }}
                      </h3>
                      รหัสบัตรประชาชน :
                      {{ personnel_temporary_id_card.id_card }} <br />
                      ชื่อ-นามสกุล :
                      {{ personnel_temporary_id_card.frist_names }} <br />
                      วันที่บรรจุ :
                      {{ personnel_temporary_id_card.date_app }} <br />
                      คำสั่งที่บรรจุ :
                      {{ personnel_temporary_id_card.order_app_now }} <br />
                      <br />

                      <h3>
                        ครั้งที่ประเมิน :
                        {{ assistant_teachers_edit.assistant_teacher_times }}
                      </h3>
                    </div>
                    <div class="my-4"></div>
                  </v-card-text>
                  <v-layout wrap>
                    <v-flex md12 class="text-center">
                      <h3>คะแนนประเมิน</h3>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        v-model="
                          assistant_teachers_edit.assistant_teacher_score
                        "
                        type="number"
                        label="คะแนน"
                        required
                        :rules="[
                          v => !!v || '',
                          v => (!!v && v <= 100) || 'กรอกคะแนนไม่ถูกต้อง'
                        ]"
                      ></v-text-field>
                    </v-flex>
                    <v-flex md6>
                      <v-menu
                        ref="menu1"
                        v-model="menu1"
                        :close-on-content-click="false"
                        :return-value.sync="date"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="
                              assistant_teachers_edit.assistant_teacher_datetime
                            "
                            label="วันที่ประเมิน"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            locale="th"
                            required
                            :rules="[v => !!v || '']"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="
                            assistant_teachers_edit.assistant_teacher_datetime
                          "
                          no-title
                          scrollable
                          locale="th"
                        >
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="menu1 = false">
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.menu1.save(date)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-flex>
                  </v-layout>
                </v-container>
                <strong class="red--text"
                  >* ปีที่ 1 (ไม่ต่ำกว่าร้อยละ 50 จึงจะถือว่า
                  ผ่านการประเมิน)</strong
                >
                <br />
                <strong class="red--text"
                  >* ปีที่ 2 (ไม่ต่ำกว่าร้อยละ 60 จึงจะถือว่า
                  ผ่านการประเมิน)</strong
                >
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
              color="warning"
                large
                @click.stop="assistant_teacherEditdialog = false"
                rounded
              >
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn
                large
                color="green"
                @click.stop="assistant_teacherEditdialogSubmit()"
                rounded
              >
                <v-icon dark>mdi-content-save</v-icon>&nbsp;บันทึก
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model assistant_teacherConfirmdialog -->
      <v-layout row justify-center>
        <v-dialog
          v-model="assistant_teacherConfirmdialog"
          persistent
          max-width="60%"
        >
          <v-card class="mx-auto pa-6">
            <base-material-card
              color="warning"
              icon="mdi-clipboard-text"
              title="ยืนยันผลการประเมิน"
              class="px-5 py-3 text_google"
            ></base-material-card>
            <v-card-text>
              <v-form ref="assistant_teacherConfirmdialogform" lazy-validation>
                <v-container grid-list-md>
                  <v-card-text>
                    <div class="my-4">
                      <h3>
                        สถานศึกษา :
                        {{ personnel_temporary_id_card.college_name }}
                      </h3>
                      รหัสบัตรประชาชน :
                      {{ personnel_temporary_id_card.id_card }} <br />
                      ชื่อ-นามสกุล :
                      {{ personnel_temporary_id_card.frist_names }} <br />
                      วันที่บรรจุ :
                      {{ personnel_temporary_id_card.date_app }} <br />
                      คำสั่งที่บรรจุ :
                      {{ personnel_temporary_id_card.order_app_now }} <br />
                      <h3>
                        คะแนนเฉลี่ย :
                        {{ personnel_temporary_id_card.avg_score }}
                      </h3>
                      <br />

                      <h3>
                        หากกดปุ่มยืนยันแล้วจะไม่สามารถดำเนินการแก้ไขได้
                        กรุณาตรวจสอบให้ถูกต้องก่อนกดปุ่มยืนยัน
                      </h3>
                    </div>
                    <div class="my-4"></div>
                  </v-card-text>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                large
                @click.stop="assistant_teacherConfirmdialog = false"
                rounded
              >
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn
                large
                color="warning"
                @click.stop="assistant_teacherConfirmdialogSubmit()"
                rounded
              >
                <v-icon dark>mdi-pencil</v-icon>&nbsp;ยืนยันผลการประเมิน
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model cancel_assistant_teacher_reportdialog -->
      <v-layout row justify-center>
        <v-dialog
          v-model="cancel_assistant_teacher_reportdialog"
          persistent
          max-width="60%"
        >
          <v-card class="mx-auto pa-6">
            <base-material-card
              color="warning"
              icon="mdi-clipboard-text"
              title="ยกเลิกการประเมินผล"
              class="px-5 py-3 text_google"
            ></base-material-card>
            <v-card-text>
              <v-form
                ref="cancel_assistant_teacher_reportdialogform"
                lazy-validation
              >
                <v-container grid-list-md>
                  <v-card-text>
                    <div class="my-4">
                      <h3>
                        สถานศึกษา :
                        {{ personnel_temporary_id_card.college_name }}
                      </h3>
                      รหัสบัตรประชาชน :
                      {{ personnel_temporary_id_card.id_card }} <br />
                      ชื่อ-นามสกุล :
                      {{ personnel_temporary_id_card.frist_names }} <br />
                      วันที่บรรจุ :
                      {{ personnel_temporary_id_card.date_app }} <br />
                      คำสั่งที่บรรจุ :
                      {{ personnel_temporary_id_card.order_app_now }} <br />
                      <h3>
                        คะแนนเฉลี่ย :
                        {{ personnel_temporary_id_card.avg_score }}
                      </h3>
                      <br />
                    </div>
                    <div class="my-4"></div>
                  </v-card-text>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                large
                @click.stop="cancel_assistant_teacher_reportdialog = false"
                rounded
              >
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn
                large
                color="warning"
                @click.stop="cancel_assistant_teacher_reportdialogSubmit()"
                rounded
              >
                <v-icon dark>mdi-pencil</v-icon
                >&nbsp;ยืนยันการยกเลิกผลการประเมิน
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model editpersonnel_temporarydialog -->
      <v-layout row justify-center>
        <v-dialog
          v-model="editpersonnel_temporarydialog"
          persistent
          max-width="60%"
        >
          <v-card class="mx-auto pa-6">
            <base-material-card
              color="yellow"
              icon="mdi-clipboard-text"
              title="ปรับปรุงข้อมูลบุคลากร"
              class="px-5 py-3 text_google"
            ></base-material-card>
            <v-card-text>
              <v-form ref="editpersonnel_temporaryform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md12>
                      <h3>ข้อมูลการเริ่มปฏิบัติหน้าที่ในสถานศึกษาปัจจุบัน</h3>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        label="คำสั่งที่ ระบุเพียง : 783/2563"
                        v-model="editpersonnel_temporary.order_app_now"
                        required
                        :rules="[v => !!v || '']"
                      ></v-text-field>
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
                            v-model="editpersonnel_temporary.date_app_now"
                            label="วันเดือนเริ่มปฏิบัติงาน"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            locale="th"
                            required
                            :rules="[v => !!v || '']"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="editpersonnel_temporary.date_app_now"
                          no-title
                          scrollable
                          locale="th"
                        >
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="menu3 = false">
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
                    </v-flex>
                  </v-layout>
                </v-container>
                <strong class="red--text">* จำเป็น</strong>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
              color="warning"
                large
                @click.stop="editpersonnel_temporarydialog = false"
                rounded
              >
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn
                large
                color="green"
                @click.stop="editpersonnel_temporarySubmit()"
                rounded
              >
                <v-icon dark>mdi-content-save</v-icon>&nbsp;บันทึก
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </v-container>

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
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: true,
      ApiKey: "HRvec2021",
      valid: true,

      addpersonnel_temporarydialog: false,
      editpersonnel_temporarydialog: false,
      deletepersonnel_temporarydialog: false,
      evaluate_assistantdialog: false,
      assistant_teacherdialog: false,
      assistant_teacherEditdialog: false,
      assistant_teacherConfirmdialog: false,
      cancel_assistant_teacher_reportdialog: false,
      snackbar: {
        show: false,
        color: "",
        timeout: 5000,
        icon: "",
        text: ""
      },
      personnel_temporarys: [],
      addpersonnel_temporary: {},
      editpersonnel_temporary: {},
      search: "",
      pagination: {},
      headers: [
        { text: "เลือก", align: "left", value: "select_item" },
        { text: "รหัสสถานศึกษา", align: "left", value: "college_code" },
        { text: "สถานศึกษา", align: "left", value: "college_name" },
        { text: "รหัสบัตรประชาชน", align: "left", value: "id_card" },
        { text: "คำนำหน้าชื่อ", align: "left", value: "title_s" },
        { text: "ชื่อ", align: "left", value: "frist_name" },
        { text: "สกุล", align: "left", value: "last_name" },
        { text: "ตำแหน่ง", align: "center", value: "position_name" },
        { text: "เลขที่ตำแหน่ง", align: "center", value: "id_position" },
        { text: "วิทยฐานะ", align: "center", value: "rang_name" },
        { text: "ระดับ", align: "center", value: "rang_level" },
         { text: "การประเมิน", align: "center", value: "evaluate_s" },
        { text: "พิมพ์", align: "center", value: "prints" },
        { text: "วันเดือนปีเกิด", align: "center", value: "brith_day" },
        { text: "วันเดือนปีบรรจุ", align: "center", value: "appoin_day" },
        { text: "คำสั่งที่", align: "center", value: "order_app_now" },
        {
          text: "วันที่ปฏิบัติหน้าที่ ณ สถานศึกษาปัจจุบัน",
          align: "center",
          value: "date_app"
        },
        { text: "เกษียณ", align: "center", value: "retrire_year" },
        {
          text: "แก้ไข",
          align: "center",
          value: "actions",
          icon: "mdi-file-document-edit"
        },
        {
          text: "ยกเลิกการประเมิน",
          align: "center",
          value: "cancels",
          icon: "mdi-cancel"
        }
      ],
      headers_aassistant_teacher: [
        { text: "ครั้งที่", align: "center", value: "assistant_teacher_times" },
        {
          text: "สถานศึกษา",
          align: "left",
          value: "college_name"
        },
        {
          text: "รหัสบัตรประชาชน",
          align: "left",
          value: "assistant_teacher_id_card"
        },
        {
          text: "ชื่อ-นามสกุล",
          align: "left",
          value: "frist_names"
        },
        {
          text: "วันที่ประเมิน",
          align: "center",
          value: "assistant_teacher_datetime"
        },
        { text: "คะแนน", align: "center", value: "assistant_teacher_score" },
        { text: "สถานะ", align: "center", value: "assistant_teacher_status" },
        {
          text: "หมายเหตุ",
          align: "center",
          value: "assistant_teacher_comment"
        }
      ],
      rang_names: [
        { text: "-", value: "-" },
        { text: "ชำนาญการ", value: "ชำนาญการ" },
        { text: "ชำนาญการพิเศษ", value: "ชำนาญการพิเศษ" },
        { text: "เชี่ยวชาญ", value: "เชี่ยวชาญ" },
        { text: "เชี่ยวชาญพิเศษ", value: "เชี่ยวชาญพิเศษ" }
      ],
      rang_levels: ["-", 1, 2, 3, 4, 5],
      rowsperpage: [
        25,
        50,
        100,
        {
          text: "All",
          value: -1
        }
      ],
select_per:'',
select_personel:[
   { text: "แสดงทั้งหมด ", value: "show_all" },
        { text: "ประเมินครั้งที่ 1 ", value: "1" },
        { text: "ประเมินครั้งที่ 2 ", value: "2" },
        { text: "ประเมินครั้งที่ 3 ", value: "3" },
        { text: "ประเมินครั้งที่ 4 ", value: "4" },
        { text: "ส่งผลการประเมิน ", value: "confirm" },
        { text: "ไม่ได้รับการประเมิน ", value: "not_evaluated" }
],

      college: {},
      provinces: [],
      prefectures: [],
      userstatus: [],
      man_powers: [],
      collgegs: [],
      personnel_temporarystatus: [],
      regions: [],
      region_ena: true,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      menu1: false,
      menu2: false,
      menu3: false,
      menu4: false,
      personnel_temporary_id_card: [],
      assistant_teachers: [],
      addassistant_teacher: {},
      assistant_teachers_edit: {},
      assistant_teachers_confrim: {},
      assistant_teacher_report_s: {},
      result_assistant_teacher_reports: {},
      cancel_assistant_teacher_reports: {},
      cancel_assistant_teachers: {}
    };
  },

  async mounted() {
    await this.personnel_temporaryQueryAll();

    let result;
    result = await this.$http.post("collegetype.php", {
      ApiKey: this.ApiKey
    });
    this.collegetypes = result.data;
    result = await this.$http.post("college.php", {
      ApiKey: this.ApiKey
    });

    this.colleges = result.data;
    result = await this.$http.post("province.php", {
      ApiKey: this.ApiKey
    });
    this.provinces = result.data;

    result = await this.$http.post("region.php", {
      ApiKey: this.ApiKey
    });
    this.regions = result.data;

    let user_status_result;
    user_status_result = await this.$http.post(
      "crud_user_status.php?crud=read",
      {
        ApiKey: this.ApiKey
      }
    );
    this.userstatus = user_status_result.data;
  },

  methods: {
    async cancel_assistant_teacher_report() {
      this.cancel_assistant_teacher_reportdialog = true;
    },

    async evaluate_assistant(id_card) {
      let result = await this.$http.post("personnel_temporary.php", {
        ApiKey: this.ApiKey,
        id_card: id_card
      });
      this.personnel_temporary_id_card = result.data;

      let result_assistant = await this.$http.post("assistant_teacher.php", {
        ApiKey: this.ApiKey,
        assistant_teacher_id_card: id_card
      });
      this.assistant_teachers = result_assistant.data;

      let result_assistant_teacher_report = await this.$http.post(
        "assistant_teacher_report.php",
        {
          ApiKey: this.ApiKey,
          assistant_teacher_re_id_card: id_card
        }
      );
      this.result_assistant_teacher_reports =
        result_assistant_teacher_report.data;
      this.evaluate_assistantdialog = true;
    },

    async assistant_teacher_add() {
      this.addassistant_teacher = {};
      this.assistant_teacherdialog = true;
    },

    async assistant_teacherEdit(assistant_teacher_id) {
      let result_assistant = await this.$http.post("assistant_teacher.php", {
        ApiKey: this.ApiKey,
        assistant_teacher_id: assistant_teacher_id
      });
      this.assistant_teachers_edit = result_assistant.data;
    /*   console.log(result_assistant.data);
      console.log(assistant_teacher_id); */
      this.assistant_teacherEditdialog = true;
    },

    async personnel_temporaryQueryAll() {
      this.loading = true;
      let result = await this.$http
        .post("personnel_temporary.php", {
          ApiKey: this.ApiKey,
          position_name: "ครูผู้ช่วย"
        })
        .finally(() => (this.loading = false));
      this.personnel_temporarys = result.data;
    },

    async assistant_teacherdialogSubmit() {
      if (this.$refs.assistant_teacherdialogform.validate()) {
        this.addassistant_teacher.ApiKey = this.ApiKey;
        this.addassistant_teacher.assistant_teacher_college_code = this.personnel_temporary_id_card.college_code;
        this.addassistant_teacher.assistant_teacher_id_card = this.personnel_temporary_id_card.id_card;
        this.addassistant_teacher.assistant_teacher_times = this.times_s;
       /*  console.log(this.addassistant_teacher); */

        let result = await this.$http.post(
          "assistant_teacher.insert.php",
          this.addassistant_teacher
        );

        if (result.data.status == true) {
          let result = await this.$http.post("personnel_temporary.php", {
            ApiKey: this.ApiKey,
            id_card: this.personnel_temporary_id_card.id_card
          });
          this.personnel_temporary_id_card = result.data;

          let result_assistant = await this.$http.post(
            "assistant_teacher.php",
            {
              ApiKey: this.ApiKey,
              assistant_teacher_id_card: this.personnel_temporary_id_card
                .id_card
            }
          );
          this.assistant_teachers = result_assistant.data;

          this.snackbar.icon = "mdi-font-awesome";
          this.snackbar.color = "success";
          this.snackbar.text = "บันทึกข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.personnel_temporaryQueryAll();
        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text = "บันทึกข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.assistant_teacherdialog = false;
      }
    },

    async assistant_teacherEditdialogSubmit() {
      if (this.$refs.assistant_teacherEditform.validate()) {
        this.assistant_teachers_edit.ApiKey = this.ApiKey;
       /*  console.log(this.assistant_teachers_edit);
 */
        let result = await this.$http.post(
          "assistant_teacher.update.php",
          this.assistant_teachers_edit
        );

        if (result.data.status == true) {
          let result = await this.$http.post("personnel_temporary.php", {
            ApiKey: this.ApiKey,
            id_card: this.personnel_temporary_id_card.id_card
          });
          this.personnel_temporary_id_card = result.data;

          let result_assistant = await this.$http.post(
            "assistant_teacher.php",
            {
              ApiKey: this.ApiKey,
              assistant_teacher_id_card: this.personnel_temporary_id_card
                .id_card
            }
          );
          this.assistant_teachers = result_assistant.data;
          this.snackbar.icon = "mdi-font-awesome";
          this.snackbar.color = "success";
          this.snackbar.text = "บันทึกข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.personnel_temporaryQueryAll();
        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text = "บันทึกข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.assistant_teacherEditdialog = false;
      }
    },

    async evaluate_assistantSubmit() {
      this.assistant_teacherConfirmdialog = true;
    },
    async assistant_teacherConfirmdialogSubmit() {
      this.assistant_teachers_confrim.ApiKey = this.ApiKey;
      this.assistant_teachers_confrim.assistant_teacher_id_card = this.personnel_temporary_id_card.id_card;
      this.assistant_teachers_confrim.assistant_teacher_status = "confirm";
      this.assistant_teacher_report_s.ApiKey = this.ApiKey;
      this.assistant_teacher_report_s.assistant_teacher_re_college_code = this.personnel_temporary_id_card.college_code;
      this.assistant_teacher_report_s.assistant_teacher_re_id_card = this.personnel_temporary_id_card.id_card;
      this.assistant_teacher_report_s.assistant_teacher_re_datetime = this.date_today;
      this.assistant_teacher_report_s.assistant_teacher_re_avg_score = this.personnel_temporary_id_card.avg_score;

 /*      console.log(this.assistant_teachers_confrim);
      console.log(this.assistant_teacher_report_s); */

      let result = await this.$http.post(
        "assistant_teacher.update.confirm.php",
        this.assistant_teachers_confrim
      );

      let result_assistant_teacher_report = await this.$http.post(
        "assistant_teacher_report.insert.php",
        this.assistant_teacher_report_s
      );

      if (
        result.data.status == true &&
        result_assistant_teacher_report.data.status == true
      ) {
        let result = await this.$http.post("personnel_temporary.php", {
          ApiKey: this.ApiKey,
          id_card: this.personnel_temporary_id_card.id_card
        });
        this.personnel_temporary_id_card = result.data;

        let result_assistant = await this.$http.post("assistant_teacher.php", {
          ApiKey: this.ApiKey,
          assistant_teacher_id_card: this.personnel_temporary_id_card.id_card
        });

        let result_assistant_teacher_report = await this.$http.post(
          "assistant_teacher_report.php",
          {
            ApiKey: this.ApiKey,
            assistant_teacher_re_id_card: this.personnel_temporary_id_card
              .id_card
          }
        );
        this.result_assistant_teacher_reports =
          result_assistant_teacher_report.data;

        this.assistant_teachers = result_assistant.data;
        this.snackbar.icon = "mdi-font-awesome";
        this.snackbar.color = "success";
        this.snackbar.text = "บันทึกข้อมูลเรียบร้อย";
        this.snackbar.show = true;
        this.personnel_temporaryQueryAll();
      } else {
        this.snackbar.icon = "mdi-close-network";
        this.snackbar.color = "red";
        this.snackbar.text = "บันทึกข้อมูลผิดพลาด";
        this.snackbar.show = true;
      }
      this.assistant_teacherConfirmdialog = false;
    },
    async personnel_temporaryEdit(id_rc) {
      let result = await this.$http.post("personnel_temporary.php", {
        ApiKey: this.ApiKey,
        id_rc: id_rc
      });
      this.editpersonnel_temporary = result.data;
      this.editpersonnel_temporary.p_word = "";
      this.editpersonnel_temporarydialog = true;
    },
    async editpersonnel_temporarySubmit() {
      if (this.$refs.editpersonnel_temporaryform.validate()) {
        this.editpersonnel_temporary.ApiKey = this.ApiKey;
        if (this.editpersonnel_temporary.p_word == "")
          delete this.editpersonnel_temporary.p_word;
        this.editpersonnel_temporary.brith_day = this.brith_day;
        this.editpersonnel_temporary.brith_month = this.brith_month;
        this.editpersonnel_temporary.brith_year = this.brith_year;
        this.editpersonnel_temporary.appoin_day = this.appoin_day;
        this.editpersonnel_temporary.appoin_month = this.appoin_month;
        this.editpersonnel_temporary.appoin_year = this.appoin_year;
        this.editpersonnel_temporary.retrire_year = this.retrire_year;
        let result = await this.$http.post(
          "personnel_temporary.update.admin.php",
          this.editpersonnel_temporary
        );
        if (result.data.status == true) {
          this.personnel_temporary = result.data;
          this.snackbar.icon = "mdi-font-awesome";
          this.snackbar.color = "success";
          this.snackbar.text = "แก้ไขข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.personnel_temporaryQueryAll();
        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text = "แก้ไขข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.editpersonnel_temporarydialog = false;
      }
    },

    async cancel_assistant_teacher_reportdialogSubmit() {
      this.cancel_assistant_teacher_reports.ApiKey = this.ApiKey;
      this.cancel_assistant_teacher_reports.assistant_teacher_re_id_card = this.personnel_temporary_id_card.id_card;
      this.cancel_assistant_teachers.ApiKey = this.ApiKey;
      this.cancel_assistant_teachers.assistant_teacher_id_card = this.personnel_temporary_id_card.id_card;
      this.cancel_assistant_teachers.assistant_teacher_status = "";

   /*    console.log(this.cancel_assistant_teacher_reports);
      console.log(this.cancel_assistant_teachers);
 */
      let result = await this.$http.post(
        "assistant_teacher.update.confirm.php",
        this.cancel_assistant_teachers
      );

      let result_assistant_teacher_report = await this.$http.post(
        "assistant_teacher_report.delete.php",
        this.cancel_assistant_teacher_reports
      );

      if (
        result.data.status == true &&
        result_assistant_teacher_report.data.status == true
      ) {
        let result = await this.$http.post("personnel_temporary.php", {
          ApiKey: this.ApiKey,
          id_card: this.personnel_temporary_id_card.id_card
        });
        this.personnel_temporary_id_card = result.data;

        let result_assistant = await this.$http.post("assistant_teacher.php", {
          ApiKey: this.ApiKey,
          assistant_teacher_id_card: this.personnel_temporary_id_card.id_card
        });

        let result_assistant_teacher_report = await this.$http.post(
          "assistant_teacher_report.php",
          {
            ApiKey: this.ApiKey,
            assistant_teacher_re_id_card: this.personnel_temporary_id_card
              .id_card
          }
        );
        this.result_assistant_teacher_reports =
          result_assistant_teacher_report.data;

        this.assistant_teachers = result_assistant.data;
        this.snackbar.icon = "mdi-font-awesome";
        this.snackbar.color = "success";
        this.snackbar.text = "บันทึกข้อมูลเรียบร้อย";
        this.snackbar.show = true;
        this.personnel_temporaryQueryAll();
      } else {
        this.snackbar.icon = "mdi-close-network";
        this.snackbar.color = "red";
        this.snackbar.text = "บันทึกข้อมูลผิดพลาด";
        this.snackbar.show = true;
      }
      this.cancel_assistant_teacher_reportdialog = false;
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
    times_s() {
      let times = this.personnel_temporary_id_card.last_time;
      let result;
      if (times == "1") {
        result = 2;
      } else if (times == "2") {
        result = 3;
      } else if (times == "3") {
        result = 4;
      } else if (times == "4") {
        result = "ครบการประเมิน";
      } else {
        result = 1;
      }
      return result;
    },
    date_today() {
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, "0");
      let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      let yyyy = today.getFullYear() + 543;

      today = dd + "/" + mm + "/" + yyyy;
      return today;
    },
     color() {
      return "indigo darken-4";
    }
  }
};
</script>
