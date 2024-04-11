import { ɵSERVER_CONTEXT as SERVER_CONTEXT } from '@angular/platform-server';
import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  PLATFORM_ID,
  ViewChild,
  inject,
  AfterViewInit,
  afterRender,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <p #note></p>
    <router-outlet />
  `,
})
export class AppComponent implements AfterViewInit {
  @ViewChild('note') private note?: ElementRef;
  private readonly platformId = inject(PLATFORM_ID);
  private serverContext = inject(SERVER_CONTEXT, { optional: true });

  constructor() {
    afterRender(() => {
      if (
        this.note &&
        !document.querySelector<HTMLParagraphElement>('app-root p')?.innerText
      ) {
        this.note.nativeElement.innerText = 'CSR Rendered';
      }
    });
  }

  ngAfterViewInit() {
    if (this.note && !isPlatformBrowser(this.platformId)) {
      this.note.nativeElement.innerText = `${this.serverContext?.toUpperCase()} Rendered`;
    }
  }
}