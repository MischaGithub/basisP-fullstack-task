import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { logEvent } from "./sentry";

const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
const cookieName = "auth_token";

// Encrypt the auth token
// This function is used to sign the auth token
export async function signAuthToken(payload: any) {
  try {
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(secret);

    return token;
  } catch (error) {
    throw new Error("Token signing failed");
  }
}

// Decrypt and verify token
// This function is used to verify the auth token
export async function verifyAuthToken<T>(token: string): Promise<T> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as T;
  } catch (error) {
    logEvent(
      "Token decryption failed",
      "auth",
      { tokenSnippet: token.slice(0, 10) },
      "error",
      error
    );
    throw new Error("Token decryption failed");
  }
}

// Set the auth cookie
// This function is used to set the auth token in the cookie
export async function setAuthCookie(token: string) {
  try {
    const cookieStore = await cookies();
    cookieStore.set(cookieName, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
  } catch (error) {
    logEvent("Failed to set cookie", "auth", { token }, "error", error);
  }
}

// Get the auth cookie
// This function is used to retrieve the auth token from the cookie
export async function getAuthCookie() {
  const cookieStore = await cookies();
  const token = cookieStore.get(cookieName);

  return token?.value;
}

// Remove the auth cookie
// This function is used to remove the auth token from the cookie
export async function removeAuthCookie() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(cookieName);
  } catch (error) {
    logEvent("Failed to remove the auth cookie", "auth", {}, "error", error);
  }
}
