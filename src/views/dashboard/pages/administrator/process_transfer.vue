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
    </v-bottom-navigation>
    <v-container id="home_menu" fluid tag="section">
      <v-card>
        <v-toolbar flat color="primary" dark>
          <v-toolbar-title>ประมวลผลข้อมูลการย้าย</v-toolbar-title>
        </v-toolbar>

        <v-card class="ma-2 pa-2">
          <v-row>
            <v-col cols="12" md="4" class="text-right">
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
            <v-col class="d-flex" cols="12" md="2">
              <v-select
                v-model="times_s"
                :items="time_ss"
                item-text="time_ss"
                label="ครั้งที่ :"
              ></v-select>
            </v-col>
            <v-col class="d-flex" cols="12" md="2">
              <v-select
                v-model="year_s"
                :items="year_ss"
                item-text="year_ss"
                label="ปี :"
              ></v-select>
            </v-col>
            <v-col class="d-flex" cols="12" md="2">
              <v-radio-group v-model="row" row>
                <v-radio label="สถานะ 1 : 1" @click="OnetoOne()"></v-radio>
                <v-radio
                  @click="conditions_transferQueryAll()"
                  label="แสดงทั้งหมด"
                ></v-radio>
              </v-radio-group>
            </v-col>
            <v-col class="d-flex" cols="12" md="2">
              <v-btn
                elevation="2"
                rounded
                color="primary"
                dark
                x-large
                block
                @click="searchTimeYear()"
              >
                <v-icon>mdi-clipboard-check</v-icon> เลือกดำเนินการ</v-btn
              >
            </v-col>
            <v-col cols="6" md="6">
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
            <v-col cols="12" md="6" class="text-right">
              <h1 class="text--right">ประมวลผลแบบที่ 2</h1>
            </v-col>
          </v-row>
        </v-card>

        <v-card flat>
          <v-data-table
            color="success"
            :loading="loading"
            :headers="showHeaders"
            :items="conditions_transfers"
            :search="search"
            :items-per-page="5"
          >
            <template v-slot:[`item.select_item`]="{ item }">
              <v-checkbox
                v-model="search"
                :value="item.college_code"
              ></v-checkbox>
            </template>

            <template v-slot:[`item.college_name`]="{ item }">
              <v-chip color="warning" dark>
                <span style="font-size:16px;"> {{ item.college_name }}</span>
              </v-chip>
            </template>

            <template v-slot:[`item.num_position`]="{ item }">
              <v-chip color="red" dark v-if="item.num_position === '0'">
                <span style="font-size:16px;"> {{ item.num_position }}</span>
              </v-chip>
              <v-chip
                v-else
                color="green"
                dark
                @click.stop="collegePositon(item.college_code)"
              >
                <span style="font-size:16px;"> {{ item.num_position }}</span>
              </v-chip>
            </template>

            <template v-slot:[`item.quantity_n`]="{ item }">
              <v-chip color="info" v-if="item.quantity_n >= '2'">
                <span style="font-size:16px;"> {{ item.quantity_n }}</span>
              </v-chip>
              <v-chip v-else color="green" dark>
                <span style="font-size:16px;"> {{ item.quantity_n }}</span>
              </v-chip>
            </template>

            <template v-slot:[`item.personnel_num_s`]="{ item }">
              <v-chip
                color="green"
                v-if="item.personnel_num_s <= item.quantity_n"
                dark
              >
                <span style="font-size:16px;"> {{ item.personnel_num_s }}</span>
              </v-chip>
              <v-chip v-else color="yellow" dark>
                <span style="font-size:16px;"> {{ item.personnel_num_s }}</span>
              </v-chip>
            </template>

            <template v-slot:[`item.personnel_num_all`]="{ item }">
              <v-chip
                color="yellow"
                v-if="item.personnel_num_all > item.num_position"
              >
                <span style="font-size:16px;">
                  {{ item.personnel_num_all }}</span
                >
              </v-chip>
              <v-chip v-else color="green" dark>
                <span style="font-size:16px;">
                  {{ item.personnel_num_all }}</span
                >
              </v-chip>
            </template>

            <template v-slot:[`item.comment_dr_c`]="{ item }">
              <v-chip
                class="ma-1"
                v-if="item.comment_dr_c === 'approp'"
                color="green"
                dark
              >
                <h2>เห็นควร</h2>
              </v-chip>
              <v-chip
                class="ma-1"
                v-else-if="item.comment_dr_c === 'inapprop'"
                color="warning"
                dark
              >
                <h2>ไม่เห็นควร</h2>
              </v-chip>
              <v-chip
                v-else-if="item.comment_dr_c === 'suspend'"
                color="red"
                dark
                >ระงับย้าย</v-chip
              >
              <v-chip class="ma-1" v-else color="info" dark>
                <h2>ยังไม่ได้บันทึกข้อมูล</h2>
              </v-chip>

              <v-chip
                v-if="item.status_document === 'complete'"
                color="green"
                dark
                >ถูกต้องสมบูรณ์</v-chip
              >
              <v-chip
                v-else-if="item.status_document === 'incomplete'"
                color="warning"
                dark
                >ไม่สมบูรณ์</v-chip
              >
              <v-chip
                v-else-if="item.status_document === 'do_not'"
                color="red"
                dark
                >ไม่จัดส่ง</v-chip
              >
            </template>

            <template v-slot:[`item.college_name_now`]="{ item }">
              <v-chip color="grey" dark>
                <span style="font-size:16px;">
                  {{ item.college_name_now }}</span
                >
              </v-chip>
            </template>

            <template v-slot:[`item.status_process`]="{ item }">
              <span
                v-if="
                  item.personnel_num_s <= item.quantity_n &&
                    item.condition_edu === item.personnel_edu
                "
              >
                <v-icon large color="green darken-2"
                  >mdi-clipboard-check</v-icon
                ></span
              >
              <span v-else
                ><v-icon large color="yellow lighten-1"
                  >mdi-clipboard-check-multiple</v-icon
                ></span
              >
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-chip
                v-if="item.status_select === 'sw_normal'"
                color="warning"
                dark
              >
                <span style="font-size:16px;">สับเปลี่ยน (3)</span>
              </v-chip>
              <v-chip
                v-else-if="item.status_select === 'sw_agree'"
                color="warning"
                dark
              >
                <span style="font-size:16px;">แลกเปลี่ยน (4)</span>
              </v-chip>

              <v-icon
                v-else-if="item.college_code_susss >= 1"
                color="red"
                large
                @click.stop="deletePosition(item.id_ref)"
                >mdi-delete-circle</v-icon
              >

              <v-icon
                color="green"
                large
                @click.stop="
                  select_idPosition(
                    item.id_cb,
                    item.id_tfl,
                    item.id_tfp,
                    item.college_code
                  )
                "
                v-else-if="
                  item.personnel_num_s <= 1 &&
                    item.condition_edu === item.personnel_edu &&
                    item.num_position !== '0'
                "
              >
                mdi-credit-card-plus
              </v-icon>

              <v-icon
                color="red"
                large
                @click.stop="
                  select_idPosition(
                    item.id_cb,
                    item.id_tfl,
                    item.id_tfp,
                    item.college_code
                  )
                "
                v-else-if="item.num_position === '0'"
              >
                mdi-credit-card-plus
              </v-icon>

              <v-icon
                color="yellow"
                large
                @click.stop="
                  select_idPosition(
                    item.id_cb,
                    item.id_tfl,
                    item.id_tfp,
                    item.college_code
                  )
                "
                v-else
              >
                mdi-credit-card-plus
              </v-icon>
              <v-chip v-if="item.check_loop">
                {{ item.check_loop }}
              </v-chip>
            </template>

            <template v-slot:[`item.college_code_susss`]="{ item }">
              <v-chip :color="getColor(item.college_code_susss)" dark>
                <span style="font-size:16px;">
                  {{ item.college_code_susss }}</span
                >
              </v-chip>
            </template>

            <template v-slot:[`item.college_name_suss`]="{ item }">
              <v-chip v-if="item.college_name_suss === ''"> </v-chip>
              <v-chip
                v-else-if="item.college_name_suss !== ''"
                color="green"
                dark
              >
                <span style="font-size:16px;">
                  {{ item.college_name_suss }}</span
                >
              </v-chip>
            </template>

            <template v-slot:[`item.id_postion_susss`]="{ item }">
              <v-chip :color="getColor(item.id_postion_susss)" dark>
                <span style="font-size:16px;">
                  {{ item.id_postion_susss }}</span
                >
              </v-chip>
            </template>

            <template v-slot:[`item.point_s`]="{ item }">
              <v-chip color="green" dark>
                <span style="font-size:16px;"> {{ item.point_s }}</span>
              </v-chip>
            </template>

            <v-alert
              slot="no-results"
              :value="true"
              color="error"
              icon="mdi-alert"
              >ไม่พบผลลัพธ์ "{{ search }}" ที่คุณกำลังค้นหา.</v-alert
            >
          </v-data-table>
        </v-card>
        <v-card class="ma-2 pa-2">
          <v-row>
            <v-col class="d-flex" cols="12" md="12">
              <v-btn
                class="ma-1"
                elevation="2"
                rounded
                color="warning"
                dark
                x-large
                @click="transference_locationDelete()"
                ><v-icon>mdi-format-clear</v-icon>
                ลบข้อมูลการย้ายที่ไม่ได้กดบันทึกเสนอ</v-btn
              >
            </v-col>
          </v-row>
        </v-card>
      </v-card>

      <!-- V-model canceldialog -->
      <v-layout row justify-center>
        <v-dialog v-model="canceldialog" persistent max-width="80%">
          <v-card class="mx-auto pa-6">
            <base-material-card
              color="yellow"
              icon="mdi-clipboard-text"
              title="ยกเลิกรายการ"
              class="px-5 py-3 text_google"
            >
              <div class="text-right"></div>
            </base-material-card>
            <v-card-text>
              <v-form ref="cancelform" lazy-validation>
                {{ conditons_transfer_successs.id_cts }}
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md6>
                      <p>
                        รหัสอ้างอิง :
                        {{ transference_personnels_id_ref.id_ref }}
                      </p>
                      <div>
                        รหัสบัตรประชาชน :
                        {{ transference_personnels_id_ref.id_card }}
                        ชื่อ-นามสกุล :
                        {{ transference_personnels_id_ref.title_s
                        }}{{ transference_personnels_id_ref.frist_name }}
                        {{ transference_personnels_id_ref.last_name }}
                      </div>
                      สถานศึกษาปัจจุบัน :
                      {{ transference_personnels_id_ref.college_name }}
                      เลขที่ตำแหน่งปัจจุบัน :
                      {{ transference_personnels_id_ref.id_position }}
                    </v-flex>
                    <v-flex md6>
                      <p>
                        รหัสวิทยาลัยปลายทาง : {{ man_powerss.college_code }}
                      </p>
                      <div>วิทยาลัย : {{ man_powerss.college_name }}</div>
                      เลขที่ตำแหน่ง : {{ man_powerss.id_position }}
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
              <v-btn large @click.stop="canceldialog = false" rounded>
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn large color="warning" @click.stop="cancelSubmit()" rounded>
                <v-icon dark>mdi-pencil</v-icon>&nbsp;ยืนยัน
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model deletetransference_locationdialog -->
      <v-layout row justify-center>
        <v-dialog
          v-model="deletetransference_locationdialog"
          persistent
          max-width="80%"
        >
          <v-card class="mx-auto pa-6">
            <base-material-card
              color="yellow"
              icon="mdi-clipboard-text"
              title="ลบรายการที่ไม่ได้ดำเนินรายการเรียบร้อย"
              class="px-5 py-3 text_google"
            ></base-material-card>
            <v-card-text>
              <v-form ref="edituserform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap> </v-layout>
                </v-container>
                <small>* จำเป็น</small>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                large
                @click.stop="deletetransference_locationdialog = false"
                rounded
              >
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn
                large
                color="warning"
                @click.stop="deletetransference_locationSubmit()"
                rounded
              >
                <v-icon dark>mdi-pencil</v-icon>&nbsp;ยืนยันการลบ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model college_position -->
      <v-layout row justify-center>
        <v-dialog v-model="college_postionDialog" persistent max-width="80%">
          <v-card class="mx-auto pa-6">
            <base-material-card
              color="success"
              icon="mdi-clipboard-text"
              title="เงือนไขสาขาวิชาเอก"
              class="px-5 py-3 text_google"
            ></base-material-card>
            <v-card-text>
              <v-alert
                border="left"
                colored-border
                color="green darken-1"
                elevation="2"
                type="info"
              >
                <table width="100%" align="center" class="table">
                  <tr>
                    <th width="7%" class="regular16 th" align="center">
                      อันดับ
                    </th>
                    <th width="10%" class="regular16 " align="center">
                      คุณวุฒิ
                    </th>
                    <th width="25%" class="regular16 " align="left">
                      สาขาวิชา
                    </th>
                    <th width="10%" class="regular16 th" align="center">
                      จำนวนรับ
                    </th>
                  </tr>
                </table>

                <table
                  width="100%"
                  align="center"
                  class="table"
                  v-for="item in conditionss"
                  :key="item.id_ref"
                  small
                >
                  <tr>
                    <td width="7%" class="regular12 th" align="center">
                      {{ item.sequence_n }}
                    </td>
                    <td width="10%" class="regular12 " align="center">
                      {{ item.educational_level }}
                    </td>
                    <td width="25%" class="regular12 ">
                      {{ item.id_branch }} {{ item.name_branch }}
                    </td>
                    <td width="10%" class="regular12 th" align="center">
                      {{ item.quantity_n }}
                    </td>
                  </tr>
                </table>
              </v-alert>

              <v-alert
                border="left"
                colored-border
                color="green darken-1"
                elevation="2"
                type="info"
              >
                <table width="100%" align="center" class="table">
                  <tr>
                    <th width="30%" class="regular16 th" align="center">
                      สถานศึกษา
                    </th>
                    <th width="20%" class="regular16 " align="center">
                      จังหวัด
                    </th>
                    <th width="10%" class="regular16 " align="left">
                      อัตราว่าง
                    </th>
                    <th width="10%" class="regular16 th" align="center">
                      รหัสตำแหน่ง
                    </th>
                    <th width="10%" class="regular16 th" align="center">
                      ตำแหน่ง
                    </th>
                    <th width="20%" class="regular16 th" align="center">
                      กรณี
                    </th>
                  </tr>
                </table>

                <table
                  width="100%"
                  align="center"
                  class="table"
                  v-for="item in man_powers"
                  :key="item.id_m"
                  small
                >
                  <tr>
                    <td width="30%" class="regular12 th" align="center">
                      {{ item.college_name }}
                    </td>
                    <td width="20%" class="regular12 " align="center">
                      {{ item.province_name }}
                    </td>
                    <td width="10%" class="regular12 ">
                      {{ item.num_position }}
                    </td>
                    <td width="10%" class="regular12 ">
                      {{ item.id_position }}
                    </td>
                    <td width="10%" class="regular12 th" align="center">
                      {{ item.position }}
                    </td>
                    <td width="20%" class="regular12 th" align="center">
                      {{ item.case_vacancy }}
                    </td>
                  </tr>
                </table>
              </v-alert>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn large @click.stop="college_postionDialog = false" rounded>
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model positiondialog -->
      <v-layout row justify-center>
        <v-dialog v-model="positiondialog" persistent max-width="80%">
          <v-card class="mx-auto pa-6">
            <base-material-card
              color="yellow"
              icon="mdi-clipboard-text"
              title="เลือกตำแหน่ง"
              class="px-5 py-3 text_google"
            ></base-material-card>
            <v-card-text>
              <v-form ref="updatepositionform" lazy-validation>
                <v-container grid-list-md>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-card elevation="2" class="pa-2">
                        <h2>
                          สถานศึกษาแห่งใหม่ :
                          {{ transference_locations.college_name }}
                        </h2>
                        <h4>
                          รหัสสาขาวิชาเอก : {{ conditions_branchs.id_branch }}
                        </h4>
                        <h4>
                          สาขาวิชาเอก : {{ conditions_branchs.name_branch }}
                        </h4>
                        <h4>
                          รหัสสถานศึกษา :
                          {{ transference_locations.college_code_new }}
                        </h4>
                      </v-card>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-card elevation="2" class="pa-2">
                        <h2>
                          รหัสบัตรประชาชน :
                          {{ transference_personnels.id_card }}
                        </h2>
                        <h4>
                          ชื่อ-นามสกุล : {{ transference_personnels.title_s
                          }}{{ transference_personnels.frist_name }}
                          {{ transference_personnels.last_name }}
                        </h4>
                        <h4>
                          สถานศึกษาปัจจุบัน :
                          {{ transference_personnels.college_name }} [
                          {{ transference_personnels.college_code }} ]
                        </h4>
                        <h4>
                          เลขที่ตำแหน่งปัจจุบัน :
                          {{ transference_personnels.id_position }}
                        </h4>
                      </v-card>
                    </v-col>
                    <v-col cols="12" md="12">
                      <v-card elevation="2" class="pa-2">
                        <h2>
                          เหตุผลในการย้าย :
                        </h2>

                        <div v-if="transference_personnels.reason_1 === '1'">
                          <v-alert
                            border="left"
                            colored-border
                            type="info"
                            elevation="2"
                          >
                            <h3>ย้ายเพื่ออยู่ร่วมคู่สมรส</h3>
                            คู่สมรสชื่อ :
                            {{ transference_personnels.reason_1_spouse }}
                            คู่สมรสประกอบอาชีพ :
                            {{ transference_personnels.reason_1_occupation }}
                            สถานที่ประกอบอาชีพของคู่สมรส :
                            {{ transference_personnels.reason_1_location }}
                            ภูมิลำเนาของคู่สมรส จังหวัด
                            {{ transference_personnels.r1_province }}
                          </v-alert>
                        </div>

                        <div v-if="transference_personnels.reason_2 === '1'">
                          <v-alert
                            border="left"
                            colored-border
                            type="info"
                            elevation="2"
                          >
                            <h3>ย้ายเพื่ออยู่ดูแลบิดา มารดา</h3>
                            อายุของบิดา :
                            {{ transference_personnels.reason_2_fyear }} ปี
                            อายุของมารดา :
                            {{ transference_personnels.reason_2_myear }} ปี
                            ภูมิลำเนาของบิดา มารดา จังหวัด :
                            {{ transference_personnels.r2_province }}
                          </v-alert>
                        </div>
                        <div v-if="transference_personnels.reason_3 === '1'">
                          <v-alert
                            border="left"
                            colored-border
                            type="info"
                            elevation="2"
                          >
                            <h3>ย้ายกลับภูมิลำเนา</h3>

                            จังหวัด : {{ transference_personnels.r3_province }}
                          </v-alert>
                        </div>
                        <div v-if="transference_personnels.reason_4 === '1'">
                          <v-alert
                            border="left"
                            colored-border
                            type="info"
                            elevation="2"
                          >
                            <h3>
                              เหตุผลอื่น ๆ :
                            </h3>
                            {{ transference_personnels.reason_4_detail }}
                          </v-alert>
                        </div>
                      </v-card>
                    </v-col>
                  </v-row>
                  <v-layout wrap>
                    <v-flex md12>
                      <v-autocomplete
                        :items="man_powers"
                        item-text="college_position_case"
                        item-value="id_position"
                        label="เลขที่ตำแหน่ง"
                        v-model="updatepositions.id_position"
                        required
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
              <v-btn large @click.stop="positiondialog = false" rounded>
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn
                large
                color="warning"
                @click.stop="updatepositionSubmit()"
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
        <v-card-text>{{ snackbar.text }}</v-card-text>

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
  name: "HrvecProcessTransfer",
  data() {
    return {
      value: "3",
      college_postionDialog: false,
      loading: false,
      ApiKey: "HRvec2021",
      process_transfer: {},
      valid: true,
      times_s: "",
      row: null,
      year_s: "",
      man_powers: [],
      snackbar: {
        show: false,
        color: "",
        timeout: 5000,
        icon: "",
        text: ""
      },
       time_ss: [1, 2],
      year_ss: [2565, 2566, 2567, 2568, 2569, 2570],
      headers: [],
      selectedHeaders: [],
      headersMap: [
        { text: "เลือก", align: "left", value: "select_item" },
        { text: "รหัสสถานศึกษา", align: "left", value: "college_code" },
        { text: "ส.แห่งใหม่", align: "left", value: "college_name" },
        { text: "ลำดับ", align: "left", value: "squence_nc" },
        { text: "รหัส", align: "left", value: "id_branch" },
        { text: "สาขา", align: "left", value: "name_branch" },
        {
          text: "วุฒิรับ",
          align: "left",
          value: "condition_edu"
        },
        { text: "อัตราว่าง", align: "center", value: "num_position" },
        { text: "จำนวนรับ", align: "center", value: "quantity_n" },
        { text: "จ.เข้า", align: "center", value: "personnel_num_s" },
        { text: "จ.เข้า.ท", align: "center", value: "personnel_num_all" },

        { text: "สถานะ", align: "center", value: "status_process" },
        { text: "ลำดับที่", align: "center", value: "sequence_n" },
        { text: "วุฒิ", align: "center", value: "personnel_edu" },
        { text: "ID Card", align: "center", value: "id_card" },
        { text: "ชื่อ-นามสกุล", align: "center", value: "personnel_name" },
        { text: "คะแนน", align: "center", value: "point_s" },
        { text: "อายุงาน", align: "center", value: "age_app_time" },
        { text: "ความคิดเห็น ผอ.", align: "center", value: "comment_dr_c" },
        { text: "ส.ปัจจุบัน", align: "left", value: "college_name_now" },
        {
          text: "เลขที่ตำแหน่ง",
          align: "center",
          value: "actions",
          icon: "mdi-file-document-edit"
        },
        { text: "แห่งใหม่", align: "center", value: "college_code_susss" },
        {
          text: "สถานศึกษาแห่งใหม่",
          align: "center",
          value: "college_name_suss"
        },
        { text: "เลขที่", align: "center", value: "id_postion_susss" }
      ],
      search: "",
      pagination: {},
      rowsperpage: [
        25,
        50,
        100,
        {
          text: "All",
          value: -1
        }
      ],
      conditions_transfers: [],
      period_match: [],
      delete_transference: [],
      conditions_branchs: [],
      transference_locations: [],
      transference_personnels: [],
      edittransference_location: [],
      positiondialog: false,
      deletetransference_locationdialog: false,
      canceldialog: false,
      conditons_transfer_successs: [],
      transference_personnels_id_ref: [],
      man_powerss: [],
      updatepositions: {},
      updatepositions_condition: {},
      conditionss: [],
      addreturn_man_power: {},
      periods: [],
      period_enable_process: "1",
      man_power_cancel: {}
    };
  },
  async created() {
    this.headers = Object.values(this.headersMap);
    this.selectedHeaders = this.headers;
  },
  async mounted() {
    
    await this.periodQuery();
    await this.man_powerQuery();
 await this.conditions_transferQueryAll(); 
  },

  methods: {
    async periodQuery() {
      let result_period;
      result_period = await this.$http.post("period.php", {
        ApiKey: this.ApiKey,
       period_enable_process: "1",
       period_type: "teacher"    
      });
      this.periods = result_period.data;
    },

    async searchTimeYear() {
      this.loading = true;
      let result = await this.$http
        .post("process_transfer.php", {
          ApiKey: this.ApiKey,
          time_s: this.times_s,
          year_s: this.year_s
        })
        .finally(() => (this.loading = false));
      this.conditions_transfers = result.data;
    },

    async collegePositon(college_code) {
      let result;
      result = await this.$http.post("conditions_branch.php", {
        ApiKey: this.ApiKey,
        user_name: college_code
      });
      this.conditionss = result.data;

      let man_power_result;
      man_power_result = await this.$http.post("man_power.php", {
        ApiKey: this.ApiKey,
        college_code: college_code
      });
      this.man_powers = man_power_result.data;

      this.college_postionDialog = true;
    },

    async OnetoOne() {
      this.loading = true;
      let result = await this.$http
        .post("process_transfer.php", {
          ApiKey: this.ApiKey,
          time_s: this.times_s,
          year_s: this.year_s,
          OnetoOne: "1"
        })
        .finally(() => (this.loading = false));
      this.conditions_transfers = result.data;
    },

    async Switch_personnel() {
      this.loading = true;
      let result = await this.$http
        .post("process_transfer.php", {
          ApiKey: this.ApiKey,
          time_s: this.times_s,
          year_s: this.year_s,
          switchs: "Ok"
        })
        .finally(() => (this.loading = false));
      this.conditions_transfers = result.data;
    },

    async conditions_transferQueryAll() {
      this.loading = true;
      let result = await this.$http
        .post("process_transfer.php", {
          ApiKey: this.ApiKey,
          time_s: this.periods.period_times,
          year_s: parseInt(this.periods.period_year) + 543
        })
        .finally(() => (this.loading = false));
      this.conditions_transfers = result.data;
    },

    async period_QueryAll() {
      this.loading = true;
      let result = await this.$http
        .post("period.php", {
          ApiKey: this.ApiKey
        })
        .finally(() => (this.loading = false));
      this.period_match = result.data;
    },

    async select_idPosition(id_cb, id_tfl, id_tfp, college_code) {
      let result_con = await this.$http.post("conditions_branch.php", {
        ApiKey: this.ApiKey,
        id_cb: id_cb
      });
      this.conditions_branchs = result_con.data;
      /*  console.log(result_con.data)
      console.log(id_cb)
 */
      let result_loca = await this.$http.post("transference_location.php", {
        ApiKey: this.ApiKey,
        id_tfl: id_tfl
      });
      this.transference_locations = result_loca.data;

      let result_tran = await this.$http
        .post("transference_personnel.php", {
          ApiKey: this.ApiKey,
          id_tfp: id_tfp
        })
        .finally(() => (this.loading = false));

      this.transference_personnels = result_tran.data;
      this.positiondialog = true;
      this.man_powerQuery(college_code);
    },

    async man_powerQuery(college_code) {
      let man_power_result;
      man_power_result = await this.$http.post("man_power_process.php", {
        ApiKey: this.ApiKey,
        college_code: college_code
      });
      this.man_powers = man_power_result.data;
    },

    async transference_locationDelete() {
      this.deletetransference_locationdialog = true;
    },
    async deletetransference_locationSubmit() {
      if (this.$refs.edituserform.validate()) {
        let result = await this.$http.post(
          "transference_location.delete.admin.php"
        );
        if (result.data.status == true) {
          this.conditions_transfers = result.data;
          this.snackbar.icon = "mdi-font-awesome";
          this.snackbar.color = "success";
          this.snackbar.text = "ลบข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.conditions_transferQueryAll();
        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text = "ลบข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.deletetransference_locationdialog = false;
      }
    },

    async deletePosition(id_ref) {
      let result_con = await this.$http.post("transference_personnel.php", {
        ApiKey: this.ApiKey,
        id_ref: id_ref
      });

      this.transference_personnels_id_ref = result_con.data;

      let result_man = await this.$http.post("man_power.php", {
        ApiKey: this.ApiKey,
        id_card: this.transference_personnels_id_ref.id_card
      });
      this.man_powerss = result_man.data;

      let result_cts = await this.$http.post("conditons_transfer_success.php", {
        ApiKey: this.ApiKey,
        id_ref: id_ref
      });

      this.conditons_transfer_successs = result_cts.data;
      this.canceldialog = true;
    },

    /// updatepositionSubmit
    async updatepositionSubmit() {
      if (this.$refs.updatepositionform.validate()) {
        this.updatepositions.ApiKey = this.ApiKey;
        this.updatepositions.time_s = this.transference_personnels.time_ss;
        this.updatepositions.year_s = this.transference_personnels.year_ss;
        this.updatepositions.id_postion_old = this.transference_personnels.id_position;
        this.updatepositions.college_code_old = this.transference_personnels.college_code;
        this.updatepositions.college_code = this.transference_locations.college_code_new;
        this.updatepositions.id_branch = this.conditions_branchs.id_branch;
        this.updatepositions.id_card = this.transference_personnels.id_card;
        this.updatepositions.id_ref = this.transference_personnels.tid_ref;
        this.updatepositions.name_position = "ครู";
        this.updatepositions.status_select = "agree";

        this.updatepositions_condition.ApiKey = this.ApiKey;
        this.updatepositions_condition.id_position = this.updatepositions.id_position;
        this.updatepositions_condition.status_booking = this.transference_personnels.id_card;

        this.addreturn_man_power.ApiKey = this.ApiKey;
        this.addreturn_man_power.college_code = this.transference_personnels.college_code;
        this.addreturn_man_power.id_position = this.transference_personnels.id_position;
        this.addreturn_man_power.position = "ครู";
        this.addreturn_man_power.case_vacancy =
          "ย้ายรอบ-" +
          this.transference_personnels.time_ss +
          "/" +
          this.transference_personnels.year_ss;

        let result_man_return = await this.$http.post(
          "man_power.insert.php",
          this.addreturn_man_power
        );

        if (result_man_return.data.status == true) {
          let result_man = await this.$http.post(
            "man_power.update_process.php",
            this.updatepositions_condition
          );
          let result = await this.$http.post(
            "conditons_transfer_success.insert.php",
            this.updatepositions
          );

          if (result_man.data.status == true && result.data.status == true) {
            this.snackbar.icon = "mdi-font-awesome";
            this.snackbar.color = "success";
            this.snackbar.text = "บันทึกข้อมูลเรียบร้อย";
            this.snackbar.show = true;
            this.conditions_transferQueryAll();
          }
        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text = "บันทึกข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.positiondialog = false;
      }
    },

    async cancelSubmit() {
      if (this.$refs.cancelform.validate()) {
        this.man_powerss.ApiKey = this.ApiKey;
        this.man_powerss.status_booking = "";

        this.conditons_transfer_successs.ApiKey = this.ApiKey;

        this.man_power_cancel.ApiKey = this.ApiKey;
        this.man_power_cancel.id_position = this.conditons_transfer_successs.id_postion_old;

        /* console.log(this.man_powerss);
        console.log(this.conditons_transfer_successs);
        console.log(this.man_power_cancel);
 */
        let result_man = await this.$http.post(
          "man_power.update_process.php",
          this.man_powerss
        );

        let result_man_delete = await this.$http.post(
          "man_power.delete.php",
          this.man_power_cancel
        );

        let result_cts = await this.$http.post(
          "conditons_transfer_success.delete.php",
          this.conditons_transfer_successs
        );

        if (
          result_man.data.status == true &&
          result_cts.data.status == true &&
          result_man_delete.data.status == true
        ) {
          this.snackbar.icon = "mdi-font-awesome";
          this.snackbar.color = "success";
          this.snackbar.text = "ยกเลิกข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.conditions_transferQueryAll();
        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text = "ยกเลิกข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.canceldialog = false;
      }
    },

    getColor(calories) {
      /*  if (calories > 400) return 'red'
        else if (calories > 200) return 'orange'
        else return 'green'  */

      if (calories > 0) return "green";
      else return "";
    }
  },
  computed: {
    period_match_call() {
      let period_year = this.period_match.period_year;
      let period_times = this.period_match.period_times;
      let result = period_times + "/" + period_year;
      return result;
    },
    period_years() {
      let yyyy = parseInt(this.periods.period_year) + 543;
      return yyyy;
    },
    color() {
      return "light-green darken-4";
    },
    showHeaders() {
      return this.headers.filter(s => this.selectedHeaders.includes(s));
    }
  }
};
</script>

<style lang="scss" scoped></style>
