import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CreateArticleGQL } from 'src/app/generated/graphql';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent {

  title : string = ''
  content : string = ''
  message : string = ''

  constructor(
    private createArticleGQL : CreateArticleGQL,
    private router : Router,
  ) {}

  createArticle() : void {
    if(!this.title.trim() || !this.content.trim()){
      this.message = 'Veuillez remplir tous les champs requis.'
      return
    }

    this.createArticleGQL
      .mutate({ title: this.title, content: this.content })
      .subscribe({
        next: ({ data }) => {
          if(data?.createArticle?.success){
            this.message = data.createArticle.message
            setTimeout(() => {
              this.router.navigate(['/'])
            }, 1000)
          } else {
            this.message = data?.createArticle?.message || "Erreur lors de la création de l'article."
          }
        },
        error: (error) => {
          console.error("Erreur lors de la création de l'article :", error)
          this.message = 'Une erreur est survenue, veuillez réessayer.'
        },
      })

  }

}
