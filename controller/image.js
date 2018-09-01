const Clarifai = require('clarifai');
const app = new Clarifai.App({
 apiKey: '0dd5c72667dd4657a928eb4eb4d81186'
});

const handleApiCall=(req,res)=>{
	app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
	.then(data=>{
		res.json(data);
	})
	.catch(err=>res.status(400).json('Api problem'))
}
const handleImage=(req, res,db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0]);
  })
  .catch(err => res.status(400).json('unable to get entries'))
}

module.exports={
	handleImage:handleImage,
	handleApiCall:handleApiCall
}