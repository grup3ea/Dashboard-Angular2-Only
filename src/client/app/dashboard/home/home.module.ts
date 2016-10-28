import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { DatepickerModule } from 'ng2-bootstrap/components/datepicker';
import { HomeComponent } from './home.component';

@NgModule({
    imports: [CommonModule, FormsModule, DatepickerModule],
    declarations: [HomeComponent],
    exports: [HomeComponent]
})

export class HomeModule { }
