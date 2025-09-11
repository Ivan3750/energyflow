"use client";
import { useState, useEffect } from "react";

type Translation = {
  ua: string;
  en: string;
  pl: string;
};

type Muscle = {
  name: string;
  imgUrl: string;
  filter: string;
};

export default function Muscles() {
  const [data, setData] = useState<Muscle[]>([]);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState<keyof Translation>("en");  

  useEffect(() => {
    const storedLang = (localStorage.getItem("lang") as keyof Translation) || "en";
    setLang(storedLang);

    fetch(`/api/muscles?page=1&perPage=12&lang=${storedLang}`)
      .then((res) => res.json())
      .then((json) => {
        setData(json.results);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  console.log(lang);
  console.log(data);

  return (
    <div className="w-full flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10">
        {data.map((muscle, index) => (
          <div
            key={(muscle as any)._id || `${muscle.name}-${index}`}
            className="relative w-[313px] h-[250px] rounded-2xl overflow-hidden"
          >
            <img
              src={muscle.imgUrl}
              alt={muscle.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/55" />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
              <h2 className="font-normal text-white text-[24px] capitalize">
                {muscle.name}
              </h2>
              <p className=" font-normal text-[#F6F6F666] text-[18px] mt-1">
                {muscle.filter}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
