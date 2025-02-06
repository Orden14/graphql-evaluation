import { Component } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service/auth-service.service';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.scss']
})

export class HeadersComponent {

  constructor(
    private authService: AuthServiceService,
  ) {}

  isUserLoggedIn(): boolean {
    return this.authService.isUserLoggedIn();
  }

  logout() : void {
    sessionStorage.removeItem('JwT');
  }

}
