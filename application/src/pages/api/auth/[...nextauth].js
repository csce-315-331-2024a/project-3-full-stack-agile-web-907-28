import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { query } from '../../../utils/db';


export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      // console.log('signIn callback');
      const email = user.email;
      const result = await query('SELECT * FROM users WHERE email = $1;', [email]);
      if (result.rows.length === 0) {
        return true;
      }
      // User exists, proceed with sign-in
      console.log(result.rows[0])
      return true;
    },
    async session({ session, user, token }) {
      // Check if this is a new user again (consider optimizing this step)
      const result = await query('SELECT * FROM users WHERE email = $1;', [session.user.email]);
      session.user.isNewUser = result.rows.length === 0; // Add a flag to the session
      return session;
    },
    async redirect({ url, baseUrl, session }) {
      // Check if the user was flagged as new in the session callback
      if (session?.user?.isNewUser) {
        // console.log('redirecting new user');
        // Redirect new users to the credentials page
        return `${baseUrl}/credentials`; // Adjust the path as necessary
      }
      // console.log('redirecting existing user');
      // For existing users, or any other redirects, return the original URL or the base URL
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  }
  // Additional NextAuth configuration options...
});
