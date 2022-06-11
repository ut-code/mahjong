import '../styles/Header.css';
import {Link} from 'react-router-dom';

function Header(){
    return(
        <><div className="header header-fixed">
            <div className="header_inner">
                <div className="header_item">
                    <Link to="/" className="link"><p className='logo'>麻雀どれ切る問題</p></Link>
                </div>
            </div>
        </div><div className='header'></div>
        <p>本文</p></>
    );
}

export default Header;