import { render, screen } from '@testing-library/react'
import BookStore from './book-store';
import { IStore } from './interfaces';

const mockStores: Array<IStore> = [{
    attributes: {
        storeImage: 'https://i.ytimg.com/vi/g-5A1EJ4KMg/maxresdefault.jpg',
        rating: 5,
        name: 'squirro',
        website: 'squirro.com',
        establishmentDate: '28-10-2024'
    },
    relationships: {
        books: []
    }
}];

test("BookStore renders successfully", () => {
    render(<BookStore stores={mockStores}/>);
});

test("should display store correctly", () => {
    render(<BookStore stores={mockStores}/>);
    const element = screen.getByTestId('store-name');

    expect(element.textContent).toBe('squirro');
});

test("should display rated stars", () => {
    render(<BookStore stores={mockStores}/>);
    const element = screen.getByTestId('ratings');

    expect(element.querySelectorAll('.gold-star').length).toBe(5);
});

test("should display proper store image", () => {
    render(<BookStore stores={mockStores}/>);
    const image = screen.getByTestId('profile-image');
    expect(image.getAttribute('src')).toBe(mockStores[0].attributes.storeImage);
});
