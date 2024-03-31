import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { signIn, signOut, useSession } from "next-auth/react";
import getUserCredentials from "@/components/security/getUserCredentials";

import {
  Avatar,
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem, DropdownSection,
} from "@nextui-org/react"
import { FaGoogle } from "react-icons/fa";
import UserCredentials from "@/models/UserCredentials";

/**
 * This component is the user manager that displays the user's profile information and sign out button.
 * @returns {JSX.Element} - The user manager component.
 */
export const UserManager = () => {
  // Get the user session
  const { data: session, status } = useSession();
  const router = useRouter();
  const [ credentials, setCredentials ] = useState("");

  // Redirect to credentials page if user is new
  useEffect(() => {
    if (status === "authenticated" && session?.user?.isNewUser) {
      router.push('/credentials');
    }
  }, [session, status, router]);

  useEffect(() => {
    const sc = async () => {
      if (status === "loading") {
        return;
      } else if (status === "authenticated") {
        setCredentials(await getUserCredentials());
      } else {
        setCredentials(UserCredentials.NoCred);
      }
    }
    sc();
  }, [status, setCredentials]);

  const handleSignIn = async () => {
    await signIn("google", { callbackUrl: "/" });
  }

  const handleSignOut = async () => {
    const signOutResponse = await signOut({ redirect: false, callbackUrl: "/login" });
    if (signOutResponse.url) {
      // Redirect to the sign out URL
      await router.push(signOutResponse.url);
    }
  };

  // Return the user manager component
  return (
    <Dropdown>
      <DropdownTrigger>
        {
          session ? (
            <Avatar
              as="button"
              isBordered
              showFallback
              src={session.user.image}
            />
          ) : (
            <Avatar
              as="button"
              isBordered
              isDisabled
              showFallback
            />
          )
        }
      </DropdownTrigger>
      {
        session ? (
          <DropdownMenu aria-label="Profile Actions">
            <DropdownSection showDivider>
            <DropdownItem key="profile" className="gap-2">
              <p className="font-semibold">Signed in as:</p>
              <p className="font-semibold">{session.user.email}</p>
              <p className="font-light">{credentials}</p>
            </DropdownItem>
            </DropdownSection>
            <DropdownSection>
              <DropdownItem key="Settings" href="/credentials">
                Settings
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={handleSignOut}>
                Sign Out
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        ) : (
          <DropdownMenu aria-label="Please sign in">
            <DropdownSection showDivider>
              <DropdownItem key="profile" className="gap-2">
                <p className="font-semibold">Not signed in</p>
              </DropdownItem>
            </DropdownSection>
            <DropdownSection>
              <DropdownItem
                color="success"
                key="login"
                onClick={handleSignIn}
                startContent={<FaGoogle />}
              >
                Sign in with Google
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        )
      }
    </Dropdown>
  )
};