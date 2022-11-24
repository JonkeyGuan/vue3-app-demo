import { App, getCurrentInstance, inject } from "vue";
import type { InstallOptionsModel, KeycloakModel, LoginInfoModel } from "./type";
import type { VueKeycloakOptions } from "./vuekeycloakTypes";
import InitKeycloak from './vuekeycloak';

//唯一标识
const key = "__mr_vue_framework_keycloak";

/**
 * 登录
 */
const login = (options: InstallOptionsModel) => {
    return new Promise<KeycloakModel>((resolve) => {
        sessionStorage.setItem("keycloak", JSON.stringify(options));

        if (window.location.href.indexOf("code") < 0) {
            resolve();
            return;
        }

        //const _options = JSON.parse(sessionStorage.getItem("keycloak")!);

        // 配置
        const config: VueKeycloakOptions = {
            init: {
                onLoad: 'login-required'
            },
            config: options.config,
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
    });
};

/**
 * 获取Keycloak实例
 * @returns 返回Keycloak实例
 */
const getKeycloak = () => {

    const model = window[key] as KeycloakModel;

    if (!model) {
        throw new Error("未安装keycloak模块");
    }

    return model;
};

const isLogin = () => {
    const model = window[key] as KeycloakModel;

    if (!model) {
        return false;
    }

    return true;
}

/**
 * 获取登录token
 * @returns 返回登录token
 */
const getToken = () => {
    if(!isLogin()){
        return ;
    }
    const model = getKeycloak();

    return model.instance.token;
};

const getRoles = () => {
    if(!isLogin()){
        return ;
    }
    const model = getKeycloak();

    return model.instance.realmAccess;
};

const getUsername = () => {
    if(!isLogin()){
        return ;
    }
    const idtoken = getKeycloak().instance.idTokenParsed!;
    const name = idtoken.preferred_username;
    return name;


};
/**
 * 退出登录
 */
const logout = () => {
    if(!isLogin()){
        return ;
    }
    const model = getKeycloak();

    model.instance.logout();
};

export { login, getKeycloak, getToken, logout, getRoles, getUsername };