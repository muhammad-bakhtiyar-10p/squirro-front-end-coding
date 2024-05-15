import BookStoreTableComponent from './book-store-table';
import './book-store.scss';

function BookStoreComponent({ stores }: any) {
    console.log({ props: stores });

    const getRatingStars = (store: any) => {
        const stars: any = [];
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
        console.log({stars, countDown, ratings})
        return stars;
    }
    return (
        <div>

            {stores.map((store: any, index: number) => {

                return <div key={index} className="container">
                    <div className='left-section'>
                        <img src={store?.attributes?.storeImage} className="profile-image" alt="..." />
                        

                        <div className='meta-data-content'>
                            <a href={store?.attributes?.website} target="_blank">{store?.attributes?.website}</a>
                            <br/>
                            <div>{store?.attributes?.establishmentDate}</div>
                        </div>
                    </div>
                    
                    <div className="center-section">
                        <h2 className="card-title">{store?.attributes?.name}</h2>
                        <BookStoreTableComponent
                            books={store.relationships.books}/>
                    </div>
                    <div className='right-section'>
                        {store?.relationships?.countries?.attributes?.code && <img src={`https://flagsapi.com/${store?.relationships?.countries?.attributes?.code}/flat/64.png`}/>}
                    
                        <div className="rating">
                        {
                            getRatingStars(store).map((star: any) => {
                                return <span className={star.className}>&#9733;</span>
                                    // <span className="star">&#9733;</span>
                                    // <span className="star">&#9733;</span>
                                    // <span className="star">&#9733;</span>
                                    // <span className="star">&#9733;</span>
                            })
                        }
                        </div>

                    </div>
                    
                </div>


            })}

            {/* <div className="card" style={{ width: '18rem;' }}>
                <img src="..." className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
            </div> */}
        </div>
    );
}

export default BookStoreComponent;
