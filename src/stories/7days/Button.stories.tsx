import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button from '../../components/Button';

import '../../resources/assets/sass/style.scss';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: '7 Days/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} >Text</Button>;

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Base.args = {
};

export const Login = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Login.args = {
  btnlg: 'primary'
};
