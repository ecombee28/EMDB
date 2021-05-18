import React from "react";
import ImagePaths from "../../../components/ImagePaths";
import style from "../../../styles/person.module.css";
import FilmRoles from "../../../components/FilmRoles";

const index = ({ person, personDetail }) => {
  const getDate = (date) => {
    let year, day, month;
    const monthsArr = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    year = date.substr(0, 4);
    month = date.substr(5, 2).replace(/^0+/, "");
    day = date.substr(8).replace(/^0+/, "");
    month = monthsArr[month];

    return `${month} ${day}, ${year}`;
  };

  const getAgeOfDeath = (birth, death) => {
    let birthYear, deathYear;

    birthYear = parseInt(birth.substr(0, 4));
    deathYear = parseInt(death.substr(0, 4));

    return deathYear - birthYear;
  };

  return (
    <div className={style.main_wrapper}>
      <div className={style.main_container}>
        <section className={style.top_container}>
          <img
            src={`${ImagePaths.w500}${personDetail.profile_path}`}
            className={style.profile_img}
          />
          <div className={style.info_container}>
            <p className={style.title}>{personDetail.name}</p>
            <p className={style.birth_date}>{`Born: ${getDate(
              personDetail.birthday
            )} in ${personDetail.place_of_birth}`}</p>
            {personDetail.deathday !== null && (
              <p className={style.birth_date}>{`Death: ${getDate(
                personDetail.deathday
              )} (age ${getAgeOfDeath(
                personDetail.birthday,
                personDetail.deathday
              )})`}</p>
            )}
            <h2 className={style.header}>Biography</h2>
            <p className={style.bio}>{personDetail.biography}</p>
          </div>
        </section>
        <section className={style.bottom_container}>
          <h2 className={style.header}>Filmography</h2>
          <h2 className={style.header}>{`Actor (${person.length}) credits`}</h2>
          {person.map((p) => (
            <FilmRoles key={p.id} movie={p} />
          ))}
        </section>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/person/${context.params.id}/combined_credits?api_key=0f2af5a67e7fbe4db3bc573d65f3724b&language=en-US`
  );
  const data = await res.json();
  const person = await data.cast
    .filter((per) => per.vote_count > 100)
    .sort((a, b) =>
      (a.release_date || a.first_air_date) <
      (b.release_date || b.first_air_date)
        ? 1
        : -1
    );

  const res1 = await fetch(
    `https://api.themoviedb.org/3/person/${context.params.id}?api_key=0f2af5a67e7fbe4db3bc573d65f3724b&language=en-US`
  );
  const personDetail = await res1.json();

  return {
    props: { person, personDetail },
  };
};

export default index;