const express = require("express");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/api/customers", (req, res) => {
  res.send([
    {
      id: 1,
      image:
        "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjAzMTBfOSAg%2FMDAxNjQ2OTE5NjkxMDgx.E5vVTu860ekJu4UIMFZS4Nhy0pKMFA15TuWwO_UXRrIg.rTbDWPlJjMo-qq0GY0yfe5cUAMcCluMwox86QsRkQjsg.PNG.eee200%2F20220310_224122.png&type=a340",
      name: "카리나",
      age: "24",
    },
    {
      id: 2,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREjhLm3dHLhkpC78uiuAmL-eJnuHMVn_pT9g&usqp=CAU",
      name: "한동숙",
      age: "34",
    },
  ]);
});

app.listen(port, () =>
  console.log(`Listening on port  http://localhost:${port}`)
);
