<template>
  <div>
    <v-container id="user-profile" fluid tag="section">
      <v-row justify="center">
        <v-col cols="12" md="4">
          <base-material-card
            class="v-card-profile"
            avatar="/HRvecfiles/logo.png"
          >
            <!-- <base-material-card
          class="v-card-profile"
          avatar="http://localhost:8080/HRvecfiles/logo.png"    
         
        > -->
            <v-card-text class="text-center">
              <div align="center">
                <!-- <img v-if="user.personnel_temporary_pic"    
                width="300"                   
                    style="border-radius: 8px"
                    :src="'http://localhost:8080/HRvecfiles/' + user.personnel_temporary_pic"                    
                  /> 
                  <img v-else
                   width="200" 
                    src="http://localhost:8080/HRvecfiles/blank-human-image.png"
                    style="border-radius: 30px"
                    /> -->
                <img
                  v-if="user.personnel_temporary_pic"
                  width="300"
                  style="border-radius: 8px"
                  :src="'/HRvecfiles/' + user.personnel_temporary_pic"
                />
                <img
                  v-else
                  width="200"
                  src="/HRvecfiles/blank-human-image.png"
                  style="border-radius: 30px"
                />
              </div>
              <div class="text-center">
                <v-btn
                  @click.native="personnelPicDelete()"
                  color="red darken-3"
                  v-if="user.personnel_temporary_pic"
                  dark
                  icon
                >
                  <v-icon>mdi-delete-circle-outline</v-icon>
                </v-btn>
              </div>
              <h3 class="font-weight-light mb-1 grey--text">
                {{ user.id_card }}
              </h3>
              <h3 class="font-weight-light mb-1 grey--text">
                {{ user.title_s }}{{ user.frist_name }} {{ user.last_name }}
              </h3>
              <h4 class="font-weight-light mb-3 black--text">
                {{ user.college_name }}
              </h4>
              <p class="font-weight-light grey--text"></p>

              <div class="text-center">
                <v-btn
                  elevation="2"
                  x-large
                  rounded
                  color="warning"
                  class="mr-0"
                  @click.native="personnelPicUpdate()"
                >
                  <v-icon>mdi-pencil</v-icon> แก้ไขรูปโปรไฟล์</v-btn
                >
              </div>
              <div>
                <v-btn
                  elevation="2"
                  x-large
                  rounded
                  color="warning"
                  class="mr-0"
                  @click.native="passwordUpdate()"
                >
                  <v-icon>mdi-pencil</v-icon>
                  แก้ไขรหัสผ่านเข้าสู่ระบบ</v-btn
                >
              </div>
            </v-card-text>
          </base-material-card>
          <v-card color="#FFF3E0">
            <r-row>
              <v-col cols="12" md="12">
                <div class="text-center">
                  <h3>ขอย้ายกรณีพิเศษ</h3>
                  <span></span>
                  <div class="text-center">
                    <v-btn
                      rounded
                      color="warning"
                      large
                      to="/transference_personnel_sp"
                    >
                      <v-icon class="pa-2">mdi-pencil</v-icon> ย้ายกรณีพิเศษ
                    </v-btn>
                  </div>
                </div>
              </v-col>
            </r-row>
          </v-card>
        </v-col>
        <v-col cols="12" md="8">
          <base-material-card class="text_google">
            <template v-slot:heading>
              <div class="font-weight-light text_google">
                <h2 class="h1 font-weight-light text_google">
                  <v-icon large left>mdi-account</v-icon> ข้อมูลส่วนบุคคล
                </h2>
              </div>
            </template>
            <v-card class="elevation-6" width="100%">
              <v-form>
                <v-container>
                  <v-row>
                    <v-col cols="12" md="12">
                      <dir v-if="user.status_appove === 'wait'">
                        <v-alert
                          text
                          dense
                          color="teal"
                          icon="mdi-clock-fast"
                          border="left"
                        >
                          <h3 class="red--text">
                            ข้อมูลของท่านอยู่ระหว่างการตรวจสอบ
                            ในระหว่างการย้ายรอบที่ผ่านมา
                          </h3>
                        </v-alert>
                      </dir>
                      <div v-else>
                        <v-alert outlined type="success">
                          <v-col cols="12">
                            <v-alert
                              outlined
                              type="info"
                              prominent
                              border="left"
                            >
                              <h2 class="text-center">
                                การยืนย้ายสายการสอนและสายสนับสนุน
                              </h2>
                              <h4 class="text-center">
                                ครั้งที่ 1 ระหว่างวันที่ 1 - 15 ก.พ. ครั้งที่ 2
                                ระหว่างวันที่ 1 - 15 ส.ค.
                              </h4>
                            </v-alert>
                          </v-col>
                          <v-col
                            cols="12"
                            md="12"
                            class="text-center"
                            v-if="
                              periods.period_enable === '1' &&
                                user.user_status === 'tech' &&
                                periods.period_type === 'teacher'
                            "
                          >
                            <v-btn
                              rounded
                              prominent
                              color="primary"
                              border="bottom"
                              x-large
                              dark
                              to="/transference_personnel"
                            >
                              <v-icon>mdi-pencil</v-icon>
                              <h2>การย้ายสายการสอน</h2></v-btn
                            >
                          </v-col>
                          <v-col
                            cols="12"
                            md="12"
                            class="text-right"
                            v-if="
                              periods.period_enable === '1' &&
                                user.user_status === 'se_director' &&
                                periods.period_type === 'manage'
                            "
                          >
                            <v-btn
                              prominent
                              color="primary"
                              border="bottom"
                              x-large
                              dark
                              to="/transference_manage"
                            >
                              <v-icon>mdi-pencil</v-icon>
                              การย้ายสายงานบริหารสถานศึกษา</v-btn
                            >
                          </v-col>
                          <v-col
                            cols="12"
                            md="12"
                            class="text-right"
                            v-if="
                              periods.period_enable === '1' &&
                                user.user_status === 'director' &&
                                periods.period_type === 'manage'
                            "
                          >
                            <v-btn
                              prominent
                              color="primary"
                              border="bottom"
                              x-large
                              dark
                              to="/transference_manage"
                            >
                              <v-icon>mdi-pencil</v-icon>
                              การย้ายสายงานบริหารสถานศึกษา</v-btn
                            >
                          </v-col>
                        </v-alert>
                      </div>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-list two-line outlined>
                        <v-list-item>
                          <v-list-item-icon>
                            <v-icon color="indigo">
                              mdi-domain
                            </v-icon>
                          </v-list-item-icon>

                          <v-list-item-content>
                            <v-list-item-title>สังกัด</v-list-item-title>
                            <v-list-item-subtitle>{{
                              user.college_name
                            }}</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                          <v-list-item-action></v-list-item-action>

                          <v-list-item-content>
                            <v-list-item-title>เลขที่ตำแหน่ง</v-list-item-title>
                            <v-list-item-subtitle>
                              {{ user.id_position }}</v-list-item-subtitle
                            >
                          </v-list-item-content>
                          <v-list-item-content>
                            <v-list-item-title>ตำแหน่ง</v-list-item-title>
                            <v-list-item-subtitle>
                              {{ user.position_name }}</v-list-item-subtitle
                            >
                          </v-list-item-content>
                        </v-list-item>

                        <v-divider inset></v-divider>

                        <v-list-item>
                          <v-list-item-icon>
                            <v-icon color="indigo">
                              mdi-school
                            </v-icon>
                          </v-list-item-icon>

                          <v-list-item-content>
                            <v-list-item-title>คุณวุฒิ</v-list-item-title>
                            <v-list-item-subtitle>{{
                              user.ed_abb
                            }}</v-list-item-subtitle>
                          </v-list-item-content>
                          <v-list-item-content>
                            <v-list-item-title>สาขาวิชาเอก</v-list-item-title>
                            <v-list-item-subtitle>{{
                              user.ed_name
                            }}</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>

                        <v-divider inset></v-divider>

                        <v-list-item>
                          <v-list-item-icon>
                            <v-icon color="indigo">
                              mdi-account-settings
                            </v-icon>
                          </v-list-item-icon>

                          <v-list-item-content>
                            <v-list-item-title>วิทยฐานะ</v-list-item-title>
                            <v-list-item-subtitle>{{
                              user.rang_name
                            }}</v-list-item-subtitle>
                          </v-list-item-content>
                          <v-list-item-content>
                            <v-list-item-title>ระดับ</v-list-item-title>
                            <v-list-item-subtitle>{{
                              user.rang_level
                            }}</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-list two-line outlined>
                        <v-list-item>
                          <v-list-item-icon>
                            <v-icon color="indigo">
                              mdi-account-box
                            </v-icon>
                          </v-list-item-icon>

                          <v-list-item-content>
                            <v-list-item-title
                              >รหัสบัตรประชาชน</v-list-item-title
                            >
                            <v-list-item-subtitle>{{
                              user.id_card
                            }}</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>

                        <v-list-item>
                          <v-list-item-action></v-list-item-action>

                          <v-list-item-content>
                            <v-list-item-title
                              >วันเดือนปี เกิด</v-list-item-title
                            >
                            <v-list-item-subtitle>
                              {{ user.brith_day }}/{{ user.brith_month }}/{{
                                user.brith_year
                              }}</v-list-item-subtitle
                            >
                          </v-list-item-content>

                          <v-list-item-content>
                            <v-list-item-title
                              >วันเดือนปี บรรจุ</v-list-item-title
                            >
                            <v-list-item-subtitle>
                              {{ user.appoin_day }}/{{ user.appoin_month }}/{{
                                user.appoin_year
                              }}</v-list-item-subtitle
                            >
                          </v-list-item-content>
                        </v-list-item>

                        <v-divider inset></v-divider>

                        <v-list-item>
                          <v-list-item-icon>
                            <v-icon color="indigo">
                              mdi-school
                            </v-icon>
                          </v-list-item-icon>

                          <v-list-item-content>
                            <v-list-item-title>คุณวุฒิ</v-list-item-title>
                            <v-list-item-subtitle>{{
                              user.ed_abb
                            }}</v-list-item-subtitle>
                          </v-list-item-content>
                          <v-list-item-content>
                            <v-list-item-title>สาขาวิชาเอก</v-list-item-title>
                            <v-list-item-subtitle>{{
                              user.ed_name
                            }}</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>

                        <v-divider inset></v-divider>

                        <v-list-item>
                          <v-list-item-icon>
                            <v-icon color="indigo">
                              mdi-account-settings
                            </v-icon>
                          </v-list-item-icon>

                          <v-list-item-content>
                            <v-list-item-title>เกษียณ</v-list-item-title>
                            <v-list-item-subtitle>{{
                              user.retrire_year
                            }}</v-list-item-subtitle>
                          </v-list-item-content>
                          <v-list-item-content>
                            <v-list-item-title
                              >เบอร์โทรติดต่อ</v-list-item-title
                            >
                            <v-list-item-subtitle>{{
                              user.tel_p
                            }}</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                        <v-divider inset></v-divider>

                        <v-list-item>
                          <v-list-item-icon>
                            <v-icon color="indigo">
                              mdi-account-settings
                            </v-icon>
                          </v-list-item-icon>

                          <v-list-item-content>
                            <v-list-item-title>สถานภาพสมรส</v-list-item-title>
                            <v-list-item-subtitle>{{
                              marital_status
                            }}</v-list-item-subtitle>
                          </v-list-item-content>
                          <v-list-item-content>
                            <v-list-item-title>E-mail</v-list-item-title>
                            <v-list-item-subtitle>{{
                              user.e_mail
                            }}</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                        <div class="text-center">
                          <v-btn
                            elevation="2"
                            x-large
                            rounded
                            color="warning"
                            class="mr-0"
                            @click.native="personnelUpdate()"
                          >
                            <v-icon>mdi-pencil</v-icon>
                            แก้ไขข้อมูลเบื้องต้น</v-btn
                          >
                        </div>
                      </v-list>
                    </v-col>

                    <v-col cols="12" md="12">
                      <dir v-if="user.status_appove === 'wait'"></dir>
                      <div v-else>
                        <h2 class="text-center">
                          * ข้อมูลส่วนบุคลคลให้ท่านตรวจสอบ
                          และแก้ไขข้อมูลให้เรียบร้อยก่อนการ เสนอย้าย
                        </h2>
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card>
            <v-card>
              <v-data-table
                color="success"
                :loading="loading"
                :headers="headers"
                :items="transference_personnels"
              >
                <template v-slot:[`item`]="{ item, index }">
                  <tr>
                    <td class="text-center">{{ index + 1 }}</td>
                    <td class="text-center">{{ item.tid_ref }}</td>
                    <td class="text-center">{{ item.id_card }}</td>
                    <td class="text-center">{{ item.frist_name }}</td>
                    <td class="text-center">{{ item.last_name }}</td>
                    <td class="text-center">{{ item.time_ss }}</td>
                    <td class="text-center">{{ item.year_ss }}</td>
                    <td class="text-center">{{ item.age_app_time }}</td>
                    <td class="text-center">{{ item.date_time }}</td>
                    <td class="text-center">
                      <v-chip
                        v-if="item.comment_dr_c === 'approp'"
                        color="green"
                        dark
                        >เห็นควร</v-chip
                      >
                      <v-chip
                        v-else-if="item.comment_dr_c === 'inapprop'"
                        color="red"
                        dark
                        >ไม่เห็นควร</v-chip
                      >
                      <v-icon large v-else color="info"
                        >mdi-comment-processing</v-icon
                      >
                    </td>
                  </tr>
                </template>
              </v-data-table>
            </v-card>
          </base-material-card>
        </v-col>
      </v-row>

      <!-- V-model userdialog -->
      <v-layout row justify-center>
        <v-dialog v-model="addpersonneldialog" persistent max-width="80%">
          <v-card class="mx-auto pa-6" elevation="2">
            <base-material-card
              color="yellow"
              icon="mdi-clipboard-text"
              title="แก้ไขข้อมูลเบื้องต้น"
              class="px-5 py-3 text_google"
              elevation="2"
            >
              <div align="right">
                {{ user.id_card }} {{ user.title_s }}{{ user.frist_name }}
                {{ user.last_name }}
              </div>
            </base-material-card>
            <v-card-text>
              <v-form ref="personnelform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md2>
                      <v-select
                        outlined
                        label="สถานภาพสมรส"
                        :items="user_marital_status"
                        item-text="title"
                        item-value="value"
                        v-model="user.marital_status"
                      ></v-select>
                    </v-flex>
                    <v-flex
                      md3
                      v-if="
                        user.marital_status == 'married' ||
                          user.marital_status == 'separate'
                      "
                    >
                      <v-text-field
                        outlined
                        label="รหัสบัตรประชาชนคู่สมรส :"
                        v-model="user.id_card_m"
                        required
                        :rules="[v => !!v || '']"
                      ></v-text-field>
                    </v-flex>
                    <v-flex
                      md2
                      v-if="
                        user.marital_status == 'married' ||
                          user.marital_status == 'separate'
                      "
                    >
                      <v-text-field
                        outlined
                        label="คำนำหน้าชื่อ :"
                        v-model="user.title_sm"
                        required
                        :rules="[v => !!v || '']"
                      ></v-text-field>
                    </v-flex>
                    <v-flex
                      md3
                      v-if="
                        user.marital_status == 'married' ||
                          user.marital_status == 'separate'
                      "
                    >
                      <v-text-field
                        outlined
                        label="ชื่อ :"
                        v-model="user.frist_namem"
                        required
                        :rules="[v => !!v || '']"
                      ></v-text-field>
                    </v-flex>
                    <v-flex
                      md2
                      v-if="
                        user.marital_status == 'married' ||
                          user.marital_status == 'separate'
                      "
                    >
                      <v-text-field
                        outlined
                        label="นามสกุล :"
                        v-model="user.last_namem"
                        required
                        :rules="[v => !!v || '']"
                      ></v-text-field>
                    </v-flex>
                    <v-flex
                      md4
                      v-if="
                        user.marital_status == 'married' ||
                          user.marital_status == 'separate'
                      "
                    >
                      <v-text-field
                        outlined
                        label="อาชีพ :"
                        v-model="user.occupation_sm"
                        required
                        :rules="[v => !!v || '']"
                      ></v-text-field>
                    </v-flex>
                    <v-flex
                      md4
                      v-if="
                        user.marital_status == 'married' ||
                          user.marital_status == 'separate'
                      "
                    >
                      <v-text-field
                        outlined
                        label="สถานที่ทำงาน :"
                        v-model="user.work_placem"
                        required
                        :rules="[v => !!v || '']"
                      ></v-text-field>
                    </v-flex>
                    <v-flex
                      md4
                      v-if="
                        user.marital_status == 'married' ||
                          user.marital_status == 'separate'
                      "
                    >
                      <v-autocomplete
                        :items="provices_sh"
                        item-text="province_name"
                        item-value="province_ID"
                        label="ภูมิลำเนาของคู่สมรส จังหวัด : "
                        required
                        outlined
                        :rules="[v => !!v || '']"
                        v-model="user.province_IDm"
                      ></v-autocomplete>
                    </v-flex>
                    <v-flex xs12>
                    <hr color="primary">
                    </v-flex>
                    <v-flex md4>
                      <v-text-field
                        outlined
                        label="เบอร์โทรติดต่อ ของท่าน : "
                        v-model="user.tel_p"
                      ></v-text-field>
                    </v-flex>
                    <v-flex md4>
                      <v-text-field
                        outlined
                        label="E-mail ของท่าน :"
                        v-model="user.e_mail"
                      ></v-text-field>
                    </v-flex>
                     <v-flex
                      md4                    
                    >
                      <v-autocomplete
                        :items="provices_sh"
                        item-text="province_name"
                        item-value="province_ID"
                        label="ภูมิลำเนาของข้าพเจ้า จังหวัด : "
                        required
                        outlined
                        :rules="[v => !!v || '']"
                        v-model="user.domicile_pt"
                      ></v-autocomplete>
                    </v-flex>
                    <v-flex xs12>
                      <v-divider></v-divider>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn large @click.stop="addpersonneldialog = false" rounded>
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn
                large
                color="success"
                @click.stop="personnelSubmit()"
                rounded
              >
                <v-icon dark>mdi-content-save</v-icon>&nbsp;บันทึก
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model passworddialog -->
      <v-layout row justify-center>
        <v-dialog v-model="passwoorddialog" persistent max-width="50%">
          <v-card class="mx-auto pa-6" elevation="2">
            <base-material-card
              color="yellow"
              icon="mdi-clipboard-text"
              title="แก้ไขรหัสผ่าน"
              class="px-5 py-3 text_google"
              elevation="2"
            >
              <div align="right">
                {{ user.id_card }} {{ user.title_s }}{{ user.frist_name }}
                {{ user.last_name }}
              </div>
            </base-material-card>
            <v-card-text>
              <v-form ref="passwordform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md6>
                      <v-text-field
                        outlined
                        label="Password"
                        v-model="user.p_word"
                        type="password"
                        required
                        :rules="[v => !!v || '']"
                      ></v-text-field>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        outlined
                        label="Confirm Password"
                        v-model="user.user_confirmpassword"
                        type="password"
                        :rules="[v => v == user.p_word]"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-divider></v-divider>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn large @click.stop="passwoorddialog = false" rounded>
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn
                large
                color="success"
                @click.stop="passwordSubmit()"
                rounded
              >
                <v-icon dark>mdi-content-save</v-icon>&nbsp;บันทึก
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- Update Pic -->
      <v-layout>
        <v-dialog
          v-model="personnel_temporary_pic_dialog"
          persistent
          max-width="50%"
        >
          <v-card class="mx-auto pa-6" elevation="2">
            <base-material-card
              color="yellow"
              icon="mdi-clipboard-text"
              title="แก้ไขรูปโปรไฟล์"
              class="px-5 py-3 text_google"
              elevation="2"
            >
            </base-material-card>
            <v-card-text>
              <v-form ref="form5" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12>
                      เลือกไฟล์ภาพของท่าน : ชนิด JPEG / JPG
                      <input type="file" ref="file2" id="file2" />
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                large
                @click.stop="personnel_temporary_pic_dialog = false"
                rounded
              >
                <v-icon dark>mdi-close</v-icon>ยกเลิก</v-btn
              >
              <v-btn
                large
                color="success"
                @click.stop="editpersonnel_temporaryinfoSubmit()"
                rounded
              >
                <v-icon dark>mdi-content-save</v-icon> &nbsp;บันทึก</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Delete Pic -->
        <v-dialog v-model="deletefiledialog" persistent max-width="50%">
          <v-card>
            <v-card-title class="red darken-3 white--text elevation-2">
              <v-icon medium dark>fa-school</v-icon>&nbsp;ลบข้อมูลไฟล์รูป
            </v-card-title>
            <v-card-text>
              <v-form ref="deletestandardtopicform2" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12 class="text-xs-center red--text">
                      ยืนยันการลบไฟล์รูป {{ this.user.personnel_temporary_pic }}
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click.native="deletefiledialog = false" rounded>
                <v-icon dark>mdi-close</v-icon>ยกเลิก</v-btn
              >
              <v-btn
                color="red darken-3"
                @click.native="deletefileSubmit2()"
                rounded
                dark
              >
                <v-icon dark>mdi-delete</v-icon>&nbsp;ลบ</v-btn
              >
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
      period_enable: "1",
      addpersonneldialog: false,
      personnel_temporary_pic_dialog: false,
      deletefiledialog: false,
      passwoorddialog: false,
      transference_personnels: [],
      valid: true,
      user: {},
      user: {},
      updateuser: {},
      personnel: {},
      periods: [],
      snackbar: {
        show: false,
        color: "",
        timeout: 5000,
        icon: "",
        text: ""
      },
      provices_sh: [],
      user_marital_status: [
        { title: "โสด", value: "single" },
        { title: "สมรส", value: "married" },
        { title: "หม้าย", value: "widow" },
        { title: "หย่า", value: "divorce" },
        { title: "แยกกันอยู่", value: "separate" }
      ],
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      headers: [
        { text: "#", align: "center", value: "index" },
        { text: "อ้างอิง", align: "center", value: "tid_ref" },
        { text: "รหัสบัตรประชาชน", align: "center", value: "id_card" },
        { text: "ชื่อ", align: "center", value: "frist_name" },
        { text: "นามสกุล", align: "center", value: "last_name" },
        { text: "ครั้งที่", align: "center", value: "time_ss" },
        { text: "ปีที่", align: "center", value: "year_ss" },
        { text: "อายุงาน ณ ปัจจุบัน", align: "center", value: "age_app_time" },
        { text: "วันที่ทำรายการ", align: "center", value: "date_time" },
        { text: "ความคิดเห็นผู้อำนวยการ", align: "center", value: "actions" }
      ],
      rowsperpage: [
        25,
        50,
        100,
        {
          text: "All",
          value: -1
        }
      ]
    };
  },
  async mounted() {
    let result;
    this.loading = true;
    let useression = JSON.parse(sessionStorage.getItem("user")) || 0;
    result = await this.$http
      .post("personnel_temporary.php", {
        ApiKey: this.ApiKey,
        id_card: useression.id_card
      })
      .finally(() => (this.loading = false));
    this.users = result.data;

    let result_provice;
    result_provice = await this.$http.post("province_sh.php", {
      ApiKey: this.ApiKey
    });
    this.provices_sh = result_provice.data;

    await this.personnelQuery();
    await this.transference_personnelQueryAll();
    await this.periodQuery();
  },

  methods: {
    async periodQuery() {
      let result_period;
      result_period = await this.$http.post("period.php", {
        ApiKey: this.ApiKey,
        period_enable: this.period_enable,
        period_type: this.user_status_type
      });
      this.periods = result_period.data;
    },

    async personnelQuery() {
      this.loading = true;
      let result = await this.$http
        .post("personnel_temporary.php", {
          ApiKey: this.ApiKey,
          id_card: this.users.id_card
        })
        .finally(() => (this.loading = false));
      this.user = result.data;
    },

    async personnelUpdate() {
      this.user.p_word = "";
      this.addpersonneldialog = true;
    },

    async personnelPicUpdate() {
      this.updateuser.id_card = this.user.id_card;
      this.user.p_word = "";
      this.personnel_temporary_pic_dialog = true;
    },

    async passwordUpdate() {
      this.updateuser.id_card = this.user.id_card;
      this.user.p_word = "";
      this.passwoorddialog = true;
    },

    async personnelPicDelete() {
      this.updateuser.personnel_temporary_pic = this.user.personnel_temporary_pic;
      this.updateuser.id_card = this.user.id_card;
      this.deletefiledialog = true;
    },

    async transference_personnelQueryAll() {
      this.loading = true;
      let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
      let result = await this.$http
        .post("transference_personnel.php", {
          ApiKey: this.ApiKey,
          id_card: userSession.id_card
        })
        .finally(() => (this.loading = false));
      this.transference_personnels = result.data;
    },

    async personnelSubmit() {
      if (this.$refs.personnelform.validate()) {
        this.user.ApiKey = this.ApiKey;
        if (this.user.p_word == "") delete this.user.p_word;
        let result = await this.$http.post(
          "personnel_temporary.update.php",
          this.user
        );
        let result_m = await this.$http.post(
          "personnel_marriage.insert.php",
          this.user
        );
        if (result.data.status == true || result_m.data.status == true) {
          this.snackbar.icon = "mdi-font-awesome";
          this.snackbar.color = "success";
          this.snackbar.text = "แก้ไขข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.personnelQuery();
        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text = "แก้ไขข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.addpersonneldialog = false;
      }
    },

    async passwordSubmit() {
      if (this.$refs.passwordform.validate()) {
        this.user.ApiKey = this.ApiKey;
        let result = await this.$http.post(
          "personnel_temporary.update.php",
          this.user
        );
        if (result.data.status == true || result_m.data.status == true) {
          this.user = result.data;
          this.snackbar.icon = "mdi-font-awesome";
          this.snackbar.color = "success";
          this.snackbar.text = "แก้ไขข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.personnelQuery();
        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text = "แก้ไขข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.passwoorddialog = false;
      }
    },

    async editpersonnel_temporaryinfoSubmit(upload) {
      let result = "";
      let uploaded = null;
      if (this.$refs.file2.files[0]) {
        if (this.$refs.file2.files[0].type == "image/jpeg") {
          let formData = new FormData();
          let filename =
            this.updateuser.id_card + "." + this.time_stamp + "." + "user.jpg";
          formData.append("file", this.$refs.file2.files[0]);
          formData.append("filename", "../HRvecfiles/" + filename);
          formData.append("ApiKey", this.ApiKey);
          result = await this.$http.post("uploadfile.php", formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          });
          if (result.data.status == true) {
            this.user.personnel_temporary_pic = "";
            this.updateuser.personnel_temporary_pic = filename;
          }
          uploaded = true;
        } else {
          uploaded = false;
        }
      } else {
        upload = false;
      }

      this.updateuser.ApiKey = this.ApiKey;
      result = await this.$http.post(
        "personnel_temporary.update.php",
        this.updateuser
      );
      if (result.data.status == true || uploaded == true) {
        await this.personnelQuery();
        this.snackbar.icon = "mdi-font-awesome";
        this.snackbar.color = "success";
        this.snackbar.text = "บันทึกข้อมูลเรียบร้อย";
        this.snackbar.show = true;
      } else {
        if (!uploaded && upload) {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text =
            "ไฟล์ที่แนบไม่ถูกต้อง กรุณาแนบไฟล์เป็น jpg หรือ jpeg เท่านั้น";
          this.snackbar.show = true;
        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text = "บันทึกข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
      }
      this.personnel_temporary_pic_dialog = false;
    },
    async deletefileSubmit2() {
      let result = await this.$http.post("deletefile.php", {
        ApiKey: this.ApiKey,
        filename: "../HRvecfiles/" + this.updateuser.personnel_temporary_pic
      });

      if (result.data.status) {
        result = await this.$http.post("personnel_temporary.update.php", {
          ApiKey: this.ApiKey,
          personnel_temporary_pic: "",
          id_card: this.updateuser.id_card
        });

        if (result.data.status == true) {
          this.snackbar.icon = "mdi-font-awesome";
          this.snackbar.color = "success";
          this.snackbar.text = "ลบข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.personnelQuery();
        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text = "ลบข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
      }
      this.deletefiledialog = false;
    }
  },
  computed: {
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
    time_stamp() {
      const d = new Date();
      let time = Math.floor(d.getTime() / 1000);
      return time;
    },
    user_status_type() {
      let user_status = this.user.user_status;
      let result;
      if (user_status == "tech") {
        result = "teacher";
      } else if (user_status == "director") {
        result = "manage";
      } else if (user_status == "se_director") {
        result = "manage";
      }
      return result;
    }
  }
};
</script>
<style>
v-img {
  border-radius: 8px;
}
</style>
