import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PtHeaderComponent } from './pt-header.component';

import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PtHeaderComponent],
  imports: [CommonModule, MatButtonToggleModule, RouterModule],
  exports: [PtHeaderComponent],
})
export class PtHeaderModule {}
