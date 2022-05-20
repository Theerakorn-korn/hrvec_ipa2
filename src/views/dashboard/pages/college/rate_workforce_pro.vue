<template>
  <div>
    <v-bottom-navigation color="info" horizontal :background-color="color" dark>
      <v-btn to="/college/rate_workforce_g">
        <span>ข้อมูลทั่วไป </span>
        <v-icon>mdi-numeric-1-box</v-icon>
      </v-btn>
      <v-btn to="/college/rate_workforce">
        <span>ข้อมูลนักเรียนนักศึกษา </span>
        <v-icon>mdi-numeric-2-box</v-icon>
      </v-btn>
      <v-btn to="/college/rate_workforce_pro">
        <span>ประมวลผลห้องเรียน </span>
        <v-icon>mdi-numeric-3-box</v-icon>
      </v-btn>
      <v-btn to="/college/rate_workforce_cal">
        <span>ประมวลผลอัตรากำลัง </span>
        <v-icon>mdi-numeric-4-box</v-icon>
      </v-btn>
  <v-btn to="/college/rate_workforce_report">
        <span>รายงานผลอัตรากำลัง </span>
        <v-icon>mdi-numeric-5-box</v-icon>
      </v-btn>
    </v-bottom-navigation>

    <v-container id="upgrade" fluid tag="section" class="text_google">
      <v-row>
        <v-col cols="12" md="12">
          <base-material-card color="primary">
            <template v-slot:heading>
              <h2 class="h1 font-weight-light text_google">
                <v-icon large left>mdi-file-send</v-icon>ข้อมูลสรุปผลอัตรากำลัง
                : ประเภทวิทยาลัย {{ user.college_id_code_type_manpower }}
                <!-- <v-select
                  v-model="years_select"
                  :items="year_s"
                  item-value="year_s"
                  @change="
                    rate_work_collegeQuery_20(),
                      rate_work_collegeQuery_20_sum(),
                      rate_work_collegeQuery_30_sum(),
                      rate_work_collegeQuery_30(),
                      rate_work_collegeQuery_all()
                  "
                  label="เลือกปี : "
                >
                </v-select> -->
              </h2>
            </template>

            <v-row>
              <v-col cols="12" md="12">
                <v-row>
                  <v-col cols="12" md="12">
                    <v-card class="mb-4 pa-2">
                      <v-card>
                        <v-card-title>
                          <h3>
                            รวมนักเรียนแต่ละประเภทวิชา / ระดับชั้น แยก ปวช ปวส
                            <span class="green--text">
                              [คำนวณห้องเรียน อัตรากำลัง ขั้นตอนที่ 1]
                            </span>
                          </h3>
                        </v-card-title>
                        <v-data-table
                          color="success"
                          :loading="loading"
                          :headers="headers_type_class"
                          :items="rate_work_colleges_group_course"
                        >
                          <template
                            v-slot:[`item.rate_work_college_id_class`]="{
                              item
                            }"
                          >
                            {{ class_level(item.rate_work_college_id_class) }}
                          </template>

                          <template
                            v-slot:[`item.analysis_s1`]="{
                              item
                            }"
                          >
                            <v-btn
                              v-if="item.cal_room"
                              class="pa-3"
                              rounded
                              color="blue"
                              dark
                              @click="
                                analysis_data_update(
                                  item.rate_work_college_year,
                                  item.rate_work_college_code,
                                  item.rate_work_course_id,
                                  item.rate_work_college_id_class
                                )
                              "
                            >
                              <v-icon left>
                                mdi-google-analytics
                              </v-icon>
                              ประมวลผล
                              <v-avatar
                                right
                                size="20"
                                class="blue lighten-5 pa-3 ma-3 blue--text"
                              >
                                <h2>{{ item.cal_room }}</h2>
                              </v-avatar>
                            </v-btn>
                            <v-btn
                              v-else
                              class="pa-3"
                              rounded
                              color="primary"
                              dark
                              @click="
                                analysis_data(
                                  item.rate_work_college_year,
                                  item.rate_work_college_code,
                                  item.rate_work_course_id,
                                  item.rate_work_college_id_class
                                )
                              "
                            >
                              <v-icon left>
                                mdi-google-analytics
                              </v-icon>
                              ประมวลผล
                            </v-btn>
                          </template>

                          <template
                            v-slot:[`item.analysis_action`]="{
                              item
                            }"
                          >
                            <v-chip
                              v-if="item.cal_room"
                              class="ma-2"
                              color="blue"
                              label
                              outlined
                              large
                            >
                              <v-avatar left>
                                <v-icon>mdi-checkbox-marked-circle</v-icon>
                              </v-avatar>
                              บันทึกข้อมูลเรียบร้อย
                              <v-avatar
                                right
                                size="20"
                                class="blue lighten-5 pa-4  ma-2"
                              >
                                <h3>{{ item.cal_man_power }}</h3>
                              </v-avatar>
                            </v-chip>

                            <v-chip v-else color="warning" text-color="white">
                              <v-avatar left>
                                <v-icon>mdi-alert-circle</v-icon>
                              </v-avatar>
                              ยังไม่ได้บันทึกรายการ
                            </v-chip>
                          </template>

                          <template v-slot:[`item.result_all`]="{ item }">
                            {{
                              parseInt(item.std_level_1) +
                                parseInt(item.std_level_2) +
                                (parseInt(item.std_level_3) || 0)
                            }}
                          </template>

                          <template v-slot:[`item.action`]="{ item }">
                            <v-icon
                              color="red"
                              @click.stop="
                                rate_work_college_cal_roomDelete(
                                  item.rate_work_college_year,
                                  item.rate_work_college_code,
                                  item.rate_work_course_id,
                                  item.rate_work_college_id_class
                                )"
                            >
                              mdi-delete
                            </v-icon>
                          </template>                          
                        </v-data-table>
                       <h3 class="red--text">*กรณีแก้ไขเปลี่ยนแปลงข้อมูลจำนวน นักเรียน นักศึกษา ในขั้นตอนที่ 2 กรุณากดปุ่มประมวลผลซ้ำอีกครั้ง เพื่อปรับปรุงข้อมูล</h3>  
                      </v-card>

                      <v-card>
                        <v-card-title>
                          <h3>
                            รวมนักเรียนนักศึกษา แยก ปวช. ปวส.<span
                              class="green--text"
                            >
                              [คำนวณห้องเรียน อัตรากำลัง หมวดสามัญ ขั้นตอนที่ 2
                              ]</span
                            >
                          </h3>
                        </v-card-title>
                        <v-simple-table>
                          <thead>
                            <tr>
                              <th class="text-center">
                                ปีการศึกษา
                              </th>
                              <th class="text-center">
                                สถานศึกษา
                              </th>
                              <th class="text-center blue--text">
                                วิเคราะห์ข้อมูล/ห้องเรียน
                              </th>
                              <th class="text-center">
                                สถานะ/อัตรากำลัง
                              </th>
                              <th class="text-center">
                                ปวช.1
                              </th>
                              <th class="text-center">
                                ปวช.2
                              </th>
                              <th class="text-center">
                                ปวช.3
                              </th>
                              <th class="text-center">
                                รวม ปวช.
                              </th>
                              <th class="text-center">
                                ปวส.1
                              </th>
                              <th class="text-center">
                                ปวส.2
                              </th>
                              <th class="text-center">
                                รวม ปวส.
                              </th>
                              <th class="text-center">
                                รวมทั้งสิ้น.
                              </th>
                              <th class="text-center">
                                ดำเนินการ
                              </th>
                            </tr>
                          </thead>
                          <tbody
                            v-if="
                              rate_work_colleges_sumall_gen.rate_work_college_year
                            "
                          >
                            <tr>
                              <td class="text-center">
                                {{
                                  rate_work_colleges_sumall_gen.rate_work_college_year
                                }}
                              </td>
                              <td class="text-center">
                                {{ rate_work_colleges_sumall_gen.college_name }}
                              </td>
                              <td class="text-center">
                                <v-btn
                                  v-if="rate_work_colleges_sumall_gen.cal_room"
                                  class="pa-3"
                                  rounded
                                  color="blue"
                                  dark
                                  @click="analysis_data_general_update()"
                                >
                                  <v-icon left>
                                    mdi-google-analytics
                                  </v-icon>
                                  ประมวลผล
                                  <v-avatar
                                    right
                                    size="20"
                                    class="blue lighten-5 pa-3 ma-3 blue--text"
                                  >
                                    <h2>
                                      {{
                                        rate_work_colleges_sumall_gen.cal_room
                                      }}
                                    </h2>
                                  </v-avatar>
                                </v-btn>
                                <v-btn
                                  v-else
                                  class="pa-3"
                                  rounded
                                  color="primary"
                                  dark
                                  @click="analysis_data_general()"
                                >
                                  <v-icon left>
                                    mdi-google-analytics
                                  </v-icon>
                                  ประมวลผล
                                   <v-icon right>
                                    mdi-cursor-default
                                  </v-icon>
                                </v-btn>
                              </td>
                              <td class="text-center">
                                <v-chip
                                  v-if="
                                    rate_work_colleges_sumall_gen.cal_man_power
                                  "
                                  class="ma-2"
                                  color="blue"
                                  label
                                  outlined
                                  large
                                >
                                  <v-avatar left>
                                    <v-icon>mdi-checkbox-marked-circle</v-icon>
                                  </v-avatar>
                                  บันทึกข้อมูลเรียบร้อย
                                  <v-avatar
                                    right
                                    size="20"
                                    class="blue lighten-5 pa-4  ma-2"
                                  >
                                    <h3>
                                      {{
                                        rate_work_colleges_sumall_gen.cal_man_power
                                      }}
                                    </h3>
                                  </v-avatar>
                                </v-chip>

                                <v-chip
                                  v-else
                                  color="warning"
                                  text-color="white"
                                >
                                  <v-avatar left>
                                    <v-icon>mdi-alert-circle</v-icon>
                                  </v-avatar>
                                  ยังไม่ได้บันทึกรายการ
                                </v-chip>
                              </td>
                              <td class="text-center">
                                {{
                                  rate_work_colleges_sumall_gen.sum_branch_20_1
                                }}
                              </td>
                              <td class="text-center">
                                {{
                                  rate_work_colleges_sumall_gen.sum_branch_20_2
                                }}
                              </td>
                              <td class="text-center">
                                {{
                                  rate_work_colleges_sumall_gen.sum_branch_20_3
                                }}
                              </td>
                              <td class="text-center">
                                {{ rate_work_colleges_sumall_gen.sum_all_20 }}
                              </td>
                              <td class="text-center">
                                {{
                                  rate_work_colleges_sumall_gen.sum_branch_30_1
                                }}
                              </td>
                              <td class="text-center">
                                {{
                                  rate_work_colleges_sumall_gen.sum_branch_30_2
                                }}
                              </td>
                              <td class="text-center">
                                {{ rate_work_colleges_sumall_gen.sum_all_30 }}
                              </td>
                              <td class="text-center">
                                {{ rate_work_colleges_sumall_gen.sum_all }}
                              </td>
                              <td class="text-center">
                                <v-icon
                                  color="red"
                                  @click.stop="
                                    rate_work_college_cal_room_gen_Delete()
                                  "
                                >
                                  mdi-delete
                                </v-icon>
                              </td>
                            </tr>
                          </tbody>
                        </v-simple-table>
                            <h3 class="red--text">*กรณีแก้ไขเปลี่ยนแปลงข้อมูลจำนวน นักเรียน นักศึกษา ในขั้นตอนที่ 2 กรุณากดปุ่มประมวลผลซ้ำอีกครั้ง เพื่อปรับปรุงข้อมูล</h3>  
                      </v-card>
                        <!-- v-if="user.college_id_code_type_manpower === '6'" -->
                      <v-card>
                        <v-card-title>
                          <h3>
                            รวมผู้เรียนหลักสูตรระยะสั้น
                            <span class="green--text">
                              [ คำนวณอัตรากำลังครูสอน ห้องเรียนระยะสั้น ]
                            </span>
                          </h3>
                        </v-card-title>
                        <v-simple-table>
                          <thead>
                            <tr>
                              <th class="text-center">
                                ปีการศึกษา
                              </th>
                              <th class="text-center">
                                สถานศึกษา
                              </th>
                              <th class="text-center blue--text">
                                วิเคราะห์ข้อมูล/ห้องเรียน
                              </th>
                              <th class="text-center">
                                สถานะ/อัตรากำลัง
                              </th>
                              <th class="text-center">
                                จำนวนผู้เรียนรวม
                              </th>
                              <th class="text-center">
                                จำนวนห้องเรียน
                              </th>
                              <th class="text-center">
                                จำนวนชั่วโมงสอน
                              </th>
                              <th class="text-center">
                                ดำเนินการ
                              </th>
                            </tr>
                          </thead>
                          <tbody v-if="rate_work_sc_show.rate_sc_year">
                            <tr>
                              <td class="text-center">
                                {{ rate_work_sc_show.rate_sc_year }}
                              </td>
                              <td class="text-center">
                                {{ rate_work_sc_show.college_name }}
                              </td>
                              <td class="text-center">
                                <v-btn
                                  v-if="rate_work_sc_show.cal_room"
                                  class="pa-3"
                                  rounded
                                  color="blue"
                                  dark
                                  @click="analysis_data_sc_update()"
                                >
                                  <v-icon left>
                                    mdi-google-analytics
                                  </v-icon>
                                  ประมวลผล
                                  <v-avatar
                                    right
                                    size="20"
                                    class="blue lighten-5 pa-3 ma-3 blue--text"
                                  >
                                    <h2>{{ rate_work_sc_show.cal_room }}</h2>
                                  </v-avatar>
                                </v-btn>
                                <v-btn
                                  v-else
                                  class="ma-3"                                  
                                  rounded
                                  color="primary"
                                  dark
                                  @click="analysis_data_sc()"
                                >
                                  <v-icon left>
                                    mdi-google-analytics
                                  </v-icon>
                                  ประมวลผล
                                  <v-icon right>
                                    mdi-cursor-default
                                  </v-icon>
                                </v-btn>
                              </td>
                              <td class="text-center">
                                <v-chip
                                  v-if="rate_work_sc_show.cal_man_power"
                                  class="ma-2"
                                  color="blue"
                                  label
                                  outlined
                                  large
                                >
                                  <v-avatar left>
                                    <v-icon>mdi-checkbox-marked-circle</v-icon>
                                  </v-avatar>
                                  บันทึกข้อมูลเรียบร้อย
                                  <v-avatar
                                    right
                                    size="20"
                                    class="blue lighten-5 pa-4  ma-2"
                                  >
                                    <h3>
                                      {{ rate_work_sc_show.cal_man_power }}
                                    </h3>
                                  </v-avatar>
                                </v-chip>

                                <v-chip                                  
                                  v-else
                                  color="warning"
                                  text-color="white"
                                >
                                  <v-avatar left>
                                    <v-icon>mdi-alert-circle</v-icon>
                                  </v-avatar>
                                  ยังไม่ได้บันทึกรายการ
                                </v-chip>
                              </td>
                              <td class="text-center">
                                {{ rate_work_sc_show.sc_sum_all }}
                              </td>
                              <td class="text-center">
                                {{ rate_work_sc_show.sc_room_sum_all }}
                              </td>
                              <td class="text-center">
                                {{ rate_work_sc_show.sc_hours_sum_all }}
                              </td>
                              <td class="text-center">
                                <v-icon
                                  color="red"
                                  @click.stop="
                                    rate_work_college_cal_room_sc_Delete()
                                  "
                                >
                                  mdi-delete
                                </v-icon>
                              </td>
                            </tr>
                          </tbody>
                        </v-simple-table>
                      </v-card>
                      <v-card>
                        <v-card-title>
                          <h3>รวมนักเรียนแต่ละประเภทวิชา</h3>
                        </v-card-title>
                        <v-data-table
                          color="success"
                          :loading="loading"
                          :headers="headers_all"
                          :items="rate_work_colleges_group_course_type"
                        >
                          <template
                            v-slot:[`item.rate_work_college_id_class`]="{
                              item
                            }"
                          >
                            {{ class_level(item.rate_work_college_id_class) }}
                          </template>
                          <template v-slot:[`item.result_all`]="{ item }">
                            {{
                              parseInt(item.std_level_1) +
                                parseInt(item.std_level_2) +
                                (parseInt(item.std_level_3) || 0)
                            }}
                          </template>
                        </v-data-table>
                      </v-card>

                      <v-card>
                        <v-card-title>
                          <h3>นักเรียน ระดับประกาศนียบัตรวิชาชีพ (ปวช).</h3>
                        </v-card-title>
                        <v-col cols="12" md="12">
                          <v-simple-table>
                            <thead>
                              <tr class="red-text">
                                <th class="text-center">
                                  จำนวนสาขาวิชา ระดับ ปวช.
                                </th>
                                <th class="text-center">
                                  จำนวนนักเรียน รวม ปวช.1
                                </th>
                                <th class="text-center">
                                  จำนวนนักเรียน รวม ปวช.2
                                </th>
                                <th class="text-center">
                                  จำนวนนักเรียน รวม ปวช.3
                                </th>
                                <th class="text-center">
                                  จำนวนนักเรียน รวมทั้งสิ้น
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr
                                v-for="item in rate_work_college_sum_20"
                                :key="item.count_branch_20"
                              >
                                <td class="text-center">
                                  {{ item.count_branch_20 }}
                                </td>
                                <td class="text-center">
                                  {{ item.sum_branch_20_1 }}
                                </td>
                                <td class="text-center">
                                  {{ item.sum_branch_20_2 }}
                                </td>
                                <td class="text-center">
                                  {{ item.sum_branch_20_3 }}
                                </td>
                                <td class="text-center">
                                  {{ item.sum_all_20 }}
                                </td>
                              </tr>
                            </tbody>
                          </v-simple-table>
                        </v-col>
                        <v-data-table
                          color="success"
                          :loading="loading"
                          :headers="headers"
                          :items="rate_work_colleges"
                        >
                          <template v-slot:[`item`]="{ item, index }">
                            <tr>
                              <td class="text-center">{{ index + 1 }}</td>
                              <td class="text-center">
                                {{ item.rate_work_college_year }}
                              </td>
                              <td class="text-center">
                                {{ item.rate_work_college_code }}
                              </td>
                              <td class="text-center">
                                {{ item.rate_work_course_id }}
                              </td>
                              <td class="text-center">
                                {{ item.type_course }}
                              </td>
                              <td class="text-center">
                                {{ item.year_course }}
                              </td>

                              <td class="text-center">
                                {{ item.branch_name_th }}
                              </td>
                              <td class="text-center">
                                {{
                                  item.update_time
                                    | moment("add", "543 years")
                                    | moment("D MMMM YYYY")
                                }}
                              </td>
                              <td class="text-left">
                                {{ item.rate_work_field_study_lavel_1 }}
                              </td>
                              <td class="text-left">
                                {{ item.rate_work_field_study_lavel_2 }}
                              </td>
                              <td class="text-left">
                                {{ item.rate_work_field_study_lavel_3 }}
                              </td>
                              <td>
                                {{
                                  parseInt(item.rate_work_field_study_lavel_1) +
                                    parseInt(
                                      item.rate_work_field_study_lavel_2
                                    ) +
                                    parseInt(item.rate_work_field_study_lavel_3)
                                }}
                              </td>
                            </tr>
                          </template>

                          <v-alert
                            slot="no-results"
                            :value="true"
                            color="error"
                            icon="mdi-alert"
                            >ไม่พบผลลัพธ์ "{{ search }}"
                            ที่คุณกำลังค้นหา.</v-alert
                          >
                        </v-data-table>
                      </v-card>

                      <v-card>
                        <v-card-title>
                          <h3>
                            นักศึกษา ระดับประกาศนียบัตรวิชาชีพชั้นสูง (ปวส).
                          </h3>
                        </v-card-title>

                        <v-col cols="12" md="12">
                          <v-simple-table>
                            <thead>
                              <tr class="red-text">
                                <th class="text-center">
                                  จำนวนสาขาวิชา ระดับ ปวส.
                                </th>
                                <th class="text-center">
                                  จำนวนนักเรียน รวม ปวส.1
                                </th>
                                <th class="text-center">
                                  จำนวนนักเรียน รวม ปวส.2
                                </th>
                                <th class="text-center">
                                  จำนวนนักเรียน รวมทั้งสิ้น
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr
                                v-for="item in rate_work_college_sum_30"
                                :key="item.count_branch_20"
                              >
                                <td class="text-center">
                                  {{ item.count_branch_30 }}
                                </td>
                                <td class="text-center">
                                  {{ item.sum_branch_30_1 }}
                                </td>
                                <td class="text-center">
                                  {{ item.sum_branch_30_2 }}
                                </td>
                                <td class="text-center">
                                  {{ item.sum_all_30 }}
                                </td>
                              </tr>
                            </tbody>
                          </v-simple-table>
                        </v-col>

                        <v-data-table
                          color="success"
                          :loading="loading"
                          :headers="headers_30"
                          :items="rate_work_colleges_30"
                        >
                          <template v-slot:[`item`]="{ item, index }">
                            <tr>
                              <td class="text-center">{{ index + 1 }}</td>
                              <td class="text-center">
                                {{ item.rate_work_college_year }}
                              </td>
                              <td class="text-center">
                                {{ item.rate_work_college_code }}
                              </td>
                              <td class="text-center">
                                {{ item.rate_work_course_id }}
                              </td>
                              <td class="text-center">
                                {{ item.type_course }}
                              </td>
                              <td class="text-center">
                                {{ item.year_course }}
                              </td>

                              <td class="text-center">
                                {{ item.branch_name_th }}
                              </td>
                              <td class="text-center">
                                {{
                                  item.update_time
                                    | moment("add", "543 years")
                                    | moment("D MMMM YYYY")
                                }}
                              </td>
                              <td class="text-left">
                                {{ item.rate_work_field_study_lavel_1 }}
                              </td>
                              <td class="text-left">
                                {{ item.rate_work_field_study_lavel_2 }}
                              </td>
                              <td>
                                {{
                                  parseInt(item.rate_work_field_study_lavel_1) +
                                    parseInt(item.rate_work_field_study_lavel_2)
                                }}
                              </td>
                            </tr>
                          </template>

                          <v-alert
                            slot="no-results"
                            :value="true"
                            color="error"
                            icon="mdi-alert"
                            >ไม่พบผลลัพธ์ "{{ search }}"
                            ที่คุณกำลังค้นหา.</v-alert
                          >
                        </v-data-table>
                      </v-card>                     
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </base-material-card>
        </v-col>
      </v-row>

      <!-- analysis_data_Delete_gen_dialog -->
      <v-layout>
        <v-dialog
          v-model="analysis_data_Delete_gen_dialog"
          persistent
          max-width="60%"
        >
          <v-card class="mx-auto pa-5">
            <base-material-card
              color="error"
              icon="mdi-delete"
              title="ลบข้อมูล ประมวลผล หมวดวิชาสามัญ"
              class="px-5 py-3 text_google"
            >
              <v-col cols="12" class="text-right">
                <h3>
                  {{ analysis_data_edit.rate_work_ccr_code }}
                  {{ analysis_data_edit.rate_work_ccr_id }}
                </h3>
              </v-col>
            </base-material-card>
            <v-card-text class="text_google">
              <v-form ref="analysis_data_Delete_gen_dialogform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-data-table
                      :headers="headers_gen_delete"
                      :items="analysis_data_edit_gen"
                    >
                      <template
                        v-slot:[`item.rate_work_ccr_course_id`]="{
                          item
                        }"
                      >
                        <span v-if="item.rate_work_ccr_course_id === '00'"
                          >หมวดวิชาสามัญ</span
                        >
                      </template>
                    </v-data-table>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                large
                @click.stop="analysis_data_Delete_gen_dialog = false"
              >
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn
                large
                color="red darken-3"
                @click.stop="analysis_data_Delete_gen_dialogsubmit()"
                dark
              >
                <v-icon dark>mdi-delete</v-icon>&nbsp;ลบ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>


       <!-- analysis_data_Delete_sc_dialog -->
      <v-layout>
        <v-dialog
          v-model="analysis_data_Delete_sc_dialog"
          persistent
          max-width="60%"
        >
          <v-card class="mx-auto pa-5">
            <base-material-card
              color="error"
              icon="mdi-delete"
              title="ลบข้อมูล ประมวลผลระยะสั้น"
              class="px-5 py-3 text_google"
            >              
            </base-material-card>
            <v-card-text class="text_google">
              <v-form ref="analysis_data_Delete_sc_dialogform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-data-table
                      :headers="headers_gen_delete"
                      :items="analysis_data_edit_sc"
                    >
                      <template
                        v-slot:[`item.rate_work_ccr_course_id`]="{
                          item
                        }"
                      >                        
                        <span v-if="item.rate_work_ccr_course_id === '66'"
                        >หลักสูตรระยะสั้น</span
                        >
                      </template>
                    </v-data-table>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                large
                @click.stop="analysis_data_Delete_sc_dialog = false"
              >
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn
                large
                color="red darken-3"
                @click.stop="analysis_data_Delete_sc_dialogsubmit()"
                dark
              >
                <v-icon dark>mdi-delete</v-icon>&nbsp;ลบ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- analysis_data_Delete_dialog -->
      <v-layout>
        <v-dialog
          v-model="analysis_data_Delete_dialog"
          persistent
          max-width="40%"
        >
          <v-card class="mx-auto pa-5">
            <base-material-card
              color="error"
              icon="mdi-delete"
              title="ลบข้อมูล"
              class="px-5 py-3 text_google"
            >
              <v-col cols="12" class="text-right">
                <h3>
                  {{ analysis_data_edit.rate_work_ccr_code }}
                  {{ analysis_data_edit.rate_work_ccr_id }}
                </h3>
              </v-col>
            </base-material-card>
            <v-card-text class="text_google">
              <v-form ref="analysis_data_Delete_dialogform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12 class="text-center">
                      ยืนยันการลบข้อมูล :

                      <h3>ปี : {{ analysis_data_edit.rate_work_ccr_year }}</h3>

                      <h3>
                        ประเภทวิชา :
                        {{ analysis_data_edit.rate_work_ccr_course_id }}
                        {{ analysis_data_edit.type_course }}
                      </h3>
                      <h3>
                        ระดับชั้น :
                        <span
                          v-if="
                            analysis_data_edit.rate_work_ccr_id_class === '20'
                          "
                          >ปวช.</span
                        >
                        <span
                          v-else-if="
                            analysis_data_edit.rate_work_ccr_id_class === '30'
                          "
                          >ปวส.</span
                        >
                      </h3>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn large @click.stop="analysis_data_Delete_dialog = false">
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn
                large
                color="red darken-3"
                @click.stop="analysis_data_Delete_dialogsubmit()"
                dark
              >
                <v-icon dark>mdi-delete</v-icon>&nbsp;ลบ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model deleterate_work_collegedialog -->
      <v-layout>
        <v-dialog
          v-model="deleterate_work_collegedialog"
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
              <v-form ref="deleterate_work_collegeform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12>
                      ยืนยันการลบข้อมูล :
                      <h3>{{ analysis_data_dialog.rate_work_college_id }}</h3>
                      <h3>{{ analysis_data_dialog.rate_work_course_id }}</h3>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn large @click.stop="deleterate_work_collegedialog = false">
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn
                large
                color="red darken-3"
                @click.stop="deleterate_work_collegeubmit()"
                dark
              >
                <v-icon dark>mdi-delete</v-icon>&nbsp;ลบ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model analysis_data_dialog -->
      <v-layout row justify-center>
        <v-dialog v-model="analysis_data_dialog" persistent max-width="50%">
          <v-card class="mx-auto pa-5">
            <base-material-card
              color="green"
              icon="mdi-clipboard-text"
              title="วิเคราะห์ข้อมูล"
              class="px-5 py-3 text_google"
            >
              <v-col cols="12" class="text-right">
                {{ analysis_data_s.rate_work_college_code }}
              </v-col>
            </base-material-card>
            <v-card-text>
              <v-form ref="analysis_data_dialogform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md12>
                      <v-row>
                        <v-col cols="12" md="12" class="text-center">
                          <h2>
                            ปีการศึกษา :
                            {{ analysis_data_s.rate_work_college_year }}
                          </h2>
                          <h2>
                            ประเภทวิชา :
                            {{ analysis_data_s.rate_work_course_id }} :
                            {{ analysis_data_s.name_type_course }}
                          </h2>
                          <h3>
                            รหัสกลุ่มสถานศึกษา :
                            {{ user.college_id_code_type_manpower }}
                          </h3>
                          <h3
                            v-if="
                              analysis_data_s.rate_work_college_id_class ===
                                '20'
                            "
                          >
                            ระดับ ปวช.
                            {{ analysis_data_s.rate_work_college_id_class }}
                          </h3>
                          <h3
                            v-if="
                              analysis_data_s.rate_work_college_id_class ===
                                '30'
                            "
                          >
                            ระดับ ปวส.
                            {{ analysis_data_s.rate_work_college_id_class }}
                          </h3>
                          <v-simple-table
                            v-if="
                              analysis_data_s.rate_work_college_id_class ===
                                '20'
                            "
                          >
                            <thead>
                              <tr>
                                <td class="text-center">ระดับชั้น</td>
                                <td class="text-center">จำนวน</td>
                                <td class="text-center">จำนวนห้อง</td>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td class="text-center">ปวช.1</td>
                                <td class="text-center">
                                  {{ analysis_data_s.std_level_1 }}
                                </td>
                                <td class="text-center">
                                  {{ analysis_data_s_result_01 }}
                                </td>
                              </tr>
                              <tr>
                                <td class="text-center">ปวช.2</td>
                                <td class="text-center">
                                  {{ analysis_data_s.std_level_2 }}
                                </td>
                                <td class="text-center">
                                  {{ analysis_data_s_result_02 }}
                                </td>
                              </tr>
                              <tr>
                                <td class="text-center">ปวช.3</td>
                                <td class="text-center">
                                  {{ analysis_data_s.std_level_3 }}
                                </td>
                                <td class="text-center">
                                  {{ analysis_data_s_result_03 }}
                                </td>
                              </tr>
                              <tr>
                                <td class="text-center">รวม</td>
                                <td class="text-center">
                                  {{
                                    parseInt(analysis_data_s.std_level_1) +
                                      parseInt(analysis_data_s.std_level_2) +
                                      parseInt(analysis_data_s.std_level_3)
                                  }}
                                </td>
                                <td class="text-center">
                                  {{ analysis_data_s_result_sum_room }}
                                </td>
                              </tr>
                            </tbody>
                          </v-simple-table>

                          <v-simple-table
                            v-if="
                              analysis_data_s.rate_work_college_id_class ===
                                '30'
                            "
                          >
                            <thead>
                              <tr>
                                <td class="text-center">ระดับชั้น</td>
                                <td class="text-center">จำนวน</td>
                                <td class="text-center">จำนวนห้อง</td>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td class="text-center">ปวส.1</td>
                                <td class="text-center">
                                  {{ analysis_data_s.std_level_1 }}
                                </td>
                                <td class="text-center">
                                  {{ analysis_data_s_result_01 }}
                                </td>
                              </tr>
                              <tr>
                                <td class="text-center">ปวส.2</td>
                                <td class="text-center">
                                  {{ analysis_data_s.std_level_2 }}
                                </td>
                                <td class="text-center">
                                  {{ analysis_data_s_result_02 }}
                                </td>

                                <td></td>
                              </tr>
                              <tr>
                                <td class="text-center">รวม</td>
                                <td class="text-center">
                                  {{
                                    parseInt(analysis_data_s.std_level_1) +
                                      parseInt(analysis_data_s.std_level_2)
                                  }}
                                </td>
                                <td class="text-center">
                                  {{ analysis_data_s_result_sum_room }}
                                </td>
                              </tr>
                            </tbody>
                          </v-simple-table>
                        </v-col>
                        <v-col cols="12" md="12" class="text-center">
                          <h3>คำนวณอัตรากำลัง</h3>
                          <h3
                            v-if="
                              analysis_data_s.rate_work_college_id_class ===
                                '20'
                            "
                          >
                            ระดับ ปวช.
                            {{ analysis_data_man_power_cal.toFixed(2) }}
                          </h3>
                          <h3
                            v-if="
                              analysis_data_s.rate_work_college_id_class ===
                                '30'
                            "
                          >
                            ระดับ ปวส.
                            {{ analysis_data_man_power_cal.toFixed(2) }}
                          </h3>
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
                color="warning"
                @click.stop="analysis_data_dialog = false"
                rounded
              >
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn
                large
                color="green"
                @click.stop="analysis_data_dialogSubmit()"
                rounded
              >
                <v-icon dark>mdi-content-save</v-icon>&nbsp;บันทึก
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model analysis_data_Updatedialog -->
      <v-layout row justify-center>
        <v-dialog
          v-model="analysis_data_Updatedialog"
          persistent
          max-width="50%"
        >
          <v-card class="mx-auto pa-5">
            <base-material-card
              color="yellow"
              icon="mdi-clipboard-text"
              title="วิเคราะห์ข้อมูล"
              class="px-5 py-3 text_google"
            >
              <v-col cols="12" class="text-right">
                {{ analysis_data_s.rate_work_college_code }}
              </v-col>
            </base-material-card>
            <v-card-text>
              <v-form ref="analysis_data_Updatedialogform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md12>
                      <v-row>
                        <v-col cols="12" md="12" class="text-center">
                          <h2>
                            ปีการศึกษา :
                            {{ analysis_data_s.rate_work_college_year }}
                          </h2>
                          <h2>
                            ประเภทวิชา :
                            {{ analysis_data_s.rate_work_course_id }} :
                            {{ analysis_data_s.name_type_course }}
                          </h2>
                          <h3>
                            รหัสกลุ่มสถานศึกษา :
                            {{ user.college_id_code_type_manpower }}
                          </h3>
                          <h3
                            v-if="
                              analysis_data_s.rate_work_college_id_class ===
                                '20'
                            "
                          >
                            ระดับ ปวช.
                            {{ analysis_data_s.rate_work_college_id_class }}
                          </h3>
                          <h3
                            v-if="
                              analysis_data_s.rate_work_college_id_class ===
                                '30'
                            "
                          >
                            ระดับ ปวส.
                            {{ analysis_data_s.rate_work_college_id_class }}
                          </h3>
                          <v-simple-table
                            v-if="
                              analysis_data_s.rate_work_college_id_class ===
                                '20'
                            "
                          >
                            <thead>
                              <tr>
                                <td class="text-center">ระดับชั้น</td>
                                <td class="text-center">จำนวน</td>
                                <td class="text-center">จำนวนห้อง</td>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td class="text-center">ปวช.1</td>
                                <td class="text-center">
                                  {{ analysis_data_s.std_level_1 }}
                                </td>
                                <td class="text-center">
                                  {{ analysis_data_s_result_01 }}
                                </td>
                              </tr>
                              <tr>
                                <td class="text-center">ปวช.2</td>
                                <td class="text-center">
                                  {{ analysis_data_s.std_level_2 }}
                                </td>
                                <td class="text-center">
                                  {{ analysis_data_s_result_02 }}
                                </td>
                              </tr>
                              <tr>
                                <td class="text-center">ปวช.3</td>
                                <td class="text-center">
                                  {{ analysis_data_s.std_level_3 }}
                                </td>
                                <td class="text-center">
                                  {{ analysis_data_s_result_03 }}
                                </td>
                              </tr>
                              <tr>
                                <td class="text-center">รวม</td>
                                <td class="text-center">
                                  {{
                                    parseInt(analysis_data_s.std_level_1) +
                                      parseInt(analysis_data_s.std_level_2) +
                                      parseInt(analysis_data_s.std_level_3)
                                  }}
                                </td>
                                <td class="text-center">
                                  {{ analysis_data_s_result_sum_room }}
                                </td>
                              </tr>
                            </tbody>
                          </v-simple-table>

                          <v-simple-table
                            v-if="
                              analysis_data_s.rate_work_college_id_class ===
                                '30'
                            "
                          >
                            <thead>
                              <tr>
                                <td class="text-center">ระดับชั้น</td>
                                <td class="text-center">จำนวน</td>
                                <td class="text-center">จำนวนห้อง</td>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td class="text-center">ปวส.1</td>
                                <td class="text-center">
                                  {{ analysis_data_s.std_level_1 }}
                                </td>
                                <td class="text-center">
                                  {{ analysis_data_s_result_01 }}
                                </td>
                              </tr>
                              <tr>
                                <td class="text-center">ปวส.2</td>
                                <td class="text-center">
                                  {{ analysis_data_s.std_level_2 }}
                                </td>
                                <td class="text-center">
                                  {{ analysis_data_s_result_02 }}
                                </td>

                                <td></td>
                              </tr>
                              <tr>
                                <td class="text-center">รวม</td>
                                <td class="text-center">
                                  {{
                                    parseInt(analysis_data_s.std_level_1) +
                                      parseInt(analysis_data_s.std_level_2)
                                  }}
                                </td>
                                <td class="text-center">
                                  {{ analysis_data_s_result_sum_room }}
                                </td>
                              </tr>
                            </tbody>
                          </v-simple-table>
                        </v-col>
                        <v-col cols="12" md="12" class="text-center">
                          <h3>คำนวณอัตรากำลัง</h3>
                          <h3
                            v-if="
                              analysis_data_s.rate_work_college_id_class ===
                                '20'
                            "
                          >
                            ระดับ ปวช.
                            {{ analysis_data_man_power_cal.toFixed(2) }}
                          </h3>
                          <h3
                            v-if="
                              analysis_data_s.rate_work_college_id_class ===
                                '30'
                            "
                          >
                            ระดับ ปวส.
                            {{ analysis_data_man_power_cal.toFixed(2) }}
                          </h3>
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
                color="warning"
                @click.stop="analysis_data_Updatedialog = false"
                rounded
              >
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn
                large
                color="green"
                @click.stop="analysis_data_UpdatedialogSubmit()"
                rounded
              >
                <v-icon dark>mdi-content-save</v-icon
                >&nbsp;ปรับปรุงข้อมูลการคำนวณ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- analysis_data_scdialog -->
      <v-layout row justify-center>
        <v-dialog v-model="analysis_data_scdialog" persistent max-width="50%">
          <v-card class="mx-auto pa-5">
            <base-material-card
              color="green"
              icon="mdi-clipboard-text"
              title="วิเคราะห์ข้อมูล อัตรากำลัง หลักสูตรระยะสั้น"
              class="px-5 py-3 text_google"
            >
              <v-col cols="12" class="text-right">
                {{ rate_work_sc_show.rate_sc_college_code }}
              </v-col>
            </base-material-card>
            <v-card-text>
              <v-form ref="analysis_data_scdialogform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md12>
                      <v-row>
                        <v-col cols="12" md="12" class="text-center">
                          <h2>
                            ปีการศึกษา :
                            {{ rate_work_sc_show.rate_sc_year }}
                          </h2>
                          <h2>
                            ประเภทวิชา : 66 : หลักสูตรระยะสั้น
                          </h2>
                          <h3>
                            รหัสกลุ่มสถานศึกษา :
                            {{ user.college_id_code_type_manpower }}
                          </h3>
                          <v-simple-table>
                            <thead>
                              <tr>
                                <td class="text-center">จำนวนผู้เรียนรวม</td>
                                <td class="text-center">จำนอนห้องเรียน</td>
                                <td class="text-center">จำนวนชั่วโมงสอน</td>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td class="text-center">
                                  {{ rate_work_sc_show.sc_sum_all }}
                                </td>
                                <td class="text-center">
                                  {{ rate_work_sc_show.sc_room_sum_all }}
                                </td>
                                <td class="text-center">
                                  {{ rate_work_sc_show.sc_hours_sum_all }}
                                </td>
                              </tr>
                            </tbody>
                          </v-simple-table>
                        </v-col>
                        <v-col cols="12" md="12" class="text-center">
                          <h2>ผลการคำนวณ</h2>
                          <h3>อัตรากำลังผู้สอน : {{ cal_man_power_sc }}</h3>
                          <h3>ห้องเรียนระยะสั้น : {{ cal_rooms_sc }}</h3>
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
                color="warning"
                @click.stop="analysis_data_scdialog = false"
                rounded
              >
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn
                large
                color="green"
                @click.stop="analysis_data_scdialogSubmit()"
                rounded
              >
                <v-icon dark>mdi-content-save</v-icon>&nbsp;บันทึก
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- analysis_data_scUpdatedialog -->
      <v-layout row justify-center>
        <v-dialog
          v-model="analysis_data_scUpdatedialog"
          persistent
          max-width="50%"
        >
          <v-card class="mx-auto pa-5">
            <base-material-card
              color="warning"
              icon="mdi-clipboard-text"
              title="วิเคราะห์ข้อมูล อัตรากำลัง หลักสูตรระยะสั้น"
              class="px-5 py-3 text_google"
            >
              <v-col cols="12" class="text-right">
                {{ rate_work_sc_show.rate_sc_college_code }}
              </v-col>
            </base-material-card>
            <v-card-text>
              <v-form ref="analysis_data_scUpdatedialogform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md12>
                      <v-row>
                        <v-col cols="12" md="12" class="text-center">
                          <h2>
                            ปีการศึกษา :
                            {{ rate_work_sc_show.rate_sc_year }}
                          </h2>
                          <h2>
                            ประเภทวิชา : 66 : หลักสูตรระยะสั้น
                          </h2>
                          <h3>
                            รหัสกลุ่มสถานศึกษา :
                            {{ user.college_id_code_type_manpower }}
                          </h3>
                          <v-simple-table>
                            <thead>
                              <tr>
                                <td class="text-center">จำนวนผู้เรียนรวม</td>
                                <td class="text-center">จำนอนห้องเรียน</td>
                                <td class="text-center">จำนวนชั่วโมงสอน</td>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td class="text-center">
                                  {{ rate_work_sc_show.sc_sum_all }}
                                </td>
                                <td class="text-center">
                                  {{ rate_work_sc_show.sc_room_sum_all }}
                                </td>
                                <td class="text-center">
                                  {{ rate_work_sc_show.sc_hours_sum_all }}
                                </td>
                              </tr>
                            </tbody>
                          </v-simple-table>
                        </v-col>
                        <v-col cols="12" md="12" class="text-center">
                          <h2>ผลการคำนวณ</h2>
                          <h3>อัตรากำลังผู้สอน : {{ cal_man_power_sc }}</h3>
                          <h3>ห้องเรียนระยะสั้น : {{ cal_rooms_sc }}</h3>
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
                color="warning"
                @click.stop="analysis_data_scUpdatedialog = false"
                rounded
              >
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn
                large
                color="green"
                @click.stop="analysis_data_scUpdatedialogSubmit()"
                rounded
              >
                <v-icon dark>mdi-content-save</v-icon
                >&nbsp;ปรับปรุงข้อมูลการคำนวณ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model analysis_data_generaldialog -->
      <v-layout row justify-center>
        <v-dialog
          v-model="analysis_data_generaldialog"
          persistent
          max-width="50%"
        >
          <v-card class="mx-auto pa-5">
            <base-material-card
              color="green"
              icon="mdi-clipboard-text"
              title="วิเคราะห์ข้อมูล อัตรากำลัง หมวดวิชาสามัญ"
              class="px-5 py-3 text_google"
            >
              <v-col cols="12" class="text-right">
                {{ rate_work_colleges_sumall_gen.rate_work_college_code }}
              </v-col>
            </base-material-card>
            <v-card-text>
              <v-form ref="analysis_data_generaldialogform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md12>
                      <v-row>
                        <v-col cols="12" md="12" class="text-center">
                          <h2>
                            ปีการศึกษา :
                            {{
                              rate_work_colleges_sumall_gen.rate_work_college_year
                            }}
                          </h2>
                          <h2>
                            ประเภทวิชา : 00 : สามัญสัมพันธ์
                          </h2>
                          <h3>
                            รหัสกลุ่มสถานศึกษา :
                            {{ user.college_id_code_type_manpower }}
                          </h3>
                          <v-simple-table>
                            <thead>
                              <tr>
                                <td class="text-center">ระดับชั้น</td>
                                <td class="text-center">จำนวน</td>
                                <td class="text-center">จำนวนห้อง</td>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td class="text-center">ปวช.1</td>
                                <td class="text-center">
                                  {{
                                    rate_work_colleges_sumall_gen.sum_branch_20_1
                                  }}
                                </td>
                                <td class="text-center">
                                  {{ analysis_data_s_result_01 }}
                                </td>
                              </tr>
                              <tr>
                                <td class="text-center">ปวช.2</td>
                                <td class="text-center">
                                  {{
                                    rate_work_colleges_sumall_gen.sum_branch_20_2
                                  }}
                                </td>
                                <td class="text-center">
                                  {{ analysis_data_s_result_02 }}
                                </td>
                              </tr>
                              <tr>
                                <td class="text-center">ปวช.3</td>
                                <td class="text-center">
                                  {{
                                    rate_work_colleges_sumall_gen.sum_branch_20_3
                                  }}
                                </td>
                                <td class="text-center">
                                  {{ analysis_data_s_result_03 }}
                                </td>
                              </tr>
                              <tr>
                                <td class="text-center"><h3>รวม ปวช.</h3></td>
                                <td class="text-center">
                                  <h3>
                                    {{
                                      rate_work_colleges_sumall_gen.sum_all_20
                                    }}
                                  </h3>
                                </td>
                                <td class="text-center">
                                  <h3>
                                    {{ analysis_data_s_result_sum_room_20 }}
                                  </h3>
                                </td>
                              </tr>

                              <tr>
                                <td class="text-center">ปวส 1.</td>
                                <td class="text-center">
                                  {{
                                    rate_work_colleges_sumall_gen.sum_branch_30_1
                                  }}
                                </td>
                                <td class="text-center">
                                  {{ analysis_data_s_result_04 }}
                                </td>
                              </tr>

                              <tr>
                                <td class="text-center">ปวส 2.</td>
                                <td class="text-center">
                                  {{
                                    rate_work_colleges_sumall_gen.sum_branch_30_2
                                  }}
                                </td>
                                <td class="text-center">
                                  {{ analysis_data_s_result_05 }}
                                </td>
                              </tr>

                              <tr>
                                <td class="text-center"><h3>รวม ปวส.</h3></td>
                                <td class="text-center">
                                  <h3>
                                    {{
                                      rate_work_colleges_sumall_gen.sum_all_30
                                    }}
                                  </h3>
                                </td>
                                <td class="text-center">
                                  <h3>
                                    {{ analysis_data_s_result_sum_room_30 }}
                                  </h3>
                                </td>
                              </tr>
                              <tr>
                                <td class="text-center">
                                  <h3>รวมทั้งสิ้น.</h3>
                                </td>
                                <td class="text-center">
                                  <h3>
                                    {{ rate_work_colleges_sumall_gen.sum_all }}
                                  </h3>
                                </td>
                                <td class="text-center">
                                  <h3>{{ analysis_data_s_result_sum_room }}</h3>
                                </td>
                              </tr>
                            </tbody>
                          </v-simple-table>
                        </v-col>
                        <v-col cols="12" md="12" class="text-center">
                          <h2>คำนวณอัตรากำลัง</h2>
                          <h3>ปวช. {{ analysis_data_man_power_cal_20 }}</h3>
                          <h3>ปวส. {{ analysis_data_man_power_cal_30 }}</h3>
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
                color="warning"
                @click.stop="analysis_data_generaldialog = false"
                rounded
              >
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn
                large
                color="green"
                @click.stop="analysis_data_generaldialogSubmit()"
                rounded
              >
                <v-icon dark>mdi-content-save</v-icon>&nbsp;บันทึก
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- analysis_data_generalUpdatedialog -->

      <v-layout row justify-center>
        <v-dialog
          v-model="analysis_data_generalUpdatedialog"
          persistent
          max-width="50%"
        >
          <v-card class="mx-auto pa-5">
            <base-material-card
              color="green"
              icon="mdi-clipboard-text"
              title="วิเคราะห์ข้อมูล อัตรากำลัง หมวดวิชาสามัญ"
              class="px-5 py-3 text_google"
            >
              <v-col cols="12" class="text-right">
                {{ rate_work_colleges_sumall_gen.rate_work_college_code }}
              </v-col>
            </base-material-card>
            <v-card-text>
              <v-form
                ref="analysis_data_generalUpdatedialogform"
                lazy-validation
              >
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md12>
                      <v-row>
                        <v-col cols="12" md="12" class="text-center">
                          <h2>
                            ปีการศึกษา :
                            {{
                              rate_work_colleges_sumall_gen.rate_work_college_year
                            }}
                          </h2>
                          <h2>
                            ประเภทวิชา : 00 : สามัญสัมพันธ์
                          </h2>
                          <h3>
                            รหัสกลุ่มสถานศึกษา :
                            {{ user.college_id_code_type_manpower }}
                          </h3>
                          <v-simple-table>
                            <thead>
                              <tr>
                                <td class="text-center">ระดับชั้น</td>
                                <td class="text-center">จำนวน</td>
                                <td class="text-center">จำนวนห้อง</td>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td class="text-center">ปวช.1</td>
                                <td class="text-center">
                                  {{
                                    rate_work_colleges_sumall_gen.sum_branch_20_1
                                  }}
                                </td>
                                <td class="text-center">
                                  {{ analysis_data_s_result_01 }}
                                </td>
                              </tr>
                              <tr>
                                <td class="text-center">ปวช.2</td>
                                <td class="text-center">
                                  {{
                                    rate_work_colleges_sumall_gen.sum_branch_20_2
                                  }}
                                </td>
                                <td class="text-center">
                                  {{ analysis_data_s_result_02 }}
                                </td>
                              </tr>
                              <tr>
                                <td class="text-center">ปวช.3</td>
                                <td class="text-center">
                                  {{
                                    rate_work_colleges_sumall_gen.sum_branch_20_3
                                  }}
                                </td>
                                <td class="text-center">
                                  {{ analysis_data_s_result_03 }}
                                </td>
                              </tr>
                              <tr>
                                <td class="text-center"><h3>รวม ปวช.</h3></td>
                                <td class="text-center">
                                  <h3>
                                    {{
                                      rate_work_colleges_sumall_gen.sum_all_20
                                    }}
                                  </h3>
                                </td>
                                <td class="text-center">
                                  <h3>
                                    {{ analysis_data_s_result_sum_room_20 }}
                                  </h3>
                                </td>
                              </tr>

                              <tr>
                                <td class="text-center">ปวส 1.</td>
                                <td class="text-center">
                                  {{
                                    rate_work_colleges_sumall_gen.sum_branch_30_1
                                  }}
                                </td>
                                <td class="text-center">
                                  {{ analysis_data_s_result_04 }}
                                </td>
                              </tr>

                              <tr>
                                <td class="text-center">ปวส 2.</td>
                                <td class="text-center">
                                  {{
                                    rate_work_colleges_sumall_gen.sum_branch_30_2
                                  }}
                                </td>
                                <td class="text-center">
                                  {{ analysis_data_s_result_05 }}
                                </td>
                              </tr>

                              <tr>
                                <td class="text-center"><h3>รวม ปวส.</h3></td>
                                <td class="text-center">
                                  <h3>
                                    {{
                                      rate_work_colleges_sumall_gen.sum_all_30
                                    }}
                                  </h3>
                                </td>
                                <td class="text-center">
                                  <h3>
                                    {{ analysis_data_s_result_sum_room_30 }}
                                  </h3>
                                </td>
                              </tr>
                              <tr>
                                <td class="text-center">
                                  <h3>รวมทั้งสิ้น.</h3>
                                </td>
                                <td class="text-center">
                                  <h3>
                                    {{ rate_work_colleges_sumall_gen.sum_all }}
                                  </h3>
                                </td>
                                <td class="text-center">
                                  <h3>{{ analysis_data_s_result_sum_room }}</h3>
                                </td>
                              </tr>
                            </tbody>
                          </v-simple-table>
                        </v-col>
                        <v-col cols="12" md="12" class="text-center">
                          <h2>คำนวณอัตรากำลัง</h2>
                          <h3>ปวช. {{ analysis_data_man_power_cal_20 }}</h3>
                          <h3>ปวส. {{ analysis_data_man_power_cal_30 }}</h3>
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
                color="warning"
                @click.stop="analysis_data_generalUpdatedialog = false"
                rounded
              >
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn
                large
                color="green"
                @click.stop="analysis_data_generalUpdatedialogSubmit()"
                rounded
              >
                <v-icon dark>mdi-content-save</v-icon
                >&nbsp;ปรับปรุงข้อมูลการคำนวณ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

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
            <v-btn
              color="red"
              text
              v-bind="attrs"
              @click="snackbar.show = false"
              >Close</v-btn
            >
          </template>
        </v-snackbar>
      </v-container>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      ApiKey: "HRvec2021",
      user: {},
      users: [],
      rate_work_colleges: [],
      rate_work_colleges_30: [],
      years_select: "2565",
      search_course: "",
      search: "",
      year_s: [2565, 2566, 2567, 2568, 2569, 2570],
      addrate_work_collegedialog: false,
      analysis_data_dialog: false,
      deleterate_work_collegedialog: false,
      addrate_work_gdialog: false,
      rate_work_collegeUpdatedialog: false,
      rate_work_collegeUpdatedialog_30: false,
      analysis_data_Updatedialog: false,
      analysis_data_generaldialog: false,
      analysis_data_generalUpdatedialog: false,
      analysis_data_scdialog: false,
      analysis_data_scUpdatedialog: false,
      analysis_data_Delete_dialog: false,
      analysis_data_Delete_gen_dialog: false,
      analysis_data_Delete_sc_dialog: false,
      addrate_work_college: {},
      addrate_work_college: [],
      addrate_work_g: {},
      addrate_work_g_data: {},
      editrate_work_g_data: {},
      rate_work_g_all: [],
      rate_work_course_stds: [],
      rate_work_gs: [],
      rate_work_course_stds_in: {},
      rate_work_course_stds: [],
      snackbar: {
        show: false,
        color: "",
        timeout: 5000,
        icon: "",
        text: ""
      },

      headers_sumall: [
        {
          text: "ปีการศึกษา",
          align: "center",
          value: "rate_work_college_year"
        },
        {
          text: "ชื่อวิทยาลัย",
          align: "center",
          value: "college_name"
        },
        {
          text: "ระดับ ปวช.1 / ปวส.1",
          align: "center",
          value: "std_level_1"
        },

        {
          text: "ระดับ ปวช.2 / ปวส.2",
          align: "center",
          value: "std_level_2"
        },
        {
          text: "ระดับ ปวช.3",
          align: "center",
          value: "std_level_3"
        },

        {
          text: "รวม",
          align: "center",
          value: "result_all"
        }
      ],

      //รวมนักเรียนแต่ละประเภทวิชา / ระดับชั้น แยก ปวช ปวส [คำนวณห้องเรียน อัตรากำลัง ขั้นตอนที่ 1]
      headers_type_class: [
        {
          text: "ปีการศึกษา",
          align: "center",
          value: "rate_work_college_year"
        },
        {
          text: "ชื่อวิทยาลัย",
          align: "center",
          value: "college_name"
        },
        { text: "รหัสหมวดวิชา", align: "center", value: "rate_work_course_id" },
        { text: "หมวดวิชา", align: "center", value: "name_type_course" },
        {
          text: "ระดับ",
          align: "center",
          value: "rate_work_college_id_class"
        },
        {
          text: "วิเคราะห์ข้อมูล/ห้องเรียน",
          align: "center",
          value: "analysis_s1"
        },
        {
          text: "สถานะ/อัตรากำลัง",
          align: "center",
          value: "analysis_action"
        },
        {
          text: "ระดับ ปวช.1 / ปวส.1",
          align: "center",
          value: "std_level_1"
        },

        {
          text: "ระดับ ปวช.2 / ปวส.2",
          align: "center",
          value: "std_level_2"
        },
        {
          text: "ระดับ ปวช.3",
          align: "center",
          value: "std_level_3"
        },
        {
          text: "รวม",
          align: "center",
          value: "result_all"
        },
        {
          text: "ดำเนินการ",
          align: "center",
          value: "action"
        }
      ],

      headers_all: [
        {
          text: "ปีการศึกษา",
          align: "center",
          value: "rate_work_college_year"
        },
        {
          text: "ชื่อวิทยาลัย",
          align: "center",
          value: "college_name"
        },
        { text: "รหัสหมวดวิชา", align: "center", value: "rate_work_course_id" },
        { text: "หมวดวิชา", align: "center", value: "name_type_course" },

        {
          text: "ระดับ ปวช.1 / ปวส.1",
          align: "center",
          value: "std_level_1"
        },
        {
          text: "ระดับ ปวช.2 / ปวส.2",
          align: "center",
          value: "std_level_2"
        },
        {
          text: "ระดับ ปวช.3",
          align: "center",
          value: "std_level_3"
        },

        {
          text: "รวม",
          align: "center",
          value: "result_all"
        }
      ],

      headers: [
        { text: "#", align: "center", value: "index" },
        {
          text: "ปีการศึกษา",
          align: "center",
          value: "rate_work_college_year"
        },
        {
          text: "รหัสวิทยาลัย",
          align: "center",
          value: "rate_work_college_code"
        },
        { text: "รหัสหมวดวิชา", align: "center", value: "rate_work_course_id" },
        { text: "หมวดวิชา", align: "center", value: "type_course" },
        {
          text: "หลักสูตร",
          align: "center",
          value: "year_course"
        },
        {
          text: "สาขาวิชา",
          align: "center",
          value: "branch_name_th"
        },
        { text: "วันที่ข้อมูล", align: "center", value: "update_time" },
        {
          text: "ปวช.1",
          align: "center",
          value: "rate_work_field_study_lavel_1"
        },
        {
          text: "ปวช.2",
          align: "center",
          value: "rate_work_field_study_lavel_2"
        },
        {
          text: "ปวช.3",
          align: "center",
          value: "rate_work_field_study_lavel_3"
        },
        {
          text: "รวม",
          align: "center",
          value: "result_all"
        }
      ],

      headers_30: [
        { text: "#", align: "center", value: "index" },
        {
          text: "ปีการศึกษา",
          align: "center",
          value: "rate_work_college_year"
        },
        {
          text: "รหัสวิทยาลัย",
          align: "center",
          value: "rate_work_college_code"
        },
        { text: "รหัสหมวดวิชา", align: "center", value: "rate_work_course_id" },
        { text: "หมวดวิชา", align: "center", value: "type_course" },
        {
          text: "หลักสูตร",
          align: "center",
          value: "year_course"
        },
        {
          text: "สาขาวิชา",
          align: "center",
          value: "branch_name_th"
        },
        { text: "วันที่ข้อมูล", align: "center", value: "update_time" },
        {
          text: "ปวส.1",
          align: "center",
          value: "rate_work_field_study_lavel_1"
        },
        {
          text: "ปวส.2",
          align: "center",
          value: "rate_work_field_study_lavel_2"
        },
        {
          text: "รวม",
          align: "center",
          value: "result_all"
        }
      ],

      headers_gen_delete: [
        {
          text: "ปีการศึกษา",
          align: "center",
          value: "rate_work_ccr_year"
        },
        {
          text: "รหัสวิทยาลัย",
          align: "center",
          value: "rate_work_ccr_code"
        },
        {
          text: "รหัสหมวดวิชา",
          align: "center",
          value: "rate_work_ccr_course_id"
        },
        { text: "ระดับชั้น", align: "center", value: "rate_work_ccr_id_class" },

        {
          text: "จำนวน",
          align: "center",
          value: "rate_work_ccr_all_sum"
        },
        {
          text: "ห้องเรียน",
          align: "center",
          value: "rate_work_ccr_all_cal"
        },
        {
          text: "อัตรากำลัฃ",
          align: "center",
          value: "rate_work_ccr_man_power"
        }
      ],
      year_select: [2565, 2566, 2567, 2568, 2569, 2570],

      rowsperpage: [
        25,
        50,
        100,
        {
          text: "All",
          value: -1
        }
      ],
      rate_work_course_stds_autocompl: [],
      course_select_main: "",
      rate_work_colleges_update_stu: {},
      rate_work_college_sum_20: [],
      rate_work_college_sum_30: [],
      rate_work_colleges_all: [],
      rate_work_colleges_group_course: [],
      rate_work_colleges_group_course_type: [],
      rate_work_colleges_sumall: [],
      analysis_data_s: [],
      analysis_data_s_result_01: [],
      analysis_data_s_result_02: [],
      analysis_data_s_result_03: [],
      analysis_data_s_result_04: [],
      analysis_data_s_result_05: [],
      analysis_data_s_result_sum_room: [],
      analysis_data_s_result_sum_room_20: [],
      analysis_data_s_result_sum_room_30: [],
      analysis_data_man_power_cal: [],
      analysis_data_man_power_cal_20: [],
      analysis_data_man_power_cal_30: [],
      analysis_data_ins: {},
      analysis_data_ins_20: {},
      analysis_data_ins_30: {},
      rate_work_colleges_sumall_gen: [],
      rate_work_sc_show: [],
      cal_man_power_sc: [],
      cal_rooms_sc: [],
      analysis_data_ins_sc: {},
      analysis_data_edit: [],
      analysis_data_edit_gen: [],
      analysis_data_edit_gen_del: {},
      analysis_data_edit_sc:[],
    };
  },

  async mounted() {
    let result;
    let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
    result = await this.$http.post("user.php", {
      ApiKey: this.ApiKey,
      user_ID: userSession.user_ID
    });
    this.user = result.data;

    await this.rate_work_course_stdQueryAll();
    await this.rate_work_course_std_courseQAll();
    await this.rate_work_collegeQuery_sumall();
    await this.rate_work_collegeQuery_group_course_type();
    await this.rate_work_collegeQuery_group_course();
    await this.rate_work_collegeQuery_20_sum();
    await this.rate_work_collegeQuery_30_sum();
    await this.rate_work_collegeQuery_20();
    await this.rate_work_collegeQuery_30();
    await this.rate_work_collegeQuery_sumall_gen();
    await this.rate_work_sc_Query();
  },

  methods: {
    class_level(num) {
      var array = {
        "20": "ปวช.",
        "30": "ปวส."
      };
      var str = num.toString();
      for (var val in array) {
        str = str.split(val).join(array[val]);
      }
      return str;
    },
    async field_study_lavel_update(rate_work_college_id) {
      let result = await this.$http.post("rate_work_college.php", {
        ApiKey: this.ApiKey,
        rate_work_college_id: rate_work_college_id
      });
      this.rate_work_colleges_update_stu = result.data;
      this.rate_work_collegeUpdatedialog = true;
    },

    async field_study_lavel_update_30(rate_work_college_id) {
      let result = await this.$http.post("rate_work_college.php", {
        ApiKey: this.ApiKey,
        rate_work_college_id: rate_work_college_id
      });
      this.rate_work_colleges_update_stu = result.data;
      this.rate_work_collegeUpdatedialog_30 = true;
    },

    async rate_work_collegeUpdatedialogsubmit() {
      if (this.$refs.rate_work_collegeUpdatedialogform.validate()) {
        this.rate_work_colleges_update_stu.ApiKey = this.ApiKey;
        /* console.log(this.rate_work_colleges_update_stu) */

        let result = await this.$http.post(
          "rate_work_college.update.php",
          this.rate_work_colleges_update_stu
        );
        if (result.data.status == true) {
          this.snackbar.icon = "mdi-font-awesome";
          this.snackbar.color = "success";
          this.snackbar.text = "แก้ไขข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.rate_work_collegeQuery_20();
          this.rate_work_collegeQuery_30();
          this.rate_work_collegeQuery_20_sum();
          this.rate_work_collegeQuery_30_sum();
          this.rate_work_collegeQuery_all();
        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text = "แก้ไขข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.rate_work_collegeUpdatedialog = false;
        this.rate_work_collegeUpdatedialog_30 = false;
      }
    },

    async course_select() {
      let result = await this.$http.post("rate_work_course_std.php", {
        ApiKey: this.ApiKey,
        id_type_course: this.course_select_main
      });
      this.rate_work_course_stds = result.data;
    },

    async rate_work_course_std_courseQAll() {
      let result = await this.$http.post("rate_work_course_std.php", {
        ApiKey: this.ApiKey,
        show_course_all: "Ok"
      });
      this.rate_work_course_stds_autocompl = result.data;
    },

    async rate_work_course_std_select(id_course_branch) {
      let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
      this.addrate_work_college.ApiKey = this.ApiKey;
      this.addrate_work_college.rate_work_college_code = userSession.user_name;

      let result = await this.$http.post("rate_work_course_std.php", {
        ApiKey: this.ApiKey,
        id_course_branch: id_course_branch
      });
      this.rate_work_course_stds_in = result.data;
      /*  console.log(result.data); */

      this.addrate_work_college.rate_id_course_branch = id_course_branch;
      this.addrate_work_college.rate_work_course_id = this.rate_work_course_stds_in.id_type_course;
      this.addrate_work_college.rate_work_college_class = this.rate_work_course_stds_in.year_course;
      this.addrate_work_college.rate_work_college_id_class = this.rate_work_course_stds_in.rate_work_level_class;

      this.addrate_work_college.update_time = this.date_today;
      this.addrate_work_college.rate_work_college_year = this.year_now;

      /*  console.log(this.addrate_work_college); */

      let result_insert = await this.$http.post(
        "rate_work_college.insert.php",
        this.addrate_work_college
      );

      if (result_insert.data.status == true) {
        this.snackbar.icon = "mdi-font-awesome";
        this.snackbar.color = "success";
        this.snackbar.text = "บันทึกข้อมูลเรียบร้อย";
        this.snackbar.show = true;
        this.rate_work_collegeQuery_20();
        this.rate_work_collegeQuery_all();
        this.course_select();
      } else {
        this.snackbar.icon = "mdi-close-network";
        this.snackbar.color = "red";
        this.snackbar.text = "บันทึกข้อมูลผิดพลาด สาขาวิชาซ้ำ";
        this.snackbar.show = true;
      }
    },

    async rate_work_course_stdQueryAll() {
      let result = await this.$http.post("rate_work_course_std.php", {
        ApiKey: this.ApiKey
      });
      this.rate_work_course_stds = result.data;
    },

    /* Sum All */
    async rate_work_collegeQuery_sumall() {
      this.loading = true;
      let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
      let result = await this.$http
        .post("rate_work_college.php", {
          ApiKey: this.ApiKey,
          rate_work_college_code: userSession.user_name,
          rate_work_college_year: this.years_select,
          sum_all: "OK"
        })
        .finally(() => (this.loading = false));
      this.rate_work_colleges_sumall = result.data;
    },

    /* Sum All  sum_all_general*/
    async rate_work_collegeQuery_sumall_gen() {
      this.loading = true;
      let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
      let result = await this.$http
        .post("rate_work_college.php", {
          ApiKey: this.ApiKey,
          rate_work_college_code: userSession.user_name,
          rate_work_college_year: this.years_select,
          sum_all_general: "OK"
        })
        .finally(() => (this.loading = false));
      this.rate_work_colleges_sumall_gen = result.data;
      /* console.log(result.data); */
    },

    /* Sum type course */
    async rate_work_collegeQuery_group_course_type() {
      this.loading = true;
      let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
      let result = await this.$http
        .post("rate_work_college.php", {
          ApiKey: this.ApiKey,
          rate_work_college_code: userSession.user_name,
          rate_work_college_year: this.years_select,
          type_course_qu: "OK"
        })
        .finally(() => (this.loading = false));
      this.rate_work_colleges_group_course_type = result.data;
    },

    /* Sum type course and class level */
    async rate_work_collegeQuery_group_course() {
      this.loading = true;
      let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
      let result = await this.$http
        .post("rate_work_college.php", {
          ApiKey: this.ApiKey,
          rate_work_college_code: userSession.user_name,
          rate_work_college_year: this.years_select
        })
        .finally(() => (this.loading = false));
      this.rate_work_colleges_group_course = result.data;
    },

    async rate_work_collegeQuery_all() {
      this.loading = true;
      let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
      let result = await this.$http
        .post("rate_work_college.php", {
          ApiKey: this.ApiKey,
          rate_work_college_code: userSession.user_name,
          rate_work_college_id_class_all: "Ok",
          rate_work_college_year: this.years_select
        })
        .finally(() => (this.loading = false));
      this.rate_work_colleges_all = result.data;
    },

    async rate_work_collegeQuery_20() {
      this.loading = true;
      let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
      let result = await this.$http
        .post("rate_work_college.php", {
          ApiKey: this.ApiKey,
          rate_work_college_code: userSession.user_name,
          rate_work_college_id_class: "20",
          rate_work_college_year: this.years_select
        })
        .finally(() => (this.loading = false));
      this.rate_work_colleges = result.data;
    },

    async rate_work_collegeQuery_20_sum() {
      this.loading = true;
      let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
      let result = await this.$http
        .post("rate_work_college.php", {
          ApiKey: this.ApiKey,
          rate_work_college_code: userSession.user_name,
          rate_work_college_id_class_20: "Sum",
          rate_work_college_year: this.years_select
        })
        .finally(() => (this.loading = false));
      this.rate_work_college_sum_20 = result.data;
    },
    async rate_work_collegeQuery_30_sum() {
      this.loading = true;
      let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
      let result = await this.$http
        .post("rate_work_college.php", {
          ApiKey: this.ApiKey,
          rate_work_college_code: userSession.user_name,
          rate_work_college_id_class_30: "Sum",
          rate_work_college_year: this.years_select
        })
        .finally(() => (this.loading = false));
      this.rate_work_college_sum_30 = result.data;
    },

    async rate_work_collegeQuery_30() {
      this.loading = true;
      let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
      let result = await this.$http
        .post("rate_work_college.php", {
          ApiKey: this.ApiKey,
          rate_work_college_code: userSession.user_name,
          rate_work_college_id_class: "30",
          rate_work_college_year: this.years_select
        })
        .finally(() => (this.loading = false));
      this.rate_work_colleges_30 = result.data;
    },

    async rate_work_sc_Query() {
      this.loading = true;
      let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
      let result = await this.$http
        .post("rate_work_sc.php", {
          ApiKey: this.ApiKey,
          rate_sc_college_code: userSession.user_name,
          rate_sc_year: this.years_select,
          cal_man_power: "ok"
        })
        .finally(() => (this.loading = false));
      this.rate_work_sc_show = result.data;
    },

    //analysis_data_update
    async analysis_data_update(
      rate_work_college_year,
      rate_work_college_code,
      rate_work_course_id,
      rate_work_college_id_class
    ) {
      let result = await this.$http.post("rate_work_college.php", {
        ApiKey: this.ApiKey,
        rate_work_college_year: rate_work_college_year,
        rate_work_college_code: rate_work_college_code,
        rate_work_course_id: rate_work_course_id,
        rate_work_college_id_class: rate_work_college_id_class
      });
      this.analysis_data_s = result.data;
      this.rate_work_cal_level();
      this.analysis_data_Updatedialog = true;
    },

    //analysis_data
    async analysis_data(
      rate_work_college_year,
      rate_work_college_code,
      rate_work_course_id,
      rate_work_college_id_class
    ) {
      let result = await this.$http.post("rate_work_college.php", {
        ApiKey: this.ApiKey,
        rate_work_college_year: rate_work_college_year,
        rate_work_college_code: rate_work_college_code,
        rate_work_course_id: rate_work_course_id,
        rate_work_college_id_class: rate_work_college_id_class
      });
      this.analysis_data_s = result.data;
      this.rate_work_cal_level();
      this.analysis_data_dialog = true;
    },

    async analysis_data_general() {
      this.rate_work_cal_general();
      this.analysis_data_generaldialog = true;
    },

    async analysis_data_general_update() {
      this.rate_work_cal_general();
      this.analysis_data_generalUpdatedialog = true;
    },

    async analysis_data_sc() {
      this.cal_analysis_data_sc();
      this.analysis_data_scdialog = true;
    },

    async analysis_data_sc_update() {
      this.cal_analysis_data_sc();
      this.analysis_data_scUpdatedialog = true;
    },

    // Insert analysis sc
    async analysis_data_scdialogSubmit() {
      this.analysis_data_ins_sc.ApiKey = this.ApiKey;
      this.analysis_data_ins_sc.rate_work_ccr_year = this.rate_work_sc_show.rate_sc_year;
      this.analysis_data_ins_sc.rate_work_ccr_code = this.rate_work_sc_show.rate_sc_college_code;
      this.analysis_data_ins_sc.rate_work_ccr_course_id = "66";
      this.analysis_data_ins_sc.rate_work_ccr_id_class = "66";
      this.analysis_data_ins_sc.rate_work_ccr_l1_sum = "0";
      this.analysis_data_ins_sc.rate_work_ccr_l1_cal = "0";
      this.analysis_data_ins_sc.rate_work_ccr_l2_sum = "0";
      this.analysis_data_ins_sc.rate_work_ccr_l2_cal = "0";
      this.analysis_data_ins_sc.rate_work_ccr_l3_sum = "0";
      this.analysis_data_ins_sc.rate_work_ccr_l3_cal = "0";
      this.analysis_data_ins_sc.rate_work_ccr_all_sum = this.rate_work_sc_show.sc_hours_sum_all;
      this.analysis_data_ins_sc.rate_work_ccr_all_cal = this.cal_rooms_sc;
      this.analysis_data_ins_sc.rate_work_ccr_man_power = this.cal_man_power_sc;

      /*   console.log(this.analysis_data_ins_sc); */

      let result = await this.$http.post(
        "rate_work_college_cal_room.insert.php",
        this.analysis_data_ins_sc
      );

      /*  console.log(result.data); */
      if (result.data.status == true) {
        this.snackbar.icon = "mdi-content-save";
        this.snackbar.color = "success";
        this.snackbar.text = "บันทึกข้อมูลเรียบร้อย";
        this.snackbar.show = true;
        this.rate_work_sc_Query();
      } else {
        this.snackbar.icon = "mdi-alert";
        this.snackbar.color = "red";
        this.snackbar.text = "บันทึกข้อมูลผิดพลาด";
        this.snackbar.show = true;
      }
      this.analysis_data_scdialog = false;
    },
    //Update analysis sc
    async analysis_data_scUpdatedialogSubmit() {
      this.analysis_data_ins_sc.ApiKey = this.ApiKey;
      this.analysis_data_ins_sc.rate_work_ccr_year = this.rate_work_sc_show.rate_sc_year;
      this.analysis_data_ins_sc.rate_work_ccr_code = this.rate_work_sc_show.rate_sc_college_code;
      this.analysis_data_ins_sc.rate_work_ccr_course_id = "66";
      this.analysis_data_ins_sc.rate_work_ccr_id_class = "66";
      this.analysis_data_ins_sc.rate_work_ccr_l1_sum = "0";
      this.analysis_data_ins_sc.rate_work_ccr_l1_cal = "0";
      this.analysis_data_ins_sc.rate_work_ccr_l2_sum = "0";
      this.analysis_data_ins_sc.rate_work_ccr_l2_cal = "0";
      this.analysis_data_ins_sc.rate_work_ccr_l3_sum = "0";
      this.analysis_data_ins_sc.rate_work_ccr_l3_cal = "0";
      this.analysis_data_ins_sc.rate_work_ccr_all_sum = this.rate_work_sc_show.sc_hours_sum_all;
      this.analysis_data_ins_sc.rate_work_ccr_all_cal = this.cal_rooms_sc;
      this.analysis_data_ins_sc.rate_work_ccr_man_power = this.cal_man_power_sc;

      /*  console.log(this.analysis_data_ins_sc); */

      let result = await this.$http.post(
        "rate_work_college_cal_room.update.php",
        this.analysis_data_ins_sc
      );

      /*  console.log(result.data); */
      if (result.data.status == true) {
        this.snackbar.icon = "mdi-content-save";
        this.snackbar.color = "success";
        this.snackbar.text = "บันทึกข้อมูลเรียบร้อย";
        this.snackbar.show = true;
        this.rate_work_sc_Query();
      } else {
        this.snackbar.icon = "mdi-alert";
        this.snackbar.color = "warning";
        this.snackbar.text = "บันทึกข้อมูลเรียบร้อย";
        this.snackbar.show = true;
      }
      this.analysis_data_scUpdatedialog = false;
    },

    //Cancel rate_work_college_cal_roomDelete

    async rate_work_college_cal_roomDelete(
      rate_work_college_year,
      rate_work_college_code,
      rate_work_course_id,
      rate_work_college_id_class
    ) {
      let result = await this.$http.post("rate_work_college_cal_room.php", {
        ApiKey: this.ApiKey,
        rate_work_ccr_year: rate_work_college_year,
        rate_work_ccr_code: rate_work_college_code,
        rate_work_ccr_course_id: rate_work_course_id,
        rate_work_ccr_id_class: rate_work_college_id_class
      });
      this.analysis_data_edit = result.data;
      this.analysis_data_Delete_dialog = true;
    },

    /* rate_work_college_cal_room_gen_Delete */

    async rate_work_college_cal_room_gen_Delete() {
      let result = await this.$http.post("rate_work_college_cal_room.php", {
        ApiKey: this.ApiKey,
        rate_work_ccr_year: this.rate_work_colleges_sumall_gen
          .rate_work_college_year,
        rate_work_ccr_code: this.rate_work_colleges_sumall_gen
          .rate_work_college_code,
        rate_work_ccr_course_id: "00"
      });
      this.analysis_data_edit_gen = result.data;
      this.analysis_data_Delete_gen_dialog = true;
     
    },

  async rate_work_college_cal_room_sc_Delete() {
      let result = await this.$http.post("rate_work_college_cal_room.php", {
        ApiKey: this.ApiKey,
        rate_work_ccr_year: this.rate_work_sc_show
          .rate_sc_year,
        rate_work_ccr_code: this.rate_work_sc_show
          .rate_sc_college_code,
        rate_work_ccr_course_id: "66"
      });
      this.analysis_data_edit_sc = result.data;
      this.analysis_data_Delete_sc_dialog = true;
      /* console.log(result.data) */
    },



    //Insert analysis normal
    async analysis_data_dialogSubmit() {
      this.analysis_data_ins.ApiKey = this.ApiKey;
      this.analysis_data_ins.rate_work_ccr_year = this.analysis_data_s.rate_work_college_year;
      this.analysis_data_ins.rate_work_ccr_code = this.analysis_data_s.rate_work_college_code;
      this.analysis_data_ins.rate_work_ccr_course_id = this.analysis_data_s.rate_work_course_id;
      this.analysis_data_ins.rate_work_ccr_id_class = this.analysis_data_s.rate_work_college_id_class;
      if (this.analysis_data_s.rate_work_college_id_class == "20") {
        this.analysis_data_ins.rate_work_ccr_l1_sum =
          this.analysis_data_s.std_level_1 || 0;
        this.analysis_data_ins.rate_work_ccr_l1_cal =
          this.analysis_data_s_result_01 || 0;
        this.analysis_data_ins.rate_work_ccr_l2_sum =
          this.analysis_data_s.std_level_2 || 0;
        this.analysis_data_ins.rate_work_ccr_l2_cal =
          this.analysis_data_s_result_02 || 0;
        this.analysis_data_ins.rate_work_ccr_l3_sum =
          this.analysis_data_s.std_level_3 || 0;
        this.analysis_data_ins.rate_work_ccr_l3_cal =
          this.analysis_data_s_result_03 || 0;
        this.analysis_data_ins.rate_work_ccr_all_sum =
          parseInt(this.analysis_data_s.std_level_1 || 0) +
          parseInt(this.analysis_data_s.std_level_2 || 0) +
          parseInt(this.analysis_data_s.std_level_3 || 0);
      } else if (this.analysis_data_s.rate_work_college_id_class == "30") {
        this.analysis_data_ins.rate_work_ccr_l1_sum =
          this.analysis_data_s.std_level_1 || 0;
        this.analysis_data_ins.rate_work_ccr_l1_cal =
          this.analysis_data_s_result_01 || 0;
        this.analysis_data_ins.rate_work_ccr_l2_sum =
          this.analysis_data_s.std_level_2 || 0;
        this.analysis_data_ins.rate_work_ccr_l2_cal =
          this.analysis_data_s_result_02 || 0;
        this.analysis_data_ins.rate_work_ccr_l3_sum = 0;
        this.analysis_data_ins.rate_work_ccr_l3_cal = 0;
        this.analysis_data_ins.rate_work_ccr_all_sum =
          parseInt(this.analysis_data_s.std_level_1 || 0) +
          parseInt(this.analysis_data_s.std_level_2 || 0);
      }
      this.analysis_data_ins.rate_work_ccr_all_cal = parseInt(
        this.analysis_data_s_result_sum_room
      );
      this.analysis_data_ins.rate_work_ccr_man_power = this.analysis_data_man_power_cal.toFixed(
        2
      );
      /*  console.log(this.analysis_data_ins); */

      let result = await this.$http.post(
        "rate_work_college_cal_room.insert.php",
        this.analysis_data_ins
      );

      /*   console.log(result.data); */
      if (result.data.status == true) {
        this.snackbar.icon = "mdi-content-save";
        this.snackbar.color = "success";
        this.snackbar.text = "แก้ไขข้อมูลเรียบร้อย";
        this.snackbar.show = true;
        this.rate_work_collegeQuery_group_course();
      } else {
        this.snackbar.icon = "mdi-alert";
        this.snackbar.color = "red";
        this.snackbar.text = "แก้ไขข้อมูลผิดพลาด";
        this.snackbar.show = true;
      }
      this.analysis_data_dialog = false;
    },

    //บันทึกข้อมูล คำนวณ หมวดวิชาทั่วไป ขั้นตอนที่ 1
    async analysis_data_dialogSubmit() {
      this.analysis_data_ins.ApiKey = this.ApiKey;
      this.analysis_data_ins.rate_work_ccr_year = this.analysis_data_s.rate_work_college_year;
      this.analysis_data_ins.rate_work_ccr_code = this.analysis_data_s.rate_work_college_code;
      this.analysis_data_ins.rate_work_ccr_course_id = this.analysis_data_s.rate_work_course_id;
      this.analysis_data_ins.rate_work_ccr_id_class = this.analysis_data_s.rate_work_college_id_class;
      if (this.analysis_data_s.rate_work_college_id_class == "20") {
        this.analysis_data_ins.rate_work_ccr_l1_sum =
          this.analysis_data_s.std_level_1 || 0;
        this.analysis_data_ins.rate_work_ccr_l1_cal =
          this.analysis_data_s_result_01 || 0;
        this.analysis_data_ins.rate_work_ccr_l2_sum =
          this.analysis_data_s.std_level_2 || 0;
        this.analysis_data_ins.rate_work_ccr_l2_cal =
          this.analysis_data_s_result_02 || 0;
        this.analysis_data_ins.rate_work_ccr_l3_sum =
          this.analysis_data_s.std_level_3 || 0;
        this.analysis_data_ins.rate_work_ccr_l3_cal =
          this.analysis_data_s_result_03 || 0;
        this.analysis_data_ins.rate_work_ccr_all_sum =
          parseInt(this.analysis_data_s.std_level_1 || 0) +
          parseInt(this.analysis_data_s.std_level_2 || 0) +
          parseInt(this.analysis_data_s.std_level_3 || 0);
      } else if (this.analysis_data_s.rate_work_college_id_class == "30") {
        this.analysis_data_ins.rate_work_ccr_l1_sum =
          this.analysis_data_s.std_level_1 || 0;
        this.analysis_data_ins.rate_work_ccr_l1_cal =
          this.analysis_data_s_result_01 || 0;
        this.analysis_data_ins.rate_work_ccr_l2_sum =
          this.analysis_data_s.std_level_2 || 0;
        this.analysis_data_ins.rate_work_ccr_l2_cal =
          this.analysis_data_s_result_02 || 0;
        this.analysis_data_ins.rate_work_ccr_l3_sum = 0;
        this.analysis_data_ins.rate_work_ccr_l3_cal = 0;
        this.analysis_data_ins.rate_work_ccr_all_sum =
          parseInt(this.analysis_data_s.std_level_1 || 0) +
          parseInt(this.analysis_data_s.std_level_2 || 0);
      }
      this.analysis_data_ins.rate_work_ccr_all_cal = parseInt(
        this.analysis_data_s_result_sum_room
      );
      this.analysis_data_ins.rate_work_ccr_man_power = this.analysis_data_man_power_cal.toFixed(
        2
      );
      /*   console.log(this.analysis_data_ins); */

      let result = await this.$http.post(
        "rate_work_college_cal_room.insert.php",
        this.analysis_data_ins
      );

      /*  console.log(result.data); */
      if (result.data.status == true) {
        this.snackbar.icon = "mdi-content-save";
        this.snackbar.color = "success";
        this.snackbar.text = "บันทึกข้อมูลเรียบร้อย";
        this.snackbar.show = true;
        this.rate_work_collegeQuery_group_course();
      } else {
        this.snackbar.icon = "mdi-alert";
        this.snackbar.color = "red";
        this.snackbar.text = "ข้อมูลผิดพลาด";
        this.snackbar.show = true;
      }
      this.analysis_data_dialog = false;
    },
    //ปรับปรุงข้อมูลการคำนวณ หมวดวิชาทั่วไป ขั้นตอนที่ 1
    async analysis_data_UpdatedialogSubmit() {
      this.analysis_data_ins.ApiKey = this.ApiKey;
      this.analysis_data_ins.rate_work_ccr_year = this.analysis_data_s.rate_work_college_year;
      this.analysis_data_ins.rate_work_ccr_code = this.analysis_data_s.rate_work_college_code;
      this.analysis_data_ins.rate_work_ccr_course_id = this.analysis_data_s.rate_work_course_id;
      this.analysis_data_ins.rate_work_ccr_id_class = this.analysis_data_s.rate_work_college_id_class;
      if (this.analysis_data_s.rate_work_college_id_class == "20") {
        this.analysis_data_ins.rate_work_ccr_l1_sum =
          this.analysis_data_s.std_level_1 || 0;
        this.analysis_data_ins.rate_work_ccr_l1_cal =
          this.analysis_data_s_result_01 || 0;
        this.analysis_data_ins.rate_work_ccr_l2_sum =
          this.analysis_data_s.std_level_2 || 0;
        this.analysis_data_ins.rate_work_ccr_l2_cal =
          this.analysis_data_s_result_02 || 0;
        this.analysis_data_ins.rate_work_ccr_l3_sum =
          this.analysis_data_s.std_level_3 || 0;
        this.analysis_data_ins.rate_work_ccr_l3_cal =
          this.analysis_data_s_result_03 || 0;
        this.analysis_data_ins.rate_work_ccr_all_sum =
          parseInt(this.analysis_data_s.std_level_1 || 0) +
          parseInt(this.analysis_data_s.std_level_2 || 0) +
          parseInt(this.analysis_data_s.std_level_3 || 0);
      } else if (this.analysis_data_s.rate_work_college_id_class == "30") {
        this.analysis_data_ins.rate_work_ccr_l1_sum =
          this.analysis_data_s.std_level_1 || 0;
        this.analysis_data_ins.rate_work_ccr_l1_cal =
          this.analysis_data_s_result_01 || 0;
        this.analysis_data_ins.rate_work_ccr_l2_sum =
          this.analysis_data_s.std_level_2 || 0;
        this.analysis_data_ins.rate_work_ccr_l2_cal =
          this.analysis_data_s_result_02 || 0;
        this.analysis_data_ins.rate_work_ccr_l3_sum = 0;
        this.analysis_data_ins.rate_work_ccr_l3_cal = 0;
        this.analysis_data_ins.rate_work_ccr_all_sum =
          parseInt(this.analysis_data_s.std_level_1 || 0) +
          parseInt(this.analysis_data_s.std_level_2 || 0);
      }
      this.analysis_data_ins.rate_work_ccr_all_cal = parseInt(
        this.analysis_data_s_result_sum_room
      );
      this.analysis_data_ins.rate_work_ccr_man_power = this.analysis_data_man_power_cal.toFixed(
        2
      );
      /*   console.log(this.analysis_data_ins); */

      let result = await this.$http.post(
        "rate_work_college_cal_room.update.php",
        this.analysis_data_ins
      );

      /* console.log(result.data); */
      if (result.data.status == true) {
        this.snackbar.icon = "mdi-content-save";
        this.snackbar.color = "success";
        this.snackbar.text = "บันทึกข้อมูลเรียบร้อย";
        this.snackbar.show = true;
        this.rate_work_collegeQuery_group_course();
      } else {
        this.snackbar.icon = "mdi-alert";
        this.snackbar.color = "warning";
        this.snackbar.text = "บันทึกข้อมูลเรียบร้อย";
        this.snackbar.show = true;
      }
      this.analysis_data_Updatedialog = false;
    },
    //บันทึกข้อมูล คำนวณ หมวดวิชาสามัญ ขั้นตอนที่ 2
    async analysis_data_generaldialogSubmit() {
      this.analysis_data_ins_20.ApiKey = this.ApiKey;
      this.analysis_data_ins_20.rate_work_ccr_year = this.rate_work_colleges_sumall_gen.rate_work_college_year;
      this.analysis_data_ins_20.rate_work_ccr_code = this.rate_work_colleges_sumall_gen.rate_work_college_code;
      this.analysis_data_ins_20.rate_work_ccr_course_id = "00";
      this.analysis_data_ins_20.rate_work_ccr_id_class = "20";
      this.analysis_data_ins_20.rate_work_ccr_l1_sum = this.rate_work_colleges_sumall_gen.sum_branch_20_1;
      this.analysis_data_ins_20.rate_work_ccr_l1_cal = this.analysis_data_s_result_01;
      this.analysis_data_ins_20.rate_work_ccr_l2_sum = this.rate_work_colleges_sumall_gen.sum_branch_20_2;
      this.analysis_data_ins_20.rate_work_ccr_l2_cal = this.analysis_data_s_result_02;
      this.analysis_data_ins_20.rate_work_ccr_l3_sum = this.rate_work_colleges_sumall_gen.sum_branch_20_3;
      this.analysis_data_ins_20.rate_work_ccr_l3_cal = this.analysis_data_s_result_03;
      this.analysis_data_ins_20.rate_work_ccr_all_sum = this.rate_work_colleges_sumall_gen.sum_all_20;
      this.analysis_data_ins_20.rate_work_ccr_all_cal = this.analysis_data_s_result_sum_room_20;
      this.analysis_data_ins_20.rate_work_ccr_man_power = this.analysis_data_man_power_cal_20;

      /*     console.log(this.analysis_data_ins_20); */

      this.analysis_data_ins_30.ApiKey = this.ApiKey;
      this.analysis_data_ins_30.rate_work_ccr_year = this.rate_work_colleges_sumall_gen.rate_work_college_year;
      this.analysis_data_ins_30.rate_work_ccr_code = this.rate_work_colleges_sumall_gen.rate_work_college_code;
      this.analysis_data_ins_30.rate_work_ccr_course_id = "00";
      this.analysis_data_ins_30.rate_work_ccr_id_class = "30";
      this.analysis_data_ins_30.rate_work_ccr_l1_sum = this.rate_work_colleges_sumall_gen.sum_branch_30_1;
      this.analysis_data_ins_30.rate_work_ccr_l1_cal = this.analysis_data_s_result_04;
      this.analysis_data_ins_30.rate_work_ccr_l2_sum = this.rate_work_colleges_sumall_gen.sum_branch_30_2;
      this.analysis_data_ins_30.rate_work_ccr_l2_cal = this.analysis_data_s_result_05;
      this.analysis_data_ins_30.rate_work_ccr_l3_sum = "0";
      this.analysis_data_ins_30.rate_work_ccr_l3_cal = "0";
      this.analysis_data_ins_30.rate_work_ccr_all_sum = this.rate_work_colleges_sumall_gen.sum_all_30;
      this.analysis_data_ins_30.rate_work_ccr_all_cal = this.analysis_data_s_result_sum_room_30;
      this.analysis_data_ins_30.rate_work_ccr_man_power = this.analysis_data_man_power_cal_30;

      /*  console.log(this.analysis_data_ins_30); */

      let result_20 = await this.$http.post(
        "rate_work_college_cal_room.insert.php",
        this.analysis_data_ins_20
      );
      let result_30 = await this.$http.post(
        "rate_work_college_cal_room.insert.php",
        this.analysis_data_ins_30
      );

      if (result_20.data.status == true && result_30.data.status == true) {
        this.snackbar.icon = "mdi-content-save";
        this.snackbar.color = "success";
        this.snackbar.text = "บันทึกข้อมูลเรียบร้อย";
        this.snackbar.show = true;
        this.rate_work_collegeQuery_sumall_gen();
      } else {
        this.snackbar.icon = "mdi-alert";
        this.snackbar.color = "red";
        this.snackbar.text = "ข้อมูลผิดพลาด";
        this.snackbar.show = true;
      }
      this.analysis_data_generaldialog = false;
    },

    //ปรับปรุงข้อมูล คำนวณ หมวดวิชาสามัญ ขั้นตอนที่ 2
    async analysis_data_generalUpdatedialogSubmit() {
      this.analysis_data_ins_20.ApiKey = this.ApiKey;
      this.analysis_data_ins_20.rate_work_ccr_year = this.rate_work_colleges_sumall_gen.rate_work_college_year;
      this.analysis_data_ins_20.rate_work_ccr_code = this.rate_work_colleges_sumall_gen.rate_work_college_code;
      this.analysis_data_ins_20.rate_work_ccr_course_id = "00";
      this.analysis_data_ins_20.rate_work_ccr_id_class = "20";
      this.analysis_data_ins_20.rate_work_ccr_l1_sum = this.rate_work_colleges_sumall_gen.sum_branch_20_1;
      this.analysis_data_ins_20.rate_work_ccr_l1_cal = this.analysis_data_s_result_01;
      this.analysis_data_ins_20.rate_work_ccr_l2_sum = this.rate_work_colleges_sumall_gen.sum_branch_20_2;
      this.analysis_data_ins_20.rate_work_ccr_l2_cal = this.analysis_data_s_result_02;
      this.analysis_data_ins_20.rate_work_ccr_l3_sum = this.rate_work_colleges_sumall_gen.sum_branch_20_3;
      this.analysis_data_ins_20.rate_work_ccr_l3_cal = this.analysis_data_s_result_03;
      this.analysis_data_ins_20.rate_work_ccr_all_sum = this.rate_work_colleges_sumall_gen.sum_all_20;
      this.analysis_data_ins_20.rate_work_ccr_all_cal = this.analysis_data_s_result_sum_room_20;
      this.analysis_data_ins_20.rate_work_ccr_man_power = this.analysis_data_man_power_cal_20;

      this.analysis_data_ins_30.ApiKey = this.ApiKey;
      this.analysis_data_ins_30.rate_work_ccr_year = this.rate_work_colleges_sumall_gen.rate_work_college_year;
      this.analysis_data_ins_30.rate_work_ccr_code = this.rate_work_colleges_sumall_gen.rate_work_college_code;
      this.analysis_data_ins_30.rate_work_ccr_course_id = "00";
      this.analysis_data_ins_30.rate_work_ccr_id_class = "30";
      this.analysis_data_ins_30.rate_work_ccr_l1_sum = this.rate_work_colleges_sumall_gen.sum_branch_30_1;
      this.analysis_data_ins_30.rate_work_ccr_l1_cal = this.analysis_data_s_result_04;
      this.analysis_data_ins_30.rate_work_ccr_l2_sum = this.rate_work_colleges_sumall_gen.sum_branch_30_2;
      this.analysis_data_ins_30.rate_work_ccr_l2_cal = this.analysis_data_s_result_05;
      this.analysis_data_ins_30.rate_work_ccr_l3_sum = "0";
      this.analysis_data_ins_30.rate_work_ccr_l3_cal = "0";
      this.analysis_data_ins_30.rate_work_ccr_all_sum = this.rate_work_colleges_sumall_gen.sum_all_30;
      this.analysis_data_ins_30.rate_work_ccr_all_cal = this.analysis_data_s_result_sum_room_30;
      this.analysis_data_ins_30.rate_work_ccr_man_power = this.analysis_data_man_power_cal_30;

      let result_20 = await this.$http.post(
        "rate_work_college_cal_room.update.php",
        this.analysis_data_ins_20
      );
      let result_30 = await this.$http.post(
        "rate_work_college_cal_room.update.php",
        this.analysis_data_ins_30
      );

      if (result_20.data.status == true && result_30.data.status == true) {
        this.snackbar.icon = "mdi-content-save";
        this.snackbar.color = "success";
        this.snackbar.text = "บันทึกข้อมูลเรียบร้อย";
        this.snackbar.show = true;
        this.rate_work_collegeQuery_sumall_gen();
      } else {
        this.snackbar.icon = "mdi-alert";
        this.snackbar.color = "warning";
        this.snackbar.text = "บันทึกข้อมูลเรียบร้อย";
        this.snackbar.show = true;
      }
      this.analysis_data_generalUpdatedialog = false;
    },

    async rate_work_collegeDelete(rate_work_college_id) {
      let result = await this.$http.post("rate_work_college.php", {
        ApiKey: this.ApiKey,
        rate_work_college_id: rate_work_college_id
      });
      this.analysis_data_dialog = result.data;
      this.deleterate_work_collegedialog = true;
    },

    /* analysis_data_Delete_dialogsubmit */
    async analysis_data_Delete_dialogsubmit() {
      if (this.$refs.analysis_data_Delete_dialogform.validate())
        this.analysis_data_edit.ApiKey = this.ApiKey;
      {
    /*     console.log(this.analysis_data_edit); */
        let result = await this.$http.post(
          "rate_work_college_cal_room.delete.php",
          this.analysis_data_edit
        );
        if (result.data.status == true) {
          this.snackbar.icon = "mdi-content-save";
          this.snackbar.color = "success";
          this.snackbar.text = "ลบข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.rate_work_collegeQuery_group_course();
        } else {
          this.snackbar.icon = "mdi-alert";
          this.snackbar.color = "red";
          this.snackbar.text = "ลบข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.analysis_data_Delete_dialog = false;
      }
    },

    /* analysis_data_Delete_gen_dialogsubmit */
    async analysis_data_Delete_gen_dialogsubmit() {
      if (this.$refs.analysis_data_Delete_gen_dialogform.validate())
        this.analysis_data_edit_gen_del.ApiKey = this.ApiKey;
      this.analysis_data_edit_gen_del.rate_work_ccr_year = this.rate_work_colleges_sumall_gen.rate_work_college_year;
      this.analysis_data_edit_gen_del.rate_work_ccr_code = this.rate_work_colleges_sumall_gen.rate_work_college_code;
      this.analysis_data_edit_gen_del.rate_work_ccr_course_id = "00";

      {
        /* console.log(this.analysis_data_edit_gen_del); */
        let result = await this.$http.post(
          "rate_work_college_cal_room.delete_2.php",
          this.analysis_data_edit_gen_del
        );
        if (result.data.status == true) {
          this.snackbar.icon = "mdi-content-save";
          this.snackbar.color = "success";
          this.snackbar.text = "ลบข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.rate_work_collegeQuery_sumall_gen();
        } else {
          this.snackbar.icon = "mdi-alert";
          this.snackbar.color = "red";
          this.snackbar.text = "ลบข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.analysis_data_Delete_gen_dialog = false;
      }
    },

    //Delete sc
    async analysis_data_Delete_sc_dialogsubmit() {
      if (this.$refs.analysis_data_Delete_sc_dialogform.validate())
        this.analysis_data_edit_gen_del.ApiKey = this.ApiKey;
      this.analysis_data_edit_gen_del.rate_work_ccr_year = this.rate_work_colleges_sumall_gen.rate_work_college_year;
      this.analysis_data_edit_gen_del.rate_work_ccr_code = this.rate_work_colleges_sumall_gen.rate_work_college_code;
      this.analysis_data_edit_gen_del.rate_work_ccr_course_id = "66";

      {
        /* console.log(this.analysis_data_edit_gen_del); */
        let result = await this.$http.post(
          "rate_work_college_cal_room.delete_2.php",
          this.analysis_data_edit_gen_del
        );
        if (result.data.status == true) {
          this.snackbar.icon = "mdi-content-save";
          this.snackbar.color = "success";
          this.snackbar.text = "ลบข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.rate_work_sc_Query();
        } else {
          this.snackbar.icon = "mdi-alert";
          this.snackbar.color = "red";
          this.snackbar.text = "ลบข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.analysis_data_Delete_sc_dialog = false;
      }
    },



    async deleterate_work_collegeubmit() {
      if (this.$refs.deleterate_work_collegeform.validate())
        this.analysis_data_dialog.ApiKey = this.ApiKey;
      {
        let result = await this.$http.post(
          "rate_work_college.delete.php",
          this.analysis_data_dialog
        );
        if (result.data.status == true) {
          this.snackbar.icon = "mdi-content-save";
          this.snackbar.color = "success";
          this.snackbar.text = "ลบข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.rate_work_collegeQuery_all();
          this.rate_work_collegesQueryAll();
        } else {
          this.snackbar.icon = "mdi-alert";
          this.snackbar.color = "red";
          this.snackbar.text = "ลบข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.deleterate_work_collegedialog = false;
      }
    },
    //คำนวนณระยะสั้น
    async cal_analysis_data_sc() {
      let sc_hours_sum_all = this.rate_work_sc_show.sc_hours_sum_all;
      let cal_man_powers;
      let cal_room_sc;

      cal_man_powers = sc_hours_sum_all / 828;
      cal_room_sc = Math.ceil(sc_hours_sum_all / 1080);
      this.cal_man_power_sc = cal_man_powers.toFixed(2);
      this.cal_rooms_sc = cal_room_sc;
    },

    //คำนวณสามัญ
    async rate_work_cal_general() {
      let level_1;
      let level_2;
      let level_3;
      let level_4;
      let level_5;
      if (
        isNaN(this.rate_work_colleges_sumall_gen.sum_branch_20_1) ||
        isNaN(this.rate_work_colleges_sumall_gen.sum_branch_20_2) ||
        isNaN(this.rate_work_colleges_sumall_gen.sum_branch_20_3) ||
        isNaN(this.rate_work_colleges_sumall_gen.sum_branch_30_1) ||
        isNaN(this.rate_work_colleges_sumall_gen.sum_branch_30_2)
      ) {
        level_1 = 0;
        level_2 = 0;
        level_3 = 0;
        level_4 = 0;
        level_5 = 0;
      } else {
        level_1 = this.rate_work_colleges_sumall_gen.sum_branch_20_1;
        level_2 = this.rate_work_colleges_sumall_gen.sum_branch_20_2;
        level_3 = this.rate_work_colleges_sumall_gen.sum_branch_20_3;
        level_4 = this.rate_work_colleges_sumall_gen.sum_branch_30_1;
        level_5 = this.rate_work_colleges_sumall_gen.sum_branch_30_2;
      }
      let cal_01;
      if (level_1 < 1) {
        cal_01 = 0;
      } else if (level_1 < 40) {
        cal_01 = 1;
      } else if (((level_1 / 40)%1) < 1 / 4) {
        cal_01 = Math.floor(level_1 / 40);
      } else {
        cal_01 = Math.ceil(level_1 / 40);
      }
      this.analysis_data_s_result_01 = cal_01;
      let cal_02;
      if (level_2 < 1) {
        cal_02 = 0;
      } else if (level_2 < 40) {
        cal_02 = 1;
      } else if (((level_2 / 40)%1) < 1 / 4) {
        cal_02 = Math.floor(level_2 / 40);
      } else {
        cal_02 = Math.ceil(level_2 / 40);
      }
      this.analysis_data_s_result_02 = cal_02;

      let cal_03;
      if (level_3 < 1) {
        cal_03 = 0;
      } else if (level_3 < 40) {
        cal_03 = 1;
      } else if (((level_3 / 40)%1) < 1 / 4) {
        cal_03 = Math.floor(level_3 / 40);
      } else {
        cal_03 = Math.ceil(level_3 / 40);
      }
      this.analysis_data_s_result_03 = cal_03;

      let cal_04;
      if (level_4 < 1) {
        cal_04 = 0;
      } else if (level_4 < 30) {
        cal_04 = 1;
      } else if ((1 % (level_4 / 30)) < 1 / 3) {
        cal_04 = Math.floor(level_4 / 30);
      } else {
        cal_04 = Math.ceil(level_4 / 30);
      }
      this.analysis_data_s_result_04 = cal_04;

      let cal_05;
      if (level_5 < 1) {
        cal_05 = 0;
      } else if (level_5 < 30) {
        cal_05 = 1;
      } else if ((1 % (level_5 / 30)) < 1 / 3) {
        cal_05 = Math.floor(level_5 / 30);
      } else {
        cal_05 = Math.ceil(level_5 / 30);
      }
      this.analysis_data_s_result_05 = cal_05;

      this.analysis_data_s_result_sum_room_20 = cal_01 + cal_02 + cal_03;
      this.analysis_data_s_result_sum_room_30 = cal_04 + cal_05;
      this.analysis_data_s_result_sum_room =
        this.analysis_data_s_result_sum_room_20 +
        this.analysis_data_s_result_sum_room_30;

      let cal_man_20;
      let cal_man_30;
      cal_man_20 = (7 * this.analysis_data_s_result_sum_room_20) / 18;
      cal_man_30 = (6 * this.analysis_data_s_result_sum_room_30) / 15;
      this.analysis_data_man_power_cal_20 = cal_man_20.toFixed(2);
      this.analysis_data_man_power_cal_30 = cal_man_30.toFixed(2);
    },

    //คำนวณประเภทวิชา
    async rate_work_cal_level() {
      let user_type = this.user.college_id_code_type_manpower;
      let rate_work_course_id = this.analysis_data_s.rate_work_course_id;
      let rate_work_college_id_class = this.analysis_data_s
        .rate_work_college_id_class;
      let level_1;
      let level_2;
      let level_3;
      if (
        isNaN(this.analysis_data_s.std_level_1) ||
        isNaN(this.analysis_data_s.std_level_2) |
          isNaN(this.analysis_data_s.std_level_3)
      ) {
        level_1 = 0;
        level_2 = 0;
        level_3 = 0;
      } else {
        level_1 = this.analysis_data_s.std_level_1;
        level_2 = this.analysis_data_s.std_level_2;
        level_3 = this.analysis_data_s.std_level_3;
      }

      //1 วิทยาลัยเทคนิค     01 อุตสาหกรรม[30] 08 อุตสาหกรรมสิ่งทอ[30] 09 เทคโนโลยีสารสนเทศและการสื่อสาร[40]
      if (user_type == "1") {
        if (rate_work_college_id_class == "20") {
          if (rate_work_course_id == "01" || rate_work_course_id == "08") {
            let cal_01;
            if (level_1 < 1) {
              cal_01 = 0;
            } else if (level_1 < 30) {
              cal_01 = 1;
            } else if (((level_1 / 30)%1)< 1 / 3) {
              cal_01 = Math.floor(level_1 / 30);
            } else {
              cal_01 = Math.ceil(level_1 / 30);
            }
            this.analysis_data_s_result_01 = cal_01;

            let cal_02;
            if (level_2 < 1) {
              cal_02 = 0;
            } else if (level_2 < 30) {
              cal_02 = 1;
            } else if (((level_2 / 30)%1) < 1 / 3) {
              cal_02 = Math.floor(level_2 / 30);
            } else {
              cal_02 = Math.ceil(level_2 / 30);
            }
            this.analysis_data_s_result_02 = cal_02;

            let cal_03;
            if (level_3 < 1) {
              cal_03 = 0;
            } else if (level_3 < 30) {
              cal_03 = 1;
            } else if (((level_3 / 30)%1) < 1 / 3) {
              cal_03 = Math.floor(level_3 / 30);
            } else {
              cal_03 = Math.ceil(level_3 / 30);
            }
            this.analysis_data_s_result_03 = cal_03;

            this.analysis_data_s_result_sum_room = cal_01 + cal_02 + cal_03;
          } else if (rate_work_course_id == "09") {
            let cal_01;
            if (level_1 < 1) {
              cal_01 = 0;
            } else if (level_1 < 40) {
              cal_01 = 1;
            } else if (((level_1 / 40)%1) < 1 / 4) {
              cal_01 = Math.floor(level_1 / 40);
            } else {
              cal_01 = Math.ceil(level_1 / 40);
            }
            this.analysis_data_s_result_01 = cal_01;

            let cal_02;
            if (level_2 < 1) {
              cal_02 = 0;
            } else if (level_2 < 40) {
              cal_02 = 1;
            } else if (((level_2 / 40)%1) < 1 / 4) {
              cal_02 = Math.floor(level_2 / 40);
            } else {
              cal_02 = Math.ceil(level_2 / 40);
            }
            this.analysis_data_s_result_02 = cal_02;

            let cal_03;
            if (level_3 < 1) {
              cal_03 = 0;
            } else if (level_3 < 40) {
              cal_03 = 1;
            } else if (((level_3 / 40)%1) < 1 / 4) {
              cal_03 = Math.floor(level_3 / 40);
            } else {
              cal_03 = Math.ceil(level_3 / 40);
            }
            this.analysis_data_s_result_03 = cal_03;

            this.analysis_data_s_result_sum_room = cal_01 + cal_02 + cal_03;
          } else if (rate_work_course_id == "02") {
            let cal_01;
            if (level_1 < 15) {
              cal_01 = 0;
            } else if (level_1 < 40) {
              cal_01 = 1;
            } else if (((level_1 / 40)%1) < 1 / 4) {
              cal_01 = Math.floor(level_1 / 40);
            } else {
              cal_01 = Math.ceil(level_1 / 40);
            }
            this.analysis_data_s_result_01 = cal_01;

            let cal_02;
            if (level_2 < 15) {
              cal_02 = 0;
            } else if (level_2 < 40) {
              cal_02 = 1;
            } else if (((level_2 / 40)%1) < 1 / 4) {
              cal_02 = Math.floor(level_2 / 40);
            } else {
              cal_02 = Math.ceil(level_2 / 40);
            }
            this.analysis_data_s_result_02 = cal_02;

            let cal_03;
            if (level_3 < 15) {
              cal_03 = 0;
            } else if (level_3 < 40) {
              cal_03 = 1;
            } else if (((level_3 / 40)%1) < 1 / 4) {
              cal_03 = Math.floor(level_3 / 40);
            } else {
              cal_03 = Math.ceil(level_3 / 40);
            }
            this.analysis_data_s_result_03 = cal_03;

            this.analysis_data_s_result_sum_room = cal_01 + cal_02 + cal_03;
          } else {
            let cal_01;
            if (level_1 < 15) {
              cal_01 = 0;
            } else if (level_1 < 30) {
              cal_01 = 1;
            } else if (((level_1 / 30)%1)< 1 / 3) {
              cal_01 = Math.floor(level_1 / 30);
            } else {
              cal_01 = Math.ceil(level_1 / 30);
            }
            this.analysis_data_s_result_01 = cal_01;

            let cal_02;
            if (level_2 < 15) {
              cal_02 = 0;
            } else if (level_2 < 30) {
              cal_02 = 1;
            } else if (((level_2 / 30)%1) < 1 / 3) {
              cal_02 = Math.floor(level_2 / 30);
            } else {
              cal_02 = Math.ceil(level_2 / 30);
            }
            this.analysis_data_s_result_02 = cal_02;

            let cal_03;
            if (level_3 < 15) {
              cal_03 = 0;
            } else if (level_3 < 30) {
              cal_03 = 1;
            } else if (((level_3 / 30)%1) < 1 / 3) {
              cal_03 = Math.floor(level_3 / 30);
            } else {
              cal_03 = Math.ceil(level_3 / 30);
            }
            this.analysis_data_s_result_03 = cal_03;

            this.analysis_data_s_result_sum_room = cal_01 + cal_02 + cal_03;
          }
        } else if (rate_work_college_id_class == "30") {
          if (
            rate_work_course_id == "01" ||
            rate_work_course_id == "08" ||
            rate_work_course_id == "09"
          ) {
            let cal_01;
            if (level_1 < 1) {
              cal_01 = 0;
            } else if (level_1 < 30) {
              cal_01 = 1;
            } else if (((level_1 / 30)%1)< 1 / 3) {
              cal_01 = Math.floor(level_1 / 30);
            } else {
              cal_01 = Math.ceil(level_1 / 30);
            }
            this.analysis_data_s_result_01 = cal_01;

            let cal_02;
            if (level_2 < 1) {
              cal_02 = 0;
            } else if (level_2 < 30) {
              cal_02 = 1;
            } else if (((level_2 / 30)%1) < 1 / 3) {
              cal_02 = Math.floor(level_2 / 30);
            } else {
              cal_02 = Math.ceil(level_2 / 30);
            }
            this.analysis_data_s_result_02 = cal_02;

            this.analysis_data_s_result_sum_room = cal_01 + cal_02;
          } else {
            let cal_01;
            if (level_1 < 15) {
              cal_01 = 0;
            } else if (level_1 < 30) {
              cal_01 = 1;
            } else if (((level_1 / 30)%1)< 1 / 3) {
              cal_01 = Math.floor(level_1 / 30);
            } else {
              cal_01 = Math.ceil(level_1 / 30);
            }
            this.analysis_data_s_result_01 = cal_01;

            let cal_02;
            if (level_2 < 15) {
              cal_02 = 0;
            } else if (level_2 < 30) {
              cal_02 = 1;
            } else if (((level_2 / 30)%1) < 1 / 3) {
              cal_02 = Math.floor(level_2 / 30);
            } else {
              cal_02 = Math.ceil(level_2 / 30);
            }
            this.analysis_data_s_result_02 = cal_02;

            this.analysis_data_s_result_sum_room = cal_01 + cal_02;
          }
        }
      }
      //2 วิทยาลัยการอาชีพ  01 อุตสาหกรรม[30] 02 พาณิชยกรรม/บริหารธุรกิจ[40] 08 อุตสาหกรรมสิ่งทอ[30]
      else if (user_type == "2") {
        if (rate_work_college_id_class == "20") {
          if (rate_work_course_id == "01" || rate_work_course_id == "08") {
            let cal_01;
            if (level_1 < 1) {
              cal_01 = 0;
            } else if (level_1 < 30) {
              cal_01 = 1;
            } else if (((level_1 / 30)%1)< 1 / 3) {
              cal_01 = Math.floor(level_1 / 30);
            } else {
              cal_01 = Math.ceil(level_1 / 30);
            }
            this.analysis_data_s_result_01 = cal_01;

            let cal_02;
            if (level_2 < 1) {
              cal_02 = 0;
            } else if (level_2 < 30) {
              cal_02 = 1;
            } else if (((level_2 / 30)%1) < 1 / 3) {
              cal_02 = Math.floor(level_2 / 30);
            } else {
              cal_02 = Math.ceil(level_2 / 30);
            }
            this.analysis_data_s_result_02 = cal_02;

            let cal_03;
            if (level_3 < 1) {
              cal_03 = 0;
            } else if (level_3 < 30) {
              cal_03 = 1;
            } else if (((level_3 / 30)%1) < 1 / 3) {
              cal_03 = Math.floor(level_3 / 30);
            } else {
              cal_03 = Math.ceil(level_3 / 30);
            }
            this.analysis_data_s_result_03 = cal_03;

            this.analysis_data_s_result_sum_room = cal_01 + cal_02 + cal_03;
          } else if (rate_work_course_id == "09") {
            let cal_01;
            if (level_1 < 15) {
              cal_01 = 0;
            } else if (level_1 < 40) {
              cal_01 = 1;
            } else if (((level_1 / 40)%1) < 1 / 4) {
              cal_01 = Math.floor(level_1 / 40);
            } else {
              cal_01 = Math.ceil(level_1 / 40);
            }
            this.analysis_data_s_result_01 = cal_01;

            let cal_02;
            if (level_2 < 15) {
              cal_02 = 0;
            } else if (level_2 < 40) {
              cal_02 = 1;
            } else if (((level_2 / 40)%1) < 1 / 4) {
              cal_02 = Math.floor(level_2 / 40);
            } else {
              cal_02 = Math.ceil(level_2 / 40);
            }
            this.analysis_data_s_result_02 = cal_02;

            let cal_03;
            if (level_3 < 15) {
              cal_03 = 0;
            } else if (level_3 < 40) {
              cal_03 = 1;
            } else if (((level_3 / 40)%1) < 1 / 4) {
              cal_03 = Math.floor(level_3 / 40);
            } else {
              cal_03 = Math.ceil(level_3 / 40);
            }
            this.analysis_data_s_result_03 = cal_03;

            this.analysis_data_s_result_sum_room = cal_01 + cal_02 + cal_03;
          } else if (rate_work_course_id == "02") {
            let cal_01;
            if (level_1 < 1) {
              cal_01 = 0;
            } else if (level_1 < 40) {
              cal_01 = 1;
            } else if (((level_1 / 40)%1) < 1 / 4) {
              cal_01 = Math.floor(level_1 / 40);
            } else {
              cal_01 = Math.ceil(level_1 / 40);
            }
            this.analysis_data_s_result_01 = cal_01;

            let cal_02;
            if (level_2 < 1) {
              cal_02 = 0;
            } else if (level_2 < 40) {
              cal_02 = 1;
            } else if (((level_2 / 40)%1) < 1 / 4) {
              cal_02 = Math.floor(level_2 / 40);
            } else {
              cal_02 = Math.ceil(level_2 / 40);
            }
            this.analysis_data_s_result_02 = cal_02;

            let cal_03;
            if (level_3 < 1) {
              cal_03 = 0;
            } else if (level_3 < 40) {
              cal_03 = 1;
            } else if (((level_3 / 40)%1) < 1 / 4) {
              cal_03 = Math.floor(level_3 / 40);
            } else {
              cal_03 = Math.ceil(level_3 / 40);
            }
            this.analysis_data_s_result_03 = cal_03;

            this.analysis_data_s_result_sum_room = cal_01 + cal_02 + cal_03;
          } else {
            let cal_01;
            if (level_1 < 15) {
              cal_01 = 0;
            } else if (level_1 < 30) {
              cal_01 = 1;
            } else if (((level_1 / 30)%1)< 1 / 3) {
              cal_01 = Math.floor(level_1 / 30);
            } else {
              cal_01 = Math.ceil(level_1 / 30);
            }
            this.analysis_data_s_result_01 = cal_01;

            let cal_02;
            if (level_2 < 15) {
              cal_02 = 0;
            } else if (level_2 < 30) {
              cal_02 = 1;
            } else if (((level_2 / 30)%1) < 1 / 3) {
              cal_02 = Math.floor(level_2 / 30);
            } else {
              cal_02 = Math.ceil(level_2 / 30);
            }
            this.analysis_data_s_result_02 = cal_02;

            let cal_03;
            if (level_3 < 15) {
              cal_03 = 0;
            } else if (level_3 < 30) {
              cal_03 = 1;
            } else if (((level_3 / 30)%1) < 1 / 3) {
              cal_03 = Math.floor(level_3 / 30);
            } else {
              cal_03 = Math.ceil(level_3 / 30);
            }
            this.analysis_data_s_result_03 = cal_03;

            this.analysis_data_s_result_sum_room = cal_01 + cal_02 + cal_03;
          }
        } else if (rate_work_college_id_class == "30") {
          if (
            rate_work_course_id == "01" ||
            rate_work_course_id == "02" ||
            rate_work_course_id == "08"
          ) {
            let cal_01;
            if (level_1 < 1) {
              cal_01 = 0;
            } else if (level_1 < 30) {
              cal_01 = 1;
            } else if (((level_1 / 30)%1)< 1 / 3) {
              cal_01 = Math.floor(level_1 / 30);
            } else {
              cal_01 = Math.ceil(level_1 / 30);
            }
            this.analysis_data_s_result_01 = cal_01;

            let cal_02;
            if (level_2 < 1) {
              cal_02 = 0;
            } else if (level_2 < 30) {
              cal_02 = 1;
            } else if (((level_2 / 30)%1) < 1 / 3) {
              cal_02 = Math.floor(level_2 / 30);
            } else {
              cal_02 = Math.ceil(level_2 / 30);
            }
            this.analysis_data_s_result_02 = cal_02;

            this.analysis_data_s_result_sum_room = cal_01 + cal_02;
          } else {
            let cal_01;
            if (level_1 < 15) {
              cal_01 = 0;
            } else if (level_1 < 30) {
              cal_01 = 1;
            } else if (((level_1 / 30)%1)< 1 / 3) {
              cal_01 = Math.floor(level_1 / 30);
            } else {
              cal_01 = Math.ceil(level_1 / 30);
            }
            this.analysis_data_s_result_01 = cal_01;

            let cal_02;
            if (level_2 < 15) {
              cal_02 = 0;
            } else if (level_2 < 30) {
              cal_02 = 1;
            } else if (((level_2 / 30)%1) < 1 / 3) {
              cal_02 = Math.floor(level_2 / 30);
            } else {
              cal_02 = Math.ceil(level_2 / 30);
            }
            this.analysis_data_s_result_02 = cal_02;

            this.analysis_data_s_result_sum_room = cal_01 + cal_02;
          }
        }
      }

      // 3 วิทยาลัยบริหารธุรกิจและการท่องเที่ยว  02 พาณิชยกรรม/บริหารธุรกิจ[40] 07 อุตสาหกรรมท่องเที่ยว [40]
      else if (user_type == "3") {
        if (rate_work_college_id_class == "20") {
          if (rate_work_course_id == "02" || rate_work_course_id == "07") {
            let cal_01;
            if (level_1 < 1) {
              cal_01 = 0;
            } else if (level_1 < 40) {
              cal_01 = 1;
            } else if (((level_1 / 40)%1) < 1 / 4) {
              cal_01 = Math.floor(level_1 / 40);
            } else {
              cal_01 = Math.ceil(level_1 / 40);
            }
            this.analysis_data_s_result_01 = cal_01;

            let cal_02;
            if (level_2 < 1) {
              cal_02 = 0;
            } else if (level_2 < 40) {
              cal_02 = 1;
            } else if (((level_2 / 40)%1) < 1 / 4) {
              cal_02 = Math.floor(level_2 / 40);
            } else {
              cal_02 = Math.ceil(level_2 / 40);
            }
            this.analysis_data_s_result_02 = cal_02;

            let cal_03;
            if (level_3 < 1) {
              cal_03 = 0;
            } else if (level_3 < 40) {
              cal_03 = 1;
            } else if (((level_3 / 40)%1) < 1 / 4) {
              cal_03 = Math.floor(level_3 / 40);
            } else {
              cal_03 = Math.ceil(level_3 / 40);
            }
            this.analysis_data_s_result_03 = cal_03;

            this.analysis_data_s_result_sum_room = cal_01 + cal_02 + cal_03;
          } else if (rate_work_course_id == "09") {
            let cal_01;
            if (level_1 < 15) {
              cal_01 = 0;
            } else if (level_1 < 40) {
              cal_01 = 1;
            } else if (((level_1 / 40)%1) < 1 / 4) {
              cal_01 = Math.floor(level_1 / 40);
            } else {
              cal_01 = Math.ceil(level_1 / 40);
            }
            this.analysis_data_s_result_01 = cal_01;

            let cal_02;
            if (level_2 < 15) {
              cal_02 = 0;
            } else if (level_2 < 40) {
              cal_02 = 1;
            } else if (((level_2 / 40)%1) < 1 / 4) {
              cal_02 = Math.floor(level_2 / 40);
            } else {
              cal_02 = Math.ceil(level_2 / 40);
            }
            this.analysis_data_s_result_02 = cal_02;

            let cal_03;
            if (level_3 < 15) {
              cal_03 = 0;
            } else if (level_3 < 40) {
              cal_03 = 1;
            } else if (((level_3 / 40)%1) < 1 / 4) {
              cal_03 = Math.floor(level_3 / 40);
            } else {
              cal_03 = Math.ceil(level_3 / 40);
            }
            this.analysis_data_s_result_03 = cal_03;

            this.analysis_data_s_result_sum_room = cal_01 + cal_02 + cal_03;
          } else {
            let cal_01;
            if (level_1 < 15) {
              cal_01 = 0;
            } else if (level_1 < 30) {
              cal_01 = 1;
            } else if (((level_1 / 30)%1)< 1 / 3) {
              cal_01 = Math.floor(level_1 / 30);
            } else {
              cal_01 = Math.ceil(level_1 / 30);
            }
            this.analysis_data_s_result_01 = cal_01;

            let cal_02;
            if (level_2 < 15) {
              cal_02 = 0;
            } else if (level_2 < 30) {
              cal_02 = 1;
            } else if (((level_2 / 30)%1) < 1 / 3) {
              cal_02 = Math.floor(level_2 / 30);
            } else {
              cal_02 = Math.ceil(level_2 / 30);
            }
            this.analysis_data_s_result_02 = cal_02;

            let cal_03;
            if (level_3 < 15) {
              cal_03 = 0;
            } else if (level_3 < 30) {
              cal_03 = 1;
            } else if (((level_3 / 30)%1) < 1 / 3) {
              cal_03 = Math.floor(level_3 / 30);
            } else {
              cal_03 = Math.ceil(level_3 / 30);
            }
            this.analysis_data_s_result_03 = cal_03;

            this.analysis_data_s_result_sum_room = cal_01 + cal_02 + cal_03;
          }
        } else if (rate_work_college_id_class == "30") {
          if (rate_work_course_id == "02" || rate_work_course_id == "07") {
            let cal_01;
            if (level_1 < 1) {
              cal_01 = 0;
            } else if (level_1 < 30) {
              cal_01 = 1;
            } else if (((level_1 / 30)%1)< 1 / 3) {
              cal_01 = Math.floor(level_1 / 30);
            } else {
              cal_01 = Math.ceil(level_1 / 30);
            }
            this.analysis_data_s_result_01 = cal_01;

            let cal_02;
            if (level_2 < 1) {
              cal_02 = 0;
            } else if (level_2 < 30) {
              cal_02 = 1;
            } else if (((level_2 / 30)%1) < 1 / 3) {
              cal_02 = Math.floor(level_2 / 30);
            } else {
              cal_02 = Math.ceil(level_2 / 30);
            }
            this.analysis_data_s_result_02 = cal_02;

            this.analysis_data_s_result_sum_room = cal_01 + cal_02;
          } else {
            let cal_01;
            if (level_1 < 15) {
              cal_01 = 0;
            } else if (level_1 < 30) {
              cal_01 = 1;
            } else if (((level_1 / 30)%1)< 1 / 3) {
              cal_01 = Math.floor(level_1 / 30);
            } else {
              cal_01 = Math.ceil(level_1 / 30);
            }
            this.analysis_data_s_result_01 = cal_01;

            let cal_02;
            if (level_2 < 15) {
              cal_02 = 0;
            } else if (level_2 < 30) {
              cal_02 = 1;
            } else if (((level_2 / 30)%1) < 1 / 3) {
              cal_02 = Math.floor(level_2 / 30);
            } else {
              cal_02 = Math.ceil(level_2 / 30);
            }
            this.analysis_data_s_result_02 = cal_02;

            this.analysis_data_s_result_sum_room = cal_01 + cal_02;
          }
        }
      }

      //4 วิทยาลัยพาณิชยการ  02 พาณิชยกรรม/บริหารธุรกิจ [40]
      else if (user_type == "4") {
        if (rate_work_college_id_class == "20") {
          if (rate_work_course_id == "02") {
            let cal_01;
            if (level_1 < 1) {
              cal_01 = 0;
            } else if (level_1 < 40) {
              cal_01 = 1;
            } else if (((level_1 / 40)%1) < 1 / 4) {
              cal_01 = Math.floor(level_1 / 40);
            } else {
              cal_01 = Math.ceil(level_1 / 40);
            }
            this.analysis_data_s_result_01 = cal_01;

            let cal_02;
            if (level_2 < 1) {
              cal_02 = 0;
            } else if (level_2 < 40) {
              cal_02 = 1;
            } else if (((level_2 / 40)%1) < 1 / 4) {
              cal_02 = Math.floor(level_2 / 40);
            } else {
              cal_02 = Math.ceil(level_2 / 40);
            }
            this.analysis_data_s_result_02 = cal_02;

            let cal_03;
            if (level_3 < 1) {
              cal_03 = 0;
            } else if (level_3 < 40) {
              cal_03 = 1;
            } else if (((level_3 / 40)%1) < 1 / 4) {
              cal_03 = Math.floor(level_3 / 40);
            } else {
              cal_03 = Math.ceil(level_3 / 40);
            }
            this.analysis_data_s_result_03 = cal_03;

            this.analysis_data_s_result_sum_room = cal_01 + cal_02 + cal_03;
          } else if (rate_work_course_id == "09") {
            let cal_01;
            if (level_1 < 15) {
              cal_01 = 0;
            } else if (level_1 < 40) {
              cal_01 = 1;
            } else if (((level_1 / 40)%1) < 1 / 4) {
              cal_01 = Math.floor(level_1 / 40);
            } else {
              cal_01 = Math.ceil(level_1 / 40);
            }
            this.analysis_data_s_result_01 = cal_01;

            let cal_02;
            if (level_2 < 15) {
              cal_02 = 0;
            } else if (level_2 < 40) {
              cal_02 = 1;
            } else if (((level_2 / 40)%1) < 1 / 4) {
              cal_02 = Math.floor(level_2 / 40);
            } else {
              cal_02 = Math.ceil(level_2 / 40);
            }
            this.analysis_data_s_result_02 = cal_02;

            let cal_03;
            if (level_3 < 15) {
              cal_03 = 0;
            } else if (level_3 < 40) {
              cal_03 = 1;
            } else if (((level_3 / 40)%1) < 1 / 4) {
              cal_03 = Math.floor(level_3 / 40);
            } else {
              cal_03 = Math.ceil(level_3 / 40);
            }
            this.analysis_data_s_result_03 = cal_03;

            this.analysis_data_s_result_sum_room = cal_01 + cal_02 + cal_03;
          } else {
            let cal_01;
            if (level_1 < 15) {
              cal_01 = 0;
            } else if (level_1 < 30) {
              cal_01 = 1;
            } else if (((level_1 / 30)%1)< 1 / 3) {
              cal_01 = Math.floor(level_1 / 30);
            } else {
              cal_01 = Math.ceil(level_1 / 30);
            }
            this.analysis_data_s_result_01 = cal_01;

            let cal_02;
            if (level_2 < 15) {
              cal_02 = 0;
            } else if (level_2 < 30) {
              cal_02 = 1;
            } else if (((level_2 / 30)%1) < 1 / 3) {
              cal_02 = Math.floor(level_2 / 30);
            } else {
              cal_02 = Math.ceil(level_2 / 30);
            }
            this.analysis_data_s_result_02 = cal_02;

            let cal_03;
            if (level_3 < 15) {
              cal_03 = 0;
            } else if (level_3 < 30) {
              cal_03 = 1;
            } else if (((level_3 / 30)%1) < 1 / 3) {
              cal_03 = Math.floor(level_3 / 30);
            } else {
              cal_03 = Math.ceil(level_3 / 30);
            }
            this.analysis_data_s_result_03 = cal_03;

            this.analysis_data_s_result_sum_room = cal_01 + cal_02 + cal_03;
          }
        } else if (rate_work_college_id_class == "30") {
          if (rate_work_course_id == "02") {
            let cal_01;
            if (level_1 < 1) {
              cal_01 = 0;
            } else if (level_1 < 30) {
              cal_01 = 1;
            } else if (((level_1 / 30)%1)< 1 / 3) {
              cal_01 = Math.floor(level_1 / 30);
            } else {
              cal_01 = Math.ceil(level_1 / 30);
            }
            this.analysis_data_s_result_01 = cal_01;

            let cal_02;
            if (level_2 < 1) {
              cal_02 = 0;
            } else if (level_2 < 30) {
              cal_02 = 1;
            } else if (((level_2 / 30)%1) < 1 / 3) {
              cal_02 = Math.floor(level_2 / 30);
            } else {
              cal_02 = Math.ceil(level_2 / 30);
            }
            this.analysis_data_s_result_02 = cal_02;

            this.analysis_data_s_result_sum_room = cal_01 + cal_02;
          } else {
            let cal_01;
            if (level_1 < 15) {
              cal_01 = 0;
            } else if (level_1 < 30) {
              cal_01 = 1;
            } else if (((level_1 / 30)%1)< 1 / 3) {
              cal_01 = Math.floor(level_1 / 30);
            } else {
              cal_01 = Math.ceil(level_1 / 30);
            }
            this.analysis_data_s_result_01 = cal_01;

            let cal_02;
            if (level_2 < 15) {
              cal_02 = 0;
            } else if (level_2 < 30) {
              cal_02 = 1;
            } else if (((level_2 / 30)%1) < 1 / 3) {
              cal_02 = Math.floor(level_2 / 30);
            } else {
              cal_02 = Math.ceil(level_2 / 30);
            }
            this.analysis_data_s_result_02 = cal_02;

            this.analysis_data_s_result_sum_room = cal_01 + cal_02;
          }
        }
      }

      //5 วิทยาลัยศิลปหัตถกรรม 03 ศิลปกรรม[30]
      else if (user_type == "5") {
        if (rate_work_college_id_class == "20") {
          if (rate_work_course_id == "03") {
            let cal_01;
            if (level_1 < 1) {
              cal_01 = 0;
            } else if (level_1 < 30) {
              cal_01 = 1;
            } else if (((level_1 / 30)%1)< 1 / 3) {
              cal_01 = Math.floor(level_1 / 30);
            } else {
              cal_01 = Math.ceil(level_1 / 30);
            }
            this.analysis_data_s_result_01 = cal_01;

            let cal_02;
            if (level_2 < 1) {
              cal_02 = 0;
            } else if (level_2 < 30) {
              cal_02 = 1;
            } else if (((level_2 / 30)%1) < 1 / 3) {
              cal_02 = Math.floor(level_2 / 30);
            } else {
              cal_02 = Math.ceil(level_2 / 30);
            }
            this.analysis_data_s_result_02 = cal_02;

            let cal_03;
            if (level_3 < 1) {
              cal_03 = 0;
            } else if (level_3 < 30) {
              cal_03 = 1;
            } else if (((level_3 / 30)%1) < 1 / 3) {
              cal_03 = Math.floor(level_3 / 30);
            } else {
              cal_03 = Math.ceil(level_3 / 30);
            }
            this.analysis_data_s_result_03 = cal_03;

            this.analysis_data_s_result_sum_room = cal_01 + cal_02 + cal_03;
          } else if (
            rate_work_course_id == "02" ||
            rate_work_course_id == "09"
          ) {
            let cal_01;
            if (level_1 < 15) {
              cal_01 = 0;
            } else if (level_1 < 40) {
              cal_01 = 1;
            } else if (((level_1 / 40)%1) < 1 / 4) {
              cal_01 = Math.floor(level_1 / 40);
            } else {
              cal_01 = Math.ceil(level_1 / 40);
            }
            this.analysis_data_s_result_01 = cal_01;

            let cal_02;
            if (level_2 < 15) {
              cal_02 = 0;
            } else if (level_2 < 40) {
              cal_02 = 1;
            } else if (((level_2 / 40)%1) < 1 / 4) {
              cal_02 = Math.floor(level_2 / 40);
            } else {
              cal_02 = Math.ceil(level_2 / 40);
            }
            this.analysis_data_s_result_02 = cal_02;

            let cal_03;
            if (level_3 < 15) {
              cal_03 = 0;
            } else if (level_3 < 40) {
              cal_03 = 1;
            } else if (((level_3 / 40)%1) < 1 / 4) {
              cal_03 = Math.floor(level_3 / 40);
            } else {
              cal_03 = Math.ceil(level_3 / 40);
            }
            this.analysis_data_s_result_03 = cal_03;

            this.analysis_data_s_result_sum_room = cal_01 + cal_02 + cal_03;
          } else {
            let cal_01;
            if (level_1 < 15) {
              cal_01 = 0;
            } else if (level_1 < 30) {
              cal_01 = 1;
            } else if (((level_1 / 30)%1)< 1 / 3) {
              cal_01 = Math.floor(level_1 / 30);
            } else {
              cal_01 = Math.ceil(level_1 / 30);
            }
            this.analysis_data_s_result_01 = cal_01;

            let cal_02;
            if (level_2 < 15) {
              cal_02 = 0;
            } else if (level_2 < 30) {
              cal_02 = 1;
            } else if (((level_2 / 30)%1) < 1 / 3) {
              cal_02 = Math.floor(level_2 / 30);
            } else {
              cal_02 = Math.ceil(level_2 / 30);
            }
            this.analysis_data_s_result_02 = cal_02;

            let cal_03;
            if (level_3 < 15) {
              cal_03 = 0;
            } else if (level_3 < 30) {
              cal_03 = 1;
            } else if (((level_3 / 30)%1) < 1 / 3) {
              cal_03 = Math.floor(level_3 / 30);
            } else {
              cal_03 = Math.ceil(level_3 / 30);
            }
            this.analysis_data_s_result_03 = cal_03;

            this.analysis_data_s_result_sum_room = cal_01 + cal_02 + cal_03;
          }
        } else if (rate_work_college_id_class == "30") {
          if (rate_work_course_id == "03") {
            let cal_01;
            if (level_1 < 1) {
              cal_01 = 0;
            } else if (level_1 < 30) {
              cal_01 = 1;
            } else if (((level_1 / 30)%1)< 1 / 3) {
              cal_01 = Math.floor(level_1 / 30);
            } else {
              cal_01 = Math.ceil(level_1 / 30);
            }
            this.analysis_data_s_result_01 = cal_01;

            let cal_02;
            if (level_2 < 1) {
              cal_02 = 0;
            } else if (level_2 < 30) {
              cal_02 = 1;
            } else if (((level_2 / 30)%1) < 1 / 3) {
              cal_02 = Math.floor(level_2 / 30);
            } else {
              cal_02 = Math.ceil(level_2 / 30);
            }
            this.analysis_data_s_result_02 = cal_02;

            this.analysis_data_s_result_sum_room = cal_01 + cal_02;
          } else {
            let cal_01;
            if (level_1 < 15) {
              cal_01 = 0;
            } else if (level_1 < 30) {
              cal_01 = 1;
            } else if (((level_1 / 30)%1)< 1 / 3) {
              cal_01 = Math.floor(level_1 / 30);
            } else {
              cal_01 = Math.ceil(level_1 / 30);
            }
            this.analysis_data_s_result_01 = cal_01;

            let cal_02;
            if (level_2 < 15) {
              cal_02 = 0;
            } else if (level_2 < 30) {
              cal_02 = 1;
            } else if (((level_2 / 30)%1) < 1 / 3) {
              cal_02 = Math.floor(level_2 / 30);
            } else {
              cal_02 = Math.ceil(level_2 / 30);
            }
            this.analysis_data_s_result_02 = cal_02;

            this.analysis_data_s_result_sum_room = cal_01 + cal_02;
          }
        }
      }
      //6 วิทยาลัยสารพัดช่าง (ระยะสั้น)
      else if (user_type == "6") {
        if (rate_work_college_id_class == "20") {
          if (rate_work_course_id == "02" || rate_work_course_id == "09") {
            let cal_01;
            if (level_1 < 15) {
              cal_01 = 0;
            } else if (level_1 < 40) {
              cal_01 = 1;
            } else if (((level_1 / 40)%1) < 1 / 4) {
              cal_01 = Math.floor(level_1 / 40);
            } else {
              cal_01 = Math.ceil(level_1 / 40);
            }
            this.analysis_data_s_result_01 = cal_01;

            let cal_02;
            if (level_2 < 15) {
              cal_02 = 0;
            } else if (level_2 < 40) {
              cal_02 = 1;
            } else if (((level_2 / 40)%1) < 1 / 4) {
              cal_02 = Math.floor(level_2 / 40);
            } else {
              cal_02 = Math.ceil(level_2 / 40);
            }
            this.analysis_data_s_result_02 = cal_02;

            let cal_03;
            if (level_3 < 15) {
              cal_03 = 0;
            } else if (level_3 < 40) {
              cal_03 = 1;
            } else if (((level_3 / 40)%1) < 1 / 4) {
              cal_03 = Math.floor(level_3 / 40);
            } else {
              cal_03 = Math.ceil(level_3 / 40);
            }
            this.analysis_data_s_result_03 = cal_03;

            this.analysis_data_s_result_sum_room = cal_01 + cal_02 + cal_03;
          } else {
            let cal_01;
            if (level_1 < 15) {
              cal_01 = 0;
            } else if (level_1 < 30) {
              cal_01 = 1;
            } else if (((level_1 / 30)%1)< 1 / 3) {
              cal_01 = Math.floor(level_1 / 30);
            } else {
              cal_01 = Math.ceil(level_1 / 30);
            }
            this.analysis_data_s_result_01 = cal_01;

            let cal_02;
            if (level_2 < 15) {
              cal_02 = 0;
            } else if (level_2 < 30) {
              cal_02 = 1;
            } else if (((level_2 / 30)%1) < 1 / 3) {
              cal_02 = Math.floor(level_2 / 30);
            } else {
              cal_02 = Math.ceil(level_2 / 30);
            }
            this.analysis_data_s_result_02 = cal_02;

            let cal_03;
            if (level_3 < 15) {
              cal_03 = 0;
            } else if (level_3 < 30) {
              cal_03 = 1;
            } else if (((level_3 / 30)%1) < 1 / 3) {
              cal_03 = Math.floor(level_3 / 30);
            } else {
              cal_03 = Math.ceil(level_3 / 30);
            }
            this.analysis_data_s_result_03 = cal_03;

            this.analysis_data_s_result_sum_room = cal_01 + cal_02 + cal_03;
          }
        } else if (rate_work_college_id_class == "30") {
          let cal_01;
          if (level_1 < 15) {
            cal_01 = 0;
          } else if (level_1 < 30) {
            cal_01 = 1;
          } else if (((level_1 / 30)%1)< 1 / 3) {
            cal_01 = Math.floor(level_1 / 30);
          } else {
            cal_01 = Math.ceil(level_1 / 30);
          }
          this.analysis_data_s_result_01 = cal_01;

          let cal_02;
          if (level_2 < 15) {
            cal_02 = 0;
          } else if (level_2 < 30) {
            cal_02 = 1;
          } else if (((level_2 / 30)%1) < 1 / 3) {
            cal_02 = Math.floor(level_2 / 30);
          } else {
            cal_02 = Math.ceil(level_2 / 30);
          }
          this.analysis_data_s_result_02 = cal_02;

          this.analysis_data_s_result_sum_room = cal_01 + cal_02;
        }
      }

      //7 วิทยาลัยอาชีวศึกษา 02 พาณิชยกรรม/บริหารธุรกิจ[40] 04 คหกรรม[30] 07 อุตสาหกรรมท่องเที่ยว[40]
      else if (user_type == "7") {
        if (rate_work_college_id_class == "20") {
          if (rate_work_course_id == "02" || rate_work_course_id == "07") {
            let cal_01;
            if (level_1 < 1) {
              cal_01 = 0;
            } else if (level_1 < 40) {
              cal_01 = 1;
            } else if (((level_1 / 40)%1) < 1 / 4) {
              cal_01 = Math.floor(level_1 / 40);
            } else {
              cal_01 = Math.ceil(level_1 / 40);
            }
            this.analysis_data_s_result_01 = cal_01;

            let cal_02;
            if (level_2 < 1) {
              cal_02 = 0;
            } else if (level_2 < 40) {
              cal_02 = 1;
            } else if (((level_2 / 40)%1) < 1 / 4) {
              cal_02 = Math.floor(level_2 / 40);
            } else {
              cal_02 = Math.ceil(level_2 / 40);
            }
            this.analysis_data_s_result_02 = cal_02;

            let cal_03;
            if (level_3 < 1) {
              cal_03 = 0;
            } else if (level_3 < 40) {
              cal_03 = 1;
            } else if (((level_3 / 40)%1) < 1 / 4) {
              cal_03 = Math.floor(level_3 / 40);
            } else {
              cal_03 = Math.ceil(level_3 / 40);
            }
            this.analysis_data_s_result_03 = cal_03;

            this.analysis_data_s_result_sum_room = cal_01 + cal_02 + cal_03;
          } else if (rate_work_course_id == "04") {
            let cal_01;
            if (level_1 < 1) {
              cal_01 = 0;
            } else if (level_1 < 30) {
              cal_01 = 1;
            } else if (((level_1 / 30)%1)< 1 / 3) {
              cal_01 = Math.floor(level_1 / 30);
            } else {
              cal_01 = Math.ceil(level_1 / 30);
            }
            this.analysis_data_s_result_01 = cal_01;

            let cal_02;
            if (level_2 < 1) {
              cal_02 = 0;
            } else if (level_2 < 30) {
              cal_02 = 1;
            } else if (((level_2 / 30)%1) < 1 / 3) {
              cal_02 = Math.floor(level_2 / 30);
            } else {
              cal_02 = Math.ceil(level_2 / 30);
            }
            this.analysis_data_s_result_02 = cal_02;
            let cal_03;
            if (level_3 < 1) {
              cal_03 = 0;
            } else if (level_3 < 30) {
              cal_03 = 1;
            } else if (((level_3 / 30)%1) < 1 / 3) {
              cal_03 = Math.floor(level_3 / 30);
            } else {
              cal_03 = Math.ceil(level_3 / 30);
            }
            this.analysis_data_s_result_03 = cal_03;
            this.analysis_data_s_result_sum_room = cal_01 + cal_02 + cal_03;
          } else if (rate_work_course_id == "09") {
            let cal_01;
            if (level_1 < 15) {
              cal_01 = 0;
            } else if (level_1 < 40) {
              cal_01 = 1;
            } else if (((level_1 / 40)%1) < 1 / 4) {
              cal_01 = Math.floor(level_1 / 40);
            } else {
              cal_01 = Math.ceil(level_1 / 40);
            }
            this.analysis_data_s_result_01 = cal_01;

            let cal_02;
            if (level_2 < 15) {
              cal_02 = 0;
            } else if (level_2 < 40) {
              cal_02 = 1;
            } else if (((level_2 / 40)%1) < 1 / 4) {
              cal_02 = Math.floor(level_2 / 40);
            } else {
              cal_02 = Math.ceil(level_2 / 40);
            }
            this.analysis_data_s_result_02 = cal_02;

            let cal_03;
            if (level_3 < 15) {
              cal_03 = 0;
            } else if (level_3 < 40) {
              cal_03 = 1;
            } else if (((level_3 / 40)%1) < 1 / 4) {
              cal_03 = Math.floor(level_3 / 40);
            } else {
              cal_03 = Math.ceil(level_3 / 40);
            }
            this.analysis_data_s_result_03 = cal_03;

            this.analysis_data_s_result_sum_room = cal_01 + cal_02 + cal_03;
          } else {
            let cal_01;
            if (level_1 < 15) {
              cal_01 = 0;
            } else if (level_1 < 30) {
              cal_01 = 1;
            } else if (((level_1 / 30)%1)< 1 / 3) {
              cal_01 = Math.floor(level_1 / 30);
            } else {
              cal_01 = Math.ceil(level_1 / 30);
            }
            this.analysis_data_s_result_01 = cal_01;

            let cal_02;
            if (level_2 < 15) {
              cal_02 = 0;
            } else if (level_2 < 30) {
              cal_02 = 1;
            } else if (((level_2 / 30)%1) < 1 / 3) {
              cal_02 = Math.floor(level_2 / 30);
            } else {
              cal_02 = Math.ceil(level_2 / 30);
            }
            this.analysis_data_s_result_02 = cal_02;

            let cal_03;
            if (level_3 < 15) {
              cal_03 = 0;
            } else if (level_3 < 30) {
              cal_03 = 1;
            } else if (((level_3 / 30)%1) < 1 / 3) {
              cal_03 = Math.floor(level_3 / 30);
            } else {
              cal_03 = Math.ceil(level_3 / 30);
            }
            this.analysis_data_s_result_03 = cal_03;

            this.analysis_data_s_result_sum_room = cal_01 + cal_02 + cal_03;
          }
        } else if (rate_work_college_id_class == "30") {
          if (
            rate_work_course_id == "02" ||
            rate_work_course_id == "04" ||
            rate_work_course_id == "07"
          ) {
            let cal_01;
            if (level_1 < 1) {
              cal_01 = 0;
            } else if (level_1 < 30) {
              cal_01 = 1;
            } else if (((level_1 / 30)%1)< 1 / 3) {
              cal_01 = Math.floor(level_1 / 30);
            } else {
              cal_01 = Math.ceil(level_1 / 30);
            }
            this.analysis_data_s_result_01 = cal_01;

            let cal_02;
            if (level_2 < 1) {
              cal_02 = 0;
            } else if (level_2 < 30) {
              cal_02 = 1;
            } else if (((level_2 / 30)%1) < 1 / 3) {
              cal_02 = Math.floor(level_2 / 30);
            } else {
              cal_02 = Math.ceil(level_2 / 30);
            }
            this.analysis_data_s_result_02 = cal_02;

            this.analysis_data_s_result_sum_room = cal_01 + cal_02;
          } else {
            let cal_01;
            if (level_1 < 15) {
              cal_01 = 0;
            } else if (level_1 < 30) {
              cal_01 = 1;
            } else if (((level_1 / 30)%1)< 1 / 3) {
              cal_01 = Math.floor(level_1 / 30);
            } else {
              cal_01 = Math.ceil(level_1 / 30);
            }
            this.analysis_data_s_result_01 = cal_01;

            let cal_02;
            if (level_2 < 15) {
              cal_02 = 0;
            } else if (level_2 < 30) {
              cal_02 = 1;
            } else if (((level_2 / 30)%1) < 1 / 3) {
              cal_02 = Math.floor(level_2 / 30);
            } else {
              cal_02 = Math.ceil(level_2 / 30);
            }
            this.analysis_data_s_result_02 = cal_02;

            this.analysis_data_s_result_sum_room = cal_01 + cal_02;
          }
        }
      }
      //8 วิทยาลัยเทคโนโลยีและการจัดการ 01 อุตสาหกรรม[30] 02 พาณิชยกรรม/บริหารธุรกิจ[40] 08 อุตสาหกรรมสิ่งทอ[30]
      else if (user_type == "2") {
        if (rate_work_college_id_class == "20") {
          if (rate_work_course_id == "01" || rate_work_course_id == "08") {
            let cal_01;
            if (level_1 < 1) {
              cal_01 = 0;
            } else if (level_1 < 30) {
              cal_01 = 1;
            } else if (((level_1 / 30)%1)< 1 / 3) {
              cal_01 = Math.floor(level_1 / 30);
            } else {
              cal_01 = Math.ceil(level_1 / 30);
            }
            this.analysis_data_s_result_01 = cal_01;

            let cal_02;
            if (level_2 < 1) {
              cal_02 = 0;
            } else if (level_2 < 30) {
              cal_02 = 1;
            } else if (((level_2 / 30)%1) < 1 / 3) {
              cal_02 = Math.floor(level_2 / 30);
            } else {
              cal_02 = Math.ceil(level_2 / 30);
            }
            this.analysis_data_s_result_02 = cal_02;

            let cal_03;
            if (level_3 < 1) {
              cal_03 = 0;
            } else if (level_3 < 30) {
              cal_03 = 1;
            } else if (((level_3 / 30)%1) < 1 / 3) {
              cal_03 = Math.floor(level_3 / 30);
            } else {
              cal_03 = Math.ceil(level_3 / 30);
            }
            this.analysis_data_s_result_03 = cal_03;

            this.analysis_data_s_result_sum_room = cal_01 + cal_02 + cal_03;
          } else if (rate_work_course_id == "09") {
            let cal_01;
            if (level_1 < 15) {
              cal_01 = 0;
            } else if (level_1 < 40) {
              cal_01 = 1;
            } else if (((level_1 / 40)%1) < 1 / 4) {
              cal_01 = Math.floor(level_1 / 40);
            } else {
              cal_01 = Math.ceil(level_1 / 40);
            }
            this.analysis_data_s_result_01 = cal_01;

            let cal_02;
            if (level_2 < 15) {
              cal_02 = 0;
            } else if (level_2 < 40) {
              cal_02 = 1;
            } else if (((level_2 / 40)%1) < 1 / 4) {
              cal_02 = Math.floor(level_2 / 40);
            } else {
              cal_02 = Math.ceil(level_2 / 40);
            }
            this.analysis_data_s_result_02 = cal_02;

            let cal_03;
            if (level_3 < 15) {
              cal_03 = 0;
            } else if (level_3 < 40) {
              cal_03 = 1;
            } else if (((level_3 / 40)%1) < 1 / 4) {
              cal_03 = Math.floor(level_3 / 40);
            } else {
              cal_03 = Math.ceil(level_3 / 40);
            }
            this.analysis_data_s_result_03 = cal_03;

            this.analysis_data_s_result_sum_room = cal_01 + cal_02 + cal_03;
          } else if (rate_work_course_id == "02") {
            let cal_01;
            if (level_1 < 1) {
              cal_01 = 0;
            } else if (level_1 < 40) {
              cal_01 = 1;
            } else if (((level_1 / 40)%1) < 1 / 4) {
              cal_01 = Math.floor(level_1 / 40);
            } else {
              cal_01 = Math.ceil(level_1 / 40);
            }
            this.analysis_data_s_result_01 = cal_01;

            let cal_02;
            if (level_2 < 1) {
              cal_02 = 0;
            } else if (level_2 < 40) {
              cal_02 = 1;
            } else if (((level_2 / 40)%1) < 1 / 4) {
              cal_02 = Math.floor(level_2 / 40);
            } else {
              cal_02 = Math.ceil(level_2 / 40);
            }
            this.analysis_data_s_result_02 = cal_02;

            let cal_03;
            if (level_3 < 1) {
              cal_03 = 0;
            } else if (level_3 < 40) {
              cal_03 = 1;
            } else if (((level_3 / 40)%1) < 1 / 4) {
              cal_03 = Math.floor(level_3 / 40);
            } else {
              cal_03 = Math.ceil(level_3 / 40);
            }
            this.analysis_data_s_result_03 = cal_03;

            this.analysis_data_s_result_sum_room = cal_01 + cal_02 + cal_03;
          } else {
            let cal_01;
            if (level_1 < 15) {
              cal_01 = 0;
            } else if (level_1 < 30) {
              cal_01 = 1;
            } else if (((level_1 / 30)%1)< 1 / 3) {
              cal_01 = Math.floor(level_1 / 30);
            } else {
              cal_01 = Math.ceil(level_1 / 30);
            }
            this.analysis_data_s_result_01 = cal_01;

            let cal_02;
            if (level_2 < 15) {
              cal_02 = 0;
            } else if (level_2 < 30) {
              cal_02 = 1;
            } else if (((level_2 / 30)%1) < 1 / 3) {
              cal_02 = Math.floor(level_2 / 30);
            } else {
              cal_02 = Math.ceil(level_2 / 30);
            }
            this.analysis_data_s_result_02 = cal_02;

            let cal_03;
            if (level_3 < 15) {
              cal_03 = 0;
            } else if (level_3 < 30) {
              cal_03 = 1;
            } else if (((level_3 / 30)%1) < 1 / 3) {
              cal_03 = Math.floor(level_3 / 30);
            } else {
              cal_03 = Math.ceil(level_3 / 30);
            }
            this.analysis_data_s_result_03 = cal_03;

            this.analysis_data_s_result_sum_room = cal_01 + cal_02 + cal_03;
          }
        } else if (rate_work_college_id_class == "30") {
          if (
            rate_work_course_id == "01" ||
            rate_work_course_id == "02" ||
            rate_work_course_id == "08"
          ) {
            let cal_01;
            if (level_1 < 1) {
              cal_01 = 0;
            } else if (level_1 < 30) {
              cal_01 = 1;
            } else if (((level_1 / 30)%1)< 1 / 3) {
              cal_01 = Math.floor(level_1 / 30);
            } else {
              cal_01 = Math.ceil(level_1 / 30);
            }
            this.analysis_data_s_result_01 = cal_01;

            let cal_02;
            if (level_2 < 1) {
              cal_02 = 0;
            } else if (level_2 < 30) {
              cal_02 = 1;
            } else if (((level_2 / 30)%1) < 1 / 3) {
              cal_02 = Math.floor(level_2 / 30);
            } else {
              cal_02 = Math.ceil(level_2 / 30);
            }
            this.analysis_data_s_result_02 = cal_02;

            this.analysis_data_s_result_sum_room = cal_01 + cal_02;
          } else {
            let cal_01;
            if (level_1 < 15) {
              cal_01 = 0;
            } else if (level_1 < 30) {
              cal_01 = 1;
            } else if (((level_1 / 30)%1)< 1 / 3) {
              cal_01 = Math.floor(level_1 / 30);
            } else {
              cal_01 = Math.ceil(level_1 / 30);
            }
            this.analysis_data_s_result_01 = cal_01;

            let cal_02;
            if (level_2 < 15) {
              cal_02 = 0;
            } else if (level_2 < 30) {
              cal_02 = 1;
            } else if (((level_2 / 30)%1) < 1 / 3) {
              cal_02 = Math.floor(level_2 / 30);
            } else {
              cal_02 = Math.ceil(level_2 / 30);
            }
            this.analysis_data_s_result_02 = cal_02;

            this.analysis_data_s_result_sum_room = cal_01 + cal_02;
          }
        }
      }

      //9 วิทยาลัยเกษตรและเทคโนโลยี 05 เกษตรกรรม[30] 06 ประมง[30]
      else if (user_type == "9") {
        if (rate_work_college_id_class == "20") {
          if (rate_work_course_id == "05" || rate_work_course_id == "06") {
            let cal_01;
            if (level_1 < 1) {
              cal_01 = 0;
            } else if (level_1 < 30) {
              cal_01 = 1;
            } else if (((level_1 / 30)%1)< 1 / 3) {
              cal_01 = Math.floor(level_1 / 30);
            } else {
              cal_01 = Math.ceil(level_1 / 30);
            }
            this.analysis_data_s_result_01 = cal_01;

            let cal_02;
            if (level_2 < 1) {
              cal_02 = 0;
            } else if (level_2 < 30) {
              cal_02 = 1;
            } else if (((level_2 / 30)%1) < 1 / 3) {
              cal_02 = Math.floor(level_2 / 30);
            } else {
              cal_02 = Math.ceil(level_2 / 30);
            }
            this.analysis_data_s_result_02 = cal_02;

            let cal_03;
            if (level_3 < 1) {
              cal_03 = 0;
            } else if (level_3 < 30) {
              cal_03 = 1;
            } else if (((level_3 / 30)%1) < 1 / 3) {
              cal_03 = Math.floor(level_3 / 30);
            } else {
              cal_03 = Math.ceil(level_3 / 30);
            }
            this.analysis_data_s_result_03 = cal_03;

            this.analysis_data_s_result_sum_room = cal_01 + cal_02 + cal_03;
          } else if (
            rate_work_course_id == "02" ||
            rate_work_course_id == "09"
          ) {
            let cal_01;
            if (level_1 < 15) {
              cal_01 = 0;
            } else if (level_1 < 40) {
              cal_01 = 1;
            } else if (((level_1 / 40)%1) < 1 / 4) {
              cal_01 = Math.floor(level_1 / 40);
            } else {
              cal_01 = Math.ceil(level_1 / 40);
            }
            this.analysis_data_s_result_01 = cal_01;

            let cal_02;
            if (level_2 < 15) {
              cal_02 = 0;
            } else if (level_2 < 40) {
              cal_02 = 1;
            } else if (((level_2 / 40)%1) < 1 / 4) {
              cal_02 = Math.floor(level_2 / 40);
            } else {
              cal_02 = Math.ceil(level_2 / 40);
            }
            this.analysis_data_s_result_02 = cal_02;

            let cal_03;
            if (level_3 < 15) {
              cal_03 = 0;
            } else if (level_3 < 40) {
              cal_03 = 1;
            } else if (((level_3 / 40)%1) < 1 / 4) {
              cal_03 = Math.floor(level_3 / 40);
            } else {
              cal_03 = Math.ceil(level_3 / 40);
            }
            this.analysis_data_s_result_03 = cal_03;

            this.analysis_data_s_result_sum_room = cal_01 + cal_02 + cal_03;
          } else {
            let cal_01;
            if (level_1 < 15) {
              cal_01 = 0;
            } else if (level_1 < 30) {
              cal_01 = 1;
            } else if (((level_1 / 30)%1)< 1 / 3) {
              cal_01 = Math.floor(level_1 / 30);
            } else {
              cal_01 = Math.ceil(level_1 / 30);
            }
            this.analysis_data_s_result_01 = cal_01;

            let cal_02;
            if (level_2 < 15) {
              cal_02 = 0;
            } else if (level_2 < 30) {
              cal_02 = 1;
            } else if (((level_2 / 30)%1) < 1 / 3) {
              cal_02 = Math.floor(level_2 / 30);
            } else {
              cal_02 = Math.ceil(level_2 / 30);
            }
            this.analysis_data_s_result_02 = cal_02;

            let cal_03;
            if (level_3 < 15) {
              cal_03 = 0;
            } else if (level_3 < 30) {
              cal_03 = 1;
            } else if (((level_3 / 30)%1) < 1 / 3) {
              cal_03 = Math.floor(level_3 / 30);
            } else {
              cal_03 = Math.ceil(level_3 / 30);
            }
            this.analysis_data_s_result_03 = cal_03;

            this.analysis_data_s_result_sum_room = cal_01 + cal_02 + cal_03;
          }
        } else if (rate_work_college_id_class == "30") {
          if (rate_work_course_id == "05" || rate_work_course_id == "06") {
            let cal_01;
            if (level_1 < 1) {
              cal_01 = 0;
            } else if (level_1 < 30) {
              cal_01 = 1;
            } else if (((level_1 / 30)%1)< 1 / 3) {
              cal_01 = Math.floor(level_1 / 30);
            } else {
              cal_01 = Math.ceil(level_1 / 30);
            }
            this.analysis_data_s_result_01 = cal_01;

            let cal_02;
            if (level_2 < 1) {
              cal_02 = 0;
            } else if (level_2 < 30) {
              cal_02 = 1;
            } else if (((level_2 / 30)%1) < 1 / 3) {
              cal_02 = Math.floor(level_2 / 30);
            } else {
              cal_02 = Math.ceil(level_2 / 30);
            }
            this.analysis_data_s_result_02 = cal_02;

            this.analysis_data_s_result_sum_room = cal_01 + cal_02;
          } else {
            let cal_01;
            if (level_1 < 15) {
              cal_01 = 0;
            } else if (level_1 < 30) {
              cal_01 = 1;
            } else if (((level_1 / 30)%1)< 1 / 3) {
              cal_01 = Math.floor(level_1 / 30);
            } else {
              cal_01 = Math.ceil(level_1 / 30);
            }
            this.analysis_data_s_result_01 = cal_01;

            let cal_02;
            if (level_2 < 15) {
              cal_02 = 0;
            } else if (level_2 < 30) {
              cal_02 = 1;
            } else if (((level_2 / 30)%1) < 1 / 3) {
              cal_02 = Math.floor(level_2 / 30);
            } else {
              cal_02 = Math.ceil(level_2 / 30);
            }
            this.analysis_data_s_result_02 = cal_02;

            this.analysis_data_s_result_sum_room = cal_01 + cal_02;
          }
        }
      }

      //10 กาญจนาภิเษกวิทยาลัยช่างทองหลวง 03 ศิลปกรรม[30]
      else if (user_type == "10") {
        if (rate_work_college_id_class == "20") {
          if (rate_work_course_id == "03") {
            let cal_01;
            if (level_1 < 1) {
              cal_01 = 0;
            } else if (level_1 < 30) {
              cal_01 = 1;
            } else if (((level_1 / 30)%1)< 1 / 3) {
              cal_01 = Math.floor(level_1 / 30);
            } else {
              cal_01 = Math.ceil(level_1 / 30);
            }
            this.analysis_data_s_result_01 = cal_01;

            let cal_02;
            if (level_2 < 1) {
              cal_02 = 0;
            } else if (level_2 < 30) {
              cal_02 = 1;
            } else if (((level_2 / 30)%1) < 1 / 3) {
              cal_02 = Math.floor(level_2 / 30);
            } else {
              cal_02 = Math.ceil(level_2 / 30);
            }
            this.analysis_data_s_result_02 = cal_02;

            let cal_03;
            if (level_3 < 1) {
              cal_03 = 0;
            } else if (level_3 < 30) {
              cal_03 = 1;
            } else if (((level_3 / 30)%1) < 1 / 3) {
              cal_03 = Math.floor(level_3 / 30);
            } else {
              cal_03 = Math.ceil(level_3 / 30);
            }
            this.analysis_data_s_result_03 = cal_03;

            this.analysis_data_s_result_sum_room = cal_01 + cal_02 + cal_03;
          } else if (
            rate_work_course_id == "02" ||
            rate_work_course_id == "09"
          ) {
            let cal_01;
            if (level_1 < 15) {
              cal_01 = 0;
            } else if (level_1 < 40) {
              cal_01 = 1;
            } else if (((level_1 / 40)%1) < 1 / 4) {
              cal_01 = Math.floor(level_1 / 40);
            } else {
              cal_01 = Math.ceil(level_1 / 40);
            }
            this.analysis_data_s_result_01 = cal_01;

            let cal_02;
            if (level_2 < 15) {
              cal_02 = 0;
            } else if (level_2 < 40) {
              cal_02 = 1;
            } else if (((level_2 / 40)%1) < 1 / 4) {
              cal_02 = Math.floor(level_2 / 40);
            } else {
              cal_02 = Math.ceil(level_2 / 40);
            }
            this.analysis_data_s_result_02 = cal_02;

            let cal_03;
            if (level_3 < 15) {
              cal_03 = 0;
            } else if (level_3 < 40) {
              cal_03 = 1;
            } else if (((level_3 / 40)%1) < 1 / 4) {
              cal_03 = Math.floor(level_3 / 40);
            } else {
              cal_03 = Math.ceil(level_3 / 40);
            }
            this.analysis_data_s_result_03 = cal_03;

            this.analysis_data_s_result_sum_room = cal_01 + cal_02 + cal_03;
          } else {
            let cal_01;
            if (level_1 < 15) {
              cal_01 = 0;
            } else if (level_1 < 30) {
              cal_01 = 1;
            } else if (((level_1 / 30)%1)< 1 / 3) {
              cal_01 = Math.floor(level_1 / 30);
            } else {
              cal_01 = Math.ceil(level_1 / 30);
            }
            this.analysis_data_s_result_01 = cal_01;

            let cal_02;
            if (level_2 < 15) {
              cal_02 = 0;
            } else if (level_2 < 30) {
              cal_02 = 1;
            } else if (((level_2 / 30)%1) < 1 / 3) {
              cal_02 = Math.floor(level_2 / 30);
            } else {
              cal_02 = Math.ceil(level_2 / 30);
            }
            this.analysis_data_s_result_02 = cal_02;

            let cal_03;
            if (level_3 < 15) {
              cal_03 = 0;
            } else if (level_3 < 30) {
              cal_03 = 1;
            } else if (((level_3 / 30)%1) < 1 / 3) {
              cal_03 = Math.floor(level_3 / 30);
            } else {
              cal_03 = Math.ceil(level_3 / 30);
            }
            this.analysis_data_s_result_03 = cal_03;

            this.analysis_data_s_result_sum_room = cal_01 + cal_02 + cal_03;
          }
        } else if (rate_work_college_id_class == "30") {
          if (rate_work_course_id == "03") {
            let cal_01;
            if (level_1 < 1) {
              cal_01 = 0;
            } else if (level_1 < 30) {
              cal_01 = 1;
            } else if (((level_1 / 30)%1)< 1 / 3) {
              cal_01 = Math.floor(level_1 / 30);
            } else {
              cal_01 = Math.ceil(level_1 / 30);
            }
            this.analysis_data_s_result_01 = cal_01;

            let cal_02;
            if (level_2 < 1) {
              cal_02 = 0;
            } else if (level_2 < 30) {
              cal_02 = 1;
            } else if (((level_2 / 30)%1) < 1 / 3) {
              cal_02 = Math.floor(level_2 / 30);
            } else {
              cal_02 = Math.ceil(level_2 / 30);
            }
            this.analysis_data_s_result_02 = cal_02;

            this.analysis_data_s_result_sum_room = cal_01 + cal_02;
          } else {
            let cal_01;
            if (level_1 < 15) {
              cal_01 = 0;
            } else if (level_1 < 30) {
              cal_01 = 1;
            } else if (((level_1 / 30)%1)< 1 / 3) {
              cal_01 = Math.floor(level_1 / 30);
            } else {
              cal_01 = Math.ceil(level_1 / 30);
            }
            this.analysis_data_s_result_01 = cal_01;

            let cal_02;
            if (level_2 < 15) {
              cal_02 = 0;
            } else if (level_2 < 30) {
              cal_02 = 1;
            } else if (((level_2 / 30)%1) < 1 / 3) {
              cal_02 = Math.floor(level_2 / 30);
            } else {
              cal_02 = Math.ceil(level_2 / 30);
            }
            this.analysis_data_s_result_02 = cal_02;

            this.analysis_data_s_result_sum_room = cal_01 + cal_02;
          }
        }
      }

      //11วิทยาลัยเทคโนโลยีและอุตสาหกรรมการต่อเรือ 01 อุตสาหกรรม[30] 08 อุตสาหกรรมสิ่งทอ[30]
      else if (user_type == "10") {
        if (rate_work_college_id_class == "20") {
          if (rate_work_course_id == "01" || rate_work_course_id == "08") {
            let cal_01;
            if (level_1 < 1) {
              cal_01 = 0;
            } else if (level_1 < 30) {
              cal_01 = 1;
            } else if (((level_1 / 30)%1)< 1 / 3) {
              cal_01 = Math.floor(level_1 / 30);
            } else {
              cal_01 = Math.ceil(level_1 / 30);
            }
            this.analysis_data_s_result_01 = cal_01;

            let cal_02;
            if (level_2 < 1) {
              cal_02 = 0;
            } else if (level_2 < 30) {
              cal_02 = 1;
            } else if (((level_2 / 30)%1) < 1 / 3) {
              cal_02 = Math.floor(level_2 / 30);
            } else {
              cal_02 = Math.ceil(level_2 / 30);
            }
            this.analysis_data_s_result_02 = cal_02;

            let cal_03;
            if (level_3 < 1) {
              cal_03 = 0;
            } else if (level_3 < 30) {
              cal_03 = 1;
            } else if (((level_3 / 30)%1) < 1 / 3) {
              cal_03 = Math.floor(level_3 / 30);
            } else {
              cal_03 = Math.ceil(level_3 / 30);
            }
            this.analysis_data_s_result_03 = cal_03;

            this.analysis_data_s_result_sum_room = cal_01 + cal_02 + cal_03;
          } else if (
            rate_work_course_id == "02" ||
            rate_work_course_id == "09"
          ) {
            let cal_01;
            if (level_1 < 15) {
              cal_01 = 0;
            } else if (level_1 < 40) {
              cal_01 = 1;
            } else if (((level_1 / 40)%1) < 1 / 4) {
              cal_01 = Math.floor(level_1 / 40);
            } else {
              cal_01 = Math.ceil(level_1 / 40);
            }
            this.analysis_data_s_result_01 = cal_01;

            let cal_02;
            if (level_2 < 15) {
              cal_02 = 0;
            } else if (level_2 < 40) {
              cal_02 = 1;
            } else if (((level_2 / 40)%1) < 1 / 4) {
              cal_02 = Math.floor(level_2 / 40);
            } else {
              cal_02 = Math.ceil(level_2 / 40);
            }
            this.analysis_data_s_result_02 = cal_02;

            let cal_03;
            if (level_3 < 15) {
              cal_03 = 0;
            } else if (level_3 < 40) {
              cal_03 = 1;
            } else if (((level_3 / 40)%1) < 1 / 4) {
              cal_03 = Math.floor(level_3 / 40);
            } else {
              cal_03 = Math.ceil(level_3 / 40);
            }
            this.analysis_data_s_result_03 = cal_03;

            this.analysis_data_s_result_sum_room = cal_01 + cal_02 + cal_03;
          } else {
            let cal_01;
            if (level_1 < 15) {
              cal_01 = 0;
            } else if (level_1 < 30) {
              cal_01 = 1;
            } else if (((level_1 / 30)%1)< 1 / 3) {
              cal_01 = Math.floor(level_1 / 30);
            } else {
              cal_01 = Math.ceil(level_1 / 30);
            }
            this.analysis_data_s_result_01 = cal_01;

            let cal_02;
            if (level_2 < 15) {
              cal_02 = 0;
            } else if (level_2 < 30) {
              cal_02 = 1;
            } else if (((level_2 / 30)%1) < 1 / 3) {
              cal_02 = Math.floor(level_2 / 30);
            } else {
              cal_02 = Math.ceil(level_2 / 30);
            }
            this.analysis_data_s_result_02 = cal_02;

            let cal_03;
            if (level_3 < 15) {
              cal_03 = 0;
            } else if (level_3 < 30) {
              cal_03 = 1;
            } else if (((level_3 / 30)%1) < 1 / 3) {
              cal_03 = Math.floor(level_3 / 30);
            } else {
              cal_03 = Math.ceil(level_3 / 30);
            }
            this.analysis_data_s_result_03 = cal_03;

            this.analysis_data_s_result_sum_room = cal_01 + cal_02 + cal_03;
          }
        } else if (rate_work_college_id_class == "30") {
          if (rate_work_course_id == "01" || rate_work_course_id == "08") {
            let cal_01;
            if (level_1 < 1) {
              cal_01 = 0;
            } else if (level_1 < 30) {
              cal_01 = 1;
            } else if (((level_1 / 30)%1)< 1 / 3) {
              cal_01 = Math.floor(level_1 / 30);
            } else {
              cal_01 = Math.ceil(level_1 / 30);
            }
            this.analysis_data_s_result_01 = cal_01;

            let cal_02;
            if (level_2 < 1) {
              cal_02 = 0;
            } else if (level_2 < 30) {
              cal_02 = 1;
            } else if (((level_2 / 30)%1) < 1 / 3) {
              cal_02 = Math.floor(level_2 / 30);
            } else {
              cal_02 = Math.ceil(level_2 / 30);
            }
            this.analysis_data_s_result_02 = cal_02;

            this.analysis_data_s_result_sum_room = cal_01 + cal_02;
          } else {
            let cal_01;
            if (level_1 < 15) {
              cal_01 = 0;
            } else if (level_1 < 30) {
              cal_01 = 1;
            } else if (((level_1 / 30)%1)< 1 / 3) {
              cal_01 = Math.floor(level_1 / 30);
            } else {
              cal_01 = Math.ceil(level_1 / 30);
            }
            this.analysis_data_s_result_01 = cal_01;

            let cal_02;
            if (level_2 < 15) {
              cal_02 = 0;
            } else if (level_2 < 30) {
              cal_02 = 1;
            } else if (((level_2 / 30)%1) < 1 / 3) {
              cal_02 = Math.floor(level_2 / 30);
            } else {
              cal_02 = Math.ceil(level_2 / 30);
            }
            this.analysis_data_s_result_02 = cal_02;

            this.analysis_data_s_result_sum_room = cal_01 + cal_02;
          }
        }
      }

      //12วิทยาลัยประมง 06 ประมง[30]
      else if (user_type == "10") {
        if (rate_work_college_id_class == "20") {
          if (rate_work_course_id == "06") {
            let cal_01;
            if (level_1 < 1) {
              cal_01 = 0;
            } else if (level_1 < 30) {
              cal_01 = 1;
            } else if (((level_1 / 30)%1)< 1 / 3) {
              cal_01 = Math.floor(level_1 / 30);
            } else {
              cal_01 = Math.ceil(level_1 / 30);
            }
            this.analysis_data_s_result_01 = cal_01;

            let cal_02;
            if (level_2 < 1) {
              cal_02 = 0;
            } else if (level_2 < 30) {
              cal_02 = 1;
            } else if (((level_2 / 30)%1) < 1 / 3) {
              cal_02 = Math.floor(level_2 / 30);
            } else {
              cal_02 = Math.ceil(level_2 / 30);
            }
            this.analysis_data_s_result_02 = cal_02;

            let cal_03;
            if (level_3 < 1) {
              cal_03 = 0;
            } else if (level_3 < 30) {
              cal_03 = 1;
            } else if (((level_3 / 30)%1) < 1 / 3) {
              cal_03 = Math.floor(level_3 / 30);
            } else {
              cal_03 = Math.ceil(level_3 / 30);
            }
            this.analysis_data_s_result_03 = cal_03;

            this.analysis_data_s_result_sum_room = cal_01 + cal_02 + cal_03;
          } else if (
            rate_work_course_id == "02" ||
            rate_work_course_id == "09"
          ) {
            let cal_01;
            if (level_1 < 15) {
              cal_01 = 0;
            } else if (level_1 < 40) {
              cal_01 = 1;
            } else if (((level_1 / 40)%1) < 1 / 4) {
              cal_01 = Math.floor(level_1 / 40);
            } else {
              cal_01 = Math.ceil(level_1 / 40);
            }
            this.analysis_data_s_result_01 = cal_01;

            let cal_02;
            if (level_2 < 15) {
              cal_02 = 0;
            } else if (level_2 < 40) {
              cal_02 = 1;
            } else if (((level_2 / 40)%1) < 1 / 4) {
              cal_02 = Math.floor(level_2 / 40);
            } else {
              cal_02 = Math.ceil(level_2 / 40);
            }
            this.analysis_data_s_result_02 = cal_02;

            let cal_03;
            if (level_3 < 15) {
              cal_03 = 0;
            } else if (level_3 < 40) {
              cal_03 = 1;
            } else if (((level_3 / 40)%1) < 1 / 4) {
              cal_03 = Math.floor(level_3 / 40);
            } else {
              cal_03 = Math.ceil(level_3 / 40);
            }
            this.analysis_data_s_result_03 = cal_03;

            this.analysis_data_s_result_sum_room = cal_01 + cal_02 + cal_03;
          } else {
            let cal_01;
            if (level_1 < 15) {
              cal_01 = 0;
            } else if (level_1 < 30) {
              cal_01 = 1;
            } else if (((level_1 / 30)%1)< 1 / 3) {
              cal_01 = Math.floor(level_1 / 30);
            } else {
              cal_01 = Math.ceil(level_1 / 30);
            }
            this.analysis_data_s_result_01 = cal_01;

            let cal_02;
            if (level_2 < 15) {
              cal_02 = 0;
            } else if (level_2 < 30) {
              cal_02 = 1;
            } else if (((level_2 / 30)%1) < 1 / 3) {
              cal_02 = Math.floor(level_2 / 30);
            } else {
              cal_02 = Math.ceil(level_2 / 30);
            }
            this.analysis_data_s_result_02 = cal_02;

            let cal_03;
            if (level_3 < 15) {
              cal_03 = 0;
            } else if (level_3 < 30) {
              cal_03 = 1;
            } else if (((level_3 / 30)%1) < 1 / 3) {
              cal_03 = Math.floor(level_3 / 30);
            } else {
              cal_03 = Math.ceil(level_3 / 30);
            }
            this.analysis_data_s_result_03 = cal_03;

            this.analysis_data_s_result_sum_room = cal_01 + cal_02 + cal_03;
          }
        } else if (rate_work_college_id_class == "30") {
          if (rate_work_course_id == "06") {
            let cal_01;
            if (level_1 < 1) {
              cal_01 = 0;
            } else if (level_1 < 30) {
              cal_01 = 1;
            } else if (((level_1 / 30)%1)< 1 / 3) {
              cal_01 = Math.floor(level_1 / 30);
            } else {
              cal_01 = Math.ceil(level_1 / 30);
            }
            this.analysis_data_s_result_01 = cal_01;

            let cal_02;
            if (level_2 < 1) {
              cal_02 = 0;
            } else if (level_2 < 30) {
              cal_02 = 1;
            } else if (((level_2 / 30)%1) < 1 / 3) {
              cal_02 = Math.floor(level_2 / 30);
            } else {
              cal_02 = Math.ceil(level_2 / 30);
            }
            this.analysis_data_s_result_02 = cal_02;

            this.analysis_data_s_result_sum_room = cal_01 + cal_02;
          } else {
            let cal_01;
            if (level_1 < 15) {
              cal_01 = 0;
            } else if (level_1 < 30) {
              cal_01 = 1;
            } else if (((level_1 / 30)%1)< 1 / 3) {
              cal_01 = Math.floor(level_1 / 30);
            } else {
              cal_01 = Math.ceil(level_1 / 30);
            }
            this.analysis_data_s_result_01 = cal_01;

            let cal_02;
            if (level_2 < 15) {
              cal_02 = 0;
            } else if (level_2 < 30) {
              cal_02 = 1;
            } else if (((level_2 / 30)%1) < 1 / 3) {
              cal_02 = Math.floor(level_2 / 30);
            } else {
              cal_02 = Math.ceil(level_2 / 30);
            }
            this.analysis_data_s_result_02 = cal_02;

            this.analysis_data_s_result_sum_room = cal_01 + cal_02;
          }
        }
      }

      // คำนวณอัตรากำลัง ปวช. ปวส.
      if (
        rate_work_course_id == "03" ||
        rate_work_course_id == "05" ||
        rate_work_course_id == "06"
      ) {
        let cal_man;
        if (rate_work_college_id_class == "20") {
          cal_man = (21 * this.analysis_data_s_result_sum_room) / 15;
        } else if (rate_work_college_id_class == "30") {
          cal_man = (25 * this.analysis_data_s_result_sum_room) / 10;
        }
        this.analysis_data_man_power_cal = cal_man;
      } else {
        let cal_man;
        if (rate_work_college_id_class == "20") {
          cal_man = (21 * this.analysis_data_s_result_sum_room) / 18;
        } else if (rate_work_college_id_class == "30") {
          cal_man = (25 * this.analysis_data_s_result_sum_room) / 15;
        }
        this.analysis_data_man_power_cal = cal_man;
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
    date_today() {
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, "0");
      let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      let yyyy = today.getFullYear();

      today = yyyy + "-" + mm + "-" + dd;
      return today;
    },
    year_now() {
      let today = new Date();
      let yyyy = today.getFullYear() + 543;
      today = yyyy;
      return today;
    },
    color() {
      return "teal darken-4";
    }
  }
};
</script>
