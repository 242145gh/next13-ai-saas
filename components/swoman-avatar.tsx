import { Avatar, AvatarImage } from "@/components/ui/avatar";

export const SwomanAvatar = () => {
  return (
    <Avatar className="h-10 w-10 rounded-lg">
      <AvatarImage className="p-1" src="/super_woman.jpg" />
    </Avatar>
  );
};
