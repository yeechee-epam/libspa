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
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MobileNavBarComponent, NavBarComponent } from '@app/shared';

@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [CommonModule, MobileNavBarComponent, NavBarComponent],
  templateUrl: './callback.component.html'
})
export class CallbackComponent implements OnInit {

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      const state = params['state'];
      console.log('Authorization code:', code);
      console.log('State:', state);
      // You can now use the code to exchange for tokens
    });
  }
}