/**
 * Interface que define la estructura del fichero de 
 * configuración de la aplicación.
 * 
 * Para incluir cualquier configuración extra, se debe añadir 
 * un bloque nuevo a `modulesConfig`.
 */
export interface IAppConfig {
    env: {
        name: string;
    };
    // appInsights: {
    //     instrumentationKey: string;
    // };
    /** Configuración de logging */
    logging: {
        console: boolean;
        appInsights: boolean;
    };
    // aad: {
    //     requireAuth: boolean;
    //     tenant: string;
    //     clientId: string;
 
    // };
    // apiServer: {
    //     metadata: string;
    //     rules: string;
    // };
    /** Rutas de los servicios comunes */
    ws: any;
    coreConfig: {
        security: {
            sessionExpireTimeInMinutes: 15,
            ws:{
                loginCredentials: {
                    path: string,
                    headers: {
                        Authorization: string,
                        ContentType: string,
                        grant_type: string
                    },
                    body: string
                },
                loginCertificate: WsConfig,
                logout: WsConfig
            },
            ngPaths: {
                login: string,
                logout: string,
                loginOk: string,
                home: string
            },
            loginTypes: string[],
            onLoginOkRedirectEnabled: boolean,
            onLoginOkRedirectTo: string,
            onLogoutCloseAtBack: boolean,
          }
    };
    /** Configuración de cada uno de los módulos de la aplicación. */
    modulesConfig: any;
    /** Configuracion generica de la App (nombre, rutas, etc.) */
    app: any;
    /** Configuración globales que no encajan en ninguno de los demás objetos o 
     * que no tienen suficiente peso como para generar un nuevo objeto propio. */
    extras: any;
}

interface WsConfig {
    path: string;
    headers: {};
    body: string;
}