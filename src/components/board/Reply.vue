<template>
  <div>
    <v-card
      elevation="5"
    >
      <v-row no-gutters align="center">
        <v-col class="ml-7 mt-3">
          {{reply.id}}
        </v-col>
        <v-col class="mr-3 mt-3" style="text-align: right">
          <div style="opacity: 0.5; font-size: 13px">{{convertedDate}}</div>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col class="ml-3">
          <v-card-text style="font-size: 13px" v-html="reply.content"></v-card-text>
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
  },
  computed: {
    convertedDate() {
      let date = this.reply.date;
      let newDate = new Date(date);
      return newDate.toLocaleString();
    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>