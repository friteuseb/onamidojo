import type { Access, FieldAccess } from 'payload'

type UserRole = 'admin' | 'editor' | 'author'

interface UserWithRole {
  role?: UserRole
  id: string
}

export function hasRole(user: UserWithRole | null, ...roles: UserRole[]): boolean {
  if (!user?.role) return false
  return roles.includes(user.role)
}

export const isAdmin: Access = ({ req: { user } }) =>
  hasRole(user as UserWithRole | null, 'admin')

export const isAdminOrEditor: Access = ({ req: { user } }) =>
  hasRole(user as UserWithRole | null, 'admin', 'editor')

export const isAuthenticated: Access = ({ req: { user } }) => Boolean(user)

export const anyone: Access = () => true

export const adminOnly: FieldAccess = ({ req: { user } }) =>
  hasRole(user as UserWithRole | null, 'admin')
