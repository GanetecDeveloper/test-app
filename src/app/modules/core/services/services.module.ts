import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { LoaderService } from './loader.service';
import { CommonService } from './common.service';
import { AppConfigService } from './app-config.service';

@NgModule({
  providers: [
    LoaderService,
    CommonService,
    AppConfigService,
  ]
})

export class ServicesModule {
  // constructor(@Optional() @SkipSelf() parentModule?: ServicesModule) {
  //   if (parentModule) {
  //     throw new Error('ServicesModule is already loaded. Import it in the AppModule only');
  //   }
  // }

  static forRoot(env: any): ModuleWithProviders<ServicesModule> {
    return {
      ngModule: ServicesModule,
      providers: [
        LoaderService,
        CommonService
      ]
    };
  }
}
