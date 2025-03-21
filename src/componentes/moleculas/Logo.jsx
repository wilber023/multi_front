import logo from '../../Images/logo.png';
import '../../Styles/Home.css'
import Exit from './HomeOptios/Logout';
 
function LogoName(){
 
    return(
        <>
        <div className='container-logo-name'>
            <img src={logo} alt="La cava del mar" />
            <h3 className='name-cava'>The Sea Cava</h3>


            <div className='exit'>
                <Exit/> 
            </div>
            
        </div>

 
        </>
    )
}

export default LogoName;