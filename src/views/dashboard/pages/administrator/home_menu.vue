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
        <v-alert shaped dense dark color="amber lighten-1">
          <h2>ส่วนหลักของระบบ</h2>
        </v-alert>
      </v-col>
      <v-col cols="12" md="12">
        <v-alert
          border="left"
          colored-border
          type="error"
          elevation="2"
          icon="mdi-account-cog"
        >
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
        </v-alert>
      </v-col>
      <v-col cols="12" md="12">
        <v-alert
          border="left"
          colored-border
          type="error"
          elevation="2"
          icon="mdi-account-cog"
        >
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
        </v-alert>
      </v-col>

      <v-col cols="12" md="12">
        <v-alert
          border="left"
          colored-border
          type="error"
          elevation="2"
          icon="mdi-account-details"
        >
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
        </v-alert>
      </v-col>

      <v-col cols="12" md="12">
        <v-alert shaped dense dark type="amber lighten-1">
          <h2>ส่วนเงือนไขการย้ายและการย้าย</h2>
        </v-alert>
      </v-col>

      <v-col cols="12" md="12">
        <v-alert
          border="left"
          colored-border
          type="info"
          elevation="2"
          icon="mdi-account-convert"
        >
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
        </v-alert>
      </v-col>
      <v-col cols="12" md="12">
        <v-alert
          border="left"
          colored-border
          type="info"
          elevation="2"
          icon="mdi-source-branch"
        >
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
        </v-alert>
      </v-col>
      <v-col cols="12" md="12">
        <v-alert
          border="left"
          colored-border
          type="info"
          elevation="2"
          icon="mdi-source-branch"
        >
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
        </v-alert>
      </v-col>
      <v-col cols="12" md="12">
        <v-alert shaped dense dark type="amber lighten-1">
          <h2>งานอัตรากำลัง</h2>
        </v-alert>
      </v-col>
      <v-col cols="12" md="12">
        <v-alert
          border="left"
          colored-border
          color="orange darken-4"
          elevation="2"
          icon="mdi-human"
          ><v-card-title>ระบบอัตรากำลัง</v-card-title>
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
        </v-alert>
      </v-col>

      <v-col cols="12" md="12">
        <v-alert shaped dense dark type="amber lighten-1">
          <h2>ครูผู้ช่วย</h2>
        </v-alert>
      </v-col>

      <v-col cols="12" md="12">
        <v-alert
          border="left"
          colored-border
          color="yellow accent-4"
          elevation="2"
          icon="mdi-human-male-male"
        >
          <v-card-title>ระบบครูผู้ช่วย</v-card-title>
          <v-list>
            <v-list-item-group>
              <!-- <v-list-item v-for="(item, i) in prepare_items" :key="i" :to="item.to"> -->
              <v-list-item v-for="(item, i) in prepare_items" :key="i">
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
        </v-alert>
      </v-col>
      <v-col cols="12" md="12">
        <v-alert shaped dense dark type="amber lighten-1">
          <h2>ข่าวสารและคู่มือระบบ</h2>
        </v-alert>
      </v-col>
      <v-col cols="12" md="12">
        <v-alert
          border="left"
          colored-border
          color="green"
          elevation="2"
          icon="mdi-human-male-male"
        >
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
        </v-alert>
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
        { text: "ข้อมูลรอบปี", icon: "mdi-calendar", to: "/admin/period" }
      ],

      college_items: [
        {
          text: "ข้อมูลประเภทสถานศึกษา",
          icon: "mdi-office-building",
          to: "/admin/collegetype"
        },
        { text: "ข้อมูลสถานศึกษา", icon: "mdi-calendar", to: "/admin/college" },
        {
          text: "ข้อมูลรายละเอียดสถานศึกษา",
          icon: "mdi-calendar",
          to: "/admin/collegeinfo"
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
        },
        {
          text: "ข้อมูลโทษ วินัย",
          icon: "mdi-alarm-light",
          to: "/admin/personnel_discipline"
        }
      ],
      movement_items: [
        {
          text: "สายงานการสอนและสายสนับสนุนการสอน [ประมวลผลแบบ 1]",
          icon: "mdi-alarm-light",
          to: "/admin/transference_personnel"
        },
        {
          text: "สายงานการสอนและสายสนับสนุนการสอน รายละเอียด",
          icon: "mdi-alarm-light",
          to: "/admin/transference_location"
        },

        /*   { text: "สายงานบริหารสถานศึกษา", icon: "mdi-alarm-light", to: "/Dashboard" },
          { text: "การย้ายกรณีพิเศษ", icon: "mdi-alarm-light", to: "/Dashboard" }, */
      ],

      condition_items: [
        { text: "สาขาวิชาเอก", icon: "mdi-basket-plus", to: "/admin/branch" },
        {
          text: "เงือนไขการรับย้ายของสถานศึกษา",
          icon: "mdi-basket-plus",
          to: "/admin/conditions_transfer"
        },
        {
          text: "เงือนไขการรับย้ายสาขาวิชา",
          icon: "mdi-alarm-light",
          to: "/admin/conditions_branch"
        },
        {
          text: "ประมวลผลการย้าย [ประมวลผลแบบ 2]",
          icon: "mdi-chart-box-outline",
          to: "/admin/process_transfer"
        },
          {
          text: "ประมวลผลการย้าย สับเปลี่ยน แบบปกติ]",
          icon: "mdi-chart-box-outline",
          to: "/admin/process_transfer_switch_normal"
        },
         {
          text: "ประมวลผลการย้าย [ประมวลผลแบบ 3 สับเปลี่ยน]",
          icon: "mdi-chart-box-outline",
          to: "/admin/process_transfer_switch"
        },            
        {
          text: "สรุปผลการย้าย",
          icon: "mdi-chart-box-outline",
          to: "/admin/conditons_transfer_success"
        }
      ],

      official_book: [
        {
          text: "คำสั่งแต่งตั้งรักษาการในตำแหน่ง",
          icon: "mdi-basket-plus",
          to: "/admin/Order_appoint"
        }
      ],

      human_items: [
        {
          text: "ข้อมูลอัตรากำลังสถานศึกษา",
          icon: "mdi-basket-plus",
          to: "/admin/man_power"
        }
        /*  { text: "ข้อมูลเชิงปริมาณ", icon: "mdi-chart-box-outline", to: "/Dashboard" },        
          { text: "ข้อมูลเชิงปริมาณ", icon: "mdi-chart-box-outline", to: "/Dashboard" },   */
      ],
      prepare_items: [
        { text: "ข้อมูลครูผู้ช่วย", icon: "mdi-basket-plus", to: "/Dashboard" },
        {
          text: "ประเมินครูผู้ช่วย",
          icon: "mdi-chart-box-outline",
          to: "/Dashboard"
        },
        { text: "รายงาน", icon: "mdi-chart-box-outline", to: "/Dashboard" }
      ],
      news_manual: [
        { text: "ข่าวสาร", icon: "mdi-basket-plus", to: "/admin/news_s" },
        {
          text: "คู่มือใช้งาน",
          icon: "mdi-chart-box-outline",
          to: "/admin/manual_s"
        },
        { text: "กระดานสนทนา", icon: "mdi-chart-box-outline", to: "" }
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
