<template>
    <footer v-if="canShow" style="position: fixed;bottom: 0px;">
        <!-- <div class="container container-lg">
             <div class="row">
                 <div class="col-md-6 mb-5 mb-md-0">
                     <div class="card card-lift&#45;&#45;hover shadow border-0">
                         <router-link to="/landing" title="Landing Page">
                             <img v-lazy="'img/theme/landing.jpg'" class="card-img">
                         </router-link>
                     </div>
                 </div>
                 <div class="col-md-6 mb-5 mb-lg-0">
                     <div class="card card-lift&#45;&#45;hover shadow border-0">
                         <router-link to="/profile" title="Profile Page">
                             <img v-lazy="'img/theme/profile.jpg'" class="card-img">
                         </router-link>
                     </div>
                 </div>
             </div>
         </div>-->
        <!--        <div class="container" style="position: fixed;bottom: 0;    box-shadow: 0 4px 8px 0 rgba(65,42,151,0.36), 0px -5px 13px 0 rgba(65,42,151,0.35);">-->
        <base-button v-if="!isManager" type="primary"
                     @click="redirect"
                     style="position: fixed;bottom: 1%; right: 3%; height: 54px; width: 54px; box-shadow: 3px 3px 8px 0px #5e72e473, 0 1px 3px rgba(0, 0, 0, 0.08)"
                     rounded icon="fa fa-plus"></base-button>
        <base-button v-else  type="primary"
                     @click="redirectList"
                     style="position: fixed;bottom: 1%; right: 3%; height: 54px; width: 54px; box-shadow: 3px 3px 8px 0px #5e72e473, 0 1px 3px rgba(0, 0, 0, 0.08)"
                     rounded icon="fa fa-calendar-o"></base-button>

        <!--            </div>-->
        <!--<div class="row row-grid align-items-center my-md">
            <div class="col-lg-6">
                <h3 class="text-primary font-weight-light mb-2">Thank you for supporting us!</h3>
                <h4 class="mb-0 font-weight-light">Let's get in touch on any of these platforms.</h4>
            </div>
            <div class="col-lg-6 text-lg-center btn-wrapper">
                <a target="_blank" rel="noopener" href="https://twitter.com/creativetim"
                   class="btn btn-neutral btn-icon-only btn-twitter btn-round btn-lg" data-toggle="tooltip"
                   data-original-title="Follow us">
                    <i class="fa fa-twitter"></i>
                </a>
                <a target="_blank" rel="noopener" href="https://www.facebook.com/creativetim"
                   class="btn btn-neutral btn-icon-only btn-facebook btn-round btn-lg" data-toggle="tooltip"
                   data-original-title="Like us">
                    <i class="fa fa-facebook-square"></i>
                </a>
                <a target="_blank" rel="noopener" href="https://dribbble.com/creativetim"
                   class="btn btn-neutral btn-icon-only btn-dribbble btn-lg btn-round" data-toggle="tooltip"
                   data-original-title="Follow us">
                    <i class="fa fa-dribbble"></i>
                </a>
                <a target="_blank" rel="noopener" href="https://github.com/creativetimofficial"
                   class="btn btn-neutral btn-icon-only btn-github btn-round btn-lg" data-toggle="tooltip"
                   data-original-title="Star on Github">
                    <i class="fa fa-github"></i>
                </a>
            </div>
        </div>
        <hr>
        <div class="row align-items-center justify-content-md-between">
            <div class="col-md-6">
                <div class="copyright">
                    &copy; {{year}}
                    <a href="https://www.creative-tim.com" target="_blank" rel="noopener">Creative Tim</a> & <a href="https://www.binarcode.com" target="_blank" rel="noopener">Binar Code</a>
                </div>
            </div>
            <div class="col-md-6">
                <ul class="nav nav-footer justify-content-end">
                    <li class="nav-item">
                        <a href="https://www.creative-tim.com" class="nav-link" target="_blank" rel="noopener">Creative Tim</a>
                    </li>
                    <li class="nav-item">
                        <a href="https://www.creative-tim.com/presentation" class="nav-link" target="_blank" rel="noopener">About
                            Us</a>
                    </li>
                    <li class="nav-item">
                        <a href="http://blog.creative-tim.com" class="nav-link" target="_blank" rel="noopener">Blog</a>
                    </li>
                    <li class="nav-item">
                        <a href="https://github.com/creativetimofficial/argon-design-system/blob/master/LICENSE.md"
                           class="nav-link" target="_blank" rel="noopener">MIT License</a>
                    </li>
                </ul>
            </div>
        </div>-->
    </footer>
</template>
<script>
    import auth from "../vuex/auth";
    import * as Cookies from "js-cookie";

    export default {
        name: 'app-footer',
        data() {
            return {
                year: new Date().getFullYear()
            }
        },
        computed: {
            isAgendametos(){
                return this.$route.name=="agendamentos";
            },
            isManager() {
                if(Cookies.getJSON("user")){
                    return Cookies.getJSON("user").email == "manager@teste.com";
                }
                return true;
            },
            canShow() {
                return this.$route.name != "login" && this.$route.name != "register"
            }
        },
        methods: {
            redirect(){
                this.$router.replace({name: "agendamentos.adicionar_step1"});

            },
            redirectList(){
                this.$router.replace({name: "agendamentos"});

            }
        }
    };
</script>
<style>
</style>
