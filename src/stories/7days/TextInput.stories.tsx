import { ComponentStory, ComponentMeta } from '@storybook/react';

import TextInput from "../../components/TextInput";

import "../../resources/assets/sass/style.scss";

export default {
  title: "7 Days/Input",
  component: TextInput,
} as ComponentMeta<typeof TextInput>;

const Template: ComponentStory<typeof TextInput> = (args) => (
  <TextInput {...args} />
);

export const Base = Template.bind({});
Base.args = {};

export const InputLogin = Template.bind({});
InputLogin.args = {
  formcontrol: "solid",
  isvalid: true
};


