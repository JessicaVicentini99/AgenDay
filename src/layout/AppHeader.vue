<template>
    <header class="header-global" style="position: fixed; width: 100%; z-index: 999999">
        <base-nav class="navbar-main" type="default" effect="light" expand>
            <router-link slot="brand" class="navbar-brand mr-lg-5" to="/agendamentos">
                <h4 style="color: #ffffff">AgenDay</h4>
            </router-link>

            <div class="row" slot="content-header" slot-scope="{closeMenu}">
                <div class="col-6 collapse-brand">
                    <h5>AgenDay</h5>
                </div>
                <div class="col-6 collapse-close">
                    <close-button ref="closeButton" @click="closeMenu"></close-button>
                </div>
            </div>

            <ul class="navbar-nav ml-lg-auto">
                <li class="nav-item" v-show="isManager">
                    <a class="nav-link nav-link-icon" @click="servicos"
                       target="_blank" rel="noopener" data-toggle="tooltip" title="Follow us on Instagram">
                        <i class="fa fa-briefcase"></i>
                        <span class="nav-link-inner--text d-lg-none">Serviços</span>
                    </a>
                </li>
                <li class="nav-item" >
                    <a class="nav-link nav-link-icon" @click="signOut"
                       target="_blank" rel="noopener" data-toggle="tooltip" title="Follow us on Instagram">
                        <i class="fa fa-sign-out"></i>
                        <span class="nav-link-inner--text d-lg-none">Sair</span>
                    </a>
                </li>
                <!--  <li class="nav-item">
                      <a class="nav-link nav-link-icon" href="#">
                          Profile
                      </a>
                  </li>
                  <base-dropdown tag="li" title="Settings">
                      <a class="dropdown-item" href="#">Action</a>
                      <a class="dropdown-item" href="#">Another action</a>
                      <a class="dropdown-item" href="#">Something else here</a>
                      <div class="dropdown-divider"></div>
                      <a class="dropdown-item" href="#">Separated link</a>
                  </base-dropdown>-->
            </ul>
        </base-nav>
    </header>
</template>
<script>
    import BaseNav from "@/components/BaseNav";
    import BaseDropdown from "@/components/BaseDropdown";
    import CloseButton from "@/components/CloseButton";
    import auth from "../vuex/auth";
    import firebase from "firebase";
    import { mapGetters } from "vuex";
    import * as Cookies from "js-cookie";
    export default {
        components: {
            BaseNav,
            CloseButton,
            BaseDropdown
        },
        computed:{
            isManager() {
                // let user = auth.getters.getUser.data.data;
                if(Cookies.getJSON("user")){
                    return Cookies.getJSON("user").email == "manager@teste.com";
                }
                return true;
            }
        },
        methods: {
            servicos(){
                this.$router.replace({name: "servicos"});
            },
            signOut() {
                firebase
                    .auth()
                    .signOut()
                    .then(() => {
                        auth.dispatch("fetchUser", null);
                        this.$refs.closeButton.handleClick();
                        this.$router.replace({
                            name: "login"
                        });
                    });
            }
        }
    };
</script>
<style>
</style>
