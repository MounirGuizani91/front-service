export enum ProjectType {
  PROFESSIONAL = 'PROFESSIONAL',
  ACADEMIC = 'ACADEMIC',
  PERSONAL = 'PERSONAL',
}

export interface Project {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  projectType?: ProjectType;
  missionId?: number;
}
