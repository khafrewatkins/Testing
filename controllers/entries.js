const Entry = require('../models/Entry')

module.exports = {
  getProfile: async (req, res) => {
    try{
      // find user by it's id and put it inside a variable
      const entries = await Entry.find({user: req.user.id})
      // render ejs using user's id from the request and export variable for use in ejs
      res.render('profile.ejs' , {entries: entries, user: req.user})
    }catch(err){
      console.log(err)
    }
  },
  // is async needed here?
  getFeed: async (req, res) => {
    try{
      const entries = await Entry.find()
        .sort({ createdAt: 'desc' })
        .lean()
      res.render('feed.ejs', {entries: entries})
    }catch(err){
      console.log(err)
    }
  },
  getEntry: async (req, res) => {
    try{
      const entry = await Entry.findById(req.params.id)
      res.render('entry.ejs', {entry: entry, user: req.user})
    }catch(err){
      console.log(err)
    }
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
  likeEntry: async (req, res) => {
    try{
      await Entry.findOneAndUpdate({_id:req.params.id},
        {
          $inc : {'likes' : 1}
        },
      console.log('Liked the entry!'),
      res.redirect(`/entries/${req.params.id}`)
      )
    }catch(err){
      console.log(err)
    }
  },
  deleteEntry: async (req, res) => {
        try{
          await Entry.findOneAndDelete({_id:req.params.id})
          console.log('Deleted Entry')
          res.redirect('/profile')
        }catch(err){
          res.redirect('/profile')
        }
    },
} 