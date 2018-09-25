const multer = require('multer');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, './uploads');
    },
    filename(req, file, cb) {
        cb(null, new Date().getTime() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Please provide a jpeg or png image'), false); // In place of null we have error message
    }
};

const upload = multer({
    storage,
    limit: {
        filesize: 1024 * 1024 * 5
    },
    fileFilter
});

module.exports = upload;