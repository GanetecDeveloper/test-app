import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

/**
 * Módulo que encapsula los módulos necesarios para que 
 * funcione correctamente una subaplicación o módulo de 
 * una aplicación que use ng-core.
 * 
 * Incluye: 
 * CommonModule, ReactiveFormsModule, MaterialModule, FormsModule.
 */
@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialModule,
        FormsModule,
        FlexLayoutModule,
    ],
    exports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialModule,
        FormsModule,
        FlexLayoutModule,
    ]
})
export class CoreImportsModule { }
