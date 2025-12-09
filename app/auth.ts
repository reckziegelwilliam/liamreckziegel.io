import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

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
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code'
        }
      }
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
    async signIn({ user, account, profile }) {
      // Restrict access to only your email
      const allowedEmail = process.env.ALLOWED_EMAIL;
      
      if (!allowedEmail) {
        console.error('ALLOWED_EMAIL environment variable is not set');
        return '/?error=unauthorized';
      }
      
      // Check email from user object or profile
      const email = user?.email || profile?.email;
      
      if (email && email.toLowerCase() === allowedEmail.toLowerCase()) {
        return true;
      }
      
      console.log(`Access denied for email: ${email}`);
      // Redirect to homepage with error parameter
      return '/?error=unauthorized';
    },
    async jwt({ token, account, profile }) {
      // On first sign in, fetch user data
      if (account && profile) {
        token.id = profile.id;
        token.email = profile.email;
        
        // Handle different provider structures
        if (account.provider === 'github') {
          token.name = profile.name || (profile as any).login;
          token.picture = (profile as any).avatar_url;
          
          // If no email in profile, fetch from GitHub API
          if (!token.email && account.access_token) {
            try {
              const response = await fetch('https://api.github.com/user/emails', {
                headers: {
                  Authorization: `Bearer ${account.access_token}`,
                  Accept: 'application/vnd.github.v3+json',
                },
              });
              
              if (response.ok) {
                const emails = await response.json();
                const primaryEmail = emails.find((e: any) => e.primary && e.verified);
                const verifiedEmail = emails.find((e: any) => e.verified);
                token.email = primaryEmail?.email || verifiedEmail?.email;
              }
            } catch (error) {
              console.error('Error fetching GitHub emails:', error);
            }
          }
        } else if (account.provider === 'google') {
          token.name = profile.name;
          token.picture = (profile as any).picture;
        }
      }
      return token;
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.image = token.picture as string;
      }
      return session;
    }
  }
});