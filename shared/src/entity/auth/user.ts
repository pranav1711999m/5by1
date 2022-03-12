import { Branch } from './branch';

export interface Permission {
    key: string;
    name: string;
    operations: Record<string, boolean>;
}
export interface User {
    id?: string;
    name?: string;
    email?: string;
    password?: string;
    permissions?: Record<string, Permission>;
    branches?: Array<Branch>;
    branchIds?: Array<string>;
}
