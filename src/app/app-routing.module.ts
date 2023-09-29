import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './authentication/auth.guard';
import { LoginComponent } from './authentication/login/login.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
  // { path: '', component: HomeComponent, canActivate: [AuthGuard] }, // Example of a protected route
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductsComponent },
  {
    path: 'welcome',
    component: WelcomeComponent,
    // canActivate: [AuthGuard],
    children: [
      // { path: 'child1', component: Child1Component },
      // { path: 'child2', component: Child2Component },
    ]
  },
  { path: 'error-page', component: ErrorPageComponent },

  { path: '**', redirectTo: '/error-page', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
