<template>
    <div id="viewFuncionario">
        <ul class="collection with-header">
            <li class="collection-header">
                <h4>
                    {{nome}}
                </h4>
            </li>
            <li class="collection-item">ID Funcionário: {{id_funcionario}}</li>
            <li class="collection-item">Departamento: {{departamento}}</li>
            <li class="collection-item">Posição: {{posicao}}</li>
        </ul>
        <router-link to="/" class="btn grey">
            Voltar
        </router-link>
        <button @click="excluirFuncionario" class="btn red">
            Excluir
        </button>
        <div class="fixed-action-btn">
            <router-link v-bind:to="{name: 'editFuncionario', params:{id_funcionario: id_funcionario} }" class="btn-floating btn-large red">
                <i class="fa fa-pencil"></i>
            </router-link>
        </div>
    </div>
</template>

<script>
    import db from './firebaseInit';
    export default {
        name: 'viewFuncionario',
        data() {
            return {
                id_funcionario: null,
                nome: null,
                departamento: null,
                posicao: null
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
            excluirFuncionario(){
                if(confirm('Tem certeza disto?')){
                    db.collection('empregados').where('id_empregado', '==', this.$route.params.id_funcionario).get()
                    .then(querySnapshot => {
                        querySnapshot.forEach(doc => {
                            doc.ref.delete();
                            this.$router.push('/')
                        })
                    })
                }
            }
        }
    }
</script>