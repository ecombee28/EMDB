import React, { useState, useEffect } from "react";

import axios from "axios";
import style from "../styles/Avatar.module.css";

const AvatarImg = ({ id }) => {
  const [image, setImage] = useState("");
  console.log(`in img ${id}`);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData = await axios.post(
          `https://combeecreations.com/emdbapi/public/api/avatar`,
          {
            id: id,
          }
        );
        const res = await apiData;

        setImage(res.data.avatar_img.img_link);
        console.log(image);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div>
        <img src={image} alt="avatar" className={style.img} />
      </div>
    </div>
  );
};

export default AvatarImg;
