import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PtHeaderModule } from './widgets/pt-header/pt-header.module';
import { PtFooterModule } from './widgets/pt-footer/pt-footer.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { StoreModule } from '@ngrx/store';
import { PtStoreModule } from './store/store.module';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PtHeaderModule,
    PtFooterModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    PtStoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
