import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  profileImageUrl: string,
}

const ProfileButton = ({ profileImageUrl }: Props) => {
  return (
    <Link href="/profile">
      <Avatar>
        {profileImageUrl ? <AvatarImage src={profileImageUrl} /> : <AvatarImage src="/assets/images/avatar_default.png" />}
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </Link>
  );
};

export default ProfileButton;