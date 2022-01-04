<template>
  <v-app>
    <v-system-bar>
      <v-toolbar-items class="ml-5">
        <v-btn href="javascript:window.print()" class="title elevation-0 mr-2" color="grey darken-1">
          <v-icon>fa-print</v-icon>&nbsp; พิมพ์
        </v-btn>
        <v-btn @click.stop="Export2Doc('exportContent','word-content')" class="title elevation-0" color="grey darken-1">
          <v-icon>fa-file-word</v-icon>&nbsp; Export to Word
        </v-btn>
      </v-toolbar-items>
    </v-system-bar>
 test
  </v-app>
</template>

<script>
  export default {
    data: () => ({

    }),
    methods: {
      Export2Doc(element, filename) {
        var preHtml =
          "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>"
        var postHtml = "</body></html>"
        var html = preHtml + document.getElementById(element).innerHTML + postHtml

        var blob = new Blob(['\ufeff', html], {
          type: 'application/msword'
        })

        // Specify link url
        var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html)

        // Specify file name
        filename = filename ? filename + '.doc' : 'document.doc'

        // Create download link element
        var downloadLink = document.createElement("a")

        document.body.appendChild(downloadLink)

        if (navigator.msSaveOrOpenBlob) {
          navigator.msSaveOrOpenBlob(blob, filename)
        } else {
          // Create a link to the file
          downloadLink.href = url

          // Setting the file name
          downloadLink.download = filename

          //triggering the function
          downloadLink.click()
        }

        document.body.removeChild(downloadLink)
      },
    },
    props: {
      source: String
    }
  }

</script>

<style>
  @import url(https://fonts.googleapis.com/css?family=Prompt:400,300|Roboto:400,300&subset=latin,thai);

  body {
    font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
    font-size: 18pt;
    font-weight: 300;
  }

  * {
    font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
  }

  table {
    border-top-width: 1px;
    border-right-width: 1px;
    border-bottom-width: 1px;
    border-left-width: 1px;
    border-top-style: solid;
    border-right-style: solid;
    border-bottom-style: solid;
    border-left-style: solid;
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
    padding: 3px;
    height: initial;
    border: solid thin black;
  }

  tfoot td {
    font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
    font-weight: bold;
    border: solid thin black;
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
    font-size: 18pt;
    width: 21cm;
    min-height: 29.7cm;
    border: 1px #D3D3D3 solid;
    border-radius: 5px;
    background: white;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    margin-top: 0cm;
    margin-right: auto;
    margin-bottom: 0cm;
    margin-left: auto;
    padding-top: 2.54cm;
    padding-right: 2cm;
    padding-bottom: 2cm;
    padding-left: 2.54cm;
  }

  .head {
    font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
    font-size: 20pt;
    font-weight: bold;
  }

  .regular12 {
    font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
    font-size: 14pt;
  }

  .regular14 {
    font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
    font-size: 16pt;
  }

  .regular16 {
    font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
    font-size: 18pt;
  }

  .bold12 {
    font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
    font-size: 14pt;
    font-weight: bold;
  }

  .bold14 {
    font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
    font-size: 16pt;
    font-weight: bold;
  }

  .bold16 {
    font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
    font-size: 18pt;
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
    font-size: 20pt;
    font-weight: bold;
  }
  .blackBold20 {
    font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
    font-size: 22pt;
    font-weight: bold;
  }
  .blackBold22 {
    font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
    font-size: 24pt;
    font-weight: bold;
  }
  .blackBold28 {
    font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
    font-size: 30pt;
    font-weight: bold;
  }
  .blackBold36 {
    font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
    font-size: 38pt;
    font-weight: bold;
  }

  /*.subpage {
    height: 247mm;
  }*/

  .BlackBold10 {
    font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
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

  @page {
    size: A4;
    margin: 2.54cm 2cm 2cm 2.54cm;
  }

  @media print {
      .page {
    font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
    font-size: 20pt;
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
    font-size: 22pt;
    font-weight: bold;
  }

  .regular12 {
    font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
    font-size: 16pt;
  }

  .regular16 {
    font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
    font-size: 20pt;
  }

  .bold16 {
    font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
    font-size: 20pt;
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
    font-size: 22pt;
    font-weight: bold;
  }

  .blackBold20 {
    font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
    font-size: 22pt;
    font-weight: bold;
  }
  .blackBold22 {
    font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
    font-size: 24pt;
    font-weight: bold;
  }
  .blackBold28 {
    font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
    font-size: 30pt;
    font-weight: bold;
  }
  .blackBold36 {
    font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
    font-size: 38pt;
    font-weight: bold;
  }
  /*.subpage {
    height: 247mm;
  }*/

  .BlackBold10 {
    font-family: "TH SarabunIT๙", "TH SarabunPSK", "Angsana New", AngsanaUPC;
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
