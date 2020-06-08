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
                            <div class="text-center text-muted mb-4">
                                <small>Registre-se</small>
                            </div>
                            <form role="form">
                                <base-input alternative
                                            class="mb-3"
                                            placeholder="Name"
                                            v-model="form.name"
                                            addon-left-icon="ni ni-hat-3">
                                </base-input>
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
                               <!-- <div class="text-muted font-italic">
                                    <small>password strength:
                                        <span class="text-success font-weight-700">strong</span>
                                    </small>
                                </div>-->
                                <!--<base-checkbox>
                                    <span>I agree with the
                                        <a href="#">Privacy Policy</a>
                                    </span>
                                </base-checkbox>-->
                                <div class="text-center">
                                    <base-button type="primary" class="my-4" @click="submit">Criar conta</base-button>
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
                            <a @click="toLogin" class="text-light">
                                <small>Já tem uma conta?</small>
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

    export default {
        data() {
            return {
                form: {
                    name: "",
                    email: "",
                    password: ""
                },
                error: null
            }
        },
        methods: {
            toLogin(){
                this.$router.replace({name: "login"});

            },
            submit() {
                firebase
                        .auth()
                        .createUserWithEmailAndPassword(this.form.email, this.form.password)
                        .then(data => {
                            data.user
                                    .updateProfile({
                                        displayName: this.form.name
                                    })
                                    .then(() => {
                                    });
                        })
                        .catch(err => {
                            this.error = err.message;
                        });
                this.$router.replace({name: "agendamentos"});
            }
        }
    };
</script>
<style>
</style>
