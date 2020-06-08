<template>
    <div>
        <div class="row ml-3 mt-4">
            <div class="col mt-1">
                <h5>Escolha um Serviço</h5>
            </div>
        </div>
        <div>
            <template v-for="(item,key) in lista" v-key="key">
                <div class="container mt-2">
                    <div @click="toStep2(key)" class="card-body shadow mb-3  rounded-90">
                        <div class="row">

                            <div class="col-9">
                                <b>{{item.nome}}</b>
                                <div class="row">
                                    <div class="col">
                                        <small>Duração: {{item.horas}}:{{item.minutos}}</small>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <small>R$ {{item.preco}}</small>
                                    </div>

                                </div>
                            </div>
                            <div class="col" style="right: -60%">
                                <base-button class="btn-1" outline type="primary">Agendar</base-button>
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
        name: "AgendamentosAdicionarStep1",
        data() {
            return {
                lista: null,
            }
        },
        created() {
            this.listar();
        },
        methods: {
            toStep2(id){
                this.$router.replace({name: "agendamentos.adicionar_step2", params: {id: id}});
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
