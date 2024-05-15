import { useEffect, useState } from "react";
import { BookStoreComponent } from "../../components";
import { BookStoreService } from "../../services";
import moment from "moment";
import { IApiResponse, IAuthor, IBook, ICountries, IStore } from "../../components/book-store/interfaces";

function BookStore() {
  const [stores, setStores] = useState<Array<IStore>>([]);
  const bookStoreService = new BookStoreService();

  const getStores = async (): Promise<IApiResponse> => {
    return await bookStoreService.getStores();
  }

  const transformStoresEstablishmentDate = (stores: Array<IStore>) => {
    stores.forEach((store: IStore) => {
      const storeData = store.attributes;
      const establishmentDate = Date.parse(storeData.establishmentDate);
      storeData.establishmentDate = moment(establishmentDate).format('DD.MM.yyyy');
    });
  }

  const mapBooksToStoreById = (booksOfStore: Array<IBook>, books: Array<IBook>) => {
    return booksOfStore.map((bookOfStore: IBook) => {
      return books.find((book: IBook) => book.id === bookOfStore.id);
    });
  }

  const mapAuthorToBooks = (books: Array<IBook>, authors: Array<IAuthor>) => {
    books.forEach((book: IBook) => {
      book.relationships.author.data = authors.find((author: IAuthor) => author.id === book?.relationships?.author?.data?.id );
    });
  };

  const mapCountriesToStore = (store: IStore, countries: Array<ICountries>) => {
    store.relationships.countries = countries.find((country: ICountries) => country.id === store?.relationships?.countries?.data?.id);
  };

  const showTheBestSellingBookForEachStore = async () => {
    const {stores, books, authors, countries}: IApiResponse = await getStores();
    transformStoresEstablishmentDate(stores);
    const transformedStore = stores.map((store: IStore) => {
      const booksOfStore = store.relationships?.books?.data || [];
      mapCountriesToStore(store, countries);
      if(!booksOfStore.length){
        store.relationships.books = [];
        return store;
      }

      store.relationships.books = mapBooksToStoreById(booksOfStore, books)
                                  .sort((prevBook: IBook, nextBook: IBook) => nextBook.attributes.copiesSold - prevBook.attributes.copiesSold)
                                  .slice(0, 2);
      mapAuthorToBooks(store.relationships.books, authors);
      

      return store;
    });

    setStores(transformedStore);
  }

  useEffect(() => { 
    showTheBestSellingBookForEachStore();
  }, []);


  return (
    <>
      <BookStoreComponent
        stores={stores}/>
    </>
  );
}

export default BookStore;
