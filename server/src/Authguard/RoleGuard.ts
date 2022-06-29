import { SetMetadata } from '@nestjs/common';
import { userRoles } from "../userRole";

export const ROLES_KEY = 'roles';
export const RoleGuard = (...roles: userRoles[]) => SetMetadata(ROLES_KEY, roles);