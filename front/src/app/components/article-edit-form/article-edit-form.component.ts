import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetArticleQuery, GetArticleGQL, UpdateArticleGQL} from 'src/app/generated/graphql';
@Component({
  selector: 'app-article-edit-form',
  templateUrl: './article-edit-form.component.html',
  styleUrls: ['./article-edit-form.component.scss']
})
export class ArticleEditFormComponent implements OnInit{
  title : string = ''
  content : string = ''
  message : string = ''
  article: GetArticleQuery['getArticle'] | null = null;

  constructor(
    private GetArticleGQL : GetArticleGQL,
    private route : ActivatedRoute,
    private router : Router,
    private updateArticleGQL : UpdateArticleGQL,
  ) {}

  ngOnInit(): void {
    const articleId = this.route.snapshot.paramMap.get('id');
    if (articleId) {
      this.GetArticleGQL.fetch({ id: articleId }).subscribe(({ data }) => {
        this.article = data.getArticle;
        if (this.article) {
          this.title = this.article.title;
          this.content = this.article.content;
        }
      });
    }
  }

  modifyArticle() : void {
    if(!this.title.trim() || !this.content.trim()){
      this.message = 'Veuillez remplir tous les champs requis.'
      return
    }

    if (!this.article) {
      this.message = "L'article n'existe pas";
      return;
    }

    this.updateArticleGQL
      .mutate({ id: this.article.id, title: this.title, content: this.content })
      .subscribe({
        next: ({ data }) => {
          if(data?.updateArticle?.success){
            this.message = data.updateArticle.message
            this.router.navigate(['/'])
          } else {
            this.message = data?.updateArticle?.message || "Erreur lors de la modification de l'article."
          }
        },
        error: (error) => {
          console.error("Erreur lors de la modification de l'article :", error)
          this.message = 'Une erreur est survenue, veuillez réessayer.'
        },
      })
    
  }

}
