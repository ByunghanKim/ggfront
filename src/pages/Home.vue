<template>
  <div id="div-main">
    <v-container fluid style="width: 70%">
      <div id="div-title" class="el">
        <h1>GG Web</h1>
      </div>
      <div class="el">
        <v-avatar
            color="accent"
            size="300"
        >
          <img
            src="@/assets/images/yellow.png"
            alt=""
          >
        </v-avatar>
      </div>
      <div id="div-go-button" class="el">
      </div>
    </v-container>
 </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {

    }
  },
  methods: {
    goBoard() {
      this.$router.push("/imageboard");
    }
  },
}
</script>

<style scoped>
  #div-main {
    display: flex;
    flex-direction: column;

  }
  .el {
    text-align: center;
    margin-top: 5em;
  }
  #H-Button {
    height: 50px;
    font-size: 25px;
    font-weight: bold;
  }
</style>