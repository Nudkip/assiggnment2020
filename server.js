const fs = require('fs');
const formidable = require('formidable');
const express = require('express');
const app = express();
const ExifImage = require('exif').ExifImage;

app.set('view engine','ejs');

app.get('/', (req,res) => {
	res.redirect('/filetoupload');
});

app.get('/filetoupload', (req,res) => {
	res.status(200).render('filetoupload');
});

app.post('/filetoupload' , (req,res) => {
	const form = new formidable.IncomingForm();
	form.parse(req, (err, fields, files) => {
		let title = null;
		let description = null;
		let image = null;
		let make = null;
		let model = null;
		let createTime = null;
		let location = null;
		let dla = null;
		let mla = null;
		let sla = null;
		let dlo = null;
		let mlo = null;
		let slo = null;
		let lat = null;
		let lon = null;
		let iw = null;
		let ih = null;
		title = fields.title;
        	description = fields.description;
		console.log("1");
		fs.readFile(files.filetoupload.path, (err,data) => {
			image = new Buffer.from(data).toString('base64');
			try {
        new ExifImage({ image: photo.path }, (error, exifData) => {
            if (error) {
                console.log('Error: ' + error.message);
                return res.render('error', {error});
            } else {
                console.log(exifData);
                const data = {
                    title,
                    description,
                    filename,
                    image: exifData.image,
                    exif: exifData.exif,
                    gps: exifData.gps
                };
                return res.render('display', data);
            }
        })
    } catch (error) {
        console.log('Error: ' + error.message);
        return res.render('error', {error});
    }
		});
	});
});

app.get('/error', (req,res) => {
	res.status(200).render('error');
});

app.listen(process.env.PORT || 8099);
