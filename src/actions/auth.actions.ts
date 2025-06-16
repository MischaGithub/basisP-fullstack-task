"use server";

import { prisma } from "@/db/prisma";
import bcrypt from "bcryptjs";
import { logEvent } from "@/lib/sentry";
import { signAuthToken, setAuthCookie, removeAuthCookie } from "@/lib/auth";

type ResponseResult = {
  success: boolean;
  message: string;
};

// Define a type for your response including user
type LoginResponse = {
  success: boolean;
  message: string;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: Date;
  } | null;
};

// REGISTER
export async function registerUser(
  prevState: ResponseResult,
  formData: FormData
): Promise<ResponseResult> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!name || !email || !password || !confirmPassword) {
    logEvent("Missing registration fields", "auth", { email }, "warning");
    return { success: false, message: "All fields are required" };
  }

  if (password !== confirmPassword) {
    logEvent("Password mismatch", "auth", { email }, "warning");
    return { success: false, message: "Passwords do not match" };
  }

  if (password.length < 6) {
    logEvent("Password too short", "auth", { email }, "warning");
    return {
      success: false,
      message: "Password must be at least 6 characters",
    };
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      logEvent("User already exists", "auth", { email }, "warning");
      return { success: false, message: "User already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    const token = await signAuthToken({ userId: user.id });
    await setAuthCookie(token);

    logEvent("User registered", "auth", { userId: user.id, email }, "info");
    return { success: true, message: "User registered successfully" };
  } catch (error) {
    logEvent("Registration error", "auth", {}, "error", error);
    return { success: false, message: "Something went wrong" };
  }
}

// LOGIN
export async function loginUser(
  prevState: ResponseResult,
  formData: FormData
): Promise<LoginResponse> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    logEvent("Missing login fields", "auth", { email }, "warning");
    return {
      success: false,
      message: "Email and password are required",
      user: null,
    };
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.password) {
      logEvent("Login failed - user not found", "auth", { email }, "warning");
      return { success: false, message: "Invalid credentials", user: null };
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      logEvent("Login failed - wrong password", "auth", { email }, "warning");
      return { success: false, message: "Invalid credentials", user: null };
    }

    const token = await signAuthToken({ userId: user.id });
    await setAuthCookie(token);

    logEvent("User logged in", "auth", { userId: user.id, email }, "info");

    // Return the user info here as well
    return {
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    };
  } catch (error) {
    logEvent("Login error", "auth", {}, "error", error);
    return { success: false, message: "Login failed", user: null };
  }
}

// LOGOUT
export async function logoutUser(): Promise<ResponseResult> {
  try {
    await removeAuthCookie();
    logEvent("User logged out", "auth", {}, "info");
    return { success: true, message: "Logged out successfully" };
  } catch (error) {
    logEvent("Logout error", "auth", {}, "error", error);
    return { success: false, message: "Logout failed" };
  }
}
