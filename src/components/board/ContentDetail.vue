<template>
  <v-container class="mt-16">
    <v-row no-gutters>
      <hr style="height: 3px; background-color: grey; width: 100%"/>
    </v-row>
    <v-row no-gutters align="center" class="mt-5 mb-5">
      <v-col cols="6" class="ml-1" style="font-size: 30px;">{{ content.title }}</v-col>
      <v-spacer/>
      <v-col style="text-align: right;">{{ content.date }}</v-col>
    </v-row>
    <v-row no-gutters>
      <hr style="height: 3px; background-color: grey; width: 100%"/>
    </v-row>
    <v-row no-gutters align="center" class="mt-3 mb-3">
      <v-col cols="2" style="text-align: center;">{{ content.writer }}</v-col>
      <v-spacer/>
      <v-col cols="1" style="text-align: center; font-size: 12px; border: 1px solid black;">
        댓글수:{{ content.reply_num }}
      </v-col>
      <v-col cols="1" style="text-align: center; font-size: 12px; border: 1px solid black;">조회수:{{ content.views }}
      </v-col>
      <v-col cols="1" style="text-align: center; font-size: 12px; border: 1px solid black;">추천:{{ content.likes }}
      </v-col>
    </v-row>
    <v-row no-gutters>
      <hr style="height: 3px; background-color: grey; width: 100%;"/>
    </v-row>
    <v-row no-gutters>
      <v-col class="ml-1 mt-5 mb-16" v-html="content.content"></v-col>
    </v-row>
    <v-row no-gutters class="mt-16" align="center" justify="center">
      <v-btn>좋아요 {{ content.likes }}</v-btn>
    </v-row>
    <v-row no-gutters class="mt-16">
      <hr style="height: 3px; background-color: grey; width: 100%"/>
    </v-row>
    <v-row no-gutters class="mt-5" align="center">
      <v-col cols="1" style="font-weight: bold">댓글 {{ content.reply_num }}</v-col>
      <v-spacer/>
      <v-col cols="1" align="center">
        <v-btn
            v-if="this.$store.state.loginStore.role === 'ROLE_ADMIN'"
            height="30px"
            @click="updateDetail"
        >
          수정
        </v-btn>
      </v-col>
      <v-col cols="1" align="center">
        <v-btn
            v-if="this.$store.state.loginStore.role === 'ROLE_ADMIN'"
            height="30px"
            @click="deleteDetail"
        >
          삭제
        </v-btn>
      </v-col>
    </v-row>

    <Reply
        class="mt-3"
        v-for="(item,i) in reply"
        v-bind:key="i"
        :reply="item"
    ></Reply>

    <v-row no-gutters class="mt-3" v-if="userId !== ''">
      <v-col cols="11">
        <v-textarea
            auto-grow
            outlined
            rows="3"
            v-model="replyContent"
        ></v-textarea>
      </v-col>
      <v-col align="center">
        <v-btn
            @click="sendReply"
        >등록</v-btn>
      </v-col>
    </v-row>
    <v-row no-gutters class="mt-3" v-if="userId === ''">
      <v-col cols="11">
        <v-textarea
            auto-grow
            outlined
            value="댓글을 남기려면 로그인 하세요."
            readonly
            rows="3"
        ></v-textarea>
      </v-col>
      <v-col align="center">
        <v-btn
        >등록</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import axios from "axios";
import Reply from "@/components/board/Reply";

export default {
  name: "ContentDetail",
  components: {Reply},
  props: {
    content: Object,
    reply: Array,
    boardType: String,
  },
  computed: {
    replyWithBrTags() {
      const doc = this.replyContent;
      return doc.replace(/\n/g,"<br>");
    }
  },
  data() {
    return {
      userId: this.$store.state.loginStore.id,
      replyContent: '',
      contentNum: this.content.num,
    }
  },
  methods: {
    deleteDetail() {

      if (confirm("정말 삭제하시겠습니까?") && this.content.writer === this.$store.state.loginStore.id) {

        const fd = new FormData();
        fd.append("num", this.content.num);
        fd.append("boardType", this.boardType);

        axios.post("http://localhost:8080/api/board/delete", fd)
            .then((res) => {
              if (res.status === 200) {
                this.$router.push('/notice');
              }
            }).catch((err) => {
          alert("삭제 실패")
          console.log(err);
        });
      }
    },
    updateDetail() {
      if (confirm("수정하시겠습니까?") && this.content.writer === this.$store.state.loginStore.id) {

        axios.get("http://localhost:8080/api/board/freeboard/detail", {
          params: {
            boardType: this.boardType,
            num: this.content.num,
          },
        })
            .then((res) => {
              this.$router.push(
                  {
                    name: 'BoardUpdate',
                    query: {
                      boardType: this.boardType,
                      num: this.content.num,
                      content: res.data,
                    }
                  });
            })
            .catch((err) => {
              alert("수정 권한이 없습니다.");
              console.log(err);
            });

      } else if (this.content.writer !== this.$store.state.loginStore.id) {
        alert("수정 권한이 없습니다.");
      }
    },
    sendReply() {

      const fd = new FormData();

      fd.append("boardType", this.boardType);
      fd.append("id", this.userId);
      fd.append("content", this.replyWithBrTags);
      fd.append("contentNum", this.content.num);

      axios.post("http://localhost:8080/api/board/freeboard/insert/reply",fd)
          .then((res)=>{
            if(res.status === 200) {
              this.$router.history.go(0);
            }
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