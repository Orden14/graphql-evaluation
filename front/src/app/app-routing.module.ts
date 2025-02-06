import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { DetailPostComponent } from './components/detail-post/detail-post.component';
import { ArticleFormComponent } from './components/article-form/article-form.component';
import { ArticleEditFormComponent } from './components/article-edit-form/article-edit-form.component';

const routes: Routes = [
  {
    path : 'register',
    component: RegisterPageComponent,
  },
  {
    path : 'login',
    component : LoginPageComponent,
  },
  {
    path : 'createPost',
    component : ArticleFormComponent,
  },
  {
    path : 'editPost/:id',
    component : ArticleEditFormComponent,
  },
  {
    path : 'post/:id',
    component : DetailPostComponent,
  },
  {
    path: '**',
    component: HomePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
