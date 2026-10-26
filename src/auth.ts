
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/signin"
  },
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email"
        },
        password: {
          label: "Password",
          type: "password"
        }
      },
      async authorize(credentials) {
        const email = String(credentials.email ?? "");
        const password = String(credentials.password ?? "");

        if (
          email === "demo@shopsphere.com" &&
          password === "Shop1234!"
        ) {
          return {
            id: "demo-user-1",
            name: "ShopSphere Demo",
            email
          };
        }

        return null;
      }
    })
  ]
});
