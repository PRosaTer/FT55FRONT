import React from "react";
import CardProperties from "../card";
import { Carousel, CarouselContent } from "../ui/carousel";
import { IFeatureDepartmentsProps } from "../home/featureHouse";
import { IProperty } from "@/interfaces/IProperty";
import HeroFilter from "../heroFilter/heroFilter";

export const CardList: React.FC<IFeatureDepartmentsProps> = ({
  properties,
}) => {
  return (
    <section className="py-4">
      <div className="bg-white p-6 rounded-lg shadow-2xl max-w-5xl mx-auto mb-12 border">
        <HeroFilter />
      </div>
      <div className="container mx-auto px-4">
        <Carousel className="w-full">
          <div className="-ml-2 md:-ml-4 flex flex-wrap items-center space-y-10">
            {properties &&
              properties.map((property: IProperty) => (
                <CardProperties {...property} key={property.id} />
              ))}
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default CardList;
