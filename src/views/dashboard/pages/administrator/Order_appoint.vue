<template>
  <div>
    <v-bottom-navigation color="info" horizontal :background-color="color" dark>
      <v-btn to="/admin/conditions_branch">
        <span>รายละเอียดเงือนไขสาขาวิชา </span>
        <v-icon>mdi-source-branch</v-icon>
      </v-btn>

      <v-btn to="/admin/conditions_transfer">
        <span>รายการเงือนไขสาขาวิชา</span>
        <v-icon>mdi-source-branch</v-icon>
      </v-btn>
    </v-bottom-navigation>
    <v-bottom-navigation color="info" horizontal :background-color="color" dark>
      <v-btn to="/admin/transference_location_detail">
        <span>รายละเอียดผู้ยืนย้าย ประกอบพิจารณา </span>
        <v-icon>mdi-details</v-icon>
      </v-btn>
      <v-btn to="/admin/transference_location">
        <span>รายละเอียดผู้ยืนย้าย </span>
        <v-icon>mdi-details</v-icon>
      </v-btn>

      <v-btn to="/admin/transference_personnel">
        <span>ประมวลผล 1 </span>
        <v-icon>mdi-calculator</v-icon>
      </v-btn>

      <v-btn to="/admin/process_transfer">
        <span>ประมวลผล 2 [ระบบ]</span>
        <v-icon>mdi-calculator</v-icon>
      </v-btn>

      <v-btn to="/admin/process_transfer_switch_normal">
        <span>ประมวลผล 3 [สับเปลี่ยน ปกติ]</span>
        <v-icon>mdi-calculator</v-icon>
      </v-btn>

      <v-btn to="/admin/process_transfer_switch">
        <span>ประมวลผล 4 [สับเปลี่ยน]</span>
        <v-icon>mdi-calculator</v-icon>
      </v-btn>
      <v-btn to="/admin/conditons_transfer_success">
        <span>สรุปผล</span>
        <v-icon>mdi-bookmark-check</v-icon>
      </v-btn>
      <v-btn to="/admin/Order_appoint">
        <span>รายงาน</span>
        <v-icon>mdi-printer</v-icon>
      </v-btn>
    </v-bottom-navigation>
    <v-container fluid>
      <base-material-card
        icon="mdi-clipboard-text"
        title="คำสั่งย้าย"
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
                @click.native="order_appointAdd()"
              >
                <v-icon>mdi-plus-circle-outline</v-icon>เพิ่มรายการ
              </v-btn>
            </v-col>
            <v-col cols="12" md="12">
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
          </v-row>
        </v-card>
        <v-data-table
          color="success"
          :loading="loading"
          :headers="showHeaders"
          :items="order_appoints"
          :search="search"
        >
          <template v-slot:[`item.dated_order`]="{ item }">
            {{
              item.dated_order
                | moment("add", "543 years")
                | moment("Do MMMM YYYY")
            }}
          </template>

          <template v-slot:[`item.start_date`]="{ item }">
            {{
              item.start_date
                | moment("add", "543 years")
                | moment("Do MMMM YYYY")
            }}
          </template>

          <template v-slot:[`item.print_manpower`]="{}">
            <v-btn
              color="info"
              fab
              small
              :href="'#/admin/print_report_manpower'"
              target="_blank"
            >
              <v-icon>
                mdi-printer
              </v-icon>
            </v-btn>
          </template>

          <template v-slot:[`item.print_move_can`]="{ item }">
            <v-btn
              color="warning"
              fab
              small
              :href="
                '#/admin/print_report_movement_online_4/' +
                  item.id_oa +
                  '/' +
                  item.time_s +
                  '/' +
                  item.year_s +
                  '/' +
                  'teach'
              "
              target="_blank"
            >
              <v-icon>
                mdi-printer
              </v-icon>
            </v-btn>
          </template>

          <template v-slot:[`item.print_f`]="{ item }">
            <v-btn
              color="red"
              fab
              small
              :href="
                '#/admin/print_report_movement_filter_2/' +
                  item.id_oa +
                  item.time_s +
                  item.year_s +
                  'teach'
              "
              target="_blank"
            >
              <v-icon>
                mdi-printer
              </v-icon>
            </v-btn>
          </template>

          <template v-slot:[`item.print_o`]="{ item }">
            <v-btn
              color="yellow"
              fab
              small
              :href="
                '#/admin/print_report_movement_filter_o/' +
                  item.id_oa +
                  item.time_s +
                  item.year_s +
                  'teach'
              "
              target="_blank"
            >
              <v-icon>
                mdi-printer
              </v-icon>
            </v-btn>
          </template>

          <template v-slot:[`item.print_s`]="{ item }">
            <v-btn
              color="success"
              fab
              small
              :href="
                '#/admin/print_report_movement/' +
                  item.id_oa +
                  item.time_s +
                  item.year_s +
                  'teach'
              "
              target="_blank"
            >
              <v-icon>
                mdi-printer
              </v-icon>
            </v-btn>
          </template>

          <template v-slot:[`item.approve_movement`]="{ item }">
            <v-btn
              color="success"
              fab
              small
              @click.stop="approve_movement_dialog(item.id_oa)"
            >
              <v-icon>
                mdi-account-check
              </v-icon>
            </v-btn>
          </template>

          <template v-slot:[`item.movement_salary`]="{ item }">
           <v-btn
              color="success"
              fab
              small
              :href="
                '#/admin/print_report_movement_filter_salary/' +              
                  item.id_oa  + '/' +
                  item.time_s  + '/' +
                  item.year_s  + '/' +
                  'teach'
              "
              target="_blank"
            >
              <v-icon>
               mdi-cash
              </v-icon>
            </v-btn>
          </template>

          <template v-slot:[`item.actions`]="{ item }">
            <v-icon color="yellow" @click.stop="order_appointEdit(item.id_oa)">
              mdi-pencil
            </v-icon>
          </template>
          <template v-slot:[`item.action_s`]="{ item }">
            <v-icon color="red" @click.stop="order_appointDelete(item.id_oa)">
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

      <v-layout row justify-center>
        <v-dialog v-model="loading_dialog" persistent max-width="50%">
          <v-card class="mx-auto pa-5">
            <v-progress-circular
              :size="50"
              color="primary"
              indeterminate
            ></v-progress-circular>
          </v-card>
        </v-dialog>
      </v-layout>
      <!--addorder_appointdialog  -->
      <v-layout row justify-center>
        <v-dialog v-model="addorder_appointdialog" persistent max-width="50%">
          <v-card class="mx-auto pa-5">
            <base-material-card
              icon="mdi-account-multiple"
              title="เพิ่มข้อมูลคำสั่งย้าย"
              class="px-5 py-3 text_google"
            >
              <div class="text-right">วันที่รายการ : {{ date_today }}</div>
            </base-material-card>

            <v-card-text>
              <v-form ref="addorder_appointform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md4>
                      <v-text-field
                        label="หนังสือราชการที่ : ศธ 0618/3994"
                        v-model="addorder_appoint.book_number"
                      ></v-text-field>
                    </v-flex>
                    <v-flex md4>
                      <v-text-field
                        label="คำสั่งที่ : "
                        v-model="addorder_appoint.order_number"
                      ></v-text-field>
                    </v-flex>
                    <v-flex md4>
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
                            v-model="addorder_appoint.dated_order"
                            label="วันที่หนังสือ : "
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="addorder_appoint.dated_order"
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
                      <v-text-field
                        label="ประชุมครั้งที่ : 1/2565"
                        v-model="addorder_appoint.meeting_no"
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
                            v-model="addorder_appoint.meeting_date"
                            label="วันที่ประชุม : "
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="addorder_appoint.meeting_date"
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
                    <v-flex md4>
                      <v-select
                        label="การย้ายครั้งที่  :"
                        v-model="addorder_appoint.time_s"
                        :items="time_ss"
                        required
                        :rules="[v => !!v || '']"
                      ></v-select>
                    </v-flex>
                    <v-flex md4>
                      <v-select
                        label="การย้ายปีที่ :"
                        v-model="addorder_appoint.year_s"
                        :items="year_ss"
                        required
                        :rules="[v => !!v || '']"
                      ></v-select>
                    </v-flex>
                    <v-flex md4>
                      <v-select
                        label="ตำแหน่ง :"
                        v-model="addorder_appoint.name_position"
                        :items="name_position_s"
                        item-value="value"
                        required
                        :rules="[v => !!v || '']"
                      ></v-select>
                    </v-flex>
                    <v-flex md12>
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
                            v-model="addorder_appoint.start_date"
                            label="วันที่เริ่มปฏิบัติงาน : "
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            required
                            :rules="[v => !!v || '']"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="addorder_appoint.start_date"
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
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="warning"
                large
                @click.stop="addorder_appointdialog = false"
                rounded
                ><v-icon dark>mdi-close</v-icon> ยกเลิก</v-btn
              >
              <v-btn
                large
                color="success"
                @click.stop="addorder_appointSubmit()"
                rounded
              >
                <v-icon dark>mdi-content-save</v-icon>&nbsp;&nbsp;บันทึก
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model deleteorder_appointdialog -->
      <v-layout>
        <v-dialog
          v-model="deleteorder_appointdialog"
          persistent
          max-width="50%"
        >
          <v-card class="mx-auto pa-5">
            <base-material-card
              color="error"
              icon="mdi-delete"
              title="ลบข้อมูลคำสั่งย้ายเอก"
              class="px-5 py-3 text_google"
            >
            </base-material-card>

            <v-card-text class="text_google">
              <v-card>
                <v-card-text>
                  <v-form ref="deleteorder_appointform" lazy-validation>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12>
                          ยืนยันการลบข้อมูลคำสั่งย้ายเอก หนังสือราชการที่ :
                          {{ editorder_appoint.book_number }} คำสั่งที่ :
                          {{ editorder_appoint.order_number }}
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn large @click.stop="deleteorder_appointdialog = false"
                ><v-icon dark>mdi-close</v-icon>ยกเลิก</v-btn
              >
              <v-btn
                large
                color="red darken-3"
                @click.stop="deleteorder_appointSubmit()"
                dark
              >
                <v-icon dark>mdi-delete</v-icon>&nbsp;ลบ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model editorder_appointdialog -->
      <v-layout row justify-center>
        <v-dialog v-model="editorder_appointdialog" persistent max-width="80%">
          <v-card class="mx-auto pa-6">
            <base-material-card
              color="yellow"
              icon="mdi-clipboard-text"
              title="แก้ไขข้อมูลคำสั่งย้าย"
              class="px-5 py-3 text_google"
            ></base-material-card>
            <v-card-text>
              <v-form ref="editorder_appointform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md4>
                      <v-text-field
                        label="หนังสือราชการที่ : ศธ 0618/3994"
                        v-model="editorder_appoint.book_number"
                      ></v-text-field>
                    </v-flex>
                    <v-flex md4>
                      <v-text-field
                        label="คำสั่งที่ : "
                        v-model="editorder_appoint.order_number"
                      ></v-text-field>
                    </v-flex>
                    <v-flex md4>
                      <v-menu
                        ref="menu_a"
                        v-model="menu_a"
                        :close-on-content-click="false"
                        :return-value.sync="date"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="editorder_appoint.dated_order"
                            label="วันที่หนังสือ : "
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="editorder_appoint.dated_order"
                          no-title
                          scrollable
                          locale="th"
                        >
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="menu_a = false">
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.menu_a.save(date)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        label="ประชุมครั้งที่ : 1/2565"
                        v-model="editorder_appoint.meeting_no"
                      ></v-text-field>
                    </v-flex>
                    <v-flex md6>
                      <v-menu
                        ref="menu_1"
                        v-model="menu_1"
                        :close-on-content-click="false"
                        :return-value.sync="date"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="editorder_appoint.meeting_date"
                            label="วันที่ประชุม : "
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="editorder_appoint.meeting_date"
                          no-title
                          scrollable
                          locale="th"
                        >
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="menu_1 = false">
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.menu_1.save(date)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-flex>
                    <v-flex md4>
                      <v-select
                        label="การย้ายครั้งที่  :"
                        v-model="editorder_appoint.time_s"
                        :items="time_ss"
                        required
                        :rules="[v => !!v || '']"
                      ></v-select>
                    </v-flex>
                    <v-flex md4>
                      <v-select
                        label="การย้ายปีที่ :"
                        v-model="editorder_appoint.year_s"
                        :items="year_ss"
                        required
                        :rules="[v => !!v || '']"
                      ></v-select>
                    </v-flex>
                    <v-flex md4>
                      <v-select
                        label="ตำแหน่ง :"
                        v-model="editorder_appoint.name_position"
                        :items="name_position_s"
                        item-value="value"
                        required
                        :rules="[v => !!v || '']"
                      ></v-select>
                    </v-flex>
                    <v-flex md12>
                      <v-menu
                        ref="menu_2"
                        v-model="menu_2"
                        :close-on-content-click="false"
                        :return-value.sync="date"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="editorder_appoint.start_date"
                            label="วันที่เริ่มปฏิบัติงาน : "
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            required
                            :rules="[v => !!v || '']"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="editorder_appoint.start_date"
                          no-title
                          scrollable
                          locale="th"
                        >
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="menu_2 = false">
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.menu_2.save(date)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                large
                @click.stop="editorder_appointdialog = false"
                rounded
              >
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn
                large
                color="warning"
                @click.stop="editorder_appointSubmit()"
                rounded
              >
                <v-icon dark>mdi-pencil</v-icon>&nbsp;บันทึก
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model approve_movement_dialog -->
      <v-layout>
        <v-dialog v-model="approve_movement_dialogs" persistent max-width="90%">
          <v-card class="mx-auto pa-5">
            <base-material-card
              color="green"
              icon="mdi-content-paste"
              title="ข้อมูลการย้ายข้าราชการครู"
              class="px-5 py-3 text_google"
            >
            </base-material-card>

            <v-card-text class="text_google">
              <v-card class="pa-1">
                เลขที่หนังสือ : {{ editorder_appoint.book_number }} คำสั่งที่ :
                {{ editorder_appoint.order_number }} วันที่เริ่มปฏิบัติงาน :
                {{
                  editorder_appoint.start_date
                    | moment("add", "543 years")
                    | moment("D MMMM YYYY")
                }}

                <v-card-title>
                  <v-text-field
                    v-model="search_condition"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                  ></v-text-field>
                </v-card-title>
                <v-card-text>
                  <v-form ref="approve_movement_dialogsform" lazy-validation>
                    <v-container grid-list-md>
                      <v-data-table
                        color="success"
                        :loading="loading"
                        :headers="header_condition"
                        :items="conditons_transfer_successs"
                        :search="search_condition"
                      >
                        <template v-slot:[`item.college_name_old`]="{ item }">
                          <v-chip color="grey" dark>
                            <span style="font-size:16px;">
                              {{ item.college_name_old }}</span
                            >
                          </v-chip>
                        </template>

                        <template v-slot:[`item.college_name_new`]="{ item }">
                          <v-chip color="green" dark>
                            <span style="font-size:16px;">
                              {{ item.college_name_new }}</span
                            >
                          </v-chip>
                        </template>
                        <template v-slot:[`item.title_s`]="{ item }">
                          <span>
                            {{
                              item.title_s +
                                item.frist_name +
                                " " +
                                item.last_name
                            }}
                          </span>
                        </template>

                        <template v-slot:[`item.approve_movements`]="{ item }">
                          <v-btn
                            v-if="item.id_position_check === item.id_position"
                            rounded
                            dark
                            color="info"
                          >
                            <v-icon color="yellow" class="pa-1">
                              mdi-checkbox-marked-circle
                            </v-icon>
                            ย้ายสำเร็จ
                          </v-btn>
                          <v-btn
                            v-else
                            rounded
                            dark
                            color="green"
                            @click.stop="
                              approve_movement_personnel(item.id_cts)
                            "
                          >
                            <v-icon color="yellow" class="pa-1">
                              mdi-checkbox-marked-circle
                            </v-icon>
                            อนุมัติ
                          </v-btn>
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
                    </v-container>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn large @click.stop="approve_movement_dialogs = false"
                ><v-icon dark>mdi-close</v-icon>ยกเลิก</v-btn
              >
              <v-btn
                large
                color="green"
                @click.stop="approve_movement_dialogs_allSubmit()"
                dark
              >
                <v-icon class="pa-1" dark>mdi-content-save</v-icon
                >&nbsp;อนุมัติย้ายทั้งหมด
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model conditons_transfer_successs_personnel_dialog -->
      <v-layout>
        <v-dialog
          v-model="conditons_transfer_successs_personnel_dialog"
          persistent
          max-width="80%"
        >
          <v-card class="mx-auto pa-5">
            <base-material-card
              color="green"
              icon="mdi-content-paste"
              title="อนุมัติการย้าย"
              class="px-5 py-3 text_google"
            >
            </base-material-card>

            <v-card-text class="text_google">
              <v-card>
                <v-card-text>
                  <v-form
                    ref="conditons_transfer_successs_personnel_dialogform"
                    lazy-validation
                  >
                    <v-container grid-list-md>
                      <table width="100%">
                        <tr>
                          <td class="text-center">
                            สถานศึกษาแห่งใหม่
                          </td>
                          <td class="text-center">
                            เลขที่ตำแหน่งใหม่
                          </td>
                          <td class="text-center">
                            รหัสสาขาวิชา
                          </td>
                          <td class="text-center">
                            สาขาวิชา
                          </td>
                          <td class="text-center">
                            ชื่อ-นามสกุล
                          </td>
                          <td class="text-center">
                            เลขที่ตำแหน่งเดิม
                          </td>
                          <td class="text-center">
                            สถานศึกษาเดิม
                          </td>
                        </tr>
                        <tr>
                          <td class="text-center">
                            {{
                              conditons_transfer_successs_personnel.college_name_new
                            }}
                          </td>
                          <td class="text-center">
                            {{
                              conditons_transfer_successs_personnel.id_position
                            }}
                          </td>
                          <td class="text-center">
                            {{
                              conditons_transfer_successs_personnel.id_branch
                            }}
                          </td>
                          <td class="text-center">
                            {{
                              conditons_transfer_successs_personnel.branch_name
                            }}
                          </td>
                          <td class="text-center">
                            {{
                              conditons_transfer_successs_personnel.title_s +
                                conditons_transfer_successs_personnel.frist_name +
                                " " +
                                conditons_transfer_successs_personnel.last_name
                            }}
                          </td>
                          <td class="text-center">
                            {{
                              conditons_transfer_successs_personnel.id_postion_old
                            }}
                          </td>
                          <td class="text-center">
                            {{
                              conditons_transfer_successs_personnel.college_name_old
                            }}
                          </td>
                        </tr>
                      </table>
                    </v-container>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                large
                @click.stop="
                  conditons_transfer_successs_personnel_dialog = false
                "
                ><v-icon dark>mdi-close</v-icon>ยกเลิก</v-btn
              >
              <v-btn
                large
                color="green"
                @click.stop="
                  conditons_transfer_successs_personnel_dialogSubmit()
                "
                dark
              >
                <v-icon class="pa-1" dark>mdi-content-save</v-icon
                >&nbsp;อนุมัติย้าย
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model approve_movement_dialogs_all_dialog -->
      <v-layout>
        <v-dialog
          v-model="approve_movement_dialogs_all_dialog"
          persistent
          max-width="60%"
        >
          <v-card class="mx-auto pa-5">
            <base-material-card
              color="green"
              icon="mdi-content-paste"
              title="อนุมัติการย้ายทั้งหมด"
              class="px-5 py-3 text_google"
            >
            </base-material-card>

            <v-card-text class="text_google">
              <v-card>
                <v-card-text>
                  <v-form
                    ref="approve_movement_dialogs_all_dialogform"
                    lazy-validation
                  >
                    <v-container grid-list-md>
                      <v-row>
                        <v-col cols="12" md="6">
                          หนังสือราชการที่ : {{ editorder_appoint.book_number }}
                        </v-col>
                        <v-col cols="12" md="6">
                          คำสั่งที่ : {{ editorder_appoint.order_number }}
                        </v-col>
                        <v-col cols="12" md="6">
                          วันที่หนังสือ : {{ editorder_appoint.dated_order }}
                        </v-col>
                        <v-col cols="12" md="6">
                          ประชุมครั้งที่ : {{ editorder_appoint.meeting_no }}
                        </v-col>
                        <v-col cols="12" md="6">
                          วันที่ประชุม : {{ editorder_appoint.meeting_date }}
                        </v-col>
                        <v-col cols="12" md="6">
                          การย้ายครั้งที่ : {{ editorder_appoint.time_s }}
                        </v-col>
                        <v-col cols="12" md="6">
                          การย้ายปีที่ : {{ editorder_appoint.year_s }}
                        </v-col>
                        <v-col cols="12" md="6">
                          วันที่เริ่มปฏิบัติงาน :
                          {{ editorder_appoint.start_date }}
                        </v-col>
                        <v-col cols="12" md="6">
                          ตำแหน่ง :
                          {{ editorder_appoint.name_position }}
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                large
                @click.stop="approve_movement_dialogs_all_dialog = false"
                ><v-icon dark>mdi-close</v-icon>ยกเลิก</v-btn
              >
              <v-btn
                large
                color="green"
                @click.stop="approve_movement_dialogs_all_dialogSubmit()"
                dark
              >
                <v-icon class="pa-1" dark>mdi-content-save</v-icon
                >&nbsp;อนุมัติย้าย
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
      addorder_appointdialog: false,
      editorder_appointdialog: false,
      deleteorder_appointdialog: false,
      approve_movement_dialogs: false,
      conditons_transfer_successs_personnel_dialog: false,
      approve_movement_dialogs_all_dialog: false,
      loading_dialog: false,
      snackbar: {
        show: false,
        color: "",
        timeout: 5000,
        icon: "",
        text: ""
      },
      order_appoints: [],
      addorder_appoint: {},
      editorder_appoint: {},
      search: "",
      search_condition: "",
      pagination: {},
      time_ss: [1, 2],
      year_ss: [2565, 2566, 2567, 2568, 2569, 2570],
      name_position_s: [
        { text: "สายการสอนและสนับสนุนการสอน", value: "ครู" },
        { text: "สายงานบริหารสถานศึกษา", value: "บริหาร" }
      ],
      header_condition: [
        { text: "ครั้งที่", align: "center", value: "time_s" },
        { text: "ปีที่", align: "center", value: "year_s" },
        { text: "สังกัด", align: "center", value: "college_name_new" },
        { text: "เลขที่", align: "center", value: "id_position" },
        { text: "ชื่อ-นามสกุล", align: "center", value: "title_s" },
        { text: "ตำแหน่ง", align: "center", value: "name_position" },
        { text: "เลขที่", align: "center", value: "id_postion_old" },
        { text: "สังกัดเดิม", align: "center", value: "college_name_old" },
        { text: "อนุมัติ", align: "center", value: "approve_movements" }
      ],

      headers: [],
      selectedHeaders: [],
      headersMap: [
        { text: "หนังสือราชการที่", align: "center", value: "book_number" },
        { text: "คำสั่งที่", align: "center", value: "order_number" },
        { text: "วันที่หนังสือ", align: "left", value: "dated_order" },
        { text: "ประชุมครั้งที่", align: "left", value: "meeting_no" },
        { text: "วันที่ประชุม", align: "left", value: "meeting_date" },
        { text: "ครั้งที่", align: "left", value: "time_s" },
        { text: "ปีที่", align: "left", value: "year_s" },
        { text: "วันที่เริ่มปฏิบัติงาน", align: "left", value: "start_date" },
        { text: "วันที่รายการ", align: "left", value: "date_time" },
        { text: "ตำแหน่ง", align: "left", value: "name_position" },
        {
          text: "ตำแหน่งว่าง",
          align: "center",
          value: "print_manpower",
          icon: "mdi-printer"
        },
        {
          text: "การย้ายคงค้าง",
          align: "center",
          value: "print_move_can",
          icon: "mdi-printer"
        },
        {
          text: "กลั่นกรอง",
          align: "center",
          value: "print_f",
          icon: "mdi-printer"
        },
        {
          text: "อ.ก.ค.ศ.",
          align: "center",
          value: "print_o",
          icon: "mdi-printer"
        },
        {
          text: "คำสั่งย้าย",
          align: "center",
          value: "print_s",
          icon: "mdi-printer"
        },
        {
          text: "อนุมัติย้าย",
          align: "center",
          value: "approve_movement",
          icon: "mdi-printer"
        },
         {
          text: "ตารางเงินเดือน",
          align: "center",
          value: "movement_salary",
          icon: "mdi-printer"
        },
        {
          text: "แก้ไข",
          align: "center",
          value: "actions"
        },
        {
          text: "ลบ",
          align: "center",
          value: "action_s"
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
      order_appointstatus: [],
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      menu1: false,
      menu2: false,
      menu_a: false,
      menu_1: false,
      menu_2: false,
      conditons_transfer_successs: [],
      conditons_transfer_successs_personnel: [],
      transfer_approves: {},
      approve_movement_all_dialog: {}
    };
  },
  async created() {
    this.headers = Object.values(this.headersMap);
    this.selectedHeaders = this.headers;
  },
  async mounted() {
    this.order_appointQueryAll();
  },
  methods: {
    async order_appointQueryAll() {
      this.loading = true;
      let result = await this.$http
        .post("order_appoint.php", {
          ApiKey: this.ApiKey
        })
        .finally(() => (this.loading = false));
      this.order_appoints = result.data;
    },
    async order_appointAdd() {
      this.addorder_appoint = {};
      this.addorder_appointdialog = true;
    },
    async addorder_appointSubmit() {
      if (this.$refs.addorder_appointform.validate()) {
        this.addorder_appoint.ApiKey = this.ApiKey;
        this.addorder_appoint.date_time = this.date_today;
        let result = await this.$http.post(
          "order_appoint.insert.php",
          this.addorder_appoint
        );
        if (result.data.status == true) {
          this.order_appoint = result.data;
          this.snackbar.icon = "mdi-font-awesome";
          this.snackbar.color = "success";
          this.snackbar.text = "บันทึกข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.order_appointQueryAll();
        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text = "บันทึกข้อมูลผิดพลาด";
          this.snackbar.show = true;
          this.order_appointQueryAll();
        }
        this.addorder_appointdialog = false;
      }
    },
    async order_appointEdit(id_oa) {
      let result = await this.$http.post("order_appoint.php", {
        ApiKey: this.ApiKey,
        id_oa: id_oa
      });
      this.editorder_appoint = result.data;
      this.editorder_appointdialog = true;
    },
    async editorder_appointSubmit() {
      if (this.$refs.editorder_appointform.validate()) {
        this.editorder_appoint.ApiKey = this.ApiKey;
        let result = await this.$http.post(
          "order_appoint.update.php",
          this.editorder_appoint
        );
        if (result.data.status == true) {
          this.order_appoint = result.data;
          this.snackbar.icon = "mdi-font-awesome";
          this.snackbar.color = "success";
          this.snackbar.text = "แก้ไขข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.order_appointQueryAll();
        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text = "แก้ไขข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.editorder_appointdialog = false;
      }
    },
    async order_appointDelete(id_oa) {
      let result = await this.$http.post("order_appoint.php", {
        ApiKey: this.ApiKey,
        id_oa: id_oa
      });
      this.editorder_appoint = result.data;
      this.deleteorder_appointdialog = true;
    },
    async deleteorder_appointSubmit() {
      if (this.$refs.deleteorder_appointform.validate()) {
        this.editorder_appoint.ApiKey = this.ApiKey;
        let result = await this.$http.post(
          "order_appoint.delete.php",
          this.editorder_appoint
        );
        if (result.data.status == true) {
          this.order_appoint = result.data;
          this.snackbar.icon = "mdi-font-awesome";
          this.snackbar.color = "success";
          this.snackbar.text = "ลบข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.order_appointQueryAll();
        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text = "ลบข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.deleteorder_appointdialog = false;
      }
    },
    async approve_movement_dialog(id_oa) {
      let result_oa = await this.$http.post("order_appoint.php", {
        ApiKey: this.ApiKey,
        id_oa: id_oa
      });
      this.editorder_appoint = result_oa.data;

      this.loading = true;
      let result = await this.$http
        .post("conditons_transfer_success.php", {
          ApiKey: this.ApiKey,
          transfer_approve: "ok"
        })
        .finally(() => (this.loading = false));
      this.conditons_transfer_successs = result.data;
      this.approve_movement_dialogs = true;     
    },
    async approve_movement_personnel(id_cts) {
      let result = await this.$http.post("conditons_transfer_success.php", {
        ApiKey: this.ApiKey,
        id_cts: id_cts
      });
      this.conditons_transfer_successs_personnel = result.data;
      this.conditons_transfer_successs_personnel_dialog = true;
    },
    async conditons_transfer_successs_personnel_dialogSubmit() {
      if (
        this.$refs.conditons_transfer_successs_personnel_dialogform.validate()
      ) {
        this.transfer_approves.ApiKey = this.ApiKey;
        this.transfer_approves.college_code = this.conditons_transfer_successs_personnel.college_code;
        this.transfer_approves.id_card = this.conditons_transfer_successs_personnel.id_card;
        this.transfer_approves.id_position = this.conditons_transfer_successs_personnel.id_position;
        this.transfer_approves.order_app_now = this.editorder_appoint.order_number;
        this.transfer_approves.date_app_now = this.editorder_appoint.start_date;
        console.log(this.transfer_approves);
        let result = await this.$http.post(
          "transference_approve.update.php",
          this.transfer_approves
        );
        if (result.data.status == true) {
          this.loading = true;
          let result = await this.$http
            .post("conditons_transfer_success.php", {
              ApiKey: this.ApiKey,
              transfer_approve: "ok"
            })
            .finally(() => (this.loading = false));
          this.conditons_transfer_successs = result.data;

          this.snackbar.icon = "mdi-font-awesome";
          this.snackbar.color = "success";
          this.snackbar.text = "บันทึกข้อมูลเรียบร้อย";
          this.snackbar.show = true;       
        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text = "บันทึกข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.conditons_transfer_successs_personnel_dialog = false;
      }
    },
    async approve_movement_dialogs_allSubmit() {
      this.approve_movement_dialogs_all_dialog = true;
    },
    async approve_movement_dialogs_all_dialogSubmit() {
      this.approve_movement_all_dialog.ApiKey = this.ApiKey;
      this.approve_movement_all_dialog.time_s = this.editorder_appoint.time_s;
      this.approve_movement_all_dialog.year_s = this.editorder_appoint.year_s;
      this.approve_movement_all_dialog.name_position = "ครู";
      console.log(this.approve_movement_all_dialog);
      let result = await this.$http.post(
          "transference_approve_all.update.php",
          this.approve_movement_all_dialog
        );
        if (result.data.status == true) {
          this.loading = true;
          let result = await this.$http
            .post("conditons_transfer_success.php", {
              ApiKey: this.ApiKey,
              transfer_approve: "ok"
            })
            .finally(() => (this.loading = false));
          this.conditons_transfer_successs = result.data;

          this.snackbar.icon = "mdi-font-awesome";
          this.snackbar.color = "success";
          this.snackbar.text = "บันทึกข้อมูลเรียบร้อย";
          this.snackbar.show = true;         
        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text = "บันทึกข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.approve_movement_dialogs_all_dialog = false;
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
      let yyyy = today.getFullYear() + 543;

      today = dd + "/" + mm + "/" + yyyy;
      return today;
    },
    date_tims_ch() {
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
      let day = this.order_appoints.date_time.slice(0, 2);
      let month =
        monthNames[parseInt(this.order_appoints.date_time.slice(3, 5))];
      let year = this.order_appoints.date_time.slice(6);
      let years = parseInt(year);
      let today = day + " " + month + " " + years;
      return today;
    },
    color() {
      return "green darken-4";
    },
    showHeaders() {
      return this.headers.filter(s => this.selectedHeaders.includes(s));
    }
  }
};
</script>
