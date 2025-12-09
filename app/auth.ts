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
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
      authorization: {
        params: {
          scope: 'read:user user:email',
        },
      },
      async profile(profile, tokens) {
        console.log('GitHub profile received:', profile);
        
        // If email is not in profile, fetch it from the emails API
        let email = profile.email;
        
        if (!email && tokens.access_token) {
          try {
            const emailsResponse = await fetch('https://api.github.com/user/emails', {
              headers: {
                Authorization: `Bearer ${tokens.access_token}`,
              },
            });
            
            if (emailsResponse.ok) {
              const emails = await emailsResponse.json();
              // Find the primary email or the first verified email
              const primaryEmail = emails.find((e: any) => e.primary && e.verified);
              const verifiedEmail = emails.find((e: any) => e.verified);
              email = primaryEmail?.email || verifiedEmail?.email || emails[0]?.email;
              console.log('Fetched email from API:', email);
            }
          } catch (error) {
            console.error('Error fetching user emails:', error);
          }
        }
        
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: email,
          image: profile.avatar_url,
        };
      },
    }),
  ],
  debug: true,
  trustHost: true,
  basePath: '/api/auth',
  secret: process.env.AUTH_SECRET,
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