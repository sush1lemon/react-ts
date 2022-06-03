import {forwardRef} from 'react';
import {Avatar, Group, Text} from '@mantine/core';

export const SubRedditSelect = forwardRef<HTMLDivElement, ItemProps>(
  ({image, label, ...others}: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Avatar radius="xl" src={image}/>
        <div>
          <Text size="sm">{label}</Text>
        </div>
      </Group>
    </div>
  )
);

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  image: string;
  label: string;
}
