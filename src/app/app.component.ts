import {Component} from '@angular/core';
import {Observable,  Subscription} from "rxjs";
import { timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'stopwatch-angular';

  startTime = new Date().getTime();
  sub!: Subscription;
  timer: Observable<number> = timer(this.startTime, 1000);

  hours = 0;
  seconds = 0;
  minutes = 0;

  timerActive = false;

  onStart() {
    if (this.timerActive) {
      this.sub.unsubscribe();
      this.timerActive = false;
      this.hours = 0;
      this.minutes = 0;
      this.seconds = 0;
    }
    else {
      this.timerActive = true;
      this.sub = this.timer
        .subscribe(number => {
            this.hours = Math.floor(number / 3600)
            this.minutes = Math.floor((number % 3600) / 60);
            this.seconds = Math.floor(number % 60);
          }
        );
    }
  }

  onWait() {
    if (this.timerActive) {
      this.sub.unsubscribe();
      this.timerActive = false;
    }
  }

  onReset() {
    this.sub.unsubscribe();
    this.timerActive = false;
    this.onStart();
  }

}
