import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    GitHub({
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),
  ],
  debug: true, // Enable debug mode to see what's happening
  trustHost: true,
  basePath: '/api/auth',
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
    jwt({ token, profile, account }) {
      if (profile) {
        token.id = profile.id;
        // Ensure email is captured from GitHub profile
        if (profile.email) {
          token.email = profile.email;
        }
      }
      return token;
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        // Ensure email is in session
        if (token.email) {
          session.user.email = token.email as string;
        }
      }
      return session;
    }
  }
});