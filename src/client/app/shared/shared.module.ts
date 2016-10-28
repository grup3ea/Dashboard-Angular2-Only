import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {CoolStorageModule} from "angular2-cool-storage";

import { NameListService } from './name-list/index';
import {UserService} from "./services/user.service";
import {AuthGuard} from "./guards/auth.guard";
import {ApiCallsService} from "./services/apiCalls.service";
import {ApiInfoService} from "./services/api-info.service";

/**
* Do not specify providers for modules that might be imported by a lazy loaded module.
*/

@NgModule({
    imports: [CommonModule, RouterModule, CoolStorageModule],
    providers: [UserService, ApiCallsService,AuthGuard, ApiInfoService],
    declarations: [],
    exports: [CommonModule, FormsModule, RouterModule]
})

export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [NameListService]
        };
    }
}
