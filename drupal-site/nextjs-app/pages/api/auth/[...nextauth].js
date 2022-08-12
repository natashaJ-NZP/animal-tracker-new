/* USER AUTHORIZATION Configuration */

/* 
 * This file configures how Next-Auth in Next.js
 * communicates with the Simple O-Auth module in Drupal. These two 
 * Authentication software work together to validate a User when she signs in.
 * NOTE: You must use Next-Auth in Next.js if you're using Simple O-Auth in Drupal!
 */

 /* DOCUMENTATION: 
  *
  * 1. AUTHORIZATION CODE GRANT - https://next-drupal.org/docs/authentication/authorization-code-grant
  * 2. Next-Auth (for Next.js) - https://next-auth.js.org/getting-started/introduction
  * 3. Simple O-Auth (for Drupal) tutorial - https://www.drupal.org/project/simple_oauth/issues/3216850
  * 4. Next-Drupal Auth Example - https://github.com/shadcn/next-drupal-auth
  */


import NextAuth, { User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import jwt_decode from "jwt-decode"

import { clearJWT, getJWT } from "/lib/jwt"

export default NextAuth({
  //The pages 
  // pages: {
  //   signIn: "/signIn",
  // },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Drupal",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const formData = new URLSearchParams()
        formData.append("grant_type", "password")
        formData.append("client_id", process.env.DRUPAL_CLIENT_ID)
        formData.append("client_secret", process.env.DRUPAL_CLIENT_SECRET)
        formData.append("username", credentials.username)
        formData.append("password", credentials.password)

        // Get access token from Drupal.
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/oauth/token`,
          {
            method: "POST",
            body: formData,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )

        if (!response.ok) {
          return null
        }

        return {
          accessToken: await response.json(),
        }
      },
    }),
  ],
  events: {
    signOut: async function () {
      return await clearJWT()
    },
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        // Forward the accessToken to the session.
        token = {
          accessToken: user.accessToken,
          accessTokenExpires: Date.now() + user.accessToken.expires_in * 1000,
        }
      }

      return await getJWT(token)
    },
    async session({ session, token }) {
      if (token?.accessToken) {
        const accessToken = token.accessToken
        session.accessToken = accessToken

        // Decode token and pass info to session.
        // This data will be available client-side.
        const decoded = jwt_decode<User>(accessToken.access_token)
        session.user.id = decoded.id
        session.user.email = decoded.email
        session.user.name = decoded.name
      }
      return session
    },
  },
});


