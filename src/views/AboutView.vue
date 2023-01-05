<template>
  <div class="about">
    <h1>This is an about page</h1>
    <Map/>
  </div>
</template>

<script>
// @ is an alias to /src
import Map from '@/components/Map.vue'

export default {
  name: 'HomeView',
  components: {
    Map
  }
}
</script>
