import { Http } from "../../../shared/services";
import { IApiResponse } from "../../components/book-store/interfaces";

class BookStoreService {

    /**
     * @name getStores
     * @desc will fetch the list of stores
     * @return {Promise}
     */
    getStores = (): Promise<IApiResponse> => {
        return new Promise((resolve, reject) => {
            Http.REQUEST.get(`stores`)
                .then((_successLog: any) => {
                    resolve({
                        stores: _successLog.data?.data,
                        books: _successLog.data.included.filter((book: any) => book.type === 'books'),
                        authors: _successLog.data.included.filter((author: any) => author.type === 'authors'),
                        countries: _successLog.data.included.filter((country: any) => country.type === 'countries')
                    });
                })
                .catch(e => reject(e.toString));
        });
    };
}

export default BookStoreService;