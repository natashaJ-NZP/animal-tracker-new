import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { MenuMain } from './Main--menu';

export default {
  title: 'Example/MenuMain',
  component: MenuMain,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof MenuMain>;

const Template: ComponentStory<typeof MenuMain> = (args) => <MenuMain {...args as any} />;
