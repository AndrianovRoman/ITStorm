import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {CategoriesResponseType} from "../../../types/categories-response.type";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<CategoriesResponseType[]> {
    return this.http.get<CategoriesResponseType[]>(environment.api + 'categories');
  }
}
