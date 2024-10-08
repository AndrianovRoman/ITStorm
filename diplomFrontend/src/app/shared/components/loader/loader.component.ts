import { Component, OnInit } from '@angular/core';
import {LoaderService} from "../../services/loader.service";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  constructor(private loader: LoaderService) { }
  isShowed: boolean = false;

  ngOnInit(): void {
    this.loader.isShowed$.subscribe((isShowed: boolean) => {
      this.isShowed = isShowed;
    })
  }

}
