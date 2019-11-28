<template>
    <div id="editFuncionario">
        <h3>Editar Funcionario</h3>
        <div class="row">
            <form @submit.prevent="updateFuncionario" class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                        <input disabled type="text" v-model="id_funcionario" required>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="nome" required>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="departamento" required>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="posicao" required>
                    </div>
                </div>
                <button type="submit" class="btn">
                    Atualizar
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
        name: 'editFuncionario',
        data() {
            return {
                id_funcionario: null,
                nome: null,
                posicao: null,
                departamento: null
            }
        },
        beforeRouteEnter(to, from, next){
            db.collection('empregados').where('id_empregado', '==', to.params.id_funcionario).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    next(vm => {
                        vm.id_funcionario = doc.data().id_empregado
                        vm.nome = doc.data().nome
                        vm.departamento = doc.data().departamento
                        vm.posicao = doc.data().posicao
                    })
                })
            })
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
            fetchData(){
                db.collection('empregados').where('id_empregado', '==', this.$route.params.id_funcionario).get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        this.id_funcionario = doc.data().id_empregado
                        this.nome = doc.data().nome
                        this.departamento = doc.data().departamento
                        this.posicao = doc.data().posicao
                    })
                })
            },
            updateFuncionario(){
                db.collection('empregados').where('id_empregado', '==', this.$route.params.id_funcionario).get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        doc.ref.update({
                            id_empregado: this.id_funcionario,
                            nome: this.nome,
                            departamento: this.departamento,
                            posicao: this.posicao
                        })
                        .then(() => {
                            this.$router.push({name: 'viewFuncionario', params: {id_funcionario: this.id_funcionario}})
                        })
                    })
                })
            }
        }
    }
</script>