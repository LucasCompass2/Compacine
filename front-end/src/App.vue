<template>
  <div class="content">
    <MovieList />
    <!-- <MovieForm />
     <TicketForm />
    <SessionForm /> -->

  </div>
</template>

<script>
// import MovieForm from './components/MovieForm.vue';
import MovieList from './components/MovieList.vue';
// import SessionForm from './components/SessionForm.vue';
// import TicketForm from './components/TicketForm.vue';

export default {
  name: 'App',
  components: {
    // MovieForm,
    MovieList,
    // SessionForm,
    // TicketForm
  }
};
</script>
<style>
#app {
  padding: 6rem;
  background-color: var(--black, #000);
}
</style>