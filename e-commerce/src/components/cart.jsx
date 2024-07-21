import React, { useEffect, useState } from 'react'
import { cartState } from '../contexts/contextApi'
import { Button, Col, ListGroup, Row } from 'react-bootstrap'
import {Image} from 'react-bootstrap'
import Rating from './rating'
import { Form } from 'react-bootstrap'
import { AiFillDelete } from 'react-icons/ai'

export default function Cart() {

  const {state:{cart}, dispatch} = cartState()

  const [total, setTotal] = useState()

  useEffect(()=>{
     setTotal(cart.reduce((acc,curr)=>acc+Number(curr.price)*curr.qty,0))
  },[cart])

  return (
    <div className='home'>
      <div className='productContainer'>
         <ListGroup>
          {cart.map((item)=>(
           <ListGroup.Item key={item.id}>
            <Row>

              <Col md={2}>
              <Image style={{width:"100px", height:"70px"}} src={item.thumbnail} alt="" fluid rounded/>
              </Col>
              <Col md={2}>
              <span>{item.title}</span>
              </Col>
              <Col md={2}>
              ₹ {item.price}
              </Col>
              <Col md={2}>
              <Rating rating={item.rating}/>
              </Col>
              <Col md={2}>
                <span>Select QTY:</span>
              <Form.Control as="select" 
              value={item.qty}
               onChange={(e)=>{
                dispatch({
                  type:"CHANGE_CART_QTY",
                  payload:{
                    id:item.id,
                    qty:e.target.value
                  }
                })
               }}
              >
               {[...Array(item.stock).keys()].map((x)=>(
               <option key={x+1}>{x+1}</option>
               ))}
              </Form.Control>
              </Col>
              <Col md={2}>
              <Button style={{marginLeft:"30px"}}
              onClick={() => {
                dispatch({
                  type: "REMOVE_FROM_CART",
                  payload: item,
                });
              }}
              variant="light"
            >
             <AiFillDelete fontSize="20px"/>
            </Button>
              </Col>
            </Row>
           </ListGroup.Item>
          ))}
         </ListGroup>
      </div>
      <div className='filters summary'>
            <span className='title'>Subtotal ({cart.length}) items</span>
            <span style={{fontWeight:700, fontSize:20}}>Total : ₹ {total}</span>
            <Button type='button' disabled={cart.length === 0}>Proceed to Checkout</Button>
      </div>
    </div>
  )
}
