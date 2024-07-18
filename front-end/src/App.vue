<template>
  <div class="content">
    <MovieList />
  </div>
</template>

<script>
import MovieList from './components/MovieList.vue';

export default {
  name: 'App',
  components: {
    MovieList,
  }
};
</script>
<style>
#app {
  padding: 6rem;
  background-color: var(--black, #000);
}
</style>