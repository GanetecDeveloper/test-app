import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAppConfig } from '../models/app-config.model';

@Injectable()
export class AppConfigService {

    static settings: IAppConfig;

    constructor(
        private http: HttpClient,
        @Inject('env') private ENV,
    ) {}

    load() {
        const jsonFile = this.ENV.CORE_CONFIG.CONFIG_FILEPATH;
        console.log(`# [CORE - CONFIG (ConfigService)] Loading file '${jsonFile}'`);
        AppConfigService.settings = {
            env: {
                name: ''
            },
            logging: {
                console: true,
                appInsights: true
            },
            coreConfig: {
                security: {
                    sessionExpireTimeInMinutes: 15,
                    ws:{
                        loginCredentials: {
                            path: '',
                            headers: {
                                Authorization: '',
                                ContentType: '',
                                grant_type: ''
                            },
                            body: ''
                        },
                        loginCertificate: {
                            path: '',
                            headers: {
                            },
                            body: ''
                        },
                        logout: {
                            path: '',
                            headers: {
                            },
                            body: ''
                        }
                    },
                    ngPaths: {
                        login: '',
                        logout: '',
                        loginOk: '',
                        home: ''
                    },
                    loginTypes: [''],
                    onLoginOkRedirectEnabled: true,
                    onLoginOkRedirectTo: '',
                    onLogoutCloseAtBack: true
                  }
            },
           ws: {},
           app: {},
           modulesConfig: {},
           extras: {
           }
        };
        return new Promise<void>((resolve, reject) => {
            this.http.get(jsonFile).toPromise().then((response : IAppConfig) => {
                AppConfigService.settings = response as IAppConfig;
                console.log(` # [CORE - ConfigService] File load succesfully '${jsonFile}'`, response);
               resolve();
            }).catch((response: any) => {
               console.error(` # [CORE - CONFIG (ConfigService)] Could not load file '${jsonFile}': ${JSON.stringify(response)}`, response);
               reject(` # [CORE - CONFIG (ConfigService)] Could not load file '${jsonFile}': ${JSON.stringify(response)}`);
            });
        });
    }
}