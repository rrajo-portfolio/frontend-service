type RuntimeConfig = {
  apiUrl?: string;
  keycloakUrl?: string;
  keycloakRealm?: string;
  keycloakClientId?: string;
  keycloakAccountClientId?: string;
};

const runtimeConfig =
  ((globalThis as Record<string, unknown>)['__PORTFOLIO_CONFIG__'] as
    | RuntimeConfig
    | undefined) ?? {};

export const environment = {
  production: true,
  apiUrl: runtimeConfig.apiUrl ?? 'https://api.portfolio.com',
  keycloak: {
    url: runtimeConfig.keycloakUrl ?? 'https://auth.portfolio.com/auth',
    realm: runtimeConfig.keycloakRealm ?? 'portfolio',
    clientId: runtimeConfig.keycloakClientId ?? 'portfolio-frontend',
    accountConsoleClientId: runtimeConfig.keycloakAccountClientId ?? 'account-console'
  }
};
