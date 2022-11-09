
import logo from '../../assets/InTrack.png';
import account from '../../assets/Account.png';
import menu from '../../assets/Menu.png';
import style from './Header.module.css'

const Header = () => {

    return (
        <nav className='navbar navbar-expand-lg ms-3 me-3 mt-2'>
            <div className='container-fluid'>
                <img alt='logo' className={`navbar-brand ${style.logo}`} src={String(logo)} />
                <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                    <ul className='navbar-nav me-auto mb-lg-0'>
                    </ul>
                    <div className='d-flex'>
                        <img alt='account' className={`me-3 ${style.account}`} src={String(account)} />
                        <img alt='menu' className={style.account} src={String(menu)} />
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header;