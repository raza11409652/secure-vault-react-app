export interface ShareBody {
  content: string;
}

export interface ShareVaultQuery {
  page: number;
}
export interface ShareVaultListApiResponse {
  totalCount: number;
  records?: ShareVault[] | null;
  totalPages: number;
  currentPage: number;
}
export interface ShareVault {
  _id: string;
  findingKey: string;
  url: string;
  maxViewAllowed: number;
  viewCount: number;
  createdAt: string;
}

export interface VaultCreateBody {
  name: string;
  type: string;
  url: string;
  username: string;
  password: string;
  notes: string;
  team: string;
}

export interface VaultListApiResponse {
  totalCount: number;
  records?: Vault[] | null;
  totalPages: number;
  currentPage: number;
}
export interface Vault {
  _id: string;
  name: string;
  type: string;
  url: string;
  createdAt?: string;
}

export interface VaultViewDetailsBody {
  password?: string;
  id: string;
}

export interface VaultDetails {
  name: string;
  type: string;
  password: string;
  username: string;
  notes?: string;
  url?: string;
}

export interface ShareViewDetails {
  content: string;
}
