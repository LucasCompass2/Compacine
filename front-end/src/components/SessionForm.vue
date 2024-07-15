<template>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="movie">Filme:(corrigir)</label>
        <input type="text" name="movie" v-model="form.movie" required>
      </div>
      <div>
        <label for="capacity">Capacidade:</label>
        <input type="number" name="capacity" v-model="form.capacity" required>
      </div>
      <div>
        <label for="time">Horário:</label>
        <input type="date" name="time" v-model="form.time" required>
      </div>
      <div>
        <label for="room">Sala:</label>
        <input type="text" name="room" v-model="form.room" required>
      </div>
      <button type="submit">Cadastrar nova Sessão</button>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        form: {
          movie: '',
          capacity: '',
          time: '',
          room: ''
        }
      };
    },
    methods: {
      async handleSubmit() {
        try {
          const response = await fetch('http://localhost:3000/sessions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.form)
          });
          const sessionData = await response.json();
          console.log('Nova sessão cadastrada:', sessionData);
          this.form.movie = '';
          this.form.capacity = '';
          this.form.time = '';
          this.form.room = '';
        } catch (error) {
          console.error('Erro ao cadastrar sessão:', error.message);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  
  </style>
  