import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './authentication/login/login.component';
import { AuthService } from './authentication/auth.service';
import { ApiService } from './services/api.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { AuthInterceptor } from './interceptors/auth/auth.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductsFilterComponent } from './components/products/products-filter/products-filter.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ProductCardComponent } from './components/products/product-card/product-card.component';
import { FooterComponent } from './shared/footer/footer.component';
import { CartComponent } from './components/cart/cart.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { ProductDetailComponent } from './components/products/product-detail/product-detail.component';
import { AboutComponent } from './components/about/about.component';
import { FaqComponent } from './components/faq/faq.component';
import { ContactComponent } from './components/contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    ErrorPageComponent,
    ProductsComponent,
    ProductsFilterComponent,
    CarouselComponent,
    ProductCardComponent,
    FooterComponent,
    CartComponent,
    LayoutComponent,
    SignupComponent,
    ProductDetailComponent,
    AboutComponent,
    FaqComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [AuthService, ApiService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
