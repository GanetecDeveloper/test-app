import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Security } from '../models/security';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject('env') private ENV,
  ) {
    this.EXPIRE_TIME_IN_MILLISECOND = Number(AppConfigService.settings.coreConfig.security.sessionExpireTimeInMinutes) * 60000;
    this.SECURITY_API = this.ENV.APIS.SECURITY;

    this.securitySubject = new BehaviorSubject(this.security);
    this.securityObservable = this.securitySubject.asObservable();
  }

  private CONFIG = AppConfigService.settings;
  private SECURITY_API: string;
  private EXPIRE_TIME_IN_MILLISECOND: number;
  public security: Security;

  private securitySubject;
  private securityObservable: Observable<Security>;

  getSecurity() {
    // if ( !this.security && sessionStorage.getItem('security')) {
    //   this.setSecurity(JSON.parse(sessionStorage.getItem('security')));
    // }
    if ( sessionStorage.getItem('security')) {
      this.setSecurity(JSON.parse(sessionStorage.getItem('security')));
    }
    return this.security;
  }

  login(username: string, pass: string): Observable<any> {

    // AppConfigService.settings.coreConfig.security.ws.loginCredentials.body

    this.addHeaders(AppConfigService.settings.coreConfig.security.ws.loginCredentials.headers);

    return this.http.post( 
      this.SECURITY_API + AppConfigService.settings.coreConfig.security.ws.loginCredentials.path,
      { user: username, password: pass },
      this.addSecurityHeaders({}, 'application/json'));
  }

  /**
   * 
   * cargamos headers de config + headers params + headers security
   * cargamos body de config +  body params
   * 
   * Devuelve un Observable con el token de acceso.
   *
   * @returns Observable con el token de acceso.
   */
  login2(username, password): Observable<any> {
    console.log('GET TOKEN');
    let header = new HttpHeaders()
      .set('Authorization', 'Basic bmctdGVzdDo=')
      .set('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8')
      .set('grant_type', 'username');
    const body = 'grant_type=password&username=' + username + '&password=' + password;
    return this.http.post(
      this.ENV.APIS.SECURITY + AppConfigService.settings.coreConfig.security.ws.loginCredentials.path,
      body, 
      {headers: header});
  }

  loginWithCertificate(): Observable<any> {
    return this.http.get( 
      this.SECURITY_API + AppConfigService.settings.coreConfig.security.ws.loginCertificate.path,
      this.addSecurityHeaders({}, 'application/json'));
  }

  /**
   * Cierra la sesión del usuario limpiando todos los datos.
   * @param returnPath Ruta a la que se redirecciona despues de hacer login. 
   * Si no se especifica se usara la variable de configuración `security.onLoginOkRedirectTo` 
   * en caso de estar activa por el flag `security.onLoginOkRedirect`.
   */
  closeSession(returnPath?: string) {
    this.security = {
      name: '',
      expireTime: 0,
      rol: {},
      token: '',
      isAuth: false,
    };
    this.setSecurity(this.security);
    sessionStorage.clear();
    localStorage.clear();
    // this.navigateTo([AppConfigService.settings.coreConfig.security.ngPaths.login], returnPath);
    const params = returnPath ? { queryParams: { return: returnPath } } : undefined;
    this.router.navigate(['/login'], params);
    return this.security;
  }

  logout(returnPath?: string): Observable<Security> {
    return new Observable((observer) => {
      if( AppConfigService.settings.coreConfig.security.onLogoutCloseAtBack ){
        this.http.get( 
          this.SECURITY_API + AppConfigService.settings.coreConfig.security.ws.logout.path,
          this.addSecurityHeaders({}, 'application/json')
          ).subscribe(()=>{
            observer.next(this.closeSession(returnPath));
            observer.complete();      
          });
      } else {
        observer.next(this.closeSession(returnPath));
        observer.complete();
      }
    });
  }

  /**
   * Devuelve la ruta a la que volver tras ejecutar cierta acción intermedia.
   * Toma como valor el parametro recibido. En caso de no recibir ninguno, toma 
   * el valor de `CONFIG.coreConfig.security.onLoginOkRedirectTo` siempre que el flag 
   * `CONFIG.coreConfig.security.onLoginOkRedirect` este marcado a true. 
   * En caso contrario el valor devuelto es `undefined`.
   * 
   * @param returnPath Ruta opcional a devolver.
   * @return Ruta final obtenida de la forma descrita anteriormente.
   */
  private getBackPath(returnPath?: string): string {
    return (returnPath ? returnPath : (
      this.CONFIG.coreConfig.security.onLoginOkRedirectEnabled ? 
      this.CONFIG.coreConfig.security.onLoginOkRedirectTo : undefined)
    );
  }

  /**
   * Redirecciona a otra ruta pasando como parametro `return` que indica 
   * la url a la que volver tras completar cierta acción.
   * 
   * Por ejemplo, podemos redireccionar a `/login` indicando que despues 
   * de completar el inicio de sesión se nos debe devolver a `/test` siendo 
   * esta la ruta a la que intento acceder en primer lugar el usuario. 
   * 
   * En este caso se intenta acceder a una ruta pero por algun motivo necesario, 
   * como un inicio de sesión, se redirecciona a otro sitio para luego 
   * devolver a la página original.
   * 
   * @param path Ruta a la que se redirecciona primero
   * @param returnPath Ruta a la que se devolvera al usuario, tras terminar cierta 
   * accion en la otra ruta. Esta ruta se obtiene del método `getBackPath(returnPath)` de esta clase.
   */
  navigateTo(path: string[], returnPath?: string): void {
    returnPath = this.getBackPath(returnPath);
    const params = returnPath ? { queryParams: { return: returnPath } } : undefined;
    this.router.navigate(path, params);
  }

  /**
   * 
   * @param activatedRouter 
   */
  navigateToBack(activatedRouter: ActivatedRoute, returnPath?: string): void {
    activatedRouter.queryParams.subscribe(params => returnPath = params.return || this.getBackPath(returnPath) );
    this.router.navigateByUrl(returnPath || '/');
  }

  /**
   * TODO almacenar datos correctos del servicio de login
   * @param sessionData Datos de la session obtenidos del servicio de login.
   */
  saveSession(sessionData: any): Security {
    console.log(' # SECURITY - saveSession:', sessionData);
    if (sessionData) {
      this.security = {
        name: sessionData.name,
        rol: sessionData.rol,
        expireTime: new Date().getTime() + this.EXPIRE_TIME_IN_MILLISECOND,
        token: sessionData.token,
        isAuth: (sessionData && sessionData.token !== ''),
      };
      this.setSecurity(this.security);
      // this.router.navigate(['/']);
      return this.security;
    } else {
      alert('ERROR AL GUARDAR LA SESION');
    }
  }

  isSessionExpired() {
    // console.log('EXPIRE TIME:', expireStorage, now, (expireStorage === 0 || now > expireStorage));
    return ( this.security && (this.security.expireTime === 0 || new Date().getTime() > this.security.expireTime ));
  }

  isValidSession() {
    this.security = this.getSecurity();
    return this.security && this.security.token && this.security.isAuth && !this.isSessionExpired();
  }

  setSecurity(security: Security) {
    this.security = security;
    sessionStorage.setItem('security', JSON.stringify(this.security));
    // console.log('CAMBIA SECURITY OBJECT', this.security);
    this.securitySubject.next(this.security);
  }

  getSecurityObservable(): Observable<Security> {
    return this.securityObservable;
  }

  addSecurityHeaders(httpOptions?: any, mimeType?: string) {
    if (!httpOptions) {
      httpOptions = {};
    }
    if (!httpOptions.headers) {
      httpOptions.headers = {};
    }
    let httpHeaders = new HttpHeaders(httpOptions.headers);
    httpHeaders = httpHeaders
      .set('Access-Control-Allow-Headers',
      'Accept,Access-Control-Allow-Origin,Access-Control-Allow-Methods,Access-Control-Allow-Headers,Authorization')
      // 'Cache-Control': 'no-cache, must-revalidate',
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'GET,POST,DELETE,PUT,OPTIONS');

    if (this.isValidSession()) {
      httpHeaders = httpHeaders.set('Authorization',  'Bearer '  + this.security.token);
    }
    if (mimeType) {
      httpHeaders = httpHeaders.set('Content-Type', mimeType);
      httpHeaders = httpHeaders.set('Accept', mimeType);
    }
    // console.log(' # SECURITY - HttpOptions: ', httpHeaders);
    httpOptions.headers = httpHeaders;
    return httpOptions;
  }

  private addHeaders(headersObject: any, httpOptions?: any) {
    // instanciamos el objeto options
    httpOptions = this.initHttpOptions(httpOptions);
    // instanciamos el objeto headers
    let httpHeaders = new HttpHeaders(httpOptions.headers);

    // iteramos listado de headers para añadirlos
    for(let key in headersObject) {
      console.log(" # SECURITY - addHeaders: ", key, headersObject[key]);
      httpHeaders.set(key, headersObject[key]);
    }

    // seteamos el objeto dentro del options
    httpOptions.headers = httpHeaders;
    return httpOptions;
  }

  private initHttpOptions(httpOptions?: any): any {
    // si no existe el options se crea
    if (!httpOptions) {
      httpOptions = {};
    }
    // si existe options pero no headers se crean
    if (!httpOptions.headers) {
      httpOptions.headers = {};
    }
    return httpOptions;
  }

  checkProfiles(profiles: string[], multiple): boolean {
    console.log("checkProfiles", profiles, multiple);
    if(profiles && profiles.length > 0) {
      let comprobaciones = new Array();
      let checked = false;
      let valid;
      if(this.getSecurity()) {
        // tslint:disable-next-line: forin
        for(let profile of profiles) {
          // console.log(this.securityService.getSecurity().rol[rol]);
          checked = false
          // tslint:disable-next-line: forin
          for (let rol in this.getSecurity().rol) {
            // if profile structure is equeal to profile>subprofile
            if(profile.split('>')[1] && profile.split('>')[0] === rol) {
              if(rol !== profile){
                valid = this.findProfile(this.getSecurity().rol[rol], profile.split('>')[1]);
                if(!multiple && valid === true){
                  break;
                } else if(valid === true && multiple) {
                  comprobaciones.push(valid);
                  break;
                }
              } else if(!checked && rol === profile) {
                valid = true;
                checked = true;
                comprobaciones.push(valid);
                if(!multiple) {
                  break;
                }
              }
            } else if(profile.split('>')[1] && profile.split('>')[0] !== rol) {
              continue;
            } else {
            // if profile structure is different from profile>subprofile
            if(rol !== profile){
              valid = this.findProfile(this.getSecurity().rol[rol], profile);
              if(!multiple && valid === true){
                break;
              } else if(valid === true && multiple) {
                comprobaciones.push(valid);
                break;
              }
            } else if(!checked && rol === profile){
              valid = true;
              checked = true;
              comprobaciones.push(valid);
              if(!multiple) {
                break;
              }
            }
            }
          }
          if(valid === true && !multiple) {
            break;
          }
          // console.log(comprobaciones);
        }
        if(!multiple && valid === true) {
          return true;
        } else if(!multiple) {
          return false;
        }
        // console.log(comprobaciones)
        // console.log(profiles.length)
        // console.log(profiles)
        if (multiple && comprobaciones.length === profiles.length) {
          return true;
        } else {
          return false;
        }
      }
    } else {
      return true;
    }
  }

  findProfile(object, profile) {
    let valid = false;
    if(object) {
      Object.keys(object).some(k => {
          if (k === profile) {
            // console.log(k)
              valid = true;
              return valid;
          }
          if (object[k] && typeof object[k] === 'object' && !valid) {
              valid = this.findProfile(object[k], profile);
              return valid !== undefined;
          }
      });
      return valid;
    }
    return false;
  }
}