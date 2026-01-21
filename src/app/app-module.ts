import { NgModule, DoBootstrap, Injector, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { provideHttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { DataTableComponent } from './data-table.component';
import { DataTableWrapperComponent } from './data-table-wrapper.component';
import { UserFormComponent } from './user-form.component';

@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTableComponent,
    DataTableWrapperComponent,
    UserFormComponent
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

    // Regisztráljuk a UserFormComponent-et is
    const userFormElement = createCustomElement(UserFormComponent, { injector: this.injector });
    customElements.define('user-form', userFormElement);
  }
}
