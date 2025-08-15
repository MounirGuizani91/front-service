import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../project.service';
import { Project } from '../model/project.model';
import { Router, RouterModule } from '@angular/router';
import { tap } from 'rxjs/operators';
import { ProjectPage } from '../model/project-page.model';

@Component({
  selector: 'app-list-project',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list-project.component.html',
  styleUrl: './list-project.component.scss',
})
export class ListProjectComponent implements OnInit {
  projects = signal<Project[]>([]);

  // Angular 16+ inject() function for dependency injection
  projectService = inject(ProjectService);

  search = signal(''); // <-- Ajout du signal de recherche

  router = inject(Router);

  /* Avant la pagination
  ngOnInit(): void {
    this.projectService
      .getAll()
      .pipe(tap((data) => console.log('Projets reçus (tap):', data)))
      .subscribe({
        next: (data) => {
          this.projects.set(data);
        },
        error: (err) => console.error('Erreur lors du chargement des projets', err),
      });
  } */

  deleteProject(id: number) {
    if (confirm('Voulez-vous vraiment supprimer ce projet ?')) {
      this.projectService.delete(id).subscribe({
        next: () => {
          this.projects.set(this.projects().filter((p) => p.id !== id));
        },
        error: (err) => alert('Erreur lors de la suppression du projet'),
      });
    }
  }

  updateProject(id: number) {
    this.router.navigate(['/create', id]);
  }
  // Computed property to filter projects based on search input
  filteredProjects = computed(() =>
    this.projects().filter((p) => {
      const searchValue = this.search().toLowerCase();
      return (
        p.nom.toLowerCase().includes(searchValue) ||
        p.description?.toLowerCase().includes(searchValue) ||
        (p.dateDebut && p.dateDebut.toString().toLowerCase().includes(searchValue)) ||
        (p.dateFin && p.dateFin.toString().toLowerCase().includes(searchValue))
      );
    }),
  );

  page = signal(0);
  pageSize = signal(5);
  totalElements = signal(0);

  loadProjects() {
    this.projectService.getAllPaged(this.page(), this.pageSize()).subscribe({
      next: (res: ProjectPage) => {
        this.projects.set(res.projets);
        this.totalElements.set(res.totalElements);
      },
      error: (err) => console.error('Erreur lors du chargement des projets', err),
    });
  }

  public Math = Math;
  ngOnInit(): void {
    this.loadProjects();
  }
}
