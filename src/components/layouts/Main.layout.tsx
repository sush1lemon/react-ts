import React, {useState} from 'react';
import {AppShell, Burger, Header, MediaQuery, Navbar, Text, useMantineTheme,} from '@mantine/core';
import {Link, Outlet} from "react-router-dom";
import {Toggle} from "../colorSchemeControl";

export default function AppShellDemo() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? '#000' : theme.colors.gray[0],
        },
      }}
      // navbarOffsetBreakpoint="sm"
      // asideOffsetBreakpoint="sm"
      fixed
      padding={0}
      navbar={
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} className="bg-green-400">
            <Text>Application navbar</Text>
            <div className="flex items-center gap-2">
              <div>
                Dark Mode
              </div><Toggle></Toggle>
            </div>
          </Navbar>
        </MediaQuery>
      }
      header={
        <Header height={50} p="md">
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center">
              <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>
              <Link to="/">bReddit</Link>
            </div>

            <div>asdas</div>
          </div>
        </Header>
      }
    >
      <div className="flex justify-center pb-2">
        <div className="w-full sm:w-[80%] md:w-[70%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%]">
          <Outlet/>
        </div>
      </div>
    </AppShell>
  );
}
