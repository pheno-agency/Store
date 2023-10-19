import { serverAuth$ } from "@builder.io/qwik-auth";
import Credentials from "@auth/core/providers/credentials";
import type { Provider } from "@auth/core/providers";
import { createClient } from "~/db/schema/utils";
import { user } from "~/db/schema/user";
import { eq } from "drizzle-orm";
import { pbkdf2, pbkdf2Verify } from "~/utils/crypto";
import type {
  RequestEventBase,
  RequestEventCommon,
} from "@builder.io/qwik-city";
import type { Session } from "@auth/core/types";

class AuthError extends Error {}

declare module "@auth/core/types" {
  export interface Session {
    user: {
      id: number;
      name: string | null;
      email: string | null;
    };
  }
}

export const { onRequest, useAuthSession, useAuthSignin, useAuthSignout } =
  serverAuth$((req: RequestEventCommon) => ({
    callbacks: {
      session({ session, token }) {
        return {
          ...session,
          user: { ...session.user, id: token.id as number },
        };
      },
      async jwt({ token }) {
        const { db } = await createClient(req);
        const selectedUser = (
          await db
            .select()
            .from(user)
            .where(eq(user.email, token.email!))
            .execute()
        )[0];

        if (!selectedUser) {
          (
            await db
              .insert(user)
              .values({
                name: token.name!,
                email: token.email!,
              })
              .returning()
              .execute()
          )[0];
        }
        return { ...token, id: selectedUser.id };
      },
    },
    secret: req.env.get("AUTH_SECRET"),
    trustHost: true,
    providers: [
      Credentials({
        id: "credentials",
        name: "Credentials",
        credentials: {
          // name is defined only in Signup
          name: { label: "Name", type: "text" },
          email: { label: "Email", type: "text" },
          password: { label: "Password", type: "password" },
        },
        async authorize(_credentials) {
          const isSignup = !!_credentials.name;
          try {
            const credentials = _credentials as {
              name?: string;
              email: string;
              password: string;
            };
            const { db } = await createClient(req);
            let selectedUser = (
              await db
                .select()
                .from(user)
                .where(eq(user.email, credentials.email))
                .execute()
            )[0];

            let justCreated = false;
            if (!selectedUser) {
              if (isSignup) {
                // sign up
                justCreated = true;
                selectedUser = (
                  await db
                    .insert(user)
                    .values({
                      name: credentials.name!,
                      email: credentials.email,
                      password: await pbkdf2(credentials.password),
                    })
                    .returning()
                    .execute()
                )[0];
              } else {
                throw new AuthError("User does not exist.");
              }
            }
            if (
              !justCreated &&
              !(await pbkdf2Verify(
                selectedUser.password!,
                credentials.password,
              ))
            ) {
              return null;
            }
            return {
              id: `${selectedUser.id}`,
              email: selectedUser.email,
              name: selectedUser.name,
            };
          } catch (err: unknown) {
            const isAuthError = err instanceof AuthError;
            if (err instanceof Error) {
              const url = new URL(req.url);
              for (const k of url.searchParams.keys()) {
                url.searchParams.delete(k);
              }
              url.searchParams.set(
                isSignup ? "sign-up" : "sign-in",
                isAuthError ? err.message : "An error occured",
              );
              req.headers.set("location", url.toString());
            }
            return null;
          }
        },
      }),
    ] as Provider[],
  }));

export const getSession = (req: RequestEventBase) => {
  const session: Session | null = req.sharedMap.get("session");
  return session;
};
