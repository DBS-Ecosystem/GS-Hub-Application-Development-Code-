import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

const material = [
  MatButtonModule,
  MatSidenavModule,
  MatButtonToggleModule,
  MatDialogModule,
  MatInputModule
];

@NgModule({
  imports: [material],
  exports: [material]
})
export class MaterialModule { }
