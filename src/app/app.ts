import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddEventModal } from './add-event-modal/add-event-modal';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DatePipe, CdkDrag, CdkDropList, AddEventModal],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  ngOnInit() {
    this.allDropLists = this.weeks
      .flat()
      .map(day => 'day-' + day.date.getTime());
  }

  // it matches with the id of the event and helps in dragging
  allDropLists: string[] = [];
  isModalOpen = false;
  currentDay! : Date;

  openAddEventModal(day : Date) {
    this.isModalOpen = true;
    this.currentDay = day;
  }

  closeAddEventModal() {
    this.isModalOpen = false;
  }

  handleEventAdded(event: { day: Date; title: string }) {
    for (let week of this.weeks) {
      const dayObj = week.find(d => d.date.getTime() === event.day.getTime());
      if (dayObj) {
        dayObj.events.push({ id: 'e' + Date.now(), title: event.title });
        break;
      }
    }
  }

  weeks = [
    [
      {
        date: new Date(2026, 4, 1),
        dayName: 'Wed',
        events: [
          { id: 'e1', title: 'Team Meeting' }
        ]
      },
      { date: new Date(2026, 4, 2), dayName: 'Thurs', events: [] },
      {
        date: new Date(2026, 4, 3),
        dayName: 'Fri',
        events: [
          { id: 'e2', title: 'Gym' },
          { id: 'e3', title: 'Dinner Plan' }
        ]
      },
      { date: new Date(2026, 4, 4), dayName: 'Sat', events: [] },
      {
        date: new Date(2026, 4, 5),
        dayName: 'Sun',
        events: [
          { id: 'e4', title: 'Family Time' }
        ]
      },
      { date: new Date(2026, 4, 6), dayName: 'Mon', events: [] },
      { date: new Date(2026, 4, 7), dayName: 'Tue', events: [] },
    ],
    [
      { date: new Date(2026, 4, 8), dayName: 'Wed', events: [] },
      {
        date: new Date(2026, 4, 9),
        dayName: 'Thurs',
        events: [
          { id: 'e5', title: 'Doctor Appointment' }
        ]
      },
      { date: new Date(2026, 4, 10), dayName: 'Fri', events: [] },
      {
        date: new Date(2026, 4, 11),
        dayName: 'Sat',
        events: [
          { id: 'e6', title: 'Project Work' },
          { id: 'e7', title: 'Call with Client' }
        ]
      },
      { date: new Date(2026, 4, 12), dayName: 'Sun', events: [] },
      { date: new Date(2026, 4, 13), dayName: 'Mon', events: [] },
      { date: new Date(2026, 4, 14), dayName: 'Tue', events: [] },
    ],
    [
      {
        date: new Date(2026, 4, 15),
        dayName: 'Wed',
        events: [
          { id: 'e8', title: 'Interview Prep' }
        ]
      },
      { date: new Date(2026, 4, 16), dayName: 'Thurs', events: [] },
      { date: new Date(2026, 4, 17), dayName: 'Fri', events: [] },
      {
        date: new Date(2026, 4, 18),
        dayName: 'Sat',
        events: [
          { id: 'e9', title: 'Shopping' }
        ]
      },
      { date: new Date(2026, 4, 19), dayName: 'Sun', events: [] },
      { date: new Date(2026, 4, 20), dayName: 'Mon', events: [] },
      { date: new Date(2026, 4, 21), dayName: 'Tue', events: [] },
    ],
    [
      { date: new Date(2026, 4, 22), dayName: 'Wed', events: [] },
      {
        date: new Date(2026, 4, 23),
        dayName: 'Thurs',
        events: [
          { id: 'e10', title: 'Presentation' }
        ]
      },
      { date: new Date(2026, 4, 24), dayName: 'Fri', events: [] },
      { date: new Date(2026, 4, 25), dayName: 'Sat', events: [] },
      {
        date: new Date(2026, 4, 26),
        dayName: 'Sun',
        events: [
          { id: 'e11', title: 'Trip' }
        ]
      },
      { date: new Date(2026, 4, 27), dayName: 'Mon', events: [] },
      { date: new Date(2026, 4, 28), dayName: 'Tue', events: [] },
    ],
    [
      {
        date: new Date(2026, 4, 29),
        dayName: 'Wed',
        events: [
          { id: 'e12', title: 'Wrap-up Tasks' }
        ]
      },
      { date: new Date(2026, 4, 30), dayName: 'Thurs', events: [] },
    ]
  ];

  currentWeekIndex = 0;

  nextWeek() {
    if (this.currentWeekIndex < this.weeks.length - 1) {
      this.currentWeekIndex++;
    }
  }

  prevWeek() {
    if (this.currentWeekIndex > 0) {
      this.currentWeekIndex--;
    }
  }

  drop(event : CdkDragDrop<{
    title : string;
    id : string
  }[]>) {
    if (event.previousContainer === event.container) {
        moveItemInArray(
          event.container.data,
          event.previousIndex,
          event.currentIndex,
        )
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )
    }
  }
}
