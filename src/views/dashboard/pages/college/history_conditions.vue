<template>
  <v-container id="upgrade" fluid tag="section" class="text_google">
    <v-row>
      <v-col cols="12" md="12">
        <base-material-card color="primary">
          <template v-slot:heading>
            <h2 class="h1 font-weight-light text_google">
              <v-icon large left>mdi-file-send</v-icon
              >ประวัติเงือนไขในการรับย้าย
            </h2>
          </template>

          <v-row>
            <v-col cols="12" sm="4">
              <v-select
                v-model="period_year"
                label="แสดงข้อมูล ประจำปี :"
                :items="year_select"
                item-text="year_select"
                item-value="year_select"
                @change="searchYear()"
              >
              </v-select>
            </v-col>
            <v-col cols="12" sm="12">
              <v-alert
                border="left"
                colored-border
                color="info darken-1"
                elevation="2"
                type="info"
              >
                <table width="100%" align="center" class="table">
                  <tr>
                    <th width="20%" class="regular16 th" align="center">
                      อันดับ
                    </th>
                    <th width="20%" class="regular16 " align="center">
                      คุณวุฒิ
                    </th>
                    <th width="50%" class="regular16 " align="left">
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
                  v-for="item in conditions_branchs"
                  :key="item.id_cb"
                  small
                >
                  <tr>
                    <td width="20%" class="regular12 th" align="center">
                      {{ item.sequence_n }}
                    </td>
                    <td width="20%" class="regular12 " align="center">
                      {{ item.educational_level }}
                    </td>
                    <td width="50%" class="regular12 ">
                      {{ item.id_branch }} {{ item.name_branch }}
                    </td>
                    <td width="10%" class="regular12 th" align="center">
                      {{ item.quantity_n }}
                    </td>
                  </tr>
                </table>
              </v-alert>
            </v-col>
          </v-row>
        </base-material-card>
      </v-col>
    </v-row>

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
      loading: true,
      ApiKey: "HRvec2021",
      colleges_user: [],
      colleges: {},
      personnel_search: {},
      show_personnel: [],
      branch_s: [],
      search: "",
      period_year: [],

      conditions_branch: [],
      conditions_branchs: [],
      conditions_transfers: [],
      addconditions_branch: {},
      addconditions_transfer: {},
      editconditions_branch: [],
      provinces: [],
      provices_sh: [],
      prefectures: [],
      district: [],
      district_post_s: [],
      snackbar: {
        show: false,
        color: "",
        timeout: 5000,
        icon: "",
        text: ""
      },
      order_need: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      year_select: [2565, 2566, 2567, 2568, 2569, 2570],
      header_trans: [
        { text: "ลำดับ", align: "center", value: "sequence_n" },
        { text: "สาขาวิชา", align: "left", value: "name_branch" },
        { text: "ระดับการศึกษา", align: "center", value: "educational_level" },
        { text: "จำนวน", align: "center", value: "quantity_n" },
        { text: "ยกเลิก", align: "center", value: "action" }
      ],
      education_s: [
        {
          title: "ปริญญาตรี"
        },
        {
          title: "ปริญญาโท",
          faculty: ""
        },
        {
          title: "ปริญญาเอก"
        }
      ],
      status_condition: [{ text: "ยืนยัน", value: "confirm" }],

      isEditing: null,
      model: null,
      show1: false,
      pagination: {},
      personnel_marriages: [],
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
    await this.personnel_temporaryQueryAll();
    await this.conditions_transferQueryAll();
    await this.conditions_branchQueryAll();
  },

  methods: {
    async personnel_temporaryQueryAll() {
      this.loading = true;
      let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
      let result = await this.$http
        .post("admin.php", {
          ApiKey: this.ApiKey,
          user_name: userSession.user_name
        })
        .finally(() => (this.loading = false));
      this.colleges_user = result.data;
    },

    async conditions_branchQueryAll() {
      this.loading = true;
      let result = await this.$http
        .post("conditions_branch.php", {
          ApiKey: this.ApiKey,
          college_code: this.colleges_user.college_code
        })
        .finally(() => (this.loading = false));
      this.conditions_branchs = result.data;
    },

    async conditions_transferQueryAll() {
      this.loading = true;
      let result = await this.$http
        .post("conditions_transfer.php", {
          ApiKey: this.ApiKey,
          college_code: this.colleges_user.college_code
        })
        .finally(() => (this.loading = false));
      this.conditions_transfers = result.data;
    },

    async searchYear() {
      this.loading = true;
      let result = await this.$http
        .post("conditions_branch.php", {
          ApiKey: this.ApiKey,
          college_code: this.colleges_user.college_code,
          year_s: this.period_year
        })
        .finally(() => (this.loading = false));
      this.conditions_branchs = result.data;
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
    }
  },
  watch: {
    async conditions_br() {
      await this.conditions_transferQueryAll();
    }
  }
};
</script>
