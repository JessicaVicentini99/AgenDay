/*!

=========================================================
* Vue Argon Design System - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system/blob/master/LICENSE.md)

* Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Argon from "./plugins/argon-kit";
import './registerServiceWorker'
import * as firebase from "firebase";
import auth from "./vuex/auth";
Vue.config.productionTip = false;
Vue.use(Argon);
Vue.config.productionTip = false;
Vue.use(require('vue-moment'));




const firebaseConfig = {
  apiKey: "AIzaSyChyOEJ-jjomZ77Vh1AThpPJrWf8ZP2bxg",
  authDomain: "agenday-b3fe9.firebaseapp.com",
  databaseURL: "https://agenday-b3fe9.firebaseio.com",
  projectId: "agenday-b3fe9",
  storageBucket: "agenday-b3fe9.appspot.com",
  messagingSenderId: "897533202795",
  appId: "1:897533202795:web:8977b944e18ad909b13c2e"
};

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(user => {
  auth.dispatch("fetchUser", user);
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
