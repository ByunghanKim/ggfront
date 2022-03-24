<template>
  <div id="div-main">
    <v-container fluid style="width: 80rem" class="my-16">
      <v-row justify="center">
        <h1>사진첩</h1>
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
                max-width="1000"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-card
                    color="rgb(192, 192, 192, 0.3)"
                    v-bind="attrs"
                    v-on="on"
                    class="ma-1"
                    max-width="200"
                    max-height="200"
                >
<!--                  <v-img :src="`http://localhost:8080/api/imgboard/img/` + item.img_name" width="200" height="200"/>-->
                  <v-img :src="imgList[i]" width="200" height="200"/>


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
<!--                    <v-img :src="`http://localhost:8080/api/imgboard/img/` + item.img_name" max-height="750"/>-->
                    <v-img :src="imgList[i]" max-height="750"/>



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
                      <v-btn
                          @click="close"
                      >X</v-btn>
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
import axios from "axios";
import {store} from "@/store/store";

export default {
  name: "ImageBoard",
  components: {UploadButton},
  created() {
    this.getData();
  },
  mounted() {

  },
  data() {
    return {
      img: [],
      imgList: [],

    }
  },
  methods: {
    getData() {
      axios.defaults.headers.common['Authorization'] = store.state.loginStore.token;
      this.$axios.get("http://localhost:8080/api/imgboard/load")
          .then(async (res) => {
            const parse = JSON.parse(JSON.stringify(res));

            this.img = parse.data;

            for (let i = 0; i < this.img.length; i++) {
              await axios.get("http://localhost:8080/api/imgboard/img/" + this.img[i].img_name, {responseType: 'arraybuffer'})
                  .then((res) => {

                    //let front = "data:image;base64,";
                    let buffer = Buffer.from(res.data, 'base64');
                    let blob = new Blob([buffer], {type: 'image/jpeg'})
                    let data = URL.createObjectURL(blob);

                    console.log(data);
                    this.imgList.push(data);
                  })
                  .catch((err) => {
                    console.log(err)
                  });
            }

          })
          .catch((error) => {
            console.log("wegwegweg"+error)
          })
          .finally(() => {

          });
    },

  },
}
</script>

<style scoped>


</style>