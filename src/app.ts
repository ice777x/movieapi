import express, {Request, Response} from "express";
import axios from "axios";
import {
    similar,
    popular,
    upcoming,
    topRated,
    movies,
    credits,
    person,
} from "./tmdb";
import * as https from "https";
import cors from "cors";
var corsOptions = {
    origin: "*",
};
const app = express();
app.use(cors(corsOptions));
const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
});
const API_KEY = process.env.API_KEY;
app.get("/", async (req: Request, res: Response) => {
    const page = req.query.page;
    if (page) {
        if (Number(page) > 500) {
            res.send({error: "Page must be less than or equal to 500"});
        } else {
            let url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`;
            const result = await axios.get(url);
            const data = await result.data;
            res.send({data: data.results});
        }
    } else {
        const data = await movies();
        res.send({data: data, item_count: data.length});
    }
});

app.get("/similar/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    if (id) {
        const result = await similar(Number(id));
        res.send({data: result});
    } else {
        res.send({error: "ID is required"});
    }
});

app.get("/popular", async (req: Request, res: Response) => {
    res.send({data: await popular()});
});

app.get("/upcoming", async (req: Request, res: Response) => {
    res.send({data: await upcoming()});
});
app.get("/top_rated", async (req: Request, res: Response) => {
    res.send({data: await topRated()});
});

app.get("/search", async (req: Request, res: Response) => {
    const query = req.query.query;
    if (query) {
        let url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;
        const result = await axios.get(url, {httpsAgent});
        const data = await result.data;
        res.send({data: data.results});
    } else {
        res.send({error: "Query is required"});
    }
});

app.get("/movie/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    if (id) {
        let url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
        const result = await axios.get(url, {httpsAgent});
        const data = await result.data;
        res.send({data: data});
    } else {
        res.send({error: "ID is required"});
    }
});

app.get("/credits/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    if (id) {
        const result = await credits(Number(id));
        res.send({data: result});
    } else {
        res.send({error: "ID is required"});
    }
});
app.get("/person/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    if (id) {
        const result = await person(Number(id));
        res.send({data: result});
    } else {
        res.send({error: "ID is required"});
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
