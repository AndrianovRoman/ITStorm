import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {ArticleService} from "../../services/article.service";
import {Router} from "@angular/router";
import {CategoriesResponseType} from "../../../../types/categories-response.type";
import {ArticlesResponseType} from "../../../../types/articles-response.type";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  articles: ArticlesResponseType | null = null;
  filterOpen: boolean = false;

  @Input() categories: CategoriesResponseType[] = [];
  @Input() activeCategories: string[] = [];
  @Output() changeCategory = new EventEmitter();

  constructor(private articleService: ArticleService,
              private router: Router,
              private elementRef: ElementRef) {  }

  ngOnInit(): void {

  }

  @HostListener('document:click', ['$event'])
  outsideClick(event: any) {
    const target = event.target;
    const elem = this.elementRef.nativeElement;
    if (!elem.contains(target)) {
      this.filterOpen = false;
    }
  }

  addCategory(url: string) {
    this.changeCategory.emit(url);
    console.log(this.changeCategory);
  }

  toggleFilter() {
    this.filterOpen = !this.filterOpen;
  }

  getOptionActive(activeUrl: string) {
    return this.activeCategories.some(category => category === activeUrl);
  }
}
