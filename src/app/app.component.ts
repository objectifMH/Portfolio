import { Component, Directive, HostBinding, HostListener } from '@angular/core';
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

    // this.x = (document.body.clientWidth);
    // this.y = (document.body.clientHeight);
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMouve(event) {

    this.x = (window.innerWidth / 2 - event.pageX) / 5;
    this.y = (window.innerHeight / 2 - event.pageY) / 5;

  }

  jerentre(event) {
    let presentation = document.querySelector('.presentation_portrait');
    let presentation_h1 = document.querySelector('.presentation h1');
    let presentation_h2 = document.querySelector('.presentation h2');
    let presentation_full = document.querySelector('.full');
    let presentation_stack = document.querySelector('.stack');
    let portrait_img = document.querySelector('.portrait_img');

    presentation.setAttribute("style", "transform : rotateY(" + this.y + "deg) rotateX(" + this.x + "deg); ");
    presentation_h1.setAttribute("style", "transform : translateZ(68px) scale(1.1) ; ");
    presentation_h2.setAttribute("style", "transform : translateZ(60px) scale(1.2); ");
    portrait_img.setAttribute("style", "transform: scale(1.12) translateZ(124px) ; box-shadow: 4px 5px 13px rgba(0,0,0,.75);");
    presentation_full.setAttribute("style", "transform : scale(1.3) translateZ(63px) ; ");
    presentation_stack.setAttribute("style", "transform : scale(1.3) translateZ(65px) ; ");
  }

  jesors(event) {
    let presentation = document.querySelector('.presentation_portrait');
    let presentation_h1 = document.querySelector('.presentation h1');
    let presentation_h2 = document.querySelector('.presentation h2');
    let presentation_full = document.querySelector('.full');
    let presentation_stack = document.querySelector('.stack');
    let portrait_img = document.querySelector('.portrait_img');

    presentation.setAttribute("style", "transform : rotateY(0deg) rotateX(0deg); ");
    presentation_h1.setAttribute("style", "transform : translateZ(0px) ; ");
    presentation_h2.setAttribute("style", "transform : translateZ(0px) ; ");
    portrait_img.setAttribute("style", "transform : translateZ(0px); ");
    presentation_full.setAttribute("style", "transform : scale(0) translateZ(0px) ; ");
    presentation_stack.setAttribute("style", "transform : scale(0) translateZ(0px) ; ");

  }



}
