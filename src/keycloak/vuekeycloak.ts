import Keycloak from 'keycloak-js';
import type { VueKeycloakConfig, VueKeycloakOptions, VueKeycloakInstance, KeycloakError, VueKeycloakTokenParsed, Vue2Vue3App } from './vuekeycloakTypes';

export default init;

function init(options: VueKeycloakOptions) {
  const keycloak = new Keycloak(options.config);

  keycloak.onReady = function (authenticated) {
    typeof options.onReady === 'function' && options.onReady(keycloak);
  };
  keycloak.onAuthSuccess = function () {
    // Check token validity every 10 seconds (10 000 ms) and, if necessary, update the token.
    // Refresh token if it's valid for less then 60 seconds
    const updateTokenInterval = setInterval(
      () =>
        keycloak.updateToken(60).catch(() => {
          keycloak.clearToken();
        }),
      10000
    );
  };
  keycloak.onAuthRefreshSuccess = function () {
    typeof options.onAuthRefreshSuccess === 'function' && options.onAuthRefreshSuccess(keycloak);
  };
  keycloak.onAuthRefreshError = function () {
    typeof options.onAuthRefreshError === 'function' && options.onAuthRefreshError(keycloak);
  };

  keycloak
    .init(options.init!)
    .then(authenticated => {
      typeof options.onInitSuccess === 'function' && options.onInitSuccess(authenticated);
    })
    .catch((err: KeycloakError) => {
      const error = Error('Failure during initialization of keycloak-js adapter');
      typeof options.onInitError === 'function' ? options.onInitError(error, err) : console.error(error, err);
    });

}


