import {Message} from "tabler-icons-react";
import {Text, useMantineTheme} from "@mantine/core";

export const NoComment = () => {
  const theme = useMantineTheme();
  return (
    <div className="flex flex-col gap-4 items-center my-24">
      <Message
        size={32}
        strokeWidth={2}
        color={theme.colors.gray[7]}
      />
      <Text size="md" weight={500} color={theme.colors.gray[7]}>No Comments Yet</Text>
    </div>
  )
}
