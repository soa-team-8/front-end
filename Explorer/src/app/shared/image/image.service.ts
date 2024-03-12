import { Injectable } from '@angular/core';
import { environment } from 'src/env/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }

  getImageUrl(imageName: string): string {
    return `http://localhost:3000/images/${imageName}`;
  }
}
