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
          class="title elevation-0 mr-2"
          color="grey darken-1"
          x-large
        >
          <v-icon>mdi-file-word</v-icon>&nbsp; Export to Word
        </v-btn>
        <v-btn
          @click.stop="exportToExcel('exportContent', 'excel-content')"
          class="title elevation-0"
          color="grey darken-1"
          x-large
        >
          <v-icon>mdi-file-excel</v-icon>&nbsp; Export to excel
        </v-btn>
      </v-toolbar-items>
    </v-system-bar>

    <div id="exportContent" style="mso-page-orientation: landscape;">
      <div class="page">
        <div align="center">
          <div class="head">
            เอกสารประกอบการพิจารณาการย้ายสายการสอน ครั้งที่ {{ time_result }}/{{
              year_result
            }}
          </div>
        </div>
        <table class="table" border="1" width="100%" align="center">
          <tr>
            <td width="5%" class="bold16" rowspan="2" align="center">ที่</td>
            <td width="40%" class="bold16" colspan="2" align="center">
              สถานศึกษาที่ต้องการย้ายไป
            </td>
            <td width="55%" class="bold16" colspan="12" align="center">
              ข้อมูลผู้เสนอย้าย
            </td>
          </tr>
          <tr>
            <td width="10%" class="regular16 pa-1" align="center">สถานศึกษา</td>
            <td width="10%" class="regular16 pa-1" align="center">
              เลขที่ตำแหน่งว่าง
            </td>
            <td width="10%" class="regular16 pa-1" align="center">
              ชื่อ-นามสกุล
            </td>
            <td width="5%" class="regular16 pa-1" align="center">
              เลขที่ตำแหน่งเดิม
            </td>
            <td width="10%" class="regular16 pa-1" align="center">สังกัด</td>
            <td width="10%" class="regular16 pa-1" align="center">สาขา</td>
            <td width="5%" class="regular16 pa-1" align="center">ลำดับที่</td>
            <td width="5%" class="regular16 pa-1" align="center">
              เปิดรับ/ไม่เปิดรับ
            </td>
            <td width="5%" class="regular16 pa-1" align="center">ช่วยราชการ</td>
            <td width="5%" class="regular16 pa-1" align="center">
              ความคิดเห็น ผอ.
            </td>
            <td width="5%" class="regular16 pa-1" align="center">
             สถานะซ้ำ
            </td>
            <td width="20%" class="regular16 pa-1" align="center">เหตุผล</td>
          </tr>

          <tr v-for="(item, index) in process_transfers" :key="item.id_cts">
            <td class="regular16" align="center">{{ index + 1 }}</td>
            <td class="regular16 pa-1" align="center">
              {{ item.college_name }}
            </td>
            <td class="regular16 pa-1" align="center">
              {{ item.id_man_power }}
            </td>
            <td class="regular16 pa-1" align="center">
              {{ item.personnel_name }}
            </td>

            <td class="regular16 pa-1" align="center">
              {{ item.id_position }}
            </td>
            <td class="regular16 pa-1" align="center">
              {{ item.college_name_now }}
            </td>

            <td class="regular16 pa-1" align="left">
              {{ item.id_branch_tran }} : {{ item.name_branch }}
            </td>
            <td class="regular16 pa-1" align="center">{{ item.sequence_n }}</td>
            <td class="regular16 pa-1" align="center">
              <v-chip
                v-if="item.status_position === item.id_branch_tran"
                color="green"
                dark
              >
                เปิดรับ
              </v-chip>
              <v-chip v-else color="red" dark>
                ไม่เปิดรับ
              </v-chip>
            </td>
            <td class="regular16 pa-1" align="center">
              <v-chip
                v-if="item.service_status === 'not_service'"
                color="green"
                dark
              >
                ปกติ
              </v-chip>
              <v-chip v-else color="red" dark>
                ช่วยราชการ
              </v-chip>
            </td>
            <td class="regular16 pa-1" align="center">
              <v-chip v-if="item.comment_dr_c === 'suspend'" color="red" dark>
                ระงับย้าย
              </v-chip>
              <v-chip
                v-else-if="item.comment_dr_c === 'inapprop'"
                color="warning"
                dark
              >
                ไม่เห็นควร
              </v-chip>
              <v-chip
                v-else-if="item.comment_dr_c === 'approp'"
                color="green"
                dark
              >
                เห็นควร
              </v-chip>
            </td>
            <td>
              {{ item.check_loop }}
            </td>
            <td class="regular16 pa-1" align="left">{{ item.reason }}</td>
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
    process_transfers: [],
    valid: true
  }),

  async mounted() {
    await this.searchTimeYear();
  },

  methods: {
    async searchTimeYear() {
      this.loading = true;
      let result = await this.$http
        .post("process_transfer.php", {
          ApiKey: this.ApiKey,
          time_s: this.time_result,
          year_s: this.year_result,
          name_position: this.type_result
        })
        .finally(() => (this.loading = false));
      this.process_transfers = result.data;
      console.log(this.time_result);
      console.log(this.year_result);
      console.log(this.type_result);
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
    },

    exportToExcel(element, filename) {
      var preHtml =
        "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Excel</title></head><body>";
      var postHtml = "</body></html>";
      var html =
        preHtml + document.getElementById(element).innerHTML + postHtml;

      var blob = new Blob(["\ufeff", html], {
        type: "application/msexcel"
      });

      // Specify link url
      var url =
        "data:application/vnd.ms-excel;charset=utf-8," +
        encodeURIComponent(html);

      // Specify file name
      filename = filename ? filename + ".xls" : "document.xls";

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
    time_result() {
      let result = window.location.href;
      let split_s = result.split("/");
      return split_s[7];
    },

    year_result() {
      let result = window.location.href;
      let split_s = result.split("/");

      return split_s[8];
    },

    type_result() {
      let result = window.location.href;
      let split_s = result.split("/");
      let type_r = split_s[9];
      if (type_r == "teach") {
        type_r = "ครู";
      } else {
        type_r = "บริหาร";
      }
      return type_r;
    }
  }
};
</script>
<style>
@import url(  https://fonts.googleapis.com/css?family=Prompt:400,300|Roboto:400,300&subset=latin,thai);

body {
  font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
  font-size: 16px;
  font-weight: 250;
}

.textAlignVer {
  display: block;
  filter: flipv fliph;
  -webkit-transform: rotate(-90deg);
  -moz-transform: rotate(-90deg);
  transform: rotate(-90deg);
  position: relative;
  width: 20px;
  white-space: nowrap;
  font-size: 14px;
  margin-bottom: 5;
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
  width: 42cm;
  min-height: 29.7cm;
  border: 1px #d3d3d3 solid;
  border-radius: 5px;
  background: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  margin-top: 0cm;
  margin-right: auto;
  margin-bottom: 0cm;
  margin-left: auto;
  padding-top: 0.5cm;
  padding-right: 0.5cm;
  padding-bottom: 0.5cm;
  padding-left: 0.5cm;
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
