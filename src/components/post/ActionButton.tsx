import {Paper, Text} from "@mantine/core";

export const ActionButton = ({text, icon, onClick}: Props) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  }
  return (
    <Paper
      onClick={handleClick}
      sx={(theme) => ({
        textDecoration: 'none',
        borderRadius: 0,
        padding: '0.25rem 0.4rem',
        '&:hover': {
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      })}>
      <div className="flex gap-1 items-center cursor-pointer">
        {icon}
        <Text size={"sm"}>{text}</Text>
      </div>
    </Paper>
  )
}

interface Props {
  text: string;
  icon?: any
  onClick?: Function,
}
