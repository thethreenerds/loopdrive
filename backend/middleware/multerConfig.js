const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    },
});

//only accept audiofiles

const fileFilter = (req, file, cb) => {
    const allowedTypes = /mp3|wav|aiff|flac/;
    const ext = path.extname(file.originalname).toLowerCase();
    if(allowedTypes.test(ext)) {
        cb(null, true);
    } else {
        cb(new Error('Only audio files allowed'));
    }
};

const upload = multer({ storage, fileFilter});

module.exports = upload;