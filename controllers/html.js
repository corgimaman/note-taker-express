module.exports = function(app) {
    var path = require('path');

    app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '../public/notes.html')));
    app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));

}