import React from "react";
import { productsToPreLoad } from "@/helpers/data";
import CardProperties from "../card";
import Link from "next/link";
import { getPropertyDB } from "@/api/PropertyAPI";
const CardList = async () => {
  const products = await getPropertyDB();
  return (
    <div className="flex flex-wrap items-center px-10 justify-between space-y-[10px]">
      {products &&
        products.map((property) => {
          return (
            <Link href={`/house/${property.id}`} key={property.id}>
              <CardProperties {...property} photos={property.photos || []} />
            </Link>
          );
        })}
    </div>
  );
};

export default CardList;
