import { Component, Input, Output, EventEmitter, ViewEncapsulation, OnInit, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
}

// Window interface bővítése a custom property-kkel
declare global {
  interface Window {
    tableConfig?: {
      columns: TableColumn[];
      data: any[];
    };
    tableData?: any[];
    tableColumns?: TableColumn[];
  }
}

// Transform function JSON stringből parse-oláshoz
function parseJsonAttribute(value: string | TableColumn[]): TableColumn[] {
  if (typeof value === 'string') {
    try {
      return JSON.parse(value);
    } catch (e) {
      console.error('Invalid JSON for columns:', e);
      return [];
    }
  }
  return value || [];
}

function parseDataAttribute(value: string | any[]): any[] {
  if (typeof value === 'string') {
    try {
      return JSON.parse(value);
    } catch (e) {
      console.error('Invalid JSON for data:', e);
      return [];
    }
  }
  return value || [];
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
  export class DataTableComponent implements OnInit {
  @Input({ transform: parseJsonAttribute }) columns: TableColumn[] = [];
  @Input({ transform: parseDataAttribute }) 
  set data(value: any[]) {
    this._data = value;
  }
  get data(): any[] {
    return this._data;
  }
  @Input() cellTemplate: TemplateRef<any> | null = null;
  
  private _data: any[] = [];
  
  // Output események
  @Output() rowAdded = new EventEmitter<any>();
  @Output() rowDeleted = new EventEmitter<any>();
  @Output() dataChanged = new EventEmitter<any[]>();
  
  // Attribútum-alapú event handler-ek (callback függvény nevek)
  @Input('on-row-added') onRowAddedCallback?: string;
  @Input('on-row-deleted') onRowDeletedCallback?: string;
  @Input('on-data-changed') onDataChangedCallback?: string;
  
  sortColumn: string | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';

  ngOnInit(): void {
    // Ha nincs megadva columns/data, próbáljuk betölteni a window objektumból
    if (typeof window !== 'undefined') {
      // Először a window.tableConfig objektumot ellenőrizzük
      if (window.tableConfig) {
        if (!this.columns || this.columns.length === 0) {
          this.columns = window.tableConfig.columns || [];
        }
        if (!this._data || this._data.length === 0) {
          this._data = window.tableConfig.data || [];
        }
      }
      
      // Alternatív módon külön window property-k is használhatók
      if (window.tableColumns && (!this.columns || this.columns.length === 0)) {
        this.columns = window.tableColumns;
      }
      if (window.tableData && (!this._data || this._data.length === 0)) {
        this._data = window.tableData;
      }
    }
  }

  // Helper: Callback függvény meghívása attribútumból
  private callGlobalCallback(callbackName: string | undefined, data: any): void {
    if (callbackName && typeof window !== 'undefined') {
      const callback = (window as any)[callbackName];
      if (typeof callback === 'function') {
        callback(data);
      } else {
        console.warn(`Callback function '${callbackName}' not found on window object`);
      }
    }
  }

  onSort(column: TableColumn): void {
    if (!column.sortable) return;
    
    if (this.sortColumn === column.key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column.key;
      this.sortDirection = 'asc';
    }
    
    this.sortData();
  }

  private sortData(): void {
    if (!this.sortColumn) return;
    
    this.data = [...this.data].sort((a, b) => {
      const aValue = a[this.sortColumn!];
      const bValue = b[this.sortColumn!];
      
      if (aValue === bValue) return 0;
      
      const comparison = aValue > bValue ? 1 : -1;
      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
    
    // Esemény kibocsátása rendezés után
    this.dataChanged.emit(this.data);
    this.callGlobalCallback(this.onDataChangedCallback, this.data);
  }

  deleteRow(row: any): void {
    const index = this.data.indexOf(row);
    if (index > -1) {
      this.data = this.data.filter(r => r !== row);
      
      // Esemény kibocsátása törléskor
      this.rowDeleted.emit(row);
      this.dataChanged.emit(this.data);
      
      // Attribútum-alapú callback meghívása
      this.callGlobalCallback(this.onRowDeletedCallback, row);
      this.callGlobalCallback(this.onDataChangedCallback, this.data);
    }
  }

  getSortIcon(column: TableColumn): string {
    if (!column.sortable) return '';
    if (this.sortColumn !== column.key) return '↕';
    return this.sortDirection === 'asc' ? '↑' : '↓';
  }
}
