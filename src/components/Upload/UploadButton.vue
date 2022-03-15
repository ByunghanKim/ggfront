<template>
  <v-container>
    <v-row justify="end" class="mr-7">
    <v-dialog
        v-model="dialog"
        width="500"
        v-on:close="deleteAll"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            color="yellow"
            v-on="on"
            v-bind="attrs"
        >
          UPLOAD
        </v-btn>
      </template>
      <v-card
          height="40em"
      >
        <v-layout>
          <v-row class="mt-15" no-gutters justify="center" dense>
            <v-col cols="6" style="text-align: center">
              <h1>사진 업로드</h1>
            </v-col>
          </v-row>
        </v-layout>
        <v-layout wrap class="ml-10">
          <v-row no-gutters>
            <v-col cols="11" class="mt-16">
              <v-text-field
                  outlined
                  label="제목"
                  hide-details="auto"
                  v-model="dtoArray.title"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-layout>
        <v-layout wrap class="ml-10">
          <v-row no-gutters>

            <v-col class="mt-5" cols="11">
              <v-textarea
                  outlined
                  counter
                  label="내용"
                  auto-grow
                  v-model="dtoArray.content"
              >

              </v-textarea>
            </v-col>

            <v-col cols="11">
              <v-file-input
                  v-model="dtoArray.image"
                  label="업로드 하려면 클릭하세요."
              >

              </v-file-input>
            </v-col>
            <v-col cols="3"/>
            <v-col cols="3"/>
            <v-col cols="3">
              <v-btn
                  outlined
                  text
                  @click="uploadImage"
              >UPLOAD
              </v-btn>
            </v-col>
            <v-col cols="3">
              <v-btn
                  outlined
                  @click="deleteAll"
                  text
              >CLOSE
              </v-btn>
            </v-col>

          </v-row>
        </v-layout>
      </v-card>
    </v-dialog>
      </v-row>
  </v-container>
</template>

<script>
export default {
  name: "UploadButton",
  data() {
    return {
      dtoArray: {
        title: null,
        content: null,
        image: null
      },
      dialog: false,
    }
  },
  methods: {
    deleteAll() {
      this.dialog = false;
      this.dtoArray.title = null;
      this.dtoArray.content = null;
    },
    uploadImage() {
      const fd = new FormData();
      fd.append("title",this.dtoArray.title);
      fd.append("content",this.dtoArray.content);
      fd.append("image",this.dtoArray.image);

      this.$axios.post("http://localhost:8080/api/imgboard/img/upload",fd,{ headers:{'Content-Type':'multipart/form-data'}})
      .then(res => {
        console.log(res);
        this.$router.go(0);
      }).catch(error => {
        console.log(error);
      }).finally(()=>{
        console.log("이미지 업로드 완료");
      });
    }
  }
}
</script>

<style scoped>
</style>