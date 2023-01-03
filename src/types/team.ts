export interface Team {
  id: number;
  name: string;
  members: Member[];
  race: Race;
  admins: Admin[];
}

export interface Member {
  id: number;
  athlete: Athlete;
  validated: boolean;
}

export interface Athlete {
  id: number;
  firstName: string;
  lastName: string;
  user: User;
}

export interface User {
  id: number;
  email: string;
  username: string;
}

export interface Race {
  id: number;
  name: string;
  category: Category;
}

export interface Category {
  id: number;
  maxTeamMembers: number;
  minTeamMembers: number;
}

export interface Admin {
  id: number;
  adminInscription: AdminInscription;
}

export interface AdminInscription {
  id: number;
  athleteId: number;
}
