<template>
    <div class="ml-2 mr-2">
        <tabs fill >
            <tab-pane c title="Agendamentos">
                <div>
                    <template v-for="item in lista" v-key="key">
                        <!-- <div class="row ml-3 mt-1 mb-0">


                         </div>-->
                        <div v-if="!computedIsHistory(item.value.data)" class="container mr-0 mt-0" v-show="isManager || userUID == item.value.customer_uid">
                            <div class="card-body shadow mb-3  rounded-90" style="background-color: white">
                                <div class="row">

                                    <div class="col-9">
                                        <h5>{{item.value.data | moment("DD/MM/YYYY")}} às {{item.value.hora}} </h5>
                                        <b>{{item.value.servico_nome}}</b>
                                        <div class="row">
                                            <div class="col">
                                                <small>Duração: {{item.value.hora}}</small><br>
                                                <small>Preço: {{item.value.servico_preco}}</small>

                                            </div>
                                        </div>
                                        <badge v-if="item.value.status =='Cancelado'" class="mt-2" type="danger" rounded>Cancelado</badge>
                                        <badge v-else class="mt-2" type="info" rounded>Agendado</badge>
                                    </div>
                                    <div class="col p-0" v-if="item.value.status !='Cancelado'">
                                        <base-button type="danger" outline  icon="fa fa-remove" @click="openModal(item.index, item.value)"></base-button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </template>
                </div>
            </tab-pane>
            <tab-pane title="Histórico">
                <div>
                    <template v-for="item in lista">
                        <!-- <div class="row ml-3 mt-1 mb-0">
                         </div>-->
                        <div  v-if="computedIsHistory(item.value.data)" class="container mr-0 mt-0" v-show="isManager || userUID == item.value.customer_uid">
                            <div class="card-body shadow mb-3  rounded-90" style="background-color: white">
                                <div class="row">

                                    <div class="col-9">

                                        <h5>{{item.value.data | moment("DD/MM/YYYY")}} às {{item.value.hora}} </h5>
                                        <b>{{item.value.servico_nome}}</b>
                                        <div class="row">
                                            <div class="col">
                                                <small>Duração: {{item.value.hora}}</small><br>
                                                <small>Preço: {{item.value.servico_preco}}</small>
                                            </div>

                                        </div>

                                        <badge v-if="item.value.status =='Cancelado'" class="mt-2" type="danger" rounded>Cancelado</badge>
                                        <badge v-else class="mt-2" type="success" rounded>Realizado</badge>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </template>
                </div>
            </tab-pane>
        </tabs>
        <modal type="mini" :show="canShowModal">
            <h6 slot="header" class="modal-title" id="modal-title-default">Certeza que deseja remover o agendamento?</h6>
            <template v-if="agendamentoSelecionado">
                <h5>{{agendamentoSelecionado.servico_nome}}</h5>
                <p>{{agendamentoSelecionado.data | moment("DD/MM/YYYY")}} às {{agendamentoSelecionado.hora}} </p>
            </template>

            <template slot="footer">
                <base-button type="link" @click="canShowModal = false">Fechar
                </base-button>

                <base-button type="danger"  class="ml-auto"   @click="cancelar">Remover</base-button>
            </template>
        </modal>
    </div>
</template>

<script>
    import axios from 'axios';
    import moment from 'moment'
    import firebase from "firebase";
    import * as Cookies from "js-cookie";
    import auth from "../../../vuex/auth";

    import TabPane from "../../../components/Tabs/TabPane";
    import Tabs from "../../../components/Tabs/Tabs"
    import Modal from "@/components/Modal.vue";

    export default {
        name: "Agendamentos",
        components: {
            TabPane,Tabs,Modal
        },
        data() {
            return {
                canShowModal: false,
                lista: [],
                agendamentoSelecionado: null,
                indexSelecionado: null,
            }
        },

        created() {
            this.listar();
        },


        computed:{

            isManager() {
                // let user = auth.getters.getUser.data.data;
                if(Cookies.getJSON("user")){
                    return Cookies.getJSON("user").email == "manager@teste.com";
                }
                return true;
            },
            userUID(){
                var authAll = auth.getters.getUser;
                console.log("teste",authAll.data.data.uid);
                return  auth.getters.getUser.data.data.uid;
            },
        },
        methods: {
            openModal(key, data){
                console.log(key,data)
                this.agendamentoSelecionado = data;
                this.indexSelecionado = key;
                this.canShowModal = true;
            },
            cancelar(){
                this.agendamentoSelecionado.status = "Cancelado";
                axios.put(`https://agenday-b3fe9.firebaseio.com/agendamentos/${this.indexSelecionado}.json`, this.agendamentoSelecionado)
                        .then(response => {
                            this.canShowModal = false;
                            this.$router.replace({name: "agendamentos"});
                        })
                        .catch(e => {
                            this.errors.push(e)
                        })
            },
            computedIsHistory(date){
                return moment().isAfter(date,"day");
            },
            adicionar() {
                this.$router.replace({name: "agendamentos.adicionar_step1"});
            },
            editar(id){
                // this.$router.replace({name: "servicos.editar", params: {id: id}});
            },
             listar() {
                let dbRef = firebase.database().ref("agendamentos");
                var teste = [];

                    dbRef.orderByChild("data").on("child_added", snap => {
                        return teste.push({index: snap.key,value: snap.val()});
                    });



                 console.log("aaaaa",teste);
                this.lista = teste;

              /*  var ref = firebase.database().ref("agendamentos");
                ref.orderByChild('data')
                        .once('value', function(s) {
                            console.log(JSON.stringify(s.val(), null, '  '));
                        }, function(error) {
                            if(error) console.error(error);
                        })*/


                /*axios.get("https://agenday-b3fe9.firebaseio.com/agendamentos.json")
                        .then(response => {
                            this.lista = response.data
                        })
                        .catch(e => {
                            this.errors.push(e)
                        })*/
            }
        }
    }
</script>

<style scoped>

</style>
