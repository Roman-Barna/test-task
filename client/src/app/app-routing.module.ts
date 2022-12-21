import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TelephoneDirectoryComponent } from './modules/telephone-directory/components/telephone-directory/telephone-directory.component';

const routes: Routes = [
  {path: '', component: TelephoneDirectoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
