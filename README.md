# Frontend Service (Angular 18)

Aplicacion SPA que consume los microservicios del portfolio via Spring Cloud Gateway y Keycloak. 

## Stack y modulos

- Angular 18 + TypeScript 5 + Angular Material.
- keycloak-angular 16 con PKCE S256.
- Core module (AuthService, interceptores, Keycloak factory) + Shared module (toolbar, footer, Material).
- Feature modules lazy (`catalog`, `orders`, `users`, `dashboard`) alineados con los microservicios.

```
src/app
|-- core/       # AuthService, interceptores, guards, ApiService
|-- shared/     # Header/Footer, MaterialModule, modelos
|-- features/   # Catalogo, pedidos, usuarios, dashboard
`-- app.module.ts + app-routing.module.ts
```

## Scripts de desarrollo

```bash
npm ci                # instala dependencias
npm start             # ng serve (http://localhost:4200) contra gateway http://localhost:8085
npm run build         # build production (usa environment.prod.ts como fallback)
npm test              # karma
```

La configuracion efectiva se toma en tiempo de ejecucion desde `runtime-config.js` (inyecta `window.__PORTFOLIO_CONFIG__`). En local vive en `public/` con valores por defecto (`http://localhost:8085` y Keycloak en `http://localhost:7080/auth`). En la imagen Docker, `docker-entrypoint.sh` reescribe ese archivo utilizando las variables `API_URL`, `KEYCLOAK_URL`, `KEYCLOAK_REALM` y `KEYCLOAK_CLIENT_ID` para evitar rebuilds cuando cambian las URLs.

## Docker / docker-compose

```
docker build -t portfolio/frontend-service .
docker run -p 8087:80 \
  -e API_URL=http://localhost:8085 \
  -e KEYCLOAK_URL=http://localhost:7080/auth \
  -e KEYCLOAK_REALM=portfolio \
  -e KEYCLOAK_CLIENT_ID=portfolio-frontend \
  portfolio/frontend-service
```

- `nginx.conf` sirve la SPA y reescribe `/api/` hacia `gateway-service:8080` cuando corre en docker-compose.
- El entrypoint genera siempre un `runtime-config.js` nuevo.
- En `infra-dev/docker-compose.yml` el servicio `frontend-service` expone `FRONTEND_HTTP_PORT` (8087 local, 18081 en Jenkins) y recibe las URL reales via env vars para que el navegador apunte al puerto publicado en el host.

## Keycloak

El realm exportado (`infra-dev/keycloak/realm-export/portfolio-realm.json`) incluye:

- Cliente `portfolio-frontend` (public client + PKCE) con redirectUris para `http://localhost:4200/*`, `http://localhost:8087/*` y `http://localhost:18081/*`.
- Cliente backend `portfolio-api` con service account.
- Roles `admin` y `user`, usuarios demo `portfolio-admin` (admin) y `portfolio-user` (user).

`AuthGuard` + `RoleGuard` controlan las rutas, `AuthInterceptor` inyecta el token de Keycloak y `AuthService` expone datos del `KeycloakProfile` para el header.

## UX y branding finales

- **Perfil avanzado**: `features/profile` implementa formularios reactivos, preferencias persistidas y acciones rápidas (avatar, descarga de datos, enlaces directos a Keycloak).
- **Favicons + manifest**: todos los iconos viven en `src/assets/icons/` y se referencian desde `src/index.html`, además de la inyección en `AppComponent` para asegurar el favicon correcto tras el bootstrap.
- **Logo interactivo**: `shared/components/logo` centraliza el SVG y el encabezado redirige siempre a `/`.
- **Tema completo de Keycloak**: el login y el account console usan `infra-dev/keycloak/themes/portfolio-theme` (CSS glassmorphism + branding). El realm import ya selecciona el tema para no depender de cambios manuales.

## Integracion con Jenkins

`infra-dev/Jenkinsfile` clona `frontend-service`, ejecuta `npm ci && npm run build -- --configuration production`, construye la imagen Docker y en el smoke test valida `http://host.docker.internal:$FRONTEND_HTTP_PORT`.

## Flujo tipico

1. `npm start` y abre `http://localhost:4200`.
2. Ingresa con `portfolio-admin/admin123` (realm `portfolio`).
3. Navega por Dashboard, Catalogo, Pedidos y Usuarios (solo admin) consumiendo los microservicios via gateway.
4. Ejecuta `docker compose up -d --build` dentro de `infra-dev` para levantar todo el stack y probar la SPA en `http://localhost:8087` (o el puerto configurado en `FRONTEND_HTTP_PORT`).
