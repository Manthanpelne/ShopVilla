import React from 'react'
import {Button,Form} from 'react-bootstrap';
import Rating from './rating';
import { cartState } from '../contexts/contextApi';

export default function Filters() {


  const {state:{product},productState : {byRating, sort}, productDispatch} = cartState()



  return (
    <div className='filters'>
        <span className='title'>Filter by Price</span>
        <span>
          <Form.Check
       inline
        type="radio"
        name="group1"
        label="Ascending"
        id={`inline-1`}
        onChange={()=>{
          productDispatch({
            type:"SORT_BY_PRICE",
            payload:"lowToHigh"
          })
        }}
        checked={sort==="lowToHigh" ? true : false}
      />
        </span>
        <span>
          <Form.Check
       inline
        type="radio"
        name="group1"
        label="Descending"
        id={`inline-2`}
        onChange={()=>{
          productDispatch({
            type:"SORT_BY_PRICE",
            payload:"highToLow"
          })
        }}
        checked={sort==="highToLow" ? true : false}
      />
        </span>
       
       <label className='title' style={{paddingRight:10}}>Filter by Rating: </label>
       <Rating rating={byRating} 
       onClick={(i)=>{
        productDispatch({
          type:"FILTER_BY_RATING",
          payload:i+1
        })
       }}
       style={{cursor:"pointer"}}/>
       
        <Button
        onClick={()=>{
          productDispatch({
            type:"CLEAR_FILTERS"
          })
        }}
        checked={sort==="lowToHigh" ? true : false}
        style={{marginTop:"20px"}} variant="light">Clear filters</Button>
    </div>
  )
}
