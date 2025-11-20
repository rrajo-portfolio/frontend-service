import { Component } from '@angular/core';

interface AdminSection {
  title: string;
  description: string;
  link: string;
  icon: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  readonly sections: AdminSection[] = [
    {
      title: 'Usuarios y roles',
      description:
        'Administra usuarios de negocio, valida estados y sincroniza datos con Keycloak.',
      link: '/users',
      icon: 'Users'
    },
    {
      title: 'Catálogo',
      description:
        'Actualiza precios, publica eventos a Kafka y mantiene los índices de Elasticsearch.',
      link: '/catalog',
      icon: 'Package'
    },
    {
      title: 'Pedidos y cumplimiento',
      description:
        'Supervisa estados, ejecuta reintentos de integraciones y comprueba la resiliencia del servicio.',
      link: '/orders',
      icon: 'ShoppingCart'
    },
    {
      title: 'Observabilidad',
      description:
        'Keycloak, gateways y pipelines con métricas y tableros listos para auditoría.',
      link: '/dashboard',
      icon: 'Activity'
    }
  ];
}
