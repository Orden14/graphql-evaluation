import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignInGQL } from 'src/app/generated/graphql';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  username: string = '';
  password: string = '';
  message: string = ''

  constructor(
    private SignInGQL: SignInGQL,
    private router : Router,
  ){}

  login(): void {
    if (!this.username.trim() || !this.password.trim()) {
      this.message = 'Veuillez remplir tous les champs requis.';
      return;
    }

    this.SignInGQL
      .mutate({ username: this.username, password: this.password })
      .subscribe({
        next: ({ data }) => {
          if (data?.signIn?.success) {
            this.message = 'Connexion réussie !';
            if (data?.signIn?.token) {
              sessionStorage.setItem('JwT', data?.signIn?.token);
              sessionStorage.setItem('username', this.username);
            } else {
              console.error("Token is undefined or null");
            }
            this.router.navigate(['/']);
          } else {
            this.message = data?.signIn?.message || "Erreur lors de la connexion.";
          }
        },
        error: (error) => {
          console.error("Erreur lors de la connexion :", error);
          this.message = 'Une erreur est survenue, veuillez réessayer.';
        },
      });
  }
}
