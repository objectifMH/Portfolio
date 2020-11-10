import { Component, HostListener } from '@angular/core';
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import * as AOS from 'aos';

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

  x;
  y;


  ngOnInit() {
    this.isShowMenu = false;
    AOS.init();
  }

  getShowMenu() {
    this.isShowMenu = !this.isShowMenu;
    console.log(this.isShowMenu);
  }

  @HostListener('window:scroll', ['$event'])

  onWindowScroll(e) {
    let element = document.querySelector('header');
    if (window.pageYOffset > element.clientHeight) {
      element.classList.add('opacity_true');
      //Scrolling 
    } else {
      element.classList.remove('opacity_true');
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    
    this.x = (document.body.clientWidth);
    this.y = (document.body.clientHeight);
  }




}
