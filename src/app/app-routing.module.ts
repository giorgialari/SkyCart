import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './authentication/auth.guard';
import { LoginComponent } from './authentication/login/login.component';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { ProductDetailComponent } from './components/products/product-detail/product-detail.component';
import { AboutComponent } from './components/about/about.component';
import { FaqComponent } from './components/faq/faq.component';
import { ContactComponent } from './components/contact/contact.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,

    children: [
      { path: '', redirectTo: '/products', pathMatch: 'full' },
      { path: 'products', component: ProductsComponent },
      { path: 'about', component: AboutComponent },
      { path: 'faq', component: FaqComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
      { path: 'details/:id', component: ProductDetailComponent },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'error-page', component: ErrorPageComponent },
  { path: '**', redirectTo: '/error-page', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
