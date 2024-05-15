import './book-store-table.scss';
import { IBook } from './interfaces';

interface IProps{
    books: Array<IBook>
}

function BookStoreTableComponent({ books }: IProps){

    return (
        <>
            <table className="table-container">
                    <thead>
                        <tr>
                            <th colSpan={2}>
                                <h3>Best-selling books</h3>
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                    {
                        books.length ? books.map((book: IBook, index: number) => {
                            return  <tr key={index}>
                                        <td data-testid={`book-name-${index}`}>
                                            <h4>{book?.attributes?.name}</h4>
                                        </td>
                                        <td>
                                            <h4 data-testid={`author-name-${index}`}>{book?.relationships?.author?.data?.attributes?.fullName}</h4>
                                        </td>
                                    </tr>
                        }) : <tr >
                            <td>
                                <h4>No data available</h4>
                            </td>
                            <td>
                                
                            </td>
                        </tr>
                    }
                    
                </tbody>
            </table>
        </>
    )
}

export default BookStoreTableComponent;
