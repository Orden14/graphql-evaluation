import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { GetArticlesGQL, GetArticlesQuery, DeleteArticleGQL } from 'src/app/generated/graphql';
import { AuthServiceService } from 'src/app/services/auth-service/auth-service.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit {
  articles: GetArticlesQuery['getArticles'] = [];
  filteredArticles: GetArticlesQuery['getArticles'] = [];
  searchTerm: string = '';
  sortOrder: string = 'none';

  constructor(
    private getArticlesGQL: GetArticlesGQL,
    private deleteArticleGQL: DeleteArticleGQL,
    private router: Router,
    private authService: AuthServiceService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getArticlesGQL.fetch().subscribe(({ data }) => {
      this.articles = data.getArticles ?? [];
      this.filteredArticles = [...this.articles];
    });
  }

  filterArticles(): void {
    this.filteredArticles = this.articles!.filter(article =>
      article!.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.sortArticles();
  }

  sortArticles(): void {
    this.filteredArticles = [...this.filteredArticles!].sort((a, b) => {
      const likesA = a?.likes?.length || 0;
      const likesB = b?.likes?.length || 0;
      return this.sortOrder === 'asc' ? likesA - likesB : likesB - likesA;
    });
  }

  viewDetails(id: string): void {
    if (this.isUserLoggedIn()) {
      this.router.navigate(['/post', id]);
    } else {
      this.toastService.error('Vous devez être connecté pour accéder à cette page');
    }
  }

  isUserLoggedIn(): boolean {
    return this.authService.isUserLoggedIn();
  }

  getUserName(): string {
    return sessionStorage.getItem('username') || '';
  }

  deletePost(id: string): void {
    this.deleteArticleGQL.mutate({ id: id }).subscribe({
      next: ({ data }) => {
        if (data?.deleteArticle?.success) {
          window.location.reload();
        }
      },
      error: (error) => {
        console.error("Erreur lors de la suppression de l'article :", error);
        this.toastService.error('Une erreur est survenue, veuillez réessayer.');
      },
    });
  }

  editArticle(id: string): void {
    this.router.navigate(['/editPost', id]);
  }
}