module.exports = function(app) {

    const DB = './db/db.json'
    const fs = require('fs');

    app.get('/api/notes', (req, res) => {
        fs.readFile(DB, 'utf8', function(err, data) {
            if (err) {
                 console.log(err)
                 return;
            }
            data = JSON.parse(data);
            res.json(data);
        });
    });

    app.post('/api/notes', (req, res) => {
        fs.readFile(DB, 'utf8', function(err, data) {
            if(err) {
                return console.log(err);
            };

            let parsed = JSON.parse(data);
            let newNote = req.body;

            newNote.id = parsed.length + 1;

            parsed.push(newNote);

            parsed = JSON.stringify(parsed);
            
            fs.writeFile(DB, parsed, err => {
                if (err) {
                    console.error(err)
                    return;
                }

                console.log('File written');
                parsed = JSON.parse(parsed);
                res.json(parsed);
            });
        });


    });


    app.delete('/api/notes/:id', (req,res) => {
        deleteMe = parseInt(req.params.id);
        var data = fs.readFile(DB, 'utf8', function(err,data) {
            if (err) { console.log (err); return }
            console.log(data);
            let parsed = JSON.parse(data);
            parsed = parsed.filter((parsed) => { return parsed.id !== deleteMe });
            parsed = JSON.stringify(parsed);

            fs.writeFile(DB, parsed, err => {
                if (err) { console.log (err); return }
                console.log('Note Deleted');
                parsed = JSON.parse(parsed);
                res.json(parsed)
            });
        });
    });
}