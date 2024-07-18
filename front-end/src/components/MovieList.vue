<template>
    <MovieForm v-if="showMovieForm" />
    <SessionForm v-if="showSessionForm" />
    <TicketForm v-if="showBuyTicket" />
    <div v-if="!showMovieForm && !showSessionForm && !showBuyTicket" class="container">
        <h2>Filmes</h2>
        <div class="buttonRedirect">
            <button class="button" @click="redirectMovieForm()">Cadastrar Filme</button>
            <button class="button" @click="redirectSessionForm()">Cadastrar Sessão</button>
            <button class="button" @click="redirectBuyTicket()">Comprar Ticket</button>
        </div>
        <ul>
            <div class="content-movie">
                <li v-for="movie in movies" :key="movie._id">
                    <div class="movie-item">
                        <img :src="movie.img">
                        <div class="movie-info">
                            <h3>{{ movie.name }}</h3>
                            <p>{{ movie.description }}</p>
                            <p>Atores: {{ movie.actors }}</p>
                            <p>Gênero: {{ movie.gender }}</p>
                        </div>
                        <div class="button-function">
                            <button class="button" @click="editMovie(movie)">Editar</button>
                            <button class="button" @click="deleteMovie(movie._id)">Deletar</button>
                        </div>
                    </div>
                </li>
            </div>
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
import MovieForm from './MovieForm.vue';
import SessionForm from './SessionForm.vue';
import TicketForm from './TicketForm.vue';

export default {
    name: 'MovieList',
    components: {
        MovieForm,
        SessionForm,
        TicketForm
    },
    data() {
        return {
            showMovieForm: false,
            showSessionForm: false,
            showBuyTicket: false,
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
        },
        redirectMovieForm() {
            this.showMovieForm = true
        },
        redirectSessionForm() {
            this.showSessionForm = true
        },
        redirectBuyTicket() {
            this.showBuyTicket = true
        }
    }
};
</script>

<style scoped>
.container {
    max-width: 0;
    padding: 1.25rem 1.25rem 1.25rem 1.25rem;
    background-color: #f0f0f0;
    border: 6.25rem solid black;
    border-radius: 0.3125rem;
}

.container h2 {
    font-size: 2rem;
    margin-bottom: 0.9375rem;
    text-align: center;
}

.container ul {
    list-style-type: none;
    padding: 0;
}

.container li {
    margin-bottom: 1.25rem;
    padding: 0.625rem;
    background-color: #fff;
    border: 0.0625rem solid #ddd;
    border-radius: 0.1875rem;
}

.container li h3 {
    font-size: 1.25rem;
    margin-bottom: 0.625rem;
}

.container li p {
    margin-bottom: 0.3125rem;
}

.container button {
    font-size: 1rem;
    margin-right: 0.625rem;
}

.containerEdit {
    margin-top: 1.25rem;
    padding: 1.25rem;
    background-color: #f0f0f0;
    border: 0.0625 solid #ddd;
    border-radius: 0.1875rem;
}

.containerEdit label {
    font-size: 1rem;
    margin-right: 0.9375rem;

}

.containerEdit input {
    font-size: 1rem;
    margin-right: 0.9375rem;
    margin-bottom: 0.625rem;
    padding-right: 0.625rem;
}

.containerEdit button {
    font-size: 1rem;
    margin-right: 0.625rem;
    margin-bottom: 0.625rem;
}

.buttonRedirect {
    display: flex;
    justify-content: center;
    margin-bottom: 1.25rem;
}

.containerEdit input {
    font-size: 1rem;
    margin-right: 0.9375rem;
    margin-bottom: 0.625rem;
    padding-right: 0.625rem;
}

.containerEdit button {
    font-size: 1rem;
    margin-right: 0.625rem;
    margin-bottom: 0.625rem;
}

.buttonRedirect {
    display: flex;
    justify-content: center;
    margin-bottom: 1.25rem;
}

.content-movie {
    display: flex;
    flex-direction: column;
    padding: 0;
}

.movie-item {
    display: flex;
    align-items: flex-start;
}

.movie-item img {
    width: 15rem;
    height: auto;
    margin-right: 1rem;
}

.movie-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
}

.button-function {
    margin-top: auto;
    align-self: flex-end;
}
</style>