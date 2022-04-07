<template>
  <div>
  <v-simple-table style="width: 100%">
    <template v-slot:default>
      <thead>
      <tr>
        <th style="width: 10%; text-align: center;">번호</th>
        <th style="width: 50%; text-align: center;">제목</th>
        <th style="width: 10%; text-align: center;">작성자</th>
        <th style="width: 15%; text-align: center;">날짜</th>
        <th style="width: 8%; text-align: center;">조회수</th>
        <th style="width: 7%; text-align: center;">추천</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in list" :key="item.num" style="text-align: center">
        <td>{{ item.num }}</td>
        <td >
          <a @click="goBoardDetail(item.num)">{{ item.title }}</a>&nbsp;
          <span v-if="item.reply_num > 0">[{{item.reply_num}}]</span>
        </td>
        <td>{{ item.writer }}</td>
        <td>{{ item.date }}</td>
        <td>{{ item.views }}</td>
        <td>{{ item.likes }}</td>
      </tr>
      </tbody>
    </template>
  </v-simple-table>
  </div>
</template>

<script>

export default {
  name: "BoardList",
  props: {
    boardType: String,
    list: Array,
  },
  data() {
    return {

    }
  },
  methods: {
    goBoardDetail(num) {
      //this.$router.push({name: 'Content', params:{boardType: this.boardType, num: num}});
      this.$router.push({name: 'Content', query:{boardType: this.boardType, num: num}});
    },

  },

}
</script>

<style scoped>
</style>