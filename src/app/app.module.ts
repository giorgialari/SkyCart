import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './authentication/login/login.component';
import { AuthService } from './authentication/auth.service';
import { ApiService } from './services/api.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AuthInterceptor } from './interceptors/auth/auth.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductsFilterComponent } from './components/products/products-filter/products-filter.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ProductCardComponent } from './components/products/product-card/product-card.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    WelcomeComponent,
    ErrorPageComponent,
    ProductsComponent,
    ProductsFilterComponent,
    CarouselComponent,
    ProductCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [AuthService, ApiService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
