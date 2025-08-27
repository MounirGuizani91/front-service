import { Component, OnInit } from '@angular/core';
import { ProjectType } from '../model/project.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../service/project.service';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { MissionService } from '../service/mission.service';
import { Mission } from '../model/mission.model';

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, RouterLink],
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss'],
})
export class AddProjectComponent implements OnInit {
  projectForm: FormGroup;
  message = '';
  projectId?: number;
  projectTypes = Object.values(ProjectType);
  action = 'create';
  missions: Mission[] = [];

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private missionService: MissionService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      projectType: ['', Validators.required],
      missionId: [''],
    });
    // Dynamically set missionId as required only for PROFESSIONAL
    this.projectForm.get('projectType')?.valueChanges.subscribe((type) => {
      const missionIdControl = this.projectForm.get('missionId');
      if (type === 'PROFESSIONAL') {
        missionIdControl?.setValidators([Validators.required]);
      } else {
        missionIdControl?.clearValidators();
      }
      missionIdControl?.updateValueAndValidity();
    });
  }

  ngOnInit() {
    this.missionService.getAll().subscribe((missions) => {
      this.missions = missions;
    });
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.projectId = +id;
        this.projectService.getById(this.projectId).subscribe((project) => {
          this.action = 'update';
          this.projectForm.patchValue(project);
        });
      }
    });
  }

  onSubmit() {
    if (this.projectForm.valid) {
      if (this.projectId) {
        // Update
        this.projectService.update(this.projectId, this.projectForm.value).subscribe({
          next: () => {
            this.message = 'Project updated successfully!';
            this.router.navigate(['/projects/type', this.projectForm.value.type]);
          },
          error: () => (this.message = 'Error updating project.'),
        });
      } else {
        // Create
        this.projectService.add(this.projectForm.value).subscribe({
          next: () => {
            this.message = 'Project created successfully!';
            this.router.navigate(['/projects/type', this.projectForm.value.type]);
          },
          error: () => (this.message = 'Error creating project.'),
        });
      }
    }
  }
}
