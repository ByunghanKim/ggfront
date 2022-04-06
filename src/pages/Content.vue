<template>
  <v-container style="width: 80%">
    <ContentDetail :content="content" :board-type="boardType"></ContentDetail>
  </v-container>
</template>

<script>
import ContentDetail from "@/components/board/ContentDetail";
import axios from "axios";
export default {
  name: "Content",
  components: {ContentDetail},
  props: {
    boardType: String,
    num: [],
  },
  created() {
    this.load();
  },
  data() {
    return {
      content: {},
    }
  },
  methods: {
    load() {
      axios.get("http://localhost:8080/api/board/freeboard/detail", {
        params: {
          boardType: this.boardType,
          num: parseInt(this.num),
        }
      }).then((res) => {
        this.content = res.data;
        this.convertDate();
      }).catch((err) => {
        console.log(err);
      })
    },
    convertDate() {
      let date = this.content.date;
      let newDate = new Date(date);
      this.content.date = newDate.toLocaleString();

    }
  }
}
</script>

<style scoped>

</style>