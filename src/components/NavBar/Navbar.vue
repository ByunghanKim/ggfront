<template>
  <div id="div-main">
    <v-app-bar
        app
        color="white"
        height="72"
        elevation="3"
    >
      <v-toolbar-title
          class="pa-16 ma-16 ma"
      >
        <h1 v-on:click="goHome">
        GGWeb
        </h1>
      </v-toolbar-title>
      <div id="menu">
        <h3 v-on:click="goHome">홈</h3>
        <h3 v-on:click="goImageBoard">사진첩</h3>
        <h3 v-on:click="goTestPage">임시메뉴</h3>
        <h3 v-on:click="goTestPage2">임시메뉴2</h3>
        <h3 v-on:click="goTestPage3">임시메뉴3</h3>
      </div>
      <v-spacer/>
      <h5 v-if="logoutButton_hasToken">{{getMemberName}}</h5>
      <div id="login" v-if="loginButton_hasToken">
        <v-btn
          color="black"
          text=""
          v-on:click="goLogin"
        >
        <h3>LOGIN</h3>
        </v-btn>
      </div>
      <div id="logout" v-if="logoutButton_hasToken" >
        <v-btn
            color="black"
            text=""
            v-on:click="goLogout"
        >
          <h3>LOGOUT</h3>
        </v-btn>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  computed: {
    loginButton_hasToken() {
      if(this.$store.state.loginStore.isLogin === true) {
        return false;
      } else {
        return true;
      }
    },
    logoutButton_hasToken() {
      if(this.$store.state.loginStore.isLogin === true) {
        return true;
      } else {
        return false;
      }
    },
    getMemberName() {
      return this.$store.state.loginStore.name;
    }
  },
  methods: {
    goHome() {
      if(this.$route.path != "/") {
        this.$router.push("/");
      }
    },
    goImageBoard() {
      if(this.$route.path != "/imageboard") {
        this.$router.push("/imageboard").catch(err=>{return err;});
      }
    },
    goLogin() {
      if(this.$route.path != '/login') {
        this.$router.push("/login");
      }
    },
    goLogout() {
      this.$store.commit("loginStore/set_id", '');
      this.$store.commit("loginStore/set_name", '');
      this.$store.commit("loginStore/set_token", '');
      this.$store.commit("loginStore/set_isLogin", 'false');

      this.$router.push("/login");
    },
    goTestPage() {
      if(this.$route.path != '/testpage') {
        this.$router.push("/testpage");
      }
    },
    goTestPage2() {
      if(this.$route.path != '/testpage2') {
        this.$router.push("/testpage2");
      }
    },
    goTestPage3() {
      if(this.$route.path != '/testpage3') {
        this.$router.push("/testpage3");
      }
    },

  }
}
</script>

<style scoped>
a {
  text-decoration-line: none;
  text-decoration: none;
}

#div-main h1 {
  color: yellow;
  -webkit-text-stroke: 1px black;
}

#menu {
  display: flex;
}

#menu h3 {
  margin-right: 40px;
}

#div-main h1:hover {
  cursor: pointer;
}

#div-main h3:hover {
  cursor: pointer;
}

</style>