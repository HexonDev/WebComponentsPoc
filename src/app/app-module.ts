import { NgModule, DoBootstrap, Injector, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { provideHttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { DataTableComponent } from './data-table.component';
import { DataTableWrapperComponent } from './data-table-wrapper.component';

@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTableComponent,
    DataTableWrapperComponent
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
  ]
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    // Regisztráljuk a DataTableComponent-et custom element-ként
    const dataTableElement = createCustomElement(DataTableComponent, { injector: this.injector });
    customElements.define('data-table', dataTableElement);

    // Regisztráljuk a DataTableWrapperComponent-et is
    const wrapperElement = createCustomElement(DataTableWrapperComponent, { injector: this.injector });
    customElements.define('data-table-wrapper', wrapperElement);
  }
}
