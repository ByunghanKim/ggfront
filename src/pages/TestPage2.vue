<template>
  <div id="div-main">
    <v-container fluid style="width: 80rem" class="my-16">
      <v-row justify="center">
        <h1>사진첩 TestPage2</h1>
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
                width="1000"

            >
              <template v-slot:activator="{ on, attrs }">
                <v-card
                    :loading="loading"
                    color="rgb(192, 192, 192, 0.3)"
                    align="center"
                    v-bind="attrs"
                    v-on="on"
                    class="ma-1 "
                    width="200"
                    height="200"
                    style="border: 1px solid black;"
                >
                  <v-img :src="`http://localhost:8080/api/imgboard/img/` + item.img_name" max-height="100%" max-width="100%"
                  />
                </v-card>
              </template>
              <!--클릭 후 상세페이지-->
              <v-layout>
                <v-row no-gutters>
                  <v-col>
                    <v-card
                        height="700"
                        align="center"
                    >
                      <img :src="`http://localhost:8080/api/imgboard/img/` + item.img_name" height="100%">

                    </v-card>
                  </v-col>
                  <v-col>
                    <v-card
                        height="700"
                        align="center"
                    >
                      {{ item.title }}
                      {{ item.date }}
                      {{ item.content }}
                    </v-card>
                  </v-col>
                </v-row>
              </v-layout>
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
  name: "TestPage2",
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
            console.log(error)
          })
          .finally(() => {

          });
    }
  },
}
</script>

<style scoped>


</style>