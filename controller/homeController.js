exports.welcome = (req, res) => {
  res.render('index')
};
const courses = [
  {
    title : 'comment faire des cakes',
    coût : 50
  },
  {
    title : 'comment faire des crêpes',
    coût : 25
  },
  {
    title : 'comment faire des pizzas',
    coût : 10
  },
  {
    title : 'comment faire des samousas',
    coût : 73
  },
  {
    title : 'comment faire des sushis',
    coût : 125
  }
]

exports.showCourses = (req, res ) => {
  res.render('courses', {oCourses : courses });
};

exports.showSignUp = (req, res ) => {
  res.render('contact');
};
exports.postedSignUpForm = (req, res ) => {
  res.render('thanks');
};
