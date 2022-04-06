<template>
  <v-container>
    <v-row no-gutters class="mt-16" align="center" justify="center">
      <h1 style="text-align: center">글 수정하기</h1>
    </v-row>
    <v-row no-gutters class="mt-16">
      <v-text-field
          dense
          label="제목"
          outlined
          v-model="tmpTitle"
      ></v-text-field>
    </v-row>
    <v-row no-gutters>
      <v-textarea

          auto-grow
          outlined
          label="내용"
          v-model="tmpContent"

      ></v-textarea>
    </v-row>
    <v-row no-gutters>
      <v-col style="text-align: center">
        <v-btn
            @click="submit"
        >수정하기
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "BoardUpdate",
  props: {
    boardType: String,
    num: [],
    content: Object,
  },
  computed: {
    changeBr() {
      const doc = this.tmpContent;
      return doc.replace(/\n/g,"<br>");
    }
  },
  data() {
    return {
      tmpTitle: this.content.title,
      tmpContent: this.content.content.replaceAll("<br>", "\n")
    }
  },
  methods: {
    submit() {
      const fd = new FormData();
      fd.append("boardType", this.boardType);
      fd.append("num", this.num);
      fd.append("title", this.tmpTitle);
      fd.append("content", this.changeBr);
      axios.post("http://localhost:8080/api/board/update",fd)
          .then((res)=>{
            console.log(res);
            this.$router.go(-1);
          })
          .catch((err)=>{
            console.log(err);
          });
    }
  }
}
</script>

<style scoped>

</style>