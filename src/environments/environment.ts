type RuntimeConfig = {
  apiUrl?: string;
  keycloakUrl?: string;
  keycloakRealm?: string;
  keycloakClientId?: string;
};

const runtimeConfig =
  ((globalThis as Record<string, unknown>)['__PORTFOLIO_CONFIG__'] as
    | RuntimeConfig
    | undefined) ?? {};

export const environment = {
  production: false,
  apiUrl: runtimeConfig.apiUrl ?? 'http://localhost:8085',
  keycloak: {
    url: runtimeConfig.keycloakUrl ?? 'http://localhost:7080/auth',
    realm: runtimeConfig.keycloakRealm ?? 'portfolio',
    clientId: runtimeConfig.keycloakClientId ?? 'portfolio-frontend'
  }
};
