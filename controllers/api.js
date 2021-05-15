module.exports = function(app) {

    const DB = './db/db2.json'
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
        console.log(req.body);
        fs.readFile(DB, 'utf8', function(err, data) {
            if(err) {
                return console.log(err);
            }

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


    app.delete('/api/notes/:id', function(req,res) {
        console.log('id to delte!', req.params.id)
        const deleteMe = req.params.id;
        //make an empty array and put everybody back in minus the id i wanted to delete
        read file -> array -> make constant
        /* Check each character routeName and see if the same as "chosen"
         If the statement is true, send the character back as JSON,
         otherwise tell the user no character was found */
      
        for (let i = 0; i < req.length; i++) {
          if (deleteMe === characters[i].routeName) {
            return res.json(characters[i]);
          }
        }
      
        return res.json(false);
    })
}