const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

const nodemailer = require('nodemailer');

const transporter = process.env.GMAIL_PASSWORD ? nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kinit.patel@gmail.com',
    pass: process.env.GMAIL_PASSWORD,
  },
}) : null;

app.post('/', async (req, res) => {
	if(transporter) {
		const html = Object.keys(req.body).map(key => `<strong>${key}</strong>: ${req.body[key]}<br/><br/>`).join('');
		;
		await transporter.sendMail({
			from: '"Kinit Patel" <kinit.patel@gmail.com>',
			to: "kinit.patel@gmail.com",
			subject: "Form Submitted", 
			html
		})
	} else {
		console.log('posted', req.body)
	}
	res.redirect('thanks.html')
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})