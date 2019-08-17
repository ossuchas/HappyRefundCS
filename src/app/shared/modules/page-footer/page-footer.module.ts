import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PageFooterComponent } from './page-footer.component';


@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [PageFooterComponent],
    exports: [PageFooterComponent]
})
export class PageFooterModule { }
