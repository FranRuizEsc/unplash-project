import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthInterceptor } from './services/auth.interceptor';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'unplash-project';
}
