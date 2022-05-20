<template>
  <div>
    <v-bottom-navigation color="info" horizontal :background-color="color" dark>
    <v-btn to="/college/rate_workforce_g">
        <span>ข้อมูลทั่วไป </span>
        <v-icon>mdi-numeric-1-box</v-icon>
      </v-btn>
      <v-btn to="/college/rate_workforce">
        <span>ข้อมูลนักเรียนนักศึกษา </span>
        <v-icon>mdi-numeric-2-box</v-icon>
      </v-btn>
      <v-btn to="/college/rate_workforce_pro">
        <span>ประมวลผลห้องเรียน </span>
        <v-icon>mdi-numeric-3-box</v-icon>
      </v-btn>
       <v-btn to="/college/rate_workforce_cal">
        <span>ประมวลผลอัตรากำลัง </span>
        <v-icon>mdi-numeric-4-box</v-icon>
      </v-btn>
       <v-btn to="/college/rate_workforce_report">
        <span>รายงานผลอัตรากำลัง </span>
        <v-icon>mdi-numeric-5-box</v-icon>
      </v-btn>
    </v-bottom-navigation>

    <v-container id="upgrade" fluid tag="section" class="text_google">
      <v-row>
          <v-col cols="12" md="12">
     <v-alert
      prominent
      type="error"
      v-if="period_colleges.period_college_enable ==='1' && period_colleges.period_college_type ==='update_college'"
    >
      <v-row align="center">
        <v-col class="grow">
        ขณะนี้ได้ทำการเปิดระบบ รายงานข้อมูลสถานศึกษา รายงานอัตรากำลัง ให้สถานศึกษาดำเนินการ ก่อนระบบปิดในวันที่ {{ period_colleges.period_college_stop  | moment("add", "543 years")
                | moment("D MMMM YYYY")}}
        </v-col>
        <v-col class="shrink">
          <v-btn to="/college/rate_workforce_g"> <v-icon class="pa-2">mdi-arrow-right-bold-hexagon-outline</v-icon> รายงานข้อมูล</v-btn>
        </v-col>
      </v-row>
    </v-alert>
      </v-col>
        <v-col cols="12" md="12">
          <base-material-card color="primary">
            <template v-slot:heading>
              <h2 class="h1 font-weight-light text_google">
                <v-icon large left>mdi-file-send</v-icon>ข้อมูลสถานศึกษา
                ประเภทวิทยาลัย : {{ user.college_id_code_type_manpower }}
                ประจำปีการศึกษา : {{ period_colleges.period_college_yearbd }} <br>
                สิ้นสุดวันที่บันทึกข้อมูล : {{  }}
              </h2>
            </template>

            <v-row>                          
                <v-col cols="12" md="12">
                <v-card class="mx-auto pa-5">
                  <v-row>
                    <v-col cols="12" md="12">
                      <v-alert outlined border="left" type="info">
                        <h2>ข้อมูลทั่วไป</h2>
                        <v-select
                          v-model="years_select"
                          :items="year_s"
                          item-value="year_s"
                          @change="rate_work_g_search()"
                          label="เลือกปีเพื่อแสดงข้อมูลที่เคยได้บันทึกรายการ : "
                        >
                        </v-select>
                      </v-alert>
                    </v-col>
                    <v-col cols="12" md="12">
                      <v-row class="mb-6" justify="center" no-gutters>
                        <v-col md="6">
                          <v-card class="pa-2" outlined  elevation="2">
                            <v-form ref="addrate_work_gform" lazy-validation>
                              <v-container grid-list-md>
                                <v-layout wrap>
                                  <v-flex md12>
                                    <v-row>
                                      <v-col cols="12" md="6" sm="6">
                                        <span>ผู้อำนวยการสถานศึกษา : </span>
                                        <v-text-field
                                          v-model="
                                            addrate_work_g.rate_work_g_dr
                                          "
                                          dense
                                          filled
                                          type="number"
                                          label="จำนวนผู้อำนวยการ : "
                                          clearable
                                          request
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" md="6" sm="6">
                                        <span>รองผู้อำนวยการสถานศึกษา : </span>
                                        <v-text-field
                                          v-model="
                                            addrate_work_g.rate_work_g_sedr
                                          "
                                          dense
                                          filled
                                          type="number"
                                          label="จำนวนรองผู้อำนวยการ : "
                                          clearable
                                          request
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" md="12">
                                        <v-divider inset></v-divider>
                                      </v-col>
                                      <v-col cols="12" md="6" sm="6">
                                        <span
                                          >ประเภทวิชาสามัญ
                                          <span class="font-weight-black"
                                            >ข้าราชการ :</span
                                          ></span
                                        >
                                        <v-text-field
                                          v-model="
                                            addrate_work_g.rate_work_g_gs_ta
                                          "
                                          dense
                                          filled
                                          type="number"
                                          label="จำนวน ข้าราชการ : "
                                          clearable
                                          request
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" md="6" sm="6">
                                        <span
                                          >ประเภทวิชาสามัญ
                                          <span class="font-weight-black"
                                            >พนร./อัตราจ้าง :</span
                                          >
                                        </span>
                                        <v-text-field
                                          v-model="
                                            addrate_work_g.rate_work_g_gs_tb
                                          "
                                          dense
                                          filled
                                          type="number"
                                          label="จำนวน พนร./อัตราจ้าง : "
                                          clearable
                                          request
                                        ></v-text-field>
                                      </v-col>

                                      <v-col cols="12" md="6" sm="6">
                                        <span
                                          >ประเภทวิชาอุตสาหกรรม
                                          <span class="font-weight-black"
                                            >ข้าราชการ :</span
                                          >
                                        </span>
                                        <v-text-field
                                          v-model="
                                            addrate_work_g.rate_work_g_is_ta
                                          "
                                          dense
                                          filled
                                          type="number"
                                          label="จำนวน ข้าราชการ : "
                                          clearable
                                          request
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" md="6" sm="6">
                                        <span
                                          >ประเภทวิชาอุตสาหกรรม
                                          <span class="font-weight-black"
                                            >พนร./อัตราจ้าง :</span
                                          >
                                        </span>
                                        <v-text-field
                                          v-model="
                                            addrate_work_g.rate_work_g_is_tb
                                          "
                                          dense
                                          filled
                                          type="number"
                                          label="จำนวน พนร./อัตราจ้าง : "
                                          clearable
                                          request
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" md="6" sm="6">
                                        <span
                                          >ประเภทวิชาพาณิชยกรรม
                                          <span class="font-weight-black"
                                            >ข้าราชการ :</span
                                          >
                                        </span>
                                        <v-text-field
                                          v-model="
                                            addrate_work_g.rate_work_g_cm_ta
                                          "
                                          dense
                                          filled
                                          type="number"
                                          label="จำนวน ข้าราชการ : "
                                          clearable
                                          request
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" md="6" sm="6">
                                        <span
                                          >ประเภทวิชาพาณิชยกรรม
                                          <span class="font-weight-black"
                                            >พนร./อัตราจ้าง :</span
                                          >
                                        </span>
                                        <v-text-field
                                          v-model="
                                            addrate_work_g.rate_work_g_cm_tb
                                          "
                                          dense
                                          filled
                                          type="number"
                                          label="จำนวน พนร./อัตราจ้าง : "
                                          clearable
                                          request
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" md="6" sm="6">
                                        <span
                                          >ประเภทวิชาศิลปกรรม
                                          <span class="font-weight-black"
                                            >ข้าราชการ :</span
                                          >
                                        </span>
                                        <v-text-field
                                          v-model="
                                            addrate_work_g.rate_work_g_art_ta
                                          "
                                          dense
                                          filled
                                          type="number"
                                          label="จำนวน ข้าราชการ : "
                                          clearable
                                          request
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" md="6" sm="6">
                                        <span
                                          >ประเภทวิชาศิลปกรรม
                                          <span class="font-weight-black"
                                            >พนร./อัตราจ้าง :</span
                                          >
                                        </span>
                                        <v-text-field
                                          v-model="
                                            addrate_work_g.rate_work_g_art_tb
                                          "
                                          dense
                                          filled
                                          type="number"
                                          label="จำนวน พนร./อัตราจ้าง : "
                                          clearable
                                          request
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" md="6" sm="6">
                                        <span
                                          >ประเภทวิชาคหกรรม
                                          <span class="font-weight-black"
                                            >ข้าราชการ :</span
                                          >
                                        </span>
                                        <v-text-field
                                          v-model="
                                            addrate_work_g.rate_work_g_em_ta
                                          "
                                          dense
                                          filled
                                          type="number"
                                          label="จำนวน ข้าราชการ : "
                                          clearable
                                          request
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" md="6" sm="6">
                                        <span
                                          >ประเภทวิชาคหกรรม
                                          <span class="font-weight-black"
                                            >พนร./อัตราจ้าง :</span
                                          >
                                        </span>
                                        <v-text-field
                                          v-model="
                                            addrate_work_g.rate_work_g_em_tb
                                          "
                                          dense
                                          filled
                                          type="number"
                                          label="จำนวน พนร./อัตราจ้าง : "
                                          clearable
                                          request
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" md="6" sm="6">
                                        <span
                                          >ประเภทวิชาเกษตรกรรม
                                          <span class="font-weight-black"
                                            >ข้าราชการ :</span
                                          >
                                        </span>
                                        <v-text-field
                                          v-model="
                                            addrate_work_g.rate_work_g_ag_ta
                                          "
                                          dense
                                          filled
                                          type="number"
                                          label="จำนวน ข้าราชการ : "
                                          clearable
                                          request
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" md="6" sm="6">
                                        <span
                                          >ประเภทวิชาเกษตรกรรม
                                          <span class="font-weight-black"
                                            >พนร./อัตราจ้าง :</span
                                          >
                                        </span>
                                        <v-text-field
                                          v-model="
                                            addrate_work_g.rate_work_g_ag_tb
                                          "
                                          dense
                                          filled
                                          type="number"
                                          label="จำนวน พนร./อัตราจ้าง : "
                                          clearable
                                          request
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" md="6" sm="6">
                                        <span
                                          >ประเภทวิชาประมง
                                          <span class="font-weight-black"
                                            >ข้าราชการ :</span
                                          >
                                        </span>
                                        <v-text-field
                                          v-model="
                                            addrate_work_g.rate_work_g_fish_ta
                                          "
                                          dense
                                          filled
                                          type="number"
                                          label="จำนวน ข้าราชการ : "
                                          clearable
                                          request
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" md="6" sm="6">
                                        <span
                                          >ประเภทวิชาประมง
                                          <span class="font-weight-black"
                                            >พนร./อัตราจ้าง :</span
                                          >
                                        </span>
                                        <v-text-field
                                          v-model="
                                            addrate_work_g.rate_work_g_fish_tb
                                          "
                                          dense
                                          filled
                                          type="number"
                                          label="จำนวน พนร./อัตราจ้าง : "
                                          clearable
                                          request
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" md="6" sm="6">
                                        <span
                                          >ประเภทวิชาอุตสาหกรรมการท่องเที่ยว
                                          <span class="font-weight-black"
                                            >ข้าราชการ :</span
                                          >
                                        </span>
                                        <v-text-field
                                          v-model="
                                            addrate_work_g.rate_work_g_tour_ta
                                          "
                                          dense
                                          filled
                                          type="number"
                                          label="จำนวน ข้าราชการ : "
                                          clearable
                                          request
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" md="6" sm="6">
                                        <span
                                          >ประเภทวิชาอุตสาหกรรมการท่องเที่ยว
                                          <span class="font-weight-black"
                                            >พนร./อัตราจ้าง :</span
                                          >
                                        </span>
                                        <v-text-field
                                          v-model="
                                            addrate_work_g.rate_work_g_tour_tb
                                          "
                                          dense
                                          filled
                                          type="number"
                                          label="จำนวน พนร./อัตราจ้าง : "
                                          clearable
                                          request
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" md="6" sm="6">
                                        <span
                                          >ประเภทวิชาอุตสาหกรรมสิ่งทอ
                                          <span class="font-weight-black"
                                            >ข้าราชการ :</span
                                          >
                                        </span>
                                        <v-text-field
                                          v-model="
                                            addrate_work_g.rate_work_g_textile_ta
                                          "
                                          dense
                                          filled
                                          type="number"
                                          label="จำนวน ข้าราชการ : "
                                          clearable
                                          request
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" md="6" sm="6">
                                        <span
                                          >ประเภทวิชาอุตสาหกรรมสิ่งทอ
                                          <span class="font-weight-black"
                                            >พนร./อัตราจ้าง :</span
                                          >
                                        </span>
                                        <v-text-field
                                          v-model="
                                            addrate_work_g.rate_work_g_textile_tb
                                          "
                                          dense
                                          filled
                                          type="number"
                                          label="จำนวน พนร./อัตราจ้าง : "
                                          clearable
                                          request
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" md="6" sm="6">
                                        <span
                                          >ประเภทวิชาเทคโนโลยีสารสนเทศ
                                          <span class="font-weight-black"
                                            >ข้าราชการ :</span
                                          >
                                        </span>
                                        <v-text-field
                                          v-model="
                                            addrate_work_g.rate_work_g_insy_ta
                                          "
                                          dense
                                          filled
                                          type="number"
                                          label="จำนวน ข้าราชการ : "
                                          clearable
                                          request
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" md="6" sm="6">
                                        <span
                                          >ประเภทวิชาเทคโนโลยีสารสนเทศ
                                          <span class="font-weight-black"
                                            >พนร./อัตราจ้าง :</span
                                          >
                                        </span>
                                        <v-text-field
                                          v-model="
                                            addrate_work_g.rate_work_g_insy_tb
                                          "
                                          dense
                                          filled
                                          type="number"
                                          label="จำนวน พนร./อัตราจ้าง : "
                                          clearable
                                          request
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" md="6" sm="6">
                                        <span
                                          >หลักสูตรระยะสั้น*
                                          <span class="font-weight-black"
                                            >ข้าราชการ :</span
                                          >
                                        </span>
                                        <v-text-field
                                          v-model="
                                            addrate_work_g.rate_work_g_sc_ta
                                          "
                                          dense
                                          filled
                                          type="number"
                                          label="จำนวน ข้าราชการ : "
                                          clearable
                                          request
                                        ></v-text-field>
                                      </v-col>

                                      <v-col cols="12" md="6" sm="6">
                                        <span
                                          >หลักสูตรระยะสั้น*
                                          <span class="font-weight-black"
                                            >พนร./อัตราจ้าง :</span
                                          >
                                        </span>
                                        <v-text-field
                                          v-model="
                                            addrate_work_g.rate_work_g_sc_tb
                                          "
                                          dense
                                          filled
                                          type="number"
                                          label="จำนวน พนร./อัตราจ้าง : "
                                          clearable
                                          request
                                        ></v-text-field>
                                      </v-col>

                                      <v-col cols="12" md="6" sm="6">
                                        <span
                                          >บุคลากรสนับสนุนการสอน
                                          <span class="font-weight-black"
                                            >ข้าราชการ :</span
                                          >
                                        </span>
                                        <v-text-field
                                          v-model="
                                            addrate_work_g.rate_work_g_sup_ta
                                          "
                                          dense
                                          filled
                                          type="number"
                                          label="จำนวน ข้าราชการ : "
                                          clearable
                                          request
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" md="6" sm="6">
                                        <span
                                          >บุคลากรสนับสนุนการสอน
                                          <span class="font-weight-black"
                                            >พนร./อัตราจ้าง :</span
                                          >
                                        </span>
                                        <v-text-field
                                          v-model="
                                            addrate_work_g.rate_work_g_sup_tb
                                          "
                                          dense
                                          filled
                                          type="number"
                                          label="จำนวน พนร./อัตราจ้าง : "
                                          clearable
                                          request
                                        ></v-text-field>
                                      </v-col>

                                      <v-col cols="12" md="6" sm="6">
                                        <v-alert
                                          border="left"
                                          colored-border
                                          type="info"
                                          elevation="2"
                                        >
                                          <h3>
                                            สายการสอนรวม ข้าราชการ :
                                            {{ addrate_work_g.sumteach_a }}
                                          </h3>
                                        </v-alert>
                                      </v-col>

                                      <v-col cols="12" md="6" sm="6">
                                        <v-alert
                                          border="left"
                                          colored-border
                                          type="info"
                                          elevation="2"
                                        >
                                          <h3>
                                            สายการสอนรวม พนร./อัตราจ้าง :
                                            {{ addrate_work_g.sumteach_b }}
                                          </h3>
                                        </v-alert>
                                      </v-col>

                                      <v-col cols="12" md="6" sm="6">
                                        <span>
                                          ลูกจ้างประจำ/ชั่วคราว
                                          <span class="font-weight-black"
                                            >ข้าราชการ :</span
                                          >
                                        </span>
                                        <v-text-field
                                          v-model="
                                            addrate_work_g.rate_work_g_pte_ta
                                          "
                                          dense
                                          filled
                                          type="number"
                                          label="จำนวน ข้าราชการ : "
                                          clearable
                                          request
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" md="6" sm="6">
                                        <span>
                                          ลูกจ้างประจำ/ชั่วคราว
                                          <span class="font-weight-black"
                                            >พนร./อัตราจ้าง :</span
                                          >
                                        </span>
                                        <v-text-field
                                          v-model="
                                            addrate_work_g.rate_work_g_pte_tb
                                          "
                                          dense
                                          filled
                                          type="number"
                                          label="จำนวน พนร./อัตราจ้าง : "
                                          clearable
                                          request
                                        ></v-text-field>
                                      </v-col>
                                      <v-col cols="12" md="12">
                                        <v-alert
                                          border="left"
                                          colored-border
                                          type="info"
                                          elevation="2"
                                          class="text-center"
                                        >
                                          <h2>
                                            รวมอัตรา :
                                            {{ addrate_work_g.sumall }}
                                          </h2>
                                        </v-alert>
                                      </v-col>
                                    </v-row>
                                  </v-flex>
                                </v-layout>
                                <v-spacer></v-spacer>
                                <v-row v-if="period_colleges.period_college_enable ==='1' && period_colleges.period_college_type ==='update_college'">
                                  <v-col cols="12" md="12" class="text-right">
                                    <v-btn
                                      large
                                      color="green"
                                      @click.stop="addrate_work_gSubmit()"
                                      rounded
                                    >
                                      <v-icon dark>mdi-content-save</v-icon
                                      >&nbsp;&nbsp;บันทึก/ปรับปรุงข้อมูล</v-btn
                                    >
                                  </v-col>
                                </v-row>
                              </v-container>
                            </v-form>
                          </v-card>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
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
          max-width="80%"
          overlay-opacity="0.6"
        >
          <v-card class="mx-auto pa-5">
            <v-row>
              <v-col cols="12" md="12" class="text-right">
                <v-icon large @click.stop="addrate_work_collegedialog = false">
                  mdi-close
                </v-icon>
              </v-col>
            </v-row>
            <base-material-card
              icon="mdi-clipboard-text"
              title="บันทึกข้อมูลประเภทวิชา/หมวดวิชา/สาขาวิชา"
              class="px-5 py-3 text_google"
            ></base-material-card>
            <v-card-text class="text_google">
              <v-form ref="addrate_work_collegeform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md12>
                      <v-row>
                        <v-col cols="12" lg="6" class="text-right">
                          <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="ค้นหา ระบุคำ หรือ ส่วนข้อความเกี่ยวข้อง"
                            filled
                            class="mb-2"
                          />
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-autocomplete
                            filled
                            label="ประเภทวิชา/หมวดวิชา : "
                            v-model="course_select_main"
                            :items="rate_work_course_stds_autocompl"
                            item-text="course_select"
                            item-value="id_type_course"
                            @change="course_select()"
                          >
                          </v-autocomplete>
                        </v-col>
                        <v-col cols="12" md="12">
                          <v-card>
                            <v-data-table
                              color="success"
                              :loading="loading"
                              :headers="headers_course"
                              :items="rate_work_course_stds"
                              :search="search"
                              :items-per-page="200"
                            >
                              <template v-slot:[`item.actions`]="{ item }">
                                <v-chip
                                  v-if="item.rate_id_course_branch === null"
                                  dark
                                  color="green"
                                  @click.stop="
                                    rate_work_course_std_select(
                                      item.id_course_branch
                                    )
                                  "
                                >
                                  <v-icon class="pa-1">
                                    mdi-checkbox-marked-circle
                                  </v-icon>
                                  <h2>เลือกบันทึกสาขาวิชา</h2>
                                </v-chip>
                                <v-chip
                                  v-else
                                  dark
                                  color="warning"
                                  @click.stop="
                                    rate_work_course_std_select(
                                      item.id_course_branch
                                    )
                                  "
                                >
                                  <v-icon class="pa-1">
                                    mdi-close
                                  </v-icon>
                                  <h2>ยกเลิก</h2>
                                </v-chip>
                              </template>
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
                        <v-col cols="12" md="12">
                          <v-autocomplete
                            v-model="addrate_work_college.rate_id_course_branch"
                            :items="rate_work_course_stds"
                            item-text="course_select"
                            item-value="id_course_branch"
                            dense
                            label="ประเภทวิชา/สาขาวิชา   : "
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

      <!-- V-model rate_work_collegeUpdatedialog -->
      <v-layout>
        <v-dialog
          v-model="rate_work_collegeUpdatedialog"
          persistent
          max-width="60%"
        >
          <v-card class="mx-auto pa-5">
            <base-material-card
              color="green"
              icon="mdi-clipboard-text"
              title="รายจำนวนนักเรียน"
              class="px-5 py-3 text_google"
            ></base-material-card>
            <v-card-text class="text_google">
              <v-form ref="rate_work_collegeUpdatedialogform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md12>
                      <h3>
                        หลักสูตร :{{
                          rate_work_colleges_update_stu.rate_work_course_id
                        }}
                        : {{ rate_work_colleges_update_stu.type_course }}
                      </h3>
                      <h3>
                        สาขาวิชา :{{
                          rate_work_colleges_update_stu.id_course_branch
                        }}
                        : {{ rate_work_colleges_update_stu.branch_name_th }}
                      </h3>
                    </v-flex>
                    <v-flex md4>
                      <v-text-field
                        v-model="
                          rate_work_colleges_update_stu.rate_work_field_study_lavel_1
                        "
                        type="number"
                        label="ระดับ ปวช.1"
                        filled
                        dense
                      >
                      </v-text-field>
                    </v-flex>
                    <v-flex md4>
                      <v-text-field
                        v-model="
                          rate_work_colleges_update_stu.rate_work_field_study_lavel_2
                        "
                        type="number"
                        label="ระดับ ปวช.2"
                        filled
                        dense
                      >
                      </v-text-field>
                    </v-flex>
                    <v-flex md4>
                      <v-text-field
                        v-model="
                          rate_work_colleges_update_stu.rate_work_field_study_lavel_3
                        "
                        type="number"
                        label="ระดับ ปวช.3"
                        filled
                        dense
                      >
                      </v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="warning"
                rounded
                large
                @click.stop="rate_work_collegeUpdatedialog = false"
              >
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn
                rounded
                large
                color="green"
                @click.stop="rate_work_collegeUpdatedialogsubmit()"
                dark
              >
                <v-icon dark>mdi-content-save</v-icon>&nbsp;บันทึก
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <!-- V-model rate_work_collegeUpdatedialog_30 -->
      <v-layout>
        <v-dialog
          v-model="rate_work_collegeUpdatedialog_30"
          persistent
          max-width="60%"
        >
          <v-card class="mx-auto pa-5">
            <base-material-card
              color="green"
              icon="mdi-clipboard-text"
              title="รายจำนวนนักเรียน"
              class="px-5 py-3 text_google"
            ></base-material-card>
            <v-card-text class="text_google">
              <v-form ref="rate_work_collegeUpdatedialogform" lazy-validation>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md12>
                      <h3>
                        หลักสูตร :{{
                          rate_work_colleges_update_stu.rate_work_course_id
                        }}
                        : {{ rate_work_colleges_update_stu.type_course }}
                      </h3>
                      <h3>
                        สาขาวิชา :{{
                          rate_work_colleges_update_stu.id_course_branch
                        }}
                        : {{ rate_work_colleges_update_stu.branch_name_th }}
                      </h3>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        v-model="
                          rate_work_colleges_update_stu.rate_work_field_study_lavel_1
                        "
                        type="number"
                        label="ระดับ ปวส.1"
                        filled
                        dense
                      >
                      </v-text-field>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field
                        v-model="
                          rate_work_colleges_update_stu.rate_work_field_study_lavel_2
                        "
                        type="number"
                        label="ระดับ ปวส.2"
                        filled
                        dense
                      >
                      </v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="warning"
                rounded
                large
                @click.stop="rate_work_collegeUpdatedialog_30 = false"
              >
                <v-icon dark>mdi-close</v-icon>ยกเลิก
              </v-btn>
              <v-btn
                rounded
                large
                color="green"
                @click.stop="rate_work_collegeUpdatedialogsubmit()"
                dark
              >
                <v-icon dark>mdi-content-save</v-icon>&nbsp;บันทึก
              </v-btn>
            </v-card-actions>
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
                      <h3>{{ editrate_work_college.rate_work_college_id }}</h3>
                      <h3>{{ editrate_work_college.rate_work_course_id }}</h3>
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
                            v-model="
                              editrate_work_college.rate_id_course_branch
                            "
                            :items="rate_work_course_stds"
                            item-text="course_select"
                            item-value="id_course_branch"
                            dense
                            label="ประเภทวิชา/สาขาวิชา : "
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
       user: {},
      users: [],
      rate_work_colleges: [],
      rate_work_colleges_30: [],
      years_select: "2565",
      search_course: "",
      search: "",
      year_s: [2565, 2566, 2567, 2568, 2569, 2570],
      addrate_work_collegedialog: false,
      editrate_work_collegedialog: false,
      deleterate_work_collegedialog: false,
      addrate_work_gdialog: false,
      rate_work_collegeUpdatedialog: false,
      rate_work_collegeUpdatedialog_30: false,
      addrate_work_college: {},
      editrate_work_college: [],
      addrate_work_college: [],
      addrate_work_g: {},
      addrate_work_g_data: {},
      editrate_work_g_data: {},
      rate_work_g_all: [],
      rate_work_course_stds: [],
      rate_work_gs: [],
      rate_work_course_stds_in: {},
      rate_work_course_stds: [],
      snackbar: {
        show: false,
        color: "",
        timeout: 5000,
        icon: "",
        text: ""
      },
      headers_course: [
        { text: "หลักสูตรปีการศึกษา", align: "center", value: "year_course" },
        { text: "รหัสประเภทวิชา", align: "center", value: "id_type_course" },
        { text: "ประเภทวิชา", align: "left", value: "type_course" },
        { text: "รหัสสาขาวิชา", align: "left", value: "id_course_branch" },
        { text: "ชื่อสาขาวิชา", align: "left", value: "branch_name_th" },

        {
          text: "ดำเนินการ",
          align: "center",
          value: "actions",
          icon: "mdi-file-document-edit"
        }
      ],

      headers: [
        { text: "#", align: "center", value: "index" },
        {
          text: "ปีการศึกษา",
          align: "center",
          value: "rate_work_college_year"
        },
        {
          text: "รหัสวิทยาลัย",
          align: "center",
          value: "rate_work_college_code"
        },
        { text: "รหัสหมวดวิชา", align: "center", value: "rate_work_course_id" },
        { text: "หมวดวิชา", align: "center", value: "type_course" },
        {
          text: "หลักสูตร",
          align: "center",
          value: "year_course"
        },
        {
          text: "รหัสสาขาวิชา",
          align: "center",
          value: "rate_id_course_branch"
        },
        {
          text: "สาขาวิชา",
          align: "center",
          value: "branch_name_th"
        },
        { text: "วันที่ข้อมูล", align: "center", value: "update_time" },
        {
          text: "จำนวนนักเรียน",
          align: "center",
          value: "reports"
        },
        {
          text: "ปวช.1",
          align: "center",
          value: "rate_work_field_study_lavel_1"
        },
        {
          text: "ปวช.2",
          align: "center",
          value: "rate_work_field_study_lavel_2"
        },
        {
          text: "ปวช.3",
          align: "center",
          value: "rate_work_field_study_lavel_3"
        },
        {
          text: "ยกเลิกรายการ",
          align: "center",
          value: "actions"
        }
      ],

      headers_30: [
        { text: "#", align: "center", value: "index" },
        {
          text: "ปีการศึกษา",
          align: "center",
          value: "rate_work_college_year"
        },
        {
          text: "รหัสวิทยาลัย",
          align: "center",
          value: "rate_work_college_code"
        },
        { text: "รหัสหมวดวิชา", align: "center", value: "rate_work_course_id" },
        { text: "หมวดวิชา", align: "center", value: "type_course" },
        {
          text: "หลักสูตร",
          align: "center",
          value: "year_course"
        },
        {
          text: "รหัสสาขาวิชา",
          align: "center",
          value: "rate_id_course_branch"
        },
        {
          text: "สาขาวิชา",
          align: "center",
          value: "branch_name_th"
        },
        { text: "วันที่ข้อมูล", align: "center", value: "update_time" },
        {
          text: "จำนวนนักศึกษา",
          align: "center",
          value: "reports"
        },
        {
          text: "ปวส.1",
          align: "center",
          value: "rate_work_field_study_lavel_1"
        },
        {
          text: "ปวส.2",
          align: "center",
          value: "rate_work_field_study_lavel_2"
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
      rate_work_course_stds_autocompl: [],
      course_select_main: "",
      rate_work_colleges_update_stu: {},
      rate_work_college_sum_20: [],
      rate_work_college_sum_30: [],
      period_colleges:[],
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

    await this.period_collegeQuery();
    await this.rate_work_collegeQuery_20();
    await this.rate_work_collegeQuery_30();
    await this.rate_work_gQueryAll();
    await this.rate_work_gQueryAllfull();
    await this.rate_work_course_stdQueryAll();
    await this.rate_work_course_std_courseQAll();
    await this.rate_work_collegeQuery_20_sum();
    await this.rate_work_collegeQuery_30_sum();
  },

  methods: {
    async period_collegeQuery() {
       let result_period_college;
    result_period_college = await this.$http.post("period_college.php", {
      ApiKey: this.ApiKey,
      period_college_enable: "1",
      period_college_type: "update_college"
    });
    this.period_colleges = result_period_college.data;    
    console.log(result_period_college.data)
    },

    async field_study_lavel_update(rate_work_college_id) {
      let result = await this.$http.post("rate_work_college.php", {
        ApiKey: this.ApiKey,
        rate_work_college_id: rate_work_college_id
      });
      this.rate_work_colleges_update_stu = result.data;
      this.rate_work_collegeUpdatedialog = true;
    },

    async field_study_lavel_update_30(rate_work_college_id) {
      let result = await this.$http.post("rate_work_college.php", {
        ApiKey: this.ApiKey,
        rate_work_college_id: rate_work_college_id
      });
      this.rate_work_colleges_update_stu = result.data;
      this.rate_work_collegeUpdatedialog_30 = true;
    },

    async rate_work_collegeUpdatedialogsubmit() {
      if (this.$refs.rate_work_collegeUpdatedialogform.validate()) {
        this.rate_work_colleges_update_stu.ApiKey = this.ApiKey;
        /* console.log(this.rate_work_colleges_update_stu) */

        let result = await this.$http.post(
          "rate_work_college.update.php",
          this.rate_work_colleges_update_stu
        );
        if (result.data.status == true) {
          this.snackbar.icon = "mdi-font-awesome";
          this.snackbar.color = "success";
          this.snackbar.text = "แก้ไขข้อมูลเรียบร้อย";
          this.snackbar.show = true;
          this.rate_work_collegeQuery_20();
          this.rate_work_collegeQuery_30();
          this.rate_work_collegeQuery_20_sum();
          this.rate_work_collegeQuery_30_sum();
        } else {
          this.snackbar.icon = "mdi-close-network";
          this.snackbar.color = "red";
          this.snackbar.text = "แก้ไขข้อมูลผิดพลาด";
          this.snackbar.show = true;
        }
        this.rate_work_collegeUpdatedialog = false;
        this.rate_work_collegeUpdatedialog_30 = false;
      }
    },

    async course_select() {
      let result = await this.$http.post("rate_work_course_std.php", {
        ApiKey: this.ApiKey,
        id_type_course: this.course_select_main
      });
      this.rate_work_course_stds = result.data;
    },

    async rate_work_course_std_courseQAll() {
      let result = await this.$http.post("rate_work_course_std.php", {
        ApiKey: this.ApiKey,
        show_course_all: "Ok"
      });
      this.rate_work_course_stds_autocompl = result.data;
    },

    async rate_work_course_std_select(id_course_branch) {
      let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
      this.addrate_work_college.ApiKey = this.ApiKey;
      this.addrate_work_college.rate_work_college_code = userSession.user_name;

      let result = await this.$http.post("rate_work_course_std.php", {
        ApiKey: this.ApiKey,
        id_course_branch: id_course_branch
      });
      this.rate_work_course_stds_in = result.data;
      /*  console.log(result.data); */

      this.addrate_work_college.rate_id_course_branch = id_course_branch;
      this.addrate_work_college.rate_work_course_id = this.rate_work_course_stds_in.id_type_course;
      this.addrate_work_college.rate_work_college_class = this.rate_work_course_stds_in.year_course;
      this.addrate_work_college.rate_work_college_id_class = this.rate_work_course_stds_in.rate_work_level_class;

      this.addrate_work_college.update_time = this.date_today;
      this.addrate_work_college.rate_work_college_year = this.year_now;

      /*  console.log(this.addrate_work_college); */

      let result_insert = await this.$http.post(
        "rate_work_college.insert.php",
        this.addrate_work_college
      );

      if (result_insert.data.status == true) {
        this.snackbar.icon = "mdi-font-awesome";
        this.snackbar.color = "success";
        this.snackbar.text = "บันทึกข้อมูลเรียบร้อย";
        this.snackbar.show = true;
        this.rate_work_collegeQuery_20();
        this.course_select();
      } else {
        this.snackbar.icon = "mdi-close-network";
        this.snackbar.color = "red";
        this.snackbar.text = "บันทึกข้อมูลผิดพลาด สาขาวิชาซ้ำ";
        this.snackbar.show = true;
      }
    },

    async rate_work_course_stdQueryAll() {
      let result = await this.$http.post("rate_work_course_std.php", {
        ApiKey: this.ApiKey
      });
      this.rate_work_course_stds = result.data;
    },

    async rate_work_collegeQuery_20() {
      this.loading = true;
      let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
      let result = await this.$http
        .post("rate_work_college.php", {
          ApiKey: this.ApiKey,
          rate_work_college_code: userSession.user_name,
          rate_work_college_id_class: "20"
        })
        .finally(() => (this.loading = false));
      this.rate_work_colleges = result.data;
    },

    async rate_work_collegeQuery_20_sum() {
      this.loading = true;
      let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
      let result = await this.$http
        .post("rate_work_college.php", {
          ApiKey: this.ApiKey,
          rate_work_college_code: userSession.user_name,
          rate_work_college_id_class_20: "Sum"
        })
        .finally(() => (this.loading = false));
      this.rate_work_college_sum_20 = result.data;
    },
    async rate_work_collegeQuery_30_sum() {
      this.loading = true;
      let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
      let result = await this.$http
        .post("rate_work_college.php", {
          ApiKey: this.ApiKey,
          rate_work_college_code: userSession.user_name,
          rate_work_college_id_class_30: "Sum"
        })
        .finally(() => (this.loading = false));
      this.rate_work_college_sum_30 = result.data;
    },

    async rate_work_collegeQuery_30() {
      this.loading = true;
      let userSession = JSON.parse(sessionStorage.getItem("user")) || 0;
      let result = await this.$http
        .post("rate_work_college.php", {
          ApiKey: this.ApiKey,
          rate_work_college_code: userSession.user_name,
          rate_work_college_id_class: "30"
        })
        .finally(() => (this.loading = false));
      this.rate_work_colleges_30 = result.data;
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
      /* console.log(result.data);
      console.log(userSession.user_name); */
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
      /* console.log(result.data); */

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
        this.addrate_work_g.rate_work_g_sup_ta +
        this.addrate_work_g.rate_work_g_sup_tb +
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
        this.addrate_work_g.rate_work_g_sup_ta +
        this.addrate_work_g.rate_work_g_sup_tb +
        this.addrate_work_g.sumteach_a +
        this.addrate_work_g.sumteach_b;
    },
    async rate_work_collegeAdd() {
      this.addrate_work_college = {};
      this.addrate_work_collegedialog = true;
    },

    async addrate_work_collegeSubmit() {},

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
        /*  console.log(result.data);
        console.log(this.addrate_work_g_data); */

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
      return "teal darken-4";
    }
  }
};
</script>
