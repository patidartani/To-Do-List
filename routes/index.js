var express = require("express");
var router = express.Router();
const uuid = require("uuid").v4;

let LOCAL_DB = [
    {
        id: "jds7e-48i5t-rk844-95kfd8d",
        title: "Recharge Wifi",
        desc: "recharge jio pack for 1 month in jio fiber of rupee 1669 which offers 300gbps.",
        deadline: "November 10, 2022",
    },
    {
        id: "56asdf-asfr3wr-fgmnyu-98tfgxd",
        title: "Recharge Wifi Studio",
        desc: "recharge jio pack for 1 month in jio fiber of rupee 1669 which offers 300gbps.",
        deadline: "November 12, 2022",
    },
];

router.get("/", function (req, res, next) {
    res.render("show", { tasks: LOCAL_DB });
});

router.get("/create", function (req, res, next) {
    res.render("create");
});

router.post("/add", function (req, res, next) {
    const { title, desc } = req.body;
    if (title.length < 4 || desc.length < 15) {
        return res.send(
            "<h1>Length of Title and Desc must be atleast 4 and 15 respectively.</h1><a href='/create'>Back</a> "
        );
    }
    let deadline = new Date().toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    let NewTask = {
        id: uuid(),
        deadline,
        title,
        desc,
    };
    LOCAL_DB.push(NewTask);
    res.redirect("/");
});

router.get("/delete/:id", function (req, res, next) {
    const id = req.params.id;

    const filteredData = LOCAL_DB.filter(function (task) {
        return task.id !== id;
    });

    LOCAL_DB = filteredData;
    res.redirect("/");
});

router.get("/edit/:id", function (req, res, next) {
    const id = req.params.id;
    const filteredData = LOCAL_DB.filter(function (task) {
        return task.id === id;
    });
    res.render("edit", { task: filteredData[0] });
});

router.post("/edit/:id", function (req, res, next) {
    const id = req.params.id;
    const { title, desc } = req.body;
    const taskindex = LOCAL_DB.findIndex(function (task) {
        return task.id === id;
    });
    const activetask = { ...LOCAL_DB[taskindex], title, desc };

    LOCAL_DB[taskindex] = activetask;

    res.redirect("/");
});

module.exports = router;