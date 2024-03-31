import {useSession} from "next-auth/react";
import UserCredentials from "@/models/UserCredentials";

/**
 * Obtains the user's credentials from the session manager.
 * Passes errors along for later handling (e.g. redirect).
 * @returns {Promise<string | Response>} On success, yields the credential (string). On fail, yields the response (Response).
 */
export default async function useUserCredentials() {
  const { status } = useSession();
  if (status === "authenticated" || status === "loading") {
    return fetch("/api/onboarding/getCred")
      .then(response => {
        if (!response.ok) {
          return Promise.reject(response);
        }
        return response.json();
      })
      .then(response_json => {
        const { credentials } = response_json;
        return credentials.toString();
      })
      .then(credentials => {
        console.log("Fetched user credentials:", credentials);
        return credentials;
      })
      .catch(error => {
        console.error("Failed to fetch user credentials:", error);
        return Promise.reject(error);
      });
  } else {
    console.log("User not authenticated, assigning no credentials");
    return Promise.resolve(UserCredentials.NoCred);
  }
}
