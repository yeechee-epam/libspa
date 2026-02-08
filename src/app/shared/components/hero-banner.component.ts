import { Component } from '@angular/core';
import {environment} from 'src/environments/environment';
@Component({
  standalone: true,
  selector: 'app-hero-banner',
  template: `
    <div class="hero-banner hero-banner--aqua-emerald">
      <div class="hero-banner__logo">
        <img class="hero-banner__image" [src]="logo" alt="Angular logo" />
      </div>
      <h1 class="hero-banner__headline">Welcome</h1>
      <p class="hero-banner__description">
        Browse our books!
      </p>
      <a
        id="code-sample-link"
        class="button button--secondary"
        href="booksUrl"
        target="_blank"
        rel="noopener noreferrer"
      >
        Check out new books by your favorite authors →
      </a>
    </div>
  `,
})
export class HeroBannerComponent {
  logo = 'https://cdn.auth0.com/blog/developer-hub/angular-logo.svg';
  booksUrl = `${environment.frontendUrl}/books`;
}
