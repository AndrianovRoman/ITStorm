import {Component, Input, OnInit} from '@angular/core';
import {RelatedArticleType} from "../../../../types/related-article.type";

@Component({
  selector: 'article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.css']
})
export class ArticleCardComponent implements OnInit {

  @Input() popular!: RelatedArticleType;

  constructor() { }

  ngOnInit(): void {
  }

}
