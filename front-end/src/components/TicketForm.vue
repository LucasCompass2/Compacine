<template>
    <div class="container">
        <h2>Comprar Ingresso</h2>
        <form @submit.prevent="buyTicket">
            <div class="select-session">
                <label>Sessão:</label>
                <select v-model="ticket.session" required>
                    <option v-for="session in sessions" :key="session._id" :value="session._id">
                        {{ session.movie }} - {{ session.time }} - Sala {{ session.room }}
                    </option>
                </select>
            </div>
            <div class="chair">
                <label>Cadeira:</label>
                <input type="text" v-model="ticket.chair" required>
            </div>
            <div class="value">
                <label>Valor:</label>
                <input type="number" v-model="ticket.value" required>
            </div>
            <button type="submit" class="button">Comprar Ingresso</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            sessions: [],
            tickets: [],
            ticket: {
                session: '',
                chair: '',
                value: 40
            }
        };
    },

    created() {
        this.SessionList();
    },
    methods: {
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
        async buyTicket() {
            try {
                const response = await fetch('http://localhost:3000/tickets', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body:
                        JSON.stringify(this.ticket)
                });
                const data = await response.json();
                this.tickets.push(data);
                console.log('Sessão cadastrada:', data);
                this.ticket.session = '';
                this.ticket.chair = '';
                this.ticket.value = 40;

                alert('Ingresso comprado com sucesso!');
            } catch (error) {
                console.error('Erro ao comprar ingresso', error);
                alert('Erro ao comprar ingresso');
            }
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
    border-radius: 0.3rem;
    margin-bottom: 100%;
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
    margin-top: 1rem;
}

form {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.select-session {
    font-size: 1.2rem;
    display: block;
    float: left;
    width: 72%;
}

select {
    width: 100%;
}
</style>