import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AcademicLevel } from '../model/academic-level.model';
import { AcademicLevelService } from '../service/academic-level.service';
import { AcademicLevelPage } from '../model/academic-level-page.model';

@Component({
  selector: 'app-list-academic-level',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list-academic-level.component.html',
  styleUrls: ['./list-academic-level.component.scss'],
})
export class ListAcademicLevelComponent {
  levels = signal<AcademicLevel[]>([]);
  academicLevelService = inject(AcademicLevelService);
  search = signal('');
  page = signal(0);
  pageSize = signal(6);
  totalElements = signal(0);
  Math = Math;
  router: any;

  ngOnInit(): void {
    this.loadAcademicLevels();
  }

  loadAcademicLevels() {
    this.academicLevelService.getAllPaged(this.page(), this.pageSize()).subscribe({
      next: (res: AcademicLevelPage) => {
        this.levels.set(res.academicLevels);
        this.totalElements.set(res.totalElements);
      },
      error: (err) => console.error('Error loading academic levels', err),
    });
  }

  filteredAcademicLevels = computed(() =>
    (this.levels() ?? []).filter((level: AcademicLevel) => {
      const searchValue = this.search().toLowerCase();
      return (
        level.name.toLowerCase().includes(searchValue) ||
        level.school.toLowerCase().includes(searchValue) ||
        level.country.toLowerCase().includes(searchValue) ||
        (level.description && level.description.toLowerCase().includes(searchValue))
      );
    }),
  );

  deleteLevel(id: number) {
    if (confirm('Do you really want to delete this academic level?')) {
      this.academicLevelService.delete(id).subscribe({
        next: () => {
          this.levels.set((this.levels() ?? []).filter((l) => l.id !== id));
        },
        error: () => alert('Error deleting academic level'),
      });
    }
  }

  updateLevel(id: number) {
    this.router.navigate(['/academic-levels/update', id]);
  }

  detailLevel(id: number) {
    this.router.navigate(['/academic-levels', id]);
  }
}
