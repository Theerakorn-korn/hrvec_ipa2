<template>
  <div>
    <v-container>
      <v-card>
        <!--  <form
        @submit.prevent="sendFile"
        lazy-validation
        enctype="multipart/form-data"
      >
        <input
          type="file"
          id="ob_personal_document"
          ref="ob_personal_document"
        />
        <v-btn
          outlined
          small
          class="ma-1"
          color="warning"
          @click="uploadFile()"
        >
          <v-icon small class="mr-2">fas fa-edit</v-icon>บันทึก
        </v-btn>
      </form>
 -->
        <v-btn
          outlined
          small
          class="ma-1"
          color="warning"
          @click="updateImageForm"
        >
          <v-icon small class="mr-2">fas fa-edit</v-icon>เพิ่มไฟล์ภาพ
        </v-btn>
        <v-dialog v-model="updateImageDialog" persistent overlay-opacity="0.6">
          <v-card class="col-md-6 mx-auto orange lighten-5 rounded-lg">
            <v-form
              ref="updateImageform"
              v-model="updateImageValid"
              lazy-validation
              @submit.prevent="updateImageItem()"
              enctype="multipart/form-data"
            >
              <v-card-title>
                <span class="headline green--text text--darken-4"
                  >ทดสอบอัปโหลดไฟล์ VUE</span
                >
              </v-card-title>
              <v-divider class="mt-3 mb-5"></v-divider>
              <v-card-text class="px-md-10">
                <v-text-field
                  v-model="memberData.p_name"
                  dense
                  filled
                  label="สินค้า : "
                  item-value="p_name"
                  prepend-icon="mdi-barcode"
                  request
                  :rules="[(v) => !!v || '']"
                ></v-text-field>

                <v-file-input
                  label="เลือกไฟล์ภาพประจำตัว"
                  ref="ob_personal_document"
                  show-size
                  outlined
                  dense
                  rounded
                  clearable
                  @change="selectImage"
                ></v-file-input>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn rounded @click="updateImageDialog = false">ยกเลิก</v-btn>
                <v-btn rounded color="success" type="submit">บันทึก</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
      </v-card>
    </v-container>
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
        <v-btn dark flat @click="snackbar.show = false"> Close </v-btn>
      </v-snackbar>
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      snackbar: {
        show: false,
        color: "",
        timeout: 5000,
        icon: "",
        text: "",
      },
      memberData: {},
      updateImageValid: false,
      updateImageDialog: false,
      updateImageData: {},
      ob_personal_document: "",
    };
  },
  methods: {
    updateImageForm() {
      this.memberData = {};
      this.updateImageData = {};
      this.updateImageDialog = true;
    },
    selectImage(file) {
      this.updateImageData.ob_personal_document = file;
    },
    updateImageItem: function () {
      this.$refs.updateImageform.validate();
      this.updateImageData.p_name = this.memberData.p_name;
      if (this.updateImageValid) {
        let formData = new FormData();
        formData.append(
          "ob_personal_document",
          this.updateImageData.ob_personal_document
        );
        formData.append("p_name", this.updateImageData.p_name);
        this.$http
          .post("file.php", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then(function (response) {
            if (!response.data) {
              alert("File not uploaded.");
            } else {
              alert("File uploaded successfully.");
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        this.updateImageDialog = false;
      }
    },
  },
};
</script>

<style>
</style>