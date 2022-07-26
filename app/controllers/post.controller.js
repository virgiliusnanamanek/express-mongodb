const db = require('../models');

const Post = db.posts;

exports.findAll = (req, res) => {
    Post.find()
        .then(result => {
            res.send(result);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving posts."
            });
        });
}


exports.create = (req, res) => {
    const post = new Post({
        title: req.body.title,
        body: req.body.body,
        published: req.body.published ? req.body.published : false
    });
    post.save(post)
        .then(result => {
            res.send(result);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the post."
            });
        });
}

exports.findOne = (req, res) => {
    Post.findById(req.params.id)
        .then(result => {
            res.send(result);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving the post."
            });
        });
}

exports.update = (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body)
        .then(result => {
            if (!result) {
                return res.status(404).send({
                    message: "Post not found with id " + req.params.id
                });
            }
            res.send(result);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while updating the post."
            });
        });
}

exports.delete = (req, res) => {
    Post.findByIdAndRemove(req.params.id)
        .then(result => {
            if (!result) {
                return res.status(404).send({
                    message: "Post not found with id " + req.params.id
                });
            }
            res.send({ message: "Post deleted successfully!" });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing the post."
            });
        });
}