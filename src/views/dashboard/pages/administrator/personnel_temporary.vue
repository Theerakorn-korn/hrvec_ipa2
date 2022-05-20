<template>
  <div>
    <v-container fluid>
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
                filled
                class="mb-2"
              />
              <v-radio-group row>
                <v-radio
                  label="ชื่อ"
                  value="radio-1"
                  @click.native="search_name()"
                ></v-radio>
                <v-radio
                  label="นามสกุล"
                  value="radio-2"
                  @click.native="search_lastname()"
                ></v-radio>
                <v-radio
                  label="รหัสบัตรประชาชน"
                  value="radio-3"
                  @click.native="search_idcard()"
                ></v-radio>

                <v-radio
                  label="ปีที่เกษียณ"
                  value="radio-5"
                  @click.native="search_yearretire()"
                ></v-radio>
                <v-radio
                  label="แสดงทั้งหมด"
                  value="radio-6"
                  @click.native="personnel_temporaryQueryAll()"
                ></v-radio>
              </v-radio-group>
              <v-autocomplete
                v-model="college_search"
                outlined
                :items="colleges"
                item-text="college_name"
                item-value="college_code"
                label="สถานศึกษา"
                @change="search_college()"
              >
              </v-autocomplete>
            </v-col>
            <v-col cols="12" lg="2" class="text-right">
              <v-select
                v-model="position_search"
                outlined
                :items="position_select"
                item-text="text"
                item-value="value"
                label="ตำแหน่ง"
                @change="search_position()"
              >
              </v-select>
                <v-btn
                large
                color="primary"
                @click.native="personnel_temporaryCSV()"
              >
                <v-icon>mdi-plus-circle-outline</v-icon>
                <h3>นำเข้าไฟล์รายชื่อ CSV</h3>
              </v-btn>
            </v-col>
            <v-col cols="12" lg="2" class="text-right">
              <v-select
                v-model="rangname_search"
                outlined
                :items="rang_names"
                item-text="text"
                item-value="value"
                label="วิทยฐานะ"
                @change="search_rang()"
              >
              </v-select>
            </v-col>
            <v-col cols="12" lg="2" class="text-left">
              <v-btn
                large
                color="primary"
                @click.native="personnel_temporaryAdd()"
              >
                <v-icon>mdi-plus-circle-outline</v-icon>
                <h3>เพิ่มรายการ</h3>
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

          <template v-slot:[`item.date_app_now`]="{ item }">
            {{
              item.date_app_now
                | moment("add", "543 years")
                | moment("D MMMM YYYY")
            }}
          </template>

          <template v-slot:[`item.actions`]="{ item }">
            <v-icon
              color="yellow"
              @click.stop="personnel_temporaryEdit(item.id_rc)"
            >
              mdi-pencil
            </v-icon>
          </template>
          <!--  <template v-slot:[`item.action_s`]="{ item }">
            <v-icon
              color="red"
              @click.stop="personnel_temporaryDelete(item.id_rc)"
            >
              mdi-delete
            </v-icon>
          </template> -->
          <v-alert slot="no-results" :value="true" color="error" icon="warning">
            Your search for "{{ search }}" found no results.
          </v-alert>
        </v-data-table>
      </base-material-card>

      <!--addpersonnel_temporarydialog  -->
      <v-layout row justify-center>
        <v-dialog
          v-model="addpersonnel_temporarydialog"
          persistent
          max-width="80%"
        >
          <v-card class="mx-auto pa-5">
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
                      <v-select
                        :items="userstatus"
                        item-text="user_status_name"
                        item-value="user_status_sub"
                        v-model="addpersonnel_temporary.user_status"
                        label="ประเภท"
                        required
                        :rules="[v => !!v || '']"
                        outlined
                        prepend-icon="mdi-format-list-bulleted-type"
                      ></v-select>
                    </v-flex>
                    <v-flex
                      xs12
                      v-if="
                        addpersonnel_temporary.user_status == 'tech' ||
                          addpersonnel_temporary.user_status == 'se_director' ||
                          addpersonnel_temporary.user_status == 'director'
                      "
                    >
                      <v-autocomplete
                      outlined
                       prepend-icon="mdi-school"
                        :items="colleges"
                        item-text="college_name"
                        item-value="college_code"
                        v-model="addpersonnel_temporary.college_code"
                        label="วิทยาลัย"
                        @change="man_powerQuery()"
                        required
                        :rules="[v => !!v || '']"
                      >
                      </v-autocomplete>
                    </v-flex>
                    <v-flex xs12>
                      <v-divider></v-divider>
                    </v-flex>
                    <v-flex md12>
                      <v-text-field
                      outlined
                      prepend-icon="mdi-content-duplicate"
                        label="คำสั่งที่"
                        v-model="addpersonnel_temporary.order_app_now"
                        required
                        :rules="[v => !!v || '']"
                      ></v-text-field>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                      outlined
                      prepend-icon="mdi-account-key"
                        label="รหัสบัตรประชาชน"
                        v-model="addpersonnel_temporary.id_card"
                        required
                        :rules="[v => !!v || '']"
                      ></v-text-field>
                    </v-flex>
                    <v-flex md6> </v-flex>
                    <v-flex md4>
                      <v-text-field
                       prepend-icon="mdi-account-box"                      
                      outlined
                        label="คำนำหน้าชื่อ"
                        v-model="addpersonnel_temporary.title_s"
                        require
                        :rules="[v => !!v || '']"
                      ></v-text-field>
                    </v-flex>
                    <v-flex md4>
                      <v-text-field
                      prepend-icon="mdi-account-box"      
                      outlined
                        label="ชื่อ"
                        v-model="addpersonnel_temporary.frist_name"
                        require
                        :rules="[v => !!v || '']"
                      ></v-text-field>
                    </v-flex>
                    <v-flex md4>
                      <v-text-field
                      prepend-icon="mdi-account-box"      
                      outlined
                        label="นามสกุล"
                        v-model="addpersonnel_temporary.last_name"
                        required
                        :rules="[v => !!v || '']"
                      ></v-text-field>
                    </v-flex>
                    <v-flex md6>
                      <v-autocomplete
                      prepend-icon="mdi-account-settings"    
                      outlined
                        :items="userstatus"
                        item-text="user_status_name"
                        item-value="user_status_name"
                        label="ตำแหน่ง"
                        v-model="addpersonnel_temporary.position_name"
                        required
                        :rules="[v => !!v || '']"
                      ></v-autocomplete>
                    </v-flex>
                    <v-flex md6>
                      <v-autocomplete
                       prepend-icon="mdi-account-settings"    
                      outlined
                        :items="man_powers"
                        item-text="college_position"
                        item-value="id_position"
                        label="เลขที่ตำแหน่ง"
                        v-model="addpersonnel_temporary.id_position"
                        required
                        :rules="[v => !!v || '']"
                      ></v-autocomplete>
                    </v-flex>
                    <v-flex md6>
                      <v-autocomplete
                       prepend-icon="mdi-account-settings"    
                      outlined
                        :items="rang_names"
                        item-text="text"
                        item-value="value"
                        label="วิทยฐานะ"
                        v-model="addpersonnel_temporary.rang_name"
                        required
                        :rules="[v => !!v || '']"
                      ></v-autocomplete>
                    </v-flex>
                    <v-flex md6>
                      <v-select
                      outlined
                       prepend-icon="mdi-account-settings"    
                        :items="rang_levels"
                        label="ระดับ"
                        v-model="addpersonnel_temporary.rang_level"
                        required
                        :rules="[v => !!v || '']"
                      ></v-select>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                       prepend-icon="mdi-account-settings"    
                      outlined
                        label="คุณวิฒิ"
                        v-model="addpersonnel_temporary.ed_abb"
                        required
                        :rules="[v => !!v || '']"
                      ></v-text-field>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field     
                       prepend-icon="mdi-account-settings"    
                      outlined
                        label="สาขาวิชา"
                        v-model="addpersonnel_temporary.ed_name"
                        required
                        :rules="[v => !!v || '']"
                      ></v-text-field>
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
                          outlined
                            v-model="addpersonnel_temporary.birthday"
                            label="วันเดือนปีเกิด"
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
                          v-model="addpersonnel_temporary.birthday"
                          no-title
                          scrollable
                          locale="th"
                        >
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="menu = false">
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
                          outlined
                            v-model="addpersonnel_temporary.appoin_days"
                            label="วันเดือนปีที่บรรจุ"
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
                          v-model="addpersonnel_temporary.appoin_days"
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
                    <v-flex md6>
                      <v-text-field
                      prepend-icon="mdi-cellphone" 
                      outlined
                        label="เบอร์โทร"
                        v-model="addpersonnel_temporary.tel_p"
                        required
                        :rules="[v => !!v || '']"
                      ></v-text-field>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                      prepend-icon="mdi-email" 
                      outlined
                        label="E-mail"
                        v-model="addpersonnel_temporary.e_mail"
                        required
                        :rules="[v => !!v || '']"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
                <small>* จำเป็น</small> <span>ปีเกษียณ :{{ retrire_year }}</span>
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

      <!-- V-model csvpersonnel_temporarydialog -->
      <v-layout>
        <v-dialog
          v-model="csvpersonnel_temporarydialog"
          persistent
          max-width="50%"
        >
          <v-card class="mx-auto pa-5">
            <base-material-card
              color="green"
              icon="mdi-content-paste"
              title="นำเข้าข้อมูลไฟล์ CSV"
              class="px-5 py-3 text_google"
            >
            </base-material-card>

            <v-card-text>
              <v-card>
                <v-card-text>
                  <v-form
                    ref="csvpersonnel_temporarydialogform"
                    lazy-validation
                  >
                    <v-container grid-list-md>
                      <v-row>
                        <v-col cols="12" md="12">
                          <v-alert
                            border="left"
                            colored-border
                            type="info"
                            elevation="2"
                          >
                            <h2>
                              นำเข้าข้อมูลไฟล์ CSV
                              <input type="file" ref="file2" id="file2" />
                            </h2>
                          </v-alert>

                          <!--   <v-file-input
                          type="file"                          
                            label="File input"
                            ref="file2" id="file2"
                          ></v-file-input> -->
                        </v-col>
                        <v-col cols="12" md="12" class="text-center">
                          <v-btn
                            large
                            color="green"
                            @click.stop="csvpersonnel_temporarySubmit()"
                          >
                            <v-icon>mdi-book-plus</v-icon>
                            นำเข้า</v-btn
                          ><v-btn
                            large
                            color="info"
                            to="/college/personnel_form_import/"
                            target="_blank"
                          >
                            <v-icon>mdi-exit-to-app</v-icon
                            >ส่งออกไฟล์บันทึกข้อมูล</v-btn
                          >
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-card-text>
            <v-row>
              <v-col cols="12" md="12" class="text-right">
                <v-btn
                  class="mx-2"
                  fab
                  dark
                  large
                  color="grey"
                  @click.stop="csvpersonnel_temporarydialog = false"
                >
                  <v-icon dark>
                    mdi-close
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model deletepersonnel_temporarydialog -->
      <v-layout>
        <v-dialog
          v-model="deletepersonnel_temporarydialog"
          persistent
          max-width="40%"
        >
          <v-card class="mx-auto pa-5">
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
                          ยืนยันการลบข้อมูลผู้ใช้
                          {{ editpersonnel_temporary.college_code }}
                          <span v-if="editpersonnel_temporary.college_name">{{
                            editpersonnel_temporary.college_name
                          }}</span>
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
              <v-btn
                large
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
        <v-dialog
          v-model="editpersonnel_temporarydialog"
          persistent
          max-width="80%"
        >
          <v-card class="mx-auto pa-6">
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
                      <v-select
                        v-model="editpersonnel_temporary.user_status"
                        :items="userstatus"
                        item-text="user_status_name"
                        item-value="user_status_sub"
                        label="Type"
                        required
                        :rules="[v => !!v || '']"
                      ></v-select>
                    </v-flex>
                    <v-flex
                      xs12
                      v-if="
                        editpersonnel_temporary.user_status == 'tech' ||
                          editpersonnel_temporary.user_status ==
                            'se_director' ||
                          editpersonnel_temporary.user_status == 'director'
                      "
                    >
                      <v-autocomplete
                        v-model="editpersonnel_temporary.college_code"
                        :items="colleges"
                        item-text="college_name"
                        item-value="college_code"
                        label="วิทยาลัย"
                        @change="man_powerQuery()"
                        required
                        :rules="[v => !!v || '']"
                      >
                      </v-autocomplete>
                    </v-flex>
                    <v-flex xs12>
                      <v-divider></v-divider>
                    </v-flex>
                    <v-flex md12>
                      <v-text-field
                        label="คำสั่งที่"
                        v-model="editpersonnel_temporary.order_app_now"
                      ></v-text-field>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        label="รหัสบัตรประชาชน"
                        v-model="editpersonnel_temporary.id_card"
                      ></v-text-field>
                    </v-flex>
                    <v-flex md6> </v-flex>
                    <v-flex md4>
                      <v-text-field
                        label="คำนำหน้าชื่อ"
                        v-model="editpersonnel_temporary.title_s"
                      ></v-text-field>
                    </v-flex>
                    <v-flex md4>
                      <v-text-field
                        label="ชื่อ"
                        v-model="editpersonnel_temporary.frist_name"
                      ></v-text-field>
                    </v-flex>
                    <v-flex md4>
                      <v-text-field
                        label="นามสกุล"
                        v-model="editpersonnel_temporary.last_name"
                      ></v-text-field>
                    </v-flex>
                    <v-flex md6>
                      <v-autocomplete
                        v-model="editpersonnel_temporary.position_name"
                        :items="userstatus"
                        item-text="user_status_name"
                        item-value="user_status_name"
                        label="ตำแหน่ง"
                      ></v-autocomplete>
                    </v-flex>
                    <v-flex md6>
                      <v-autocomplete
                        v-model="editpersonnel_temporary.id_position"
                        :items="man_powers"
                        item-text="college_position"
                        item-value="id_position"
                        label="เลขที่ตำแหน่ง"
                      ></v-autocomplete>
                    </v-flex>
                    <v-flex md6>
                      <v-autocomplete
                        v-model="editpersonnel_temporary.rang_name"
                        :items="rang_names"
                        item-text="text"
                        item-value="value"
                        label="วิทยฐานะ"
                      ></v-autocomplete>
                    </v-flex>
                    <v-flex md6>
                      <v-select
                        v-model="editpersonnel_temporary.rang_level"
                        :items="rang_levels"
                        label="ระดับ"
                      ></v-select>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        label="คุณวิฒิ"
                        v-model="editpersonnel_temporary.ed_abb"
                      ></v-text-field>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        label="สาขาวิชา"
                        v-model="editpersonnel_temporary.ed_name"
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
                            v-model="editpersonnel_temporary.birthday"
                            label="วันเดือนปีเกิด"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            locale="th"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="editpersonnel_temporary.birthday"
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
                            v-model="editpersonnel_temporary.appoin_days"
                            label="วันเดือนปีที่บรรจุ"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            locale="th"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="editpersonnel_temporary.appoin_days"
                          no-title
                          scrollable
                          locale="th"
                        >
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="menu4 = false">
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
                      <v-text-field
                        v-model="editpersonnel_temporary.order_app_now"
                        label="คำสั่งที่"
                        prepend-icon="mdi-calendar"
                      ></v-text-field>
                    </v-flex>

                    <v-flex md6>
                      <v-text-field
                        v-model="editpersonnel_temporary.date_app_now"
                        label="วันเดือนปีที่เริ่มปฏิบัติงาน ณ สถานศึกษาปัจจุบัน"
                        prepend-icon="mdi-calendar"
                        type="date"
                      ></v-text-field>
                    </v-flex>

                    <v-flex md6>
                      <v-text-field
                        label="เบอร์โทร"
                        v-model="editpersonnel_temporary.tel_p"
                      ></v-text-field>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        label="E-mail"
                        v-model="editpersonnel_temporary.e_mail"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
                <small>* จำเป็น</small>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                large
                @click.stop="editpersonnel_temporarydialog = false"
                rounded
              >
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn
                large
                color="warning"
                @click.stop="editpersonnel_temporarySubmit()"
                rounded
              >
                <v-icon dark>mdi-pencil</v-icon>&nbsp;บันทึก
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
      loading: false,
      ApiKey: "HRvec2021",
      valid: true,
      addpersonnel_temporarydialog: false,
      editpersonnel_temporarydialog: false,
      deletepersonnel_temporarydialog: false,
      csvpersonnel_temporarydialog: false,
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
        { text: "ลำดับ", align: "center", value: "id_rc" },
        {
          text: "วิทยาลัย",
          width: "20%",
          align: "left",
          value: "college_name"
        },
        { text: "รหัสบัตรประชาชน", align: "center", value: "id_card" },
        { text: "คำนำ", align: "center", value: "title_s" },
        { text: "ชื่อ", align: "center", value: "frist_name" },
        { text: "สกุล", align: "center", value: "last_name" },
        { text: "ตำแหน่ง", align: "center", value: "position_name" },
        { text: "เลขที่ตำแหน่ง", align: "center", value: "id_position" },
        { text: "วิทยฐานะ", align: "center", value: "rang_name" },
        { text: "ระดับ", align: "center", value: "rang_level" },
        { text: "สาขาวิชา", align: "center", value: "branch_name_th" },
        
        { text: "วันเดือนปีเกิด", align: "center", value: "brith_day" },
        { text: "วันเดือนปีบรรจุ", align: "center", value: "appoin_day" },
        { text: "คำสั่งที่", align: "center", value: "order_app_now" },
        {
          text: "วันที่ปฏิบัติหน้าที่ ณ สถานศึกษาปัจจุบัน",
          align: "center",
          value: "date_app_now"
        },
        { text: "เกษียณ", align: "center", value: "retrire_year" },
        {
          text: "แก้ไข",
          align: "center",
          value: "actions",
          icon: "mdi-file-document-edit"
        }
        /*   {
          text: "ลบ",
          align: "center",
          value: "action_s",
          icon: "mdi-delete-forever"
        } */
      ],
      rang_names: [
        { text: "-", value: "-" },
        { text: "ต้น", value: "ต้น" },
        { text: "ปฏิบัติงาน", value: "ปฏิบัติงาน" },
        { text: "ปฏิบัติการ", value: "ปฏิบัติการ" },
        { text: "ชำนาญงาน", value: "ชำนาญงาน" },
        { text: "ชำนาญการ", value: "ชำนาญการ" },
        { text: "ครูชำนาญการ", value: "ครูชำนาญการ" },
        { text: "ครูชำนาญการพิเศษ", value: "ครูชำนาญการพิเศษ" },
        { text: "ครูเชี่ยวชาญ", value: "ครูเชี่ยวชาญ" },
        { text: "ครูเชี่ยวชาญพิเศษ", value: "ครูเชี่ยวชาญพิเศษ" },
        { text: "รองผู้อำนวยการชำนาญการ", value: "รองผู้อำนวยการชำนาญการ" },
        {
          text: "รองผู้อำนวยการชำนาญการพิเศษ",
          value: "รองผู้อำนวยการชำนาญการพิเศษ"
        },
        { text: "รองผู้อำนวยการเชี่ยวชาญ", value: "รองผู้อำนวยการเชี่ยวชาญ" },
        { text: "ผู้อำนวยการชำนาญการ", value: "ผู้อำนวยการชำนาญการ" },
        { text: "ผู้อำนวยการชำนาญการพิเศษ", value: "ผู้อำนวยการชำนาญการพิเศษ" },
        { text: "ผู้อำนวยการเชี่ยวชาญ", value: "ผู้อำนวยการเชี่ยวชาญ" },
        {
          text: "ผู้อำนวยการเชี่ยวชาญพิเศษ",
          value: "ผู้อำนวยการเชี่ยวชาญพิเศษ"
        },
        { text: "ศึกษานิเทศก์ชำนาญการ", value: "ศึกษานิเทศก์ชำนาญการ" },
        {
          text: "ศึกษานิเทศก์ชำนาญการพิเศษ",
          value: "ศึกษานิเทศก์ชำนาญการพิเศษ"
        },
        { text: "ศึกษานิเทศก์เชี่ยวชาญ", value: "ศึกษานิเทศก์เชี่ยวชาญ" },
        {
          text: "ศึกษานิเทศก์เชี่ยวชาญพิเศษ",
          value: "ศึกษานิเทศก์เชี่ยวชาญพิเศษ"
        }
      ],
      position_select: [
        { text: "ผู้อำนวยการ", value: "director" },
        { text: "รองผู้อำนวยการ", value: "se_director" },
        { text: "ข้าราชการครู", value: "tech" },
        { text: "ศึกษานิเทศก์", value: "supervision" },
        { text: "38", value: "38" }
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

      college: {},
      provinces: [],
      prefectures: [],
      userstatus: [],
      man_powers: [],
      colleges: [],
      personnel_temporarystatus: [],
      regions: [],
      region_ena: true,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      menu2: false,
      menu3: false,
      menu4: false,
      data_syslog: {},
      college_search: {},
      position_search: {},
      rangname_search: {},
      upcsv_file: {},
   
    };
  },

  async mounted() {
    /*    await this.personnel_temporaryQueryAll(); */

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
    async search_name() {
      let result = await this.$http.post("personnel_temporary.php", {
        ApiKey: this.ApiKey,
        frist_name: this.search
      });
      this.personnel_temporarys = result.data;
    },
    async search_lastname() {
      let result = await this.$http.post("personnel_temporary.php", {
        ApiKey: this.ApiKey,
        last_name: this.search
      });
      this.personnel_temporarys = result.data;
    },

    async search_idcard() {
      let result = await this.$http.post("personnel_temporary.php", {
        ApiKey: this.ApiKey,
        id_cards: this.search
      });
      this.personnel_temporarys = result.data;
    },

    async search_college() {
      this.loading = true;
      let result = await this.$http
        .post("personnel_temporary.php", {
          ApiKey: this.ApiKey,
          college_code: this.college_search
        })
        .finally(() => (this.loading = false));
      this.personnel_temporarys = result.data;
    },

    async search_position() {
      this.loading = true;
      let result = await this.$http
        .post("personnel_temporary.php", {
          ApiKey: this.ApiKey,
          user_status: this.position_search
        })
        .finally(() => (this.loading = false));
      this.personnel_temporarys = result.data;
    },

    async search_rang() {
      this.loading = true;
      let result = await this.$http
        .post("personnel_temporary.php", {
          ApiKey: this.ApiKey,
          rang_name: this.rangname_search
        })
        .finally(() => (this.loading = false));
      this.personnel_temporarys = result.data;
    },
    async search_yearretire() {
      this.loading = true;
      let result = await this.$http
        .post("personnel_temporary.php", {
          ApiKey: this.ApiKey,
          retrire_year: this.search
        })
        .finally(() => (this.loading = false));
      this.personnel_temporarys = result.data;
    },

    async OnEnter() {
      let result = await this.$http.post("personnel_temporary.php", {
        ApiKey: this.ApiKey,
        frist_name: this.search
      });
      this.personnel_temporarys = result.data;
    },

    async man_powerQuery() {
      let man_power_result;
      man_power_result = await this.$http.post("man_power.php", {
        ApiKey: this.ApiKey,
        college_code: this.addpersonnel_temporary.college_code
      });
      this.man_powers = man_power_result.data;
    },

    async personnel_temporaryQueryAll() {
      this.loading = true;
      let result = await this.$http
        .post("personnel_temporary.php", {
          ApiKey: this.ApiKey
        })
        .finally(() => (this.loading = false));
      this.personnel_temporarys = result.data;
    },

    async searchWait() {
      this.loading = true;
      let result = await this.$http
        .post("personnel_temporary.php", {
          ApiKey: this.ApiKey,
          status_appove: "wait"
        })
        .finally(() => (this.loading = false));
      this.personnel_temporarys = result.data;
    },

    async personnel_temporaryAdd() {
      this.addpersonnel_temporary = {};
      this.addpersonnel_temporarydialog = true;
    },

    async personnel_temporaryCSV() {
      this.csvpersonnel_temporarydialog = true;
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

        let result = await this.$http.post(
          "personnel_temporary.insert.php",
          this.addpersonnel_temporary
        );
        if (result.data.status == true) {
          this.personnel_temporary = result.data;
          this.snackbar.icon = "mdi-font-awesome";
          this.snackbar.color = "success";
          this.snackbar.text = "บันทึกข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
          this.data_syslog.ApiKey = this.ApiKey;
          this.data_syslog.user_account = userSession.user_name;
          this.data_syslog.event_log = "insert";
          this.data_syslog.page_log = "personnel_temporary";
          this.data_syslog.table_log = "personnel_temporary";
          this.data_syslog.detail_log = this.personnel_temporary.id_card;
          this.data_syslog.date_times = this.date_today_log;
          this.personnel_temporaryQueryAll();
        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text = "บันทึกข้อมูลผิดพลาด";
          this.snackbar.show = true;
          this.personnel_temporaryQueryAll();
        }
        this.addpersonnel_temporarydialog = false;
      }
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
          let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
          this.data_syslog.ApiKey = this.ApiKey;
          this.data_syslog.user_account = userSession.user_name;
          this.data_syslog.event_log = "update";
          this.data_syslog.page_log = "personnel_temporary";
          this.data_syslog.table_log = "personnel_temporary";
          this.data_syslog.detail_log = this.personnel_temporary.id_card;
          this.data_syslog.date_times = this.date_today_log;
          await this.$http.post("data_syslog.insert.php", this.data_syslog);
        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text = "แก้ไขข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.editpersonnel_temporarydialog = false;
      }
    },
    async personnel_temporaryDelete(id_rc) {
      let result = await this.$http.post("personnel_temporary.php", {
        ApiKey: this.ApiKey,
        id_rc: id_rc
      });
      this.editpersonnel_temporary = result.data;
      this.deletepersonnel_temporarydialog = true;
    },

    async deletepersonnel_temporarySubmit() {
      if (this.$refs.deletepersonnel_temporaryform.validate()) {
        this.editpersonnel_temporary.ApiKey = this.ApiKey;
        let result = await this.$http.post(
          "personnel_temporary.delete.php",
          this.editpersonnel_temporary
        );
        if (result.data.status == true) {
          this.personnel_temporary = result.data;
          this.snackbar.icon = "mdi-font-awesome";
          this.snackbar.color = "success";
          this.snackbar.text = "ลบข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.personnel_temporaryQueryAll();
          let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
          this.data_syslog.ApiKey = this.ApiKey;
          this.data_syslog.user_account = userSession.user_name;
          this.data_syslog.event_log = "delete";
          this.data_syslog.page_log = "personnel_temporary";
          this.data_syslog.table_log = "personnel_temporary";
          this.data_syslog.detail_log = this.personnel_temporary.id_card;
          this.data_syslog.date_times = this.date_today_log;
          await this.$http.post("data_syslog.insert.php", this.data_syslog);
        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text = "ลบข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.deletepersonnel_temporarydialog = false;
      }
    },
    async csvpersonnel_temporarySubmit() {
      let result = "";
      let uploaded = null;
      if (this.$refs.file2.files[0]) {
        let formData = new FormData();
        let filename = this.time_stamp + ".personnel.csv";
        formData.append("file", this.$refs.file2.files[0]);
        formData.append("filename", "../HRvecfiles/" + filename);
        formData.append("ApiKey", this.ApiKey);
        result = await this.$http.post("personnel_importcsv.php", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        uploaded = true;
      } else {
        uploaded = false;
      }
      if (result.data.status == true) {
        this.personnel_temporary = result.data;
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
        this.personnel_temporaryQueryAll();
      }
      this.csvpersonnel_temporarydialog = false;
    }
  },
  computed: {
    time_stamp() {
      const d = new Date();
      let time = d.getTime();
      return time;
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
    p_word() {
      let today = new Date(
        this.addpersonnel_temporary.birthday ||
          this.editpersonnel_temporary.birthday
      );
      let dd = String(today.getDate()).padStart(2, "0");
      let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      let yyyy = today.getFullYear() + 543;
      let password = dd + "/" + mm + "/" + yyyy;
      return password;
    },
    brith_day() {
      let today = new Date(
        this.addpersonnel_temporary.birthday ||
          this.editpersonnel_temporary.birthday
      );
      let dd = parseInt(String(today.getDate()).padStart(2, "0"));
      return dd;
    },
    brith_month() {
      let today = new Date(
        this.addpersonnel_temporary.birthday ||
          this.editpersonnel_temporary.birthday
      );
      let mm = parseInt(String(today.getMonth() + 1).padStart(2, "0"));
      return mm;
    },
    brith_year() {
      let today = new Date(
        this.addpersonnel_temporary.birthday ||
          this.editpersonnel_temporary.birthday
      );
      let yyyy = today.getFullYear() + 543;
      return yyyy;
    },

    /*  appoin_days(){
      let result 
      let appoin_day=this.editpersonnel_temporary.appoin_day
      let appoin_month=this.editpersonnel_temporary.appoin_month
      let appoin_year=this.editpersonnel_temporary.appoin_year
      result = appoin_year-543 +'-'+ appoin_month +'-'+ appoin_day
      return result
    }, */

    appoin_day() {
      let today = new Date(
        this.addpersonnel_temporary.appoin_days ||
          this.editpersonnel_temporary.appoin_days
      );
      let dd = parseInt(String(today.getDate()).padStart(2, "0"));
      return dd;
    },
    appoin_month() {
      let today = new Date(
        this.addpersonnel_temporary.appoin_days ||
          this.editpersonnel_temporary.appoin_days
      );
      let mm = parseInt(String(today.getMonth() + 1).padStart(2, "0")); //January is 0!
      return mm;
    },
    appoin_year() {
      let today = new Date(
        this.addpersonnel_temporary.appoin_days ||
          this.editpersonnel_temporary.appoin_days
      );
      let yyyy = today.getFullYear() + 543;
      return yyyy;
    },
    date_today_cal() {
      let today = new Date(
        this.addpersonnel_temporary.birthday ||
          this.editpersonnel_temporary.birthday
      );
      let dd = String(today.getDate()).padStart(2, "0");
      let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      let yyyy = today.getFullYear();

      today = yyyy + "-" + mm + "-" + dd;
      return today;
    },
    retrire_year() {
      let mm = this.brith_month;
      let yy_retire = this.brith_year;
      let result;
      if (mm > 9) {
        result = yy_retire + 61;
      } else {
        result = yy_retire + 60;
      }
      return result;
    },
    cal_date_age() {
      let today = new Date(this.date_today_cal);
      let DOB = new Date(
        this.addpersonnel_temporary.birthday ||
          this.editpersonnel_temporary.birthday
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

    cal_date_age_gov() {
      let today = new Date(this.date_today_cal);
      let DOB = new Date(
        this.addpersonnel_temporary.date_app_now ||
          this.editpersonnel_temporary.date_app_now
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
    date_today_log() {
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, "0");
      let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      let yyyy = today.getFullYear() + 543;
      let time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      today = dd + "/" + mm + "/" + yyyy + "/" + time;
      return today;
    }
  }
};
</script>
