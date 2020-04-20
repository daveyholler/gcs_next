import React from 'react';

export default function ListItem({
  name,
  year,
  platform,
  genre,
  publisher,
  global_sales,
  user_score,
  developer,
  image_url
}){
  return (
    <div className="listItem" style={{backgroundImage: `url('${image_url}')`}} >
      <div className="listItem__content">
        <p className="title is-6">{name}</p>
      </div>
    </div>
  )
};
