<template>
    <div>
        <div class="row ml-3 mt-4">
            <div class="col mt-1">
                <h5>Serviços</h5>
            </div>
            <div class="col  mt--100">

                <base-button class="btn-3" size="sm" outline type="success" @click="adicionar" icon="ni ni-fat-add">
                    Adicionar
                </base-button>
            </div>
        </div>
        <div>
            <template v-for="(item,key) in lista" v-key="key">
                <div class="container mt-2">
                    <div class="card-body shadow mb-3  rounded-90" style="background-color: white">
                        <div class="row">

                            <div class="col-9">
                                <b>{{item.nome}}</b>
                                <div class="row">
                                    <div class="col">
                                        <small>Duração: {{item.horas}}:{{item.minutos}}</small>
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <base-button type="primary" outline icon="fa fa-ellipsis-v" @click="editar(key)"></base-button>
                            </div>
                        </div>

                    </div>
                </div>
            </template>
        </div>
    </div>

</template>

<script>
    import axios from 'axios';

    export default {
        name: "Servicos",
        data() {
            return {
                lista: null,
            }
        },
        created() {
            this.listar();
        },
        methods: {
            adicionar() {
                this.$router.replace({name: "servicos.adicionar"});
            },
            editar(id){
                this.$router.replace({name: "servicos.editar", params: {id: id}});
            },
            listar() {
                axios.get("https://agenday-b3fe9.firebaseio.com/servicos.json")
                    .then(response => {
                        this.lista = response.data
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
            }
        }
    }
</script>

<style scoped>

</style>
