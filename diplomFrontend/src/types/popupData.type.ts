import {PopupType} from "./popup.type";

export type PopupDataType = {
  type: PopupType,
  popupTitle: string,
  buttonName: string,
  serviceName?: string
}
