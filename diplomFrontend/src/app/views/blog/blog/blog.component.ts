import {Component, OnInit} from '@angular/core';
import {ArticleService} from "../../../shared/services/article.service";
import {ArticlesResponseType} from "../../../../types/articles-response.type";
import {ActiveParamsType} from "../../../../types/active-params.type";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ActiveParamsUtil} from "../../../shared/utils/active-params.util";
import {CategoryService} from "../../../shared/services/category.service";
import {CategoriesResponseType} from "../../../../types/categories-response.type";
import {AppliedFilterType} from "../../../../types/applied-filter.type";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  articles: ArticlesResponseType | null = null;
  activeParams: ActiveParamsType = {categories: []};
  appliedFilters: AppliedFilterType[] = [];
  pages: number[] = [];
  categories: CategoriesResponseType[] = [];

  constructor(private articleService: ArticleService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.processBlog();
  }

  processBlog() {

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.categoryService.getCategories().subscribe((categories: CategoriesResponseType[]) => {
        this.activeParams = ActiveParamsUtil.processParams(params);
        this.categories = categories;

        this.appliedFilters = [];
        this.activeParams.categories.forEach(item => {
          // console.log(item);
          const foundCategory = this.categories.find(category => category.url === item);
          if (foundCategory) {
            this.appliedFilters.push({
              name: foundCategory.name,
              urlParam: foundCategory.url
            });
          }
        });

        this.articleService.getArticles(this.activeParams)
          .subscribe((data: ArticlesResponseType) => {
            this.articles = data;
            this.pages = [];
            for (let i = 1; i <= data.pages; i++) {
              this.pages.push(i);
            }
          });
      });
    });
  }

  clear() {
    this.activeParams.categories = [];

    this.router.navigate(['/articles'], {
      queryParams: this.activeParams
    });
  }

  addCategory(url: string) {
    if (this.activeParams.categories.some(category => category === url)) {
      return this.deleteActions(url);
    }

    this.activeParams.categories.push(url);

    this.activeParams.page = 1;
    this.router.navigate(['/articles'], {
      queryParams: this.activeParams
    });
  }

  deleteActions(url: string) {
    this.activeParams.categories = this.activeParams.categories.filter(item => item !== url);

    this.activeParams.page = 1;
    this.router.navigate(['/articles'], {
      queryParams: this.activeParams
    });
  }

  openPage(page: number) {
    this.activeParams.page = page;

    this.router.navigate(['/articles'], {
      queryParams: this.activeParams
    });
  }

  openPrevPage() {
    if (this.activeParams.page && this.activeParams.page > 1) {
      this.activeParams.page--;

      this.router.navigate(['/articles'], {
        queryParams: this.activeParams
      });
    }
  }

  openNextPage() {
    if (this.activeParams.page === undefined) {
      this.activeParams.page = 2;
      this.router.navigate(['/articles'], {
        queryParams: this.activeParams
      });
      return;
    }
    if (this.activeParams.page && this.activeParams.page < this.pages.length) {
      this.activeParams.page++;

      this.router.navigate(['/articles'], {
        queryParams: this.activeParams
      });
    }
  }
}
