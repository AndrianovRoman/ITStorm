import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {DefaultResponseType} from "../../../types/default-response.type";
import {CommentActionType} from "../../../types/comment-action.type";
import {CommentParamsType} from "../../../types/comment-params.type";
import {CommentsType} from "../../../types/comments.type";
import {ActionEnum} from "../../../enums/action.enum";

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) { }

  // Вывод комментариев у статьи
  getComments(params: CommentParamsType): Observable<CommentsType> {
    return this.http.get<CommentsType>(environment.api + 'comments', { params });
  }

  // Добавление комментариев
  addComments(text: string, article: string): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.api + 'comments', {
      text, article
    });
  }

  // Добавление like dislike violate для комментария
  applyAction(urlComment: string, action: ActionEnum): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.api + "comments/" + urlComment + "/apply-action", {
      action
    });
  }

  // Запрос на получение действий пользователя для комментария
  getActionForComment(urlComment: string): Observable<CommentActionType[] | DefaultResponseType> {
    return this.http.get<CommentActionType[] | DefaultResponseType>(environment.api + "comments/" + urlComment + "/actions");
  }

  // Запрос на получение действий пользователя для всех комментариев в рамках одной статьи
  getArticleCommentActionsForUser(urlArticle: string): Observable<CommentActionType[] | DefaultResponseType> {
    return this.http.get<CommentActionType[] | DefaultResponseType>(environment.api + "comments/article-comment-actions");
    // urlArticle передаем в queryParams
  }

}
