<template>
    <section class="section section-shaped section-lg my-0">
        <div class="shape shape-style-1 bg-gradient-default">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div class="container pt-lg-md">
            <div class="row justify-content-center">
                <div class="col-lg-5">
                    <card type="secondary" shadow
                          header-classes="bg-white pb-5"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0">
                        <template>
                            <div class="text-muted text-center mb-3">
                                <small>AgenDay</small>
                            </div>
                        </template>
                        <template>
                            <div class="text-center text-muted mb-4">
                                <small>Logue com as suas credenciais</small>
                            </div>
                            <form role="form">
                                <base-input alternative
                                            class="mb-3"
                                            placeholder="Email"
                                            v-model="form.email"
                                            addon-left-icon="ni ni-email-83">
                                </base-input>
                                <base-input alternative
                                            type="password"
                                            placeholder="Password"
                                            v-model="form.password"
                                            addon-left-icon="ni ni-lock-circle-open">
                                </base-input>
                                <!--                <base-checkbox>-->
                                <!--                  Remember me-->
                                <!--                </base-checkbox>-->
                                <div class="text-center">
                                    <base-button type="primary" block class="my-4" @click="submit">Entrar</base-button>
                                </div>
                            </form>
                        </template>
                    </card>
                    <div class="row mt-3">
                        <!-- <div class="col-6">
                           <a href="#" class="text-light">
                             <small>Forgot password?</small>
                           </a>
                         </div>-->
                        <div class="col-6 text-left">
                            <a @click="toRegister" class="text-light">
                                <small>Criar conta</small>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    import firebase from "firebase";
    import auth from "../vuex/auth";

    export default {
        data() {
            return {
                form: {
                    email: "",
                    password: ""
                },
                error: null
            };
        },
        methods: {
            toRegister(){
                this.$router.replace({name: "register"});
            },

            submit() {
                firebase
                    .auth()
                    .signInWithEmailAndPassword(this.form.email, this.form.password)
                    .then(data => {
                        auth.dispatch("fetchUser", data);
                        console.log(data.user.name);
                        // if (data.user.email == "manager@teste.com") {
                        //     this.$router.replace({name: "servicos"});
                        // } else {
                            this.$router.replace({name: "agendamentos"});
                        location.reload();

                        // }
                    })
                    .catch(err => {
                        this.error = err.message;
                    });
            }
        }
    };
</script>
<style>
</style>
