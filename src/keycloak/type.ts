import { KeycloakConfig } from "./vuekeycloakTypes";
import Keycloak from "keycloak-js";
import type { KeycloakProfile } from "keycloak-js";

/**
 * Keycloak 配置
 */
interface InstallOptionsModel {
    /**
     * Keycloak登录配置
     */
    config: KeycloakConfig
}

/**
 * Keycloak 实例
 */
interface KeycloakModel {
    /**
     * Keycloak实例
     */
    instance: Keycloak,
    /**
     * 用户信息
     */
    profile: KeycloakProfile
}

/**
 * 登录信息
 */
interface LoginInfoModel {
    /**
     * 登录Token
     */
    token: string;
}

export type { InstallOptionsModel, KeycloakModel, LoginInfoModel };