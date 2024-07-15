<template>
    <div>
        <h2>Comprar Ingresso</h2>
        <form @submit.prevent="buyTicket">
            <label>Sessão:</label>
            <select v-model="ticketData.session" required>
                <option v-for="session in sessions" :key="session._id" :value="session._id">
                    {{ session.film }} - {{ session.time }}
                </option>
            </select>

            <label>Cadeira:</label>
            <input type="text" v-model="ticketData.seat" required>

            <label>Valor:</label>
            <input type="number" v-model="ticketData.value" required>

            <button type="submit">Comprar Ingresso</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            sessions: [],
            ticketData: {
                session: '',
                chair: '',
                value: 0
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
                        JSON.stringify(this.ticketData)
                });
                if (!response.ok) {
                    throw new Error('Erro ao comprar ingresso');
                }
                this.ticketData.session = '';
                this.ticketData.chair = '';
                this.ticketData.value = 0;

                alert('Ingresso comprado com sucesso!');
            } catch (error) {
                console.error('Erro ao comprar ingresso', error);
                alert('Erro ao comprar ingresso');
            }
        }
    }
};
</script>