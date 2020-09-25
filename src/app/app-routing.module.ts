import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponentComponent } from './product-component/product-component.component';

const routes: Routes = [
  { path: 'product', component: ProductComponentComponent},
  { path: '', redirectTo: '/product', pathMatch: 'full'},
  { path: '**', component: ProductComponentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
