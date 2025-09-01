export enum LevelType {
  BACHELOR = 'BACHELOR',
  MASTER = 'MASTER',
  DOCTORATE = 'DOCTORATE',
  CERTIFICATE = 'CERTIFICATE',
  OTHER = 'OTHER',
}

export interface AcademicLevel {
  id: number;
  name: string;
  description?: string;
  school: string;
  levelType: LevelType;
  country: string;
}
