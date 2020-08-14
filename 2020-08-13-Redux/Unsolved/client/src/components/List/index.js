import React from "react";
import "./style.css";

// This file exports both the List and ListItem components

export const List = ({ child }) => {
  return (
    <div className="list-overflow-container">
      <ul className="list-group">{child}</ul>
    </div>
  );
};

export const ListItem = ({ child }) => {
  return <li className="list-group-item">{child}</li>;
};
