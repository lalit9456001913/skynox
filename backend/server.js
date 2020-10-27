const express = require("express");

const path = require("path");
const fs = require("fs");

const app = express();
const dirPath = path.join(__dirname, "public");
const port = 3001;


app.post('/Download_pdf', async(req, res) => {
    console.log(req.body)
    // res.download('file', function (err) {
    //     if (err) {
    //         console.log("Error");
    //         console.log(err);
    //     } else {
    //         console.log("Success");
    //     }
    // });
})

app.listen(port, () => console.log(`app listening on port ${port}`));
