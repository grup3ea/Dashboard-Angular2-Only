import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';

@NgModule({
    imports: [CommonModule, RouterModule, ReactiveFormsModule],
    declarations: [LoginComponent],
    exports: [LoginComponent]
})

export class LoginModule { }
