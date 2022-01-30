<template>
  <v-container id="dashboard" fluid tag="section">
    <v-row>
      <v-col cols="12" lg="12">
        <v-bottom-navigation  v-model="value" :value="value" :background-color="color" horizontal>
          <v-btn color="primary" max-width="100%"  elevation="3" rounded to="/pages/login">
           <h3><span>เข้าสู่ระบบ : ข้าราชการครูและบุคลากรทางการศึกษา</span></h3> 
            <v-icon>mdi-account-key</v-icon>
          </v-btn>

          <v-btn color="warning" max-width="100%" elevation="3" rounded to="/pages/loginAdmin">
            <h3><span>เข้าสู่ระบบ : สถานศึกษา</span></h3>

            <v-icon>mdi-login-variant</v-icon>
          </v-btn>
        </v-bottom-navigation>
      </v-col>

      <v-col cols="12" sm="6" lg="4">
        <base-material-stats-card
          :value="Number(showAlldata.count_all).toLocaleString()"
          color="primary"
          icon="mdi-account-group"
          title="ครูบุคลากรทั้งหมด"
          sub-icon="mdi-clock"
          sub-text="ALL Personnel"
        />
      </v-col>

      <v-col cols="12" sm="6" lg="4">
        <base-material-stats-card
          :value="Number(showAlldata.count_tech).toLocaleString()"
          color="primary"
          icon="mdi-account-group"
          title="ข้าราชการครู"
          sub-icon="mdi-clock"
          sub-text="Teacher"
        />
      </v-col>

      <v-col cols="12" sm="6" lg="4">
        <base-material-stats-card
          :value="Number(showAlldata.count_dr).toLocaleString()"
          color="primary"
          icon="mdi-account-group"
          title="ผู้อำนวยการวิทยาลัย"
          sub-icon="mdi-clock"
          sub-text="Director"
        />
      </v-col>

      <v-col cols="12" sm="6" lg="3">
        <base-material-stats-card
          :value="Number(showAlldata.count_se_dr).toLocaleString()"
          color="primary"
          icon="mdi-account-group"
          title="รองผู้อำนวยการ"
          sub-icon="mdi-clock"
          sub-text="Deputy Director"
        />
      </v-col>

      <v-col cols="12" sm="6" lg="3">
        <base-material-stats-card
          :value="Number(showAlldata.count_supervision).toLocaleString()"
          color="primary"
          icon="mdi-account-group"
          title="ศึกษานิเทศก์"
          sub-icon="mdi-clock"
          sub-text="Study supervision"
        />
      </v-col>

      <v-col cols="12" sm="6" lg="3">
        <base-material-stats-card
          :value="Number(showAlldata.count_perpare).toLocaleString()"
          color="primary"
          icon="mdi-account-group"
          title="ครูผู้ช่วย"
          sub-icon="mdi-clock"
          sub-text="Intense Preparation"
        />
      </v-col>

      
      <v-col cols="12" sm="6" lg="3">
        <base-material-stats-card
          :value="Number(showAlldata.count_38).toLocaleString()"
          color="primary"
          icon="mdi-account-group"
          title="(38)"
          sub-icon="mdi-clock"
          sub-text="Support"
        />
      </v-col>

      <v-col cols="12" lg="6">
        <base-material-chart-card
          :data="Personnel_chart.data"
          :options="Personnel_chart.options"
          :responsive-options="Personnel_chart.responsiveOptions"
          color="#E91E63"
          hover-reveal
          type="Bar"
        >
          <template v-slot:reveal-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn v-bind="attrs" color="info" icon v-on="on">
                  <v-icon color="info">mdi-refresh</v-icon>
                </v-btn>
              </template>
              <span>Refresh</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn v-bind="attrs" light icon v-on="on">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>

              <span>Change Date</span>
            </v-tooltip>
          </template>

          <h4 class="card-title font-weight-light mt-2 ml-2">
            ข้าราชการครูและบุคลากรทางการศึกษา
          </h4>

          <template v-slot:actions>
            <v-icon class="mr-1" small>mdi-clock-outline</v-icon>
            <span class="caption grey--text font-weight-light"
              >updated 10 minutes ago</span
            >
          </template>
        </base-material-chart-card>
      </v-col>

      <v-col cols="12" lg="6">
        <base-material-chart-card
          :data="personnel_rangChart.data"
          :options="personnel_rangChart.options"
          color="success"
          hover-reveal
          type="Line"
        >
          <template v-slot:reveal-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn v-bind="attrs" color="info" icon v-on="on">
                  <v-icon color="info">mdi-refresh</v-icon>
                </v-btn>
              </template>

              <span>Refresh</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn v-bind="attrs" light icon v-on="on">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>

              <span>Change Date</span>
            </v-tooltip>
          </template>

          <h4 class="card-title font-weight-light mt-2 ml-2">
            ข้อมูลวิทยฐานะข้าราชการครู
          </h4>

          <template v-slot:actions>
            <v-icon class="mr-1" small>mdi-clock-outline</v-icon>
            <span class="caption grey--text font-weight-light"
              >updated 4 minutes ago</span
            >
          </template>
        </base-material-chart-card>
      </v-col>

      <v-col cols="12" md="12">
        <base-material-card color="warning" class="px-5 py-3">
          <template v-slot:heading>
            <div class="font-weight-light">สถานศึกษา</div>

            <div class="font-weight-light">ข้อมูลสถานศึกษาที่อยู่ในระบบ</div>
          </template>
          <v-card-text>
            <v-data-table :headers="headers" :items="colleges" :search="search">
              <template v-slot:top>
                <v-text-field
                  v-model="search"
                  label="ค้นหา :"
                  class="mx-4"
                ></v-text-field>
              </template>
            </v-data-table>
          </v-card-text>
        </base-material-card>
      </v-col>

      <v-col cols="12" md="12">
        <base-material-card color="success" class="px-5 py-3">
          <template v-slot:heading>
            <div class="font-weight-light">สาขาวิชาเอก</div>

            <div class="font-weight-light">ข้อมูลสาขาวิชาในระบบ</div>
          </template>
          <v-card-text>
            <v-data-table
              :headers="header_branchs"
              :items="showbranchdata"
              :search="search_branch"
            >
              <template v-slot:top>
                <v-text-field
                  v-model="search_branch"
                  label="ค้นหา :"
                  class="mx-4"
                ></v-text-field>
              </template>
            </v-data-table>
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "DashboardDashboard",

  data() {
    return {
      value: 1,
      active: true,
      headers: [
        { text: "ชื่อสถานศึกษา", align: "left", value: "college_name" },
        { text: "อำเภอ", align: "left", value: "prefecture_name" },
        { text: "จังหวัด", align: "left", value: "province_name" },
        { text: "ประเภทสถานศึกษา", align: "left", value: "collegetype_name" },
        { text: "เบอร์โทร", align: "left", value: "collegeinfo_phone" }
      ],
      header_branchs: [
        { text: "รหัสสาขา", align: "center", value: "id_branch" },
        { text: "สาขาวิชา", align: "left", value: "name_branch" },
        { text: "รายละเอียด", align: "left", value: "detail_branch" }
      ],
      search: "",
      search_branch: "",
      pagination: {},
      ApiKey: "HRvec2021",

      rowsperpage: [
        25,
        50,
        100,
        {
          text: "All",
          value: -1
        }
      ],
      personnel_rangChart: {
        data: {
          labels: ["ครูผู้ช่วย", "คศ.1", "คศ.2", "คศ.3", "คศ.4", "คศ.5"],
          series: [[0, 0, 0, 0, 0, 0]]
        },
        options: {
          lineSmooth: this.$chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 5000,
          chartPadding: {
            top: 0,
            right: 10,
            bottom: 0,
            left: 0
          }
        }
      },

      Personnel_chart: {
        data: {
          labels: [
            "ผู้อำนวยการ",
            "รองผู้อำนวยการ",
            "ครู",
            "ครูผู้ช่วย",
            "ศึกษานิเทศก์"
          ],
          series: [[0, 0, 0, 0, 0]]
        },
        options: {
          axisX: {
            showGrid: false
          },
          low: 0,
          high: 14000,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 10
          }
        },
        responsiveOptions: [
          [
            "screen and (max-width: 100%)",
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function(value) {
                  return value[0];
                }
              }
            }
          ]
        ]
      },

      user: [],
      showAlldata_rang: [],
      colleges: [],
      provinces: [],
      prefectures: [],
      regions: [],
      region_ena: true,
      showAlldata: {},
      showcollegedata: {},
      showbranchdata: []
    };
  },

  async mounted() {
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

    await this.getuser();
    await this.getAlldata();
    await this.getAlldata_rang();
    await this.getPersonnelChart();
    await this.getPersonnel_rangChart();
    await this.getAllbranchdata();
  },

  methods: {
    async getuser() {
      let result;
      let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
      result = await this.$http.post("admin.php", {
        user_name: userSession.user_name,
        ApiKey: "HRvec2021"
      });
      this.user = result.data;
    },

    async getAlldata() {
      let result = await this.$http.post("show_dashboard_all.php");
      this.showAlldata = result.data;
    },

    async getAlldata_rang() {
      let result = await this.$http.post("show_dachboard_rang.php");
      this.showAlldata_rang = result.data;
    },

    async getPersonnelChart() {
      this.Personnel_chart.data.series = [
        [
          this.num_dr,
          this.num_se_dr,
          this.num_se_tech,
          this.num_se_techprepare,
          this.num_se_supervision
        ]
      ];
    },

    async getPersonnel_rangChart() {
      this.personnel_rangChart.data.series = [
        [
          this.num_rang_0,
          this.num_rang_1,
          this.num_rang_2,
          this.num_rang_3,
          this.num_rang_4,
          this.num_rang_5
        ]
      ];
    },

    async getAllbranchdata() {
      let result = await this.$http.post("branch.php", {
        ApiKey: this.ApiKey
      });
      this.showbranchdata = result.data;
    }
  },
  computed: {
    num_dr() {
      let result = parseInt(this.showAlldata.count_dr);
      return result;
    },
    num_se_dr() {
      let result = parseInt(this.showAlldata.count_se_dr);
      return result;
    },
    num_se_tech() {
      let result = parseInt(this.showAlldata.count_tech);
      return result;
    },
    num_se_techprepare() {
      let result = parseInt(this.showAlldata.count_perpare);
      return result;
    },
    num_se_supervision() {
      let result = parseInt(this.showAlldata.count_supervision);
      return result;
    },

    num_rang_0() {
      let result = parseInt(this.showAlldata_rang.count_rang0);
      return result;
    },
    num_rang_1() {
      let result = parseInt(this.showAlldata_rang.count_rang1);
      return result;
    },
    num_rang_2() {
      let result = parseInt(this.showAlldata_rang.count_rang2);
      return result;
    },
    num_rang_3() {
      let result = parseInt(this.showAlldata_rang.count_rang3);
      return result;
    },
    num_rang_4() {
      let result = parseInt(this.showAlldata_rang.count_rang4);
      return result;
    },
    num_rang_5() {
      let result = parseInt(this.showAlldata_rang.count_rang5);
      return result;
    },
    color () {
        switch (this.value) {
          case 0: return 'blue-grey'
          case 1: return 'teal'
          case 2: return 'brown'
          case 3: return 'indigo'
          default: return 'blue-grey'
        }
    }
  }
};
</script>
