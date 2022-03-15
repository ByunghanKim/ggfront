<template>
  <div id="div-main">
    <v-container fluid style="width: 70%">
      <div id="title" class="el">
        <h1>사진첩 TestPage</h1>
      </div>
      <div class="text-center"
           id="images"
      >
        <v-dialog
            width="500"
            v-for="(item,i) in img"
            v-bind:key="i"

        >
          <template v-slot:activator="{ on, attrs }">
            <v-card
                max-width="200"
                align="center"
                v-bind="attrs"
                v-on="on"
            >
              <img :src="`http://localhost:8080/api/imgboard/img/` + item.img_name" width="100" />
            </v-card>
          </template>

          <v-card>
            <img :src="`http://localhost:8080/api/imgboard/img/` + item.img_name" width="400">
            <v-card>
            {{item.title}}
            {{item.date}}
            {{item.content}}
            </v-card>
          </v-card>
        </v-dialog>
      </div>
    </v-container>


  </div>
</template>

<script>

export default {
  name: "TestPage",
  created() {

    this.getData();
  },
  mounted() {

  },
  data() {
    return {
      img: [],

    }
  },
  methods: {
    getData() {
      this.$axios.get("http://localhost:8080/api/imgboard/load")
      .then((res) => {
        const parse = JSON.parse(JSON.stringify(res));
        this.img = parse.data;
      })
          .catch((error)=> {
            console.log(error)
          })
          .finally(()=>{
            console.log("항상 마지막에 실행");
          });
    }
  },
}
</script>

<style scoped>
.el {
  text-align: center;
  margin-top: 5em;
}

#images {
  margin-top: 5em;
}

</style>