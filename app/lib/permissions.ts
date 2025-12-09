// Role-based permissions system for admin access control

export type Role = 'admin' | 'editor' | 'viewer';

export interface AdminUser {
  email: string;
  role: Role;
  name?: string;
}

// Define admin users
// To add more admins, simply add to this array
const ADMIN_USERS: AdminUser[] = [
  { 
    email: 'reckziegel.william96@gmail.com', 
    role: 'admin',
    name: 'Liam Reckziegel'
  },
  {
    email: 'reckziegel.william@gmail.com',
    role: 'admin',
    name: 'Liam Reckziegel'
  },
  // Add more admins here:
  // { email: 'another@example.com', role: 'editor', name: 'Editor Name' },
];

/**
 * Check if user has admin role
 */
export function isAdmin(user: any): boolean {
  if (!user?.email) return false;
  const adminUser = ADMIN_USERS.find(u => u.email === user.email);
  return adminUser?.role === 'admin';
}

/**
 * Check if user can edit content (admin or editor)
 */
export function canEdit(user: any): boolean {
  if (!user?.email) return false;
  const adminUser = ADMIN_USERS.find(u => u.email === user.email);
  return adminUser?.role === 'admin' || adminUser?.role === 'editor';
}

/**
 * Check if user can view admin area (any role)
 */
export function canView(user: any): boolean {
  if (!user?.email) return false;
  return ADMIN_USERS.some(u => u.email === user.email);
}

/**
 * Get user's role
 */
export function getUserRole(user: any): Role | null {
  if (!user?.email) return null;
  return ADMIN_USERS.find(u => u.email === user.email)?.role || null;
}

/**
 * Get admin user info
 */
export function getAdminUser(user: any): AdminUser | null {
  if (!user?.email) return null;
  return ADMIN_USERS.find(u => u.email === user.email) || null;
}

/**
 * Permission checks for specific features
 */
export const permissions = {
  blog: {
    create: (user: any) => canEdit(user),
    edit: (user: any) => canEdit(user),
    delete: (user: any) => isAdmin(user),
    publish: (user: any) => canEdit(user),
  },
  contact: {
    view: (user: any) => canView(user),
    delete: (user: any) => isAdmin(user),
  },
  analytics: {
    view: (user: any) => canView(user),
  },
  media: {
    upload: (user: any) => canEdit(user),
    delete: (user: any) => isAdmin(user),
  },
  settings: {
    view: (user: any) => isAdmin(user),
    edit: (user: any) => isAdmin(user),
  },
  users: {
    view: (user: any) => isAdmin(user),
    manage: (user: any) => isAdmin(user),
  },
};

