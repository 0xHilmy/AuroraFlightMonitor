import BMKG from '../assets/logoBMKG.png'
import STMKG from '../assets/logoSTMKG.png'
import UNY from '../assets/logoUNY.png'
import PUSPRESNAS from '../assets/logoPUSPRESNAS.png'
import KAMPUSMERDEKA from '../assets/logoKAMPUSMERDEKA.png'
import './Header.css'

function Header() {
    return (
        <div className="flex flex-row pt-2">
            <div className="logos">
                <img className='logo' alt='logo BMKG' src={BMKG} />d
                <img className='logo' alt='logo STMKG' src={STMKG} />
                <img className='logo' alt='logo UNY' src={UNY} />
                <img className='logo' alt='logo PUSPRESNAS' src={PUSPRESNAS} />
                <img className='logo' alt='logo KAMPUS MERDEKA' src={KAMPUSMERDEKA} />
            </div>
            <section className="wrapper mr-0 pt-12 h-1">
                <div className="top">AQMU</div>
                <div className="bottom" aria-hidden="true">AQMU</div>
            </section>
        </div>
    );
}

export default Header;
