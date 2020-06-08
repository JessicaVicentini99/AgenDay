import Vue from "vue";
import Vuex from "vuex";
import * as Cookies from "js-cookie";
import router from "../router";

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        user: {
            data: null
        },
    },
    getters: {
        getUser(state){
            return state.user
        },

        getUserCookie: () => Cookies.getJSON("user"),
    },
    mutations: {
        SET_USER(state, data) {
            state.user.data = data;
        },
    },
    actions: {
        setUserFromCookie({commit}, data) {
            Cookies.set("user", JSON.stringify(data), {path: "/"});
        },
        clearLoggedUser(context) {
            Cookies.remove("user", {path: "/"});
        },
        logoutUser({ commit }, user){
            this.dispatch("clearLoggedUser",user);
            commit("SET_USER", null);
        },
        fetchUser({ commit }, data) {
            if (data) {
                this.dispatch("setUserFromCookie",data);
                commit("SET_USER", {
                    data
                });
            } else {
                this.dispatch("clearLoggedUser",data);
                commit("SET_USER", null);
            }
        }
    }
});
