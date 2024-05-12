import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: '',
    loadChildren: () =>
      import('./layout/layout-default/layout-default.module').then(
        (data) => data.LayoutDefaultModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./layout/layout-private/layout-private.module').then(
        (data) => data.LayoutPrivateModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
