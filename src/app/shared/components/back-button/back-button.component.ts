import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss']
})
export class BackButtonComponent {
  @Input() labelKey = 'common.back';
  @Input() fallbackUrl = '/';

  constructor(private readonly location: Location, private readonly router: Router) {}

  navigate(): void {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      this.location.back();
      return;
    }
    this.router.navigateByUrl(this.fallbackUrl);
  }
}
