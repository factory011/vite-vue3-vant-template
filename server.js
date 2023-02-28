const mysql = require("mysql");
const express = require("express");
const app = express();
const port = 3000;

// 数据库配置
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "todo",
});

// 统一响应体格式
const resBody = (req, res, error, results) => {
  if (error) {
    const result = {
      code: "500",
      message: "服务器错误",
    };
    return res.jsonp(result);
  } else {
    const result = {
      code: "200",
      message: "success",
      data: results,
    };
    return res.jsonp(result);
  }
};

// 封装请求体
const request = (type, path, sql) => {
  if (type === 'delete') {
    app[type](path, (req, res) => {
      const { rowId } = req.query
      const delSql = `delete from list where rowId in(${rowId})`
      con.query(delSql, function (error, results) {
        resBody(req, res, error, results);
      });
    });
  } else {
    app[type](path, (req, res) => {
      con.query(sql, Object.values(req.query), function (error, results) {
        resBody(req, res, error, results);
      });
    });
  }
};

// 查询
request("get", "/select", "select * from list order by rowId desc");
// 按状态查询
request("get", "/selectStatus", "select * from list where checked=? order by rowId desc");
// 新增
request("post", "/add", "insert into list set label=? , checked=?");
// 修改
request("put", "/update", "update list set label=? , checked=? where rowId=?");
// 批量修改状态
request("put", "/updateStatus", "update list set checked=?");
// 删除
request("delete", "/delete", "delete from list where rowId=?");

app.use(express.static('./dist'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});