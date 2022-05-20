import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Icon from "../../styles/components/Icon";

import "../../resources/assets/sass/style.scss";

export default {
  title: "7 Days/Icon",
  component: Icon,
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (args) => (
  <Icon {...args} />
);

//Base Icon
export const Base = Template.bind({});
Base.args = {
  imgSrc:"/media/icons/duotune/communication/com002.svg",
    
};

//Icon with badge, set the badge style and number
export const WithBadge = Template.bind({});
WithBadge.args = {
    imgSrc:"/media/icons/duotune/communication/com002.svg",
    badgeStyle:"bg-danger",
    number:9,
};

//Icon with active color, set currentLocation, nav, and activeColor
export const ActiveIcon = Template.bind({});
ActiveIcon.args = {
    imgSrc:"/media/icons/duotune/communication/com010.svg",
    size:"3hx",
    activeColor: "custom",
    currentLocation: "/dashboard",
    nav: "/dashboard"
}

//Icon with muted color
export const MutedIcon =  Template.bind({});
MutedIcon.args = {
    imgSrc:"/media/icons/duotune/general/gen024.svg",
    size:"3hx",
    activeColor: "muted"
}

//Icon with navigation when icon clicked, set nav
export const IconWithNavigation = Template.bind({});
IconWithNavigation.args = {
  imgSrc:"/media/icons/duotune/general/gen024.svg",
  nav:"/dashboard"
}
