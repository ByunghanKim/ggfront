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

export default {
  name: "Login",
  data() {
    return {
      id: null,
      pw: null,
    }
  },
  methods: {
    login() {
      axios.post("http://localhost:8080/api/member/login",{
        "id" : this.id,
        "pw" : this.pw
      },{headers:{'content-type' : 'application/json'}})
      .then(res => {
        console.log(res);
      }).catch(error => {
        console.log(error);
      }).finally(()=> {

      });
    },
    join() {

    }
  }

}
</script>

<style scoped>

</style>