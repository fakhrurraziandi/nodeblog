

const express = require('express');
const router = express.Router();
const mysql = require('../connection');
const striptags = require('striptags');
const _ = require('lodash');


router.get('/', (req, res) => {

    var query1 = "SELECT posts.id, posts.title, posts.slug, posts.content, posts.featured_img, posts.created_at, posts.updated_at, categories.title as category, authors.name as author FROM posts INNER JOIN categories ON categories.id = posts.category_id INNER JOIN authors ON authors.id = posts.author_id";
    var query2 = "SELECT posts.id, posts.title, posts.slug, posts.content, posts.created_at, posts.updated_at, categories.title as category, authors.name as author FROM posts INNER JOIN categories ON categories.id = posts.category_id INNER JOIN authors ON authors.id = posts.author_id ORDER BY posts.created_at DESC limit 5";

    mysql.query(_.join([query1, query2], '; '), function(err, data, fields){

        var posts = data[0];
        var latestPosts = data[1];

        var mappedPosts = posts.map(function(post){
            post.content = striptags(post.content).substr(0, 150);
            return post;
        });

        var mappedLatestPosts = latestPosts.map(function(latestPost){
            latestPost.content = striptags(latestPost.content).substr(0, 70);
            return latestPost;
        });

        res.render('pages/index', {
            posts: mappedPosts,
            latestPosts: mappedLatestPosts
        });
    });
});

router.get('/post/:slug', (req, res) => {

    console.log(req.params.slug);
    // return;

    var query1 = "SELECT posts.id, posts.title, posts.slug, posts.content, posts.featured_img, posts.created_at, posts.updated_at, categories.title as category, authors.name as author FROM posts INNER JOIN categories ON categories.id = posts.category_id INNER JOIN authors ON authors.id = posts.author_id WHERE posts.slug = '"+ req.params.slug +"' ";
    // res.send(query1);
    var query2 = "SELECT posts.id, posts.title, posts.slug, posts.content, posts.created_at, posts.updated_at, categories.title as category, authors.name as author FROM posts INNER JOIN categories ON categories.id = posts.category_id INNER JOIN authors ON authors.id = posts.author_id ORDER BY posts.created_at DESC limit 5";

    mysql.query(_.join([query1, query2], '; '), [req.params.slug], function(err, data, fields){

        var post = data[0][0];
        var latestPosts = data[1];

        // res.send(data);
        // return;

        var mappedLatestPosts = latestPosts.map(function(latestPost){
            latestPost.content = striptags(latestPost.content).substr(0, 70);
            return latestPost;
        });

        res.render('pages/post', {
            post: post,
            latestPosts: mappedLatestPosts
        });
    });
});

module.exports = router;
