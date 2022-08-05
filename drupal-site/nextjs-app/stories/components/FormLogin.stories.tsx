import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { FormLogin } from './FormLogin';



export default {
    title: 'Components/FormLogin',
    component: FormLogin,
    argTypes: {
        backgroundColor: { control: 'color' },
    },

} as ComponentMeta<typeof FormLogin>;

const Template: ComponentStory<typeof FormLogin> = (args: any) => (<FormLogin {...args}/>);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  primary: true, 
  label: 'FormLogin',
};


