<template>
  <v-container>
    <v-row no-gutters class="mt-16" align="center" justify="center">
      <h1 style="text-align: center">글쓰기</h1>
    </v-row>
    <v-row no-gutters class="mt-16">
      <v-text-field
          dense
          label="제목"
          outlined
          v-model="title"
      ></v-text-field>
    </v-row>
    <v-row no-gutters>
      <v-textarea

          auto-grow
          outlined
          label="내용"
          v-model="content"

      ></v-textarea>
    </v-row>
    <v-row no-gutters>
      <v-col style="text-align: center">
        <v-btn
            @click="submit"
        >글 올리기
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import axios from "axios";

export default {
  name: "BoardWrite",
  props: {
    boardType: String,
  },
  computed: {
    withBrTags() {
      const doc = this.content;
      return doc.replace(/\n/g,"<br>");
    }
  },
  data() {
    return {
      title: '',
      content: '',
    }
  },
  methods: {
    submit() {
      const fd = new FormData();

      fd.append("title", this.title);
      fd.append("content", this.withBrTags);
      fd.append("writer", this.$store.state.loginStore.id);
      fd.append("boardType", this.boardType);

      axios.post("http://localhost:8080/api/board/freeboard/insert", fd)
          .then((res) => {
            if(res.status === 200) {
              this.$router.push('/notice');
            }
          })
          .catch((err) => {
            console.log(err);
          });
    },
  }
}
</script>

<style scoped>

</style>