// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { MobileNavBarComponent, NavBarComponent } from '@app/shared';

// @Component({
//   selector: 'app-callback',
//   standalone: true,
//   imports: [CommonModule, MobileNavBarComponent, NavBarComponent],
//   templateUrl: './callback.component.html'
// })
// export class CallbackComponent {

// }
// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ActivatedRoute } from '@angular/router';
// import { MobileNavBarComponent, NavBarComponent } from '@app/shared';

// @Component({
//   selector: 'app-callback',
//   standalone: true,
//   imports: [CommonModule, MobileNavBarComponent, NavBarComponent],
//   templateUrl: './callback.component.html'
// })
// export class CallbackComponent implements OnInit {

//   constructor(private route: ActivatedRoute) {}

//   ngOnInit(): void {
//     this.route.queryParams.subscribe(params => {
//       const code = params['code'];
//       const state = params['state'];
//       console.log('Authorization code:', code);
//       console.log('State:', state);
//       // You can now use the code to exchange for tokens
//     });
//   }
// }
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { MobileNavBarComponent, NavBarComponent } from '@app/shared';

@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [CommonModule, MobileNavBarComponent, NavBarComponent],
  template: `<p>Signing you in...</p>`,
})
export class CallbackComponent implements OnInit {

  private auth = inject(AuthService);
  private router = inject(Router);

  async ngOnInit() {
    try {
      const result = await this.auth.handleRedirectCallback().toPromise();

      // Optional: respect appState.target
      const target = result?.appState?.target || '/';
      this.router.navigate([target]);

    } catch (err) {
      console.error('Auth0 callback failed', err);
    }
  }
}
