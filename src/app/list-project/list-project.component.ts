import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../service/project.service';
import { Project, ProjectType } from '../model/project.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProjectPage } from '../model/project-page.model';

@Component({
  selector: 'app-list-project',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list-project.component.html',
  styleUrls: ['./list-project.component.scss'],
})
export class ListProjectComponent implements OnInit {
  projects = signal<Project[]>([]);
  route: ActivatedRoute = inject(ActivatedRoute);
  selectedType: ProjectType | undefined;

  projectService = inject(ProjectService);

  search = signal('');
  router = inject(Router);
  page = signal(0);
  pageSize = signal(6);
  totalElements = signal(0);
  Math = Math;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const type = params.get('type') as ProjectType;
      this.selectedType = type;
      this.loadProjects();
    });
  }

  loadProjects() {
    this.projectService.getAll().subscribe({
      next: (projects: Project[]) => {
        let filtered = projects;
        if (this.selectedType) {
          filtered = filtered.filter((p) => p.projectType === this.selectedType);
        }
        this.projects.set(filtered);
        this.totalElements.set(filtered.length);
      },
      error: (err) => console.error('Error loading projects', err),
    });
  }

  filteredProjects = computed(() => {
    const searchValue = this.search().toLowerCase();
    const filtered = this.projects().filter((p) => {
      return (
        p.name.toLowerCase().includes(searchValue) ||
        p.description?.toLowerCase().includes(searchValue) ||
        (p.startDate && p.startDate.toString().toLowerCase().includes(searchValue)) ||
        (p.endDate && p.endDate.toString().toLowerCase().includes(searchValue)) ||
        (p.projectType && p.projectType.toLowerCase().includes(searchValue))
      );
    });
    // Pagination after filtering
    const start = this.page() * this.pageSize();
    return filtered.slice(start, start + this.pageSize());
  });

  deleteProject(id: number) {
    if (confirm('Do you really want to delete this project?')) {
      this.projectService.delete(id).subscribe({
        next: () => {
          this.projects.set(this.projects().filter((p) => p.id !== id));
          this.totalElements.set(this.projects().length);
        },
        error: (err) => alert('Error deleting project'),
      });
    }
  }

  updateProject(id: number) {
    this.router.navigate(['/projects/update', id]);
  }
}
