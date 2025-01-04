import React from "react";
import { productsToPreLoad } from "@/helpers/data";
import CardProperties from "../card";
import Link from "next/link";
const CardList = () => {
  return (
    <div>
      {productsToPreLoad.map((property) => {
        return (
          <Link href={`/house/${property.id}`} key={property.id}>
            <CardProperties key={property.id} property={property} />;
          </Link>
        );
      })}
    </div>
  );
};

export default CardList;
