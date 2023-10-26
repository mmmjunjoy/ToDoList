import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './todo.component';
import { PopupComponent } from '../popup/popup.component';
import { FormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [TodoComponent, PopupComponent],
  imports: [CommonModule, FormsModule, MatInputModule, MatFormFieldModule],

  providers: [],
})
export class TodoModule {}
