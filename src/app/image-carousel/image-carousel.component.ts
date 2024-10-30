import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-image-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-carousel.component.html',
  styleUrl: './image-carousel.component.scss',
})
export class ImageCarouselComponent {
  images = [
    'https://s3-alpha-sig.figma.com/img/0791/0f7f/188a8f483ded59346fe0fd6d10d14b9a?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ez1ON2kC5wEgBERR9x1P2Dhra4fGzPMvB7Yds47CaJQXBHMylmDFQe9HLh5sB0qODfCpJl4MtfYvT72G4~6M5K4JHI0sExXuBk-4AItQvy1vigto-ZdZjvxKiGYiGjXzFrNji1c7bMEWaIAPjyUUGqW6bsrTfTM0klqxFoh2uxLWi5Kh4p-jrxTtZ7LsjajObA2opHko0xre1WkKHWvqK~CecuU0MqF7b4xqv0o~nLbprfc9cTjnxXaRWUA0xV0FJOzIOy28~65LIhywD6Pc06SOmVeRjs3IEVDCWV~T4ZVseTuimSksd7U4JBQW9DS~POfU7sRmmw9OJeSRrdgA5A__',
    'https://s3-alpha-sig.figma.com/img/8f78/f545/2c06cf20973a3a45f5be4b527cd28d57?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=f~~GR3ASGpQstI-~tM3YzqM5AInZ~I3pSpm3BkkqgwSDcE7BvPb7x8-cqJGcfQocKzm7xtu9Rq-fwqIHj0PH~cM~vRMFcUJQDMn9qn8tYxAe0aHQJIQokDoTTJmB8WpKiSKHyjVnER6vp7OMvqTK-EES8Eb7~BgM0T8j7QoVS9WCyjeF5nqN4rL3OHRQj9y1KhxBcgzFd48l4uk9J8mbYjMtnP4f4MPQXOnv4~p77VpRZc0Dac7ybDVXViLueh7oAMAWe9tVAbHxcCSRN1KIDsyaJP5LBX5s2pRV5zRJUxh4SFXlkeaU0j7~8upnG71jQYe27SeMA42a6JQDHysX0A__',
    'https://s3-alpha-sig.figma.com/img/340f/ac90/fd6dfbaeba51d1e63c2f7abcbe67478b?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VanUTpBqQiIMalw8MftpBa2PLI02KCHM2dRNRx6POhIbpJUEiawpmb0kzg1zsiGajz8PkSdpkhuoQ6TiDJPfD4~iX4ansBM8z4aG5s9Vu5RubuPs1OigBcxsTywtlUC3MHoOtLqQSowVdWeCZ5bd1J3Nd3iP~Otf7XyKYe7T8cGGdakL1GtG0c7vmkEEZsE1wwCqRX4sLwUMqpwzcfnVtqwJQByFbc7cdp9BhYc6wBBANf9VYZb8kvld1Ln9UgsZ7mfxlLgxidngU8bDlLAIcGxdPumMkw03NY-gv7-pQQidrDmSBBC-7oaM4Bl8kk~tfOqzylibWJvpT92d7tRnkg__',
  ];
  centeredIndex = 0;
  isDragging = false;
  startX: number = 0;

  startDrag(event: MouseEvent) {
    this.isDragging = true;
    this.startX = event.clientX;
  }

  endDrag() {
    this.isDragging = false;
  }

  onDrag(event: MouseEvent) {
    if (!this.isDragging) return;

    const deltaX = event.clientX - this.startX;
    if (deltaX > 100) {
      // Dragged right
      this.centeredIndex =
        (this.centeredIndex - 1 + this.images.length) % this.images.length;
      this.startX = event.clientX; // Reset startX for the next drag
    } else if (deltaX < -100) {
      // Dragged left
      this.centeredIndex = (this.centeredIndex + 1) % this.images.length;
      this.startX = event.clientX; // Reset startX for the next drag
    }
  }

  getImageTransform(index: number): string {
    const angle = 10; // Rotation angle
    const distance = 100; // Distance to translate

    if (index === this.centeredIndex) {
      return 'translateZ(0) rotate(0deg)';
    } else if (
      index ===
      (this.centeredIndex - 1 + this.images.length) % this.images.length
    ) {
      return `translateZ(-${distance}px) rotate(-${angle}deg)`;
    } else if (index === (this.centeredIndex + 1) % this.images.length) {
      return `translateZ(-${distance}px) rotate(${angle}deg)`;
    }
    return `translateZ(-200px) rotate(0deg)`;
  }
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupAnimation();
    }
  }
  rotateVal = 0;
  intervalId: any;
  i = 0;
  dsx = 0;
  dsy = 0;
  dex = 0;
  dey = 0;
  dragstart(event: any) {
    this.dsx = event.clientX;
    this.dsy = event.clientY;
  }
  dragend(event: any) {
    if (event.clientX - this.dsx < 0) this.rotateimageBasedonDrag(0);
    else this.rotateimageBasedonDrag(1);
  }
  rotateimageBasedonDrag(direction: number) {
    if (direction) {
      this.rotateVal += 45; // `${++this.i * 45}deg`;
    } else {
      this.rotateVal -= 45; // `-${--this.i * 45}deg`;
    }
  }

  rotateimage(event: any) {
    // console.log(this.rotateVal);
    console.log(event);
    this.rotateVal = 45; //`${++this.i * 45}deg`;
  }
  setupAnimation() {
    this.intervalId = setInterval(() => {
      // this.rotateVal = `${++this.i * 45}deg`;
    }, 2000);
  }
}
