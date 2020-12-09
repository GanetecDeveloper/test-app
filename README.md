# Consideraciones previas

* Para visualizar trazas desde la consola de chrome debemos incluir el nivel "verbose" para mostrar más información que la que he dejado por defecto.

* Se ha corregido una pequeña errata en el enunciado respecto de la url de las imágenes. Deberia ser en lugar de .

* Dado que el enunciado habla de un modelo que contenga el id de la imagen, tomamos como tal el id perteneciente a la url. Teniendo en cuenta esto, al tratarse de ids aleatorios existiran imagenes identicas (mismo id y foto) pero se diferenciaran en la descripción aleatoria que contienen.

* Teniendo en cuenta que algunos de los id de imagenes no existen en la api de pruebas, no he querido entrar en comprobar uno a uno los ids correctos pero he añadido el control de error a la imagen que responda un 404 para que muestre al menos una imagen local (assets/img/angular.jpg).


# TestApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
