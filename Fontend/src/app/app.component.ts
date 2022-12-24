import { Component, HostBinding } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  @HostBinding("attr.class") cssClass = "root"; 
  
  constructor(public dialog: MatDialog) {}

  dtoAction(action:string): void {
    switch (action) {
      case "create DTO":
        this.openNewDTO();
        break;
      case "find DTO":
        this.openfindDTO();
        break;
      default:
        break;
    }
  }

  openNewDTO(): void {
    const newDTO = this.dialog.open(NewDTODialog);

    newDTO.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openfindDTO(): void {
    const findDTO = this.dialog.open(FindDTODialog);

    findDTO.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'app-newdto',
  templateUrl: 'newdto.component.html',
})
export class NewDTODialog {}

@Component({
  selector: 'app-finddto',
  templateUrl: 'finddto.component.html',
})
export class FindDTODialog {}
