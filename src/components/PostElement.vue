<template>
  <li class="post-element">
    <h6 class="post-title">
      {{ post.title }}
    </h6>
    <p class="post-body">
      {{ post.body }}
    </p>
    <div class="comment-counter">
      <img class="comment-icon" src="../assets/comment.svg" alt="" />
      <p class="comments-count">
        {{ post.comments.length }}
      </p>
    </div>
    <div>
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

  methods: {
    getStatistics() {
      const emails = [];
      const emailLength = [];

      this.post.comments.forEach((comment, index) => {
        emailLength.push(comment.email.length);
        emails.push(comment.email);
      });
      return {
        emails,
        emailLength,
      };
    },

    createChart() {
      const { emails, emailLength } = this.getStatistics();
      console.log(emails, emailLength);
      new Chart(document.querySelector(`#chart-${this.post.id}`), {
        type: "bar",
        data: {
          labels: emails,
          datasets: [
            {
              label: "# the number of characters in the mail",
              data: emailLength,
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
  flex-wrap: wrap;
}

.post-element {
  width: 30%;
  border: 2px solid blue;
  border-radius: 5px;
  margin-bottom: 5px;
  background-color: #e6f5ff;
}

.post-title {
  font-size: 14px;
  text-transform: uppercase;
}

.post-body {
  font-size: 12px;
}

.comment-counter{
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 0 20px;
}

.comment-icon {
  width: 30px;
  height: 30px;
}

.comments-count{
  font-weight: bold;
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
