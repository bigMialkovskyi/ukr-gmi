<template>
  <div class="container">
    <input class="input-text" type="text" v-model="searchText" />
    <ul v-if="posts.length" class="posts-list">
      <PostElement v-for="post in displayedPosts" :key="post.id" :post="post" />
    </ul>
    <div class="paginate-nav">
      <button class="nav-btn" @click="currentPage -= 1" :disabled="!hasPrev">
        Prev
      </button>
      <div>{{ currentPage + 1 }} of {{ totalPages }}</div>
      <button class="nav-btn" @click="currentPage += 1" :disabled="!hasNext">
        Next
      </button>
    </div>
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

  mounted: async function () {
    const posts = await this.postList();
    const comments = await this.commentsList();

    this.posts = posts.map((post) => {
      post.comments = comments.filter((comment) => comment.postId === post.id);
      return post;
    });
    this.paginate();
  },

  methods: {
    async postList() {
      return await postApi.getPostList();
    },

    async commentsList() {
      return await postApi.getCommentList();
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

<style scoped lang="scss">
.container {
  padding: 0 5%;
  display: block;
}

.input-text {
  height: 40px;
  width: 400px;
  border-radius: 7px;
  background-color: #ccebff;
  border: 2px solid #0099ff;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
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
}

.post-title {
  font-size: 14px;
  text-transform: uppercase;
}

.post-body {
  font-size: 12px;
}

.paginate-nav {
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-color: #b3e0ff;
  border-radius: 7px;
}

.nav-btn {
  background-color: #0099ff;
  width: 80px;
  height: 40px;
  border-radius: 5px;
  border: 2px solid #0099ff;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
}

.nav-btn:hover {
  background-color: #33adff;
}

.nav-btn:active {
  background-color: #007acc;
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
