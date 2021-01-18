import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CoreImportsModule } from '../modules/core-imports.module';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent
  ],
  imports: [
    CoreImportsModule,
    RouterModule,
  ],
  exports: [
    HomeComponent,
    LoginComponent
  ],
})

export class ComponentsModule {
  constructor(@Optional() @SkipSelf() parentModule?: ComponentsModule) {
    if (parentModule) {
      throw new Error('ComponentsModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(env: any): ModuleWithProviders<ComponentsModule> {
    return {
      ngModule: ComponentsModule,
      providers: [
        {provide: 'env', useValue: env },
      ]
    };
  }
}
