import {
  Navbar,
  NavbarContent,
  NavbarBrand, Image,
} from "@nextui-org/react";
import NextLink from "next/link";
import { UserManager } from "@/components/onboarding/UserManager";

/**
 * This component is the site header that contains the Rev logo and user management.
 * @returns {JSX.Element} - The site header component.
 */
export default function SiteHeader() {
  return (
    <div>
      <Navbar className="red" maxWidth="xl" position="sticky" isBlurred="false">
        {/* Rev's logo in top left corner */}
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand className="gap-3 max-w-fit">
            <NextLink className="flex justify-start items-center gap-1" href="/">
              <Image
                fill="none"
                height={100}
                width={180}
                alt="Rev's Logo"
                src="/logo_transparent.png"
              />
            </NextLink>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent justify="end">
          <UserManager />
        </NavbarContent>
      </Navbar>
    </div>
  )
}
