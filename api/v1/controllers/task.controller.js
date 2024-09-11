const Task = require("../../../models/task.model");

const paginationHelper = require("../../../helpers/pagination")

// [GET] /tasks
module.exports.index = async (req, res) => {
    const find = {
        deleted: false,
    };

    if (req.query.status) {
        find.status = req.query.status;
    }
    // Sort
    const sort = {};
    if (req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue;
    }
    // End Sort

    // pagination
    const countTasks = await Task.countDocuments(find);

    let objectPagination = paginationHelper({
            limitItem: 2,
            currentPage: 1
        },
        req.query,
        countTasks
    );

    // end pagination
    const tasks = await Task.find(find)
        .sort(sort)
        .limit(objectPagination.limitItem)
        .skip(objectPagination.skip);

    res.json(tasks);
};
// [GET] /tasks/detail/:id
module.exports.detail = async (req, res) => {
    try {
        const id = req.params.id;
        const task = await Task.findOne({
            _id: id,
            deleted: false
        });

        res.json(task);
    } catch (error) {
        res.json("Không tìm thấy!");
    }
};