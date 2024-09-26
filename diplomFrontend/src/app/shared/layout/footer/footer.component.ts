import { Component, OnInit } from '@angular/core';
import {PopupService} from "../../services/popup.service";
import {PopupType} from "../../../../types/popup.type";
import {PopupComponent} from "../../components/popup/popup.component";
import {MatDialog} from "@angular/material/dialog";
import {PopupDataType} from "../../../../types/popupData.type";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  type: PopupType = PopupType.consultation;
  popupTitle: string = 'Закажите бесплатную консультацию!';
  buttonName: string = 'Заказать консультацию';

  constructor(private popupService: PopupService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openPopup(type: PopupType, popupTitle: string, buttonName: string) {
    const data: PopupDataType = { type, popupTitle, buttonName };
    this.dialog.open(PopupComponent, { data })
  }

}
