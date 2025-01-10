"use client";

import React, { useEffect, useState } from "react";
import { getPropertyDB } from "@/api/PropertyAPI";
import { IProperty } from "@/interfaces/IProperty";
import FeatureHouse from "@/components/featureHouse";
//import FeatureHouses from "../featureHouse/featureHouse";

export const HomeContainer: React.FC = () => {
  const [properties, setProperties] = useState<IProperty[]>([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const propertiesData = await getPropertyDB();

      const transformedProperties = propertiesData.map((property) => ({
        ...property,
        photos: property.image_?.map((img) => img.url) || [],
      }));

      setProperties(transformedProperties);
    };

    fetchProperties();
  }, []);

  return (
    <div className="py-4">
      <div className="container mx-auto px-4">
        <FeatureHouse properties={properties} />
      </div>
    </div>
  );
};

export default HomeContainer;
