import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentArticleGQL, GetArticleGQL, GetArticleQuery } from 'src/app/generated/graphql';

@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.scss'],
})
export class DetailPostComponent implements OnInit {
  article: GetArticleQuery['getArticle'] | null = null;
  content: string = '';
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private getArticleGQL: GetArticleGQL,
    private commentArticleGQL : CommentArticleGQL,
  ) {}

  ngOnInit(): void {
    const articleId = this.route.snapshot.paramMap.get('id');
    if (articleId) {
      this.getArticleGQL.fetch({ id: articleId }).subscribe(({ data }) => {
        this.article = data.getArticle;
      });
    }
  }

  publishComment(id : string) {
    if (!this.content.trim()) {
      this.errorMessage = "Veuillez écrire quelque chose";
      return;
    }
    
    this.commentArticleGQL.mutate({ articleId: id, content: this.content }).subscribe(({ data }) => {
        if (data?.commentArticle?.success) {
          console.log('Commentaire ajouté avec succès :', data.commentArticle.comment);
          this.content = ''; 
          this.errorMessage = '';
        } else {
          this.errorMessage = "Erreur : " + (data?.commentArticle?.message || "Impossible d'ajouter le commentaire");
        }
      }, error => {
        console.error("Erreur GraphQL :", error);
        this.errorMessage = "Une erreur est survenue, veuillez réessayer.";
      });
  }

  updateContent(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.content = target.value;
  }

}
