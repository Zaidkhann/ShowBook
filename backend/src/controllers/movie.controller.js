import mongoose  from "mongoose";
import Movie from "../models/movie.model.js";


export const postMovie = async(req,res)=>{
    const {movieName,genre,coverImage,duration,language,rating} = req.body

    if(!movieName||!genre||!language||!coverImage){
        return res.status(400).json({
            "message":"All Fields are must required"
        })
    }
    try{
    const movie = await Movie.create({
        movieName,
        genre,
        coverImage,
        rating,
        language,
        duration
    })  
    return res.status(201).json({
            message:"Movie posted successfully",
            Movie:{
                id:movie._id,
                movieName: movie.movieName,
                genre: movie.genre,
                language:movie.language,
                coverImage:movie.coverImage,
                duration:movie.duration,
                rating:movie.rating

            }
        })
    }
    catch(err){
        res.status(409).json({"message":err.message})
    }
}

export const getAllMovie = async(req,res) =>{
    try{
        const movies = await Movie.find({})
        res.status(200).json({
            "message": "Successfully fetched All Movies",
            "count": movies.length,
            movies
                })
    }
    catch(err){
        res.status(500).json({
            "message": err.message
        })
    }
}
 