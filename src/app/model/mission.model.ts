import { Project } from './project.model';
export interface Mission {
  id: number;
  name: string;
  responsibility: string;
  startDate: string;
  endDate: string;
  clientName: string;
  projects: Project[];
}
