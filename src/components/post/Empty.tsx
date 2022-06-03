import {MoodEmpty} from "tabler-icons-react";
import {Text, useMantineTheme} from "@mantine/core";

export const Empty = () => {

  const theme = useMantineTheme();
  return (
    <div className="flex flex-col gap-4 items-center mt-24">
      <MoodEmpty
        size={56}
        strokeWidth={2}
        color={theme.colors.gray[7]}
      />
      <Text size="xl" weight={500} color={theme.colors.gray[7]}>Wow, such empty</Text>
    </div>
  )
}
