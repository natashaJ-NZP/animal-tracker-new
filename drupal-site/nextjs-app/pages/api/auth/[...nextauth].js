import NextAuth, { User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import jwt_decode from "jwt-decode"


import { clearJWT, getJWT } from "/lib/jwt"

export default NextAuth({
  pages: {
    signIn: "/signIn",
  },
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




// import NextAuth from "next-auth"
// import CredentialsProvider from "next-auth/providers/credentials"
// import jwt_decode from "jwt-decode"


// export default NextAuth({
//   providers: [
//     {
//       id: "drupal",
//       name: "Next.js for Drupal",
//       type: "oauth",
//       version: "2.0",
//       token: `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/oauth/token`,
//       authorization: `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/oauth/authorize?response_type=code`,
//       userinfo: `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/oauth/userinfo`,
//       async profile(profile) {
//         return {
//           id: profile.sub,
//           username: profile.preferred_username,
//           email: profile.email,
//         }
//       },
//       clientId: process.env.DRUPAL_CLIENT_ID,
//       clientSecret: process.env.DRUPAL_CLIENT_SECRET,
//     },

    
//   ],
//   jwt: {
//     signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
//     encryption: true,
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       // Forward the access token.
//       if (user) {
//         token.accessToken = user.access_token
//       }

//       return token
//     },
//     async session({ session, token }) {
//       if (token?.accessToken) {
//         session.accessToken = token.accessToken
//       }
//       return session
//     },
//   },
//   secret: process.env.JWT_SIGNING_PRIVATE_KEY,
// })