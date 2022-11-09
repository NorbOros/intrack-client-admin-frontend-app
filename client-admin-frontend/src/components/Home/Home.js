import ClientDetails from '../ClientDetails/ClientDetails';
import ClientQueue from '../ClientQueue/ClientQueue';
import Header from '../Header/Header';
import styles from './Home.module.css';

const Home = () => {
    return (
        <div className={`vh-100 d-flex flex-column overflow-hidden ${styles.home_background}`}>
            <Header />
            <div className='flex-fill d-flex flex-row overflow-auto'>
                <div className='col-9 flex-fill ms-4 me-3'>
                    <ClientDetails />
                </div>
                <div className='col-3 sidebar d-flex flex-column overflow-auto ms-3 pe-4'>
                    <ClientQueue />
                </div>
            </div>
        </div>
    );
}

export default Home;    