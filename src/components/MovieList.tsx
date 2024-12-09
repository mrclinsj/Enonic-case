import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../styles/PersonList.sass";

import MOVIES_LIST_QUERY from "../queries/Movies";

const forceArray = (data: any) => (Array.isArray(data) ? data : [data]);

export function MovieList() {
  const [data, setData] = useState<{
    _id: string;
    _name: string;
    data: {
      photos: {
        imageUrl: string;
      }[];
    };
    displayName: string;
  }[]>();

  useEffect(() => {
    fetch(import.meta.env.VITE_GUILLOTINE_URL as string, {
      body: JSON.stringify({
        query: MOVIES_LIST_QUERY,
      }),
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
    })
      .then((response) => response.json())
      .then((json) => setData(json.data.guillotine.queryDsl))
      .catch((err) => {
        console.error("Fetch error:", err);
        setData([]);
      });
  }, []);

  return (
    <>
    <h1 className="listTitle">Check out our <span className="titleSpan">movie</span> collection.</h1>
      {data && (
        <ul className="person-list">
          {data.map((movie, i) => {
            const {
              _id,
              _name,
              data: { photos },
              displayName,
            } = movie;

            const imgProps = {
              alt: displayName,
              src: photos ? forceArray(photos)[0]?.imageUrl : undefined,
            };

            return (
              <li key={i}>
                <Link to={`/m/${_name}/${_id}`}>
                  {imgProps.src && <img {...imgProps} />}
                  <div>{displayName}</div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
