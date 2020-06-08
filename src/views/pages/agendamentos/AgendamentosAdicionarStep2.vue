<template>
    <div>
        <div class="row ml-3 mt-4">
            <div class="col-9 mt-1" v-if="formData">
                <h5 class="mb-0">{{formData.nome}}</h5>
                <small>Duração: {{formData.horas}}:{{formData.minutos}}</small>
            </div>
        </div>
        <div class="row ml-3 mt-3 mr-3 pr-3">
            <div class="col">
                <b><label class="mb-2 mr-2" for="tempo">Data</label></b>
            </div>
        </div>
        <div class="row ml-2 mr-2 ">
            <div class="col">
                <base-input addon-left-icon="ni ni-calendar-grid-58">
                    <flat-picker slot-scope="{focus, blur}"
                                 @on-open="focus"
                                 @on-close="blur"
                                 label="Data"
                                 :config="{allowInput: true, mode: 'range',}"
                                 class="form-control datepicker"
                                 @input="setDateRange"
                                 v-model="period"
                    >
                    </flat-picker>
                </base-input>
            </div>
        </div>
        <template v-show="rangeDates" v-for="date in rangeDates">
            <div class="container mt-3">
                <div class="card-body shadow">
                    <p><b>{{ date | moment("dddd, D MMMM YYYY") }}</b></p>
                    <div class="row ml-1">
                        <div class="mb-3" v-show="hourOptions" v-for="hour in hourOptions">
                            <div class="col">
                                <base-button type="primary" outline  @click="carrinho(date,hour)">{{hour}}</base-button>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </template>
    </div>
</template>

<script>
    import Multiselect from 'vue-multiselect'
    import axios from 'axios';
    import flatPicker from "vue-flatpickr-component";
    import "flatpickr/dist/flatpickr.css";
    import moment from 'moment'
    import * as Cookies from "js-cookie";
        import auth from "../../../vuex/auth";
    export default {
        name: "AgendamentosAdicionarStep2",
        components: {Multiselect, flatPicker},

        data() {
            return {
                formData: null,
                period: null,
                options: ['minutos', 'horas'],
                rangeDates: [],
                hourOptions: []
            }
        },
        created() {
            this.getServico();
        },
        methods: {
            async getServico() {
                axios.get(`https://agenday-b3fe9.firebaseio.com/servicos/${this.$route.params.id}.json`)
                    .then(response => {
                        // JSON responses are automatically parsed.
                        this.formData = response.data
                        this.getHourOptions()
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
            },
            carrinho(date, hour){
                let cart =  Cookies.getJSON("cart");
                if(cart == undefined){
                    cart = [];
                }
                console.log(auth.getters.getUser.data.data);
                let user = auth.getters.getUser.data.data;
                cart.push({data:  moment(date).format("YYYY-MM-DD"), hora: hour, servico_id: this.$route.params.id, servico_nome: this.formData.nome, servico_preco: this.formData.preco, customer_uid: user.uid, status: "Agendado"});
                Cookies.set("cart", JSON.stringify(cart), {path: "/"});
                this.$router.replace({name: "agendamentos.adicionar_step3"});

            },
            getHourOptions() {

                let dataInicio = moment().utcOffset(0).set({hour: 13, minute: 0});
                let dataFim = moment().utcOffset(0).set({hour: 21, minute: 0});

                let dataAtual =  dataInicio;
                console.log(dataAtual.format(),dataFim.format())
                while (dataAtual.isBefore(dataFim)) {
                    this.hourOptions.push(dataAtual.format("HH:mm"));
                    if(this.formData.horas == 1){
                        dataAtual.add(this.formData.horas, "hour")
                    } else {
                        dataAtual.add(this.formData.horas, "hours")
                    }
                    if(this.formData.minutos == 1){
                        dataAtual.add(this.formData.minutos, "minute")
                    } else {
                        dataAtual.add(this.formData.minutos, "minutes")
                    }
                }
            },
            deletar() {
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
            },
            setDateRange() {
                this.rangeDates = [];
                let dataArray = this.period.split(" to ");
                if (dataArray.length > 1) {
                    let dataInicio = moment(this.period.split(" to ")[0]);
                    let dataFim = moment(this.period.split(" to ")[1]);
                    let dataAtual = dataInicio;
                    while (dataAtual.isBefore(dataFim)) {
                        this.rangeDates.push(dataAtual.format());
                        dataAtual.add(1, "day")
                    }
                    this.rangeDates.push(dataAtual.format());
                } else {
                    let dataAtual = moment(this.period.split(" to ")[0]);
                    this.rangeDates.push(dataAtual.format());

                }


            }
        }
    }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>

</style>
