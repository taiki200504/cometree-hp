
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { getCurrentUser, requireAuth, requireAdmin } from '../auth';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mocking dependencies
vi.mock('@supabase/auth-helpers-nextjs', () => ({
  createRouteHandlerClient: vi.fn(),
}));

vi.mock('next/headers', () => ({
  cookies: vi.fn(),
}));

// Create stable mock functions
const mockGetUser = vi.fn();
const mockSingle = vi.fn();
const mockEq = vi.fn(() => ({ single: mockSingle }));
const mockSelect = vi.fn(() => ({ eq: mockEq }));
const mockFrom = vi.fn(() => ({ select: mockSelect }));

const supabaseClientMock = {
  auth: { getUser: mockGetUser },
  from: mockFrom,
};

describe('lib/auth.ts', () => {

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
    // Setup the main mock return value
    (createRouteHandlerClient as vi.Mock).mockReturnValue(supabaseClientMock);
    (cookies as vi.Mock).mockReturnValue('dummy-cookies');
  });

  describe('getCurrentUser', () => {
    it('should return null if no user is authenticated', async () => {
      mockGetUser.mockResolvedValue({ data: { user: null }, error: null });
      const user = await getCurrentUser();
      expect(user).toBeNull();
    });

    it('should return user with profile', async () => {
      const mockUser = { id: '123', email: 'test@example.com', user_metadata: { name: 'Test User' } };
      const mockProfile = { full_name: 'Profile Name', role: 'admin' };
      mockGetUser.mockResolvedValue({ data: { user: mockUser }, error: null });
      mockSingle.mockResolvedValue({ data: mockProfile, error: null });

      const user = await getCurrentUser();

      expect(user).toEqual({
        id: '123',
        email: 'test@example.com',
        name: 'Profile Name',
        role: 'admin',
        organization_id: null,
      });
      expect(createRouteHandlerClient).toHaveBeenCalledWith({ cookies: expect.any(Function) });
      expect(mockFrom).toHaveBeenCalledWith('users');
      expect(mockSelect).toHaveBeenCalledWith('full_name, role');
      expect(mockEq).toHaveBeenCalledWith('id', '123');
    });
  });

  describe('requireAuth', () => {
    it('should throw error if user is not authenticated', async () => {
      mockGetUser.mockResolvedValue({ data: { user: null }, error: null });
      await expect(requireAuth({} as any)).rejects.toThrow('Authentication required');
    });

    it('should return user if authenticated', async () => {
      const mockUser = { id: '123', email: 'test@example.com' };
      mockGetUser.mockResolvedValue({ data: { user: mockUser }, error: null });
      mockSingle.mockResolvedValue({ data: { full_name: 'Test', role: 'user' }, error: null });

      const user = await requireAuth({} as any);
      expect(user?.id).toBe('123');
    });
  });

  describe('requireAdmin', () => {
    it('should throw error if user is not authenticated', async () => {
      mockGetUser.mockResolvedValue({ data: { user: null }, error: null });
      await expect(requireAdmin({} as any)).rejects.toThrow('Authentication required');
    });

    it('should throw error if user is not an admin', async () => {
      const mockUser = { id: '123', email: 'test@example.com' };
      const mockProfile = { full_name: null, role: 'user' };
      mockGetUser.mockResolvedValue({ data: { user: mockUser }, error: null });
      mockSingle.mockResolvedValue({ data: mockProfile, error: null });

      await expect(requireAdmin({} as any)).rejects.toThrow('Admin access required');
    });

    it('should return user if user is an admin', async () => {
      const mockUser = { id: '123', email: 'test@example.com' };
      const mockProfile = { full_name: 'Admin', role: 'admin' };
      mockGetUser.mockResolvedValue({ data: { user: mockUser }, error: null });
      mockSingle.mockResolvedValue({ data: mockProfile, error: null });

      const user = await requireAdmin({} as any);
      expect(user?.role).toBe('admin');
    });
  });
});
