<template>
  <v-container id="home_menu" fluid tag="section">
    <v-alert
      icon="mdi-shield-lock-outline"
      prominent
      text
      type="info"
      border="left"
      colored-border
      elevation="2"
    >
      <v-row>
        <v-col cols="12" md="6">
          <div>
            <h2>ผู้ใช้งานระบบ : {{ user.user_ID }}</h2>
          </div>
          <div>
            <h3>
              ชื่อผู้ใช้งาน : {{ user.user_firstname }}
              {{ user.user_lastname || "" }}
            </h3>
          </div>
          <h3>สถานะ : {{ user.user_status_name }}</h3>
        </v-col>
        <v-col cols="12" md="6">
          <div align="right">
            <v-btn
              class="mx-2"
              fab
              dark
              large
              color="cyan"
              @click.native="userUpdate()"
            >
              <v-icon dark>
                mdi-pencil
              </v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-alert>
    <v-row>
      <v-col cols="12" md="12">
        <v-alert text dense color="teal" icon="mdi-clock-fast" border="left">
          <h2>ส่วนหลักของระบบ</h2>
        </v-alert>
      </v-col>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>ตั้งค่ากำหนดการ</v-card-title>
          <v-list>
            <v-list-item-group>
              <v-list-item
                v-for="(item, i) in period_config"
                :key="i"
                :to="item.to"
              >
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
        <v-card>
          <v-card-title>ข้อมูลสถานศึกษา</v-card-title>
          <v-list>
            <v-list-item-group>
              <v-list-item
                v-for="(item, i) in college_items"
                :key="i"
                :to="item.to"
              >
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>ผู้ใช้งานระบบ</v-card-title>
          <v-list>
            <v-list-item-group>
              <v-list-item
                v-for="(item, i) in user_system_items"
                :key="i"
                :to="item.to"
              >
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>ข้อมูลงานบุคคล</v-card-title>
          <v-list>
            <v-list-item-group>
              <v-list-item
                v-for="(item, i) in user_items"
                :key="i"
                :to="item.to"
              >
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="12" md="12">
        <v-alert text dense color="teal" icon="mdi-clock-fast" border="left">
          <h2>สาขาวิชา</h2>
        </v-alert>
      </v-col>

      <v-col cols="12" md="12">
        <v-card>
          <v-card-title>จัดการสาขาวิชา</v-card-title>
          <v-list>
            <v-list-item-group>
              <!-- <v-list-item v-for="(item, i) in prepare_items" :key="i" :to="item.to"> -->
              <v-list-item
                v-for="(item, i) in about_brach"
                :key="i"
                :to="item.to"
              >
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>                 
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="12" md="12">
        <v-alert text dense color="teal" icon="mdi-clock-fast" border="left">
          <h2>ส่วนเงือนไขการย้ายและการย้าย</h2>
        </v-alert>
      </v-col>

      <v-col cols="12" md="4">
        <v-card>
          <v-card-title
            >ระบบการย้ายข้าราชการครูและบุคลากรทางการศึกษา</v-card-title
          >
          <v-list>
            <v-list-item-group>
              <v-list-item
                v-for="(item, i) in movement_items"
                :key="i"
                :to="item.to"
              >
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>เงือนไขสาขาวิชาสถานศึกษา</v-card-title>
          <v-list>
            <v-list-item-group>
              <v-list-item
                v-for="(item, i) in condition_items"
                :key="i"
                :to="item.to"
              >
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>หนังสือราชการ</v-card-title>
          <v-list>
            <v-list-item-group>
              <v-list-item
                v-for="(item, i) in official_book"
                :key="i"
                :to="item.to"
              >
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" md="12">
        <v-alert text dense color="teal" icon="mdi-clock-fast" border="left">
          <h2>งานอัตรากำลัง</h2>
        </v-alert>
      </v-col>
      <v-col cols="12" md="12">
        <v-card>
          <v-card-title>ระบบอัตรากำลัง</v-card-title>
          <v-list>
            <v-list-item-group>
              <v-list-item
                v-for="(item, i) in human_items"
                :key="i"
                :to="item.to"
              >
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                  <v-list-item-title v-text="item.to"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="12" md="12">
        <v-alert text dense color="teal" icon="mdi-clock-fast" border="left">
          <h2>ครูผู้ช่วย</h2>
        </v-alert>
      </v-col>

      <v-col cols="12" md="12">
        <v-card>
          <v-card-title>ระบบครูผู้ช่วย</v-card-title>
          <v-list>
            <v-list-item-group>
              <!-- <v-list-item v-for="(item, i) in prepare_items" :key="i" :to="item.to"> -->
              <v-list-item v-for="(item, i) in prepare_items" :key="i" :to="item.to">
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                  <v-list-item-title v-text="item.to"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" md="12">
        <v-alert text dense color="teal" icon="mdi-clock-fast" border="left">
          <h2>ข่าวสารและคู่มือระบบ</h2>
        </v-alert>
      </v-col>
      <v-col cols="12" md="12">
        <v-card>
          <v-card-title>ข่าวและคู่มือใช้งานระบบ</v-card-title>
          <v-list>
            <v-list-item-group>
              <v-list-item
                v-for="(item, i) in news_manual"
                :key="i"
                :to="item.to"
              >
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                  <v-list-item-title v-text="item.to"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
    <!-- V-model userdialog -->
    <v-layout row justify-center>
      <v-dialog v-model="edituserdialog" persistent max-width="80%">
        <v-card class="mx-auto pa-6" elevation="2">
          <base-material-card
            color="yellow"
            icon="mdi-clipboard-text"
            title="เปลี่ยนรหัสผ่าน"
            class="px-5 py-3 text_google"
            elevation="2"
          >
          </base-material-card>
          <v-card-text>
            <v-form ref="edituserform" lazy-validation>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex md12>
                    {{ edituser.user_name }} {{ edituser.user_firstname
                    }}{{ edituser.user_lastname }}
                  </v-flex>
                  <v-flex md6>
                    <v-text-field
                      outlined
                      label="Password"
                      v-model="edituser.user_password"
                      type="password"
                    ></v-text-field>
                  </v-flex>
                  <v-flex md6>
                    <v-text-field
                      outlined
                      label="Confirm Password"
                      v-model="edituser.user_confirmpassword"
                      type="password"
                      required
                      :rules="[v => v == edituser.user_password]"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-divider></v-divider>
                  </v-flex>
                </v-layout>
              </v-container>
              <small>* จำเป็น</small>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn large @click.stop="edituserdialog = false" rounded>
              <v-icon dark>mdi-close</v-icon>ยกเลิก
            </v-btn>
            <v-btn
              large
              color="amber lighten-1"
              @click.stop="edituserSubmit()"
              rounded
            >
              <v-icon dark>mdi-pencil</v-icon>&nbsp;แก้ไข
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
  data() {
    return {
      ApiKey: "HRvec2021",
      user: {},
      users: [],
      edituser: [],
      edituserdialog: false,
      snackbar: {
        show: false,
        color: "",
        timeout: 5000,
        icon: "",
        text: ""
      },
      user_system_items: [
        {
          text: "ข้อมูลผู้ใช้งานระบบ ข้าราชการครูและบุคลาการทางการศึกษา",
          icon: "mdi-account-arrow-right",
          to: "/admin/personnel"
        },
        {
          text: "ข้อมูลผู้ใช้งานระบบ วิทยาลัย อศจ สถานบัน กจ2 Admin",
          icon: "mdi-account-arrow-right",
          to: "/admin/user"
        },
        {
          text: "สถานะผู้ใช้งานระบบ",
          icon: "mdi-account-cog",
          to: "/admin/user_status"
        },
       /*  { text: "ข้อมูลรอบปี", icon: "mdi-calendar", to: "/admin/period" } */
      ],

      college_items: [
        {
          text: "ข้อมูลประเภทสถานศึกษา",
          icon: "mdi-office-building",
          to: "/admin/collegetype"
        },
        { text: "ข้อมูลสถานศึกษา", icon: "mdi-office-building", to: "/admin/college" },
        {
          text: "ข้อมูลรายละเอียดสถานศึกษา",
          icon: "mdi-office-building",
          to: "/admin/collegeinfo"
        }
      ],

      period_config: [
        { text: "กำหนดการย้าย", icon: "mdi-calendar", to: "/admin/period" },
        {
          text: "กำหนดการสถานศึกษา",
          icon: "mdi-calendar",
          to: "/admin/period_college"
        }
      ],

      user_items: [
        {
          text: "ข้อมูลเกี่ยวกับบุคคล",
          icon: "mdi-account",
          to: "/admin/personnel_tem"
        },
        {
          text: "ข้อมูลคุณวุฒิการศึกษา",
          icon: "mdi-school",
          to: "/admin/personnel_education"
        },
        {
          text: "ข้อมูลประสบการณ์",
          icon: "mdi-airplane",
          to: "/admin/personnel_experience"
        },
        {
          text: "ข้อมูลประวัติการทำงาน",
          icon: "mdi-access-point-network",
          to: "/admin/personnel_work_history"
        },
        {
          text: "ข้อมูลผลงาน รางวัล",
          icon: "mdi-trophy-award",
          to: "/admin/personnel_award"
        }
        /*   {
          text: "ข้อมูลโทษ วินัย",
          icon: "mdi-alarm-light",
          to: "/admin/personnel_discipline"
        } */
      ],

      about_brach: [
        {
          text: "สาขาวิชาเอก",
          icon: "mdi-source-branch",
          to: "/admin/branch"
        },
        {
          text: "สาขางาน",
          icon: "mdi-source-branch",
          to: "/admin/branch_sub"
        },
          {
          text: "ประเภทวิชา/หมวดวิชา/สาขาวิชา",
          icon: "mdi-source-branch",
          to: "/admin/rate_work_course_std"
        },
        
      ],

      movement_items: [
        
         {
          text: "สายงานสอนและสายสนับสนุนการสอน ประกอบการพิจารณา",
          icon: "mdi-account-switch",
          to: "/admin/transference_location_detail"
        },
          {
          text: "สายงานการสอนและสายสนับสนุนการสอน รายละเอียด",
          icon: "mdi-account-switch",
          to: "/admin/transference_location"
        },
        {
          text: "สายงานการสอนและสายสนับสนุนการสอน [ประมวลผลแบบ 1]",
          icon: "mdi-calculator",
          to: "/admin/transference_personnel"
        },
      

        /*   { text: "สายงานบริหารสถานศึกษา", icon: "mdi-alarm-light", to: "/Dashboard" },
          { text: "การย้ายกรณีพิเศษ", icon: "mdi-alarm-light", to: "/Dashboard" }, */
      ],

      condition_items: [
        {
          text: "เงือนไขการรับย้ายของสถานศึกษา",
          icon: "mdi-checkbox-multiple-marked-outline",
          to: "/admin/conditions_transfer"
        },
        {
          text: "เงือนไขการรับย้ายสาขาวิชา",
          icon: "mdi-checkbox-multiple-marked-outline",
          to: "/admin/conditions_branch"
        },
        {
          text: "ประมวลผลการย้าย [ประมวลผลแบบ 2]",
          icon: "mdi-calculator",
          to: "/admin/process_transfer"
        },
        {
          text: "ประมวลผลการย้าย สับเปลี่ยนแบบปกติ แบบที่ 3]",
          icon: "mdi-calculator",
          to: "/admin/process_transfer_switch_normal"
        },
        {
          text: "ประมวลผลการย้าย [ประมวลผลแบบ 4 สับเปลี่ยน]",
          icon: "mdi-calculator",
          to: "/admin/process_transfer_switch"
        },
        {
          text: "สรุปผลการย้าย",
          icon: "mdi-newspaper",
          to: "/admin/conditons_transfer_success"
        }
      ],

      official_book: [
        {
          text: "คำสั่งแต่งตั้งรักษาการในตำแหน่ง",
          icon: "mdi-bookmark-check",
          to: "/admin/Order_appoint"
        },
        {
          text: "ศูนย์กลางส่งออกเอกสาร ประกอบการพิจารณาย้าย",
          icon: "mdi-bookmark-check",
          to: "/admin/transference_export_report"
        }

      ],

      human_items: [
        {
          text: "ข้อมูลอัตรากำลังสถานศึกษา",
          icon: "mdi-account-multiple",
          to: "/admin/man_power"
        }
        /*  { text: "ข้อมูลเชิงปริมาณ", icon: "mdi-chart-box-outline", to: "/Dashboard" },        
          { text: "ข้อมูลเชิงปริมาณ", icon: "mdi-chart-box-outline", to: "/Dashboard" },   */
      ],
      prepare_items: [
        { text: "ข้อมูลครูผู้ช่วย", icon: "mdi-account-settings", to: "/admin/assistant_teacher" },
        {
          text: "รายละเอียดการประเมินครูผู้ช่วย",
          icon: "mdi-account-star",
          to: "/admin/assistant_teacher_detail"
        },
       /*  { text: "รายงาน", icon: "mdi-chart-box-outline", to: "/Dashboard" } */
      ],
      news_manual: [
        { text: "ข่าวสาร", icon: "mdi-book", to: "/admin/news_s" },
        {
          text: "คู่มือใช้งาน",
          icon: "mdi-book-open-page-variant",
          to: "/admin/manual_s"
        },
      /*   { text: "กระดานสนทนา", icon: "mdi-chart-box-outline", to: "" } */
      ]
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
  },

  methods: {
    async userQueryAll() {
      let result;
      let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
      result = await this.$http.post("user.php", {
        ApiKey: this.ApiKey,
        user_ID: userSession.user_ID
      });
      this.user = result.data;
    },
    async userUpdate() {
      let result = await this.$http.post("user.php", {
        ApiKey: this.ApiKey,
        user_ID: this.user.user_ID
      });
      this.edituser = result.data;
      this.edituser.p_word = "";
      this.edituserdialog = true;
    },
    async edituserSubmit() {
      if (this.$refs.edituserform.validate()) {
        this.edituser.ApiKey = this.ApiKey;
        let result = await this.$http.post("user.update.php", this.edituser);
        if (result.data.status == true) {
          this.user = result.data;
          this.snackbar.icon = "mdi-font-awesome";
          this.snackbar.color = "success";
          this.snackbar.text = "แก้ไขข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.userQueryAll();
        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text = "แก้ไขข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.edituserdialog = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
