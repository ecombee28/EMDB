import React from "react";
import Head from "next/head";
import ImagePaths from "../../../components/ImagePaths";
import style from "../../../styles/person.module.css";
import FilmRoles from "../../../components/FilmRoles";
import { getAgeOfDeath, getDate } from "../../../lib/getAges";

const index = ({ person, personDetail }) => {
  const deathAge =
    personDetail.deathday &&
    getAgeOfDeath(personDetail.birthday, personDetail.deathday);
  const birthDay = getDate(personDetail.birthday);
  const deathDay = personDetail.deathday && getDate(personDetail.deathday);

  return (
    <>
      <Head>
        <title>{`${personDetail.name} Bio/EMDB`}</title>
        <meta name="keywords" content="web dev" />
        <link rel="shortcut icon" href="logo.ico" />
      </Head>
      <div className={style.main_wrapper}>
        <div className={style.main_container}>
          <section className={style.top_container}>
            <img
              src={`${ImagePaths.w500}${personDetail.profile_path}`}
              className={style.profile_img}
            />
            <div className={style.info_container}>
              <p className={style.title}>{personDetail.name}</p>
              <p
                className={style.birth_date}
              >{`Born: ${birthDay} in ${personDetail.place_of_birth}`}</p>
              {personDetail.deathday && (
                <p className={style.birth_date}>
                  {`Death: ${deathDay} (${deathAge})`}
                </p>
              )}
              <h2 className={style.header}>Biography</h2>
              <p className={style.bio}>{personDetail.biography}</p>
            </div>
          </section>
          <section className={style.bottom_container}>
            <h2 className={style.header}>Filmography</h2>
            <h2
              className={style.header}
            >{`Actor (${person.length}) credits`}</h2>
            {person.map((p, i) => (
              <FilmRoles key={i} movie={p} />
            ))}
          </section>
        </div>
      </div>
    </>
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
