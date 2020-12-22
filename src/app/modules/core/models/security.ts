/**
 * Interfaz para los datos de un usuario
 */
export interface Security {
    name: string;
    rol: {};
    expireTime: number;
    token: any;
    isAuth: boolean;
}
