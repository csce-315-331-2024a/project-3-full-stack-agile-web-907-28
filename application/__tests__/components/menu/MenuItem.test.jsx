import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MenuItem from '../../../src/components/menu/MenuItem'; // Adjust the import path as necessary

describe('MenuItem Component', () => {
    //Test that the component renders without crashing
    it('renders without crashing', () => {
        render(<MenuItem id={1} name="Test Burger" price="9.99" category={0} />);
        expect(screen.getByText('Test Burger')).toBeInTheDocument();
        // Use a regular expression to match the price text flexibly
        expect(screen.getByText(/\$9\.99/)).toBeInTheDocument();
    });

    //Pass Burger and test if the image is correct
    it('displays the correct image for a burger category', () => {
        render(<MenuItem id={1} name="Test Burger" price="$9.99" category={0} />);
        const image = screen.getByAltText('Test Burger');
        expect(image).toHaveAttribute('src', expect.stringContaining('/img.jpg'));
        expect(image).toHaveAttribute('alt', 'Test Burger');
    });

    //Pass Fries and test if the image is correct
    it('displays the correct image for a fries category', () => {
        render(<MenuItem id={4} name="Test Fries" price="$2.99" category={2} />);
        const image = screen.getByAltText('Test Fries');
        expect(image).toHaveAttribute('src', expect.stringContaining('/img.jpg'));
        expect(image).toHaveAttribute('alt', 'Test Fries');
    });

    //Pass a category zero and check that imageSrc is correct
    it('imageSrc for category 0 is correct', () => {
        render(<MenuItem id={4} name="Test Burger" price="$9.99" category={0} />);
        //Get the imageSrc variable and check it is equal to /img.jpg
        const imageSrc = screen.getByAltText('Test Burger');
        expect(imageSrc).toHaveAttribute('src', expect.stringContaining('/img.jpg'));
    });

    //Pass each category and check imageSrc
    it('imageSrc for each category is correct', () => {
        render(<MenuItem id={4} name="Test Burger" price="$9.99" category={1} />);
        const imageSrc = screen.getByAltText('Test Burger');
        expect(imageSrc).toHaveAttribute('src', expect.stringContaining('/img.jpg'));
    });

    it('imageSrc for category 2 is correct', () => {
        render(<MenuItem id={4} name="Test Burger" price="$9.99" category={2} />);
        const imageSrc = screen.getByAltText('Test Burger');
        expect(imageSrc).toHaveAttribute('src', expect.stringContaining('/img.jpg'));
    });

    it('imageSrc for category 3 is correct', () => {
        render(<MenuItem id={4} name="Test Burger" price="$9.99" category={3} />);
        const imageSrc = screen.getByAltText('Test Burger');
        expect(imageSrc).toHaveAttribute('src', expect.stringContaining('/img.jpg'));
    });

    it('imageSrc for category 1 is correct', () => {
        render(<MenuItem id={4} name="Test Basket" price="$5.99" category={1} />);
        const imageSrc = screen.getByAltText('Test Basket');
        expect(imageSrc).toHaveAttribute('src', expect.stringContaining('/img.jpg'));
    });

    it('imageSrc for category 4 is correct', () => {
        render(<MenuItem id={4} name="Test Chicken Sandwich" price="$7.99" category={4} />);
        const imageSrc = screen.getByAltText('Test Chicken Sandwich');
        expect(imageSrc).toHaveAttribute('src', expect.stringContaining('/img.jpg'));
    });

    it('imageSrc for id 10 is correct', () => {
        render(<MenuItem id={10} name="Test Coke" price="$1.99" category={5} />);
        const imageSrc = screen.getByAltText('Test Coke');
        expect(imageSrc).toHaveAttribute('src', expect.stringContaining('/img.jpg'));
    });

    it('imageSrc for id 11 is correct', () => {
        render(<MenuItem id={11} name="Test Sprite" price="$1.99" category={5} />);
        const imageSrc = screen.getByAltText('Test Sprite');
        expect(imageSrc).toHaveAttribute('src', expect.stringContaining('/img.jpg'));
    });

    it('imageSrc for id 9 is correct', () => {
        render(<MenuItem id={9} name="Test Grilled Cheese" price="$3.99" category={6} />);
        const imageSrc = screen.getByAltText('Test Grilled Cheese');
        expect(imageSrc).toHaveAttribute('src', expect.stringContaining('/img.jpg'));
    });

    it('imageSrc for id 14 is correct', () => {
        render(<MenuItem id={14} name="Test Chocolate Shake" price="$2.99" category={7} />);
        const imageSrc = screen.getByAltText('Test Chocolate Shake');
        expect(imageSrc).toHaveAttribute('src', expect.stringContaining('/img.jpg'));
    });

    it('imageSrc for id 15 is correct', () => {
        render(<MenuItem id={15} name="Test Ice Cream" price="$2.49" category={8} />);
        const imageSrc = screen.getByAltText('Test Ice Cream');
        expect(imageSrc).toHaveAttribute('src', expect.stringContaining('/img.jpg'));
    });

    it('imageSrc for category 3 is correct', () => {
        render(<MenuItem id={4} name="Test Sauce" price="$0.99" category={3} />);
        const imageSrc = screen.getByAltText('Test Sauce');
        expect(imageSrc).toHaveAttribute('src', expect.stringContaining('/img.jpg'));
    });

    it('imageSrc for category 9 is correct', () => {
        render(<MenuItem id={4} name="Test Onion Rings" price="$3.99" category={9} />);
        const imageSrc = screen.getByAltText('Test Onion Rings');
        expect(imageSrc).toHaveAttribute('src', expect.stringContaining('/img.jpg'));
    });
});
