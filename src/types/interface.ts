export interface User {
  id: number;
  email: string;
  username: string;
}

export interface Athlete {
  id: number;
  user: User;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dateOfBirth: string;
  inscriptions: Inscription[];
}

export interface Inscription {
  id: number;
  edition: Edition;
  validated: boolean;
  va: VA;
  certificate: Certificate;
  race: Race;
  team: Team;
}

export interface Edition {
  id: number;
  name: string;
}

export interface VA {
  id: number;
}

export interface Certificate {
  id: number;
  status: number;
}

export interface Race {
  id: number;
  name: string;
}

export interface Team {
  id: number;
  name: string;
}
