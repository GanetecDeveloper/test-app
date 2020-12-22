import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // { path: 'test',
  //   loadChildren: () => import('./modules/test/test.module').then(m => m.TestModule) },
  // { path: 'emp', loadChildren: () => import('./modules/emp/emp.module').then(m => m.EmpModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
