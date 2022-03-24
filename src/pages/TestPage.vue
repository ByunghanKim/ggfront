<template>
  <div id="div-main">
    <h1>testpage</h1>
    <img :src="imgList[4]">
  </div>
</template>

<script>

import axios from "axios";

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
      imgList: [],

    }
  },
  methods: {
    getData() {
      this.$axios.get("http://localhost:8080/api/imgboard/load")
          .then((res) => {
            const parse = JSON.parse(JSON.stringify(res));
            this.img = parse.data;
            for (let i = 0; i < this.img.length; i++) {
              axios.get("http://localhost:8080/api/imgboard/img/" + this.img[i].img_name,{responseType:'arraybuffer'})
                  .then((res) => {

                    //let front = "data:image;base64,";
                    let buffer = Buffer.from(res.data, 'base64');
                    let blob = new Blob([buffer], {type: 'image/jpeg'})
                    let data = URL.createObjectURL(blob);

                    console.log(data);
                    this.imgList.push(data);
                  })
                  .catch((err) => {
                    console.log(err)
                  });
            }
          })
          .catch((error) => {
            console.log(error)
          })
          .finally(() => {
            console.log("항상 마지막에 실행");
            console.log(this.imgList)
          });
    },

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