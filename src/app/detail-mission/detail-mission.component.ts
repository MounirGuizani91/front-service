import { Component, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MissionService } from '../service/mission.service';
import { RouterModule } from '@angular/router';
import { Mission } from '../model/mission.model';

@Component({
  selector: 'app-detail-mission',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe],
  templateUrl: './detail-mission.component.html',
  styleUrl: './detail-mission.component.scss',
})
export class DetailMissionComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  missionService = inject(MissionService);
  missionId: number | undefined;
  mission: Mission | undefined;

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.missionId = +id;
        this.missionService.getById(this.missionId).subscribe((mission) => {
          this.mission = mission;
        });
      }
    });
  }
}
