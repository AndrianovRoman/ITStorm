import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../core/auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {UserInfoResponseType} from "../../../../types/userInfo-response.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import * as url from "url";
import {share} from "rxjs";
import {LoaderService} from "../../services/loader.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogged: boolean = false;
  userinfo: UserInfoResponseType | null = null;
  activeFragment: any;

  constructor(private authService: AuthService,
              private _snackBar: MatSnackBar,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.isLogged = this.authService.getIsLoggedIn();
    this.getUserInfo();
    this.activeFragment = this.activatedRoute.fragment.pipe(share());
  }

  ngOnInit(): void {
    this.authService.isLogged$.subscribe((isLoggedIn: boolean) => {
      this.isLogged = isLoggedIn;
      this.getUserInfo();
    });
  }

  getUserInfo() {
    if(this.isLogged) {
      this.authService.getUserInfo()
        .subscribe((data: DefaultResponseType | UserInfoResponseType) => {
          if ((data as DefaultResponseType).error !== undefined) {
            throw new Error((data as DefaultResponseType).message);
          }
          this.userinfo = (data as UserInfoResponseType);
        })
    }
  }

  logout(): void {
    this.authService.logout()
      .subscribe({
        next: () => {
          this.doLogout();
        },
        error: () => {
          this.doLogout();
        }
      });
  }

  doLogout(): void {
    this.authService.removeTokens();
    this.authService.userId = null;
    this._snackBar.open('Вы вышли из системы');
    this.router.navigate(['/']);
  }

}
