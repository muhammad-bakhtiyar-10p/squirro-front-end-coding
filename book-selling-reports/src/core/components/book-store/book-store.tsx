import BookStoreTableComponent from './book-store-table';
import './book-store.scss';
import { IRatings, IStore } from './interfaces';

interface IProps{
    stores: Array<IStore>
}

function BookStoreComponent({ stores }: IProps) {

    const getRatingStars = (store: IStore) => {
        const stars: Array<IRatings> = [];
        const ratings = store?.attributes?.rating || 0;
        let countDown = 5;
        for(let i = 1; i <= ratings; i++){
            stars.push({
                className: 'gold-star',
            });
            --countDown;
        }

        for(let j = 1; j <= countDown; j++){
            stars.push({
                className: 'unrated-star',
            });
        }
        return stars;
    }
    return (
        <div className='container'>

            {stores.map((store: IStore, index: number) => {

                return <div key={index} className="item-wrapper">
                    <div className='left-section'>
                        <img data-testid="profile-image" src={store?.attributes?.storeImage} className="profile-image" alt="..." />
                        <div>
                            <span className='date-container'>{store?.attributes?.establishmentDate}</span>
                             - 
                            <a href={store?.attributes?.website} className='anchor-link' target="_blank">{store?.attributes?.website}</a>
                        </div>
                        
                    </div>
                    
                    <div className="center-section">
                        <div className='card-wrapper'>
                            <h2 data-testid="store-name" className="card-title">{store?.attributes?.name}</h2>
                            <div className='right-section'>
                            
                                <div className="rating" data-testid="ratings">
                                {
                                    getRatingStars(store).map((star: IRatings, index: number) => {
                                        return <span key={`${index}-stars`} className={star.className}>&#9733;</span>
                                    })
                                }
                                </div>

                            </div>
                        </div>
                        <BookStoreTableComponent
                            books={store.relationships.books}/>
                        <div className='card-flag'>
                        {store?.relationships?.countries?.attributes?.code && <img src={`https://flagsapi.com/${store?.relationships?.countries?.attributes?.code}/flat/64.png`} alt="no flag found"/>}
                        </div>
                    </div>
                    
                    
                </div>


            })}
        </div>
    );
}

export default BookStoreComponent;
