import { Component, Directive, HostBinding, HostListener } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import * as AOS from 'aos';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';



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

  errorMail = false;
  errorNom = false;
  errorMessage = false;

  x;
  y;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: true,
    dots: true,
    navSpeed: 200,
    // navText: ["<span class='material-icons'>arrow_left</span>",
    //  "<span class='material-icons'>arrow_right</span>"],
    responsive: {
      0: {
        items: 1
      },
      490: {
        items: 2
      },
      940: {
        items: 3
      }
    },
    nav: false
  }

  contactForm: FormGroup;
  constructor(private fb: FormBuilder, private httpClient: HttpClient, private toastr: ToastrService) {
    this.contactForm = this.fb.group({
      nom: [''],
      mail: [''],
      message: ['']
    });
  }


  ngOnInit() {
    this.isShowMenu = false;
    AOS.init();
  }

  onFocusMethod(e) {
    e.srcElement.parentNode.classList.add("focus");
  }

  onBlurMethod(e) {
    let attr = e.target.id;
    if (this.contactForm.value[attr] === "")
      e.srcElement.parentNode.classList.remove("focus");
  }

  onSubmit() {
    if (this.contactForm.valid) {

      let message = this.contactForm.value.message + "\n Envoyé du Porfolio. ";


      let formData = new FormData();
      formData.append("name", this.contactForm.value.nom);
      formData.append("email", this.contactForm.value.mail);
      formData.append("message", message);


      this.httpClient.post("https://formspree.io/f/mknpvgjd", formData).subscribe(
        response => {
          this.errorMail = this.contactForm.controls.mail.status === "VALID" ? false : true;
          this.errorMessage = this.contactForm.controls.message.status === "VALID" ? false : true;
          this.errorNom = this.contactForm.controls.nom.status === "VALID" ? false : true;

          this.toastr.success(this.contactForm.value.nom + ", Votre message a bien été envoyé ", "Message", {
            timeOut: 1800,
            progressBar: true,
            progressAnimation: 'increasing'
          })

          this.contactForm = this.fb.group({
            nom: [''],
            mail: [''],
            message: ['']
          });

        },
        error => {
          console.log(error);
        }
      );
    }
    else {
      this.errorMail = this.contactForm.controls.mail.status === "VALID" ? false : true;
      this.errorMessage = this.contactForm.controls.message.status === "VALID" ? false : true;
      this.errorNom = this.contactForm.controls.nom.status === "VALID" ? false : true;
    }
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
