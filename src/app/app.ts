import { Component, signal } from '@angular/core';
import { TableColumn } from './data-table.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('WebComponentsPoc');

  columns: TableColumn[] = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Név', sortable: true },
    { key: 'email', label: 'E-mail', sortable: true },
    { key: 'role', label: 'Szerepkör', sortable: true },
    { key: 'status', label: 'Státusz', sortable: false }
  ];

  data = [
    { id: 1, name: 'Kovács János', email: 'kovacs.janos@example.com', role: 'Admin', status: 'Aktív' },
    { id: 2, name: 'Nagy Anna', email: 'nagy.anna@example.com', role: 'Felhasználó', status: 'Aktív' },
    { id: 3, name: 'Szabó Péter', email: 'szabo.peter@example.com', role: 'Moderátor', status: 'Inaktív' },
    { id: 4, name: 'Tóth Katalin', email: 'toth.katalin@example.com', role: 'Felhasználó', status: 'Aktív' },
    { id: 5, name: 'Kiss László', email: 'kiss.laszlo@example.com', role: 'Admin', status: 'Aktív' }
  ];
}
