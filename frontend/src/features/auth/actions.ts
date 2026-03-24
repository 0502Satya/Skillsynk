"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

async function refreshAccessToken() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("jwt_refresh")?.value;
  if (!refreshToken) return null;

  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!res.ok) return null;
    const data = await res.json();
    
    if (data.access) {
      cookieStore.set("jwt_access", data.access, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60, // 1 hour
      });
      
      if (data.refresh) {
        cookieStore.set("jwt_refresh", data.refresh, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24 * 7, // 7 days
        });
      }
      return data.access; // Return the new token directly
    }
    return null;
  } catch (err) {
    return null;
  }
}

async function authenticatedFetch(url: string, options: RequestInit = {}) {
  const cookieStore = await cookies();
  let token = cookieStore.get("jwt_access")?.value;

  // 1. If no token, attempt immediate refresh
  if (!token) {
    token = await refreshAccessToken();
  }

  // 2. Initial attempt (if token exists or was just refreshed)
  let res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  // 3. If 401 Unauthorized, try refresh and retry ONCE
  if (res.status === 401) {
    token = await refreshAccessToken();
    if (token) {
      res = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        },
      });
    }
  }

  return res;
}

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

    if (data.requires_verification) {
      return {
        success: true,
        requiresVerification: true,
        email: email
      };
    }

    // On successful signup (if verification was skipped or disabled), tokens are returned. Store them.
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
      cookieStore.set("joblyne_session", "true", {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      if (data.user?.account_type) {
        cookieStore.set("joblyne_role", data.user.account_type, {
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        });
      }

      // Redirect after successfully setting cookies
      redirect("/dashboard");
    }

    return { success: true };

  } catch (err: any) {
    if (err.digest?.startsWith("NEXT_REDIRECT")) throw err;
    return {
      error: "Unable to connect to the server. Please try again later.",
    };
  }
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

    if (data.requires_verification) {
      return {
        success: true,
        requiresVerification: true,
        email: email
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
      cookieStore.set("joblyne_session", "true", {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      if (data.user?.account_type) {
        cookieStore.set("joblyne_role", data.user.account_type, {
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        });
      }
      
      return { success: true, redirect: "/dashboard" };
    }

    return { success: true };

  } catch (err: any) {
    return {
      error: "Unable to connect to the server. Please try again later.",
    };
  }
}

export async function recruiterSignupAction(prevState: any, formData: FormData) {
  const full_name = formData.get("full_name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const password_confirm = formData.get("password_confirm") as string;
  const company_name = formData.get("companyName") as string;
  const designation = formData.get("designation") as string;

  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/recruiter/signup/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        full_name,
        email,
        password,
        password_confirm,
        company_name,
        designation,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      const errorMessage = typeof data === 'object' ? Object.values(data).flat()[0] as string : "Recruiter registration failed.";
      return { error: errorMessage };
    }

    if (data.requires_verification) {
      return {
        success: true,
        requiresVerification: true,
        email: email
      };
    }

    if (data.tokens) {
      const cookieStore = await cookies();
      cookieStore.set("jwt_access", data.tokens.access, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60,
      });

      cookieStore.set("jwt_refresh", data.tokens.refresh, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      cookieStore.set("joblyne_session", "true", {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      if (data.user?.account_type) {
        cookieStore.set("joblyne_role", data.user.account_type, {
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        });
      }

      redirect("/dashboard");
    }

    return { success: true };

  } catch (err: any) {
    if (err.digest?.startsWith("NEXT_REDIRECT")) throw err;
    return { error: "Unable to connect to the server." };
  }
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
      cookieStore.set("joblyne_session", "true", {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      if (data.user?.account_type) {
        cookieStore.set("joblyne_role", data.user.account_type, {
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        });
      }
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
  try {
    const res = await authenticatedFetch(`${API_BASE_URL}/api/auth/candidate/profile/`);

    if (!res.ok) {
      if (res.status === 401) return { error: "Not authenticated" };
      return { error: "Failed to fetch profile" };
    }

    return await res.json();
  } catch (err) {
    return { error: "Network error" };
  }
}

export async function updateCandidateProfileAction(data: any) {
  try {
    const res = await authenticatedFetch(`${API_BASE_URL}/api/auth/candidate/profile/`, {
      method: "PATCH",
      headers: {
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
  try {
    const res = await authenticatedFetch(`${API_BASE_URL}/api/auth/company/profile/`);

    if (!res.ok) {
      if (res.status === 401) return { error: "Not authenticated" };
      return { error: "Failed to fetch profile" };
    }

    return await res.json();
  } catch (err) {
    return { error: "Network error" };
  }
}

export async function updateCompanyProfileAction(data: any) {
  try {
    const res = await authenticatedFetch(`${API_BASE_URL}/api/auth/company/profile/`, {
      method: "PATCH",
      headers: {
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
  cookieStore.delete("joblyne_session");
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
      cookieStore.set("joblyne_session", "true", {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      if (data.user?.account_type) {
        cookieStore.set("joblyne_role", data.user.account_type, {
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        });
      }
    }

    return { success: true };
  } catch (err: any) {
    return { error: "Unable to connect to the server." };
  }
}

export async function verifyOtpAction(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const otp_code = formData.get("otp_code") as string;

  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/verify-otp/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp_code }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { error: data.error || "Verification failed." };
    }

    if (data.tokens) {
      const cookieStore = await cookies();
      cookieStore.set("jwt_access", data.tokens.access, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60,
      });

      cookieStore.set("jwt_refresh", data.tokens.refresh, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      cookieStore.set("joblyne_session", "true", {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      if (data.user?.account_type) {
        cookieStore.set("joblyne_role", data.user.account_type, {
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        });
      }
    }

  } catch (err) {
    return { error: "Unable to connect to the server." };
  }

  redirect("/dashboard");
}

export async function getJobsAction(params: { 
  query?: string; 
  location?: string; 
  experience?: string; 
  salary_min?: string; 
  salary_max?: string; 
  employment_type?: string; 
} = {}) {
  const { query = "", location = "", experience = "", salary_min = "", salary_max = "", employment_type = "" } = params;
  
  let url = `${API_BASE_URL}/api/auth/jobs/?query=${query}&location=${location}`;
  if (experience) url += `&experience=${experience}`;
  if (salary_min) url += `&salary_min=${salary_min}`;
  if (salary_max) url += `&salary_max=${salary_max}`;
  if (employment_type) url += `&employment_type=${employment_type}`;

  try {
    const res = await authenticatedFetch(url);

    if (!res.ok) return { error: "Failed to fetch jobs" };
    return await res.json();
  } catch (err) {
    return { error: "Network error" };
  }
}

export async function getJobDetailAction(jobId: string) {
  try {
    const res = await authenticatedFetch(`${API_BASE_URL}/api/auth/jobs/${jobId}/`);

    if (!res.ok) return { error: "Failed to fetch job details" };
    return await res.json();
  } catch (err) {
    return { error: "Network error" };
  }
}

export async function applyToJobAction(jobId: string) {
  try {
    const res = await authenticatedFetch(`${API_BASE_URL}/api/auth/applications/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ job: jobId }),
    });

    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to apply" };
    return data;
  } catch (err) {
    return { error: "Network error" };
  }
}

export async function getDashboardStatsAction() {
  try {
    const res = await authenticatedFetch(`${API_BASE_URL}/api/auth/applications/stats/`);

    if (!res.ok) return { error: "Failed to fetch stats" };
    return await res.json();
  } catch (err) {
    return { error: "Network error" };
  }
}

export async function getActionPlanAction() {
  try {
    const res = await authenticatedFetch(`${API_BASE_URL}/api/auth/candidate/action-plan/`);

    if (!res.ok) return { error: "Failed to fetch action plan" };
    return await res.json();
  } catch (err) {
    return { error: "Network error" };
  }
}

export async function getSavedJobsAction() {
  try {
    const res = await authenticatedFetch(`${API_BASE_URL}/api/auth/saved-jobs/`);

    if (!res.ok) return { error: "Failed to fetch saved jobs" };
    return await res.json();
  } catch (err) {
    return { error: "Network error" };
  }
}

export async function saveJobAction(jobId: string) {
  try {
    const res = await authenticatedFetch(`${API_BASE_URL}/api/auth/saved-jobs/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ job: jobId }),
    });

    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to save job" };
    return data;
  } catch (err) {
    return { error: "Network error" };
  }
}

export async function unsaveJobAction(jobId: string) {
  try {
    const res = await authenticatedFetch(`${API_BASE_URL}/api/auth/saved-jobs/${jobId}/`, {
      method: "DELETE",
    });

    if (!res.ok) return { error: "Failed to unsave job" };
    return { success: true };
  } catch (err) {
    return { error: "Network error" };
  }
}

export async function getApplicationsAction() {
  try {
    const res = await authenticatedFetch(`${API_BASE_URL}/api/auth/applications/`);

    if (!res.ok) return { error: "Failed to fetch applications" };
    return await res.json();
  } catch (err) {
    return { error: "Network error" };
  }
}
