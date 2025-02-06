import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleEditFormComponent } from './article-edit-form.component';

describe('ArticleEditFormComponent', () => {
  let component: ArticleEditFormComponent;
  let fixture: ComponentFixture<ArticleEditFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleEditFormComponent]
    });
    fixture = TestBed.createComponent(ArticleEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
