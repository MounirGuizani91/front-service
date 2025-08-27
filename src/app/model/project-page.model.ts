import { Project } from './project.model';

export interface ProjectPage {
  projects: Project[];
  totalElements: number;
}
