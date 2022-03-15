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
      <div id="login">
        <v-btn
          color="black"
          text=""
          v-on:click="goLogin"
        >
        <h3>LOGIN</h3>
        </v-btn>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    goHome() {
      this.$router.push("/");
    },
    goImageBoard() {
      this.$router.push("/imageboard");
    },
    goLogin() {
      this.$router.push("/login");
    },
    goTestPage() {
      this.$router.push("/testpage");
    },
    goTestPage2() {
      this.$router.push("/testpage2");
    },
    goTestPage3() {
      this.$router.push("/testpage3");
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