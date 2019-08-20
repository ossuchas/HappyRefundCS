import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
// import { PageHeaderComponent } from '../shared/modules/page-header/page-header.component';
// import { PageFooterComponent } from '../shared/modules/page-footer/page-footer.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { MatSnackBarModule } from '@angular/material';

@NgModule({
    declarations: [CustomerComponent, FooterComponent, HeaderComponent],
    imports: [CommonModule, CustomerRoutingModule, TranslateModule, FormsModule, ReactiveFormsModule, MatSnackBarModule]
})
export class CustomerModule {}
