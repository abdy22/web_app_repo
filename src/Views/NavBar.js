import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import arrow from '../Image/arrow.png'
import { useNavigate } from "react-router-dom";


function NavBar(props) {
  const navigate = useNavigate();
  const handleOnClick = () => {
    props.hideNav(false)
    navigate('/');
  }

  return (
    <Navbar bg="white" expand="xl">
      <Container >
        <Navbar.Brand onClick={handleOnClick} >
           <img className='back-arrow' src={arrow} alt="Logo" />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default NavBar;