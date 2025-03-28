import LogoName from "../../componentes/moleculas/Logo";
import UserHome from "../../componentes/organismos/HomeUser";
import '../../Styles/Home.css'
function Empleado(){
    return(
        <>
                <div className="fondo" >
        <LogoName />
        <UserHome />
       
        </div>
        </>
    )
}

export default Empleado;