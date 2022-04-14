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
          <v-img
            max-height="30mm"
            max-width="25mm"
            src="~../src/assets/images/ovec.png"
          ></v-img>
          <div class="head">
            แบบคำร้องขอย้ายของข้าราชการครูและบุคลากรทางการศึกษา
          </div>
          <div class="head">
            สายงานบริหารสถานศึกษา สำกัดสำนักงานคณะกรรมการการอาชีวศึกษา
          </div>
          <div class="head">
            ยื่นคำร้องขอย้าย 1-15 กรกฎาคม พ.ศ.
            {{ transference_manages.manage_year_s }}
          </div>
        </div>
        <table style="margin-top:5px" class="text_j" width="100%">
          <tr>
            <td width="50%"></td>
            <td width="7%"><div class="regular16">เขียนที่</div></td>
            <td width="45%">
              <div class="regular16 td_line">
                {{ transference_manages.college_name }}
              </div>
            </td>
          </tr>
        </table>

        <table class="text_j" width="100%">
          <tr>
            <td width="50%"></td>
            <td width="13%"><div class="regular16">วันที่ยื่นคำร้อง</div></td>
            <td width="39%">
              <div class="regular16 td_line">
                {{ transference_manages.manage_date_time }}
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
            <td width="35%">
              <div class="regular16 td_line" align="center">
                {{ transference_manages.name_personnel }}
              </div>
            </td>
            <td width="10%">
              <div align="center" class="regular16">ตำแหน่ง</div>
            </td>
            <td width="30%">
              <div class="regular16 td_line" align="center">
                {{ transference_manages.position_name }}
              </div>
            </td>
          </tr>
        </table>

        <table class="text_j" border="0" width="100%" align="center">
          <tr>
            <td width="12%">
              <div class="regular16">เลขที่ตำแหน่ง</div>
            </td>
            <td width="35%">
              <div class="regular16 td_line" align="center">
                {{ transference_manages.id_position }}
              </div>
            </td>
            <td width="10%">
              <div class="regular16">วิทยฐานะ</div>
            </td>
            <td width="35%">
              <div class="regular16 td_line" align="center">
                {{ transference_manages.rang_name }}
              </div>
            </td>
          </tr>
        </table>

        <table class="text_j" border="0" width="100%" align="center">
          <tr>
            <td width="18%"><div class="regular16">สังกัด (สถานศึกษา)</div></td>
            <td width="80%">
              <div class="regular16 td_line" align="left">
                {{ transference_manages.college_name }}
              </div>
            </td>
          </tr>
        </table>

        <table class="text_j" border="0" width="100%" align="center">
          <tr>
            <td width="16%">
              <div class="regular16">รับเงินเดือนอันดับ</div>
            </td>
            <td width="20%">
              <div class="regular16 td_line" align="center">
                ค.ศ. {{ transference_manages.rang_level }}
              </div>
            </td>
            <td width="5%">
              <div class="regular16" align="center">ขั้น</div>
            </td>
            <td width="20%">
              <div class="regular16 td_line" align="center">
                {{ transference_manages.salary_s }} บาท
              </div>
            </td>
            <td width="30%">
              <div class="regular16 td_line" align="center">
                ( ปีงบประมาณ {{ transference_manages.manage_year_s }} )
              </div>
            </td>
          </tr>
        </table>

        <table width="100%" align="center">
          <tr>
            <td colspan="4">
              <span class="bold16">ประวัติส่วนตัว</span>
            </td>
          </tr>
        </table>

        <table class="text_j" width="100%" align="center">
          <tr>
            <td width="11%">
              <div class="regular16">
                <span>1. เกิดวันที่</span>
              </div>
            </td>
            <td width="10%">
              <div class="regular16 td_line" align="center">
                {{ transference_manages.brith_day }}
              </div>
            </td>
            <td width="5%">
              <div class="regular16">
                <span>เดือน</span>
              </div>
            </td>
            <td width="20%">
              <div class="regular16 td_line" align="center">
                {{ date_appoin_ch }}
              </div>
            </td>
            <td width="4%">
              <div class="regular16">
                <span>พ.ศ.</span>
              </div>
            </td>
            <td width="10%">
              <div class="regular16 td_line" align="center">
                {{ transference_manages.brith_year }}
              </div>
            </td>
            <td width="12%">
              <div class="regular16" align="center">
                <span>ปัจจุบันอายุ</span>
              </div>
            </td>
            <td width="25%">
              <div class="regular16 td_line" align="center">
                {{ transference_manages.manage_year_age }}
              </div>
            </td>
          </tr>
        </table>

        <table class="text_j" width="100%" align="center">
          <tr>
            <td width="50%">
              <div class="regular16">
                <span>2.ประวัติการศึกษา</span>
              </div>
            </td>
          </tr>
        </table>

        <table class="table text_j" width="100%" align="center">
          <tr>
            <td width="5%" class="regular16 th" align="center">ที่</td>
            <td width="10%" class="regular16" align="center">คุณวุฒิ</td>
            <td width="35%" class="regular16 th" align="center">
              สาขา/วิชาเอก
            </td>
            <td width="45%" class="regular16" align="center">สถาบันการศึกษา</td>
          </tr>
        </table>

        <table
          class="table text_j"
          width="100%"
          align="center"
          v-for="(item, index) in personnel_educations"
          :key="item.id_red"
        >
          <tr>
            <td width="5%" class="regular16" align="center">{{ index + 1 }}</td>
            <td width="10%" class="regular16 th" align="center">
              {{ item.education_level }}
            </td>
            <td
              width="35%"
              class="regular16"
              style="padding: 2px"
              align="center"
            >
              {{ item.faculty_name }} {{ item.branch_name }}
            </td>
            <td
              width="45%"
              class="regular16 th"
              style="padding: 2px"
              align="left"
            >
              {{ item.academy_name }}
            </td>
          </tr>
        </table>

        <table class="text_j" width="100%" align="center">
          <tr>
            <td width="100%">
              <div class="regular16">
                <span>3.ความรู้ความสามารถในการพัฒนาสถานศึกษา</span>
              </div>
            </td>
          </tr>
          <tr>
            <td class="regular16 td_line">
              {{ transference_manages.manage_knowledge }}
            </td>
          </tr>
        </table>

        <table class="text_j" width="100%" align="center">
          <tr>
            <td width="100%">
              <div class="regular16">
                <span>4. ประสบการณ์</span>
              </div>
            </td>
          </tr>
          <tr>
            <td class="regular16 td_line">
              {{ transference_manages.manage_experience }}
            </td>
          </tr>
        </table>

        <table class="text_j" width="100%" align="center">
          <tr>
            <td width="10%">
              <div class="regular16">
                <span>5. คู่สมรสชื่อ</span>
              </div>
            </td>
            <td width="35%">
              <div class="regular16 td_line" align="center">
                {{ transference_manages.manage_spouse }}
              </div>
            </td>
            <td width="7%">
              <div class="regular16" align="center">
                <span>อาชีพ</span>
              </div>
            </td>
            <td width="30%">
              <div class="regular16 td_line" align="center">
                {{ transference_manages.manage_spouse_occupation }}
              </div>
            </td>
          </tr>
        </table>

        <table class="text_j" width="100%" align="center">
          <tr>
            <td width="8%">
              <div class="regular16">
                <span>ที่ทำงาน</span>
              </div>
            </td>
            <td width="80%">
              <div class="regular16 td_line" align="left">
                {{ transference_manages.manage_spouse_location }}
              </div>
            </td>
          </tr>
        </table>

        <table class="text_j" width="100%" align="center">
          <tr>
            <td width="20%">
              <div class="regular16">
                <span>ภูมิลำเนาของข้าพเจ้า จังหวัด</span>
              </div>
            </td>
            <td width="20%">
              <div class="regular16 td_line" align="center">
                {{ transference_manages.manage_domicile_name }}
              </div>
            </td>
            <td width="20%">
              <div class="regular16">
                <span>ภูมิลำเนาของคู่สมรส จังหวัด</span>
              </div>
            </td>
            <td width="20%">
              <div class="regular16 td_line" align="center">
                {{ transference_manages.manage_spouse_domicile_name }}
              </div>
            </td>
          </tr>
        </table>

        <table class="text_j" width="100%" align="center">
          <tr>
            <td width="20%">
              <div class="regular16">
                <span>6. ปัจจุบันอยู่บ้านเลขที่ </span>
              </div>
            </td>
            <td width="77%">
              <div class="regular16 td_line" align="left">
                {{ transference_manages.manage_address_now }}
              </div>
            </td>
          </tr>
        </table>

        <table class="text_j" width="100%" align="center">
          <tr>
            <td width="30%">
              <div class="regular16">
                <span>โทรศัพท์ที่สามารถติดต่อได้โดยตรง </span>
              </div>
            </td>
            <td width="25%">
              <div class="regular16 td_line" align="left">
                {{ transference_manages.tel_p }}
              </div>
            </td>
            <td width="7%">
              <div class="regular16">
                <span>E-mail </span>
              </div>
            </td>
            <td width="35%">
              <div class="regular16 td_line" align="left">
                {{ transference_manages.e_mail }}
              </div>
            </td>
          </tr>
        </table>

        <table width="100%" align="center">
          <tr>
            <td width="100%">
              <div class="bold16">
                <span> ประวัติการรับราชการ</span>
              </div>
            </td>
          </tr>
        </table>

        <table class="text_j" width="100%" align="center">
          <tr>
            <td width="100%">
              <div class="regular16">
                <span
                  >1. ประวัติรับราชการ (ให้ระบุตั้งแต่เริ่มรับราชการถึงปัจจุบัน
                  และระบุเฉพาะที่มีการเปลี่ยนตำแหน่ง หรือ)</span
                >
              </div>
            </td>
          </tr>
          <tr>
            <td width="100%">
              <div class="regular16">
                <span>เปลี่ยนสถานศึกษา )</span>
              </div>
            </td>
          </tr>
        </table>

        <table class="table" width="100%" align="center">
          <tr>
            <td width="5%" class="regular16 th" align="center">ที่</td>
            <td width="20%" class="regular16" align="center">วัน เดือน ปี</td>
            <td width="25%" class="regular16 th" align="center">
              ตำแหน่ง/ระดับ
            </td>
            <td width="40%" class="regular16" align="center">สังกัด</td>
            <td width="10%" class="regular16 th" align="center">หมายเหตุ</td>
          </tr>
        </table>

        <table
          class="table"
          width="100%"
          align="center"
          v-for="(item, index) in personnel_work_historys"
          :key="item.id_red"
        >
          <tr>
            <td width="5%" class="regular16" align="center">{{ index + 1 }}</td>
            <td width="20%" class="regular16 th" align="center">
              {{
                item.date_begin
                  | moment("add", "543 years")
                  | moment("D MMMM YYYY")
              }}
            </td>
            <td
              width="25%"
              class="regular16"
              style="padding: 2px"
              align="center"
            >
              {{ item.position_s }}
            </td>
            <td
              width="40%"
              class="regular16 th"
              style="padding: 2px"
              align="left"
            >
              {{ item.college_name_work }}
            </td>
            <td
              width="10%"
              class="regular16 th"
              style="padding: 2px"
              align="left"
            ></td>
          </tr>
        </table>

        <table class="text_j" width="100%" align="center">
          <tr>
            <td width="60%" colspan="2">
              <div class="regular16">
                <span>2. อยู่ระหว่างลาศึกษาต่อหรือไม่ </span>

                <v-icon
                  large
                  color="black"
                  v-if="
                    transference_manages.manage_on_study_leave === 'no_leave'
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
                  v-if="transference_manages.manage_on_study_leave === 'leave'"
                  >mdi-checkbox-marked-outline</v-icon
                >
                <v-icon large color="black" v-else
                  >mdi-checkbox-blank-outline</v-icon
                >

                อยู่ระหว่างลาศึกษาต่อที่
              </div>
            </td>
            <td width="30%">
              <div class="regular16 td_line" align="center">
                {{ transference_manages.manage_study_leave_location }}
              </div>
            </td>
          </tr>
        </table>

        <table class="text_j" width="100%" align="center">
          <tr>
            <td width="27%">
              <div class="regular16">
                <span>เคยลาศึกษาต่อ (ครั้งล่าสุด ) ระดับ </span>
              </div>
            </td>
            <td width="25%">
              <div class="regular16 td_line" align="center">
                {{ transference_manages.manage_study_leave_level }}
              </div>
            </td>
            <td width="10%">
              <div class="regular16" align="center">
                <span>สถานศึกษา </span>
              </div>
            </td>
            <td width="25%">
              <div class="regular16 td_line" align="center">
                {{ transference_manages.manage_study_leave_college_name }}
              </div>
            </td>
          </tr>
        </table>

        <table class="text_j" width="100%" align="center">
          <tr>
            <td width="10%">
              <div class="regular16">
                <span>ตั้งแต่วันที่ </span>
              </div>
            </td>
            <td width="35%">
              <div class="regular16 td_line" align="left">
                {{
                  transference_manages.manage_study_leave_start
                    | moment("add", "543 years")
                    | moment("D MMMM YYYY")
                }}
              </div>
            </td>
            <td width="10%">
              <div class="regular16" align="center">
                <span>ถึงวันที่ </span>
              </div>
            </td>
            <td width="35%">
              <div class="regular16 td_line" align="left">
                {{
                  transference_manages.manage_study_leave_end
                    | moment("add", "543 years")
                    | moment("D MMMM YYYY")
                }}
              </div>
            </td>
          </tr>
        </table>

        <table class="text_j" width="100%" align="center">
          <tr>
            <td width="25%">
              <div class="regular16">
                <span>3. รวมเวลารับราชการทั้งหมด </span>
              </div>
            </td>
            <td width="70%">
              <div class="regular16 td_line" align="left">
                {{ transference_manages.manage_age_time }}
              </div>
            </td>
          </tr>
        </table>

        <table width="100%" align="center">
          <tr>
            <td width="100%">
              <div class="bold16">
                <span>ข้อมูลอื่น ๆ </span>
              </div>
            </td>
          </tr>
        </table>

        <table class="text_j" width="100%" align="center">
          <tr>
            <td width="100%">
              <div class="regular16">
                <span>1.ผลการปฏิบัติงาน (ระบุ)</span>
              </div>
            </td>
          </tr>
          <tr>
            <td width="100%">
              <div class="regular16 td_line">
                <span>{{ transference_manages.manage_performance }}</span>
              </div>
            </td>
          </tr>
        </table>

        <table class="text_j" width="100%" align="center">
          <tr>
            <td width="100%">
              <div class="regular16">
                <span>2.การรักษาวินัยและจรรยาบรรณ</span>
              </div>
            </td>
          </tr>
        </table>

        <table class="text_j" width="100%" align="center">
          <tr>
            <td width="25%">
              <div class="regular16">
                <span>เคยถูกลงโทษทางวินัยหรือไม่ </span>
              </div>
            </td>
            <td width="10%">
              <div align="center">
                <v-icon
                  large
                  color="black"
                  v-if="
                    transference_manages.manage_disciplinary === 'no_discip'
                  "
                  >mdi-checkbox-marked-outline</v-icon
                >
                <v-icon large color="black" v-else
                  >mdi-checkbox-blank-outline</v-icon
                >
              </div>
            </td>
            <td width="70%">
              <div class="regular16">
                <span>ไม่เคยถูกลงโทษทางวินัย </span>
              </div>
            </td>
          </tr>
          <tr>
            <td width="25%">
              <div class="regular16"></div>
            </td>
            <td width="10%">
              <div align="center">
                <v-icon
                  large
                  color="black"
                  v-if="transference_manages.manage_disciplinary === 'discip'"
                  >mdi-checkbox-marked-outline</v-icon
                >
                <v-icon large color="black" v-else
                  >mdi-checkbox-blank-outline</v-icon
                >
              </div>
            </td>
            <td width="70%">
              <div class="regular16">
                <span>เคยถูกลงโทษทางวินัย </span>
                <span>
                  <v-icon
                    color="black"
                    v-if="transference_manages.manage_disciplinary_1 === '1'"
                    >mdi-checkbox-marked-circle-outline</v-icon
                  >
                  <v-icon color="black" v-else
                    >mdi-checkbox-blank-circle-outline</v-icon
                  >ภาคทัณฑ์
                </span>

                <span>
                  <v-icon
                    color="black"
                    v-if="transference_manages.manage_disciplinary_2 === '1'"
                    >mdi-checkbox-marked-circle-outline</v-icon
                  >
                  <v-icon color="black" v-else
                    >mdi-checkbox-blank-circle-outline</v-icon
                  >ตัดเงินเดือน
                </span>

                <span>
                  <v-icon
                    color="black"
                    v-if="transference_manages.manage_disciplinary_3 === '1'"
                    >mdi-checkbox-marked-circle-outline</v-icon
                  >
                  <v-icon color="black" v-else
                    >mdi-checkbox-blank-circle-outline</v-icon
                  >ลดเงินเดือน
                </span>
              </div>
            </td>
          </tr>
        </table>

        <table class="text_j" width="100%" align="center">
          <tr>
            <td width="25%">
              <div class="regular16">
                <span
                  >เคยถูกพิจารณาเกี่ยวกับการประกอบวิชาชีพครู/ผู้บริหารสถานศึกษาหรือไม่
                </span>
              </div>
            </td>
          </tr>
        </table>

        <table class="text_j" width="100%" align="center">
          <tr>
            <td width="25%">
              <div class="regular16"></div>
            </td>
            <td width="10%">
              <div align="center">
                <v-icon
                  large
                  color="black"
                  v-if="transference_manages.manage_license === 'no_license'"
                  >mdi-checkbox-marked-outline</v-icon
                >
                <v-icon large color="black" v-else
                  >mdi-checkbox-blank-outline</v-icon
                >
              </div>
            </td>
            <td width="70%">
              <div class="regular16">
                <span>ไม่เคย </span>
              </div>
            </td>
          </tr>
          <tr>
            <td width="25%">
              <div class="regular16"></div>
            </td>
            <td width="10%">
              <div align="center">
                <v-icon
                  large
                  color="black"
                  v-if="transference_manages.manage_license === 'license'"
                  >mdi-checkbox-marked-outline</v-icon
                >
                <v-icon large color="black" v-else
                  >mdi-checkbox-blank-outline</v-icon
                >
              </div>
            </td>
            <td width="70%">
              <div class="regular16">
                <span>เคย </span>
                <span>
                  <v-icon
                    color="black"
                    v-if="transference_manages.manage_license_1 === '1'"
                    >mdi-checkbox-marked-circle-outline</v-icon
                  >
                  <v-icon color="black" v-else
                    >mdi-checkbox-blank-circle-outline</v-icon
                  >ตักเตือน
                </span>

                <span>
                  <v-icon
                    color="black"
                    v-if="transference_manages.manage_license_2 === '1'"
                    >mdi-checkbox-marked-circle-outline</v-icon
                  >
                  <v-icon color="black" v-else
                    >mdi-checkbox-blank-circle-outline</v-icon
                  >ภาคทัณฑ์
                </span>
                <span>
                  <v-icon
                    color="black"
                    v-if="transference_manages.manage_license_3 === '1'"
                    >mdi-checkbox-marked-circle-outline</v-icon
                  >
                  <v-icon color="black" v-else
                    >mdi-checkbox-blank-circle-outline</v-icon
                  >พักใช้ใบอนุญาต
                </span>
                <span>
                  <v-icon
                    color="black"
                    v-if="transference_manages.manage_license_3 === '1'"
                    >mdi-checkbox-marked-circle-outline</v-icon
                  >
                  <v-icon color="black" v-else
                    >mdi-checkbox-blank-circle-outline</v-icon
                  >เพิกถอนใบอนุญาต
                </span>
              </div>
            </td>
          </tr>
        </table>

        <table class="text_j" width="100%" align="center">
          <tr>
            <td width="100%">
              <div class="regular16">
                <span>3. ปริมาณงานหน่วยงานการศึกษาปัจจุบัน</span>
              </div>
            </td>
          </tr>
        </table>

        <table class="text_j" width="100%" align="center">
          <tr>
            <td width="15%">
              <div class="regular16">
                <span>จำนวนบุคลากร</span>
              </div>
            </td>
            <td width="40%">
              <div class="regular16 td_line" align="center">
                <span>{{ transference_manages.manage_personnel }} คน</span>
              </div>
            </td>
            <td width="15%">
              <div class="regular16">
                <span>จำนวนห้องเรียน</span>
              </div>
            </td>
            <td width="40%">
              <div class="regular16 td_line" align="center">
                <span>{{ transference_manages.manage_classroom }} ห้อง</span>
              </div>
            </td>
          </tr>
        </table>

        <table class="text_j" width="100%" align="center">
          <tr>
            <td width="15%">
              <div class="regular16">
                <span>จำนวนนักเรียนรวม</span>
              </div>
            </td>
            <td width="15%">
              <div class="regular16 td_line" align="center">
                <span>{{ transference_manages.manage_std_all }} คน</span>
              </div>
            </td>
            <td width="5%">
              <div class="regular16">
                <span>( ปวช.</span>
              </div>
            </td>
            <td width="15%">
              <div class="regular16 td_line" align="center">
                <span>{{ transference_manages.manage_std_vc }} คน</span>
              </div>
            </td>
            <td width="5%">
              <div class="regular16">
                <span>ปวส.</span>
              </div>
            </td>
            <td width="15%">
              <div class="regular16 td_line" align="center">
                <span>{{ transference_manages.manage_std_hvc }} คน</span>
              </div>
            </td>
            <td width="8%">
              <div class="regular16">
                <span>ระยะสั้น</span>
              </div>
            </td>
            <td width="10%">
              <div class="regular16 td_line" align="center">
                <span>{{ transference_manages.manage_std_sc }} คน )</span>
              </div>
            </td>
          </tr>
        </table>

        <table class="text_j" width="100%" align="center">
          <tr>
            <td width="25%">
              <div class="regular16">
                <span>4. ปัจจุบันช่วยปฏิบัติราชการที่ </span>
              </div>
            </td>
            <td width="60%">
              <div class="regular16 td_line" align="left">
                <span>{{ transference_manages.college_name_service }}</span>
              </div>
            </td>
          </tr>
        </table>

        <table class="text_j" width="100%" align="center">
          <tr>
            <td width="10%">
              <div class="regular16">
                <span>ตั้งแต่วันที่ </span>
              </div>
            </td>
            <td width="95%">
              <div class="regular16 td_line" align="left">
                <span>{{
                  transference_manages.manage_service_datetime
                    | moment("add", "543 years")
                    | moment("D MMMM YYYY")
                }}</span>
              </div>
            </td>
          </tr>
        </table>

        <table width="100%" align="center">
          <tr>
            <td width="28%">
              <div class="bold16">
                <span>ขอย้ายกรณี </span>
              </div>
            </td>
            <td width="15%">
              <div class="bold16">
                <span>
                  <v-icon
                    large
                    color="black"
                    v-if="transference_manages.manage_case_move === 'normal'"
                    >mdi-checkbox-marked-outline</v-icon
                  >
                  <v-icon large color="black" v-else
                    >mdi-checkbox-blank-outline</v-icon
                  >
                  ปกติ
                </span>
              </div>
            </td>
            <td width="15%">
              <div class="bold16">
                <span>
                  <v-icon
                    large
                    color="black"
                    v-if="transference_manages.manage_case_move === 'special'"
                    >mdi-checkbox-marked-outline</v-icon
                  >
                  <v-icon large color="black" v-else
                    >mdi-checkbox-blank-outline</v-icon
                  >

                  พิเศษ
                </span>
              </div>
            </td>
            <td width="5%">
              <div class="bold16">
                <span>กรณี </span>
              </div>
            </td>
            <td width="40%">
              <div class="regular16 td_line" align="center">
                <span>{{ transference_manages.manage_case_detail }} </span>
              </div>
            </td>
          </tr>
        </table>

        <table class="text_j" width="100%" align="center">
          <tr>
            <td width="100%">
              <div class="bold16">
                <span>ข้าพเจ้ามีความประสงค์ขอย้ายไปดำรงตำแหน่งที่ </span>
              </div>
            </td>
          </tr>
          <tr>
            <td width="100%">
              <div class="regular16">
                <span>1.สถานศึกษา </span>
              </div>
            </td>
          </tr>
        </table>

        <table
          class="text_j"
          border="0"
          width="100%"
          align="center"
          v-for="(item, index) in transference_manage_locations"
          :key="item.id_red"
          style="margin-bottom:5px"
        >
          <tr>
            <td width="15%"></td>
            <td width="12%">
              <div class="regular16">( {{ index + 1 }} ) ตำแหน่ง</div>
            </td>
            <td width="20%">
              <div class="regular16 td_line" align="center">
                {{ item.manage_location_position }}
              </div>
            </td>
            <td width="8%">
              <div class="regular16" align="center">สังกัด</div>
            </td>
            <td width="60%">
              <div class="regular16 td_line">{{ item.college_name }}</div>
            </td>
          </tr>
        </table>

        <table class="text_j" width="100%" align="center">
          <tr>
            <td width="10%">
              <div class="regular16">
                <span>2.ถ้าไม่ได้ตามระบุ </span>
              </div>
            </td>
            <td width="15%">
              <div class="regular16">
                <span>
                  <v-icon
                    large
                    color="black"
                    v-if="transference_manages.manage_move_if === 'suspend'"
                    >mdi-checkbox-marked-outline</v-icon
                  >
                  <v-icon large color="black" v-else
                    >mdi-checkbox-blank-outline</v-icon
                  >
                  (1) ขอระงับการย้าย
                </span>
              </div>
            </td>
            <td width="22%">
              <div class="regular16">
                <span>
                  <v-icon
                    large
                    color="black"
                    v-if="transference_manages.manage_move_if === 'another'"
                    >mdi-checkbox-marked-outline</v-icon
                  >
                  <v-icon large color="black" v-else
                    >mdi-checkbox-blank-outline</v-icon
                  >
                  (2) หน่วยงานการศึกษาใดก็ได้ใน
                </span>
              </div>
            </td>
            <td width="18%">
              <div class="regular16 td_line" align="center">
                <span> อศจ.{{ transference_manages.province_name_if }} </span>
              </div>
            </td>
          </tr>
        </table>

        <table class="text_j" width="100%" align="center">
          <tr>
            <td width="100%">
              <div class="regular16">
                <span
                  >**กรณีที่ได้รับการพิจารณาให้ย้ายตามข้อ 1. และข้อ 2. (2) แล้ว
                  จะไม่ขอระงับหรือเปลี่ยนแปลงไม่ว่ากรณีใดๆ ทั้งสิ้น
                </span>
              </div>
            </td>
          </tr>
        </table>

        <table border="0" width="100%" align="center">
          <tr>
            <td width="100%" colspan="2">
              <div class="regular16">
                <span class="bold16">ขอย้ายสับเปลี่ยนกับ (กรณีสับเปลี่ยน)</span>
              </div>
            </td>
          </tr>
        </table>

        <table class="text_j" border="0" width="100%" align="center">
          <tr>
            <td width="15%" colspan="2">
              <div class="regular16">
                นาย/นาง/นางสาว
              </div>
            </td>
            <td width="40%" colspan="2">
              <div class="regular16 td_line" align="center">
                {{ personnel_temporarys_switch.frist_names }}
              </div>
            </td>
            <td width="10%" colspan="2">
              <div class="regular16" align="center">
                ตำแหน่ง
              </div>
            </td>
            <td width="25%" colspan="2" align="center">
              <div class="regular16 td_line">
                {{ personnel_temporarys_switch.position_name }}
              </div>
            </td>
          </tr>
        </table>

        <table class="text_j" border="0" width="100%" align="center">
          <tr>
            <td width="10%" colspan="2">
              <div class="regular16">
                ตำแหน่งเลขที่
              </div>
            </td>
            <td width="15%" colspan="2">
              <div class="regular16 td_line" align="center">
                {{ personnel_temporarys_switch.id_position }}
              </div>
            </td>
            <td width="5%" colspan="2" >
              <div class="regular16" align="center">
                อันดับ
              </div>
            </td>
            <td width="15%" colspan="2">
              <div class="regular16 td_line" align="center">
                 {{ personnel_temporarys_switch.rang_name }}
              </div>
            </td>
            <td width="5%" colspan="2">
              <div class="regular16" align="center">
                ขั้น
              </div>
            </td>
            <td width="25%" colspan="2">
              <div class="regular16 td_line" align="center">
                {{ personnel_temporarys_switch.salary_s }}
              </div>
            </td>
            <td width="5%" colspan="2">
              <div class="regular16" align="right">
                บาท
              </div>
            </td>
          </tr>
        </table>

        <table class="text_j" border="0" width="100%" align="center">
          <tr>
            <td width="10%"><div class="regular16">สถานศึกษา</div></td>
            <td width="75%">
              <div class="regular16 td_line">
                {{ personnel_temporarys_switch.college_name }}
              </div>
            </td>
          </tr>
        </table>

        <table width="100%" align="center">
          <tr>
            <td width="95%" colspan="2">
              <div class="bold16">หลักฐานประกอบการพิจารณา</div>
            </td>
          </tr>
        </table>

        <table class="text_j" border="0" width="100%" align="center">
          <tr>
            <td width="10%" colspan="2"><div class="regular16"></div></td>
            <td width="35%" colspan="2">
              <div class="regular16">
                <v-icon
                  
                  color="black"
                  v-if="
                    transference_manages.manage_evidence_info_1 === '1'
                  "
                  >mdi-checkbox-marked-outline</v-icon
                >
                <v-icon  color="black" v-else
                  >mdi-checkbox-blank-outline</v-icon
                >               
                สำเนา กพ.7 หรือ ก.ค.ศ.16
              </div>
            </td>
            <td width="10%" colspan="2"><div class="regular16"></div></td>
            <td width="40%" colspan="2">
              <div class="regular16">
                <v-icon
                  
                  color="black"
                  v-if="
                    transference_manages.manage_evidence_info_2 === '1'
                  "
                  >mdi-checkbox-marked-outline</v-icon
                >
                <v-icon  color="black" v-else
                  >mdi-checkbox-blank-outline</v-icon
                >           
                สำเนาทะเบียนบ้าน
              </div>
            </td>
          </tr>
          <tr>
            <td width="10%" colspan="2"><div class="regular16"></div></td>
            <td width="35%" colspan="2">
              <div class="regular16">
                 <v-icon
                  
                  color="black"
                  v-if="
                    transference_manages.manage_evidence_info_3 === '1'
                  "
                  >mdi-checkbox-marked-outline</v-icon
                >
                <v-icon  color="black" v-else
                  >mdi-checkbox-blank-outline</v-icon
                >           
                สำเนาใบสำคัญการสมรส
              </div>
            </td>
            <td width="10%" colspan="2"><div class="regular16"></div></td>
            <td width="35%" colspan="2">
              <div class="regular16">
                <v-icon
                  
                  color="black"
                  v-if="
                    transference_manages.manage_evidence_info_4 === '1'
                  "
                  >mdi-checkbox-marked-outline</v-icon
                >
                <v-icon  color="black" v-else
                  >mdi-checkbox-blank-outline</v-icon
                >           
                ใบรับรองแพทย์
              </div>
            </td>
          </tr>
          <tr>
            <td width="10%" colspan="2"><div class="regular16"></div></td>
            <td width="35%" colspan="2">
              <div class="regular16">
                 <v-icon
                  
                  color="black"
                  v-if="
                    transference_manages.manage_evidence_info_5 === '1'
                  "
                  >mdi-checkbox-marked-outline</v-icon
                >
                <v-icon  color="black" v-else
                  >mdi-checkbox-blank-outline</v-icon
                >           
                บันทึกประจำวัน ตำรวจ/ฝ่ายปกครอง
              </div>
            </td>
            <td width="10%" colspan="2"><div class="regular16"></div></td>
            <td width="40%" colspan="2">
              <div class="regular16">
                 <v-icon
                  
                  color="black"
                  v-if="
                    transference_manages.manage_evidence_info_6 === '1'
                  "
                  >mdi-checkbox-marked-outline</v-icon
                >
                <v-icon  color="black" v-else
                  >mdi-checkbox-blank-outline</v-icon
                >           
                บันทึกข้อตกลงของผู้ขอย้ายสับเปลี่ยนทุกคน
              </div>
            </td>
          </tr>
          <tr>
            <td width="10%" colspan="2"><div class="regular16"></div></td>
            <td width="35%" colspan="2">
              <div class="regular16">
                <v-icon
                  
                  color="black"
                  v-if="
                    transference_manages.manage_evidence_info_7 === '1'
                  "
                  >mdi-checkbox-marked-outline</v-icon
                >
                <v-icon  color="black" v-else
                  >mdi-checkbox-blank-outline</v-icon
                >           
                วิสัยทัศน์ในการบริหารจัดการศึกษา
              </div>
            </td>
            <td width="10%" colspan="2"><div class="regular16"></div></td>
            <td width="40%" colspan="2">
              <div class="regular16 td_line">
                <v-icon
                  
                  color="black"
                  v-if="
                    transference_manages.manage_evidence_info_8 === '1'
                  "
                  >mdi-checkbox-marked-outline</v-icon
                >
                <v-icon  color="black" v-else
                  >mdi-checkbox-blank-outline</v-icon
                >           
                อื่นๆ (ระบุ) {{ transference_manages.manage_evidence_info_8_detail }}
              </div>
            </td>
          </tr>
        </table>

        <table class="text_j" width="100%" align="center">
          <tr>
            <td width="100%" colspan="2">
              <div class="regular16">
                <span>เหตุผลการขอย้าย</span>
              </div>
            </td>
          </tr>
          <tr>
            <td width="100%" colspan="2">
              <div class="regular16 td_line">
                {{ transference_manages.manage_reason_detail }}
              </div>
            </td>
          </tr>
        </table>

        <table border="0" width="100%" align="center">
          <tr>
            <td width="20%"></td>
            <td width="80%">
              <div class="regular16">
                <span class="regular16"
                  >ข้าพเจ้าขอรับรองว่าข้อความและเอกสารหลักฐานที่ยื่นไว้นี้ถูกต้องและเป็นความจริงทุกประการ</span
                >
              </div>
            </td>
          </tr>
        </table>

        <table class="text_j" width="100%" align="center">
          <tr>
            <td width="60%"></td>
            <td width="40%">
              <div class="regular16" align="center">
                <span>ขอแสดงความนับถือ</span>
              </div>
            </td>
          </tr>
          <tr>
            <td width="60%"></td>
            <td width="40%">
              <div class="regular16">
                <span class="regular16"><br /></span>
              </div>
            </td>
          </tr>
          <tr>
            <td width="60%"></td>
            <td width="40%">
              <div class="regular16">
                <span class="regular16"
                  >ลงชื่อ...............................................ผู้ขอย้าย</span
                >
              </div>
            </td>
          </tr>
          <tr>
            <td width="60%"></td>
            <td width="40%" align="center">
              <div class="regular16">
                <span class="regular16">( {{ transference_manages.name_personnel }} )</span>
              </div>
            </td>
          </tr>
          <tr>
            <td width="60%"></td>
            <td width="40%" align="center">
              <div class="regular16">
                <span class="regular16">ตำแหน่ง{{ transference_manages.position_name }} </span>
              </div>
            </td>
          </tr>
          <tr>
            <td width="60%"></td>
            <td width="40%" align="center">
              <div class="regular16">
                <span class="regular16">วันที่ {{ transference_manages.manage_date_time }}</span>
              </div>
            </td>
          </tr>
        </table>

        <table class="text_j" border="0" width="100%" align="center">
          <tr>
            <td width="100%" colspan="2">
              <div class="regular16">
                <span>ความเห็นของผู้บังคับบัญชา</span>
              </div>
            </td>
          </tr>
        </table>

        <table class="text_j" border="0" width="100%" align="center">
          <tr>
            <td width="100%">
              <div class="regular16 td_line"><br /></div>
            </td>
          </tr>
          <tr>
            <td width="100%">
              <div class="regular16 td_line"><br /></div>
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
                  >ลงชื่อ.............................................ผู้บังคับบัญชา</span
                >
              </div>
            </td>
          </tr>
          <tr>
            <td width="60%"></td>
            <td width="40%" align="center">
              <div class="regular16">
                <span class="regular16"
                  >(................................................)</span
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

        <table class="table text_j" width="100%" align="center">
          <tr>
            <td
              colspan="2"
              width="5%"
              style="padding:5px"
              class="regular12 blod12"
            >
              <u>หมายเหตุ</u>
            </td>
          </tr>
          <tr>
            <td colspan="2" width="5%" style="padding:5px" class="regular12">
              (1)
              <span class="blod12">
                <u
                  >กรณีผู้ยื่นย้ายดำรงตำแหน่งผู้อำนวยการสถานศึกษา
                  ที่มิได้สังกัดสถาบันการอาชีวศึกษา</u
                >
              </span>
              ให้ประธานกรรมการอาชีวศึกษาจังหวัด
            </td>
          </tr>
          <tr>
            <td width="3%"></td>
            <td width="95%" class="regular12">
              เป็นผู้ให้ความเห็นของผู้บังคับบัญชา
            </td>
          </tr>
          <tr>
            <td colspan="2" width="5%" style="padding:5px" class="regular12">
              (2)
              <span class="blod12">
                <u
                  >กรณีผู้ยื่นย้ายดำรงตำแหน่งผู้อำนวยการสถานศึกษา
                  ที่สังกัดสถาบันการอาชีวศึกษา</u
                >
              </span>
              ให้ผู้อำนวยการสถาบันการอาชีวศึกษา
            </td>
          </tr>
          <tr>
            <td width="3%"></td>
            <td width="95%" class="regular12">
              เป็นผู้ให้ความเห็นของผู้บังคับบัญชา
            </td>
          </tr>
          <tr>
            <td colspan="2" width="5%" style="padding:5px" class="regular12">
              (3)
              <span class="blod12">
                <u> กรณีผู้ยื่นย้ายดำรงตำแหน่งรองผู้อำนวยการสถานศึกษา</u>
              </span>
              ให้ผู้อำนวยการสถานศึกษา เป็นผู้ให้ความเห็นของผู้บังคับบัญชา
            </td>
          </tr>
          <tr>
            <td width="3%"></td>
            <td width="95%" class="regular12"></td>
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
    personnel_temporarys: [],
    transference_manages: [],
    personnel_educations: [],
    personnel_work_historys: [],
    transference_manage_locations: [],
    personnel_temporarys_switch: [],
    province_sh_s: [],
    province_sh_fm: [],
    province_sh_m: [],

    valid: true,
    loginuser: JSON.parse(sessionStorage.getItem("user")) || 0,
    user: {}
  }),

  async mounted() {
    await this.transference_managesQueryAll();
    await this.personnel_educationsQueryAll();
    await this.personnel_work_historyQueryAll();
    await this.transference_manage_locationsQueryAll();
    await this.personnel_temporarys_switchQueryAll();
  },

  methods: {
    async transference_managesQueryAll() {
      this.loading = true;
      let result = await this.$http
        .post("transference_manage.php", {
          ApiKey: this.ApiKey,
          manage_id_ref: this.manage_id_ref
        })
        .finally(() => (this.loading = false));
      this.transference_manages = result.data;
    },
    async personnel_educationsQueryAll() {
      let result = await this.$http.post("personnel_education.php", {
        ApiKey: this.ApiKey,
        id_card: this.transference_manages.manage_id_card
      });
      this.personnel_educations = result.data;
    },

    async personnel_work_historyQueryAll() {
      let result = await this.$http.post("personnel_work_history.php", {
        ApiKey: this.ApiKey,
        id_card: this.transference_manages.manage_id_card
      });
      this.personnel_work_historys = result.data;
    },

    async personnel_temporarys_switchQueryAll() {
      this.loading = true;
      let result = await this.$http
        .post("personnel_temporary.php", {
          ApiKey: this.ApiKey,
          id_card: this.transference_manages.manage_switch_position
        })
        .finally(() => (this.loading = false));
      this.personnel_temporarys_switch = result.data;
      console.log(result.data);
    },

    async transference_manage_locationsQueryAll() {
      this.loading = true;
      let result = await this.$http
        .post("transference_manage_location.php", {
          ApiKey: this.ApiKey,
          manage_location_id_ref: this.manage_id_ref
        })
        .finally(() => (this.loading = false));
      this.transference_manage_locations = result.data;
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
    manage_id_ref() {
      let result = window.location.href;
      let split_s = result.split("/");
      return split_s[6];
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

      let month = monthNames[parseInt(this.transference_manages.brith_month)];

      let today = month;
      return today;
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

table {
  margin: 0%;
}

.table,
.th,
.td {
  border: 1px solid black;
  border-collapse: collapse;
  margin: 0%;
}

.text_j {
  border-collapse: collapse;
  text-align: justify;
  text-justify: inter-word;
  line-height: 1;
}

.text_js {
  border-collapse: collapse;
  text-align: justify;
  text-justify: inter-word;
  line-height: 0.5;
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
  font-size: 12pt;
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
  font-size: 12pt;
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
  width: 25px;
  height: 25px;
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
    font-size: 12pt;
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
    font-size: 12pt;
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
