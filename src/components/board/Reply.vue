<template>
  <div>
    <v-card
      elevation="5"
    >
      <v-row no-gutters align="center">
        <v-col class="ml-7 mt-3">
          아이디
        </v-col>
        <v-col class="mr-3 mt-3" style="text-align: right">
          <div style="opacity: 0.5; font-size: 13px">2022-04-05 <br/> 15:46:02</div>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col class="ml-3">
          <v-card-text style="font-size: 13px">댓글 입니다.</v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Reply",
  props: {
    reply: Object,
  }
}
</script>

<style scoped>

</style>