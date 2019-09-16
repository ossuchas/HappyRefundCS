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
import {
    MatSnackBarModule,
    MatTable,
    MatTableModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatButtonModule,
    MatDialogModule,
    MatListModule,
    MatProgressBarModule,
    MatCardModule,
    MatCard,
    MatIconModule
} from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';
import { ConfirmationDialogComponent } from './dialog/confirmation-dialog/confirmation-dialog.component';
import { DialogTermComponent } from './dialog-term/dialog-term.component';

@NgModule({
    declarations: [CustomerComponent, FooterComponent, HeaderComponent, DialogComponent, ConfirmationDialogComponent, DialogTermComponent],
    imports: [
        CommonModule,
        CustomerRoutingModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatTableModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatButtonModule,
        MatDialogModule,
        MatListModule,
        MatProgressBarModule,
        MatCardModule,
        MatIconModule
    ],
    entryComponents: [DialogComponent, ConfirmationDialogComponent, DialogTermComponent]
})
export class CustomerModule {}
