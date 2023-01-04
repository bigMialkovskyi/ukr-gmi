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
    <div>
      <canvas :id="`chart-${post.id}`"></canvas>
    </div>
  </li>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  name: "PostElement",

  props: {
    post: {
      type: Object,
      required: true,
    },
  },

  mounted() {
    new Chart(document.querySelector(`#chart-${this.post.id}`), {
      type: "bar",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
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
