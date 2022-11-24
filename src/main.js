import './style.css'
import './bootstrap.css'
import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import { login } from "./keycloak";


const myAppConfig = {
    url: import.meta.env.VITE_URL_KEYCLOAKSERVER,
    realm: import.meta.env.VITE_URL_KEYCLOAKSERVER_REALM,
    clientId: import.meta.env.VITE_URL_KEYCLOAKSERVER_CLIENTID,
    usermanage: import.meta.env.VITE_URL_USERMANAGE
}

/*
        url: 'http://sso.example.com:8080/auth',
        realm:'heroes',
        clientId:'spa-heroes'
*/

login({
    config:{
        url: import.meta.env.VITE_URL_KEYCLOAKSERVER,
        realm: import.meta.env.VITE_URL_KEYCLOAKSERVER_REALM,
        clientId: import.meta.env.VITE_URL_KEYCLOAKSERVER_CLIENTID
    }
}).then(()=>{
const app = createApp(App);
app.config.globalProperties["appConfig"] = myAppConfig;
app.use(router);
app.mount('#app');
});

/*


// keycloak init options
const initOptions = {
    url: 'http://127.0.0.1:8080/auth',
    realm: 'springboot',
    clientId: 'vue-app',
    onLoad:'login-required'
}

const keycloak = Keycloak(initOptions)
window.keycloak = keycloak;

keycloak.init({ onLoad: initOptions.onLoad, promiseType: 'native' }).then((authenticated) =>{
    if(!authenticated) {
        window.location.reload();
    } else {
        console.log('Authenticated')
        //await keycloak.loadUserInfo();


        //const app = createApp(App);
        app.provide<KeycloakInstance>('keycloack', keycloak);
        app.use(store).use(router).use(window.keycloak).mount('#app');
    }
    
    setInterval(() =>{

        keycloak.updateToken(70).then((refreshed)=>{
            if (refreshed) {
                console.log('Token refreshed');
            } else {
                console.log('Token not refreshed, valid for '
                    + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
            }
        }).catch(error => {
            console.log('Failed to refresh token', error)
        })
    }, 60000)

}).catch(error => {
    console.log('Authenticated Failed', error)
})
*/