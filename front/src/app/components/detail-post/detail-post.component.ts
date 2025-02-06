import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentArticleGQL, GetArticleGQL, GetArticleQuery, LikeArticleGQL, RemoveLikeGQL } from 'src/app/generated/graphql';

@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.scss'],
})
export class DetailPostComponent implements OnInit {
  article: GetArticleQuery['getArticle'] | null = null;
  content: string = '';
  errorMessage: string = '';
  message : string = ''; 
  isLiked : boolean = false;

  constructor(
    private route: ActivatedRoute,
    private getArticleGQL: GetArticleGQL,
    private commentArticleGQL : CommentArticleGQL,
    private removeLikeGQL : RemoveLikeGQL,
    private likeArticleGQL : LikeArticleGQL,
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
          this.message = "Commentaire ajouté avec succès"
          this.content = ''; 
          this.errorMessage = '';
          setTimeout(()=>{
            window.location.reload();
          }, 200);
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

  like(id : string) : void {
    this.likeArticleGQL.mutate({ id: id }).subscribe(({ data }) => {
      if(data?.likeArticle?.success){
        this.isLiked = true;
        setTimeout(()=>{
          window.location.reload();
        }, 200);
      } else {
        this.errorMessage = "Erreur : " + (data?.likeArticle?.message || "Impossible de liker l'article");
      }
    });
  }

  removeLike (id : string) : void {
    this.removeLikeGQL.mutate({ id: id }).subscribe(({ data }) => {
      if(data?.removeLike?.success){
        this.isLiked = false;
        setTimeout(()=>{
          window.location.reload();
        }, 200);
      } else {
        this.errorMessage = "Erreur : " + (data?.removeLike?.message || "Impossible de retirer le like de l'article");
      }
    });
  }

}
