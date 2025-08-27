import { Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MissionService } from '../service/mission.service';
import { Subject, of } from 'rxjs';
import { catchError, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-add-mission',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-mission.component.html',
  styleUrls: ['./add-mission.component.scss'],
})
export class AddMissionComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  missionForm: FormGroup;
  message = '';
  missionService = inject(MissionService);

  constructor(private fb: FormBuilder) {
    this.missionForm = this.fb.group({
      name: ['', Validators.required],
      responsibility: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      clientName: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.missionForm.valid) {
      this.missionService
        .add(this.missionForm.value)
        .pipe(
          takeUntil(this.destroy$),
          tap(() => {
            this.message = 'Mission created successfully!';
            this.missionForm.reset();
          }),
          catchError((err) => {
            console.error('Error creating mission', err);
            this.message = 'Error creating mission';
            return of(null);
          }),
        )
        .subscribe((result) => {
          if (result) {
            this.message = 'Mission créée avec succès !';
            this.missionForm.reset();
          }
        });
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
