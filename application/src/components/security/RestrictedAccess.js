import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {Card, Spinner} from "@nextui-org/react";

import getUserCredentials from "@/components/security/getUserCredentials"
import {useSession} from "next-auth/react";
import UserCredentials from "@/models/UserCredentials";

/**
 * Wrapper element for something that should only be able to be accessed by certain users.
 * @param isCredentialAuthorized Function accepting user credentials (string) and returning whether the user is authorized (boolean).
 * @param redirectURL {string | null} Where to redirect unauthorized users. If null, don't redirect unauthorized users.
 * @param errorRedirect {string | null} Where to redirect users when authentication fails. If null, don't redirect users when authentication fails.
 * @param children Child elements
 * @returns {JSX.Element} Div containing child elements
 * @constructor
 */
export default function RestrictedAccess({ isCredentialAuthorized, redirectURL = "/", errorRedirect = "/", children }) {
  const [ is_allowed, setIsAllowed ] = useState(false);
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    async function redirectIfNotAuthorized() {
      if (status === "loading") {
        return;
      }
      try {
        const creds = (status === "authenticated") ? await getUserCredentials() : UserCredentials.NoCred;
        if (isCredentialAuthorized(creds)) {
          setIsAllowed(true);
        } else {
          if (redirectURL != null) {
            console.log("User not authorized, redirecting to", redirectURL);
            router.push(redirectURL);
          }
        }
      } catch (e) {
        if (errorRedirect != null) {
          console.log("API error checking user authorization, redirecting to", errorRedirect);
          router.push(errorRedirect);
        }
      }
    }
    redirectIfNotAuthorized();
  }, [isCredentialAuthorized, errorRedirect, redirectURL, router, setIsAllowed, status]);

  return status !== "loading" ? (
    is_allowed ? (
      <div>
        {children}
      </div>
    ) : (
      <p class="bg-danger">You are not authorized to view this content.</p>
    )
  ) : (
    <Spinner />
  )
}
