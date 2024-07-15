<template>
  <div class="box">
    <h1>Cadastrar filme</h1>
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
      } catch (error) {
        console.error('Erro ao cadastrar filme:', error.message);
      }
    }
  }
};
</script>

<style scoped>
.box {
  display: flex;
  flex-direction: column;
  background: var(--white, #ffffff);
  padding: 4.5rem 3rem 4.5rem 3rem;
  border-radius: 2rem 2rem;
  width: 26rem;
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
