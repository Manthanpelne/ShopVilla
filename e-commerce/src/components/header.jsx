import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import {
  Badge,
  Container,
  FormControl,
  Nav,
  Navbar,
  Dropdown,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { cartState } from "../contexts/contextApi";
import { AiFillDelete } from "react-icons/ai";

export default function Header() {

  const {state:{cart},dispatch,productState:{searchQuery}, productDispatch} = cartState()
 //console.log(searchQuery)

  return (
    <Navbar bg="dark" variant="dark" style={{ height: 80 }}>
      <Container>
        <Navbar.Brand>
          <Link to="/">SHOPVILLA</Link>
        </Navbar.Brand>
        <Navbar.Text className="search">
          <FormControl
            style={{ width: 500 }}
            className="m-auto"
            placeholder="Search Here"
            onChange={(e)=>{
              productDispatch({
                type:"FILTER_BY_SEARCH",
                payload:e.target.value
              })
            }}
          ></FormControl>
        </Navbar.Text>
        <Nav style={{marginRight:"140px"}}>
          <Dropdown>
            <Dropdown.Toggle variant="success">
              <FaShoppingCart color="white" fontSize="25px" />
              <Badge>{cart.length}</Badge>
            </Dropdown.Toggle>
            <Dropdown.Menu style={{minWidth:320}}>

           {cart.length>0 ? (
            <>
            {cart.map((prod)=>(
              <span className="cartItem" key={prod.id}>
                <img src={prod.thumbnail} className="cartItemImg" alt={prod.title}/>
                <div className="cartItemDetail">
                  <span>{prod.title}</span>
                  <span>₹ {prod.price}</span>
                </div>
                <AiFillDelete 
                fontSize="20px"
                style={{cursor:"pointer", color:"red"}}
                onClick={()=>{
                  dispatch({
                    type:"REMOVE_FROM_CART",
                    payload:prod
                  })
                }}
                />
              </span>
            ))}
            <Link to="/cart">
            <Button style={{width:"95%",margin:"0 10px"}}>Go To Cart</Button>
            </Link>
            </>
           ) : (
             <span style={{ padding: 10 }}>Cart is Empty!</span>
           )}
          
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}
