import { useEffect, useState } from "react";
import { BookStoreComponent } from "../../components";
import { BookStoreService } from "../../services";
import moment from "moment";

function BookStore() {
  const [stores, setStores] = useState<Array<any>>([]);
  const bookStoreService = new BookStoreService();

  const getStores = async () => {
    return await bookStoreService.getStores();
  }

  const transformStoresEstablishmentDate = (stores: any) => {
    stores.forEach((store: any) => {
      const storeData = store.attributes;
      const establishmentDate = Date.parse(storeData.establishmentDate);
      storeData.establishmentDate = moment(establishmentDate).format('DD.MM.yyyy');
    });
  }

  const mapBooksToStoreById = (booksOfStore: any, books: any) => {
    return booksOfStore.map((bookOfStore: any) => {
      return books.find((book: any) => book.id === bookOfStore.id);
    });
  }

  const mapAuthorToBooks = (books: any, authors: any) => {
    books.forEach((book: any) => {
      book.relationships.author.data = authors.find((author: any) => author.id === book?.relationships?.author?.data?.id );
    });
  };

  const mapCountriesToStore = (store: any, countries: any) => {
    store.relationships.countries = countries.find((country: any) => country.id === store?.relationships?.countries?.data?.id);
  };

  const showTheBestSellingBookForEachStore = async () => {
    const {stores, books, authors, countries}: any = await getStores();
    transformStoresEstablishmentDate(stores);
    
    const transformedStore = stores.map((store: any) => {
      const booksOfStore = store.relationships?.books?.data || [];
      if(!booksOfStore.length){
        store.relationships.books = [];
        return store;
      }

      store.relationships.books = mapBooksToStoreById(booksOfStore, books)
                                  .sort((prevBook: any, nextBook: any) => nextBook.attributes.copiesSold - prevBook.attributes.copiesSold)
                                  .slice(0, 2);
      mapAuthorToBooks(store.relationships.books, authors);
      mapCountriesToStore(store, countries);

      return store;
    });

    setStores(transformedStore);
    console.log({transformedStore});
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
