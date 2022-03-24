<template>
  <div id="div-main">
    <v-container fluid style="width: 80rem" class="my-16">
      <v-row justify="center">
        <h1>사진첩 TestPage3</h1>
      </v-row>
      <v-container class="my-16">
        <v-layout row wrap>
          <v-row no-gutters>
            <UploadButton></UploadButton>
          </v-row>
        </v-layout>
        <v-layout wrap class="my-8">
          <v-row class="px-0" dense justify="center">
            <v-dialog

                v-for="(item,i) in img"
                v-bind:key="i"
                max-width="80%"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-card
                    loading
                    color="rgb(192, 192, 192, 0.3)"
                    v-bind="attrs"
                    v-on="on"
                    class="ma-1"
                    max-width="200"
                    max-height="200"
                >

<!--                  <v-img :src="`http://localhost:8080/api/imgboard/img/` + item.img_name" width="200" height="200"/>-->
                  <img v-auth-image="`http://localhost:8080/api/imgboard/img/` + item.img_name" width="200" height="200"/>

                </v-card>
              </template>
              <!--클릭 후 상세페이지-->
              <v-card
                  width="1000"
                  height="760"
                  color="rgb(192, 192, 192, 0.3)"
                  align="center"
              >
                <v-row no-gutters class="fill-height" align="center">
                  <v-col cols="8" style="border: 1px solid black;">

                    <v-img :src="`http://localhost:8080/api/imgboard/img/` + item.img_name" max-height="750"/>
                  </v-col>
                  <v-col style="border: 1px solid black;">
                    <v-card
                      height="750"
                    >
                      <v-card-title>
                        {{ item.title }}
                      </v-card-title>
                      <v-divider class="mx-4"></v-divider>
                      <v-card-text align="center">
                        {{ item.content }}
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card>
            </v-dialog>
          </v-row>
        </v-layout>
      </v-container>
    </v-container>


  </div>
</template>

<script>

import UploadButton from "@/components/Upload/UploadButton";

export default {
  name: "TestPage3",
  components: {UploadButton},
  created() {

    this.getData();
  },
  mounted() {

  },
  data() {
    return {
      img: [],

    }
  },
  methods: {
    getData() {
      this.$axios.get("http://localhost:8080/api/imgboard/load")
          .then((res) => {
            const parse = JSON.parse(JSON.stringify(res));
            this.img = parse.data;
          })
          .catch((error) => {
            console.log("이미지 정보 불러오기 에러 : " + error)
          })
          .finally(() => {

          });
    }
  },
}
</script>

<style scoped>


</style>