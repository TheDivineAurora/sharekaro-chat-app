const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const router = require('./routes/auth.routes.js');
const cookieParser = require("cookie-parser");
const cors = require('cors');
const authRouter = require('./routes/auth.routes.js');
const userRouter = require('./routes/user.routes.js');
const postRouter = require('./routes/post.routes.js');
const multer = require('multer');
const path = require('path');
const { response_200 } = require('./utils/responseCodes.utils.js');
dotenv.config();



const app = express();
const PORT = process.env.PORT || 3000;

app.use("/images", express.static(path.join(__dirname, "../public/files")));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

    const multerStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "public");
        },
        filename: (req, file, cb) => {
            const ext = file.mimetype.split("/")[1];
            cb(null, `files/${req.body.name}`);
    
        }
    })

const upload = multer({ storage: multerStorage });


app.post("/upload", upload.single('file'), (req, res) => {
    try {   
        return response_200(res, "File Uploaded Successfully");
    } catch (error) {
        console.error(error);
    }
});
app.get('/', (req, res) => {
    res.send('Hello, World!');
}); 

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/posts', postRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});