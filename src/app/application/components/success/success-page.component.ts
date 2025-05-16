import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-success-page',
  templateUrl: './success-page.component.html',
  styleUrls: ['./success-page.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class SuccessPageComponent implements OnInit {
  referenceNumber: string = '';
  countdown: number = 10;
  countdownInterval: any;

  constructor(private router: Router) { }

  ngOnInit() {
    // Generate a random reference number
    this.referenceNumber = `POL-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    
    // Start countdown for redirect
    this.startCountdown();
  }

  startCountdown() {
    this.countdownInterval = setInterval(() => {
      this.countdown--;
      
      if (this.countdown <= 0) {
        clearInterval(this.countdownInterval);
        this.router.navigate(['/']);
      }
    }, 1000);
  }

  ngOnDestroy() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  returnHome() {
    clearInterval(this.countdownInterval);
    this.router.navigate(['/']);
  }
}