import { render, screen } from '@testing-library/react'
import BookStoreTableComponent from './book-store-table';

const mockBooks = [{
    id: '1',
    attributes: {
        name: 'Javascript',
        website: 'squirro.com',
        copiesSold: 567
    },
    relationships: {
            author: {
                data: {
                    attributes: {
                        fullName: 'Robert'
                    }
                }
            }
    }
}];

test("BookStoreTableComponent renders successfully", () => {
    render(<BookStoreTableComponent books={mockBooks}/>);
});

test("should display book name", () => {
    render(<BookStoreTableComponent books={mockBooks}/>);
    const element = screen.getByTestId('book-name-0');

    expect(element.textContent).toBe('Javascript');
});

test("should display author correctly", () => {
    render(<BookStoreTableComponent books={mockBooks}/>);
    const element = screen.getByTestId('author-name-0');

    expect(element.textContent).toBe('Robert');
});

// test("should display rated stars", () => {
//     render(<BookStoreTableComponent stores={mockBooks}/>);
//     const element = screen.getByTestId('ratings');

//     expect(element.querySelectorAll('.gold-star').length).toBe(5);
// });

// test("should display proper store image", () => {
//     render(<BookStoreTableComponent stores={mockBooks}/>);
//     const image = screen.getByTestId('profile-image');
//     expect(image.getAttribute('src')).toBe(mockBooks[0].attributes.storeImage);
// });
