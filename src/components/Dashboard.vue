<template>
    <div id="dashboard">
        <ul class="collection with-header">
            <li class="collection-header">
                <h4>Funcionarios</h4>
            </li>
            <li v-for="funcionario in funcionarios" v-bind:key="funcionario.id" class="collection-item">
                <div class="chip">{{funcionario.departamento}}</div>
                    {{funcionario.id_empregado}}:{{funcionario.nome}}
                <router-link class="secondary-content" v-bind:to="{name: 'viewFuncionario', params: {id_funcionario: funcionario.id_empregado}}">
                    <i class="fa fa-eye"></i>
                </router-link>
            </li>
        </ul>

        <div class="fixed-action-btn">
            <router-link to="/new" class="btn-floating btn-large red">
                <i class="fa fa-plus"></i>
            </router-link>
        </div>
    </div>
</template>

<script>
    import db from './firebaseInit';
    export default {
        name: 'dashboard',
        data() {
            return {
                funcionarios: []
            }
        },
        created() {
            db.collection('empregados').orderBy('departamento').get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const data = {
                        'id': doc.id,
                        'id_empregado': doc.data().id_empregado,
                        'nome': doc.data().nome,
                        'departamento' : doc.data().departamento,
                        'posicao' : doc.data().posicao
                    }
                    this.funcionarios.push(data)
                })
            })
        }
    }
</script>