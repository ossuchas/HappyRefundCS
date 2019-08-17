import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { PageHeaderComponent } from '../shared/modules/page-header/page-header.component';
import { PageFooterComponent } from '../shared/modules/page-footer/page-footer.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [CustomerComponent, PageHeaderComponent, PageFooterComponent],
    imports: [CommonModule, CustomerRoutingModule, TranslateModule, FormsModule, ReactiveFormsModule]
})
export class CustomerModule {}
