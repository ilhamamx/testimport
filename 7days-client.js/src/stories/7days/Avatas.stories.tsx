import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Avatar from "../../styles/components/Avatar";

import "../../resources/assets/sass/style.scss";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "7 Days/Avatar",
  component: Avatar,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Avatar>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Avatar> = (args) => (
  <Avatar {...args}>Avatar</Avatar>
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Base.args = {};

export const AvatarDashboard = Template.bind({});
AvatarDashboard.args = {
  id: "avatar-dashboard",
  width: "100",
  height: "100",
  imgRadius: "30%",
  imgSrc: "https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png",
};
