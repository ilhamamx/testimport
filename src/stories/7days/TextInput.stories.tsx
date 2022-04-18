import { ComponentStory, ComponentMeta } from '@storybook/react';

import Input from "../../components/TextInput";

import "../../resources/assets/sass/style.scss";

export default {
  title: "7 Days/Input",
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Base = Template.bind({});
Base.args = {};

export const InputLogin = Template.bind({});
InputLogin.args = {
  formcontrol: "solid",
  isvalid: true
};


