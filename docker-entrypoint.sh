#!/usr/bin/env sh
set -e

API_URL="${API_URL:-http://localhost:8085}"
KEYCLOAK_URL="${KEYCLOAK_URL:-http://localhost:7080/auth}"
KEYCLOAK_REALM="${KEYCLOAK_REALM:-portfolio}"
KEYCLOAK_CLIENT_ID="${KEYCLOAK_CLIENT_ID:-portfolio-frontend}"

cat <<EOF >/usr/share/nginx/html/runtime-config.js
(function (window) {
  window.__PORTFOLIO_CONFIG__ = {
    apiUrl: '${API_URL}',
    keycloakUrl: '${KEYCLOAK_URL}',
    keycloakRealm: '${KEYCLOAK_REALM}',
    keycloakClientId: '${KEYCLOAK_CLIENT_ID}'
  };
})(window);
EOF

exec "$@"

