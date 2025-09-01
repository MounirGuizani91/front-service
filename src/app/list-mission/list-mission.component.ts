import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Mission } from '../model/mission.model';
import { MissionService } from '../service/mission.service';
import { MissionPage } from '../model/mission-page.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-mission',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list-mission.component.html',
  styleUrl: './list-mission.component.scss',
})
export class ListMissionComponent {
  missions = signal<Mission[]>([]);

  missionService = inject(MissionService);

  search = signal('');
  router = inject(Router);
  page = signal(0);
  pageSize = signal(6);
  totalElements = signal(0);
  Math = Math;

  ngOnInit(): void {
    this.loadMissions();
  }

  loadMissions() {
    this.missionService.getAllPaged(this.page(), this.pageSize()).subscribe({
      next: (res: MissionPage) => {
        this.missions.set(res.missions);
        this.totalElements.set(res.totalElements);
      },
      error: (err) => console.error('Error loading missions', err),
    });
  }

  filteredMissions = computed(() =>
    (this.missions() ?? []).filter((m: Mission) => {
      const searchValue = this.search().toLowerCase();
      return (
        m.name.toLowerCase().includes(searchValue) ||
        m.responsibility?.toLowerCase().includes(searchValue) ||
        m.clientName?.toLowerCase().includes(searchValue) ||
        (m.startDate && m.startDate.toString().toLowerCase().includes(searchValue)) ||
        (m.endDate && m.endDate.toString().toLowerCase().includes(searchValue))
      );
    }),
  );

  deleteMission(id: number) {
    if (confirm('Do you really want to delete this mission?')) {
      this.missionService.delete(id).subscribe({
        next: () => {
          this.missions.set((this.missions() ?? []).filter((m) => m.id !== id));
        },
        error: () => alert('Error deleting mission'),
      });
    }
  }
  detailsMission(id: number) {
    this.router.navigate(['/missions', id, 'details']);
  }
}
