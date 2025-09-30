export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt?: string;
  updatedAt?: string | null;
  userBoards?: any[];
  authorities?: any[];
  username?: string;
  accountNonExpired?: boolean;
  accountNonLocked?: boolean;
  credentialsNonExpired?: boolean;
  enabled?: boolean;
}
