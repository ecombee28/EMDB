import axios from "axios";

export default async (req, res) => {
  const { q } = req.query;
  const API_KEY = "0f2af5a67e7fbe4db3bc573d65f3724b";

  const response = await axios.get(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=vote_count.desc&include_adult=false&include_video=false&page=1&with_original_language=en`
  );

  console.log(response.data);
  res.json(response.data);
};
