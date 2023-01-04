<template>
  <div class="container">
    <input type="text" v-model="searchText" />
    <ul class="posts-list">
      <!-- <li class="post-element" v-for="post in displayedPosts" :key="post.id">
        <h6 class="post-title">
          {{ post.title }}
        </h6>
        <p class="post-body">
          {{ post.body }}
        </p>
        <p v-if="comments.length" class="comments-count">
          {{ getPostComments(post.id).length }}
        </p>
      </li> -->
      <PostElement
        v-for="post in displayedPosts"
        :key="post.id"
        :post="{ ...post, comments: getPostComments(post.id) }"
      />
    </ul>
    <button @click="currentPage -= 1" :disabled="!hasPrev">Prev</button>
    <button @click="currentPage += 1" :disabled="!hasNext">Next</button>
  </div>
</template>

<script>
import { postApi } from "@/api/post-api";
import PostElement from "./PostElement.vue";

export default {
  name: "Post",

  components: {
    PostElement,
  },

  data: function () {
    return {
      posts: [],
      displayedPosts: [],
      filteredPosts: null,
      comments: [],
      perPage: 10,
      totalPages: null,
      error: null,
      currentPage: 0,
      hasNext: null,
      hasPrev: null,
      commentsCount: null,
      searchText: "",
    };
  },

  created: async function () {
    this.postList();
    this.commentsList();
  },

  methods: {
    async postList() {
      this.posts = await postApi.getPostList();
      this.paginate();
    },

    async commentsList() {
      this.comments = await postApi.getCommentList();
    },

    paginate() {
      const list = this.filteredPosts || this.posts;
      this.totalPages = Math.ceil(list.length / this.perPage);
      this.displayedPosts = list.slice(
        this.currentPage === 0 ? 0 : this.currentPage * this.perPage,
        this.currentPage === 0
          ? this.perPage
          : this.perPage * this.currentPage + this.perPage
      );
      this.hasNext =
        this.currentPage * this.perPage + this.perPage < list.length;
      this.hasPrev = this.currentPage === 0 ? false : true;
    },

    getPostComments(postId) {
      return this.comments.filter((comment) => comment.postId === postId);
    },
  },

  watch: {
    currentPage() {
      this.paginate();
    },
    searchText(newVal, oldVal) {
      if (!newVal) return (this.filteredPosts = null);
      const transText = newVal.toUpperCase();
      this.filteredPosts = this.posts.filter((post) => {
        if (post.title.toUpperCase().indexOf(transText) > -1) return post;
      });
    },
    filteredPosts() {
      this.paginate();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
