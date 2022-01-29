<template>
  <v-container id="alerts" fluid tag="section">
    <v-row>
      <v-col cols="12" md="8">
        <v-card>
          <v-card-text>
            <base-subheading subheading="ประชาสัมพันธ์" />
            <v-col cols="12" lg="6" class="text-right">
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="ค้นหา ระบุคำ หรือ ส่วนข้อความเกี่ยวข้อง"
                single-linehide-details
                dense
                filled
                class="mb-2"
              />
            </v-col>
            <v-data-table
              color="success"
              :loading="loading"
              :headers="headers"
              :items="news_ss"
              :search="search"
            >
              <template v-slot:[`item.topic_s`]="{ item }">
                <h3>{{ item.topic_s }}</h3>
              </template>

              <template v-slot:[`item.date_times`]="{ item }">
                {{
                  item.date_times
                    | moment("add", "543 years")
                    | moment("D MMMM YYYY")
                }}
              </template>

              <template v-slot:[`item.link_file`]="{ item }">
                <!-- <v-btn
                  class="mx-2"
                  fab
                  dark
                  small
                  color="teal"
                  :href="'http://localhost:8080/HRvecfiles/' + item.link_file"
                  target="_blank"
                >
                  <v-icon dark>
                    mdi-format-list-bulleted-square
                  </v-icon>
                </v-btn> -->

                 <v-btn
                  class="mx-2"
                  fab
                  dark
                  small
                  color="teal"
                  :href="'/HRvecfiles/' + item.link_file"
                  target="_blank"
                >
                  <v-icon dark>
                    mdi-format-list-bulleted-square
                  </v-icon>
                </v-btn>

              </template>

              <v-alert
                slot="no-results"
                :value="true"
                color="error"
                icon="mdi-alert"
                >ไม่พบผลลัพธ์ "{{ search }}" ที่คุณกำลังค้นหา.</v-alert
              >
            </v-data-table>           
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card>
          <v-card-text>
            <base-subheading subheading="คู่มือการใช้งาน" />
            <base-material-alert
              v-for="item in manual_ss"
              :key="item.id_manual"
              dark
              color="primary"
            >
              <span style="font-size: 18px;"> {{ item.topic_s }}</span>
              <v-divider class="my-4 red" style="opacity: 0.22"></v-divider>
              <span style="font-size: 16px;"> {{ item.detail_s }}</span>
              <div class="text-right">
                {{
                  item.date_time
                    | moment("add", "543 years")
                    | moment("D MMMM YYYY")
                }}
              </div>

              <!-- <v-btn
                block
                color="info"
                :href="'http://localhost:8080/HRvecfiles/' + item.link_file"
                target="_blank"
                id="a"
                ><h3>คู่มือ</h3> </v-btn> -->
              <v-btn
                block
                color="info"
                :href="'/HRvecfiles/' + item.link_file"
                target="_blank"
                id="a"
                >คู่มือ</v-btn>
            </base-material-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "DashboardNotifications",

  data: () => ({
    ApiKey: "HRvec2021",
    color: "info",
    news_ss: [],
    manual_ss: [],
    colors: ["info", "success", "warning", "error"],
    dialog: false,
    dialog2: false,
    dialog3: false,
    direction: "top center",
    search: '',
    directions: [
      "top left",
      "top center",
      "top right",
      "bottom left",
      "bottom center",
      "bottom right"
    ],
    headers: [
      { text: "หัวข้อ", align: "left", value: "topic_s" },
      { text: "รายละเอียด", align: "left", value: "detail_s" },
      { text: "วันที่", align: "center", value: "date_times" },
      { text: "ไฟล์แนบ", align: "center", value: "link_file" }
    ],
    snackbar: false
  }),

  computed: {
    parsedDirection() {
      return this.direction.split(" ");
    }
  },
  async mounted() {
    this.news_sQueryAll();
    this.manual_sQueryAll();
  },

  methods: {
    async news_sQueryAll() {
      this.loading = true;
      let result = await this.$http
        .post("news_s.php", {
          ApiKey: this.ApiKey
        })
        .finally(() => (this.loading = false));
      this.news_ss = result.data;
    },

    async manual_sQueryAll() {
      this.loading = true;
      let result = await this.$http
        .post("manual_s.php", {
          ApiKey: this.ApiKey
        })
        .finally(() => (this.loading = false));
      this.manual_ss = result.data;
    },

    randomColor() {
      this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
    }
  }
};
</script>
<style>
a {
  outline: none;
  text-decoration: none;
  padding: 2px 1px 0;
}
</style>
