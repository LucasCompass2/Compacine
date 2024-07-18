<template>
  <div class="container">
    <h1>Cadastrar Filme</h1>
    <form @submit.prevent="handleSubmit">
      <div class="url">
        <label for="img">URL da Imagem:</label>
        <input type="text" name="img" v-model="form.img" required>
      </div>
      <div class="name">
        <label for="name">Nome do Filme:</label>
        <input type="text" name="name" v-model="form.name" required>
      </div>
      <div class="actors">
        <label for="actors">Atores:</label>
        <input type="text" name="actors" v-model="form.actors" required>
      </div>
      <div class="gender">
        <label for="gender">Gênero:</label>
        <input type="text" name="gender" v-model="form.gender" required>
      </div>
      <div class="description">
        <label for="description">Descrição:</label>
        <input type="text" name="description" v-model="form.description" required>
      </div>
      <button class="button" type="submit">Cadastrar Filme</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        img: '',
        name: '',
        description: '',
        actors: '',
        gender: ''
      }
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await fetch('http://localhost:3000/movie', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.form)
        });
        const movieData = await response.json();
        console.log('Filme cadastrado:', movieData);
        this.form.img = '';
        this.form.name = '';
        this.form.description = '';
        this.form.actors = '';
        this.form.gender = '';
        alert('Filme cadastrado com sucesso!');
      } catch (error) {
        console.error('Erro ao cadastrar filme:', error.message);
        alert('Erro ao cadastrar filme');
      }
    }
  }
};
</script>

<style scoped>
.container {
  width: 50%;
  padding: 1.25rem 1.25rem 1.25rem 0rem;
  background-color: #f0f0f0;
  border: 6.25rem solid black;
  border-radius: 0.3125rem;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

input {
  font-size: 1.5rem;
  display: block;
}

div {
  margin-bottom: 1rem;
}

.description>input {
  padding-bottom: 2rem;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
}

button {
  font-size: 1.2rem;
  border-radius: 0.5rem;
  text-align: center;
}
</style>
