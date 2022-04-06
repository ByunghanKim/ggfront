<template>
  <v-container class="grey lighten-3 fill-height">
    <v-row>
      <v-col align="center">
        <v-card
            width="500"
            height="500"
        >
          <v-card-title class="justify-center">
            <h1 class="mt-16">GGWeb</h1>
          </v-card-title>
          <div class="mt-16">
            <v-row no-gutters class="justify-center">
              <v-col cols="7">
                <v-text-field label="ID" solo v-model="id"></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters class="justify-center">
              <v-col cols="7">
                <v-text-field label="PW" type="password" solo v-model="pw"></v-text-field>
              </v-col>
            </v-row>
            <div>
              <v-row no-gutters justify="center">
                <v-col cols="2" class="mr-10 mt-10">
                  <v-btn @click="join">JOIN</v-btn>
                </v-col>
                <v-col cols="2" class="mt-10">
                  <v-btn @click="login">LOGIN</v-btn>
                </v-col>
              </v-row>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import loginStore from "@/store/module/loginStore";

export default {
  name: "Login",
  data() {
    return {
      id: null,
      pw: null,
    }
  },
  computed: {
    getId() {
      return loginStore.state.id;
    }
  },
  methods: {
    login() {
      let data = {};
      data.id = this.id;
      data.pw = this.pw;
      axios.post("http://localhost:8080/login", JSON.stringify(data),
          {
            headers: {
              'content-type': 'application/x-www-form-urlencoded',
            }
          })
          .then(res => {
            let aToken = res.headers.authorization;
            axios.defaults.headers.common['Authorization'] = aToken;
            //토큰을 들고 아이디 조회를 함
            axios.get("http://localhost:8080/api/member/" + data.id)
                .then(res => {

                  this.$store.commit('loginStore/set_token', aToken);
                  this.$store.commit('loginStore/set_isLogin', true);
                  this.$store.commit('loginStore/set_id', res.data.id);
                  this.$store.commit('loginStore/set_name', res.data.name);
                  this.$store.commit('loginStore/set_role', res.data.roles);

                  this.$router.push("/");

                }).catch(error => {
              this.pw = "";
              this.$store.commit("loginStore/set_id", '');
              this.$store.commit("loginStore/set_name", '');
              this.$store.commit("loginStore/set_token", '');
              this.$store.commit("loginStore/set_isLogin", false);
              this.$store.commit('loginStore/set_role', '');


              alert("회원 정보 가져오기 에러 입니다. " +
                  "에러 내용 : " + error);
            });

          }).catch(error => {
        alert("로그인 실패 아이디 비밀번호를 확인하세요. 에러 : " + error);
        console.log(error.response);
        this.pw = "";
        this.$store.commit("loginStore/set_id", '');
        this.$store.commit("loginStore/set_name", '');
        this.$store.commit("loginStore/set_token", '');
        this.$store.commit("loginStore/set_isLogin", false);
        this.$store.commit('loginStore/set_role', '');
      }).finally(() => {

      });
    },
    join() {
      this.$router.push('/Join');
    }
  }

}
</script>

<style scoped>
h1 {
  color: yellow;
  -webkit-text-stroke: 1px black;
}
</style>