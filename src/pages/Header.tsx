import '../styles/Header.css';
import {Link} from 'react-router-dom';
import Logo from '../../logo.png'

function Header(){
    return(
        <><div className="header header_fixed">
            <div className="header_inner">
                <div className="header_item">
                    <Link to="/" className="link"><img src={Logo} className='logo' alt="麻雀どれ切る問題"/></Link>
                </div>
            </div>
            <div className='navbar'></div>
        </div><div className='header'></div>
        </>
    );
}

export default Header;