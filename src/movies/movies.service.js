const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties")

function list() {
    return knex("movies").select("*")
}

function listMoviesShowing() {
    return knex("movies as m")
        .distinct()
        .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
        .select("m.*", "mt.is_showing")
        .where({"mt.is_showing": true})
}

function read(movie_id) {
    return knex("movies")
        .select("*")
        .where({ movie_id })
        .first()
}

function moviesShowingInTheater(movie_id) {
    return knex("movies as m")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .join("theaters as t", "t.theater_id", "mt.theater_id")
        .select("t.*", "mt.is_showing", "m.movie_id")
        .where({"m.movie_id": movie_id})
}

function getReviews(movie_id) {
    return knex("reviews")
        .select("*")
        .where({ movie_id })
}

function getCritics(criticId) {
    return knex("critics")
        .where({ "critics.critic_id": criticId })
        .first()
}

      
module.exports = {
    list,
    listMoviesShowing,
    read,
    moviesShowingInTheater,
    getCritics,
    getReviews

}