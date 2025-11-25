# Frontend Service (Angular 18)

## Purpose
Single-page application that presents the portfolio experience recruiters interact with. It exists to demonstrate how an enterprise-grade UI consumes secured microservices through Spring Cloud Gateway while maintaining brand consistency, accessibility, and runtime configuration for multiple environments.

## Technology Focus
- Angular 18 with TypeScript 5, Angular Material, and a modular core/shared/features structure to mirror the backend bounded contexts.
- Keycloak integration via keycloak-angular, PKCE flows, guards, and interceptors to keep navigation aligned with OAuth2 roles.
- Runtime configuration through `runtime-config.js` so Docker and Kubernetes deployments can change API or identity URLs without rebuilding the bundle.
- NGINX-based container image that relays `/api` requests to the gateway, highlighting how the SPA, gateway, and Keycloak cooperate in production-ready setups.
