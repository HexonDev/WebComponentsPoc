import { Component, Input, Output, EventEmitter, OnInit, inject, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs';
import { DataTableComponent, TableColumn } from './data-table.component';

@Component({
  selector: 'app-data-table-wrapper',
  standalone: true,
  imports: [CommonModule, DataTableComponent],
  templateUrl: './data-table-wrapper.component.html',
  styleUrls: ['./data-table-wrapper.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class DataTableWrapperComponent implements OnInit {
  @Input() 
  set apiUrl(value: string) {
    this._apiUrl = value;
    if (value) {
      this.fetchData();
    }
  }
  get apiUrl(): string {
    return this._apiUrl;
  }
  private _apiUrl: string = '';
  
  // Oszlopok belső meghatározása
  columns: TableColumn[] = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Név', sortable: true },
    { key: 'email', label: 'E-mail', sortable: true },
    { key: 'website', label: 'Weboldal', sortable: false }
  ];

  data: any[] = [];
  isLoading = false;
  error: string | null = null;

  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    console.log('DataTableWrapperComponent initialized with apiUrl:', this.apiUrl);
  }

  fetchData(): void {
    if (!this.apiUrl) return;
    console.log('Fetching data from:', this.apiUrl);
    this.isLoading = true;
    this.error = null;

    this.http.get<any[]>(this.apiUrl)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (response) => {
          this.data = response;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('API Error:', err);
          this.error = 'Nem sikerült betölteni az adatokat.';
          this.cdr.detectChanges();
        }
      });
  }

  onDataChanged(newData: any[]): void {
    this.data = newData;
  }

  onRowDeleted(row: any): void {
    console.log('Row deleted in wrapper:', row);
  }
}
