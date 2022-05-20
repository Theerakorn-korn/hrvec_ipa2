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
                <v-icon large left>mdi-file-send</v-icon>ข้อมูลสถานศึกษา
                อัตรากำลังบุคลากร ข้อมูลนักเรียนนักศึกษา ข้อมูลห้องเรียน
                ประเภทวิทยาลัย : {{ user.college_id_code_type_manpower }}
              </h2>
            </template>

            <v-row>
              <v-col cols="12" md="12">
                <v-row>
                  <v-col cols="12" md="12">
                    <v-card class="mb-4 pa-2">
                      <v-row>
                        <v-col cols="12" md="6" class="text-center"
                          ><v-alert outlined border="left" type="info">
                            <h2>
                              อัตรากำลังในสถานศึกษา
                              <v-select
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
                                label="เลือกปีเพื่อแสดงข้อมูลที่เคยได้บันทึกรายการ : "
                              >
                              </v-select>
                            </h2>
                          </v-alert>
                        </v-col>
                        <v-col cols="12" md="6" class="text-right">
                          <v-btn
                          v-if="period_colleges.period_college_enable ==='1' && period_colleges.period_college_type ==='update_college'"
                            large
                            right
                            depressed
                            color="primary"
                            @click.native="rate_work_collegeAdd()"
                          >
                            <v-icon>mdi-plus-circle-outline</v-icon
                            >เพิ่มรายการประเภทวิชา ปวช./ปวส.
                          </v-btn>
                        </v-col>
                      </v-row>
                      <v-card>
                        <v-card-title>
                          <h3>ระดับประกาศนียบัตรวิชาชีพ (ปวช).</h3>
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
                          :search="search_course"
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
                              <td class="text-left">
                                {{ item.rate_work_course_id }}
                              </td>
                              <td class="text-left">
                                {{ item.type_course }}
                              </td>
                              <td class="text-center">
                                <v-chip color="teal lighten-2" dark>
                                  <h2>{{ item.year_course }}</h2>
                                </v-chip>
                              </td>
                              <td class="text-left">
                                {{ item.rate_id_course_branch }}
                              </td>

                              <td class="text-center">
                                <v-chip color="teal lighten-2" dark>
                                  <h2>{{ item.branch_name_th }}</h2>
                                </v-chip>
                              </td>
                              <td class="text-center">
                                {{
                                  item.update_time
                                    | moment("add", "543 years")
                                    | moment("D MMMM YYYY")
                                }}
                              </td>
                              <td class="text-center">
                                <v-btn
                                  class="mx-2"
                                  small
                                  fab
                                  dark
                                  color="indigo"
                                  @click="
                                    field_study_lavel_update(
                                      item.rate_work_college_id
                                    )
                                  "
                                  ><v-icon dark>
                                    mdi-update
                                  </v-icon></v-btn
                                >
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
                              <td class="text-center">                               

                                <v-icon
                                  color="red"
                                  @click.stop="
                                    rate_work_collegeDelete(
                                      item.rate_work_college_id
                                    )
                                  "
                                >
                                  mdi-delete
                                </v-icon>
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
                          <h3>ระดับประกาศนียบัตรวิชาชีพชั้นสูง (ปวส).</h3>
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
                          :search="search_course"
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
                              <td class="text-left">
                                {{ item.rate_work_course_id }}
                              </td>
                              <td class="text-left">
                                {{ item.type_course }}
                              </td>
                              <td class="text-left">
                                <v-chip color="info" dark>
                                  <h2>{{ item.year_course }}</h2>
                                </v-chip>
                              </td>
                              <td class="text-left">
                                {{ item.rate_id_course_branch }}
                              </td>

                              <td class="text-center">
                                <v-chip color="info" dark>
                                  <h2>{{ item.branch_name_th }}</h2>
                                </v-chip>
                              </td>
                              <td class="text-center">
                                {{
                                  item.update_time
                                    | moment("add", "543 years")
                                    | moment("D MMMM YYYY")
                                }}
                              </td>
                              <td class="text-center">
                                <v-btn
                                  class="mx-2"
                                  small
                                  fab
                                  dark
                                  color="indigo"
                                  @click="
                                    field_study_lavel_update_30(
                                      item.rate_work_college_id
                                    )
                                  "
                                  ><v-icon dark>
                                    mdi-update
                                  </v-icon></v-btn
                                >
                                <!--  <v-icon
                                large
                                color="info"
                                @click.stop="
                                  rate_work_report(item.rate_work_course_id)
                                "
                              >
                                mdi-account-star
                              </v-icon> -->
                              </td>
                              <td class="text-left">
                                {{ item.rate_work_field_study_lavel_1 }}
                              </td>
                              <td class="text-left">
                                {{ item.rate_work_field_study_lavel_2 }}
                              </td>
                              <td class="text-center">   
                                <v-icon
                                  color="red"
                                  @click.stop="
                                    rate_work_collegeDelete(
                                      item.rate_work_college_id
                                    )
                                  "
                                >
                                  mdi-delete
                                </v-icon>
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
                          <h3>จำนวนผู้เรียนหลักสูตรระยะสั้น</h3>
                        </v-card-title>
                        <v-row>
                          <v-col cols="12" md="12" class="text-right">
                            <v-btn
                            v-if="period_colleges.period_college_enable ==='1' && period_colleges.period_college_type ==='update_college'"
                              large
                              right
                              depressed
                              color="primary"
                              @click.native="rate_work_college_sc_Add()"
                            >
                              <v-icon class="ma-1"
                                >mdi-plus-circle-outline</v-icon
                              >เพิ่มจำนวนผู้เรียนในหลักสูตรระยะสั้น
                            </v-btn>
                          </v-col>
                        </v-row>

                        <v-col cols="12" md="12">
                          <v-data-table
                            color="success"
                            :loading="loading"
                            :headers="headers_s_course"
                            :items="rate_work_sc_all"
                            :search="search_course"
                          >
                            <template v-slot:[`item`]="{ item, index }">
                              <tr>
                                <td class="text-center">{{ index + 1 }}</td>
                                <td class="text-center">
                                  {{ item.rate_sc_year }}
                                </td>
                                <td class="text-center">
                                  {{ item.short_course_name }}
                                </td>
                                <td class="text-center">
                                  {{ item.hours_teaching }}
                                </td>
                                <td class="text-center">{{ item.gen_1 }}</td>
                                <td class="text-center">{{ item.gen_2 }}</td>
                                <td class="text-center">{{ item.gen_3 }}</td>
                                <td class="text-center">{{ item.gen_4 }}</td>
                                <td class="text-center">{{ item.gen_5 }}</td>
                                <td class="text-center">{{ item.gen_6 }}</td>
                                <td class="text-center">{{ item.gen_7 }}</td>
                                <td class="text-center">{{ item.gen_8 }}</td>
                                <td class="text-center">{{ item.gen_9 }}</td>
                                <td class="text-center">{{ item.gen_10 }}</td>
                                <td class="text-center">{{ item.gen_11 }}</td>
                                <td class="text-center">{{ item.gen_12 }}</td>
                                <td class="text-center">{{ item.gen_13 }}</td>
                                <td class="text-center">{{ item.gen_14 }}</td>
                                <td class="text-center">{{ item.gen_15 }}</td>
                                <td class="text-center">{{ item.gen_16 }}</td>
                                <td class="text-center">{{ item.gen_17 }}</td>
                                <td class="text-center">{{ item.gen_18 }}</td>
                                <td class="text-center">{{ item.gen_19 }}</td>
                                <td class="text-center">{{ item.gen_20 }}</td>
                                <td class="text-center">{{ item.gen_21 }}</td>
                                <td class="text-center">{{ item.gen_22 }}</td>
                                <td class="text-center">{{ item.gen_23 }}</td>
                                <td class="text-center">{{ item.gen_24 }}</td>
                                <td class="text-center">{{ item.gen_25 }}</td>
                                <td class="text-center">
                                  {{ item.rate_work_sc_sum }}
                                </td>
                                <td class="text-center">
                                  {{ item.rate_work_sc_room_sum }}
                                </td>
                                <td class="text-center">
                                  {{ item.rate_work_sc_hours }}
                                </td>
                                <td class="text-center">
                                  <v-icon
                                    class="pa-5"
                                    color="yellow"
                                    @click.stop="
                                      rate_work_sc_Edit(item.rate_sc_id)
                                    "
                                  >
                                    mdi-pencil
                                  </v-icon>

                                  <v-icon
                                    color="red"
                                    @click.stop="
                                      rate_work_sc_Delete(item.rate_sc_id)
                                    "
                                  >
                                    mdi-delete
                                  </v-icon>
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
                        </v-col>
                      </v-card>
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </base-material-card>
        </v-col>
      </v-row>

      <!--addrate_work_collegedialog  -->
      <v-layout row justify-center>
        <v-dialog
          v-model="addrate_work_collegedialog"
          persistent
          max-width="80%"
          overlay-opacity="0.6"
        >
          <v-card class="mx-auto pa-5">
            <v-row>
              <v-col cols="12" md="12" class="text-right">
                <v-icon large @click.stop="addrate_work_collegedialog = false">
                  mdi-close
                </v-icon>
              </v-col>
            </v-row>
            <base-material-card
              icon="mdi-clipboard-text"
              title="บันทึกข้อมูลประเภทวิชา/หมวดวิชา/สาขาวิชา"
              class="px-5 py-3 text_google"
            ></base-material-card>
            <v-card-text class="text_google">
              <v-form ref="addrate_work_collegeform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md12>
                      <v-row>
                        <v-col cols="12" lg="6" class="text-right">
                          <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="ค้นหา ระบุคำ หรือ ส่วนข้อความเกี่ยวข้อง"
                            filled
                            class="mb-2"
                          />
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-autocomplete
                            filled
                            label="ประเภทวิชา/หมวดวิชา : "
                            v-model="course_select_main"
                            :items="rate_work_course_stds_autocompl"
                            item-text="course_select"
                            item-value="id_type_course"
                            @change="course_select()"
                          >
                          </v-autocomplete>
                        </v-col>
                        <v-col cols="12" md="12">
                          <v-card>
                            <v-data-table
                              color="success"
                              :loading="loading"
                              :headers="headers_course"
                              :items="rate_work_course_stds"
                              :search="search"
                              :items-per-page="200"
                            >

                            <template v-slot:[`item.year_course`]="{ item }">
                             
                                <v-chip v-if="item.year_course === 'ปวช.62'" color="info" dark>
                                   <h3> ปวช.</h3>
                                </v-chip>
                                <v-chip v-else color="blue darken-4" dark>
                                     <h3>ปวส.</h3> 
                                </v-chip>
                            </template>
                              <template v-slot:[`item.actions`]="{ item }">
                                <v-chip
                                  v-if="item.rate_id_course_branch === null"
                                  dark
                                  color="green"
                                  @click.stop="
                                    rate_work_course_std_select(
                                      item.id_course_branch
                                    )
                                  "
                                >
                                  <v-icon class="pa-1">
                                    mdi-checkbox-marked-circle
                                  </v-icon>
                                  <h2>เลือกบันทึกสาขาวิชา</h2>
                                </v-chip>
                                <v-chip
                                  v-else
                                  dark
                                  color="warning"
                                  @click.stop="
                                    rate_work_course_std_select(
                                      item.id_course_branch
                                    )
                                  "
                                >
                                  <v-icon class="pa-1">
                                    mdi-close
                                  </v-icon>
                                  <h2>ยกเลิก</h2>
                                </v-chip>
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
                        </v-col>
                      </v-row>
                    </v-flex>
                  </v-layout>
                  <v-spacer></v-spacer>
                  <v-row>
                    <v-col cols="12" md="12" class="text-right">
                      <v-btn
                        large
                        color="warning"
                        @click.stop="addrate_work_collegedialog = false"
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

      <!-- addrate_work_college_sc_dialog -->

      <v-layout row justify-center>
        <v-dialog
          v-model="addrate_work_college_sc_dialog"
          persistent
          max-width="80%"
          overlay-opacity="0.6"
        >
          <v-card class="mx-auto pa-5">
            <base-material-card
              icon="mdi-clipboard-text"
              title="บันทึกข้อมูล จำนวนผู้เรียนในหลักสูตรระยะสั้น จำแนกตามหลักสูตรและชั่วโมงเรียน"
              class="px-5 py-3 text_google"
            >
              <v-col class="text-right">
                ปีการศึกษา : {{ year_now }} รหัสสถานศึกษา : {{ user.user_name }}
              </v-col>
            </base-material-card>
            <v-card-text class="text_google">
              <v-form ref="addrate_work_college_sc_dialogform" lazy-validation>
                <v-container grid-list-md>
                  <v-card class="pa-2">
                    <v-layout wrap>
                      <v-flex md6>
                        <v-text-field
                          v-model="addrate_work_sc.short_course_name"
                          label="ชื่อหลักสูตรระยะสั้น"
                          outlined
                          :rules="[v => !!v || '']"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md6>
                        <v-text-field
                          v-model="addrate_work_sc.hours_teaching"
                          label="จำนวนชั่วโมงสอนหลักสูตร"
                          outlined
                          type="number"
                          suffix="ชม."
                          autofocus
                          required
                          :rules="[v => !!v || '']"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md2>
                        <v-text-field
                          v-model="addrate_work_sc.gen_1"
                          label="รุ่นที่ 1"
                          outlined
                          type="number"
                          value="0"
                          suffix="คน"
                          @change="cal_sum_addrate_work_sc()"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md2>
                        <v-text-field
                          v-model="addrate_work_sc.gen_2"
                          label="รุ่นที่ 2"
                          outlined
                          type="number"
                          value="0"
                          suffix="คน"
                          @change="cal_sum_addrate_work_sc()"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md2>
                        <v-text-field
                          v-model="addrate_work_sc.gen_3"
                          label="รุ่นที่ 3"
                          outlined
                          type="number"
                          value="0"
                          suffix="คน"
                          @change="cal_sum_addrate_work_sc()"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md2>
                        <v-text-field
                          v-model="addrate_work_sc.gen_4"
                          label="รุ่นที่ 4"
                          outlined
                          type="number"
                          value="0"
                          suffix="คน"
                          @change="cal_sum_addrate_work_sc()"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md2>
                        <v-text-field
                          v-model="addrate_work_sc.gen_5"
                          label="รุ่นที่ 5"
                          outlined
                          type="number"
                          value="0"
                          suffix="คน"
                          @change="cal_sum_addrate_work_sc()"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md2>
                        <v-text-field
                          v-model="addrate_work_sc.gen_6"
                          label="รุ่นที่ 6"
                          outlined
                          type="number"
                          value="0"
                          suffix="คน"
                          @change="cal_sum_addrate_work_sc()"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md2>
                        <v-text-field
                          v-model="addrate_work_sc.gen_7"
                          label="รุ่นที่ 7"
                          outlined
                          type="number"
                          value="0"
                          suffix="คน"
                          @change="cal_sum_addrate_work_sc()"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md2>
                        <v-text-field
                          v-model="addrate_work_sc.gen_8"
                          label="รุ่นที่ 8"
                          outlined
                          type="number"
                          value="0"
                          suffix="คน"
                          @change="cal_sum_addrate_work_sc()"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md2>
                        <v-text-field
                          v-model="addrate_work_sc.gen_9"
                          label="รุ่นที่ 9"
                          outlined
                          type="number"
                          value="0"
                          suffix="คน"
                          @change="cal_sum_addrate_work_sc()"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md2>
                        <v-text-field
                          v-model="addrate_work_sc.gen_10"
                          label="รุ่นที่ 10"
                          outlined
                          type="number"
                          value="0"
                          suffix="คน"
                          @change="cal_sum_addrate_work_sc()"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md2>
                        <v-text-field
                          v-model="addrate_work_sc.gen_11"
                          label="รุ่นที่ 11"
                          outlined
                          type="number"
                          value="0"
                          suffix="คน"
                          @change="cal_sum_addrate_work_sc()"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md2>
                        <v-text-field
                          v-model="addrate_work_sc.gen_12"
                          label="รุ่นที่ 12"
                          outlined
                          type="number"
                          value="0"
                          suffix="คน"
                          @change="cal_sum_addrate_work_sc()"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md2>
                        <v-text-field
                          v-model="addrate_work_sc.gen_13"
                          label="รุ่นที่ 13"
                          outlined
                          type="number"
                          value="0"
                          suffix="คน"
                          @change="cal_sum_addrate_work_sc()"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md2>
                        <v-text-field
                          v-model="addrate_work_sc.gen_14"
                          label="รุ่นที่ 14"
                          outlined
                          type="number"
                          value="0"
                          suffix="คน"
                          @change="cal_sum_addrate_work_sc()"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md2>
                        <v-text-field
                          v-model="addrate_work_sc.gen_15"
                          label="รุ่นที่ 15"
                          outlined
                          type="number"
                          value="0"
                          suffix="คน"
                          @change="cal_sum_addrate_work_sc()"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md2>
                        <v-text-field
                          v-model="addrate_work_sc.gen_16"
                          label="รุ่นที่ 16"
                          outlined
                          type="number"
                          value="0"
                          suffix="คน"
                          @change="cal_sum_addrate_work_sc()"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md2>
                        <v-text-field
                          v-model="addrate_work_sc.gen_17"
                          label="รุ่นที่ 17"
                          outlined
                          type="number"
                          value="0"
                          suffix="คน"
                          @change="cal_sum_addrate_work_sc()"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md2>
                        <v-text-field
                          v-model="addrate_work_sc.gen_18"
                          label="รุ่นที่ 18"
                          outlined
                          type="number"
                          value="0"
                          suffix="คน"
                          @change="cal_sum_addrate_work_sc()"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md2>
                        <v-text-field
                          v-model="addrate_work_sc.gen_19"
                          label="รุ่นที่ 19"
                          outlined
                          type="number"
                          value="0"
                          suffix="คน"
                          @change="cal_sum_addrate_work_sc()"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md2>
                        <v-text-field
                          v-model="addrate_work_sc.gen_20"
                          label="รุ่นที่ 20"
                          outlined
                          type="number"
                          value="0"
                          suffix="คน"
                          @change="cal_sum_addrate_work_sc()"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md2>
                        <v-text-field
                          v-model="addrate_work_sc.gen_21"
                          label="รุ่นที่ 21"
                          outlined
                          type="number"
                          value="0"
                          suffix="คน"
                          @change="cal_sum_addrate_work_sc()"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md2>
                        <v-text-field
                          v-model="addrate_work_sc.gen_22"
                          label="รุ่นที่ 22"
                          outlined
                          type="number"
                          value="0"
                          suffix="คน"
                          @change="cal_sum_addrate_work_sc()"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md2>
                        <v-text-field
                          v-model="addrate_work_sc.gen_23"
                          label="รุ่นที่ 23"
                          outlined
                          type="number"
                          value="0"
                          suffix="คน"
                          @change="cal_sum_addrate_work_sc()"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md2>
                        <v-text-field
                          v-model="addrate_work_sc.gen_24"
                          label="รุ่นที่ 24"
                          outlined
                          type="number"
                          value="0"
                          suffix="คน"
                          @change="cal_sum_addrate_work_sc()"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md2>
                        <v-text-field
                          v-model="addrate_work_sc.gen_25"
                          label="รุ่นที่ 25"
                          outlined
                          type="number"
                          value="0"
                          suffix="คน"
                          @change="cal_sum_addrate_work_sc()"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md10 class="text-center">
                        <h3>จำนวนผู้เรียนรวม : {{ sum_rate_work_sc }} คน</h3>
                        <h3>ห้องเรียนรวม : {{ sum_room }} ห้อง</h3>
                        <h3>ชั่วโมงทั้งปี : {{ sum_hours }} ชม.</h3>
                      </v-flex>
                      <v-flex xs12>
                        <v-divider></v-divider>
                      </v-flex>
                    </v-layout>
                  </v-card>

                  <v-spacer></v-spacer>
                  <v-row>
                    <v-col cols="12" md="12" class="text-right">
                      <v-btn
                        large
                        color="warning"
                        @click.stop="addrate_work_college_sc_dialog = false"
                        rounded
                      >
                        <v-icon dark>mdi-close</v-icon>ยกเลิก
                      </v-btn>
                      <v-btn
                        @click.stop="addrate_work_college_sc_submit()"
                        large
                        color="green"
                        rounded
                      >
                        <v-icon dark>mdi-content-save</v-icon>&nbsp;บันทึก
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-layout>


        <!-- editrate_work_sc_dialog -->

      <v-layout row justify-center>
        <v-dialog
          v-model="editrate_work_sc_dialog"
          persistent
          max-width="80%"
          overlay-opacity="0.6"
        >
          <v-card class="mx-auto pa-5">
            <base-material-card
              icon="mdi-clipboard-text"
              title="แก้ไขข้อมูล จำนวนผู้เรียนในหลักสูตรระยะสั้น จำแนกตามหลักสูตรและชั่วโมงเรียน"
              class="px-5 py-3"
              color="warning"
            >
              <v-col class="text-right">
                ปีการศึกษา : {{ year_now }} รหัสสถานศึกษา : {{ user.user_name }}
              </v-col>
            </base-material-card>
            <v-card-text>
              <v-form ref="editrate_work_sc_dialogform" lazy-validation>
                <v-container grid-list-md>
                  <v-card class="pa-2">
                    <v-layout wrap>
                      <v-flex md6>
                        <v-text-field
                          v-model="editrate_work_sc.short_course_name"
                          label="ชื่อหลักสูตรระยะสั้น"
                          outlined
                          :rules="[v => !!v || '']"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md6>
                        <v-text-field
                          v-model="editrate_work_sc.hours_teaching"
                          label="จำนวนชั่วโมงสอนหลักสูตร"
                          outlined
                          type="number"
                          suffix="ชม."
                          autofocus
                          required
                          :rules="[v => !!v || '']"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md2>
                        <v-text-field
                          v-model="editrate_work_sc.gen_1"
                          label="รุ่นที่ 1"
                          outlined
                          type="number"
                          value="0"
                          suffix="คน"
                          @change="cal_sum_editrate_work_sc()"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md2>
                        <v-text-field
                          v-model="editrate_work_sc.gen_2"
                          label="รุ่นที่ 2"
                          outlined
                          type="number"
                          value="0"
                          suffix="คน"
                          @change="cal_sum_editrate_work_sc()"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md2>
                        <v-text-field
                          v-model="editrate_work_sc.gen_3"
                          label="รุ่นที่ 3"
                          outlined
                          type="number"
                          value="0"
                          suffix="คน"
                          @change="cal_sum_editrate_work_sc()"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md2>
                        <v-text-field
                          v-model="editrate_work_sc.gen_4"
                          label="รุ่นที่ 4"
                          outlined
                          type="number"
                          value="0"
                          suffix="คน"
                          @change="cal_sum_editrate_work_sc()"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md2>
                        <v-text-field
                          v-model="editrate_work_sc.gen_5"
                          label="รุ่นที่ 5"
                          outlined
                          type="number"
                          value="0"
                          suffix="คน"
                          @change="cal_sum_editrate_work_sc()"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md2>
                        <v-text-field
                          v-model="editrate_work_sc.gen_6"
                          label="รุ่นที่ 6"
                          outlined
                          type="number"
                          value="0"
                          suffix="คน"
                          @change="cal_sum_editrate_work_sc()"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md2>
                        <v-text-field
                          v-model="editrate_work_sc.gen_7"
                          label="รุ่นที่ 7"
                          outlined
                          type="number"
                          value="0"
                          suffix="คน"
                          @change="cal_sum_editrate_work_sc()"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md2>
                        <v-text-field
                          v-model="editrate_work_sc.gen_8"
                          label="รุ่นที่ 8"
                          outlined
                          type="number"
                          value="0"
                          suffix="คน"
                          @change="cal_sum_editrate_work_sc()"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md2>
                        <v-text-field
                          v-model="editrate_work_sc.gen_9"
                          label="รุ่นที่ 9"
                          outlined
                          type="number"
                          value="0"
                          suffix="คน"
                          @change="cal_sum_editrate_work_sc()"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md2>
                        <v-text-field
                          v-model="editrate_work_sc.gen_10"
                          label="รุ่นที่ 10"
                          outlined
                          type="number"
                          value="0"
                          suffix="คน"
                          @change="cal_sum_editrate_work_sc()"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md2>
                        <v-text-field
                          v-model="editrate_work_sc.gen_11"
                          label="รุ่นที่ 11"
                          outlined
                          type="number"
                          value="0"
                          suffix="คน"
                          @change="cal_sum_editrate_work_sc()"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md2>
                        <v-text-field
                          v-model="editrate_work_sc.gen_12"
                          label="รุ่นที่ 12"
                          outlined
                          type="number"
                          value="0"
                          suffix="คน"
                          @change="cal_sum_editrate_work_sc()"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md2>
                        <v-text-field
                          v-model="editrate_work_sc.gen_13"
                          label="รุ่นที่ 13"
                          outlined
                          type="number"
                          value="0"
                          suffix="คน"
                          @change="cal_sum_editrate_work_sc()"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md2>
                        <v-text-field
                          v-model="editrate_work_sc.gen_14"
                          label="รุ่นที่ 14"
                          outlined
                          type="number"
                          value="0"
                          suffix="คน"
                          @change="cal_sum_editrate_work_sc()"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md2>
                        <v-text-field
                          v-model="editrate_work_sc.gen_15"
                          label="รุ่นที่ 15"
                          outlined
                          type="number"
                          value="0"
                          suffix="คน"
                          @change="cal_sum_editrate_work_sc()"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md2>
                        <v-text-field
                          v-model="editrate_work_sc.gen_16"
                          label="รุ่นที่ 16"
                          outlined
                          type="number"
                          value="0"
                          suffix="คน"
                          @change="cal_sum_editrate_work_sc()"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md2>
                        <v-text-field
                          v-model="editrate_work_sc.gen_17"
                          label="รุ่นที่ 17"
                          outlined
                          type="number"
                          value="0"
                          suffix="คน"
                          @change="cal_sum_editrate_work_sc()"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md2>
                        <v-text-field
                          v-model="editrate_work_sc.gen_18"
                          label="รุ่นที่ 18"
                          outlined
                          type="number"
                          value="0"
                          suffix="คน"
                          @change="cal_sum_editrate_work_sc()"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md2>
                        <v-text-field
                          v-model="editrate_work_sc.gen_19"
                          label="รุ่นที่ 19"
                          outlined
                          type="number"
                          value="0"
                          suffix="คน"
                          @change="cal_sum_editrate_work_sc()"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md2>
                        <v-text-field
                          v-model="editrate_work_sc.gen_20"
                          label="รุ่นที่ 20"
                          outlined
                          type="number"
                          value="0"
                          suffix="คน"
                          @change="cal_sum_editrate_work_sc()"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md2>
                        <v-text-field
                          v-model="editrate_work_sc.gen_21"
                          label="รุ่นที่ 21"
                          outlined
                          type="number"
                          value="0"
                          suffix="คน"
                          @change="cal_sum_editrate_work_sc()"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md2>
                        <v-text-field
                          v-model="editrate_work_sc.gen_22"
                          label="รุ่นที่ 22"
                          outlined
                          type="number"
                          value="0"
                          suffix="คน"
                          @change="cal_sum_editrate_work_sc()"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md2>
                        <v-text-field
                          v-model="editrate_work_sc.gen_23"
                          label="รุ่นที่ 23"
                          outlined
                          type="number"
                          value="0"
                          suffix="คน"
                          @change="cal_sum_editrate_work_sc()"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md2>
                        <v-text-field
                          v-model="editrate_work_sc.gen_24"
                          label="รุ่นที่ 24"
                          outlined
                          type="number"
                          value="0"
                          suffix="คน"
                          @change="cal_sum_editrate_work_sc()"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md2>
                        <v-text-field
                          v-model="editrate_work_sc.gen_25"
                          label="รุ่นที่ 25"
                          outlined
                          type="number"
                          value="0"
                          suffix="คน"
                          @change="cal_sum_editrate_work_sc()"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md10 class="text-center">
                        <h3>จำนวนผู้เรียนรวม : {{ sum_rate_work_sc }} คน</h3>
                        <h3>ห้องเรียนรวม : {{ sum_room }} ห้อง</h3>
                        <h3>ชั่วโมงทั้งปี : {{ sum_hours }} ชม.</h3>
                      </v-flex>
                      <v-flex xs12>
                        <v-divider></v-divider>
                      </v-flex>
                    </v-layout>
                  </v-card>

                  <v-spacer></v-spacer>
                  <v-row>
                    <v-col cols="12" md="12" class="text-right">
                      <v-btn
                        large
                        color="warning"
                        @click.stop="editrate_work_sc_dialog = false"
                        rounded
                      >
                        <v-icon dark>mdi-close</v-icon>ยกเลิก
                      </v-btn>
                      <v-btn
                        @click.stop="editrate_work_sc_submit()"
                        large
                        color="green"
                        rounded
                      >
                        <v-icon dark>mdi-content-save</v-icon>&nbsp;บันทึก
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model rate_work_collegeUpdatedialog -->
      <v-layout>
        <v-dialog
          v-model="rate_work_collegeUpdatedialog"
          persistent
          max-width="60%"
        >
          <v-card class="mx-auto pa-5">
            <base-material-card
              color="green"
              icon="mdi-clipboard-text"
              title="รายจำนวนนักเรียน"
              class="px-5 py-3 text_google"
            ></base-material-card>
            <v-card-text class="text_google">
              <v-form ref="rate_work_collegeUpdatedialogform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md12>
                      <h3>
                        หลักสูตร :{{
                          rate_work_colleges_update_stu.rate_work_course_id
                        }}
                        : {{ rate_work_colleges_update_stu.type_course }}
                      </h3>
                      <h3>
                        สาขาวิชา :{{
                          rate_work_colleges_update_stu.id_course_branch
                        }}
                        : {{ rate_work_colleges_update_stu.branch_name_th }}
                      </h3>
                    </v-flex>
                    <v-flex md4>
                      <v-text-field
                        v-model="
                          rate_work_colleges_update_stu.rate_work_field_study_lavel_1
                        "
                        type="number"
                        label="ระดับ ปวช.1"
                        filled
                        dense
                      >
                      </v-text-field>
                    </v-flex>
                    <v-flex md4>
                      <v-text-field
                        v-model="
                          rate_work_colleges_update_stu.rate_work_field_study_lavel_2
                        "
                        type="number"
                        label="ระดับ ปวช.2"
                        filled
                        dense
                      >
                      </v-text-field>
                    </v-flex>
                    <v-flex md4>
                      <v-text-field
                        v-model="
                          rate_work_colleges_update_stu.rate_work_field_study_lavel_3
                        "
                        type="number"
                        label="ระดับ ปวช.3"
                        filled
                        dense
                      >
                      </v-text-field>
                    </v-flex>
                    *หากระดับชั้นใดไม่มีนักเรียน ให้ระบุ 0
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="warning"
                rounded
                large
                @click.stop="rate_work_collegeUpdatedialog = false"
              >
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn
                rounded
                large
                color="green"
                @click.stop="rate_work_collegeUpdatedialogsubmit()"
                dark
              >
                <v-icon dark>mdi-content-save</v-icon>&nbsp;บันทึก
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model rate_work_collegeUpdatedialog_30 -->
      <v-layout>
        <v-dialog
          v-model="rate_work_collegeUpdatedialog_30"
          persistent
          max-width="60%"
        >
          <v-card class="mx-auto pa-5">
            <base-material-card
              color="green"
              icon="mdi-clipboard-text"
              title="รายจำนวนนักเรียน"
              class="px-5 py-3 text_google"
            ></base-material-card>
            <v-card-text class="text_google">
              <v-form ref="rate_work_collegeUpdatedialogform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md12>
                      <h3>
                        หลักสูตร :{{
                          rate_work_colleges_update_stu.rate_work_course_id
                        }}
                        : {{ rate_work_colleges_update_stu.type_course }}
                      </h3>
                      <h3>
                        สาขาวิชา :{{
                          rate_work_colleges_update_stu.id_course_branch
                        }}
                        : {{ rate_work_colleges_update_stu.branch_name_th }}
                      </h3>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        v-model="
                          rate_work_colleges_update_stu.rate_work_field_study_lavel_1
                        "
                        type="number"
                        label="ระดับ ปวส.1"
                        filled
                        dense
                      >
                      </v-text-field>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        v-model="
                          rate_work_colleges_update_stu.rate_work_field_study_lavel_2
                        "
                        type="number"
                        label="ระดับ ปวส.2"
                        filled
                        dense
                      >
                      </v-text-field>
                    </v-flex>
                      *หากระดับชั้นใดไม่มีนักศึกษา ให้ระบุ 0
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="warning"
                rounded
                large
                @click.stop="rate_work_collegeUpdatedialog_30 = false"
              >
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn
                rounded
                large
                color="green"
                @click.stop="rate_work_collegeUpdatedialogsubmit()"
                dark
              >
                <v-icon dark>mdi-content-save</v-icon>&nbsp;บันทึก
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
            >
              <h3 class="text-right">
                {{ editrate_work_college.rate_work_college_id }}
              </h3>
            </base-material-card>
            <v-card-text class="text_google">
              <v-form ref="deleterate_work_collegeform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12>
                      ยืนยันการลบข้อมูล :

                      <h3>
                        ประเภทวิชา : {{ editrate_work_college.type_course }}
                      </h3>
                      <h3>
                        สาขาวิชา : {{ editrate_work_college.branch_name_th }}
                      </h3>
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

      <!-- deleterate_work_sc_dialog -->
      <v-layout>
        <v-dialog
          v-model="deleterate_work_sc_dialog"
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
              <v-form ref="deleterate_work_sc_dialogform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12>
                      ยืนยันการลบข้อมูล :
                      <h3>ปี : {{ editrate_work_sc.rate_sc_year }}</h3>
                      <h3>
                        หลักสูตร ระยะสั้น :
                        {{ editrate_work_sc.short_course_name }}
                      </h3>
                      <h3>
                        จำนวนชั่วโมง : {{ editrate_work_sc.hours_teaching }}
                      </h3>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn large @click.stop="deleterate_work_sc_dialog = false">
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn
                large
                color="red darken-3"
                @click.stop="deleterate_work_sc_dialogsubmit()"
                dark
              >
                <v-icon dark>mdi-delete</v-icon>&nbsp;ลบ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model editrate_work_collegedialog -->
      <v-layout row justify-center>
        <v-dialog
          v-model="editrate_work_collegedialog"
          persistent
          max-width="50%"
        >
          <v-card class="mx-auto pa-5">
            <base-material-card
              color="yellow"
              icon="mdi-clipboard-text"
              title="แก้ไขข้อมูล"
              class="px-5 py-3 text_google"
            ></base-material-card>
            <v-card-text>
              <v-form ref="editrate_work_collegeform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md12>
                      <v-row>
                        <v-col cols="12" md="12">
                          <v-autocomplete
                            v-model="
                              editrate_work_college.rate_id_course_branch
                            "
                            :items="rate_work_course_stds"
                            item-text="course_select"
                            item-value="id_course_branch"
                            dense
                            label="ประเภทวิชา/สาขาวิชา : "
                            request
                            :rules="[v => !!v || '']"
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
                @click.stop="editrate_work_collegedialog = false"
                rounded
              >
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn
                large
                color="warning"
                @click.stop="editrate_work_collegeSubmit()"
                rounded
              >
                <v-icon dark>mdi-pencil</v-icon>&nbsp;แก้ไขข้อมูล
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
      user: [],
      users: [],
      rate_work_colleges: [],
      rate_work_colleges_30: [],
      years_select: "2565",
      search_course: "",
      search: "",
      year_s: [2565, 2566, 2567, 2568, 2569, 2570],
      addrate_work_collegedialog: false,
      editrate_work_collegedialog: false,
      deleterate_work_collegedialog: false,
      addrate_work_gdialog: false,
      rate_work_collegeUpdatedialog: false,
      rate_work_collegeUpdatedialog_30: false,
      addrate_work_college_sc_dialog: false,
      editrate_work_sc_dialog: false,
      addrate_work_college: {},
      addrate_work_sc: {},
      editrate_work_college: [],
      addrate_work_college: [],
      addrate_work_g: {},
      addrate_work_g_data: {},
      editrate_work_g_data: {},
      rate_work_g_all: [],
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
      headers_course: [
        { text: "หลักสูตร", align: "center", value: "year_course" },
        { text: "รหัสประเภทวิชา", align: "center", value: "id_type_course" },
        { text: "ประเภทวิชา", align: "left", value: "type_course" },
        { text: "รหัสสาขาวิชา", align: "left", value: "id_course_branch" },
        { text: "ชื่อสาขาวิชา", align: "left", value: "branch_name_th" },

        {
          text: "ดำเนินการ",
          align: "center",
          value: "actions",
          icon: "mdi-file-document-edit"
        }
      ],

      headers_s_course: [
        { text: "#", align: "center", value: "index" },
        { text: "ปี", align: "center", value: "rate_sc_year" },
        /*   { text: "สถานศึกษา", align: "center", value: "rate_sc_college_code" }, */
        {
          text: "ชื่อหลักสูตรระยะสั้น",
          align: "left",
          value: "short_course_name"
        },
        { text: "จำนวนชั่วโมงสอน", align: "center", value: "hours_teaching" },
        { text: "1", align: "center", value: "gen_1" },
        { text: "2", align: "center", value: "gen_2" },
        { text: "3", align: "center", value: "gen_3" },
        { text: "4", align: "center", value: "gen_4" },
        { text: "5", align: "center", value: "gen_5" },
        { text: "6", align: "center", value: "gen_6" },
        { text: "7", align: "center", value: "gen_7" },
        { text: "8", align: "center", value: "gen_8" },
        { text: "9", align: "center", value: "gen_9" },
        { text: "10", align: "center", value: "gen_10" },
        { text: "11", align: "center", value: "gen_11" },
        { text: "12", align: "center", value: "gen_12" },
        { text: "13", align: "center", value: "gen_13" },
        { text: "14", align: "center", value: "gen_14" },
        { text: "15", align: "center", value: "gen_15" },
        { text: "16", align: "center", value: "gen_16" },
        { text: "17", align: "center", value: "gen_17" },
        { text: "18", align: "center", value: "gen_18" },
        { text: "19", align: "center", value: "gen_19" },
        { text: "20", align: "center", value: "gen_20" },
        { text: "21", align: "center", value: "gen_21" },
        { text: "22", align: "center", value: "gen_22" },
        { text: "23", align: "center", value: "gen_23" },
        { text: "24", align: "center", value: "gen_24" },
        { text: "25", align: "center", value: "gen_25" },
        { text: "จน.", align: "center", value: "rate_work_sc_sum" },
        { text: "ห้อง.", align: "center", value: "rate_work_sc_room_sum" },
        { text: "ชม.", align: "center", value: "rate_work_sc_hours" },
        {
          text: "ดำเนินการ",
          align: "center",
          value: "actions",
          icon: "mdi-file-document-edit"
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
          text: "รหัสสาขาวิชา",
          align: "center",
          value: "rate_id_course_branch"
        },
        {
          text: "สาขาวิชา",
          align: "center",
          value: "branch_name_th"
        },
        { text: "วันที่ข้อมูล", align: "center", value: "update_time" },
        {
          text: "จำนวนนักเรียน",
          align: "center",
          value: "reports"
        },
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
          text: "ดำเนินการ",
          align: "center",
          value: "actions"
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
          text: "รหัสสาขาวิชา",
          align: "center",
          value: "rate_id_course_branch"
        },
        {
          text: "สาขาวิชา",
          align: "center",
          value: "branch_name_th"
        },
        { text: "วันที่ข้อมูล", align: "center", value: "update_time" },
        {
          text: "จำนวนนักศึกษา",
          align: "center",
          value: "reports"
        },
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
          text: "ดำเนินการ",
          align: "center",
          value: "actions"
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
      addrate_work_college_sc: {},
      sum_rate_work_sc: [],
      rate_work_sc_all: [],
      room_1: [],
      room_2: [],
      room_3: [],
      room_4: [],
      room_5: [],
      room_6: [],
      room_7: [],
      room_8: [],
      room_9: [],
      room_10: [],
      room_11: [],
      room_12: [],
      room_13: [],
      room_14: [],
      room_15: [],
      room_16: [],
      room_17: [],
      room_18: [],
      room_19: [],
      room_20: [],
      room_21: [],
      room_22: [],
      room_23: [],
      room_24: [],
      room_25: [],
      sum_room: [],
      sum_hours: [],
      editrate_work_sc: {},
      deleterate_work_sc_dialog: false,
       period_colleges:[],
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
    await this.period_collegeQuery();
    await this.rate_work_collegeQuery_20();
    await this.rate_work_collegeQuery_30();
    await this.rate_work_course_stdQueryAll();
    await this.rate_work_course_std_courseQAll();
    await this.rate_work_collegeQuery_20_sum();
    await this.rate_work_collegeQuery_30_sum();
    await this.rate_work_sc_Query_all();
  },

  methods: {
     async period_collegeQuery() {
       let result_period_college;
    result_period_college = await this.$http.post("period_college.php", {
      ApiKey: this.ApiKey,
      period_college_enable: "1",
      period_college_type: "update_college"
    });
    this.period_colleges = result_period_college.data;    
    console.log(result_period_college.data)
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
      let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
      let result = await this.$http.post("rate_work_course_std.php", {
        ApiKey: this.ApiKey,
        id_type_course: this.course_select_main,
        rate_work_college_code: userSession.user_name
      });
      this.rate_work_course_stds = result.data;
    },

    async rate_work_course_std_courseQAll() {
      let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
      let result = await this.$http.post("rate_work_course_std.php", {
        ApiKey: this.ApiKey,
        show_course_all: "Ok",
        rate_work_college_code: userSession.user_name
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
        this.rate_work_collegeQuery_30();
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
      let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
      let result = await this.$http.post("rate_work_course_std.php", {
        ApiKey: this.ApiKey,
        rate_work_college_code: userSession.user_name
      });
      this.rate_work_course_stds = result.data;
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

    async rate_work_sc_Query_all() {
      this.loading = true;
      let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
      let result = await this.$http
        .post("rate_work_sc.php", {
          ApiKey: this.ApiKey,
          rate_sc_college_code: userSession.user_name
        })
        .finally(() => (this.loading = false));
      this.rate_work_sc_all = result.data;
      /*  console.log(result.data) */
    },

    async rate_work_collegeAdd() {
      this.addrate_work_college = {};
      this.course_select();
      this.addrate_work_collegedialog = true;
    },

    async rate_work_college_sc_Add() {
      this.addrate_work_sc = {};
      this.sum_rate_work_sc = "";
      this.sum_room = "";
      this.sum_hours = "";
      this.addrate_work_college_sc_dialog = true;
    },

    //Edit data
    async rate_work_collegeEdit(id_pa) {
      let result = await this.$http.post("rate_work_college.php", {
        ApiKey: this.ApiKey,
        id_pa: id_pa
      });
      this.editrate_work_college = result.data;
      this.editrate_work_collegedialog = true;
    },

    async editrate_work_collegeSubmit() {
      if (this.$refs.editrate_work_collegeform.validate()) {
        this.editrate_work_college.ApiKey = this.ApiKey;
        let result = await this.$http.post(
          "rate_work_college.update.php",
          this.editrate_work_college
        );
        if (result.data.status == true) {
          this.rate_work_colleges = result.data;
          this.snackbar.icon = "mdi-content-save";
          this.snackbar.color = "success";
          this.snackbar.text = "แก้ไขข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.rate_work_collegeQuery_all();
          this.rate_work_collegesQueryAll();
        } else {
          this.snackbar.icon = "mdi-alert";
          this.snackbar.color = "red";
          this.snackbar.text = "แก้ไขข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.editrate_work_collegedialog = false;
      }
    },
    async rate_work_collegeDelete(rate_work_college_id) {
      let result = await this.$http.post("rate_work_college.php", {
        ApiKey: this.ApiKey,
        rate_work_college_id: rate_work_college_id
      });
      this.editrate_work_college = result.data;
      this.deleterate_work_collegedialog = true;
    },

    

    async rate_work_sc_Edit(rate_sc_id) {
      let result = await this.$http.post("rate_work_sc.php", {
        ApiKey: this.ApiKey,
        rate_sc_id: rate_sc_id
      });
      this.editrate_work_sc = result.data;
      this.editrate_work_sc_dialog = true;
    },

    async rate_work_sc_Delete(rate_sc_id) {
      let result = await this.$http.post("rate_work_sc.php", {
        ApiKey: this.ApiKey,
        rate_sc_id: rate_sc_id
      });
      this.editrate_work_sc = result.data;
      this.deleterate_work_sc_dialog = true;
    },



    async deleterate_work_collegeubmit() {
      if (this.$refs.deleterate_work_collegeform.validate())
        this.editrate_work_college.ApiKey = this.ApiKey;
      {
        let result = await this.$http.post(
          "rate_work_college.delete.php",
          this.editrate_work_college
        );
        if (result.data.status == true) {
          this.snackbar.icon = "mdi-content-save";
          this.snackbar.color = "success";
          this.snackbar.text = "ลบข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.rate_work_collegeQuery_20();
          this.rate_work_collegeQuery_30();
        } else {
          this.snackbar.icon = "mdi-alert";
          this.snackbar.color = "red";
          this.snackbar.text = "ลบข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.deleterate_work_collegedialog = false;
      }
    },

    /* deleterate_work_sc_dialogsubmit */

    async deleterate_work_sc_dialogsubmit() {
      if (this.$refs.deleterate_work_sc_dialogform.validate())
        this.editrate_work_sc.ApiKey = this.ApiKey;
      {
        let result = await this.$http.post(
          "rate_work_sc.delete.php",
          this.editrate_work_sc
        );
        if (result.data.status == true) {
          this.snackbar.icon = "mdi-content-save";
          this.snackbar.color = "success";
          this.snackbar.text = "ลบข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.rate_work_sc_Query_all();
        } else {
          this.snackbar.icon = "mdi-alert";
          this.snackbar.color = "red";
          this.snackbar.text = "ลบข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.deleterate_work_sc_dialog = false;
      }
    },

    //Insert Short Course
    async addrate_work_college_sc_submit() {
      if (this.$refs.addrate_work_college_sc_dialogform.validate()) {
        this.addrate_work_sc.ApiKey = this.ApiKey;
        this.addrate_work_sc.rate_sc_year = this.year_now;
        this.addrate_work_sc.rate_sc_college_code = this.user.user_name;
        this.addrate_work_sc.rate_work_sc_sum = this.sum_rate_work_sc;
        this.addrate_work_sc.rate_work_sc_date = this.date_today;
        this.addrate_work_sc.rate_work_sc_room_sum = this.sum_room;
        this.addrate_work_sc.rate_work_sc_hours = this.sum_hours;

        /*  console.log(this.addrate_work_sc); */
        let result = await this.$http.post(
          "rate_work_sc.insert.php",
          this.addrate_work_sc
        );
        /*  console.log(result.data); */

        if (result.data.status == true) {
          this.snackbar.icon = "mdi-content-save";
          this.snackbar.color = "success";
          this.snackbar.text = "บันทึกข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.rate_work_sc_Query_all();
        } else {
          this.snackbar.icon = "mdi-alert";
          this.snackbar.color = "red";
          this.snackbar.text = "บันทึกข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.addrate_work_college_sc_dialog = false;
      }
    },

async editrate_work_sc_submit(){
   if (this.$refs.editrate_work_sc_dialogform.validate()) {
        this.editrate_work_sc.ApiKey = this.ApiKey;
        this.editrate_work_sc.rate_sc_year = this.year_now;
        this.editrate_work_sc.rate_sc_college_code = this.user.user_name;
        this.editrate_work_sc.rate_work_sc_sum = this.sum_rate_work_sc;
        this.editrate_work_sc.rate_work_sc_date = this.date_today;
        this.editrate_work_sc.rate_work_sc_room_sum = this.sum_room;
        this.editrate_work_sc.rate_work_sc_hours = this.sum_hours;

         /* console.log(this.editrate_work_sc); */
        let result = await this.$http.post(
          "rate_work_sc.update.php",
          this.editrate_work_sc
        ); 
        /*  console.log(result.data); */

         if (result.data.status == true) {
          this.snackbar.icon = "mdi-content-save";
          this.snackbar.color = "success";
          this.snackbar.text = "บันทึกข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.rate_work_sc_Query_all();
        } else {
          this.snackbar.icon = "mdi-alert";
          this.snackbar.color = "red";
          this.snackbar.text = "บันทึกข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.editrate_work_sc_dialog = false;
      }
},

    async cal_sum_addrate_work_sc() {
      if (isNaN(this.addrate_work_sc.hours_teaching)) {
        this.snackbar.icon = "mdi-alert";
        this.snackbar.color = "warning";
        this.snackbar.text = "กรุณาระบุจำนวนชั่วโมงหลักสูตรระยะสั้น";
        this.snackbar.show = true;
        this.addrate_work_sc = "";
      } else {
        let gen_1 = parseInt(this.addrate_work_sc.gen_1 || 0);
        let gen_2 = parseInt(this.addrate_work_sc.gen_2 || 0);
        let gen_3 = parseInt(this.addrate_work_sc.gen_3 || 0);
        let gen_4 = parseInt(this.addrate_work_sc.gen_4 || 0);
        let gen_5 = parseInt(this.addrate_work_sc.gen_5 || 0);
        let gen_6 = parseInt(this.addrate_work_sc.gen_6 || 0);
        let gen_7 = parseInt(this.addrate_work_sc.gen_7 || 0);
        let gen_8 = parseInt(this.addrate_work_sc.gen_8 || 0);
        let gen_9 = parseInt(this.addrate_work_sc.gen_9 || 0);
        let gen_10 = parseInt(this.addrate_work_sc.gen_10 || 0);
        let gen_11 = parseInt(this.addrate_work_sc.gen_11 || 0);
        let gen_12 = parseInt(this.addrate_work_sc.gen_12 || 0);
        let gen_13 = parseInt(this.addrate_work_sc.gen_13 || 0);
        let gen_14 = parseInt(this.addrate_work_sc.gen_14 || 0);
        let gen_15 = parseInt(this.addrate_work_sc.gen_15 || 0);
        let gen_16 = parseInt(this.addrate_work_sc.gen_16 || 0);
        let gen_17 = parseInt(this.addrate_work_sc.gen_17 || 0);
        let gen_18 = parseInt(this.addrate_work_sc.gen_18 || 0);
        let gen_19 = parseInt(this.addrate_work_sc.gen_19 || 0);
        let gen_20 = parseInt(this.addrate_work_sc.gen_20 || 0);
        let gen_21 = parseInt(this.addrate_work_sc.gen_21 || 0);
        let gen_22 = parseInt(this.addrate_work_sc.gen_22 || 0);
        let gen_23 = parseInt(this.addrate_work_sc.gen_23 || 0);
        let gen_24 = parseInt(this.addrate_work_sc.gen_24 || 0);
        let gen_25 = parseInt(this.addrate_work_sc.gen_25 || 0);
        let result =
          gen_1 +
          gen_2 +
          gen_3 +
          gen_4 +
          gen_5 +
          gen_6 +
          gen_7 +
          gen_8 +
          gen_9 +
          gen_10 +
          gen_11 +
          gen_12 +
          gen_13 +
          gen_14 +
          gen_15 +
          gen_16 +
          gen_17 +
          gen_18 +
          gen_19 +
          gen_20 +
          gen_21 +
          gen_22 +
          gen_23 +
          gen_24 +
          gen_25;
        this.sum_rate_work_sc = result;
        let cal_room_1;
        if (gen_1 < 15) {
          cal_room_1 = 0;
        } else if (gen_1 < 30) {
          cal_room_1 = 1;
        } else if ((gen_1 / 30) % 1 < 0.333) {
          cal_room_1 = Math.floor(gen_1 / 30);
        } else {
          cal_room_1 = Math.ceil(gen_1 / 30);
        }
        this.room_1 = cal_room_1;

        let cal_room_2;
        if (gen_2 < 15) {
          cal_room_2 = 0;
        } else if (gen_2 < 30) {
          cal_room_2 = 1;
        } else if ((gen_2 / 30) % 1 < 0.333) {
          cal_room_2 = Math.floor(gen_2 / 30);
        } else {
          cal_room_2 = Math.ceil(gen_2 / 30);
        }
        this.room_2 = cal_room_2;

        let cal_room_3;
        if (gen_3 < 15) {
          cal_room_3 = 0;
        } else if (gen_3 < 30) {
          cal_room_3 = 1;
        } else if ((gen_3 / 30) % 1 < 0.333) {
          cal_room_3 = Math.floor(gen_3 / 30);
        } else {
          cal_room_3 = Math.ceil(gen_3 / 30);
        }
        this.room_3 = cal_room_3;

        let cal_room_4;
        if (gen_4 < 15) {
          cal_room_4 = 0;
        } else if (gen_4 < 30) {
          cal_room_4 = 1;
        } else if ((gen_4 / 30) % 1 < 0.333) {
          cal_room_4 = Math.floor(gen_4 / 30);
        } else {
          cal_room_4 = Math.ceil(gen_4 / 30);
        }
        this.room_4 = cal_room_4;

        let cal_room_5;
        if (gen_5 < 15) {
          cal_room_5 = 0;
        } else if (gen_5 < 30) {
          cal_room_5 = 1;
        } else if ((gen_5 / 30) % 1 < 0.333) {
          cal_room_5 = Math.floor(gen_5 / 30);
        } else {
          cal_room_5 = Math.ceil(gen_5 / 30);
        }
        this.room_5 = cal_room_5;

        let cal_room_6;
        if (gen_6 < 15) {
          cal_room_6 = 0;
        } else if (gen_6 < 30) {
          cal_room_6 = 1;
        } else if ((gen_6 / 30) % 1 < 0.333) {
          cal_room_6 = Math.floor(gen_6 / 30);
        } else {
          cal_room_6 = Math.ceil(gen_6 / 30);
        }
        this.room_6 = cal_room_6;

        let cal_room_7;
        if (gen_7 < 15) {
          cal_room_7 = 0;
        } else if (gen_7 < 30) {
          cal_room_7 = 1;
        } else if ((gen_7 / 30) % 1 < 0.333) {
          cal_room_7 = Math.floor(gen_7 / 30);
        } else {
          cal_room_7 = Math.ceil(gen_7 / 30);
        }
        this.room_7 = cal_room_7;

        let cal_room_8;
        if (gen_8 < 15) {
          cal_room_8 = 0;
        } else if (gen_8 < 30) {
          cal_room_8 = 1;
        } else if ((gen_8 / 30) % 1 < 0.333) {
          cal_room_8 = Math.floor(gen_8 / 30);
        } else {
          cal_room_8 = Math.ceil(gen_8 / 30);
        }
        this.room_8 = cal_room_8;

        let cal_room_9;
        if (gen_9 < 15) {
          cal_room_9 = 0;
        } else if (gen_9 < 30) {
          cal_room_9 = 1;
        } else if ((gen_9 / 30) % 1 < 0.333) {
          cal_room_9 = Math.floor(gen_9 / 30);
        } else {
          cal_room_9 = Math.ceil(gen_9 / 30);
        }
        this.room_9 = cal_room_9;

        let cal_room_10;
        if (gen_10 < 15) {
          cal_room_10 = 0;
        } else if (gen_10 < 30) {
          cal_room_10 = 1;
        } else if ((gen_10 / 30) % 1 < 0.333) {
          cal_room_10 = Math.floor(gen_10 / 30);
        } else {
          cal_room_10 = Math.ceil(gen_10 / 30);
        }
        this.room_10 = cal_room_10;

        let cal_room_11;
        if (gen_11 < 15) {
          cal_room_11 = 0;
        } else if (gen_11 < 30) {
          cal_room_11 = 1;
        } else if ((gen_11 / 30) % 1 < 0.333) {
          cal_room_11 = Math.floor(gen_11 / 30);
        } else {
          cal_room_11 = Math.ceil(gen_11 / 30);
        }
        this.room_11 = cal_room_11;

        let cal_room_12;
        if (gen_12 < 15) {
          cal_room_12 = 0;
        } else if (gen_12 < 30) {
          cal_room_12 = 1;
        } else if ((gen_12 / 30) % 1 < 0.333) {
          cal_room_12 = Math.floor(gen_12 / 30);
        } else {
          cal_room_12 = Math.ceil(gen_12 / 30);
        }
        this.room_12 = cal_room_12;

        let cal_room_13;
        if (gen_13 < 15) {
          cal_room_13 = 0;
        } else if (gen_13 < 30) {
          cal_room_13 = 1;
        } else if ((gen_13 / 30) % 1 < 0.333) {
          cal_room_13 = Math.floor(gen_13 / 30);
        } else {
          cal_room_13 = Math.ceil(gen_13 / 30);
        }
        this.room_13 = cal_room_13;

        let cal_room_14;
        if (gen_14 < 15) {
          cal_room_14 = 0;
        } else if (gen_14 < 30) {
          cal_room_14 = 1;
        } else if ((gen_14 / 30) % 1 < 0.333) {
          cal_room_14 = Math.floor(gen_14 / 30);
        } else {
          cal_room_14 = Math.ceil(gen_14 / 30);
        }
        this.room_14 = cal_room_14;

        let cal_room_15;
        if (gen_15 < 15) {
          cal_room_15 = 0;
        } else if (gen_15 < 30) {
          cal_room_15 = 1;
        } else if ((gen_15 / 30) % 1 < 0.333) {
          cal_room_15 = Math.floor(gen_15 / 30);
        } else {
          cal_room_15 = Math.ceil(gen_15 / 30);
        }
        this.room_15 = cal_room_15;

        let cal_room_16;
        if (gen_16 < 15) {
          cal_room_16 = 0;
        } else if (gen_16 < 30) {
          cal_room_16 = 1;
        } else if ((gen_16 / 30) % 1 < 0.333) {
          cal_room_16 = Math.floor(gen_16 / 30);
        } else {
          cal_room_16 = Math.ceil(gen_16 / 30);
        }
        this.room_16 = cal_room_16;

        let cal_room_17;
        if (gen_17 < 15) {
          cal_room_17 = 0;
        } else if (gen_17 < 30) {
          cal_room_17 = 1;
        } else if ((gen_17 / 30) % 1 < 0.333) {
          cal_room_17 = Math.floor(gen_17 / 30);
        } else {
          cal_room_17 = Math.ceil(gen_17 / 30);
        }
        this.room_17 = cal_room_17;

        let cal_room_18;
        if (gen_18 < 15) {
          cal_room_18 = 0;
        } else if (gen_18 < 30) {
          cal_room_18 = 1;
        } else if ((gen_18 / 30) % 1 < 0.333) {
          cal_room_18 = Math.floor(gen_18 / 30);
        } else {
          cal_room_18 = Math.ceil(gen_18 / 30);
        }
        this.room_18 = cal_room_18;

        let cal_room_19;
        if (gen_19 < 15) {
          cal_room_19 = 0;
        } else if (gen_19 < 30) {
          cal_room_19 = 1;
        } else if ((gen_19 / 30) % 1 < 0.333) {
          cal_room_19 = Math.floor(gen_19 / 30);
        } else {
          cal_room_19 = Math.ceil(gen_19 / 30);
        }
        this.room_19 = cal_room_19;

        let cal_room_20;
        if (gen_20 < 15) {
          cal_room_20 = 0;
        } else if (gen_20 < 30) {
          cal_room_20 = 1;
        } else if ((gen_20 / 30) % 1 < 0.333) {
          cal_room_20 = Math.floor(gen_20 / 30);
        } else {
          cal_room_20 = Math.ceil(gen_20 / 30);
        }
        this.room_20 = cal_room_20;

        let cal_room_21;
        if (gen_21 < 15) {
          cal_room_21 = 0;
        } else if (gen_21 < 30) {
          cal_room_21 = 1;
        } else if ((gen_21 / 30) % 1 < 0.333) {
          cal_room_21 = Math.floor(gen_21 / 30);
        } else {
          cal_room_21 = Math.ceil(gen_21 / 30);
        }
        this.room_21 = cal_room_21;

        let cal_room_22;
        if (gen_22 < 15) {
          cal_room_22 = 0;
        } else if (gen_22 < 30) {
          cal_room_22 = 1;
        } else if ((gen_22 / 30) % 1 < 0.333) {
          cal_room_22 = Math.floor(gen_22 / 30);
        } else {
          cal_room_22 = Math.ceil(gen_22 / 30);
        }
        this.room_22 = cal_room_22;

        let cal_room_23;
        if (gen_23 < 15) {
          cal_room_23 = 0;
        } else if (gen_23 < 30) {
          cal_room_23 = 1;
        } else if ((gen_23 / 30) % 1 < 0.333) {
          cal_room_23 = Math.floor(gen_23 / 30);
        } else {
          cal_room_23 = Math.ceil(gen_23 / 30);
        }
        this.room_23 = cal_room_23;

        let cal_room_24;
        if (gen_24 < 15) {
          cal_room_24 = 0;
        } else if (gen_24 < 30) {
          cal_room_24 = 1;
        } else if ((gen_24 / 30) % 1 < 0.333) {
          cal_room_24 = Math.floor(gen_24 / 30);
        } else {
          cal_room_24 = Math.ceil(gen_24 / 30);
        }
        this.room_24 = cal_room_24;

        let cal_room_25;
        if (gen_25 < 15) {
          cal_room_25 = 0;
        } else if (gen_25 < 30) {
          cal_room_25 = 1;
        } else if ((gen_25 / 30) % 1 < 0.333) {
          cal_room_25 = Math.floor(gen_25 / 30);
        } else {
          cal_room_25 = Math.ceil(gen_25 / 30);
        }
        this.room_25 = cal_room_25;
        let sum_rooms =
          cal_room_1 +
          cal_room_2 +
          cal_room_3 +
          cal_room_4 +
          cal_room_5 +
          cal_room_6 +
          cal_room_7 +
          cal_room_8 +
          cal_room_9 +
          cal_room_10 +
          cal_room_11 +
          cal_room_12 +
          cal_room_13 +
          cal_room_14 +
          cal_room_15 +
          cal_room_16 +
          cal_room_17 +
          cal_room_18 +
          cal_room_19 +
          cal_room_20 +
          cal_room_21 +
          cal_room_22 +
          cal_room_23 +
          cal_room_24 +
          cal_room_25;
       
          this.sum_room = sum_rooms;
          let hours = this.addrate_work_sc.hours_teaching;
          let cal_hours = sum_rooms * hours;
          this.sum_hours = cal_hours;          
      }
    },

async cal_sum_editrate_work_sc() {
      if (isNaN(this.editrate_work_sc.hours_teaching)) {
        this.snackbar.icon = "mdi-alert";
        this.snackbar.color = "warning";
        this.snackbar.text = "กรุณาระบุจำนวนชั่วโมงหลักสูตรระยะสั้น";
        this.snackbar.show = true;
        this.editrate_work_sc = "";
      } else {
        let gen_1 = parseInt(this.editrate_work_sc.gen_1 || 0);
        let gen_2 = parseInt(this.editrate_work_sc.gen_2 || 0);
        let gen_3 = parseInt(this.editrate_work_sc.gen_3 || 0);
        let gen_4 = parseInt(this.editrate_work_sc.gen_4 || 0);
        let gen_5 = parseInt(this.editrate_work_sc.gen_5 || 0);
        let gen_6 = parseInt(this.editrate_work_sc.gen_6 || 0);
        let gen_7 = parseInt(this.editrate_work_sc.gen_7 || 0);
        let gen_8 = parseInt(this.editrate_work_sc.gen_8 || 0);
        let gen_9 = parseInt(this.editrate_work_sc.gen_9 || 0);
        let gen_10 = parseInt(this.editrate_work_sc.gen_10 || 0);
        let gen_11 = parseInt(this.editrate_work_sc.gen_11 || 0);
        let gen_12 = parseInt(this.editrate_work_sc.gen_12 || 0);
        let gen_13 = parseInt(this.editrate_work_sc.gen_13 || 0);
        let gen_14 = parseInt(this.editrate_work_sc.gen_14 || 0);
        let gen_15 = parseInt(this.editrate_work_sc.gen_15 || 0);
        let gen_16 = parseInt(this.editrate_work_sc.gen_16 || 0);
        let gen_17 = parseInt(this.editrate_work_sc.gen_17 || 0);
        let gen_18 = parseInt(this.editrate_work_sc.gen_18 || 0);
        let gen_19 = parseInt(this.editrate_work_sc.gen_19 || 0);
        let gen_20 = parseInt(this.editrate_work_sc.gen_20 || 0);
        let gen_21 = parseInt(this.editrate_work_sc.gen_21 || 0);
        let gen_22 = parseInt(this.editrate_work_sc.gen_22 || 0);
        let gen_23 = parseInt(this.editrate_work_sc.gen_23 || 0);
        let gen_24 = parseInt(this.editrate_work_sc.gen_24 || 0);
        let gen_25 = parseInt(this.editrate_work_sc.gen_25 || 0);
        let result =
          gen_1 +
          gen_2 +
          gen_3 +
          gen_4 +
          gen_5 +
          gen_6 +
          gen_7 +
          gen_8 +
          gen_9 +
          gen_10 +
          gen_11 +
          gen_12 +
          gen_13 +
          gen_14 +
          gen_15 +
          gen_16 +
          gen_17 +
          gen_18 +
          gen_19 +
          gen_20 +
          gen_21 +
          gen_22 +
          gen_23 +
          gen_24 +
          gen_25;
        this.sum_rate_work_sc = result;
        let cal_room_1;
        if (gen_1 < 15) {
          cal_room_1 = 0;
        } else if (gen_1 < 30) {
          cal_room_1 = 1;
        } else if ((gen_1 / 30) % 1 < 0.333) {
          cal_room_1 = Math.floor(gen_1 / 30);
        } else {
          cal_room_1 = Math.ceil(gen_1 / 30);
        }
        this.room_1 = cal_room_1;

        let cal_room_2;
        if (gen_2 < 15) {
          cal_room_2 = 0;
        } else if (gen_2 < 30) {
          cal_room_2 = 1;
        } else if ((gen_2 / 30) % 1 < 0.333) {
          cal_room_2 = Math.floor(gen_2 / 30);
        } else {
          cal_room_2 = Math.ceil(gen_2 / 30);
        }
        this.room_2 = cal_room_2;

        let cal_room_3;
        if (gen_3 < 15) {
          cal_room_3 = 0;
        } else if (gen_3 < 30) {
          cal_room_3 = 1;
        } else if ((gen_3 / 30) % 1 < 0.333) {
          cal_room_3 = Math.floor(gen_3 / 30);
        } else {
          cal_room_3 = Math.ceil(gen_3 / 30);
        }
        this.room_3 = cal_room_3;

        let cal_room_4;
        if (gen_4 < 15) {
          cal_room_4 = 0;
        } else if (gen_4 < 30) {
          cal_room_4 = 1;
        } else if ((gen_4 / 30) % 1 < 0.333) {
          cal_room_4 = Math.floor(gen_4 / 30);
        } else {
          cal_room_4 = Math.ceil(gen_4 / 30);
        }
        this.room_4 = cal_room_4;

        let cal_room_5;
        if (gen_5 < 15) {
          cal_room_5 = 0;
        } else if (gen_5 < 30) {
          cal_room_5 = 1;
        } else if ((gen_5 / 30) % 1 < 0.333) {
          cal_room_5 = Math.floor(gen_5 / 30);
        } else {
          cal_room_5 = Math.ceil(gen_5 / 30);
        }
        this.room_5 = cal_room_5;

        let cal_room_6;
        if (gen_6 < 15) {
          cal_room_6 = 0;
        } else if (gen_6 < 30) {
          cal_room_6 = 1;
        } else if ((gen_6 / 30) % 1 < 0.333) {
          cal_room_6 = Math.floor(gen_6 / 30);
        } else {
          cal_room_6 = Math.ceil(gen_6 / 30);
        }
        this.room_6 = cal_room_6;

        let cal_room_7;
        if (gen_7 < 15) {
          cal_room_7 = 0;
        } else if (gen_7 < 30) {
          cal_room_7 = 1;
        } else if ((gen_7 / 30) % 1 < 0.333) {
          cal_room_7 = Math.floor(gen_7 / 30);
        } else {
          cal_room_7 = Math.ceil(gen_7 / 30);
        }
        this.room_7 = cal_room_7;

        let cal_room_8;
        if (gen_8 < 15) {
          cal_room_8 = 0;
        } else if (gen_8 < 30) {
          cal_room_8 = 1;
        } else if ((gen_8 / 30) % 1 < 0.333) {
          cal_room_8 = Math.floor(gen_8 / 30);
        } else {
          cal_room_8 = Math.ceil(gen_8 / 30);
        }
        this.room_8 = cal_room_8;

        let cal_room_9;
        if (gen_9 < 15) {
          cal_room_9 = 0;
        } else if (gen_9 < 30) {
          cal_room_9 = 1;
        } else if ((gen_9 / 30) % 1 < 0.333) {
          cal_room_9 = Math.floor(gen_9 / 30);
        } else {
          cal_room_9 = Math.ceil(gen_9 / 30);
        }
        this.room_9 = cal_room_9;

        let cal_room_10;
        if (gen_10 < 15) {
          cal_room_10 = 0;
        } else if (gen_10 < 30) {
          cal_room_10 = 1;
        } else if ((gen_10 / 30) % 1 < 0.333) {
          cal_room_10 = Math.floor(gen_10 / 30);
        } else {
          cal_room_10 = Math.ceil(gen_10 / 30);
        }
        this.room_10 = cal_room_10;

        let cal_room_11;
        if (gen_11 < 15) {
          cal_room_11 = 0;
        } else if (gen_11 < 30) {
          cal_room_11 = 1;
        } else if ((gen_11 / 30) % 1 < 0.333) {
          cal_room_11 = Math.floor(gen_11 / 30);
        } else {
          cal_room_11 = Math.ceil(gen_11 / 30);
        }
        this.room_11 = cal_room_11;

        let cal_room_12;
        if (gen_12 < 15) {
          cal_room_12 = 0;
        } else if (gen_12 < 30) {
          cal_room_12 = 1;
        } else if ((gen_12 / 30) % 1 < 0.333) {
          cal_room_12 = Math.floor(gen_12 / 30);
        } else {
          cal_room_12 = Math.ceil(gen_12 / 30);
        }
        this.room_12 = cal_room_12;

        let cal_room_13;
        if (gen_13 < 15) {
          cal_room_13 = 0;
        } else if (gen_13 < 30) {
          cal_room_13 = 1;
        } else if ((gen_13 / 30) % 1 < 0.333) {
          cal_room_13 = Math.floor(gen_13 / 30);
        } else {
          cal_room_13 = Math.ceil(gen_13 / 30);
        }
        this.room_13 = cal_room_13;

        let cal_room_14;
        if (gen_14 < 15) {
          cal_room_14 = 0;
        } else if (gen_14 < 30) {
          cal_room_14 = 1;
        } else if ((gen_14 / 30) % 1 < 0.333) {
          cal_room_14 = Math.floor(gen_14 / 30);
        } else {
          cal_room_14 = Math.ceil(gen_14 / 30);
        }
        this.room_14 = cal_room_14;

        let cal_room_15;
        if (gen_15 < 15) {
          cal_room_15 = 0;
        } else if (gen_15 < 30) {
          cal_room_15 = 1;
        } else if ((gen_15 / 30) % 1 < 0.333) {
          cal_room_15 = Math.floor(gen_15 / 30);
        } else {
          cal_room_15 = Math.ceil(gen_15 / 30);
        }
        this.room_15 = cal_room_15;

        let cal_room_16;
        if (gen_16 < 15) {
          cal_room_16 = 0;
        } else if (gen_16 < 30) {
          cal_room_16 = 1;
        } else if ((gen_16 / 30) % 1 < 0.333) {
          cal_room_16 = Math.floor(gen_16 / 30);
        } else {
          cal_room_16 = Math.ceil(gen_16 / 30);
        }
        this.room_16 = cal_room_16;

        let cal_room_17;
        if (gen_17 < 15) {
          cal_room_17 = 0;
        } else if (gen_17 < 30) {
          cal_room_17 = 1;
        } else if ((gen_17 / 30) % 1 < 0.333) {
          cal_room_17 = Math.floor(gen_17 / 30);
        } else {
          cal_room_17 = Math.ceil(gen_17 / 30);
        }
        this.room_17 = cal_room_17;

        let cal_room_18;
        if (gen_18 < 15) {
          cal_room_18 = 0;
        } else if (gen_18 < 30) {
          cal_room_18 = 1;
        } else if ((gen_18 / 30) % 1 < 0.333) {
          cal_room_18 = Math.floor(gen_18 / 30);
        } else {
          cal_room_18 = Math.ceil(gen_18 / 30);
        }
        this.room_18 = cal_room_18;

        let cal_room_19;
        if (gen_19 < 15) {
          cal_room_19 = 0;
        } else if (gen_19 < 30) {
          cal_room_19 = 1;
        } else if ((gen_19 / 30) % 1 < 0.333) {
          cal_room_19 = Math.floor(gen_19 / 30);
        } else {
          cal_room_19 = Math.ceil(gen_19 / 30);
        }
        this.room_19 = cal_room_19;

        let cal_room_20;
        if (gen_20 < 15) {
          cal_room_20 = 0;
        } else if (gen_20 < 30) {
          cal_room_20 = 1;
        } else if ((gen_20 / 30) % 1 < 0.333) {
          cal_room_20 = Math.floor(gen_20 / 30);
        } else {
          cal_room_20 = Math.ceil(gen_20 / 30);
        }
        this.room_20 = cal_room_20;

        let cal_room_21;
        if (gen_21 < 15) {
          cal_room_21 = 0;
        } else if (gen_21 < 30) {
          cal_room_21 = 1;
        } else if ((gen_21 / 30) % 1 < 0.333) {
          cal_room_21 = Math.floor(gen_21 / 30);
        } else {
          cal_room_21 = Math.ceil(gen_21 / 30);
        }
        this.room_21 = cal_room_21;

        let cal_room_22;
        if (gen_22 < 15) {
          cal_room_22 = 0;
        } else if (gen_22 < 30) {
          cal_room_22 = 1;
        } else if ((gen_22 / 30) % 1 < 0.333) {
          cal_room_22 = Math.floor(gen_22 / 30);
        } else {
          cal_room_22 = Math.ceil(gen_22 / 30);
        }
        this.room_22 = cal_room_22;

        let cal_room_23;
        if (gen_23 < 15) {
          cal_room_23 = 0;
        } else if (gen_23 < 30) {
          cal_room_23 = 1;
        } else if ((gen_23 / 30) % 1 < 0.333) {
          cal_room_23 = Math.floor(gen_23 / 30);
        } else {
          cal_room_23 = Math.ceil(gen_23 / 30);
        }
        this.room_23 = cal_room_23;

        let cal_room_24;
        if (gen_24 < 15) {
          cal_room_24 = 0;
        } else if (gen_24 < 30) {
          cal_room_24 = 1;
        } else if ((gen_24 / 30) % 1 < 0.333) {
          cal_room_24 = Math.floor(gen_24 / 30);
        } else {
          cal_room_24 = Math.ceil(gen_24 / 30);
        }
        this.room_24 = cal_room_24;

        let cal_room_25;
        if (gen_25 < 15) {
          cal_room_25 = 0;
        } else if (gen_25 < 30) {
          cal_room_25 = 1;
        } else if ((gen_25 / 30) % 1 < 0.333) {
          cal_room_25 = Math.floor(gen_25 / 30);
        } else {
          cal_room_25 = Math.ceil(gen_25 / 30);
        }
        this.room_25 = cal_room_25;
        let sum_rooms =
          cal_room_1 +
          cal_room_2 +
          cal_room_3 +
          cal_room_4 +
          cal_room_5 +
          cal_room_6 +
          cal_room_7 +
          cal_room_8 +
          cal_room_9 +
          cal_room_10 +
          cal_room_11 +
          cal_room_12 +
          cal_room_13 +
          cal_room_14 +
          cal_room_15 +
          cal_room_16 +
          cal_room_17 +
          cal_room_18 +
          cal_room_19 +
          cal_room_20 +
          cal_room_21 +
          cal_room_22 +
          cal_room_23 +
          cal_room_24 +
          cal_room_25;

        if (this.user.college_id_code_type_manpower === "6") {
          this.sum_room = sum_rooms;
          let hours = this.editrate_work_sc.hours_teaching;
          let cal_hours = sum_rooms * hours;
          this.sum_hours = cal_hours;
        } else {
          this.sum_room = 0;
          this.sum_hours = 0;
        }
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
