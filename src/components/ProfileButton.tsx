import Link from "next/link"
import { signOut } from 'next-auth/react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
  
  type Props = {
    profileImageUrl: string,
  }

  const ProfileButton = ({ profileImageUrl }: Props) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            {profileImageUrl ? <AvatarImage src={profileImageUrl} /> : <AvatarImage src="/assets/images/avatar_default.png" />}
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">Billing</DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">Subscription</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>Sign Out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };
  
  export default ProfileButton;