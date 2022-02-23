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
    <div id="exportContent">
      <div class="page">
        <div align="center">
          <v-img
            max-height="30mm"
            max-width="25mm"
            src="~../src/assets/krud.jpg"
          ></v-img>
          <div class="head">คำสั่งสำนักงานคณะกรรมการการอาชีวศึกษา</div>
          <div class="head">
            ที่ {{ thaiNumber(order_appoints.order_number) }}
          </div>
          <div class="head">เรื่่อง แต่งตั้งผู้รักษาการในตำแหน่ง</div>
          <div class="head">___________________________</div>
          <br />
        </div>
        <table class="text_j">
          <tr>
            <td width="10%"></td>
            <td width="90%" style="">
              อาศัยอำนาจตามความในมาตรา ๕๓(๕) และมาตรา ๖๘
              แห่งพระราชบัญญัติระเบียบข้าราชการครู
            </td>
          </tr>
          <tr>
            <td colspan="2" width="100%">
              และบุคลากรทางการศึกษา พ.ศ.๒๕๔๗ และที่แก้ไขเพิ่มเติม (ฉบับที่ ๒)
              พ.ศ.๒๕๕๑ โดยอนุมัติ อ.ก.ค.ศ.สำนักงานคณะกรรมการการอาชีวศึกษา
              ในการประชุมครั้งที่
              {{ thaiNumber(order_appoints.meeting_no) }} เมื่อวันที่

              {{
                thaiNumber(meeting_dates) +
                  " " +
                  meeting_month +
                  " " +
                  thaiNumber(meeting_year)
              }}             
              มีมติอนุมัติให้ย้ายข้าราชการครูและบุคลากรทางการศึกษา ตำแหน่งครู
              จำนวน {{ thaiNumber(order_appoints.count_personnel) }} ราย
              จึงแต่งตั้งข้าราชการครูและบุคลากรทางการศึกษา ตำแหน่งครู
              ไปแต่งตั้งให้ดำรงตำแหน่งเดิมในสถานศึกษาแห่งใหม่ จำนวน
              {{ thaiNumber(order_appoints.count_personnel) }} ราย ดังนี้
            </td>
          </tr>
        </table>

        <table
          class="text_j"
          width="100%"
          v-for="(item, index) in conditons_transfer_successs"
          :key="item.id_cts"
        >
          <tr>
            <td width="10%"></td>
            <td width="90%" class="regular16 text_j">
              {{ thaiNumber(index + 1) }}. {{ item.title_s
              }}{{ item.frist_name }} {{ item.last_name }} ตำแหน่ง{{
                item.name_position
              }}
              ตำแหน่งเลขที่
              {{ thaiNumber(item.id_postion_old) }}
              {{ item.college_name_old }}
            </td>
          </tr>
          <tr>
            <td colspan="2">
              ให้รักษาการในตำแหน่ง{{ item.name_position }} ตำแหน่งเลขที่
              {{ thaiNumber(item.id_position) }} {{ item.college_name_new }}
            </td>
          </tr>
        </table>

        <table class="" width="100%">
          <tr>
            <td width="10%" colspan="2"></td>
            <td width="90%">ทั้งนี้ ตั้งแต่วันที่ 
              {{
                thaiNumber(dated_orders) +
                  " " +
                  dated_order_month +
                  " " +
                  thaiNumber(dated_order_year)
              }}      
               เป็นต้นไป</td>
          </tr>
        </table>

        <table class="" width="100%">
          <tr>
            <td width="20%"></td>
            <td width="80%">สั่ง ณ วันที่</td>
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
    valid: true,
    order_appoints: [],
    conditons_transfer_successs: []
  }),

  async mounted() {
    await this.order_appointQueryAll();
    await this.conditons_transfer_successQueryAll();
    await this.order_appoint_num();
  },

  methods: {
    async order_appointQueryAll() {
      this.loading = true;
      let result = await this.$http
        .post("order_appoint.php", {
          ApiKey: this.ApiKey,
          id_oa: this.id_url
        })
        .finally(() => (this.loading = false));
      this.order_appoints = result.data;
    },

    async order_appoint_num() {
      this.loading = true;
      let result = await this.$http
        .post("order_appoint.php", {
          ApiKey: this.ApiKey,
          id_oa: this.id_url,
          time_s: this.order_appoints.time_s,
          year_s: this.order_appoints.year_s,
          name_position: this.position_url
        })
        .finally(() => (this.loading = false));
      this.order_appoints = result.data;
    },

    async conditons_transfer_successQueryAll() {
      this.loading = true;
      let result = await this.$http
        .post("conditons_transfer_success.php", {
          ApiKey: this.ApiKey,
          time_s: this.order_appoints.time_s,
          year_s: this.order_appoints.year_s,
          name_position: this.position_url
        })
        .finally(() => (this.loading = false));
      this.conditons_transfer_successs = result.data;
    },
    thaiNumber(num) {
      var array = {
        "1": "๑",
        "2": "๒",
        "3": "๓",
        "4": "๔",
        "5": "๕",
        "6": "๖",
        "7": "๗",
        "8": "๘",
        "9": "๙",
        "0": "๐"
      };
      var str = num.toString();
      for (var val in array) {
        str = str.split(val).join(array[val]);
      }
      return str;
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
  props: {
    source: String
  },

  computed: {
    url_result() {
      let result = window.location.href;
      let split_s = result.split("/");
      return split_s[6];
    },

    position_url() {
      let result = this.url_result.slice(6);
      if (result == "tech") {
        result = "ครู";
      } else {
        result = "บริหาร";
      }
      return result;
    },
    id_url() {
      let result = this.url_result;
      return result[1];
    },

    meeting_dates() {
      let day = this.order_appoints.meeting_date.slice(8);
      let today = day;
      return today;
    },
     dated_orders() {
      let day = this.order_appoints.dated_order.slice(8);
      let today = day;
      return today;
    },

    meeting_month() {
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
      let month =
        monthNames[parseInt(this.order_appoints.meeting_date.slice(3, 5))];
      let today = month;
      return today;
    },
    dated_order_month() {
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
      let month =
        monthNames[parseInt(this.order_appoints.dated_order.slice(3, 5))];
      let today = month;
      return today;
    },

    meeting_year() {   
      let year = this.order_appoints.meeting_date.slice(0, 4);
      let years = parseInt(year)+543;
      let today = years;
      return today;
    },
    dated_order_year() {   
      let year = this.order_appoints.dated_order.slice(0, 4);
      let years = parseInt(year)+543;
      let today = years;
      return today;
    }
  }
};
</script>
<style>
@import url(https://fonts.googleapis.com/css?family=Prompt:400,300|Roboto:400,300&subset=latin,thai);

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
