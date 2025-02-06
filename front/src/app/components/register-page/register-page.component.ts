import { Component } from '@angular/core';
import { CreateUserGQL } from 'src/app/generated/graphql';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  message: string = '';

  constructor(
    private createUserGQL: CreateUserGQL,
    private router: Router,
  ) {}

  register(): void {
    if (!this.username.trim() || !this.password.trim()) {
      this.message = 'Veuillez remplir tous les champs requis.';
      return;
    }
  
    this.createUserGQL
      .mutate({ username: this.username, password: this.password })
      .subscribe({
        next: ({ data }) => {
          if (data?.createUser!.success) {
            this.message = 'Inscription réussie ! Vous pouvez maintenant vous connecter.';
            this.resetForm();
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 1000);
          } else {
            this.message = data?.createUser!.message || "Erreur lors de l'inscription.";
          }
        },
        error: (error) => {
          console.error("Erreur lors de l'inscription :", error);
          this.message = 'Une erreur est survenue, veuillez réessayer.';
        },
      });
  }
  

  private resetForm(): void {
    this.username = '';
    this.email = '';
    this.password = '';
  }
}
