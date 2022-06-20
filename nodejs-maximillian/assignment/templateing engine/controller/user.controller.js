exports.userHome = (req, res) => {
    res.render('index', {title: 'home'})
}

exports.getUser = (req, res) => {
    
    res.render('user', {title: 'user', user})
}

const user=[];


exports.addUser = (req, res) => {
    user.push({user: req.body.username})
    res.redirect('/user')
}

