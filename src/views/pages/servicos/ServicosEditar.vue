<template>
    <div>
        <div class="row ml-3 mt-4">
            <div class="col-9 mt-1">

                <h5>Editar Serviço</h5>

            </div>
            <div class="col mt-0">
                <base-button type="danger" outline icon="fa fa-trash" @click="deletar"></base-button>

            </div>
        </div>
        <div class="container mt-3">
            <div class="card-body shadow" v-if="formData">
                <div class="row">
                    <div class="col">
                        <base-input v-model="formData.nome" label="Nome do serviço"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <base-input v-model="formData.preco" type="string" min="0.00" max="10000.00" step="0.01"
                                    label="Preço"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <label class="mb-2 mr-2" for="tempo">Tempo de execução do serviço</label>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <base-input type="number" v-model="formData.horas" id="horas" placeholder="Horas" name="horas"/>
                    </div>
                    <div class="mr-0 pr-0 mt-1 pt-1">
                        <b>:</b>
                    </div>
                    <div class="col">
                        <base-input type="number" id="minutos" v-model="formData.minutos" placeholder="Minutos"
                                    name="minutos"/>
                    </div>

                    <div class="col">
                        <!--                        <multiselect  v-model="value" selectLabel="" deselectLabel="remover" :options="options"></multiselect>-->
                    </div>

                </div>
                <div class="row mt-1">
                    <div class="col">

                        <base-button block type="primary" @click="submit">Salvar alterações</base-button>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import Multiselect from 'vue-multiselect'
    import axios from 'axios';

    export default {
        name: "ServicosEditar",
        components: {Multiselect},

        data() {
            return {
                formData: null,
                options: ['minutos', 'horas']
            }
        },
        created() {
            this.getServico();
        },
        methods: {
            async getServico(){
                axios.get(`https://agenday-b3fe9.firebaseio.com/servicos/${this.$route.params.id}.json`)
                    .then(response => {
                        // JSON responses are automatically parsed.
                        this.formData = response.data
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
            },
            deletar(){
                axios.delete(`https://agenday-b3fe9.firebaseio.com/servicos/${this.$route.params.id}.json`, this.formData)
                    .then(response => {
                        this.$router.replace({name: "servicos"});
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
            },
            submit() {
                axios.put(`https://agenday-b3fe9.firebaseio.com/servicos/${this.$route.params.id}.json`, this.formData)
                    .then(response => {
                        this.$router.replace({name: "servicos"});
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
            }
        }
    }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>

</style>
