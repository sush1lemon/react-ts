import {Switch, useMantineColorScheme} from '@mantine/core';

export const Toggle = () => {
  const {colorScheme, toggleColorScheme} = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <Switch checked={dark} onChange={(event) => toggleColorScheme()} classNames={{
      input: 'cursor-pointer',
    }}>

    </Switch>
  );
}
