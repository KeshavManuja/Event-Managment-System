import { SetMetadata } from '@nestjs/common';
import { userRoles } from 'src/userRole';
export const ROLES_KEY = 'roles';
export const Role = (...roles: userRoles[]) => SetMetadata(ROLES_KEY, roles);