import {Component, Inject, OnInit} from '@angular/core';
import {PopupService} from "../../services/popup.service";
import {CategoryService} from "../../services/category.service";
import {CategoriesResponseType} from "../../../../types/categories-response.type";
import {CategoriesNameUtil} from "../../utils/categories-name.util";
import {FormBuilder, Validators} from "@angular/forms";
import {PopupType} from "../../../../types/popup.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PopupDataType} from "../../../../types/popupData.type";

@Component({
  selector: 'popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  type: string = '';

  popupTitle: string = '';
  buttonName: string = '';
  serviceName: string = '';
  error: boolean = false;
  isSuccess: boolean = false;
  popupType: PopupType = PopupType.order;

  popupForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(/^(?:[А-ЯЁ][а-яё]+(?: [А-ЯЁ][а-яё]+)*)?$/)]],
    phone: ['', [Validators.required, Validators.pattern(/^(8|\+7)?(\(?\d{3}\)?)?[\d ]{7}$/)]],
    service: [''],
  });

  categories: CategoriesResponseType[] = [];

  get nameValidation(): boolean | undefined {
    return this.popupForm.get('name')?.invalid
      && (this.popupForm.get('name')?.dirty || this.popupForm.get('name')?.touched)
  }

  get phoneValidation(): boolean | undefined {
    return this.popupForm.get('phone')?.invalid
      && (this.popupForm.get('phone')?.dirty || this.popupForm.get('phone')?.touched)
  }

  constructor(private popupService: PopupService,
              private fb: FormBuilder,
              private categoriesService: CategoryService,
              @Inject(MAT_DIALOG_DATA) private data: PopupDataType,
              private dialogRef: MatDialogRef<PopupComponent>) {
    this.popupTitle = this.data.popupTitle;
    this.buttonName = this.data.buttonName;
    this.popupType = this.data.type;
    if (this.data.serviceName) {
      this.serviceName = this.data.serviceName;
    }
    // console.log(this.popupTitle, this.buttonName, this.popupType, this.serviceName);
  }

  ngOnInit(): void {
    this.categoriesService.getCategories()
      .subscribe((data: CategoriesResponseType[]) => {
        this.categories = (data as CategoriesResponseType[]).map(item => {
          const result = CategoriesNameUtil.getCategoriesName(item.name);
          item.nameForClients = result.nameForClients;
          return item;
        });
        if (this.popupType === PopupType.order) {
          this.popupForm.get('service')?.setValue(this.serviceName, {onlySelf: true});
        }
      });
  }

  close() {
    this.dialogRef.close();
  }

  uploadVersion() {
    this.isSuccess = true;
  }

  sendRequest() {
    if (this.popupForm.valid && this.popupForm.value.name && this.popupForm.value.phone && this.popupType) {

      console.log(this.popupForm.value);

      let payload: {name: string, phone: string, type: PopupType, service?: string} = {
        name: this.popupForm.value.name,
        phone: this.popupForm.value.phone,
        type: this.popupType
      }

      if (this.popupType === PopupType.order && this.popupForm.value.service) {
        payload = { ...payload, service: this.popupForm.value.service }
      }

      this.popupService.setRequest(payload)
        .subscribe((data: DefaultResponseType) => {

          if ((data as DefaultResponseType).error) {
            // console.log(data);
            this.error = true;
            throw new Error((data as DefaultResponseType).message);
          }

          // console.log(data);
          this.uploadVersion();
        });
    }
  }

}
