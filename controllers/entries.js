const Entry = require('../models/Entry')

module.exports = {
  getFeed: (req, res) => {
    res.render('feed.ejs')
  },
  getProfile: (req, res) => {
    res.render('profile.ejs')
  },
  getEntry: (req, res) => {
    res.render('entry.ejs')
  },
  createEntry: async (req, res) => {
    try{
          await Entry.create({
              title: req.body.title, 
              image: '/uploads/' + req.file.filename, 
              caption: req.body.caption,
              likes: 0,
              user: req.user.id
            })
            console.log('Entry has been added!')
            res.redirect('/profile')
        }catch(err){
            console.log(err)
        }

  },
  // TODO: get specific feed, profile and entry finding in database, 
  // TODO: createEntry, likeEntry, editEntry, deleteEntry
} 