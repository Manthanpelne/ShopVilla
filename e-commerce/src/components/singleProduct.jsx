import React from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import Rating from "./rating";
import { cartState } from "../contexts/contextApi";

export default function SingleProduct({ prod }) {
  const {
    state: { cart },
    dispatch,
  } = cartState();


  return (
    <div className="products">
      <Card>
        <Card.Img variant="top" src={prod.thumbnail} alt={prod.name} />
        <Card.Body>
          <Card.Title>{prod.title}</Card.Title>
          <Card.Text>₹ {prod.price}</Card.Text>
          <Card.Title>
            <Rating style={{ color: "orange" }} rating={prod.rating} />
          </Card.Title>
          {cart.some((p) => p.id === prod.id) ? (
            <Button
              onClick={() => {
                dispatch({
                  type: "REMOVE_FROM_CART",
                  payload: prod,
                });
              }}
              variant="danger"
            >
              Remove from Cart
            </Button>
          ) : (
            <Button
              onClick={() => {
                dispatch({
                  type: "ADD_TO_CART",
                  payload: prod,
                });
              }}
              variant="primary"
              disabled={!prod.stock}
            >
              {!prod.stock ? "Out of stock" : "Add to Cart"}
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}
