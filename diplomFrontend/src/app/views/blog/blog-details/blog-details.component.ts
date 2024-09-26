import {Component, OnChanges, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ArticleService} from "../../../shared/services/article.service";
import {ArticleType} from "../../../../types/article.type";
import {AuthService} from "../../../core/auth/auth.service";
import {CommentType} from "../../../../types/comment.type";
import {CommentsService} from "../../../shared/services/comments.service";
import {CommentActionType} from "../../../../types/comment-action.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {FormBuilder, Validators} from "@angular/forms";
import {CommentParamsType} from "../../../../types/comment-params.type";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RelatedArticleType} from "../../../../types/related-article.type";
import {CommentsType} from "../../../../types/comments.type";
import {ActionEnum} from "../../../../enums/action.enum";
import {LoaderService} from "../../../shared/services/loader.service";

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {

  params: CommentParamsType | null = null;
  article!: ArticleType;
  relatedArticles: RelatedArticleType[] = [];
  isLogged: boolean = false;
  comments!: CommentType[];
  commentsCount: number | null = null;
  commentForm = this.fb.group({
    text: ['', Validators.required]
  });
  urlParams!: string;

  action: typeof ActionEnum = ActionEnum;

  constructor(private router: Router,
              private fb: FormBuilder,
              private articleService: ArticleService,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private loader: LoaderService,
              private _snackBar: MatSnackBar,
              private commentsService: CommentsService) {
    this.isLogged = this.authService.getIsLoggedIn();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.urlParams = params['url'];
      this.params = null;
      this.processPage();
    });
    this.articleService.getRelatedArticle(this.urlParams)
      .subscribe((data: RelatedArticleType[]) => {
        this.relatedArticles = data;
      })
  }

  processPage() {
    this.articleService.getArticle(this.urlParams)
      .subscribe((data: ArticleType) => {
        this.article = data;
        this.comments = this.article.comments;
        this.commentsCount = this.article.commentsCount;
        this.processCommentsAction();
      });
  }

  addComment() {
    if (this.commentForm.valid && this.commentForm.value.text) {
      this.commentsService.addComments(this.commentForm.value.text, this.article.id)
        .subscribe((data: DefaultResponseType) => {
          // console.log(data);
          if (data.error) {
            // console.log(data.message)
          } else {
            this.commentForm.reset();
            this.processPage();
          }
        });
    }
  }

  addAction(comment: CommentType, action: ActionEnum) {
    this.commentsService.applyAction(comment.id, action)
      .subscribe({
        next: (data) => {
          if (action === this.action.violet) {
            this._snackBar.open('Жалоба отправлена');
          } else {
            this._snackBar.open('Ваш голос учтен');

            if (action === this.action.like) {
              if (comment.dislike) {
                comment.dislikesCount--;
                comment.dislike = false;
              }
              if (comment.like) {
                comment.likesCount--;
                comment.like = false;
                return;
              }
              comment.likesCount++;
              comment.like = true;
            }

            if (action === this.action.dislike) {
              if (comment.like) {
                comment.likesCount--;
                comment.like = false;
              }
              if (comment.dislike) {
                comment.dislikesCount--;
                comment.dislike = false;
                return;
              }
              comment.dislikesCount++;
              comment.dislike = true;
            }
          }
          // this.processCommentsAction();
        },
        error: (data) => {
          if(!this.isLogged) {
            this._snackBar.open('Чтобы поставить реакцию или пожаловаться, надо авторизоваться!');
          } else if (action === this.action.violet && data.error) {
            this._snackBar.open('Жалоба уже отправлена');
          }
        }
      });
  }

  addMoreComments() {
      console.log('start add comments');
      console.log(this.params?.offset);

      this.loader.show();

      if (this.params === null) {
        this.params = {
          offset: 3,
          article: this.article.id,
        };
      } else {
        this.params = {
          offset: this.params!.offset + 10,
          article: this.article.id,
        };
      }
      this.loadComments();
  }

  loadComments() {
    console.log('start load comments');
    console.log(this.params?.offset);
    console.log(this.comments);

    this.commentsService.getComments(this.params!)
      .subscribe(data => {
        if (data as CommentsType) {
          for (let i = 0; i < data.comments.length; i++) {
            this.comments.push(data.comments[i]);
          }
          console.log(this.comments);
        }
        this.processCommentsAction();
        this.loader.hide();
      });
  }

  processCommentsAction() {
    if (this.isLogged) {
      for (let i = 0; i < this.comments.length; i++) {
        this.commentsService.getActionForComment(this.comments[i].id)
          .subscribe((data: CommentActionType[] | DefaultResponseType) => {
            if ((data as DefaultResponseType).error !== undefined) {
              const error = (data as DefaultResponseType).message;
              throw new Error(error);
            }
            const result = data as CommentActionType[];
            const actionLikeOnComment = result.find(item => item.action === "like");
            const actionDislikeOnComment = result.find(item => item.action === "dislike");

            if (actionLikeOnComment) {
              this.comments[i].like = true;
              this.comments[i].dislike = false
            }
            if (actionDislikeOnComment) {
              this.comments[i].dislike = true;
              this.comments[i].like = false;
            }
          })
      }
    }
  }

}
