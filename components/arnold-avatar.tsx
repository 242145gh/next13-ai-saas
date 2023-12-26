import { Avatar, AvatarImage } from "@/components/ui/avatar";

export const ArnoldAvatar = () => {
  return (
    <Avatar className="h-10 w-10 rounded-lg">
      <AvatarImage className="p-1" src="/arnold.jpg" />
    </Avatar>
  );
};
