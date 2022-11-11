import { createApp } from 'vue'
import './style.css'
import router from './router'
import App from './App.vue'
import { login } from "./keycloak";

const res = await login({
    config:{
        url: 'http://127.0.0.1:8080/auth',
        realm: 'springboot',
        clientId: 'vue-app',
    }
});

console.log(res);

const app = createApp(App);
app.use(router);
app.mount('#app')

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