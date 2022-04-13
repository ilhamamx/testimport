import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import Button from './Button';

test('buttonLogin was clicked', () => {
    //arrange
    render(<Button propName='btnbs'/>);

    //act
    const buttonElement = screen.getByRole("btn btn-");

    //assert
    // const outputElement = 
})