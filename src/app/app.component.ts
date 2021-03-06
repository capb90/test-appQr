import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {QrScannerComponent} from 'angular2-qrscanner';
import { Router } from '@angular/router';
import {ConfirmationService} from 'primeng/api';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
 
})
export class AppComponent implements OnInit {
    
    @ViewChild(QrScannerComponent,{static:false}) qrScannerComponent!: QrScannerComponent ;
  
  
    constructor() {}
  
    ngOnInit() {
      
  }
  
    ngAfterViewInit(): void {
      this.qrScannerComponent.getMediaDevices().then(devices => {
          const videoDevices: MediaDeviceInfo[] = [];
          for (const device of devices) {
              if (device.kind.toString() === 'videoinput') {
                  videoDevices.push(device);
              }
          }
          if (videoDevices.length > 0){
              let choosenDev;
              for (const dev of videoDevices){
                  if (dev.label.includes('front')){
                      choosenDev = dev;
                      break;
                  }
              }
              if (choosenDev) {
                  this.qrScannerComponent.chooseCamera.next(choosenDev);
              } else {
                  this.qrScannerComponent.chooseCamera.next(videoDevices[1]);
              }
          }
      });
  
      this.qrScannerComponent.capturedQr.subscribe(dataQR => {
       
       window.location.href=dataQR
      });
     
       
    }
  
  
}
