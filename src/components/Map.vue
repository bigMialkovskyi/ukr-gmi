<template>
  <div class="container">
    <div id="map"></div>
    <p>Hello</p>
  </div>
</template>

<script>
export default {
  name: "Map",

  mounted: async function () {
    let recaptchaStyle = document.createElement("link");
    recaptchaStyle.setAttribute("rel", "stylesheet");
    recaptchaStyle.setAttribute(
      'href',
      'https://unpkg.com/leaflet@1.9.3/dist/leaflet.css'
    );
    recaptchaStyle.setAttribute(
      'integrity',
      'sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI='
    );
    recaptchaStyle.setAttribute('crossorigin', '');
    document.head.appendChild(recaptchaStyle);

    let recaptchaScript = document.createElement("script");
    recaptchaScript.setAttribute(
      'src',
      'https://unpkg.com/leaflet@1.9.3/dist/leaflet.js'
    );
    recaptchaScript.setAttribute(
      'integrity',
    'sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM='
    );
    recaptchaScript.setAttribute('crossorigin', '');
    document.head.appendChild(recaptchaScript);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#map {
  height: 180px;
}
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
