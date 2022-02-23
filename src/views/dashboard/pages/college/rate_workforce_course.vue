<template>
  <div>
    <v-bottom-navigation
      :value="value"
      color="info"
      horizontal
      v-model="value"
      :background-color="color"
      dark
    >
      <v-btn to="/college/rate_workforce">
        <span>ข้อมูลทั่วไป </span>
        <v-icon>mdi-history</v-icon>
      </v-btn>
    </v-bottom-navigation>

    <v-container id="upgrade" fluid tag="section" class="text_google">
      <v-row>
        <v-col cols="12" md="12">
          <base-material-card color="primary">
            <template v-slot:heading>
              <h3 class="h1 font-weight-light text_google">
                <v-icon large left>mdi-file-send</v-icon>ข้อมูลนักเรียน นักศึกษา
              </h3>
            </template>

            <v-row>
              <v-col cols="12" md="12">
                <v-card class="mx-auto pa-5">
                  <base-material-card
                    icon="mdi-clipboard-text"
                    title="ข้อมูลนักเรียน นักศึกษา หมวดวิชา"
                    class="px-5 py-3 text_google"
                  >
                    <v-row>
                      <v-col cols="12" md="6" class="text-center">
                        <v-alert dense type="info">
                          <h2>{{ course_name(url_result) }}</h2></v-alert
                        >
                      </v-col>
                      <v-col cols="12" md="6" class="text-right">
                        <v-select
                          v-model="years_select"
                          :items="year_s"
                          item-value="year_s"
                          @change="rate_work_g_search()"
                          label="เลือกปี : เพื่อแสดงข้อมูล"
                        >
                        </v-select>
                      </v-col>
                      <v-row class="mb-8" justify="center" no-gutters>
                        <v-col md="8">
                          <v-card class="pa-2" outlined tile>
                            <v-form ref="addrate_work_gform" lazy-validation>
                              <v-layout wrap>
                                <v-flex md12>
                                  <v-row>
                                    <v-col
                                      cols="12"
                                      md="4"
                                      sm="4"
                                      justify="center"
                                      align="left"
                                    >
                                      <v-alert
                                        border="right"
                                        colored-border
                                        type="info"
                                        elevation="2"
                                      >
                                        <h3>1.สาขาวิชาซ่างยนต์</h3></v-alert
                                      >
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                        label="ปวช. 1 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                        label="ปวช. 2 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                       label="ปวช. 3 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>                                   

                                    <v-col cols="12" md="2" sm="2">
                                      <v-alert
                                        border="left"
                                        colored-border
                                        type="info"
                                        elevation="2"
                                      >
                                      รวม :
                                      </v-alert>
                                    </v-col>

                                    <v-col
                                      cols="12"
                                      md="4"
                                      sm="4"
                                      justify="center"
                                      align="left"
                                    >
                                      <v-alert
                                        border="right"
                                        colored-border
                                        type="info"
                                        elevation="2"
                                      >
                                        <h3>2.สาขาวิชาช่างกลโรงงาน</h3></v-alert
                                      >
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                        label="ปวช. 1 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                        label="ปวช. 2 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                       label="ปวช. 3 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-alert
                                        border="left"
                                        colored-border
                                        type="info"
                                        elevation="2"
                                      >
                                      รวม :
                                      </v-alert>
                                    </v-col>

                                    <v-col
                                      cols="12"
                                      md="4"
                                      sm="4"
                                      justify="center"
                                      align="left"
                                    >
                                      <v-alert
                                        border="right"
                                        colored-border
                                        type="info"
                                        elevation="2"
                                      >
                                        <h3>
                                          3.สาขาวิซาช่างเชื่อมโลหะ
                                        </h3></v-alert
                                      >
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                        label="ปวช. 1 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                        label="ปวช. 2 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                       label="ปวช. 3 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-alert
                                        border="left"
                                        colored-border
                                        type="info"
                                        elevation="2"
                                      >
                                      รวม :
                                      </v-alert>
                                    </v-col>

                                    <v-col
                                      cols="12"
                                      md="4"
                                      sm="4"
                                      justify="center"
                                      align="left"
                                    >
                                      <v-alert
                                        border="right"
                                        colored-border
                                        type="info"
                                        elevation="2"
                                      >
                                        <h3>
                                          4.สาขาวิชาช่างไฟฟ้ากำลัง :
                                        </h3></v-alert
                                      >
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                        label="ปวช. 1 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                        label="ปวช. 2 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                       label="ปวช. 3 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-alert
                                        border="left"
                                        colored-border
                                        type="info"
                                        elevation="2"
                                      >
                                      รวม :
                                      </v-alert>
                                    </v-col>

                                    <v-col
                                      cols="12"
                                      md="4"
                                      sm="4"
                                      justify="center"
                                      align="left"
                                    >
                                      <v-alert
                                        border="right"
                                        colored-border
                                        type="info"
                                        elevation="2"
                                      >
                                        <h3>
                                          5.สาขาวิชาช่างซ่อมบำรุงเรือ :
                                        </h3></v-alert
                                      >
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                        label="ปวช. 1 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                        label="ปวช. 2 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                       label="ปวช. 3 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-alert
                                        border="left"
                                        colored-border
                                        type="info"
                                        elevation="2"
                                      >
                                      รวม :
                                      </v-alert>
                                    </v-col>

                                    <v-col
                                      cols="12"
                                      md="4"
                                      sm="4"
                                      justify="center"
                                      align="left"
                                    >
                                      <v-alert
                                        border="right"
                                        colored-border
                                        type="info"
                                        elevation="2"
                                      >
                                        <h3>6.สาขาวิชาช่างก่อสร้าง</h3></v-alert
                                      >
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                        label="ปวช. 1 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                        label="ปวช. 2 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                       label="ปวช. 3 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-alert
                                        border="left"
                                        colored-border
                                        type="info"
                                        elevation="2"
                                      >
                                      รวม :
                                      </v-alert>
                                    </v-col>

                                    <v-col
                                      cols="12"
                                      md="4"
                                      sm="4"
                                      justify="center"
                                      align="left"
                                    >
                                      <v-alert
                                        border="right"
                                        colored-border
                                        type="info"
                                        elevation="2"
                                      >
                                        <h3>
                                          7.สาขาวิชาช่างเครื่องเรือนและตกแต่งภายใน
                                          :
                                        </h3></v-alert
                                      >
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                        label="ปวช. 1 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                        label="ปวช. 2 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                       label="ปวช. 3 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-alert
                                        border="left"
                                        colored-border
                                        type="info"
                                        elevation="2"
                                      >
                                      รวม :
                                      </v-alert>
                                    </v-col>

                                    <v-col
                                      cols="12"
                                      md="4"
                                      sm="4"
                                      justify="center"
                                      align="left"
                                    >
                                      <v-alert
                                        border="right"
                                        colored-border
                                        type="info"
                                        elevation="2"
                                      >
                                        <h3>
                                          8.สาขาวิชาสถาปัตยกรรม :
                                        </h3></v-alert
                                      >
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                        label="ปวช. 1 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                        label="ปวช. 2 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                       label="ปวช. 3 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-alert
                                        border="left"
                                        colored-border
                                        type="info"
                                        elevation="2"
                                      >
                                      รวม :
                                      </v-alert>
                                    </v-col>

                                    <v-col
                                      cols="12"
                                      md="4"
                                      sm="4"
                                      justify="center"
                                      align="left"
                                    >
                                      <v-alert
                                        border="right"
                                        colored-border
                                        type="info"
                                        elevation="2"
                                      >
                                        <h3>9.สาขาวิชาสำรวจ :</h3></v-alert
                                      >
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                        label="ปวช. 1 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                        label="ปวช. 2 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                       label="ปวช. 3 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-alert
                                        border="left"
                                        colored-border
                                        type="info"
                                        elevation="2"
                                      >
                                      รวม :
                                      </v-alert>
                                    </v-col>

                                    <v-col
                                      cols="12"
                                      md="4"
                                      sm="4"
                                      justify="center"
                                      align="left"
                                    >
                                      <v-alert
                                        border="right"
                                        colored-border
                                        type="info"
                                        elevation="2"
                                      >
                                        <h3>10.สาขาวิชาโยธา :</h3></v-alert
                                      >
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                        label="ปวช. 1 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                        label="ปวช. 2 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                       label="ปวช. 3 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-alert
                                        border="left"
                                        colored-border
                                        type="info"
                                        elevation="2"
                                      >
                                      รวม :
                                      </v-alert>
                                    </v-col>

                                    <v-col
                                      cols="12"
                                      md="4"
                                      sm="4"
                                      justify="center"
                                      align="left"
                                    >
                                      <v-alert
                                        border="right"
                                        colored-border
                                        type="info"
                                        elevation="2"
                                      >
                                        <h3>11.สาขาวิชาช่างพิมพ์ :</h3></v-alert
                                      >
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                        label="ปวช. 1 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                        label="ปวช. 2 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                       label="ปวช. 3 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-alert
                                        border="left"
                                        colored-border
                                        type="info"
                                        elevation="2"
                                      >
                                      รวม :
                                      </v-alert>
                                    </v-col>

                                    <v-col
                                      cols="12"
                                      md="4"
                                      sm="4"
                                      justify="center"
                                      align="left"
                                    >
                                      <v-alert
                                        border="right"
                                        colored-border
                                        type="info"
                                        elevation="2"
                                      >
                                        <h3>
                                          12.สาขาวิชาเทคนิคแว่นตาและเลนส์
                                        </h3></v-alert
                                      >
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                        label="ปวช. 1 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                        label="ปวช. 2 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                       label="ปวช. 3 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-alert
                                        border="left"
                                        colored-border
                                        type="info"
                                        elevation="2"
                                      >
                                      รวม :
                                      </v-alert>
                                    </v-col>

                                    <v-col
                                      cols="12"
                                      md="4"
                                      sm="4"
                                      justify="center"
                                      align="left"
                                    >
                                      <v-alert
                                        border="right"
                                        colored-border
                                        type="info"
                                        elevation="2"
                                      >
                                        <h3>
                                          13.สาขาวิชาเครื่องกลเกษตร :
                                        </h3></v-alert
                                      >
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                        label="ปวช. 1 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                        label="ปวช. 2 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                       label="ปวช. 3 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-alert
                                        border="left"
                                        colored-border
                                        type="info"
                                        elevation="2"
                                      >
                                      รวม :
                                      </v-alert>
                                    </v-col>

                                    <v-col
                                      cols="12"
                                      md="4"
                                      sm="4"
                                      justify="center"
                                      align="left"
                                    >
                                      <v-alert
                                        border="right"
                                        colored-border
                                        type="info"
                                        elevation="2"
                                      >
                                        <h3>
                                          14.สาขาวิชาช่างอิเล็กทรอนิกส์ :
                                        </h3></v-alert
                                      >
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                        label="ปวช. 1 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                        label="ปวช. 2 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                       label="ปวช. 3 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-alert
                                        border="left"
                                        colored-border
                                        type="info"
                                        elevation="2"
                                      >
                                      รวม :
                                      </v-alert>
                                    </v-col>

                                    <v-col
                                      cols="12"
                                      md="4"
                                      sm="4"
                                      justify="center"
                                      align="left"
                                    >
                                      <v-alert
                                        border="right"
                                        colored-border
                                        type="info"
                                        elevation="2"
                                      >
                                        <h3>
                                          15.สาขาวิชาช่างโทรคมนาคม :
                                        </h3></v-alert
                                      >
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                        label="ปวช. 1 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                        label="ปวช. 2 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                       label="ปวช. 3 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-alert
                                        border="left"
                                        colored-border
                                        type="info"
                                        elevation="2"
                                      >
                                      รวม :
                                      </v-alert>
                                    </v-col>

                                    <v-col
                                      cols="12"
                                      md="4"
                                      sm="4"
                                      justify="center"
                                      align="left"
                                    >
                                      <v-alert
                                        border="right"
                                        colored-border
                                        type="info"
                                        elevation="2"
                                      >
                                        <h3>
                                          16.สาขาวิชาเมคคาทรอนิกส์ :
                                        </h3></v-alert
                                      >
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                        label="ปวช. 1 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                        label="ปวช. 2 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                       label="ปวช. 3 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-alert
                                        border="left"
                                        colored-border
                                        type="info"
                                        elevation="2"
                                      >
                                      รวม :
                                      </v-alert>
                                    </v-col>

                                    <v-col
                                      cols="12"
                                      md="4"
                                      sm="4"
                                      justify="center"
                                      align="left"
                                    >
                                      <v-alert
                                        border="right"
                                        colored-border
                                        type="info"
                                        elevation="2"
                                      >
                                        <h3>
                                          17.สาขาวิชาช่างเครื่องมือวัดและควบคุม
                                          :
                                        </h3></v-alert
                                      >
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                        label="ปวช. 1 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                        label="ปวช. 2 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                       label="ปวช. 3 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-alert
                                        border="left"
                                        colored-border
                                        type="info"
                                        elevation="2"
                                      >
                                      รวม :
                                      </v-alert>
                                    </v-col>

                                    <v-col
                                      cols="12"
                                      md="4"
                                      sm="4"
                                      justify="center"
                                      align="left"
                                    >
                                      <v-alert
                                        border="right"
                                        colored-border
                                        type="info"
                                        elevation="2"
                                      >
                                        <h3>
                                          18.สาขาวิชาช่างเทคนิคคอมพิวเตอร์ :
                                        </h3></v-alert
                                      >
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                        label="ปวช. 1 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                        label="ปวช. 2 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                       label="ปวช. 3 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-alert
                                        border="left"
                                        colored-border
                                        type="info"
                                        elevation="2"
                                      >
                                      รวม :
                                      </v-alert>
                                    </v-col>

                                    <v-col
                                      cols="12"
                                      md="4"
                                      sm="4"
                                      justify="center"
                                      align="left"
                                    >
                                      <v-alert
                                        border="right"
                                        colored-border
                                        type="info"
                                        elevation="2"
                                      >
                                        <h3>
                                          19.สาขาวิชาอุตสาหกรรมยาง :
                                        </h3></v-alert
                                      >
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                        label="ปวช. 1 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                        label="ปวช. 2 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                       label="ปวช. 3 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-alert
                                        border="left"
                                        colored-border
                                        type="info"
                                        elevation="2"
                                      >
                                      รวม :
                                      </v-alert>
                                    </v-col>

                                    <v-col
                                      cols="12"
                                      md="4"
                                      sm="4"
                                      justify="center"
                                      align="left"
                                    >
                                      <v-alert
                                        border="right"
                                        colored-border
                                        type="info"
                                        elevation="2"
                                      >
                                        <h3>
                                          20.สายาวิซาเทคโนโลยีฟอกหนัง :
                                        </h3></v-alert
                                      >
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                        label="ปวช. 1 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                        label="ปวช. 2 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                       label="ปวช. 3 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-alert
                                        border="left"
                                        colored-border
                                        type="info"
                                        elevation="2"
                                      >
                                      รวม :
                                      </v-alert>
                                    </v-col>

                                    <v-col
                                      cols="12"
                                      md="4"
                                      sm="4"
                                      justify="center"
                                      align="left"
                                    >
                                      <v-alert
                                        border="right"
                                        colored-border
                                        type="info"
                                        elevation="2"
                                      >
                                        <h3>
                                          21.สาขาวิชาช่างเขียนแบบเครื่องกล :
                                        </h3></v-alert
                                      >
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                        label="ปวช. 1 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                        label="ปวช. 2 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                       label="ปวช. 3 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-alert
                                        border="left"
                                        colored-border
                                        type="info"
                                        elevation="2"
                                      >
                                      รวม :
                                      </v-alert>
                                    </v-col>

                                    <v-col
                                      cols="12"
                                      md="4"
                                      sm="4"
                                      justify="center"
                                      align="left"
                                    >
                                      <v-alert
                                        border="right"
                                        colored-border
                                        type="info"
                                        elevation="2"
                                      >
                                        <h3>
                                          22.สาขาวิชาช่างซ่อมบำรุง :
                                        </h3></v-alert
                                      >
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                        label="ปวช. 1 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                        label="ปวช. 2 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                       label="ปวช. 3 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-alert
                                        border="left"
                                        colored-border
                                        type="info"
                                        elevation="2"
                                      >
                                      รวม :
                                      </v-alert>
                                    </v-col>

                                    <v-col
                                      cols="12"
                                      md="4"
                                      sm="4"
                                      justify="center"
                                      align="left"
                                    >
                                      <v-alert
                                        border="right"
                                        colored-border
                                        type="info"
                                        elevation="2"
                                      >
                                        <h3>
                                          23.สาขาวิชาช่างต่อเรือ :
                                        </h3></v-alert
                                      >
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                        label="ปวช. 1 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                        label="ปวช. 2 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                       label="ปวช. 3 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-alert
                                        border="left"
                                        colored-border
                                        type="info"
                                        elevation="2"
                                      >
                                      รวม :
                                      </v-alert>
                                    </v-col>

                                    <v-col
                                      cols="12"
                                      md="4"
                                      sm="4"
                                      justify="center"
                                      align="left"
                                    >
                                      <v-alert
                                        border="right"
                                        colored-border
                                        type="info"
                                        elevation="2"
                                      >
                                        <h3>
                                          24.สาขาวิชาช่างเครื่องทำความเย็นและปรับอากาศ
                                          :
                                        </h3></v-alert
                                      >
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                        label="ปวช. 1 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                        label="ปวช. 2 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="2" sm="2">
                                      <v-text-field
                                        v-model="
                                          addrate_work_g.rate_work_g_sedr
                                        "
                                        dense
                                        filled
                                        type="number"
                                       label="ปวช. 3 : "
                                        clearable
                                        request
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="2" sm="2">
                                      <v-alert
                                        border="left"
                                        colored-border
                                        type="info"
                                        elevation="2"
                                      >
                                      รวม :
                                      </v-alert>
                                    </v-col>

                                    <v-col cols="12" md="12" class="text-center">
                                      <v-alert
                                        border="bottom"
                                        colored-border
                                        type="warning"
                                        elevation="2"
                                      >
                                        <h2>
                                          รวม ปวช.1 : 
                                          รวม ปวช.2 : 
                                          รวม ปวช.3 : 
                                          รวม ทั้งสิ้น : 
                                          {{ addrate_work_g.sumall }}
                                        </h2></v-alert
                                      >
                                    </v-col>
                                  </v-row>
                                </v-flex>
                              </v-layout>
                              <v-spacer></v-spacer>
                              <v-row>
                                <v-col cols="12" md="12" class="text-right">
                                  <v-btn
                                    large
                                    color="warning"
                                    @click.stop="addrate_work_gSubmit()"
                                    rounded
                                  >
                                    <v-icon dark>mdi-pencil</v-icon
                                    >&nbsp;&nbsp;แก้ไข</v-btn
                                  >
                                </v-col>
                              </v-row>
                            </v-form>
                          </v-card>
                        </v-col>
                      </v-row>
                    </v-row>
                  </base-material-card>
                </v-card>
              </v-col>
              <v-col cols="12" md="12">
                <v-row>
                  <v-col cols="12" md="12">
                    <v-card class="mb-4 pa-2">
                      <v-data-table
                        color="success"
                        :loading="loading"
                        :headers="headers_rate_work_gs"
                        :items="rate_work_g_all"
                        :search="search"
                      >
                        <v-alert
                          slot="no-results"
                          :value="true"
                          color="error"
                          icon="mdi-alert"
                          >ไม่พบผลลัพธ์ "{{ search }}"
                          ที่คุณกำลังค้นหา.</v-alert
                        >
                      </v-data-table>
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </base-material-card>
        </v-col>
      </v-row>

      <!--addrate_work_collegedialog  -->
      <v-layout row justify-center>
        <v-dialog
          v-model="addrate_work_collegedialog"
          persistent
          max-width="50%"
          overlay-opacity="0.6"
        >
          <v-card class="mx-auto pa-5">
            <base-material-card
              icon="mdi-clipboard-text"
              title="เพิ่มข้อมูล"
              class="px-5 py-3 text_google"
            ></base-material-card>
            <v-card-text class="text_google">
              <v-form ref="addrate_work_collegeform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md12>
                      <v-row>
                        <v-col cols="12" md="12">
                          <v-autocomplete
                            v-model="addrate_work_college.rate_work_course_id"
                            :items="rate_work_course_ids"
                            item-text="text"
                            item-value="value"
                            dense
                            label="ระดับผลงาน : "
                            request
                            :rules="[v => !!v || '']"
                          ></v-autocomplete>
                        </v-col>
                      </v-row>
                    </v-flex>
                  </v-layout>
                  <v-spacer></v-spacer>
                  <v-row>
                    <v-col cols="12" md="12" class="text-right">
                      <v-btn
                        large
                        color="success"
                        @click.stop="addrate_work_collegeSubmit()"
                        rounded
                      >
                        <v-icon dark>mdi-content-save</v-icon
                        >&nbsp;&nbsp;บันทึก</v-btn
                      >
                      <v-btn
                        large
                        color="warning"
                        @click.stop="addrate_work_collegedialog = false"
                        rounded
                      >
                        <v-icon dark>mdi-close</v-icon>ยกเลิก
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model deleterate_work_collegedialog -->
      <v-layout>
        <v-dialog
          v-model="deleterate_work_collegedialog"
          persistent
          max-width="40%"
        >
          <v-card class="mx-auto pa-5">
            <base-material-card
              color="error"
              icon="mdi-delete"
              title="ลบข้อมูล"
              class="px-5 py-3 text_google"
            ></base-material-card>
            <v-card-text class="text_google">
              <v-form ref="deleterate_work_collegeform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12>
                      ยืนยันการลบข้อมูล :
                      <v-alert
                        border="right"
                        colored-border
                        type="info"
                        elevation="2"
                      >
                        <h3>
                          {{ editrate_work_college.rate_work_college_id }}
                        </h3></v-alert
                      >
                      <v-alert
                        border="right"
                        colored-border
                        type="info"
                        elevation="2"
                      >
                        <h3>
                          {{ editrate_work_college.rate_work_course_id }}
                        </h3></v-alert
                      >
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn large @click.stop="deleterate_work_collegedialog = false">
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn
                large
                color="red darken-3"
                @click.stop="deleterate_work_collegeubmit()"
                dark
              >
                <v-icon dark>mdi-delete</v-icon>&nbsp;ลบ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model editrate_work_collegedialog -->
      <v-layout row justify-center>
        <v-dialog
          v-model="editrate_work_collegedialog"
          persistent
          max-width="50%"
        >
          <v-card class="mx-auto pa-5">
            <base-material-card
              color="yellow"
              icon="mdi-clipboard-text"
              title="แก้ไขข้อมูล"
              class="px-5 py-3 text_google"
            ></base-material-card>
            <v-card-text>
              <v-form ref="editrate_work_collegeform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md12>
                      <v-row>
                        <v-col cols="12" md="12">
                          <v-autocomplete
                            v-model="editrate_work_college.rate_work_course_id"
                            :items="rate_work_course_ids"
                            item-text="text"
                            item-value="value"
                            dense
                            label="ระดับผลงาน : "
                            request
                            :rules="[v => !!v || '']"
                          ></v-autocomplete>
                        </v-col>
                      </v-row>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                large
                @click.stop="editrate_work_collegedialog = false"
                rounded
              >
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn
                large
                color="warning"
                @click.stop="editrate_work_collegeSubmit()"
                rounded
              >
                <v-icon dark>mdi-pencil</v-icon>&nbsp;แก้ไขข้อมูล
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
            <v-btn
              color="red"
              text
              v-bind="attrs"
              @click="snackbar.show = false"
              >Close</v-btn
            >
          </template>
        </v-snackbar>
      </v-container>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      ApiKey: "HRvec2021",
      rate_work_colleges: [],
      years_select: "2565",
      search_course: "",
      search: "",
      year_s: [2565, 2566, 2567, 2568, 2569, 2570],
      addrate_work_collegedialog: false,
      editrate_work_collegedialog: false,
      deleterate_work_collegedialog: false,
      addrate_work_gdialog: false,
      addrate_work_college: {},
      editrate_work_college: [],
      addrate_work_college: [],
      addrate_work_g: {},
      addrate_work_g_data: {},
      editrate_work_g_data: {},
      rate_work_g_all: [],
      rate_work_gs: [],
      snackbar: {
        show: false,
        color: "",
        timeout: 5000,
        icon: "",
        text: ""
      },
      headers: [
        { text: "#", align: "center", value: "index" },
        {
          text: "รหัสวิทยาลัย",
          align: "center",
          value: "rate_work_college_code"
        },
        { text: "รหัสหมวดวิชา", align: "center", value: "rate_work_course_id" },
        { text: "วันที่ข้อมูล", align: "center", value: "update_time" },
        {
          text: "รายงานจำนวนนักเรียนนักศึกษา",
          align: "center",
          value: "reports"
        },
        {
          text: "ยกเลิกรายการ",
          align: "center",
          value: "actions"
        }
      ],

      headers_rate_work_gs: [
        { text: "ปี", align: "center", value: "rate_work_g_year" },
        { text: "ผอ.", align: "center", value: "rate_work_g_dr" },
        { text: "รอง.ผอ.", align: "center", value: "rate_work_g_sedr" },
        { text: "ข.สามัญ", align: "center", value: "rate_work_g_gs_ta" },
        { text: "อ.สามัญ", align: "center", value: "rate_work_g_gs_tb" },
        { text: "ข.อุตสา", align: "center", value: "rate_work_g_is_ta" },
        { text: "อ.อุตสา", align: "center", value: "rate_work_g_is_tb" },
        { text: "ข.พาณิช", align: "center", value: "rate_work_g_cm_ta" },
        { text: "อ.พาณิช", align: "center", value: "rate_work_g_cm_tb" },
        { text: "ข.ศิลป", align: "center", value: "rate_work_g_art_ta" },
        { text: "อ.ศิลป", align: "center", value: "rate_work_g_art_tb" },
        { text: "ข.คห", align: "center", value: "rate_work_g_em_ta" },
        { text: "อ.คห", align: "center", value: "rate_work_g_em_tb" },
        { text: "ข.เกษตร", align: "center", value: "rate_work_g_ag_ta" },
        { text: "อ.เกษตร", align: "center", value: "rate_work_g_ag_tb" },
        { text: "ข.ประมง", align: "center", value: "rate_work_g_fish_ta" },
        { text: "อ.ประมง", align: "center", value: "rate_work_g_fish_tb" },
        { text: "ข.ท่อง", align: "center", value: "rate_work_g_tour_ta" },
        { text: "อ.ท่อง", align: "center", value: "rate_work_g_tour_tb" },
        { text: "ข.สิ่งทอ", align: "center", value: "rate_work_g_textile_ta" },
        { text: "อ.สิ่งทอ", align: "center", value: "rate_work_g_textile_tb" },
        { text: "ข.สารสน", align: "center", value: "rate_work_g_insy_ta" },
        { text: "อ.สารสน", align: "center", value: "rate_work_g_insy_tb" },
        { text: "ข.ระยะ", align: "center", value: "rate_work_g_sc_ta" },
        { text: "อ.ระยะ", align: "center", value: "rate_work_g_sc_tb" },
        { text: "ข.สนับ", align: "center", value: "rate_work_g_sup_ta" },
        { text: "อ.สนับ", align: "center", value: "rate_work_g_sup_tb" },
        { text: "ข.ลูกจ้าง", align: "center", value: "rate_work_g_pte_ta" },
        { text: "อ.ลูกจ้าง", align: "center", value: "rate_work_g_pte_tb" },
        { text: "วันที่", align: "center", value: "rate_work_g_date_time" },

        {
          text: "ดำเนินการ",
          align: "center",
          value: "actions"
        }
      ],

      rate_work_course_ids: [
        { text: "ปวช. ประเภทวิชาอุตสาหกรรม", value: "201" },
        { text: "ปวช. ประเภทวิชาพาณิชยกรรม", value: "202" },
        { text: "ปวช. ประเภทวิชาศิลปกรรม", value: "203" },
        { text: "ปวช. ประเภทวิชาคหกรรม", value: "204" },
        { text: "ปวช. ประเภทวิชาเกษตรกรรม", value: "205" },
        { text: "ปวช. ประเภทวิชาประมง", value: "206" },
        { text: "ปวช. ประเภทวิชาอุตสาหกรรมท่องเที่ยว ", value: "207" },
        { text: "ปวช. ประเภทวิชาอุตสาหกรรมสิ่งทอ", value: "208" },
        { text: "ปวช. ประเภทวิชาเทคโนโลยีสารสนเทศและการสื่อสาร", value: "209" },
        { text: "ปวช. ประเภทวิชาอุตสาหกรรมบันเทิงและดนตรี", value: "210" },
        { text: "ปวส. ประเภทวิชาอุตสาหกรรม", value: "301" },
        { text: "ปวส. ประเภทวิชาพาณิชยกรรม", value: "302" },
        { text: "ปวส. ประเภทวิชาศิลปกรรม", value: "303" },
        { text: "ปวส. ประเภทวิชาคหกรรม", value: "304" },
        { text: "ปวส. ประเภทวิชาเกษตรกรรม", value: "305" },
        { text: "ปวส. ประเภทวิชาประมง", value: "306" },
        { text: "ปวส. ประเภทวิชาอุตสาหกรรมท่องเที่ยว ", value: "307" },
        { text: "ปวส. ประเภทวิชาอุตสาหกรรมสิ่งทอ", value: "308" },
        { text: "ปวส. ประเภทวิชาเทคโนโลยีสารสนเทศและการสื่อสาร", value: "309" },
        { text: "ปวส. ประเภทวิชาอุตสาหกรรมบันเทิงและดนตรี", value: "310" }
      ],
      year_select: [2565, 2566, 2567, 2568, 2569, 2570],

      rowsperpage: [
        25,
        50,
        100,
        {
          text: "All",
          value: -1
        }
      ],
      course_name(num) {
        var array = {
          "201": "ปวช. ประเภทวิชาอุตสาหกรรม",
          "202": "ปวช. ประเภทวิชาพาณิชยกรรม",
          "203": "ปวช. ประเภทวิชาศิลปกรรม",
          "204": "ปวช. ประเภทวิชาคหกรรม",
          "205": "ปวช. ประเภทวิชาเกษตรกรรม",
          "206": "ปวช. ประเภทวิชาประมง",
          "207": "ปวช. ประเภทวิชาอุตสาหกรรมท่องเที่ยว",
          "208": "ปวช. ประเภทวิชาอุตสาหกรรมสิ่งทอ",
          "209": "ปวช. ประเภทวิชาเทคโนโลยีสารสนเทศและการสื่อสาร",
          "210": "ปวช. ประเภทวิชาอุตสาหกรรมบันเทิงและดนตรี",
          "301": "ปวส. ประเภทวิชาอุตสาหกรรม",
          "302": "ปวส. ประเภทวิชาพาณิชยกรรม",
          "303": "ปวส. ประเภทวิชาศิลปกรรม",
          "304": "ปวส. ประเภทวิชาคหกรรม",
          "305": "ปวส. ประเภทวิชาเกษตรกรรม",
          "306": "ปวส. ประเภทวิชาประมง",
          "307": "ปวส. ประเภทวิชาอุตสาหกรรมท่องเที่ยว",
          "308": "ปวส. ประเภทวิชาอุตสาหกรรมสิ่งทอ",
          "309": "ปวส. ประเภทวิชาเทคโนโลยีสารสนเทศและการสื่อสาร",
          "310": "ปวส. ประเภทวิชาอุตสาหกรรมบันเทิงและดนตรี"
        };
        var str = num.toString();
        for (var val in array) {
          str = str.split(val).join(array[val]);
        }
        return str;
      }
    };
  },

  async mounted() {
    await this.rate_work_collegeQueryAll();
    await this.rate_work_gQueryAll();
    await this.rate_work_gQueryAllfull();
  },

  methods: {
    async rate_work_collegeQueryAll() {
      this.loading = true;
      let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
      let result = await this.$http
        .post("rate_work_college.php", {
          ApiKey: this.ApiKey,
          rate_work_college_code: userSession.user_name
        })
        .finally(() => (this.loading = false));
      this.rate_work_colleges = result.data;
    },

    async rate_work_gQueryAllfull() {
      this.loading = true;
      let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
      let result = await this.$http
        .post("rate_work_g.php", {
          ApiKey: this.ApiKey,
          rate_work_g_college_code: userSession.user_name
        })
        .finally(() => (this.loading = false));
      this.rate_work_g_all = result.data;
      console.log(result.data);
      console.log(userSession.user_name);
    },

    async rate_work_gQueryAll() {
      this.loading = true;
      let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
      let result = await this.$http
        .post("rate_work_g.php", {
          ApiKey: this.ApiKey,
          rate_work_g_college_code: userSession.user_name,
          rate_work_g_year: this.year_now
        })
        .finally(() => (this.loading = false));
      this.addrate_work_g = result.data;

      this.addrate_work_g.rate_work_g_dr =
        parseInt(this.addrate_work_g.rate_work_g_dr) || 0;
      this.addrate_work_g.rate_work_g_sedr =
        parseInt(this.addrate_work_g.rate_work_g_sedr) || 0;
      this.addrate_work_g.rate_work_g_gs_ta =
        parseInt(this.addrate_work_g.rate_work_g_gs_ta) || 0;
      this.addrate_work_g.rate_work_g_gs_tb =
        parseInt(this.addrate_work_g.rate_work_g_gs_tb) || 0;
      this.addrate_work_g.rate_work_g_is_ta =
        parseInt(this.addrate_work_g.rate_work_g_is_ta) || 0;
      this.addrate_work_g.rate_work_g_is_tb =
        parseInt(this.addrate_work_g.rate_work_g_is_tb) || 0;
      this.addrate_work_g.rate_work_g_cm_ta =
        parseInt(this.addrate_work_g.rate_work_g_cm_ta) || 0;
      this.addrate_work_g.rate_work_g_cm_tb =
        parseInt(this.addrate_work_g.rate_work_g_cm_tb) || 0;
      this.addrate_work_g.rate_work_g_art_ta =
        parseInt(this.addrate_work_g.rate_work_g_art_ta) || 0;
      this.addrate_work_g.rate_work_g_art_tb =
        parseInt(this.addrate_work_g.rate_work_g_art_tb) || 0;
      this.addrate_work_g.rate_work_g_em_ta =
        parseInt(this.addrate_work_g.rate_work_g_em_ta) || 0;
      this.addrate_work_g.rate_work_g_em_tb =
        parseInt(this.addrate_work_g.rate_work_g_em_tb) || 0;
      this.addrate_work_g.rate_work_g_ag_ta =
        parseInt(this.addrate_work_g.rate_work_g_ag_ta) || 0;
      this.addrate_work_g.rate_work_g_ag_tb =
        parseInt(this.addrate_work_g.rate_work_g_ag_tb) || 0;
      this.addrate_work_g.rate_work_g_fish_ta =
        parseInt(this.addrate_work_g.rate_work_g_fish_ta) || 0;
      this.addrate_work_g.rate_work_g_fish_tb =
        parseInt(this.addrate_work_g.rate_work_g_fish_tb) || 0;
      this.addrate_work_g.rate_work_g_tour_ta =
        parseInt(this.addrate_work_g.rate_work_g_tour_ta) || 0;
      this.addrate_work_g.rate_work_g_tour_tb =
        parseInt(this.addrate_work_g.rate_work_g_tour_tb) || 0;
      this.addrate_work_g.rate_work_g_textile_ta =
        parseInt(this.addrate_work_g.rate_work_g_textile_ta) || 0;
      this.addrate_work_g.rate_work_g_textile_tb =
        parseInt(this.addrate_work_g.rate_work_g_textile_tb) || 0;
      this.addrate_work_g.rate_work_g_insy_ta =
        parseInt(this.addrate_work_g.rate_work_g_insy_ta) || 0;
      this.addrate_work_g.rate_work_g_insy_tb =
        parseInt(this.addrate_work_g.rate_work_g_insy_tb) || 0;
      this.addrate_work_g.rate_work_g_sc_ta =
        parseInt(this.addrate_work_g.rate_work_g_sc_ta) || 0;
      this.addrate_work_g.rate_work_g_sc_tb =
        parseInt(this.addrate_work_g.rate_work_g_sc_tb) || 0;
      this.addrate_work_g.rate_work_g_sup_ta =
        parseInt(this.addrate_work_g.rate_work_g_sup_ta) || 0;
      this.addrate_work_g.rate_work_g_sup_tb =
        parseInt(this.addrate_work_g.rate_work_g_sup_tb) || 0;
      this.addrate_work_g.rate_work_g_pte_ta =
        parseInt(this.addrate_work_g.rate_work_g_pte_ta) || 0;
      this.addrate_work_g.rate_work_g_pte_tb =
        parseInt(this.addrate_work_g.rate_work_g_pte_tb) || 0;

      this.addrate_work_g.sumteach_a =
        this.addrate_work_g.rate_work_g_gs_ta +
        this.addrate_work_g.rate_work_g_is_ta +
        this.addrate_work_g.rate_work_g_cm_ta +
        this.addrate_work_g.rate_work_g_art_ta +
        this.addrate_work_g.rate_work_g_em_ta +
        this.addrate_work_g.rate_work_g_ag_ta +
        this.addrate_work_g.rate_work_g_fish_ta +
        this.addrate_work_g.rate_work_g_tour_ta +
        this.addrate_work_g.rate_work_g_textile_ta +
        this.addrate_work_g.rate_work_g_insy_ta +
        this.addrate_work_g.rate_work_g_sc_ta;

      this.addrate_work_g.sumteach_b =
        this.addrate_work_g.rate_work_g_gs_tb +
        this.addrate_work_g.rate_work_g_is_tb +
        this.addrate_work_g.rate_work_g_cm_tb +
        this.addrate_work_g.rate_work_g_art_tb +
        this.addrate_work_g.rate_work_g_em_tb +
        this.addrate_work_g.rate_work_g_ag_tb +
        this.addrate_work_g.rate_work_g_fish_tb +
        this.addrate_work_g.rate_work_g_tour_tb +
        this.addrate_work_g.rate_work_g_textile_tb +
        this.addrate_work_g.rate_work_g_insy_tb +
        this.addrate_work_g.rate_work_g_sc_tb;

      this.addrate_work_g.sumall =
        this.addrate_work_g.rate_work_g_dr +
        this.addrate_work_g.rate_work_g_sedr +
        this.addrate_work_g.rate_work_g_pte_ta +
        this.addrate_work_g.rate_work_g_pte_tb +
        this.addrate_work_g.sumteach_a +
        this.addrate_work_g.sumteach_b;
    },

    async rate_work_g_search() {
      this.loading = true;
      let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
      let result = await this.$http
        .post("rate_work_g.php", {
          ApiKey: this.ApiKey,
          rate_work_g_college_code: userSession.user_name,
          rate_work_g_year: this.years_select
        })
        .finally(() => (this.loading = false));
      this.addrate_work_g = result.data;
      /*  console.log(result.data);
      console.log(this.year_s); */

      this.addrate_work_g.rate_work_g_dr =
        parseInt(this.addrate_work_g.rate_work_g_dr) || 0;
      this.addrate_work_g.rate_work_g_sedr =
        parseInt(this.addrate_work_g.rate_work_g_sedr) || 0;
      this.addrate_work_g.rate_work_g_gs_ta =
        parseInt(this.addrate_work_g.rate_work_g_gs_ta) || 0;
      this.addrate_work_g.rate_work_g_gs_tb =
        parseInt(this.addrate_work_g.rate_work_g_gs_tb) || 0;
      this.addrate_work_g.rate_work_g_is_ta =
        parseInt(this.addrate_work_g.rate_work_g_is_ta) || 0;
      this.addrate_work_g.rate_work_g_is_tb =
        parseInt(this.addrate_work_g.rate_work_g_is_tb) || 0;
      this.addrate_work_g.rate_work_g_cm_ta =
        parseInt(this.addrate_work_g.rate_work_g_cm_ta) || 0;
      this.addrate_work_g.rate_work_g_cm_tb =
        parseInt(this.addrate_work_g.rate_work_g_cm_tb) || 0;
      this.addrate_work_g.rate_work_g_art_ta =
        parseInt(this.addrate_work_g.rate_work_g_art_ta) || 0;
      this.addrate_work_g.rate_work_g_art_tb =
        parseInt(this.addrate_work_g.rate_work_g_art_tb) || 0;
      this.addrate_work_g.rate_work_g_em_ta =
        parseInt(this.addrate_work_g.rate_work_g_em_ta) || 0;
      this.addrate_work_g.rate_work_g_em_tb =
        parseInt(this.addrate_work_g.rate_work_g_em_tb) || 0;
      this.addrate_work_g.rate_work_g_ag_ta =
        parseInt(this.addrate_work_g.rate_work_g_ag_ta) || 0;
      this.addrate_work_g.rate_work_g_ag_tb =
        parseInt(this.addrate_work_g.rate_work_g_ag_tb) || 0;
      this.addrate_work_g.rate_work_g_fish_ta =
        parseInt(this.addrate_work_g.rate_work_g_fish_ta) || 0;
      this.addrate_work_g.rate_work_g_fish_tb =
        parseInt(this.addrate_work_g.rate_work_g_fish_tb) || 0;
      this.addrate_work_g.rate_work_g_tour_ta =
        parseInt(this.addrate_work_g.rate_work_g_tour_ta) || 0;
      this.addrate_work_g.rate_work_g_tour_tb =
        parseInt(this.addrate_work_g.rate_work_g_tour_tb) || 0;
      this.addrate_work_g.rate_work_g_textile_ta =
        parseInt(this.addrate_work_g.rate_work_g_textile_ta) || 0;
      this.addrate_work_g.rate_work_g_textile_tb =
        parseInt(this.addrate_work_g.rate_work_g_textile_tb) || 0;
      this.addrate_work_g.rate_work_g_insy_ta =
        parseInt(this.addrate_work_g.rate_work_g_insy_ta) || 0;
      this.addrate_work_g.rate_work_g_insy_tb =
        parseInt(this.addrate_work_g.rate_work_g_insy_tb) || 0;
      this.addrate_work_g.rate_work_g_sc_ta =
        parseInt(this.addrate_work_g.rate_work_g_sc_ta) || 0;
      this.addrate_work_g.rate_work_g_sc_tb =
        parseInt(this.addrate_work_g.rate_work_g_sc_tb) || 0;
      this.addrate_work_g.rate_work_g_sup_ta =
        parseInt(this.addrate_work_g.rate_work_g_sup_ta) || 0;
      this.addrate_work_g.rate_work_g_sup_tb =
        parseInt(this.addrate_work_g.rate_work_g_sup_tb) || 0;
      this.addrate_work_g.rate_work_g_pte_ta =
        parseInt(this.addrate_work_g.rate_work_g_pte_ta) || 0;
      this.addrate_work_g.rate_work_g_pte_tb =
        parseInt(this.addrate_work_g.rate_work_g_pte_tb) || 0;

      this.addrate_work_g.sumteach_a =
        this.addrate_work_g.rate_work_g_gs_ta +
        this.addrate_work_g.rate_work_g_is_ta +
        this.addrate_work_g.rate_work_g_cm_ta +
        this.addrate_work_g.rate_work_g_art_ta +
        this.addrate_work_g.rate_work_g_em_ta +
        this.addrate_work_g.rate_work_g_ag_ta +
        this.addrate_work_g.rate_work_g_fish_ta +
        this.addrate_work_g.rate_work_g_tour_ta +
        this.addrate_work_g.rate_work_g_textile_ta +
        this.addrate_work_g.rate_work_g_insy_ta +
        this.addrate_work_g.rate_work_g_sc_ta;

      this.addrate_work_g.sumteach_b =
        this.addrate_work_g.rate_work_g_gs_tb +
        this.addrate_work_g.rate_work_g_is_tb +
        this.addrate_work_g.rate_work_g_cm_tb +
        this.addrate_work_g.rate_work_g_art_tb +
        this.addrate_work_g.rate_work_g_em_tb +
        this.addrate_work_g.rate_work_g_ag_tb +
        this.addrate_work_g.rate_work_g_fish_tb +
        this.addrate_work_g.rate_work_g_tour_tb +
        this.addrate_work_g.rate_work_g_textile_tb +
        this.addrate_work_g.rate_work_g_insy_tb +
        this.addrate_work_g.rate_work_g_sc_tb;

      this.addrate_work_g.sumall =
        this.addrate_work_g.rate_work_g_dr +
        this.addrate_work_g.rate_work_g_sedr +
        this.addrate_work_g.rate_work_g_pte_ta +
        this.addrate_work_g.rate_work_g_pte_tb +
        this.addrate_work_g.sumteach_a +
        this.addrate_work_g.sumteach_b;
    },
    async rate_work_collegeAdd() {
      this.addrate_work_college = {};
      this.addrate_work_collegedialog = true;
    },

    async addrate_work_collegeSubmit() {
      if (this.$refs.addrate_work_collegeform.validate()) {
        let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
        this.addrate_work_college.ApiKey = this.ApiKey;
        this.addrate_work_college.rate_work_college_code =
          userSession.user_name;
        this.addrate_work_college.update_time = this.date_today;

        /*  console.log(this.addrate_work_college); */
        let result = await this.$http.post(
          "rate_work_college.insert.php",
          this.addrate_work_college
        );
        if (result.data.status == true) {
          this.rate_work_college = result.data;
          this.snackbar.icon = "mdi-font-awesome";
          this.snackbar.color = "success";
          this.snackbar.text = "บันทึกข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.rate_work_collegeQueryAll();
        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text = "บันทึกข้อมูลผิดพลาด สาขาวิชาซ้ำ";
          this.snackbar.show = true;
        }
        this.addrate_work_collegedialog = false;
      }
    },

    async addrate_work_gSubmit() {
      if (this.$refs.addrate_work_gform.validate()) {
        let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
        this.addrate_work_g_data.ApiKey = this.ApiKey;
        this.addrate_work_g_data.rate_work_g_year = this.year_now;
        this.addrate_work_g_data.rate_work_g_college_code =
          userSession.user_name;
        this.addrate_work_g_data.rate_work_g_date_time = this.date_today;
        this.addrate_work_g_data.rate_work_g_dr = this.addrate_work_g.rate_work_g_dr;
        this.addrate_work_g_data.rate_work_g_sedr = this.addrate_work_g.rate_work_g_sedr;
        this.addrate_work_g_data.rate_work_g_gs_ta = this.addrate_work_g.rate_work_g_gs_ta;
        this.addrate_work_g_data.rate_work_g_gs_tb = this.addrate_work_g.rate_work_g_gs_tb;
        this.addrate_work_g_data.rate_work_g_is_ta = this.addrate_work_g.rate_work_g_is_ta;
        this.addrate_work_g_data.rate_work_g_is_tb = this.addrate_work_g.rate_work_g_is_tb;
        this.addrate_work_g_data.rate_work_g_cm_ta = this.addrate_work_g.rate_work_g_cm_ta;
        this.addrate_work_g_data.rate_work_g_cm_tb = this.addrate_work_g.rate_work_g_cm_tb;
        this.addrate_work_g_data.rate_work_g_art_ta = this.addrate_work_g.rate_work_g_art_ta;
        this.addrate_work_g_data.rate_work_g_art_tb = this.addrate_work_g.rate_work_g_art_tb;
        this.addrate_work_g_data.rate_work_g_em_ta = this.addrate_work_g.rate_work_g_em_ta;
        this.addrate_work_g_data.rate_work_g_em_tb = this.addrate_work_g.rate_work_g_em_tb;
        this.addrate_work_g_data.rate_work_g_ag_ta = this.addrate_work_g.rate_work_g_ag_ta;
        this.addrate_work_g_data.rate_work_g_ag_tb = this.addrate_work_g.rate_work_g_ag_tb;
        this.addrate_work_g_data.rate_work_g_fish_ta = this.addrate_work_g.rate_work_g_fish_ta;
        this.addrate_work_g_data.rate_work_g_fish_tb = this.addrate_work_g.rate_work_g_fish_tb;
        this.addrate_work_g_data.rate_work_g_tour_ta = this.addrate_work_g.rate_work_g_tour_ta;
        this.addrate_work_g_data.rate_work_g_tour_tb = this.addrate_work_g.rate_work_g_tour_tb;
        this.addrate_work_g_data.rate_work_g_textile_ta = this.addrate_work_g.rate_work_g_textile_ta;
        this.addrate_work_g_data.rate_work_g_textile_tb = this.addrate_work_g.rate_work_g_textile_tb;
        this.addrate_work_g_data.rate_work_g_insy_ta = this.addrate_work_g.rate_work_g_insy_ta;
        this.addrate_work_g_data.rate_work_g_insy_tb = this.addrate_work_g.rate_work_g_insy_tb;
        this.addrate_work_g_data.rate_work_g_sc_ta = this.addrate_work_g.rate_work_g_sc_ta;
        this.addrate_work_g_data.rate_work_g_sc_tb = this.addrate_work_g.rate_work_g_sc_tb;
        this.addrate_work_g_data.rate_work_g_sup_ta = this.addrate_work_g.rate_work_g_sup_ta;
        this.addrate_work_g_data.rate_work_g_sup_tb = this.addrate_work_g.rate_work_g_sup_tb;
        this.addrate_work_g_data.rate_work_g_pte_ta = this.addrate_work_g.rate_work_g_pte_ta;
        this.addrate_work_g_data.rate_work_g_pte_tb = this.addrate_work_g.rate_work_g_pte_tb;

        this.editrate_work_g_data.ApiKey = this.ApiKey;
        this.editrate_work_g_data.rate_work_g_id = this.addrate_work_g.rate_work_g_id;
        this.editrate_work_g_data.rate_work_g_date_time = this.date_today;
        this.editrate_work_g_data.rate_work_g_dr = this.addrate_work_g.rate_work_g_dr;
        this.editrate_work_g_data.rate_work_g_sedr = this.addrate_work_g.rate_work_g_sedr;
        this.editrate_work_g_data.rate_work_g_gs_ta = this.addrate_work_g.rate_work_g_gs_ta;
        this.editrate_work_g_data.rate_work_g_gs_tb = this.addrate_work_g.rate_work_g_gs_tb;
        this.editrate_work_g_data.rate_work_g_is_ta = this.addrate_work_g.rate_work_g_is_ta;
        this.editrate_work_g_data.rate_work_g_is_tb = this.addrate_work_g.rate_work_g_is_tb;
        this.editrate_work_g_data.rate_work_g_cm_ta = this.addrate_work_g.rate_work_g_cm_ta;
        this.editrate_work_g_data.rate_work_g_cm_tb = this.addrate_work_g.rate_work_g_cm_tb;
        this.editrate_work_g_data.rate_work_g_art_ta = this.addrate_work_g.rate_work_g_art_ta;
        this.editrate_work_g_data.rate_work_g_art_tb = this.addrate_work_g.rate_work_g_art_tb;
        this.editrate_work_g_data.rate_work_g_em_ta = this.addrate_work_g.rate_work_g_em_ta;
        this.editrate_work_g_data.rate_work_g_em_tb = this.addrate_work_g.rate_work_g_em_tb;
        this.editrate_work_g_data.rate_work_g_ag_ta = this.addrate_work_g.rate_work_g_ag_ta;
        this.editrate_work_g_data.rate_work_g_ag_tb = this.addrate_work_g.rate_work_g_ag_tb;
        this.editrate_work_g_data.rate_work_g_fish_ta = this.addrate_work_g.rate_work_g_fish_ta;
        this.editrate_work_g_data.rate_work_g_fish_tb = this.addrate_work_g.rate_work_g_fish_tb;
        this.editrate_work_g_data.rate_work_g_tour_ta = this.addrate_work_g.rate_work_g_tour_ta;
        this.editrate_work_g_data.rate_work_g_tour_tb = this.addrate_work_g.rate_work_g_tour_tb;
        this.editrate_work_g_data.rate_work_g_textile_ta = this.addrate_work_g.rate_work_g_textile_ta;
        this.editrate_work_g_data.rate_work_g_textile_tb = this.addrate_work_g.rate_work_g_textile_tb;
        this.editrate_work_g_data.rate_work_g_insy_ta = this.addrate_work_g.rate_work_g_insy_ta;
        this.editrate_work_g_data.rate_work_g_insy_tb = this.addrate_work_g.rate_work_g_insy_tb;
        this.editrate_work_g_data.rate_work_g_sc_ta = this.addrate_work_g.rate_work_g_sc_ta;
        this.editrate_work_g_data.rate_work_g_sc_tb = this.addrate_work_g.rate_work_g_sc_tb;
        this.editrate_work_g_data.rate_work_g_sup_ta = this.addrate_work_g.rate_work_g_sup_ta;
        this.editrate_work_g_data.rate_work_g_sup_tb = this.addrate_work_g.rate_work_g_sup_tb;
        this.editrate_work_g_data.rate_work_g_pte_ta = this.addrate_work_g.rate_work_g_pte_ta;
        this.editrate_work_g_data.rate_work_g_pte_tb = this.addrate_work_g.rate_work_g_pte_tb;

        let result = await this.$http.post(
          "rate_work_g.insert.php",
          this.addrate_work_g_data
        );
        console.log(result.data);
        console.log(this.addrate_work_g_data);

        if (result.data.status == true) {
          this.snackbar.icon = "mdi-font-awesome";
          this.snackbar.color = "success";
          this.snackbar.text = "บันทึกข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.rate_work_gQueryAll();
          this.rate_work_gQueryAllfull();
        } else {
          let result_update = await this.$http.post(
            "rate_work_g.update.php",
            this.editrate_work_g_data
          );
          if (result_update.data.status == true) {
            this.snackbar.icon = "mdi-font-awesome";
            this.snackbar.color = "success";
            this.snackbar.text = "แก้ไขข้อมูลเรียบร้อย";
            this.snackbar.show = true;
            this.rate_work_gQueryAll();
            this.rate_work_gQueryAllfull();
          }
        }
        this.addrate_work_collegedialog = false;
      }
    },

    //Edit data
    async rate_work_collegeEdit(id_pa) {
      let result = await this.$http.post("rate_work_college.php", {
        ApiKey: this.ApiKey,
        id_pa: id_pa
      });
      this.editrate_work_college = result.data;
      this.editrate_work_collegedialog = true;
    },

    async editrate_work_collegeSubmit() {
      if (this.$refs.editrate_work_collegeform.validate()) {
        this.editrate_work_college.ApiKey = this.ApiKey;
        let result = await this.$http.post(
          "rate_work_college.update.php",
          this.editrate_work_college
        );
        if (result.data.status == true) {
          this.rate_work_colleges = result.data;
          this.snackbar.icon = "mdi-content-save";
          this.snackbar.color = "success";
          this.snackbar.text = "แก้ไขข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.rate_work_collegesQueryAll();
        } else {
          this.snackbar.icon = "mdi-alert";
          this.snackbar.color = "red";
          this.snackbar.text = "แก้ไขข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.editrate_work_collegedialog = false;
      }
    },
    async rate_work_collegeDelete(rate_work_college_id) {
      let result = await this.$http.post("rate_work_college.php", {
        ApiKey: this.ApiKey,
        rate_work_college_id: rate_work_college_id
      });
      this.editrate_work_college = result.data;
      this.deleterate_work_collegedialog = true;
    },

    async deleterate_work_collegeubmit() {
      if (this.$refs.deleterate_work_collegeform.validate())
        this.editrate_work_college.ApiKey = this.ApiKey;
      {
        let result = await this.$http.post(
          "rate_work_college.delete.php",
          this.editrate_work_college
        );
        if (result.data.status == true) {
          this.snackbar.icon = "mdi-content-save";
          this.snackbar.color = "success";
          this.snackbar.text = "ลบข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.rate_work_collegesQueryAll();
        } else {
          this.snackbar.icon = "mdi-alert";
          this.snackbar.color = "red";
          this.snackbar.text = "ลบข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.deleterate_work_collegedialog = false;
      }
    },

    course_college(rate_work_course_id) {
      var array = {
        "201": "ปวช. ประเภทวิชาอุตสาหกรรม",
        "202": "ปวช. ประเภทวิชาพาณิชยกรรม",
        "203": "ปวช. ประเภทวิชาศิลปกรรม",
        "204": "ปวช. ประเภทวิชาคหกรรม",
        "205": "ปวช. ประเภทวิชาเกษตรกรรม",
        "206": "ปวช. ประเภทวิชาประมง",
        "207": "ปวช. ประเภทวิชาอุตสาหกรรมท่องเที่ยว",
        "208": "ปวช. ประเภทวิชาอุตสาหกรรมสิ่งทอ",
        "209": "ปวช. ประเภทวิชาเทคโนโลยีสารสนเทศและการสื่อสาร",
        "210": "ปวช. ประเภทวิชาอุตสาหกรรมบันเทิงและดนตรี",
        "301": "ปวส. ประเภทวิชาอุตสาหกรรม",
        "302": "ปวส. ประเภทวิชาพาณิชยกรรม",
        "303": "ปวส. ประเภทวิชาศิลปกรรม",
        "304": "ปวส. ประเภทวิชาคหกรรม",
        "305": "ปวส. ประเภทวิชาเกษตรกรรม",
        "306": "ปวส. ประเภทวิชาประมง",
        "307": "ปวส. ประเภทวิชาอุตสาหกรรมท่องเที่ยว",
        "308": "ปวส. ประเภทวิชาอุตสาหกรรมสิ่งทอ",
        "309": "ปวส. ประเภทวิชาเทคโนโลยีสารสนเทศและการสื่อสาร",
        "310": "ปวส. ประเภทวิชาอุตสาหกรรมบันเทิงและดนตรี"
      };
      var str = rate_work_course_id.toString();
      for (var val in array) {
        str = str.split(val).join(array[val]);
      }
      return str;
    },
    rate_work_report(rate_work_course_id) {
      if (rate_work_course_id === "201" || rate_work_course_id === "301") {
        console.log("201301");
      } else if (
        rate_work_course_id === "202" ||
        rate_work_course_id === "302"
      ) {
        console.log("202302");
      } else if (
        rate_work_course_id === "203" ||
        rate_work_course_id === "303"
      ) {
        console.log("203203");
      } else if (
        rate_work_course_id === "204" ||
        rate_work_course_id === "304"
      ) {
        console.log("204304");
      } else if (
        rate_work_course_id === "205" ||
        rate_work_course_id === "305"
      ) {
        console.log("205305");
      } else if (
        rate_work_course_id === "206" ||
        rate_work_course_id === "306"
      ) {
        console.log("206306");
      } else if (
        rate_work_course_id === "207" ||
        rate_work_course_id === "307"
      ) {
        console.log("207307");
      } else if (
        rate_work_course_id === "208" ||
        rate_work_course_id === "308"
      ) {
        console.log("208308");
      } else if (
        rate_work_course_id === "209" ||
        rate_work_course_id === "309"
      ) {
        console.log("209309");
      } else if (
        rate_work_course_id === "210" ||
        rate_work_course_id === "310"
      ) {
        console.log("210310");
      }
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
    },
    date_today() {
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, "0");
      let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      let yyyy = today.getFullYear();

      today = yyyy + "-" + mm + "-" + dd;
      return today;
    },
    year_now() {
      let today = new Date();
      let yyyy = today.getFullYear() + 543;
      today = yyyy;
      return today;
    },
    color() {
      return "indigo darken-4";
    },
    url_result() {
      let result = window.location.href;
      let split_s = result.split("/");
      return split_s[6];
    },

    id_card_s() {
      let result = this.url_result.slice(5);
      return result;
    }
  }
};
</script>
