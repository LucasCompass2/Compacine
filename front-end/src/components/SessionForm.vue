<template>
  <div class="container">
    <h2>Cadastrar nova Sessão</h2>
    <form @submit.prevent="createSession">
      <div class="content-movie">
        <div class="movie">
          <label for="movie">Filme:</label>
          <select v-model="session.movie" required>
            <option v-for="movie in movies" :key="movie._id" :value="movie._id">{{ movie.name }}</option>
          </select>
        </div>
        <div class="date">
          <label for="time">Horário:</label>
          <input type="date" v-model="session.time" required>
        </div>
      </div>
      <div>
        <label for="room">Sala:</label>
        <input type="text" v-model="session.room" required>
      </div>
      <div>
        <label for="capacity">Capacidade:</label>
        <input type="number" v-model="session.capacity" required>
      </div>
      <button type="submit" class="button" @click="showCreateSession()" >Criar Sessão</button>
    </form>

    <div v-if="showSession" class="containerSession">
      <h2>Sessões</h2>
      <ul>
        <li v-for="session in sessions" :key="session._id">
          <h3>{{ session.movie }}</h3>
          <p>Sala: {{ session.room }}</p>
          <p>Capacidade: {{ session.capacity }}</p>
          <p>Horário: {{ session.time }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      movies: [],
      sessions: [],
      showSession: false,
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
        this.session.movie = '',
        this.session.room = '',
        this.session.capacity = '',
        this.session.time = ''
        
        alert('Sessão cadastrada com sucesso!');
      } catch (error) {
        console.error('Erro ao cadastrar sessão', error);
        alert('Erro ao cadastrar sessão');
      }
    },
    showCreateSession() {
      this.showSession = !this.showSession;
    }
  }
};
</script>

<style scoped>
.container {
  width: 50%;
  padding: 1.25rem 1.25rem 1.25rem 1.25rem;
  background-color: #f0f0f0;
  border: 6.25rem solid black;
  border-radius: 0.3125rem;
  margin-bottom: 12.5rem;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

input {
  font-size: 1.5rem;
  display: block;
  padding-right: 6.25rem;
}

div {
  margin-bottom: 1rem;
}

h2 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
}

button {
  font-size: 1.2rem;
  border-radius: 0.5rem;
  text-align: center;
}

select {
  font-size: 1.5rem;
  display: block;
}

.content-movie {
  display: flex;
  gap: 1.25rem;
}

.content-movie input {
  flex: 1;
}

</style>