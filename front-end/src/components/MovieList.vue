<template>
    <div class="container">
        <h2>Filmes</h2>
        <button class="button" onclick="MovieForm()" >Cadastrar Filme</button>
        <ul>
            <li v-for="movie in movies" :key="movie._id">
                <h3>{{ movie.name }}</h3>
                <p><img :src="movie.img"></p>
                <p>{{ movie.description }}</p>
                <p>Atores: {{ movie.actors }}</p>
                <p>Gênero: {{ movie.gender }}</p>
                <button class="button" @click="editMovie(movie)">Editar</button>
                <button class="button" @click="deleteMovie(movie._id)">Deletar</button>
            </li>
        </ul>
        <div v-if="editingMovie" class="containerEdit">
            <h3>Editar Filme</h3>
            <form @submit.prevent="updateMovie">
                <div>


                    <label for="editName">Nome:</label>
                    <input type="text" id="editName" v-model="editFormData.name" required>

                    <label for="editImg">Imagem:</label>
                    <input type="text" id="editImg" v-model="editFormData.img" required>

                    <label for="editDescription">Descrição:</label>
                    <input type="text" id="editDescription" v-model="editFormData.description" required>

                    <label for="editActors">Atores:</label>
                    <input type="text" id="editActors" v-model="editFormData.actors" required>

                    <label for="editGender">Gênero:</label>
                    <input type="text" id="editGender" v-model="editFormData.gender" required>
                    <div>
                        <button class="button" type="submit">Editar Filme</button>
                        <button class="button" @click="cancelEdit">Cancelar</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            movies: [],
            editingMovie: null,
            editFormData: {
                name: '',
                img: '',
                description: '',
                actors: '',
                gender: ''
            }
        };
    },
    created() {
        this.MovieList();
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
        editMovie(movie) {
            this.editingMovie = movie;
            this.editFormData.name = movie.name;
            this.editFormData.img = movie.img;
            this.editFormData.description = movie.description;
            this.editFormData.actors = movie.actors;
            this.editFormData.gender = movie.gender;
        },
        async updateMovie() {
            try {
                const response = await fetch(`http://localhost:3000/movie/${this.editingMovie._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: this.editFormData.name,
                        img: this.editFormData.img,
                        description: this.editFormData.description,
                        actors: this.editFormData.actors,
                        gender: this.editFormData.gender
                    })
                });

                const updatedMovie = await response.json();
                const index = this.movies.findIndex(movie => movie._id === updatedMovie._id);
                if (index !== -1) {
                    this.movies.splice(index, 1, updatedMovie);
                }

                this.cancelEdit();
            } catch (error) {
                console.error('Erro ao atualizar filme', error);
            }
        },
        cancelEdit() {
            this.editingMovie = null;
            this.editFormData.name = '';
            this.editFormData.img = '';
            this.editFormData.description = '';
            this.editFormData.actors = '';
            this.editFormData.gender = '';
        },
        deleteMovie(id) {
            try {
                fetch(`http://localhost:3000/movie/${id}`, {
                    method: 'DELETE'
                });
                this.movies = this.movies.filter(movies => movies._id !== id);
            } catch (error) {
                console.error('Erro ao deletar filme', error);
            }
        }
    }
};
</script>

<style scoped>
.container {
    max-width: 0;
    padding: 20px 20px 20px 0px;
    background-color: #f0f0f0;
    border: 100px solid black;
    border-radius: 5px;
}

.container h2 {
    font-size: 32px;
    margin-bottom: 15px;
    text-align: center;
}

.container ul {
    list-style-type: none;
    padding: 0;
}

.container li {
    margin-bottom: 20px;
    padding: 10px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 3px;
}

.container li h3 {
    font-size: 20px;
    margin-bottom: 10px;
}

.container li p {
    margin-bottom: 5px;
}

.container button {
    font-size: 1rem;
    margin-right: 10px;
}

.containerEdit {
    margin-top: 20px;
    padding: 20px;
    background-color: #f0f0f0;
    border: 1px solid #ddd;
    border-radius: 3px;
}

.containerEdit label {
    font-size: 1rem;
    margin-right: 15px;

}

.containerEdit input {
    font-size: 1rem;
    margin-right: 15px;
    margin-bottom: 10px;
    padding-right: 10px;
}

.containerEdit button {
    font-size: 1rem;
    margin-right: 10px;
    margin-bottom: 10px;
}
</style>