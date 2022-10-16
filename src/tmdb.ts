import axios from "axios";
import fs from "fs";
const API_KEY = process.env.API_KEY;

const getSimilar = async (url: string) => {
    const result = await axios.get(url);
    const data = await result.data;
    return data.results;
};

const similarPro = (url: string) => {
    const promises = [];
    for (let i = 1; i <= 5; i++) {
        promises.push(getSimilar(url + i));
    }
    return promises;
};

const similar = async (movie_id: number) => {
    const url = `https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=${API_KEY}&language=en-US&page=`;
    const data = await Promise.all(similarPro(url));
    const results = data.flat();
    return results;
};

const getPopular = async (url: string) => {
    const result = await axios.get(url);
    const data = await result.data;
    return data.results;
};

const popularPro = (url: string) => {
    const promises = [];
    for (let i = 1; i <= 5; i++) {
        promises.push(getPopular(url + i));
    }
    return promises;
};

const popular = async () => {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=`;
    const data = await Promise.all(popularPro(url));
    const results = data.flat();
    return results;
};

const getUpcoming = async (url: string) => {
    const result = await axios.get(url);
    const data = await result.data;
    return data.results;
};

const upcomingPro = (url: string) => {
    const promises = [];
    for (let i = 1; i <= 5; i++) {
        promises.push(getUpcoming(url + i));
    }
    return promises;
};

const upcoming = async () => {
    const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=`;
    const data = await Promise.all(upcomingPro(url));
    const results = data.flat();
    return results;
};

const getTopRated = async (url: string) => {
    const result = await axios.get(url);
    const data = await result.data;
    return data.results;
};

const topRatedPro = (url: string) => {
    const promises = [];
    for (let i = 1; i <= 5; i++) {
        promises.push(getTopRated(url + i));
    }
    return promises;
};

const topRated = async () => {
    const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=`;
    const data = await Promise.all(topRatedPro(url));
    const results = data.flat();
    return results;
};

const getMovies = async (url: string) => {
    const result = await axios.get(url);
    const data = await result.data;
    return data.results;
};

const moviesPro = (url: string) => {
    const promises = [];
    for (let i = 1; i <= 500; i++) {
        promises.push(getMovies(url + i));
    }
    return promises;
};

const movies = async () => {
    if (fs.existsSync("movies.json")) {
        const data = fs.readFileSync("movies.json", "utf-8");
        return JSON.parse(data);
    } else {
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&include_adult=false&include_video=true&page=`;
        const data = await Promise.all(moviesPro(url));
        const results = data.flat();
        return results;
    }
};

const credits = async (movie_id: number) => {
    const url = `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${API_KEY}&language=en-US`;
    const result = await axios.get(url);
    const data = await result.data;
    return data.cast;
};
const person = async (movie_id: number) => {
    const url = `https://api.themoviedb.org/3/person/${movie_id}?api_key=${API_KEY}&language=en-US`;
    const result = await axios.get(url);
    const data = await result.data;
    return data;
};

export {similar, popular, upcoming, topRated, movies, credits, person};
