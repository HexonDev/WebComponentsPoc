import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @Output() dataChanged = new EventEmitter<any>();

  name: string = '';
  email: string = '';
  phone: string = '';

  constructor() {}

  ngOnInit() {}

  onInputChange() {
    const data = {
      name: this.name,
      email: this.email,
      phone: this.phone
    };
    this.dataChanged.emit(data);
  }
}
