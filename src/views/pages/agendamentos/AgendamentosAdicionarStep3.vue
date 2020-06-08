<template>
  <div>
    <div class="row ml-3 mt-4">
      <div class="col mt-1">
        <h5>Escolha um Serviço</h5>
      </div>
    </div>
    <div>
      <template v-for="(item,key) in cartItens" v-key="key">
        <div class="container mt-2">
          <div class="card-body shadow mb-3  rounded-90">
            <div class="row">

              <div class="col-9">
                <p class="mb-0">{{item.data}} às {{item.hora}}</p>
                <h5>{{item.servico_nome}}</h5>
                <div class="row">
                  <div class="col">
                    <small>R$ {{item.servico_preco}}</small>
                  </div>
                  <div class="col" style="right: -50%">
                    <base-button type="danger" outline icon="fa fa-trash"></base-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <div class="row">
        <div class="col">

        </div>
        <div class="col">
          <base-button outline type="info" @click="toStep1" icon="ni ni-fat-add">Adicionar outro servico</base-button>
        </div>
        <div class="col">

        </div>
      </div>
      <div class="card-body shadow mt-3  rounded-90">
        <div class="row">
          <div class="col">
            <h4>Total</h4>
          </div>
          <div class="col">

          </div>
          <div class="col">
            <h4>R$ {{totalCart}}</h4>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col">
            <base-button block type="primary" @click="submit">Concluir agendamento</base-button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
    import axios from 'axios';
    import * as Cookies from "js-cookie";

    export default {
        name: "AgendamentosAdicionarStep3",
        data() {
            return {
                lista: null,
                cartItens: null,
            }
        },
        created() {
            this.listar();
        },
        computed: {
            totalCart() {
                let total = 0.0;
                for (var key in this.cartItens) {
                    total += parseFloat(this.cartItens[key].servico_preco)
                }
                return total;
            }

        },
        methods: {
            toStep1() {
                this.$router.replace({name: "agendamentos.adicionar_step1"});
            },
            submit() {
                for (var key in this.cartItens) {
                    axios.post("https://agenday-b3fe9.firebaseio.com/agendamentos.json", this.cartItens[key])
                        .then(response => {
                            Cookies.remove("cart", {path: "/"});
                            this.$router.replace({name: "agendamentos"});
                        })
                        .catch(e => {
                            this.errors.push(e)
                        })
                }
            },
            listar() {
                this.cartItens = Cookies.getJSON("cart");
            }
        }
    }
</script>

<style scoped>

</style>
