import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor() { }

  helloWorld() {
      console.log('Hello World Upload service');
  }
}
