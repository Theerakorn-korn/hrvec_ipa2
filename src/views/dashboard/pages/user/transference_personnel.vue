<template>
  <v-container id="upgrade" fluid tag="section" class="text_google">
    <v-row justify="center">
      <v-col cols="12" md="12">
        <base-material-card color="primary">
          <template v-slot:heading>
            <h2 class="h1 font-weight-light text_google">
              <v-icon large left>mdi-file-send</v-icon>การย้ายสายการสอน
            </h2>
          </template>
          <v-form ref="addtransference_personnelform" lazy-validation>
            <v-card class="pa-2 ma-2">
              <v-card-title>
                <div class="font-weight-light v-size--x-large">ข้อมูลเบื้องต้น</div>
              </v-card-title>
              <v-row>
                <v-col cols="12" sm="3">
                  <v-text-field
                    v-model="addtransference_personnel.time_s"
                    dense
                    label="ครั้งที่ :"
                    prepend-icon="mdi-account"
                    request
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3">
                  <v-text-field
                    v-model="addtransference_personnel.year_s"
                    dense
                    label="ประจำปี :"
                    prepend-icon="mdi-account"
                    request
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3">
                  <v-text-field
                    v-model="addtransference_personnel.id_card"
                    dense
                    label="เขียนที่ : "
                    prepend-icon="mdi-account"
                    request
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3">
                  <v-text-field
                    v-model="addtransference_personnel.id_card"
                    dense
                    label="วันที่ยื่นคำร้อง : "
                    prepend-icon="mdi-account"
                    request
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3">
                  <v-text-field
                    v-model="addtransference_personnel.id_card"
                    dense
                    label="ชื่อ : "
                    prepend-icon="mdi-account"
                    request
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3">
                  <v-text-field
                    v-model="addtransference_personnel.id_card"
                    dense
                    label="นามสกุล : "
                    prepend-icon="mdi-account"
                    request
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3">
                  <v-text-field
                    v-model="addtransference_personnel.id_card"
                    dense
                    label="เลขที่ตำแหน่ง : "
                    prepend-icon="mdi-account"
                    request
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3">
                  <v-text-field
                    v-model="addtransference_personnel.id_card"
                    dense
                    label="วิทยฐานะ (กรณีข้าราชการครู) : "
                    prepend-icon="mdi-account"
                    request
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="addtransference_personnel.id_card"
                    dense
                    label="สังกัด (สถานศึกษา) : "
                    prepend-icon="mdi-account"
                    request
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="addtransference_personnel.id_card"
                    dense
                    label="รหัสบัตรประชาชน : "
                    prepend-icon="mdi-account"
                    request
                    disabled
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="3">
                  <v-text-field
                    v-model="addtransference_personnel.date_appoinment"
                    dense
                    label="วันที่เริ่มบรรจุเข้ารับราชการ :"
                    prepend-icon="mdi-account"
                    request
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3">
                  <v-text-field
                    v-model="addtransference_personnel.date_appoinment_now"
                    dense
                    label="ระยะเวลาตั้งแต่บรรจุเข้ารับราชการ :"
                    prepend-icon="mdi-account"
                    request
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3">
                  <v-text-field
                    v-model="addtransference_personnel.time_s"
                    dense
                    label="วันที่เริ่มปฏิบัติหน้าที่ในสถานศึกษาปัจจุบัน :"
                    prepend-icon="mdi-account"
                    request
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3">
                  <v-text-field
                    v-model="addtransference_personnel.time_s"
                    dense
                    label="ปฏิบัติหน้าที่เป็นเวลา :"
                    prepend-icon="mdi-account"
                    request
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-text-field
                    v-model="addtransference_personnel.time_s"
                    dense
                    label="สถานะภาพ :"
                    prepend-icon="mdi-account"
                    request
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-row justify="space-around">
                    <v-card width="600">
                      <v-card-title class="mt-8">
                        <v-avatar size="56">
                          <v-icon large left>mdi-cast-education</v-icon>
                        </v-avatar>
                        <p class="ml-3">ประวัติการศึกษา</p>
                      </v-card-title>

                      <v-card-text>
                        <v-timeline align-top dense>
                          <v-timeline-item
                            v-for="item in education_s"
                            :key="item.time"
                            :color="item.color"
                            small
                          >
                            <div>
                              <div
                                class="font-weight-normal"
                              >{{ item.title }} : {{ item.faculty }} : {{ item.branch }}</div>
                            </div>
                          </v-timeline-item>
                        </v-timeline>
                      </v-card-text>
                    </v-card>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>

            <v-card class="pa-2 ma-2">
              <v-card-title>
                <div class="font-weight-light v-size--x-large">ปัจจุบันปฏิบัติการสอน</div>
              </v-card-title>
              <v-row>
                <v-col cols="12" sm="12">
                  <v-row justify="center">
                    <v-card class="mx-auto pa-2">
                      <v-radio-group v-model="radio_tech" row>
                        
                        <v-radio value="dtech" v-on:click="isHidden = true">
                          <template v-slot:label>
                            <div>                            
                              <strong class="warning--text">ไม่ได้ทำการสอน</strong>
                            </div>
                          </template>
                        </v-radio>
                        <v-radio value="tech" v-on:click="isHidden = !isHidden">
                          <template v-slot:label>
                            <div>                             
                              <strong class="primary--text">ทำการสอน</strong>
                            </div>
                          </template>
                        </v-radio>
                      </v-radio-group>                     
                    </v-card>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-card class="pa-2 ma-2" v-if="!isHidden" hidden>
                    <v-row>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          :counter="100"
                          outlined
                          label="วิชาที่สอน ที่ 1:"
                          prepend-icon="mdi-account"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="addtransference_personnel.reason_1"
                          :counter="100"
                          outlined
                          label="วิชาที่สอน ที่ 2:"
                          prepend-icon="mdi-account"
                          request
                          :rules="[(v) => !!v || '']"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="addtransference_personnel.reason_1"
                          :counter="100"
                          outlined
                          label="วิชาที่สอน ที่ 3:"
                          prepend-icon="mdi-account"
                          request
                          :rules="[(v) => !!v || '']"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="addtransference_personnel.reason_1"
                          :counter="100"
                          outlined
                          label="วิชาที่สอน ที่ 4:"
                          prepend-icon="mdi-account"
                          request
                          :rules="[(v) => !!v || '']"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12">
                        <v-text-field
                          v-model="addtransference_personnel.perform_other_duties"
                          outlined
                          label="หน้าที่อื่นที่ได้รับมอบหมาย :"
                          prepend-icon="mdi-account"
                          request
                          :rules="[(v) => !!v || '']"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>

            <v-card class="pa-2 ma-2">
              <v-card-title>
                <div class="font-weight-light v-size--x-large">อยู่ระหว่างช่วยปฏิบัติราชการหรือไม่</div>
              </v-card-title>
              <hr />
              <v-row>
                <v-col cols="12" sm="12">
                  <v-row justify="center">
                    <v-card class="mx-auto pa-2">
                       <v-radio-group row>                        
                        <v-radio>
                          <template v-slot:label>
                            <div>                            
                              <strong class="primary--text">ไม่อยู่</strong>
                            </div>
                          </template>
                        </v-radio>
                        <v-radio>
                          <template v-slot:label>
                            <div>                             
                              <strong class="warning--text">ช่วยปฏิบัติราชการ</strong>
                            </div>
                          </template>
                        </v-radio>
                      </v-radio-group>   
                     
                    </v-card>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-card class="pa-2 ma-2">
                    <v-row>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="addtransference_personnel.reason_1"
                          :counter="100"
                          outlined
                          label="ช่วยปฏิบัติราชการอยู่ที่ :"
                          prepend-icon="mdi-account"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="addtransference_personnel.reason_1"
                          :counter="100"
                          outlined
                          label="เริ่มปฏิบัติราชการ คำสั่งที่ :"
                          prepend-icon="mdi-account"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="addtransference_personnel.reason_1"
                          :counter="100"
                          outlined
                          label="เมื่อวันที่:"
                          prepend-icon="mdi-account"
                          request
                          :rules="[(v) => !!v || '']"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="addtransference_personnel.reason_1"
                          :counter="100"
                          outlined
                          label="ช่วยปฏิบัติราชการเป็นเวลา :"
                          prepend-icon="mdi-account"
                          request
                          :rules="[(v) => !!v || '']"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="addtransference_personnel.reason_1"
                          :counter="100"
                          outlined
                          label="เหตุผลที่ช่วยปฏิบัติราชการ :"
                          prepend-icon="mdi-account"
                          request
                          :rules="[(v) => !!v || '']"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>

            <v-card class="pa-2 ma-2">
              <v-card-title>
                <div
                  class="font-weight-light v-size--x-large"
                >อยู่ระหว่างทดลองปฏิบัติราชการหรือการเตรียมความพร้อมและพัฒนาอย่างเข็มหรือไม่</div>
              </v-card-title>
              <hr />
              <v-row>
                <v-col cols="12" sm="12">
                  <v-row justify="center">
                    <v-card class="mx-auto pa-2">
                      <v-radio-group row>                        
                        <v-radio>
                          <template v-slot:label>
                            <div>                            
                              <strong class="primary--text">ไม่อยู่</strong>
                            </div>
                          </template>
                        </v-radio>
                        <v-radio>
                          <template v-slot:label>
                            <div>                             
                              <strong class="warning--text">อยู่</strong>
                            </div>
                          </template>
                        </v-radio>
                      </v-radio-group>   
                    </v-card>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>

            <v-card class="pa-2 ma-2">
              <v-card-title>
                <div class="font-weight-light v-size--x-large">อยู่ระหว่างลาศึกษาต่อเต็มเวลาหรือไม่</div>
              </v-card-title>
              <hr />
              <v-row>
                <v-col cols="12" sm="12">
                  <v-row justify="center">
                    <v-card class="mx-auto pa-2">
                      <v-radio-group row>                        
                        <v-radio>
                          <template v-slot:label>
                            <div>                            
                              <strong class="primary--text">ไม่อยู่</strong>
                            </div>
                          </template>
                        </v-radio>
                        <v-radio>
                          <template v-slot:label>
                            <div>                             
                              <strong class="warning--text">อยู่</strong>
                            </div>
                          </template>
                        </v-radio>
                      </v-radio-group>   
                    </v-card>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>

            <v-card class="pa-2 ma-2">
              <v-card-title>
                <div
                  class="font-weight-light v-size--x-large"
                >ขอย้ายไปปฏิบัติหน้าที่ในตำแหน่งและหน่วยงานแห่งใหม่ เรียงลำดับดังนี้</div>
              </v-card-title>
              <hr />
              <v-col cols="12" sm="12">
                <v-card class="pa-2 ma-2">
                  <v-row>
                    <v-col cols="12" sm="4">
                      <v-text-field
                        v-model="addtransference_personnel.reason_1"
                        :counter="100"
                        outlined
                        label="ตำแหน่ง : "
                        prepend-icon="mdi-account"
                        request
                        :rules="[(v) => !!v || '']"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-text-field
                        v-model="addtransference_personnel.reason_1"
                        :counter="100"
                        outlined
                        label="สาขาวิชา :"
                        prepend-icon="mdi-account"
                        request
                        :rules="[(v) => !!v || '']"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-text-field
                        v-model="addtransference_personnel.reason_1"
                        :counter="100"
                        outlined
                        label="สังกัด :"
                        prepend-icon="mdi-account"
                        request
                        :rules="[(v) => !!v || '']"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-text-field
                        v-model="addtransference_personnel.reason_1"
                        :counter="100"
                        outlined
                        label="ตำแหน่ง : "
                        prepend-icon="mdi-account"
                        request
                        :rules="[(v) => !!v || '']"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-text-field
                        v-model="addtransference_personnel.reason_1"
                        :counter="100"
                        outlined
                        label="สาขาวิชา :"
                        prepend-icon="mdi-account"
                        request
                        :rules="[(v) => !!v || '']"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-text-field
                        v-model="addtransference_personnel.reason_1"
                        :counter="100"
                        outlined
                        label="สังกัด :"
                        prepend-icon="mdi-account"
                        request
                        :rules="[(v) => !!v || '']"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-text-field
                        v-model="addtransference_personnel.reason_1"
                        :counter="100"
                        outlined
                        label="ตำแหน่ง : "
                        prepend-icon="mdi-account"
                        request
                        :rules="[(v) => !!v || '']"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-text-field
                        v-model="addtransference_personnel.reason_1"
                        :counter="100"
                        outlined
                        label="สาขาวิชา :"
                        prepend-icon="mdi-account"
                        request
                        :rules="[(v) => !!v || '']"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-text-field
                        v-model="addtransference_personnel.reason_1"
                        :counter="100"
                        outlined
                        label="สังกัด :"
                        prepend-icon="mdi-account"
                        request
                        :rules="[(v) => !!v || '']"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="addtransference_personnel.reason_1"
                        :counter="100"
                        outlined
                        label="ขอย้ายสับเปลี่ยนตำแหน่งกับ (นาย/นาง/นางสาว) :"
                        prepend-icon="mdi-account"
                        request
                        :rules="[(v) => !!v || '']"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="3">
                      <v-text-field
                        v-model="addtransference_personnel.reason_1"
                        :counter="100"
                        outlined
                        label="ตำแหน่ง :"
                        prepend-icon="mdi-account"
                        request
                        :rules="[(v) => !!v || '']"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="3">
                      <v-text-field
                        v-model="addtransference_personnel.reason_1"
                        :counter="100"
                        outlined
                        label="วิทยฐานะ :"
                        prepend-icon="mdi-account"
                        request
                        :rules="[(v) => !!v || '']"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-text-field
                        v-model="addtransference_personnel.reason_1"
                        :counter="100"
                        outlined
                        label="เลขที่ตำแหน่ง :"
                        prepend-icon="mdi-account"
                        request
                        :rules="[(v) => !!v || '']"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-text-field
                        v-model="addtransference_personnel.reason_1"
                        :counter="100"
                        outlined
                        label="สังกัด :"
                        prepend-icon="mdi-account"
                        request
                        :rules="[(v) => !!v || '']"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-card>

            <v-card class="pa-2 ma-2">
              <v-card-title>
                <div class="font-weight-light v-size--x-large" color="pink darken-2">เหตุผลการขอย้าย</div>
              </v-card-title>
              <hr />
              <v-col cols="12" sm="12">
                <v-card>
                  <v-card-text>
                    <v-row align="center">
                      <v-card-title>
                        <div class="font-weight-light v-size--x-large">ย้ายเพื่ออยู่ร่วมคู่สมรส</div>
                      </v-card-title>
                      <v-checkbox v-model="move_spouse" hide-details class="shrink mr-2 mt-0"></v-checkbox>
                      <v-text-field :disabled="!move_spouse" label="คู่สมรสชื่อ : "></v-text-field>
                      <v-text-field :disabled="!move_spouse" label="คู่สมรสประกอบอาชีพ : "></v-text-field>
                      <v-text-field
                        :disabled="!move_spouse"
                        label="สถานที่ประกอบอาชีพของคู่สมรส : "
                      ></v-text-field>
                      <v-text-field :disabled="!move_spouse" label="ภูมิลำเนาของคู่สมรส จังหวัด : "></v-text-field>
                    </v-row>
                    <v-row align="center">
                      <v-card-title>
                        <div class="font-weight-light v-size--x-large">ย้ายเพื่อดูแลบิดา มารดา :</div>
                      </v-card-title>
                      <v-checkbox v-model="move_parents" hide-details class="shrink mr-2 mt-0"></v-checkbox>
                      <v-text-field :disabled="!move_parents" label="อายุของบิดาปี"></v-text-field>
                      <v-text-field :disabled="!move_parents" label="อายุของมารดาปี"></v-text-field>
                      <v-text-field
                        :disabled="!move_parents"
                        label="ภูมิลำเนาของบิดา มารดา จังหวัด"
                      ></v-text-field>
                    </v-row>
                    <v-row align="center">
                      <v-card-title>
                        <div
                          class="font-weight-light v-size--x-large"
                        >ย้ายกลับภูมิลำเนาของข้าพเจ้า จังหวัด :</div>
                      </v-card-title>
                      <v-checkbox v-model="move_domicile" hide-details class="shrink mr-2 mt-0"></v-checkbox>
                      <v-text-field :disabled="!move_domicile" label="จังหวัด : "></v-text-field>
                    </v-row>
                    <v-row align="center">
                      <v-card-title>
                        <div class="font-weight-light v-size--x-large">เหตุผลอื่น :</div>
                      </v-card-title>
                      <v-checkbox v-model="another_reason" hide-details class="shrink mr-2 mt-0"></v-checkbox>
                      <v-text-field :disabled="!another_reason" label="(ระบุ) : "></v-text-field>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-card>

            <v-card class="pa-2 ma-2">
              <v-card-title>
                <div class="font-weight-light v-size--x-large">เอกสารประกอบการพิจารณา</div>
              </v-card-title>
              <hr />
              <v-row>
                <v-col cols="12" sm="12">
                  <v-textarea
                    v-model="selected"
                    auto-grow
                    :counter="173"
                    dense
                    filled
                    prepend-icon="mdi-account"
                    request
                    :rules="[(v) => !!v || '']"
                    disabled
                  >{{ selected }}</v-textarea>
                  <v-row class="pa-4 mt-0">
                    <v-col cols="12" sm="4">
                      <v-checkbox
                        v-model="selected"
                        label="สำเนา กพ.7/ก.ค.ศ.16 ที่เป็นปัจจุบัน"
                        value="สำเนา กพ.7/ก.ค.ศ.16 ที่เป็นปัจจุบัน"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-checkbox
                        v-model="selected"
                        label="สำเนาทะเบียนบ้านของตน"
                        value="สำเนาทะเบียนบ้านของตน"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-checkbox
                        v-model="selected"
                        label="สำเนาทะเบียนบ้านของบิดา มารดา"
                        value="สำเนาทะเบียนบ้านของบิดามารดา"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-checkbox
                        v-model="selected"
                        label="สำเนาทะเบียนบ้านของคู่สมรส"
                        value="สำเนาทะเบียนบ้านของคู่สมรส"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-checkbox
                        v-model="selected"
                        label="สำเนาทะเบียนสมรส"
                        value="สำเนาทะเบียนสมรส"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-checkbox
                        v-model="selected"
                        label="สำเนาคำสั่งย้ายไปดำรงตำแหน่งใหม่ของคู่สมรส"
                        value="สำเนาคำสั่งย้ายไปดำรงตำแหน่งใหม่ของคู่สมรส"
                      ></v-checkbox>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
            <v-card class="pa-1">
              <v-card-text>
                <v-row align="center" justify="space-around">
                  <div>
                    <v-btn
                      x-large
                      color="success"
                      dark
                      class="ma-2"
                      @click.stop="addtransference_personnelSubmit()"
                      round
                    >
                      <v-icon>mdi-content-save</v-icon>
                      <span>บันทึก</span>
                    </v-btn>

                    <v-btn
                      x-large
                      color="warning"
                      dark
                      class="mr-0"
                      @click.stop="isEditing = !isEditing"
                      round
                    >
                      <v-icon>mdi-close</v-icon>
                      <span>ยกเลิก</span>
                    </v-btn>
                  </div>
                </v-row>
              </v-card-text>
            </v-card>
          </v-form>
        </base-material-card>
      </v-col>
    </v-row>
    <v-container fluid>
      <v-snackbar
        v-model="snackbar.show"
        multi-line
        vertical
        top
        auto-height
        :timeout="snackbar.timeout"
        :color="snackbar.color"
      >
        <v-icon large>{{ snackbar.icon }}</v-icon>
        <br />
        {{ snackbar.text }}
        <v-btn dark flat @click="snackbar.show = false">Close</v-btn>
      </v-snackbar>
    </v-container>
  </v-container>
</template>

<script>
import Password from "vue-password-strength-meter";
export default {
  name: "DashboardDashboard",
  addtransference_personneldialog: false,
  components: { Password },

  data: () => ({
    isHidden: false,
    move_spouse: false,
    move_parents: false,
    move_domicile: false,
    another_reason: false,

    selected: [],
    reason_transfer: [],
    transference_personnel: [],
    addtransference_personnel: {},
    provinces: [],
    prefectures: [],
    district: [],
    district_post_s: [],
    password: null,
    snackbar: {
      show: false,
      color: "",
      timeout: 5000,
      icon: "",
      text: "",
    },
    education_s: [
      {
        title: "ต่ำกว่าปริญญาตรี",
        faculty: "",
        time: "10:42am",
        branch: "",
        color: "deep-purple lighten-1",
      },
      {
        title: "ปริญญาตรี",
        time: "10:42am",
        faculty: "บธ.บ.",
        branch: "ระบบสารสนเทศทางคอมพิวเตอร์",
        color: "green",
      },
      {
        title: "ปริญญาโท",
        faculty: "",
        time: "10:42am",
        branch: "",
        color: "deep-purple lighten-1",
      },
      {
        title: "ปริญญาเอก",
        faculty: "",
        time: "10:42am",
        branch: "",
        color: "deep-purple lighten-1",
      },
    ],

    isEditing: null,
    model: null,
    show1: false,
  }),

  async mounted() {
    this.provinceQueryAll();
  },

  methods: {
    async provinceQueryAll() {
      let result = await this.$http.post("province.php");
      this.provinces = result.data;
    },

    async prefectureQueryAll(province_ID) {
      let result = await this.$http.post("prefecture.php", {
        province_ID: province_ID,
      });
      this.prefectures = result.data;
    },

    async districtQueryAll(prefecture_ID) {
      let result = await this.$http.post("districts.php", {
        prefecture_ID: prefecture_ID,
      });
      this.district = result.data;
    },

    async transference_personnelAdd() {
      this.addtransference_personnel = {};
      //this.addtransference_personneldialog = true
    },

    async getAlltransference_personnel() {
      let result = await this.$http.post("crud_transference_personnel.php");
      this.transference_personnel = result.data;
    },

    async addtransference_personnelSubmit() {
      if (this.$refs.addtransference_personnelform.validate()) {
        let result = await this.$http.post(
          "crud_transference_personnel.php?crud=create",
          this.addtransference_personnel
        );
        if (result.data.status == true) {
          this.transference_personnel = result.data;
          this.snackbar.icon = "mdi-checkbox-marked-circle";
          this.snackbar.color = "success";
          this.snackbar.text = "บันทึกข้อมูลเรียบร้อย";
          this.snackbar.show = true;
        } else {
          this.snackbar.icon = "error";
          this.snackbar.color = "red";
          this.snackbar.text = "บันทึกข้อมูลผิดพลาด รหัสบัตรประชาชนซ้ำ";
          this.snackbar.show = true;
        }
      }
    },

    async clear() {
      this.$v.$reset();
      this.id_card = "";
      this.u_name = "";
      this.p_word = "";
      this.name_m = "";
      this.email_m = "";
      this.tel_m = "";
      this.add_m = "";
      this.province_ID = null;
      this.prefecture_ID = null;
      this.district_ID = null;
      this.district_post_s = null;
      this.pic_s = "";
    },
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

    addtransference_personnelProvinceChange() {
      return this.addtransference_personnel.province_ID;
    },
    addtransference_personnelprefectureChange() {
      return this.addtransference_personnel.prefecture_ID;
    },
    addtransference_personneldistrictChange() {
      return this.addtransference_personnel.district_ID;
    },

    editCtransference_personnelProvinceChange() {
      return this.editctransference_personnel.province_ID;
    },
    editCtransference_personnelprefectureChange() {
      return this.editctransference_personnel.prefecture_ID;
    },
    editCtransference_personneldistrictChange() {
      return this.editctransference_personnel.district_ID;
    },
  },
  watch: {
    async addtransference_personnelProvinceChange() {
      this.prefectureQueryAll(this.addtransference_personnel.province_ID);
    },
    async addtransference_personnelprefectureChange() {
      this.districtQueryAll(this.addtransference_personnel.prefecture_ID);
    },
    async addtransference_personneldistrictChange() {
      this.district_PostQueryAll(this.addtransference_personnel.district_ID);
    },
    async editCtransference_personnelProvinceChange() {
      this.prefectureQueryAll(this.editctransference_personnel.province_ID);
    },
    async editCtransference_personnelprefectureChange() {
      this.districtQueryAll(this.editctransference_personnel.prefecture_ID);
    },
    async editCtransference_personneldistrictChange() {
      this.district_PostQueryAll(this.editctransference_personnel.district_ID);
    },
  },
};
</script>

<style lang="sass">
#upgrade
  .v-data-table
    th, td
      border: none !important
</style>
<style>
@import url("https://fonts.googleapis.com/css2?family=Kanit:wght@300&display=swap");
</style>

<style>
.text_google {
  font-family: "Kanit", sans-serif;
}
</style>