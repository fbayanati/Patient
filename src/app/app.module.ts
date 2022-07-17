import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PtHeaderModule } from './widgets/pt-header/pt-header.module';
import { PtFooterModule } from './widgets/pt-footer/pt-footer.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PtHeaderModule,
    PtFooterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
