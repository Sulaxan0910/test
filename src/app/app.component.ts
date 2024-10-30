import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ImageCarouselComponent } from './image-carousel/image-carousel.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ImageCarouselComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'test';
}
