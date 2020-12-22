import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppConfigService } from '../../services/app-config.service';
import { SecurityService } from '../../services/security.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private CONFIG = AppConfigService.settings;
  private SECURITY_CONFIG = AppConfigService.settings.coreConfig.security;
  config = AppConfigService.settings.modulesConfig.testDeEmpleabilidad;
  LoginForm: FormGroup;

  constructor(
    // eslint-disable-next-line prettier/prettier
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private formBuilder: FormBuilder,
    private securityService: SecurityService,
    private http: HttpClient,
    @Inject('env') private ENV,
  ) {
    //
  }

  ngOnInit(): void {
    // Init form
    this.LoginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]]
    });
  }

  /**
   * Devuelve un token de autenticación
   * @param user Nombre del usario
   * @param password Contraseña del usuario
   */
  getToken(user, password): void {
    this.getToken2(user, password).subscribe(data => {
      console.log(data)
      const token = data.access_token;
      sessionStorage.setItem('sicasToken', token);
      this.router.navigate(['/test-empleabilidad'])
      this.securityService.navigateToBack(this.activatedRouter, '');
    },
    error => {
      if(error.status === 400) alert('Usuario no autorizado');
    });
  }

  /**
   * Devuelve un Observable con el token de acceso.
   *
   * @returns Observable con el token de acceso.
   */
  getToken2(username, password): Observable<any> {
    console.log('GET TOKEN');
    let header = new HttpHeaders()
      .set('Authorization', 'Basic bmctdGVzdDo=')
      .set('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8')
      .set('grant_type', 'username');
    const body = 'grant_type=password&username=' + username + '&password=' + password;
    return this.http.post(
      this.ENV.APIS.SECURITY + this.SECURITY_CONFIG.ws.loginCredentials.path,
      body, 
      {headers: header});
  }

}
