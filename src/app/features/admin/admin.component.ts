import { Component } from '@angular/core';

interface AdminSection {
  titleKey: string;
  descriptionKey: string;
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
      titleKey: 'admin.sections.users.title',
      descriptionKey: 'admin.sections.users.description',
      link: '/users',
      icon: 'Users'
    },
    {
      titleKey: 'admin.sections.catalog.title',
      descriptionKey: 'admin.sections.catalog.description',
      link: '/catalog',
      icon: 'Package'
    },
    {
      titleKey: 'admin.sections.orders.title',
      descriptionKey: 'admin.sections.orders.description',
      link: '/orders',
      icon: 'ShoppingCart'
    },
    {
      titleKey: 'admin.sections.observability.title',
      descriptionKey: 'admin.sections.observability.description',
      link: '/dashboard',
      icon: 'Activity'
    }
  ];
}
