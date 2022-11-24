
<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <button @click="toLogin">去登录</button>
  </nav>
  <router-view />

  <div>
    
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import InitKeycloak from './keycloak/vuekeycloak';
const toLogin = ()=>{
  const _options = JSON.parse(sessionStorage.getItem("keycloak")!);

        // 配置
        const config: VueKeycloakOptions = {
            init: {
                onLoad: 'login-required'
            },
            config: _options.config,
            onReady: (keycloakInstance) => {
                //获取用户信息
                keycloakInstance.loadUserProfile().then(profile => {
                    const model: KeycloakModel = {
                        instance: keycloakInstance,
                        profile: profile
                    };
                    window[key] = model;

                    //登录成功，回调
                    resolve(model);
                });
            }
        };

        InitKeycloak(config);
};
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
