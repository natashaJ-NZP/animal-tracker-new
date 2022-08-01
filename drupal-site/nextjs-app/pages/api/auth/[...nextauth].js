import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import jwt_decode from "jwt-decode"


export default NextAuth({
  providers: [
    {
      id: "drupal",
      name: "Next.js for Drupal",
      type: "oauth",
      version: "2.0",
      token: `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/oauth/token`,
      authorization: `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/oauth/authorize?response_type=code`,
      userinfo: `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/oauth/userinfo`,
      async profile(profile) {
        return {
          id: profile.sub,
          username: profile.preferred_username,
          email: profile.email,
        }
      },
      clientId: process.env.DRUPAL_CLIENT_ID,
      clientSecret: process.env.DRUPAL_CLIENT_SECRET,
    },

    
  ],
  jwt: {
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
    encryption: true,
  },
  callbacks: {
    async jwt({ token, user }) {
      // Forward the access token.
      if (user) {
        token.accessToken = user.access_token
      }

      return token
    },
    async session({ session, token }) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken
      }
      return session
    },
  },
  secret: process.env.JWT_SIGNING_PRIVATE_KEY,
})