"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export async function signupAction(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const password_confirm = formData.get("password_confirm") as string;
  const role = formData.get("role") as string;
  const first_name = formData.get("first_name") as string;
  const last_name = formData.get("last_name") as string;
  
  // Transform role to match backend ENUM (e.g. "Candidate" -> "CANDIDATE")
  const account_type = role.toUpperCase();

  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/signup/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        password_confirm,
        account_type,
        first_name,
        last_name,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      // Return the first string error message from the object dictionary if it exists
      const errorMessage = typeof data === 'object' ? Object.values(data).flat()[0] as string : "Signup failed. Please try again.";
      return {
        error: errorMessage,
      };
    }

    // On successful signup, tokens are returned. Store them.
    if (data.tokens) {
      const cookieStore = await cookies();
      cookieStore.set("jwt_access", data.tokens.access, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60, // 1 hour
      });

      cookieStore.set("jwt_refresh", data.tokens.refresh, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      // Session cookie for Navbar detection
      cookieStore.set("skillsync_session", "true", {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
    }

  } catch (err: any) {
    return {
      error: "Unable to connect to the server. Please try again later.",
    };
  }

  // Redirect after successfully setting cookies
  redirect("/dashboard");
}

export async function companySignupAction(prevState: any, formData: FormData) {
  const company_name = formData.get("companyName") as string;
  const tax_id = (formData.get("taxId") as string) || "";
  const industry = (formData.get("industry") as string) || "";
  const size = (formData.get("companySize") as string) || "";
  const website = (formData.get("website") as string) || "";
  
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const password_confirm = formData.get("password_confirm") as string;

  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/company/signup/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        company_name,
        tax_id,
        industry,
        size,
        website,
        email,
        password,
        password_confirm,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      // Return the first string error message from the object dictionary if it exists
      const errorMessage = typeof data === 'object' ? Object.values(data).flat()[0] as string : "Company Registration failed. Please try again.";
      return {
        error: errorMessage,
      };
    }

    // On successful signup, tokens are returned. Store them.
    if (data.tokens) {
      const cookieStore = await cookies();
      cookieStore.set("jwt_access", data.tokens.access, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60, // 1 hour
      });

      cookieStore.set("jwt_refresh", data.tokens.refresh, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      // Session cookie for Navbar detection
      cookieStore.set("skillsync_session", "true", {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
    }

  } catch (err: any) {
    return {
      error: "Unable to connect to the server. Please try again later.",
    };
  }

  // Redirect after successfully setting cookies
  return { success: true };
}


export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
        return {
          error: data.error || "Invalid email or password.",
        };
    }

    // Success, store tokens in HttpOnly cookies
    if (data.tokens) {
      const cookieStore = await cookies();
      cookieStore.set("jwt_access", data.tokens.access, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60, // 1 hour
      });

      cookieStore.set("jwt_refresh", data.tokens.refresh, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      // Session cookie for Navbar detection
      cookieStore.set("skillsync_session", "true", {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
    }

  } catch (err: any) {
    return {
      error: "Unable to connect to the server. Please try again later.",
    };
  }

  // Redirect to dashboard internally via Next route
  redirect("/dashboard");
}

export async function getCandidateProfileAction() {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt_access")?.value;

  if (!token) return { error: "Not authenticated" };

  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/candidate/profile/`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      if (res.status === 401) return { error: "Unauthorized" };
      return { error: "Failed to fetch profile" };
    }

    return await res.json();
  } catch (err) {
    return { error: "Network error" };
  }
}

export async function updateCandidateProfileAction(data: any) {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt_access")?.value;

  if (!token) return { error: "Not authenticated" };

  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/candidate/profile/`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return { error: errorData.error || "Update failed" };
    }

    return { success: true, data: await res.json() };
  } catch (err) {
    return { error: "Network error" };
  }
}

export async function getCompanyProfileAction() {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt_access")?.value;

  if (!token) return { error: "Not authenticated" };

  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/company/profile/`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      if (res.status === 401) return { error: "Unauthorized" };
      return { error: "Failed to fetch profile" };
    }

    return await res.json();
  } catch (err) {
    return { error: "Network error" };
  }
}

export async function updateCompanyProfileAction(data: any) {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt_access")?.value;

  if (!token) return { error: "Not authenticated" };

  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/company/profile/`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return { error: errorData.error || "Update failed" };
    }

    return { success: true, data: await res.json() };
  } catch (err) {
    return { error: "Network error" };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("jwt_access");
  cookieStore.delete("jwt_refresh");
  cookieStore.delete("skillsync_session");
  redirect("/auth/signin");
}

export async function socialLoginAction(provider: "google" | "linkedin", token: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/social/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ provider, token }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { error: data.error || "Social authentication failed." };
    }

    if (data.tokens) {
      const cookieStore = await cookies();
      cookieStore.set("jwt_access", data.tokens.access, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60, // 1 hour
      });

      cookieStore.set("jwt_refresh", data.tokens.refresh, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
      
      // Legacy session cookie for Navbar detection
      cookieStore.set("skillsync_session", "true", {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
    }

    return { success: true };
  } catch (err: any) {
    return { error: "Unable to connect to the server." };
  }
}
