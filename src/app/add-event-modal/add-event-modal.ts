import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-event-modal',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './add-event-modal.html',
  styleUrl: './add-event-modal.css',
  standalone : true,
})
export class AddEventModal {
  @Input() isModalOpen : boolean = false;
  @Input() selectedDay!: Date;

  @Output() close = new EventEmitter<void>();
  @Output() open = new EventEmitter<void>();
  @Output() eventAdded = new EventEmitter<{ day: Date; title: string }>();

  form : FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      eventTitle: [
        '',
        [
          Validators.required,  
        ]
      ]
    });
  }

  onOpen() {
    this.open.emit();
  }

  onClose() {
    this.close.emit();
  }

  onSubmit() {
    if (this.form.valid) {
      this.eventAdded.emit({
        day: this.selectedDay,
        title: this.form.value.eventTitle
      });
      this.form.reset();
      this.onClose();
    } else {
      this.form.markAllAsTouched();
    }
  }
}
