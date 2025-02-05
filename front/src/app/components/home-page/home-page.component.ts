import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetArticlesGQL, GetArticlesQuery } from 'src/app/generated/graphql';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit{

  articles: GetArticlesQuery['getArticles'] = [];
  
  constructor(
    private getArticlesGQL: GetArticlesGQL,
    private router : Router,
  ) {}

  ngOnInit(): void {
    this.getArticlesGQL.fetch().subscribe(({ data }) => {
      this.articles = data.getArticles ?? [];
    });
  }

  viewDetails(id : string) : void{
    this.router.navigate(['/post', id]);
  }

}
