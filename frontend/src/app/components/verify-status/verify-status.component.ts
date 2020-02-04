import { Component, OnInit, Output, Input, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Subscription, Observable, timer } from 'rxjs';
import * as moment from 'moment';


@Component({
  selector: 'app-verify-status',
  templateUrl: './verify-status.component.html',
  styleUrls: ['./verify-status.component.less']
})
export class VerifyStatusComponent implements OnInit {


	private subscription: Subscription;
	@Output() TimerExpired: EventEmitter<any> = new EventEmitter<any>();

	@Input() SearchDate: moment.Moment = moment();
	@Input() ElapsTime: number = 1;

	searchEndDate: moment.Moment;
	remainingTime: number;
	minutes: number;
	seconds: number;

	everySecond: Observable<number> = timer(0, 1000);

	constructor(private ref: ChangeDetectorRef) {
		this.searchEndDate = this.SearchDate.add(this.ElapsTime, "minutes");
	}

	ngOnInit() {
		this.subscription = this.everySecond.subscribe((seconds) => {
			var currentTime: moment.Moment = moment();
			this.remainingTime = this.searchEndDate.diff(currentTime)
			this.remainingTime = this.remainingTime / 1000;

			if (this.remainingTime <= 0) {
				this.SearchDate = moment();
				this.searchEndDate = this.SearchDate.add(this.ElapsTime, "minutes");

        this.TimerExpired.emit();

        console.log('refresh');
			}
			else {
				this.minutes = Math.floor(this.remainingTime / 60);
				this.seconds = Math.floor(this.remainingTime - this.minutes * 60);
			}
			this.ref.markForCheck()
		})
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}


}
