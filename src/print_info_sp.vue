<template class="text_google">
  <v-app>
    <v-system-bar
      class="noprint"
      color="grey darken-2"
      dark
      height="40"
      app
      lights-out
    >
      <v-toolbar-items class="ml-5">
        <v-btn
          href="javascript:window.print()"
          class="title elevation-0 mr-2"
          color="grey darken-1"
          x-large
        >
          <v-icon>mdi-printer</v-icon>&nbsp; พิมพ์
        </v-btn>
        <v-btn
          @click.stop="Export2Doc('exportContent', 'word-content')"
          class="title elevation-0"
          color="grey darken-1"
          x-large
        >
          <v-icon>mdi-file-word</v-icon>&nbsp; Export to Word
        </v-btn>
      </v-toolbar-items>
    </v-system-bar>
    <div id="exportContent" style="mso-page-orientation: landscape;">
      <div class="page">
        <div align="center">
          <div class="head">
            แบบแสดงความประสงค์ขอย้ายกรณีพิเศษ
            ของข้าราชการครูและบุคลากรทางการศึกษา
          </div>
          <div class="head">
            สำกัดสำนักงานคณะกรรมการการอาชีวศึกษา
          </div>
          <div class="head"></div>
          <hr />
        </div>
        <table style="padding-top:5px" class="text_j" border="0" width="100%">
          <tr>
            <td width="50%"></td>
            <td width="15%"><div class="regular16">เขียนที่</div></td>
            <td width="35%">
              <div class="regular16 td_line">
                {{ transference_personnel_sps.college_name }}
              </div>
            </td>
          </tr>
          <tr>
            <td></td>
            <td><div class="regular16">วันที่ยื่นคำร้อง</div></td>
            <td>
              <div class="regular16 td_line">
                {{ transference_personnel_sps.tps_date_time }}
              </div>
            </td>
          </tr>
        </table>

        <table border="0" width="100%">
          <tr>
            <td width="70%">
              <div class="regular16">
                เรียน เลขาธิการคณะกรรมการการอาชีวศึกษา
              </div>
            </td>
            <td width="30%"></td>
          </tr>
        </table>

        <table class="text_j" width="100%" align="center">
          <tr>
            <td width="15%"></td>
            <td width="10%">ข้าพเจ้า</td>
            <td width="40%">
              <div class="regular16 td_line" align="center">
                {{
                  transference_personnel_sps.title_s +
                    transference_personnel_sps.frist_name +
                    " " +
                    transference_personnel_sps.last_name
                }}
              </div>
            </td>
            <td width="15%">
              <div class="regular16" align="center">เลขที่ตำแหน่ง</div>
            </td>
            <td width="20%">
              <div class="regular16 td_line" align="center">
                {{ transference_personnel_sps.id_position }}
              </div>
            </td>
          </tr>
        </table>

        <table class="text_j" border="0" width="100%" align="center">
          <tr>
            <td width="28%">
              <div class="regular16">วิทยฐานะ (กรณีข้าราชการครู)</div>
            </td>
            <td width="20%">
              <div class="regular16 td_line" align="center">
                {{ transference_personnel_sps.rang_name || "-" }}
              </div>
            </td>
            <td width="18%">
              <div class="regular16" align="center">สังกัด (สถานศึกษา)</div>
            </td>
            <td width="40%">
              <div class="regular16 td_line" align="center">
                {{ transference_personnel_sps.college_name }}
              </div>
            </td>
          </tr>
        </table>

        <table class="text_j" border="0" width="100%" align="center">
          <tr>
            <td width="30%">
              <div class="regular16">เลขประจำตัวประชาชน 13 หลัก</div>
            </td>
            <td width="70%">
              <div class="regular16 td_line" align="left">
                {{ transference_personnel_sps.tps_id_card }}
              </div>
            </td>
          </tr>
        </table>

        <table class="text_j" width="100%" align="center">
          <tr>
            <td width="20%">
              <div class="regular16">
                เริ่มรับราชการตำแหน่ง
              </div>
            </td>
            <td width="20%">
              <div class="regular16 td_line" align="center">
                {{ transference_personnel_sps.position_name }}
              </div>
            </td>
            <td width="10%">
              <div class="regular16" align="center">
                ตั้งแต่วันที่
              </div>
            </td>
            <td width="50%">
              <div class="regular16 td_line" align="center">
                {{
                  transference_personnel_sps.appoin_day +
                    "/" +
                    transference_personnel_sps.appoin_month +
                    "/" +
                    transference_personnel_sps.appoin_year
                }}
              </div>
            </td>
          </tr>
        </table>

        <table class="text_j" border="0" width="100%" align="center">
          <tr>
            <td width="45%">
              <div class="regular16">
                ระยะเวลาตั้งแต่บรรจุเข้ารับราชการ เป็นเวลา
              </div>
            </td>
            <td width="55%">
              <div class="regular16 td_line" align="center">
                {{ transference_personnel_sps.tps_age_time }}
              </div>
            </td>
          </tr>
        </table>

        <table class="text_j" width="100%" align="center">
          <tr>
            <td width="20%">
              <div class="regular16">
                ปัจจุบันดำรงตำแหน่ง
              </div>
            </td>
            <td width="20%">
              <div class="regular16 td_line" align="center">
                {{ transference_personnel_sps.position_name }}
              </div>
            </td>
            <td width="10%">
              <div class="regular16" align="center">
                ตั้งแต่วันที่
              </div>
            </td>
            <td width="50%">
              <div class="regular16 td_line" align="center">
                {{
                  transference_personnel_sps.appoin_day +
                    "/" +
                    transference_personnel_sps.appoin_month +
                    "/" +
                    transference_personnel_sps.appoin_year
                }}
              </div>
            </td>
          </tr>
        </table>

        <table class="text_j" width="100%" align="center">
          <tr>
            <td width="35%">
              <div class="regular16">
                เริ่มปฏิบัติหน้าที่ในสถานศึกษาปัจจุบัน คำสั่งที่
              </div>
            </td>
            <td width="25%">
              <div class="regular16 td_line" align="center">
                {{ transference_personnel_sps.order_app_now || "-" }}
              </div>
            </td>
            <td width="10%"><div class="regular16">เมื่อวันที่</div></td>
            <td width="20%">
              <div class="regular16 td_line" align="center">
                {{
                  transference_personnel_sps.date_app_now
                    | moment("add", "543 years")
                    | moment("D MMMM YYYY")
                }}
              </div>
            </td>
          </tr>
        </table>

        <table class="text_j" border="0" width="100%" align="center">
          <tr>
            <td width="55%">
              <div class="regular16">
                ปฏิบัติหน้าที่ในสถานศึกษา/หน่วยงานปัจจุบัน เป็นเวลา
              </div>
            </td>
            <td width="45%">
              <div class="regular16 td_line" align="center">
                {{ transference_personnel_sps.tps_age_app_time }}
              </div>
            </td>
          </tr>
        </table>

        <table class="text_j" width="100%" align="center">
          <tr>
            <td width="10%">
              <div class="regular16">สถานภาพ</div>
            </td>
            <td width="20%">
              <div class="regular16 td_line" align="center">
                {{ marital_status }}
              </div>
            </td>
            <td width="35%">
              <div class="regular16">อื่นๆ กรณีสมรส คู่สมรสประกอบอาชีพ</div>
            </td>
            <td width="35%">
              <div class="regular16 td_line" align="center">
                {{ transference_personnel_sps.occupation_sm }}
              </div>
            </td>
          </tr>
        </table>

        <table class="text_j" width="100%" align="center">
          <tr>
            <td width="30%">
              <div class="regular16">สถานที่ปฏิบัติงานของคู่สมรส</div>
            </td>
            <td width="70%">
              <div class="regular16 td_line" align="center">
                {{ transference_personnel_sps.work_placem }}
              </div>
            </td>
          </tr>
        </table>

        <table class="text_j" width="100%" align="center">
          <tr>
            <td width="25%">
              <div class="regular16">ภูมิลำเนาของข้าพเจ้า จังหวัด</div>
            </td>
            <td width="20%">
              <div class="regular16 td_line" align="center">
                {{ transference_personnel_sps.domicile_p }}
              </div>
            </td>
            <td width="25%">
              <div class="regular16">ภูมิลำเนาของคู่สมรส จังหวัด</div>
            </td>
            <td width="20%">
              <div class="regular16 td_line" align="center">
                {{ transference_personnel_sps.domicile_m }}
              </div>
            </td>
          </tr>
        </table>

        <table border="0" width="100%" align="center">
          <tr>
            <td width="75%" colspan="2">
              <div class="regular16">
                อยู่ระหว่างลาศึกษาต่อเต็มเวลาหรือไม่
                <v-icon
                  large
                  color="black"
                  v-if="
                    transference_personnel_sps.tps_on_study_leave === 'no_leave'
                  "
                  >mdi-checkbox-marked-outline</v-icon
                >
                <v-icon large color="black" v-else
                  >mdi-checkbox-blank-outline</v-icon
                >
                ไม่อยู่

                <v-icon
                  large
                  color="black"
                  v-if="
                    transference_personnel_sps.tps_on_study_leave === 'leave'
                  "
                  >mdi-checkbox-marked-outline</v-icon
                >
                <v-icon large color="black" v-else
                  >mdi-checkbox-blank-outline</v-icon
                >
                อยู่ระหว่างลาศึกษาต่อที่
              </div>
            </td>
            <td width="25%" class="regular16 td_line" align="center">
              {{ transference_personnel_sps.tps_on_study_leave_at }}
            </td>
          </tr>
        </table>

        <table class="text_j" width="100%" align="center">
          <tr>
            <td>
              <div class="regular16">
                ประวัติการศึกษา
              </div>
            </td>
          </tr>
        </table>

        <table
          class="text_j"
          border="0"
          width="100%"
          align="center"
          v-for="item in personnel_educations"
          :key="item.id_red"
          small
        >
          <tr>
            <td width="5%"></td>
            <td width="15%">
              <div class="regular16">{{ item.education_level }}</div>
            </td>
            <td width="20%">
              <div class="regular16 td_line">วุฒิ {{ item.faculty_name }}</div>
            </td>
            <td width="60%">
              <div class="regular16 td_line">สาขา {{ item.branch_name }}</div>
            </td>
          </tr>
        </table>

        <table border="0" width="100%" align="center">
          <tr>
            <td width="100%" colspan="2">
              <div class="regular16">
                ปัจจุบันปฏิบัติการสอน

                <v-icon
                  large
                  color="black"
                  v-if="
                    transference_personnel_sps.tps_teaching_status ===
                      'no_teach'
                  "
                  >mdi-checkbox-marked-outline</v-icon
                >
                <v-icon large color="black" v-else
                  >mdi-checkbox-blank-outline</v-icon
                >
                ไม่ได้ทำการสอน
                <v-icon
                  large
                  color="black"
                  v-if="
                    transference_personnel_sps.tps_teaching_status === 'teach'
                  "
                  >mdi-checkbox-marked-outline</v-icon
                >
                <v-icon large color="black" v-else
                  >mdi-checkbox-blank-outline</v-icon
                >
                ทำการสอน ดังนี้
              </div>
            </td>
          </tr>
        </table>

        <table
          class="text_j"
          border="0"
          width="100%"
          align="center"
          v-if="transference_personnel_sps.tps_teaching_status === 'teach'"
        >
          <tr>
            <td width="5%"></td>
            <td width="20%"><div class="regular16">1. ทำการสอนวิชา</div></td>
            <td width="75%">
              <div class="regular16 td_line" align="left">
                {{ transference_personnel_sps.tps_subject_1 || "-" }}
              </div>
            </td>
          </tr>
          <tr>
            <td></td>
            <td><div class="regular16">2. ทำการสอนวิชา</div></td>
            <td>
              <div class="regular16 td_line" align="left">
                {{ transference_personnel_sps.tps_subject_2 || "-" }}
              </div>
            </td>
          </tr>
          <tr>
            <td></td>
            <td><div class="regular16">3. ทำการสอนวิชา</div></td>
            <td>
              <div class="regular16 td_line" align="left">
                {{ transference_personnel_sps.tps_subject_3 || "-" }}
              </div>
            </td>
          </tr>
          <tr>
            <td></td>
            <td><div class="regular16">4. ทำการสอนวิชา</div></td>
            <td>
              <div class="regular16 td_line" align="left">
                {{ transference_personnel_sps.tps_subject_4 || "-" }}
              </div>
            </td>
          </tr>
        </table>

        <table
          class="text_j"
          border="0"
          width="100%"
          align="center"
          v-if="transference_personnel_sps.tps_teaching_status === 'teach'"
        >
          <tr>
            <td width="5%"></td>
            <td width="20%">
              <div class="regular16">5. หน้าที่อื่นๆ (ถ้ามี)</div>
            </td>
            <td width="75%">
              <div class="regular16 td_line" align="left">
                {{ transference_personnel_sps.tps_perform_other_duties || "-" }}
              </div>
            </td>
          </tr>
        </table>

        <table border="0" width="100%" align="center">
          <tr>
            <td width="100%" colspan="2">
              <div class="regular16">
                ปัจจุบันปฏิบัติการสอนในสถาบันการอาชีวศึกษาหรือไม

                <v-icon
                  large
                  color="black"
                  v-if="transference_personnel_sps.tps_teach_stb === 'no_teach'"
                  >mdi-checkbox-marked-outline</v-icon
                >
                <v-icon large color="black" v-else
                  >mdi-checkbox-blank-outline</v-icon
                >
                ไม่ได้ทำการสอน
                <v-icon
                  large
                  color="black"
                  v-if="transference_personnel_sps.tps_teach_stb === 'teach'"
                  >mdi-checkbox-marked-outline</v-icon
                >
                <v-icon large color="black" v-else
                  >mdi-checkbox-blank-outline</v-icon
                >
                ทำการสอน
              </div>
            </td>
          </tr>
        </table>

        <table class="text_j" width="100%" align="center">
          <tr>
            <td width="100%" colspan="2">
              <div class="regular16">
                อยู่ระหว่างช่วยปฏิบัติราชการหรือไม่
                <v-icon
                  large
                  color="black"
                  v-if="
                    transference_personnel_sps.tps_service_status ===
                      'not_service'
                  "
                  >mdi-checkbox-marked-outline</v-icon
                >
                <v-icon large color="black" v-else
                  >mdi-checkbox-blank-outline</v-icon
                >

                ไม่อยู่

                <v-icon
                  large
                  color="black"
                  v-if="
                    transference_personnel_sps.tps_service_status ===
                      'gov_service'
                  "
                  >mdi-checkbox-marked-outline</v-icon
                >
                <v-icon large color="black" v-else
                  >mdi-checkbox-blank-outline</v-icon
                >
                ช่วยปฏิบัติราชการอยู่ที่
              </div>
            </td>
          </tr>
        </table>

        <table class="text_j" width="100%" align="center">
          <tr
            v-if="
              transference_personnel_sps.tps_service_status === 'gov_service'
            "
          >
            <td width="5%"></td>
            <td width="50%">
              <div class="regular16 td_line" align="center">
                {{ transference_personnel_sps.college_name_ser || "-" }}
              </div>
            </td>
            <td width="40%">
              <div class="regular16 td_line">
                เริ่มช่วยปฏิบัติราชการ คำสั่งที่
                {{ transference_personnel_sps.tps_ser_order || "-" }}
              </div>
            </td>
          </tr>
          <tr
            v-if="
              transference_personnel_sps.tps_service_status === 'gov_service'
            "
          >
            <td width="5%"></td>
            <td width="95%" colspan="2">
              <div class="regular16 td_line">
                เมื่อวันที่
                {{
                  transference_personnel_sps.tps_ser_date
                    | moment("add", "543 years")
                    | moment("D MMMM YYYY")
                }}
                ช่วยปฏิบัติราชการจนถึงปัจจุบันเป็นเวลา {{ get_gov_Age }}
              </div>
            </td>
          </tr>
          <tr
            v-if="
              transference_personnel_sps.tps_service_status === 'gov_service'
            "
          >
            <td width="5%"></td>
            <td width="95%" colspan="2">
              <div class="regular16 td_line">
                เหตุผลที่ช่วยปฏิบัติราชการ
                {{ transference_personnel_sps.tps_ser_reason_help || "-" }}
              </div>
            </td>
          </tr>
        </table>

        <table border="0" width="100%" align="center">
          <tr>
            <td width="100%" colspan="2">
              <div class="regular16">
                ขอย้ายไปปฏฺิบัติหน้าที่ในตำแหน่งและหน่วยงานแห่งใหม่
                เรียงลำดับดังนี้
              </div>
            </td>
          </tr>
        </table>

        <table
          class="text_j"
          border="0"
          width="100%"
          align="center"
          v-for="item in transference_locations"
          :key="item.id_tfl"
          small
        >
          <tr>
            <td width="5%"></td>
            <td width="15%">
              <div class="regular16">{{ item.sequence_n }}. ตำแหน่ง</div>
            </td>
            <td width="10%">
              <div class="regular16 td_line" align="center">ครู</div>
            </td>
            <td width="10%">
              <div class="regular16" align="center">สังกัด</div>
            </td>
            <td width="60%">
              <div class="regular16 td_line">{{ item.college_name }}</div>
            </td>
          </tr>
        </table>

        <table class="text_j" border="0" width="100%" align="center">
          <tr>
            <td width="5%"></td>
            <td width="50%" colspan="2">
              <div class="regular16">
                4. ขอย้ายสับเปลี่ยนตำแหน่งกับ (นาย/นาง/นางสาว)
              </div>
            </td>
            <td width="45%" colspan="2">
              <div class="regular16 td_line" align="center">
                {{ transference_personnel_sps_switch.title_s || ""
                }}{{ transference_personnel_sps_switch.frist_name || "" }}
                {{ transference_personnel_sps_switch.last_name || "" }}
              </div>
            </td>
          </tr>
        </table>

        <table class="text_j" border="0" width="100%" align="center">
          <tr>
            <td width="5%"></td>
            <td width="15%"><div class="regular16">ตำแหน่ง</div></td>
            <td width="30%">
              <div class="regular16 td_line" align="center">
                {{ transference_personnel_sps_switch.position_name || "-" }}
              </div>
            </td>
            <td width="15%"><div class="regular16">วิทยฐานะ</div></td>
            <td width="40%">
              <div class="regular16 td_line" align="center">
                {{ transference_personnel_sps_switch.rang_name || "-" }}
              </div>
            </td>
          </tr>
        </table>

        <table class="text_j" border="0" width="100%" align="center">
          <tr>
            <td width="5%"></td>
            <td width="15%"><div class="regular16">เลขที่ตำแหน่ง</div></td>
            <td width="20%">
              <div class="regular16 td_line" align="center">
                {{ transference_personnel_sps_switch.id_position || "-" }}
              </div>
            </td>
            <td width="20%"><div class="regular16">สังกัด (สถานศึกษา)</div></td>
            <td width="40%">
              <div class="regular16 td_line" align="center">
                {{ transference_personnel_sps_switch.college_name || "-" }}
              </div>
            </td>
          </tr>
        </table>

        <table border="0" width="100%" align="center">
          <tr>
            <td width="100%" colspan="2">
              <div class="regular16">
                <span class="bold16"
                  >เหตุผลการ <u class="bold18">ขอย้ายกรณีพิเศษ</u>
                </span>
              </div>
            </td>
          </tr>
        </table>

        <div>
          <v-row>
            <v-col cols="6">
              <table class="text_j" border="0" width="100%" align="center">
                <tr>
                  <td width="5%"><div class="regular16"></div></td>
                  <td width="15%">
                    <div class="regular16">
                      <v-icon
                        large
                        color="black"
                        v-if="transference_personnel_sps.tps_reason_1 === '1'"
                        >mdi-checkbox-marked-outline</v-icon
                      >
                      <v-icon large color="black" v-else
                        >mdi-checkbox-blank-outline</v-icon
                      >
                    </div>
                  </td>
                  <td width="80">
                    1.ติดตามคู่สมรส (ยื่นภายใน 1 ปี
                  </td>
                </tr>
                <tr>
                  <td width="5%"><div class="regular16"></div></td>
                  <td width="15%"><div class="regular16"></div></td>
                  <td width="80%" class="regular16">
                    นับแต่คู่สมรสได้รับคำสั่งย้ายไปปฏิบัติหน้าที่)
                  </td>
                </tr>
              </table>

              <table class="text_j" border="0" width="100%" align="center">
                <tr>
                  <td width="5%"><div class="regular16"></div></td>
                  <td width="15%">
                    <div class="regular16">
                      <v-icon
                        large
                        color="black"
                        v-if="transference_personnel_sps.tps_reason_2 === '1'"
                        >mdi-checkbox-marked-outline</v-icon
                      >
                      <v-icon large color="black" v-else
                        >mdi-checkbox-blank-outline</v-icon
                      >
                    </div>
                  </td>
                  <td width="80">2.เจ็บป่วยร้ายแรง ป่วยเป็นโรค</td>
                </tr>
                <tr>
                  <td width="5%"></td>
                  <td width="15%"></td>
                  <td width="80%">
                    <div class="regular16 td_line">
                      {{ transference_personnel_sps.tps_reason_2_detail }}
                    </div>
                  </td>
                </tr>
              </table>

              <table class="text_j" border="0" width="100%" align="center">
                <tr>
                  <td width="5%" colspan="2"><div class="regular16"></div></td>
                  <td width="15%" colspan="2">
                    <div class="regular16">
                      <v-icon
                        large
                        color="black"
                        v-if="transference_personnel_sps.tps_reason_3 === '1'"
                        >mdi-checkbox-marked-outline</v-icon
                      >
                      <v-icon large color="black" v-else
                        >mdi-checkbox-blank-outline</v-icon
                      >
                    </div>
                  </td>
                  <td width="80">3.ถูกคุกคามต่อชีวิต</td>
                </tr>
              </table>

              <table class="text_j" border="0" width="100%" align="center">
                <tr>
                  <td width="5%" colspan="2"><div class="regular16"></div></td>
                  <td width="15%" colspan="2">
                    <div class="regular16">
                      <v-icon
                        large
                        color="black"
                        v-if="transference_personnel_sps.tps_reason_4 === '1'"
                        >mdi-checkbox-marked-outline</v-icon
                      >
                      <v-icon large color="black" v-else
                        >mdi-checkbox-blank-outline</v-icon
                      >
                    </div>
                  </td>
                  <td width="80">4.ดูแลบิดา-มารดา หรือคู่สมรส</td>
                </tr>
                <tr>
                  <td width="5%" colspan="2"><div class="regular16"></div></td>
                  <td width="15%" colspan="2"></td>
                  <td width="80">ซึ่งเจ็บป่วยร้ายแรง / ป่วยเป็นโรค</td>
                </tr>
                <tr>
                  <td width="5%" colspan="2"><div class="regular16"></div></td>
                  <td width="15%" colspan="2"></td>
                  <td width="80">
                    <div class="regular16 td_line">
                      {{ transference_personnel_sps.tps_reason_4_detail }}
                    </div>
                  </td>
                </tr>
              </table>

              <table class="text_j" border="0" width="100%" align="center">
                <tr>
                  <td width="5%" colspan="2"><div class="regular16"></div></td>
                  <td width="15%" colspan="2">
                    <div class="regular16">
                      <v-icon
                        large
                        color="black"
                        v-if="transference_personnel_sps.tps_reason_5 === '1'"
                        >mdi-checkbox-marked-outline</v-icon
                      >
                      <v-icon large color="black" v-else
                        >mdi-checkbox-blank-outline</v-icon
                      >
                    </div>
                  </td>
                  <td width="80">5.เหตุผลอื่น</td>
                </tr>
                <tr>
                  <td width="5%" colspan="2"><div class="regular16"></div></td>
                  <td width="15%" colspan="2"></td>
                  <td width="80">
                    <div class="regular16 td_line">
                      {{ transference_personnel_sps.tps_reason_5_detail }}
                    </div>
                  </td>
                </tr>
              </table>
            </v-col>
            <v-col cols="6">
              <table class="text_j" width="100%" align="center">
                <tr>
                  <td width="5%" colspan="2"><div class="regular16"></div></td>
                  <td width="95%" colspan="2">
                    <div class="bold16">เอกสาร/หลักฐานประกอบการพิจารณา</div>
                  </td>
                </tr>
                <tr>
                  <td width="5%" colspan="2"><div class="regular16"></div></td>
                  <td width="95%" colspan="2">
                    <div class="regular16">
                      <v-icon
                        large
                        color="black"
                        v-if="
                          transference_personnel_sps.tps_evidence_info_1 === '1'
                        "
                        >mdi-checkbox-marked-outline</v-icon
                      >
                      <v-icon large color="black" v-else
                        >mdi-checkbox-blank-outline</v-icon
                      >

                      สำเนาคำสั่งย้ายของคู่สมรส
                    </div>
                  </td>
                </tr>
                <tr>
                  <td width="5%" colspan="2"><div class="regular16"></div></td>
                  <td width="95%" colspan="2">
                    <div class="regular16">
                      <v-icon
                        large
                        color="black"
                        v-if="
                          transference_personnel_sps.tps_evidence_info_2 === '1'
                        "
                        >mdi-checkbox-marked-outline</v-icon
                      >
                      <v-icon large color="black" v-else
                        >mdi-checkbox-blank-outline</v-icon
                      >

                      ทะเบียนสมรส
                    </div>
                  </td>
                </tr>
                <tr>
                  <td width="5%" colspan="2"><div class="regular16"></div></td>
                  <td width="95%" colspan="2">
                    <div class="regular16">
                      <v-icon
                        large
                        color="black"
                        v-if="
                          transference_personnel_sps.tps_evidence_info_3 === '1'
                        "
                        >mdi-checkbox-marked-outline</v-icon
                      >
                      <v-icon large color="black" v-else
                        >mdi-checkbox-blank-outline</v-icon
                      >

                      ใบรับรองแพทย์ (ของตนเอง)
                    </div>
                  </td>
                </tr>
                <tr>
                  <td width="5%" colspan="2"><div class="regular16"></div></td>
                  <td width="95%" colspan="2">
                    <div class="regular16">
                      <v-icon
                        large
                        color="black"
                        v-if="
                          transference_personnel_sps.tps_evidence_info_4 === '1'
                        "
                        >mdi-checkbox-marked-outline</v-icon
                      >
                      <v-icon large color="black" v-else
                        >mdi-checkbox-blank-outline</v-icon
                      >

                      ใบแจ้งความสถานีตำรวจ
                    </div>
                  </td>
                </tr>
                <tr>
                  <td width="5%" colspan="2"><div class="regular16"></div></td>
                  <td width="95%" colspan="2">
                    <div class="regular16">
                      <v-icon
                        large
                        color="black"
                        v-if="
                          transference_personnel_sps.tps_evidence_info_5 === '1'
                        "
                        >mdi-checkbox-marked-outline</v-icon
                      >
                      <v-icon large color="black" v-else
                        >mdi-checkbox-blank-outline</v-icon
                      >

                      หนังสือรับรองจากผู้บังคับบัญชา
                    </div>
                  </td>
                </tr>
                <tr>
                  <td width="5%" colspan="2"><div class="regular16"></div></td>
                  <td width="95%" colspan="2">
                    <div class="regular16">
                      <v-icon
                        large
                        color="black"
                        v-if="
                          transference_personnel_sps.tps_evidence_info_6 === '1'
                        "
                        >mdi-checkbox-marked-outline</v-icon
                      >
                      <v-icon large color="black" v-else
                        >mdi-checkbox-blank-outline</v-icon
                      >

                      ใบรับรองแพทย์ (บิดา-มารดา-คู่สมรส)
                    </div>
                  </td>
                </tr>
                <tr>
                  <td width="5%" colspan="2"><div class="regular16"></div></td>
                  <td width="95%" colspan="2">
                    <div class="regular16">
                      <v-icon
                        large
                        color="black"
                        v-if="
                          transference_personnel_sps.tps_evidence_info_7 === '1'
                        "
                        >mdi-checkbox-marked-outline</v-icon
                      >
                      <v-icon large color="black" v-else
                        >mdi-checkbox-blank-outline</v-icon
                      >

                      สำเนาทะเบียนบ้าน (บิดา-มารดา-คู่สมรส)
                    </div>
                  </td>
                </tr>
                <tr>
                  <td width="5%" colspan="2"><div class="regular16"></div></td>
                  <td width="95%" colspan="2">
                    <div class="regular16">
                      <v-icon
                        large
                        color="black"
                        v-if="
                          transference_personnel_sps.tps_evidence_info_8 === '1'
                        "
                        >mdi-checkbox-marked-outline</v-icon
                      >
                      <v-icon large color="black" v-else
                        >mdi-checkbox-blank-outline</v-icon
                      >

                      สำเนาทะเบียนบ้าน (ตนเอง)
                    </div>
                  </td>
                </tr>
                <tr>
                  <td width="5%" colspan="2"><div class="regular16"></div></td>
                  <td width="95%" colspan="2">
                    <div class="regular16">
                      <v-icon
                        large
                        color="black"
                        v-if="
                          transference_personnel_sps.tps_evidence_info_9 === '1'
                        "
                        >mdi-checkbox-marked-outline</v-icon
                      >
                      <v-icon large color="black" v-else
                        >mdi-checkbox-blank-outline</v-icon
                      >

                      สำเนา ก.พ.7 / ก.ค.ศ.16 ที่เป็นปัจจุบัน
                    </div>
                  </td>
                </tr>
                <tr>
                  <td width="5%" colspan="2"><div class="regular16"></div></td>
                  <td width="95%" colspan="2">
                    <div class="regular16">
                      <v-icon
                        large
                        color="black"
                        v-if="
                          transference_personnel_sps.tps_evidence_info_10 ===
                            '1'
                        "
                        >mdi-checkbox-marked-outline</v-icon
                      >
                      <v-icon large color="black" v-else
                        >mdi-checkbox-blank-outline</v-icon
                      >
                      หลักฐานอื่นๆ (ระบุ)
                    </div>
                  </td>
                </tr>
              </table>

              <table class="text_j" width="100%" align="center">
                <tr>
                  <td width="5%" colspan="2"><div class="regular16"></div></td>
                  <td width="15%" colspan="2"><div class="regular16"></div></td>
                  <td width="80%" colspan="2">
                    <div class="regular16 td_line">
                      {{
                        transference_personnel_sps.tps_evidence_info_10_detail
                      }}
                    </div>
                  </td>
                </tr>
              </table>
            </v-col>
          </v-row>
        </div>

        <table class="text_j" width="100%" align="center">
          <tr>
            <td width="40%" colspan="2">
              <div class="regular16">
                <span class="bold16"
                  >เบอร์โทรศัพท์ที่สามารถติดต่อได้โดยตรง</span
                >
              </div>
            </td>
            <td width="60%" colspan="2">
              <div class="regular16 td_line" align="center">
                {{ transference_personnel_sps.tel_p || "-" }}
              </div>
            </td>
          </tr>
        </table>

        <table class="text_j" border="0" width="100%" align="center">
          <tr>
            <td width="20%"></td>
            <td width="80%">
              <div class="regular16">
                <span>ขอรับรองว่าข้อความข้างต้นเป็นความจริงทุกประการ</span>
              </div>
              <br />
            </td>
          </tr>
        </table>

        <table class="text_j" width="100%" align="center">
          <tr>
            <td width="60%"></td>
            <td width="40%">
              <div class="regular16">
                <span class="regular16"
                  >ลงชื่อ....................................................................</span
                >
              </div>
            </td>
          </tr>
          <tr>
            <td width="60%"></td>
            <td width="40%" align="center">
              <div class="regular16">
                <span class="regular16"
                  >(
                  {{
                    transference_personnel_sps.title_s +
                      transference_personnel_sps.frist_name +
                      " " +
                      transference_personnel_sps.last_name
                  }}
                  )</span
                >
              </div>
            </td>
          </tr>
          <tr>
            <td width="60%"></td>
            <td width="40%" align="center">
              <div class="regular16">
                <span class="regular16"
                  >ตำแหน่ง {{ transference_personnel_sps.position_name }}</span
                >
              </div>
            </td>
          </tr>
        </table>

        <table class="text_j" border="0" width="100%" align="center">
          <tr>
            <td width="100%" colspan="2">
              <div class="regular16">
                <span class="bold16">
                  ความเห็นของผู้บริหารสถานศึกษา/ผู้อำนวยการสำนัก/ผู้อำนวยการศูนย์ฯ</span
                >
              </div>
            </td>
          </tr>
        </table>

        <table class="text_j" border="0" width="100%" align="center">
          <tr>
            <td width="10%"><div class="regular16"></div></td>
            <td width="50%" colspan="2">
              <div class="regular16">
                <v-icon large color="black">mdi-checkbox-blank-outline</v-icon>
                ให้ย้าย ขอรับย้ายหรือบรรจุ ผู้สำเร็จการศึกษา วุฒิ
              </div>
            </td>
            <td width="40%">
              <div class="regular16 td_line">
                <input type="text" name="" id="" disabled />
              </div>
            </td>
          </tr>
        </table>

        <table class="text_j" border="0" width="100%" align="center">
          <tr>
            <td width="10%"><div class="regular16"></div></td>
            <td width="20%" align="right">
              <div class="regular16">สาขาวิชา</div>
            </td>
            <td width="60%">
              <div class="regular16 td_line">
                <input type="text" name="" id="" disabled />
              </div>
            </td>
            <td width="10%"><div class="regular16">ทดแทน</div></td>
          </tr>
        </table>

        <table class="text_j" border="0" width="100%" align="center">
          <tr>
            <td width="10%"><div class="regular16"></div></td>
            <td width="30%" colspan="2">
              <div class="regular16">
                <v-icon large color="black">mdi-checkbox-blank-outline</v-icon>
                ไม่สมควรให้ย้ายเนื่องจาก
              </div>
            </td>
            <td width="60%">
              <div class="regular16 td_line">
                 <input type="text" name="" id="" disabled />
              </div>              
            </td>
          </tr>
        </table>
              <br />
        <table class="text_j" border="0" width="100%" align="center">
          <tr>
            <td width="60%"></td>
            <td width="40%">
              <div class="regular16">
                <span class="regular16"
                  >ลงชื่อ............................................................</span
                >
              </div>
            </td>
          </tr>
          <tr>
            <td width="60%"></td>
            <td width="40%" align="center">
              <div class="regular16">
                <span class="regular16"
                  >(..........................................................)</span
                >
              </div>
            </td>
          </tr>
          <tr>
            <td width="60%"></td>
            <td width="40%">
              <div class="regular16">
                <span class="regular16"
                  >ตำแหน่ง.................................................</span
                >
              </div>
            </td>
          </tr>
          <tr>
            <td width="60%"></td>
            <td width="40%">
              <div class="regular16">
                <span class="regular16"
                  >วันที่.............../...................../...................</span
                >
              </div>
            </td>
          </tr>
        </table>

        <table border="0" width="100%" align="center">
          <tr>
            <td width="100%" colspan="2">
              <div class="regular16">
                <span class="bold16"
                  >ความเห็นของผู้อำนวยการสถาบันการอาชีวศึกษา </span
                >(กรณีผู้ขอย้ายปฏิบัติการสอนในสถานศึกษาที่สังกัดสถาบัน
                การอาชีวศึกษา)
              </div>
            </td>
          </tr>
        </table>

        <table class="text_j" border="0" width="100%" align="center">
          <tr>
            <td width="10%"><div class="regular16"></div></td>
            <td width="85%">
              <div class="regular16">
                <v-icon large color="black">mdi-checkbox-blank-outline</v-icon>
                สมควรให้ย้าย
              </div>
            </td>
          </tr>
        </table>

        <table class="text_j" border="0" width="100%" align="center">
          <tr>
            <td width="10%"><div class="regular16"></div></td>
            <td width="35%">
              <div class="regular16">
                <v-icon large color="black">mdi-checkbox-blank-outline</v-icon>
                ไม่เห็นสมควรให้ย้าย เนื่องจาก
              </div>
            </td>
            <td width="50%">
              <div class="regular16 td_line">
                <input type="text" name="" id="" disabled />
              </div>
            </td>
          </tr>
        </table>

        <br />
        <table class="text_j" border="0" width="100%" align="center">
          <tr>
            <td width="60%"></td>
            <td width="40%">
              <div class="regular16">
                <span class="regular16"
                  >ลงชื่อ.............................................................</span
                >
              </div>
            </td>
          </tr>
          <tr>
            <td width="60%"></td>
            <td width="40%" align="center">
              <div class="regular16">
                <span class="regular16"
                  >(..........................................................)</span
                >
              </div>
            </td>
          </tr>
          <tr>
            <td width="60%"></td>
            <td width="40%">
              <div class="regular16">
                <span class="regular16"
                  >ตำแหน่ง.................................................</span
                >
              </div>
            </td>
          </tr>
          <tr>
            <td width="60%"></td>
            <td width="40%">
              <div class="regular16">
                <span class="regular16"
                  >วันที่.............../...................../...................</span
                >
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    ApiKey: "HRvec2021",
    transference_personnel_sps: [],
    transference_personnel_sps: [],
    personnel_educations: [],
    transference_locations: [],
    transference_personnel_sps_switch: [],
    province_sh_s: [],
    province_sh_fm: [],
    province_sh_m: [],
    valid: true
  }),

  async mounted() {
    await this.transference_personnel_spsQueryAll();
    await this.personnel_educationsQueryAll();
    await this.transference_locationsQueryAll();
    await this.transference_personnel_sps_switchQueryAll();
  },

  methods: {
    async transference_personnel_spsQueryAll() {
      this.loading = true;
      let result = await this.$http
        .post("transference_personnel_sp.php", {
          ApiKey: this.ApiKey,
          tps_id_ref: this.url_result
        })
        .finally(() => (this.loading = false));
      this.transference_personnel_sps = result.data;
      console.log(result.data);
    },

    async transference_personnel_sps_switchQueryAll() {
      this.loading = true;
      let result = await this.$http
        .post("personnel_temporary.php", {
          ApiKey: this.ApiKey,
          id_card: this.transference_personnel_sps.tps_switch_position
        })
        .finally(() => (this.loading = false));
      this.transference_personnel_sps_switch = result.data;
    },

    async personnel_educationsQueryAll() {
      let result = await this.$http.post("personnel_education.php", {
        ApiKey: this.ApiKey,
        id_card: this.transference_personnel_sps.tps_id_card
      });
      this.personnel_educations = result.data;
    },

    async transference_locationsQueryAll() {
      this.loading = true;
      let result = await this.$http
        .post("transference_location.php", {
          ApiKey: this.ApiKey,
          id_ref: this.url_result
        })
        .finally(() => (this.loading = false));
      this.transference_locations = result.data;
    },

    Export2Doc(element, filename) {
      var preHtml =
        "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
      var postHtml = "</body></html>";
      var html =
        preHtml + document.getElementById(element).innerHTML + postHtml;

      var blob = new Blob(["\ufeff", html], {
        type: "application/msword"
      });

      // Specify link url
      var url =
        "data:application/vnd.ms-word;charset=utf-8," +
        encodeURIComponent(html);

      // Specify file name
      filename = filename ? filename + ".doc" : "document.doc";

      // Create download link element
      var downloadLink = document.createElement("a");

      document.body.appendChild(downloadLink);

      if (navigator.msSaveOrOpenBlob) {
        navigator.msSaveOrOpenBlob(blob, filename);
      } else {
        // Create a link to the file
        downloadLink.href = url;

        // Setting the file name
        downloadLink.download = filename;

        //triggering the function
        downloadLink.click();
      }

      document.body.removeChild(downloadLink);
    }
  },
  computed: {
    url_result() {
      let result = window.location.href;
      let split_s = result.split("/");
      return split_s[6];
    },

    marital_status() {
      let marital_status = this.transference_personnel_sps.marital_status;
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

    date_today_cal() {
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, "0");
      let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      let yyyy = today.getFullYear();

      today = yyyy + "-" + mm + "-" + dd;
      return today;
    },

    get_gov_Age() {
      let today = new Date(this.date_today_cal);
      let DOB = new Date(this.transference_personnel_sps.tps_ser_date);
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
    }
  },
  props: {
    source: String
  }
};
</script>
<style>
@import url(
  https://fonts.googleapis.com/css?family=Prompt:400,
  300|Roboto:400,
  300&subset=latin,
  thai
);

body {
  font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
  font-size: 16px;
  font-weight: 250;
}

u {
  border-bottom: 1px dotted #000;
  text-decoration: none;
}

* {
  font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
}

.table,
.th,
.td {
  border-bottom: 0.5px solid black;
  border-top: 1px solid black;
  border-left: 1px solid black;
  border-right: 1px solid black;
  border-collapse: collapse;
}

.text_j {
  border-collapse: collapse;
  text-align: justify;
  text-justify: inter-word;
  line-height: 1;
}

tfoot tr:hover {
  background-color: initial;
}

tbody tr:hover {
  background-color: inherit;
}

td,
th {
  font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
}

tfoot td {
  font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
  font-weight: bold;
}

#verticaltext {
  writing-mode: tb-rl;
  filter: flipv fliph;
  -webkit-transform: rotate(-90deg);
  white-space: nowrap;
  display: block;
  overflow: hidden;
  padding: 0;
}

.page {
  font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
  font-size: 16pt;
  width: 21cm;
  min-height: 29.7cm;
  border: 1px #d3d3d3 solid;
  border-radius: 5px;
  background: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  margin-top: 0cm;
  margin-right: auto;
  margin-bottom: 0cm;
  margin-left: auto;
  padding-top: 1.5cm;
  padding-right: 1.5cm;
  padding-bottom: 1.75cm;
  padding-left: 2cm;
}

.head {
  font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
  font-size: 16pt;
  font-weight: bold;
  line-height: 1;
}

.regular12 {
  font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
  font-size: 14pt;
}

.regular16 {
  font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
  font-size: 16pt;
}

.bold16 {
  font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
  font-size: 16pt;
  font-weight: bold;
}

.blod12 {
  font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
  font-size: 14pt;
  font-weight: bold;
}

.blackRegula10 {
  font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
  font-size: 12pt;
}

.blackBold18 {
  font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
  font-size: 18pt;
  font-weight: bold;
}

.largerCheckbox {
  width: 30px;
  height: 30px;
  color: blue;
}
.td_line {
  border-bottom: 1pt dotted black;
}
/*.subpage {
    height: 247mm;
  }*/

.BlackBold10 {
  font-weight: bold;
}

#content {
  display: table;
}

#pageFooter {
  display: table-footer-group;
}

#pageFooter:after {
  counter-increment: page;
  content: counter(page);
}

@media print {
  .page {
    font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
    font-size: 16pt;
    border: initial;
    border-radius: initial;
    /* width: initial; */
    min-height: initial;
    box-shadow: initial;
    background: initial;
    padding: initial;
    page-break-after: always;
  }

  .head {
    font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
    font-size: 18pt;
    font-weight: bold;
  }

  .regular12 {
    font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
    font-size: 16pt;
  }

  .regular16 {
    font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
    font-size: 16pt;
  }

  .bold16 {
    font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
    font-size: 16pt;
    font-weight: bold;
  }

  .blod12 {
    font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
    font-size: 16pt;
    font-weight: bold;
  }

  .blackRegula10 {
    font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
    font-size: 14pt;
  }

  .blackBold18 {
    font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
    font-size: 18pt;
    font-weight: bold;
  }

  /* .head {
      font-size: 18px;
      font-weight: bold;
    }
    .regular12 {
      font-size: 12px;
    }
    .blod12 {
      font-size: 12px;
      font-weight: bold;
    }
    .blackRegula8 {
      font-size: 8px;
    } */
  .noprint {
    display: none;
  }
}
</style>
