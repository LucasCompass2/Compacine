<template>
  <div class="content">
    <MovieForm />
  </div>
</template>

<script>
import MovieForm from './components/MovieForm.vue';

export default {
  name: 'App',
  components: {
    MovieForm
  }
};
</script>
<style>
.content {
    background: var(--black, #000);
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    height: 100vh;
    padding-left: 40rem;
    padding-top: 9rem;
}
</style>