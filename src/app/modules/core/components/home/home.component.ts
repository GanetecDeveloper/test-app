import { ChangeDetectorRef, Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { NavItem } from '../../models/nav-item';
import { CommonService } from '../../services/common.service';
import { AppConfigService } from '../../services/app-config.service';
import { Router, NavigationEnd, RoutesRecognized } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';
import { SecurityService } from '../../services/security.service';
import { MatSidenav } from '@angular/material/sidenav';

/** Componente principal de la aplicación. */
@Component({
  selector: 'lib-ng-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('snav') public sidenav: MatSidenav;
  mobileQuery: MediaQueryList;
  menu: NavItem [];
  config = AppConfigService.settings.modulesConfig.testDeEmpleabilidad;
  app = AppConfigService.settings.app;
  actualPage = 'Inicio / Core';

  private mobileQueryListener: () => void;

  constructor(
    private commonService: CommonService,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private router: Router,
    private titleService: Title,
    private securityService: SecurityService
  ) { }

  ngOnInit() {
    this.commonService.getNavigationItems().subscribe( res => this.menu = res );
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)'); // TODO: sacar a config
    this.mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', () => this.mobileQueryListener);
    // this.setRoutes();
    // this.loaderService.show();
    // setTimeout(
    //   () => this.loaderService.hide(), 1000
    // );
  }

  setRoutes() {
    let params;
    let param;
    this.router.events.subscribe(val => {
      try {
        if (val instanceof RoutesRecognized && val.state.root.firstChild) {
          const state = val.state.root.firstChild['_routerState'];
          console.log("state: ", state);
          if(state['_root'].children[0].children[0]) {
            params = state['_root'].children[0].children[0].value.params;
            console.log("PARAMS: ", params);
          }
        }
      } catch(err) {
          console.log('Error setRoutes() => ' + err);
      }
    });
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        for(const prop in params) {
          if(prop) {
            param = params[prop];
          }
        }
        let url = event['url'];
        const optionalParams = url.split('?')[1];
        if(optionalParams) url = url.replace('?' + optionalParams, '');
        if(param) url = url.replace(param, '*');
        this.actualPage = AppConfigService.settings.app.routes[url];
        if(!this.actualPage) {
          this.actualPage = '';
        }
        if(AppConfigService.settings.app.name) {
          this.titleService.setTitle(this.actualPage + ' / ' + AppConfigService.settings.app.name);
        } else {
          this.titleService.setTitle(this.actualPage);
        }
      });
  }

  checkProfiles(profiles: string[], multiple): boolean {
    return true; // this.securityService.checkProfiles(profiles, multiple);
  }

  logout() {
    this.securityService.logout().subscribe(
      success => this.closeSidenav,
      error => console.log(error)
    );
    this.securityService.security = null; //TODO
    this.router.navigate(['/login']);
  }

  isLogged() {
    return this.securityService.isValidSession();
  }

  closeSidenav(): void {
    this.sidenav.close();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', () => this.mobileQueryListener);
  }
}
