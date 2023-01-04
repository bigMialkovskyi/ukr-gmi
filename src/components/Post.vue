<template>
  <div class="hello">
    <ul>
      <li class="product-element" v-for="post in posts" :key="post.id">
        <p class="post-title">
          {{ post.title }}
        </p>
        <p class="post-body">
          {{ post.body }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import { postApi } from "@/api/post-api";

export default {
  name: "Post",

  data: function () {
    return {
      posts: [],
      error: null,
    };
  },

  created: async function () {
    this.postList();
  },

  methods: {
    postList() {
      postApi.getPostList().then((posts) => {
        this.posts = posts;
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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
