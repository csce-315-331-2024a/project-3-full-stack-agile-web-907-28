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

export const UserManager = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [ credentials, setCredentials ] = useState("");

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

  const handleSignOut = async () => {
    const signOutResponse = await signOut({ redirect: false, callbackUrl: "/login" });
    if (signOutResponse.url) {
      await router.push(signOutResponse.url);
    }
  };

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
                onClick={() => signIn("google")}
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