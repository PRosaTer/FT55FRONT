import { IProduct } from "@/interfaces/IProduct";
import React from "react";
import CardDetail from "../card_detail";

interface PropertyCardProps {
  property: IProduct;
}

const CardProperties: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <div>
      <CardDetail {...property} />
    </div>
  );
};

export default CardProperties;
