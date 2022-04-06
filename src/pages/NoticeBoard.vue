<template>
  <v-container style="width: 80%" class="mt-16">
    <div style="text-align: center">
      <h1>공지사항</h1>
    </div>
    <v-container class="mt-16">
      <BoardList :board-type="boardType" :list="list"/>
      <v-row no-gutters align="center">
        <v-spacer/>
        <v-btn
            v-if="this.$store.state.loginStore.role === 'ROLE_ADMIN'"
            @click="goWrite"
        >글쓰기
        </v-btn>
      </v-row>
      <v-pagination
          class="mt-5"
          v-model="page"
          :length="totalPage"
          total-visible="10"
          @input="changePage"
      ></v-pagination>
    </v-container>
  </v-container>
</template>

<script>
import BoardList from "@/components/board/BoardList";
import axios from "axios";

export default {
  name: "NoticeBoard",
  components: {BoardList},
  created() {
    this.onLoad();
  },
  data() {
    return {
      boardType: 'notice',
      list: [],
      contentInPage: 10,
      totalContents: 0,
      totalPage: 0,
      limit: 10,
      offset: 0,
      page: 1,

    }
  },
  methods: {
    onLoad() {
      axios.get("http://localhost:8080/api/board/freeboard/load", {
        params: {
          boardType: this.boardType,
          limit: this.limit,
          offset: this.offset,
        }
      }).then((res) => {

        this.list = res.data

        this.convertDate();
      }).then(() => {
        axios.get("http://localhost:8080/api/board/freeboard/num", {
          params: {
            boardType: this.boardType,
          }
        }).then((res) => {
          this.totalContents = res.data;

          this.getTotalPage(this.contentInPage, this.totalContents);


        }).catch((err) => {
          console.log(err);
        })
      })
          .catch((err) => {
            console.log(err)
          });
    },
    convertDate() {

      let today = new Date().toISOString().split("T")[0];

      for (let i = 0; i < this.list.length; i++) {

        let date = this.list[i].date;

        let newDate = new Date(date);

        let tmp = newDate.toISOString().split("T")[0];

        if (today === tmp) {
          let hour = newDate.getHours();
          let min = newDate.getMinutes();
          this.list[i].date = hour + ":" + min;
        } else {
          this.list[i].date = tmp;
        }

        //this.list[i].date = new Date(date).toISOString().replace("T", " ").replace(/\..*/, '');
        //console.log(this.list[i].date);
      }
    },
    getTotalPage(contentInPage, totalContents) {
      if (totalContents % contentInPage === 0) {
        this.totalPage = totalContents / contentInPage;
      } else {
        this.totalPage = parseInt(totalContents / contentInPage) + 1;
      }
    },
    changePage() {

      this.offset = this.page - 1;

      axios.get("http://localhost:8080/api/board/freeboard/load", {
        params: {
          boardType: this.boardType,
          limit: this.limit,
          offset: this.offset,
        }
      }).then((res) => {

        this.list = res.data

        this.convertDate();
      }).catch((err) => {
        console.log(err);
      })
    },
    goWrite() {
      if (this.$store.state.loginStore.role === "ROLE_ADMIN") {
        this.$router.push({name: 'BoardWrite', query:{boardType: this.boardType}});
      } else {
        alert("운영자만 작성 가능합니다.");
      }
    },
  }

}
</script>

<style scoped>

</style>