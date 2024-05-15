export interface IStore{
    attributes: IAttribute,
    relationships: {
        books: Array<IBook> | any;
        countries?: ICountries | any;
    }
}

interface IAttribute {
    rating: number;
    storeImage: string;
    website: string;
    name: string;
    establishmentDate: string;
}

export interface IBook{
    id: string;
    attributes: {
        name: string;
        copiesSold: number;
    };
    relationships: IAuthor | any
}

export interface IRatings{
    className: string;
}

export interface IAuthor{
    id: string;
    author: {
        data: {
            attributes: {
                fullName: string
            }
        }
    }
}

export interface ICountries{
    id: string;
    attributes: {
        code: string
    }
}

export interface IApiResponse{
    stores: Array<IStore>,
    books: Array<IBook>,
    authors: Array<IAuthor>,
    countries: Array<ICountries>
}