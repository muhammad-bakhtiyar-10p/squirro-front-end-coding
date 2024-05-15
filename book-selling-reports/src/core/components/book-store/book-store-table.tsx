import './book-store-table.scss';

function BookStoreTableComponent({ books }: any){

    return (
        <>
            
            <table className="table-container">
                <tbody>
                    <tr>
                        <th colSpan={2}>
                            <h3>Book store name</h3>
                        </th>
                    </tr>
                    {
                        books.length ? books.map((book: any, index: number) => {
                            return  <tr key={index}>
                                        <td>
                                            <h3>{book?.attributes?.name}</h3>
                                        </td>
                                        <td>
                                            <h3>{book?.relationships?.author?.data?.attributes?.fullName}</h3>
                                        </td>
                                    </tr>
                        }) : <th colSpan={2}>
                            No data available
                        </th>
                    }
                    
                </tbody>
            </table>
        </>
    )
}

export default BookStoreTableComponent;
