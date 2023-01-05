<template>
  <li class="post-element">
    <h6 class="post-title">
      {{ post.title }}
    </h6>
    <p class="post-body">
      {{ post.body }}
    </p>
    <p class="comments-count">
      {{ post.comments.length }}
    </p>
    <!-- <button @click="createChart">show statistics</button> -->
    <div>
      <!-- <canvas :id="`chart-${post.id}`" v-if="showCanvas"></canvas> -->
      <canvas :id="`chart-${post.id}`"></canvas>
    </div>
  </li>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  name: "PostElement",

  data: function () {
    return {
      emails: [],
      emailLength: [],
      showCanvas: false,
    };
  },

  props: {
    post: {
      type: Object,
      required: true,
    },
  },

  mounted() {
    this.createChart();
  },

  created: async function () {},

  methods: {
    getStatistics() {
      this.emails.length = 0;
      this.emailLength.length = 0;

      for (let i = 0; i < this.post.comments.length; i++) {
        this.emailLength.push(
          Object.assign({}, this.post.comments[i]).email.length
        );
        this.emails.push(Object.assign({}, this.post.comments[i]).email);
      }
      // this.showCanvas = !this.showCanvas;
      // console.log(this.showCanvas)
      return Array.from(this.emailLength);
    },

    createChart() {
      new Chart(document.querySelector(`#chart-${this.post.id}`), {
        type: "bar",
        data: {
          labels: this.emails,
          datasets: [
            {
              label: "# the number of characters in the mail",
              data: this.getStatistics(),
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  padding: 0 5%;
  display: block;
}
.posts-list {
  display: flex;
  justify-content: space-evenly;
  // width: 1000px;
  flex-wrap: wrap;
}

.post-element {
  // height: 200px;
  width: 30%;
  border: 2px solid blue;
  border-radius: 5px;
  margin-bottom: 5px;
}

.post-title {
  font-size: 14px;
  text-transform: uppercase;
}

.post-body {
  font-size: 12px;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
