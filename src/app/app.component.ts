import { Component } from '@angular/core';
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'portfolio';
  isShowMenu = false; 

  faLinkedinIn = faLinkedinIn;
  faGithub = faGithub;
  
  
  getShowMenu() {
    this.isShowMenu = !this.isShowMenu;
    console.log(this.isShowMenu);
  }


}
