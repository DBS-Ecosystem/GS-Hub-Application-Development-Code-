import { Component, HostBinding, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @HostBinding("attr.class") cssClass = "header";
  @Output() action: EventEmitter<string>;
  public loggedin: boolean;
  public option: string;

  constructor(public authService: AuthService){
    this.loggedin = this.authService.isLogged();
    this.action = new EventEmitter();
    switch (this.authService.getUser().type) {
      case "SPO":
        this.option = "create DTO";
        break;
      case "SME":
        this.option = "find DTO";
        break;
      default:
        this.option = "";
        break;
    }
  }

  callDTO(): boolean {
    this.action.emit(this.option);
    return false;
  }
}
