<template>
  <v-container class="grey lighten-3 fill-height">
    <v-row>
      <v-col align="center">
        <v-card
            width="100%"
            height="120%"
        >
          <v-card-title class="justify-center">
            <h1 class="mt-16">GGWeb</h1>
          </v-card-title>
          <v-card-subtitle class="mt-16">
            <h2>회원가입</h2>
          </v-card-subtitle>
          <div class="mt-16">
            <v-form
                ref="form"
                v-model="valid"
                lazy-validation
            >
              <v-row no-gutters justify="center">
                <v-col cols="4">
                  <v-text-field
                      @blur="idCheck(id)"
                      dense
                      label="아이디"
                      outlined
                      v-model="id"
                      :rules="idRules"
                      :error-messages="id_error_message"


                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row no-gutters justify="center">
                <v-col cols="4">
                  <v-text-field
                      dense
                      label="비밀번호"
                      outlined
                      v-model="pw"
                      type="password"
                      :rules="pwRules"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row no-gutters justify="center">
                <v-col cols="4">
                  <v-text-field
                      dense
                      label="비밀번호 확인"
                      outlined
                      v-model="pw_check"
                      type="password"
                      :rules="pwCheckRules"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row no-gutters justify="center">
                <v-col cols="4">
                  <v-text-field
                      dense
                      label="이름"
                      outlined
                      v-model="name"
                      :rules="nameRules"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row no-gutters class="mt-8">
                <v-col align="right">
                  <v-btn
                      :disabled="!valid"
                      color="success"
                      class="mr-2"
                      @click="validate"
                      width="100"
                  >
                    가입하기
                  </v-btn>
                </v-col>
                <v-col align="left">
                  <v-btn
                      color="error"
                      class="ml-2"
                      @click="reset"
                      width="100"
                  >
                    RESET
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Join",
  data() {
    return {
      id: '',
      pw: '',
      pw_check: '',
      name: '',
      id_error_message: '',
      valid: true,
      idRules: [
        v => !!v || '아이디를 입력하세요.',
        v => /^[a-zA-Z0-9]*$/.test(v) || '아이디는 영문+숫자만 입력 가능합니다.',
        v => !(v && v.length >= 15) || '아이디는 15자 이상 입력할 수 없습니다.',
        v => !(v && v.length < 4) || '아이디는 4글자 이상 입력하세요.',
      ],
      pwRules: [
        v => !!v || '비밀번호를 입력하세요.',
        v => !(v && v.length >= 20) || '패스워드는 20자 이상 입력할 수 없습니다.',
      ],
      pwCheckRules: [
        v => v === this.pw || '패스워드가 일치하지 않습니다.',
        v => !(v && v.length >= 20) || '패스워드는 20자 이상 입력할 수 없습니다.',
      ],
      nameRules: [
        v => !!v || '이름을 입력하세요.',
        v => !(v && v.length >= 30) || '이름은 30자 이상 입력할 수 없습니다.',
        v => !/[~!@#$%^&*()_+|<>?:{}]/.test(v) || '이름에는 특수문자를 사용할 수 없습니다.'
      ],
    }
  },
  methods: {
    idCheck(value) {
      const fd = new FormData();
      fd.append("id", value);
      axios.post("http://localhost:8080/api/member/id", fd)
          .then((res) => {
            if (res.data > 0) {
              this.id_error_message = '아이디가 존재합니다.';
            } else {
              this.id_error_message = '';
            }
          })
          .catch((err) => {
            console.log(err.response);
          });
    },
    validate() {
      if (this.$refs.form.validate()) {
        console.log("굿");
      } else {
        console.log("낫굿");
      }
    },
    reset() {
      this.$refs.form.reset();
    },
  }
}
</script>

<style scoped>
h1 {
  color: yellow;
  -webkit-text-stroke: 1px black;
}
</style>