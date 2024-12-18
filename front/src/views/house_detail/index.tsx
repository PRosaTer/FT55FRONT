// react
import React from 'react';

import ContainerDetail from '@/components/container_detail';
import { productsToPreLoad } from '@/helpers/data';
import { getPropertyById } from '@/api/PropertyAPI';

export const Detail: React.FC<{params:{id:string}}> = async({params}) => {
  const id = params.id
  const property = await getPropertyById(id)


  if (!property) {
    return <div>Error: Propiedad no encontrada</div>;
  }

return (
  <ContainerDetail {...property}/>
)
}

export default Detail