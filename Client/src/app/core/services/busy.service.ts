import { Injectable } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})
export class BusyService {
busyRequestCount = 0 ;
constructor(private spinner: NgxSpinnerService) {}
start() {
  /** spinner starts on init */
  this.spinner.show();


}
end(){
  setTimeout(() => {
    /** spinner ends after 5 seconds */
    this.spinner.hide();
  }, 500);
}
}
