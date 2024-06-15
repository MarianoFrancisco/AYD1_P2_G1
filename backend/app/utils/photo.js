const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'photo');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif||webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const uploadPhoto = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
        if (!file) {
            cb(null, true);
        } else {
            fileFilter(req, file, cb);
        }
    }
});

module.exports = uploadPhoto.single('photo');
