import {useSelector} from "react-redux";
import {clearLoginStatus} from "../../slices/userSlice";
import {useDispatch} from "react-redux";
import Userdashboard from "../userdashboard/Userdashboard";
import {useNavigate} from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown,NavLink } from "react-bootstrap";
function Header(){
    
      //get state from store
      let {userObj,isError,isLoading,isSuccess,errMsg}=useSelector(
        (state)=>state.user

      );
      //get dispatch function
      let dispatch=useDispatch()

      //get navigate function
      let navigate=useNavigate()

      //logout user
      const userLogout=()=>{
        localStorage.clear()
        dispatch(clearLoginStatus());
        navigate('/login')
      }
      return(
        <div>
          <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="#home">Shopper hub</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ms-auto">
                  {isSuccess!==true ? (
                    <>
                    {/* These links can be be visible when no user logged in */}
                    <Nav.Item>
                      <Nav.Link eventKey="1" as={NavLink} to="/">
                        Home
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="2" as={NavLink} to="/">
                        Login
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="3" as={NavLink} to="/">
                        SignUp
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="3" as={NavLink} to="/">
                        ContactUs
                      </Nav.Link>
                    </Nav.Item>
                    </>
                  ):(
                    <>
                    {/*This dropdaown is visible only when a user is logged in */}
                    <NavDropdown title={userObj.username} id="collasible-nav-dropdown drop-down">
                      <NavDropdown.Item>
                        Change password
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={userLogout}>
                        logout
                      </NavDropdown.Item>
                    </NavDropdown>
                    </>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>

          </Navbar>
        </div>
      )
    
}
export default Header;