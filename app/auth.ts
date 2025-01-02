import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [GitHub],
  debug: false,
  trustHost: true,
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true
      }
    }
  },
  callbacks: {
    jwt({ token, profile }) {
      if (profile) {
        token.id = profile.id;
      }
      return token;
    }
  }
});