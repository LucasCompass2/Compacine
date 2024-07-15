<template>
  <div>
    <h2>Cadastrar nova Sessão</h2>
    <form @submit.prevent="createSession">
      <div>
        <label for="movie">Filme:</label>
        <select v-model="session.movie" required>
          <option v-for="movie in movies" :key="movie._id" :value="movie._id">{{ movie.name }}</option>
        </select>
      </div>
      <div>
        <label for="room">Sala:</label>
        <input type="text" v-model="session.room" required>
      </div>
      <div>
        <label for="capacity">Capacidade:</label>
        <input type="number" v-model="session.capacity" required>
      </div>
      <div>
        <label for="time">Horário:</label>
        <input type="date" v-model="session.time" required>
      </div>
      <button type="submit">Salvar</button>
    </form>

    <h2 >Sessões</h2>
    <ul>
      <li v-for="session in sessions" :key="session._id">
        <h3>{{ session.movie }}</h3>
        <p>Sala: {{ session.room }}</p>
        <p>Capacidade: {{ session.capacity }}</p>
        <p>Horário: {{ session.time }}</p>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  data() {
    return {
      movies: [],
      sessions: [],
      session: {
        movie: '',
        room: '',
        capacity: '',
        time: ''
      },
      
    };
  },

  created() {
    this.MovieList();
    this.SessionList();
  },

  methods: {
    async MovieList() {
      try {
        const response = await fetch('http://localhost:3000/movie');
        if (!response.ok) {
          throw new Error('Erro ao carregar filmes.');
        }
        const data = await response.json();
        this.movies = data;
      } catch (error) {
        console.error(error);
      }
    },
    async SessionList() {
      try {
        const response = await fetch('http://localhost:3000/sessions');
        if (!response.ok) {
          throw new Error('Erro ao carregar sessões.');
        }
        const data = await response.json();
        this.sessions = data;
      } catch (error) {
        console.error(error);
      }
    },
    async createSession() {
      try {
        const response = await fetch('http://localhost:3000/sessions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.session)
        });
        const data = await response.json();
        this.sessions.push(data);
        console.log('Sessão cadastrada:', data);
        this.session = {
          movie: '',
          room: '',
          capacity: '',
          time: ''
        };
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }
};
</script>
