/**
 * Modelo usado en cada uno de los elementos del menú de navegación.
 */
export interface NavItem {
  /** Nombre mostrado como texto del enlace. */
  displayName: string;
  /** Marcador que indica si el enlace esta o no deshabilitado. */
  disabled?: boolean;
  /** Nombre del icono a mostrar junto al nombre del enlace. */
  iconName: string;
  /** Dirección del enlace */
  route?: string;
  /** Listado de elementos hijos del elemento actual. */
  children?: NavItem[];
}

// export class NavItem {
  
//   navItem: NavItem;

//   constructor(navItem: NavItem) {
//     this.navItem = navItem;
//   }
// }