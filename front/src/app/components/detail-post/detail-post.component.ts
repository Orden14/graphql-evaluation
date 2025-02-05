import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetArticleGQL, GetArticleQuery } from 'src/app/generated/graphql';

@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.scss'],
})
export class DetailPostComponent implements OnInit {
  article: GetArticleQuery['getArticle'] | null = null;

  constructor(
    private route: ActivatedRoute,
    private getArticleGQL: GetArticleGQL
  ) {}

  ngOnInit(): void {
    const articleId = this.route.snapshot.paramMap.get('id');
    if (articleId) {
      this.getArticleGQL.fetch({ id: articleId }).subscribe(({ data }) => {
        this.article = data.getArticle;
      });
    }
  }
}
