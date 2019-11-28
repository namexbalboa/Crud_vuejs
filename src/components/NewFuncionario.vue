<template>
    <div id="newFuncionario">
        <h3>Novo Funcionario</h3>
        <div class="row">
            <form @submit.prevent="saveFuncionario" class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="id_funcionario" required>
                        <label>ID Funcionario</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="nome" required>
                        <label>Nome</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="departamento" required>
                        <label>Departamento</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="posicao" required>
                        <label>Posição</label>
                    </div>
                </div>
                <button type="submit" class="btn">
                    Cadastrar
                </button>
                <router-link to="/" class="btn grey">
                    Cancelar
                </router-link>
            </form>
        </div>
    </div>
</template>

<script>
    import db from './firebaseInit'
    export default {
        name: 'newFuncionario',
        data() {
            return {
                id_funcionario: null,
                nome: null,
                posicao: null,
                departamento: null
            }
        },
        methods: {
            saveFuncionario() {
                db.collection('empregados').add({
                    id_empregado: this.id_funcionario,
                    nome: this.nome,
                    departamento: this.departamento,
                    posicao: this.posicao
                })
                .then(docRef => this.$router.push('/'))
                .catch(error => console.log(err))
            }
        }
    }
</script>