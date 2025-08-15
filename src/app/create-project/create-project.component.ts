import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../project.service';
import { Project } from '../model/project.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.scss',
})
export class CreateProjectComponent implements OnInit {
  projectForm: FormGroup;
  message = '';
  projectId?: number;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.projectForm = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.projectId = +id;
        this.projectService.getById(this.projectId).subscribe((project) => {
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
            this.message = 'Projet modifié avec succès !';
            this.router.navigate(['/']);
          },
          error: () => (this.message = 'Erreur lors de la modification du projet.'),
        });
      } else {
        // Create
        this.projectService.add(this.projectForm.value).subscribe({
          next: () => {
            this.message = 'Projet créé avec succès !';
            this.router.navigate(['/']);
          },
          error: () => (this.message = 'Erreur lors de la création du projet.'),
        });
      }
    }
  }
}
