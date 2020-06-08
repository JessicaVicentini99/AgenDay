import Vue from "vue";
import Router from "vue-router";
import AppHeader from "./layout/AppHeader";
import AppFooter from "./layout/AppFooter";
import Components from "./views/Components.vue";
import Landing from "./views/Landing.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Profile from "./views/Profile.vue";
import Agendamentos from "./views/pages/agendamentos/Agendamentos";
import Servicos from "./views/pages/servicos/Servicos";
import ServicosAdicionar from "./views/pages/servicos/ServicosAdicionar";
import ServicosEditar from "./views/pages/servicos/ServicosEditar";
import AgendamentosAdicionarStep1 from "./views/pages/agendamentos/AgendamentosAdicionarStep1";
import AgendamentosAdicionarStep2 from "./views/pages/agendamentos/AgendamentosAdicionarStep2";
import AgendamentosAdicionarStep3 from "./views/pages/agendamentos/AgendamentosAdicionarStep3";
Vue.use(Router);

export default new Router({
  linkExactActiveClass: "active",
  routes: [
    {
      path: "/",
      name: "components",
      components: {
        header: AppHeader,
        default: Components,
        footer: AppFooter
      }
    },
    {
      path: "/agendamentos",
      name: "agendamentos",
      components: {
        header: AppHeader,
        default: Agendamentos,
        footer: AppFooter
      }
    },
      {
      path: "/agendamentos/adicionar_step1",
      name: "agendamentos.adicionar_step1",
      components: {
        header: AppHeader,
        default: AgendamentosAdicionarStep1,
        footer: AppFooter
      }
    },
    {
      path: "/agendamentos/adicionar_step2/:id",
      name: "agendamentos.adicionar_step2",
      components: {
        header: AppHeader,
        default: AgendamentosAdicionarStep2,
        footer: AppFooter
      }
    },
    {
      path: "/agendamentos/adicionar_step3",
      name: "agendamentos.adicionar_step3",
      components: {
        header: AppHeader,
        default: AgendamentosAdicionarStep3,
        footer: AppFooter
      }
    },
    {
      path: "/servicos",
      name: "servicos",
      components: {
        header: AppHeader,
        default: Servicos,
        footer: AppFooter
      }
    },
    {
      path: "/servicos/adicionar",
      name: "servicos.adicionar",
      components: {
        header: AppHeader,
        default: ServicosAdicionar,
        footer: AppFooter
      }
    },
    {
      path: "/servicos/:id",
      name: "servicos.editar",
      components: {
        header: AppHeader,
        default: ServicosEditar,
        footer: AppFooter
      }
    },
    {
        path: "/landing",
      name: "landing",
      components: {
        header: AppHeader,
        default: Landing,
        footer: AppFooter
      }
    },
    {
      path: "/login",
      name: "login",
      components: {
        header: AppHeader,
        default: Login,
        footer: AppFooter
      }
    },
    {
      path: "/register",
      name: "register",
      components: {
        header: AppHeader,
        default: Register,
        footer: AppFooter
      }
    },
    {
      path: "/profile",
      name: "profile",
      components: {
        header: AppHeader,
        default: Profile,
        footer: AppFooter
      }
    },
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});
