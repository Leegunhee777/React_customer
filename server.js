const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors'); //CORS문제해결방법1. 도메인이다른 클라에서 접근하더라도 다허용해주는방법
app.use(bodyParser.json());
//기본적으로 rest API는 데이터를 주고받을때 hson이라불리는형식으로 data를주고받음
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors()); //CORS문제해별방법2
const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});

connection.connect();

const multer = require('multer');//파일업로드 처리를 위해서 쓰는 multer라이브러리
const upload = multer({dest:'./upload'});

/*
app.get('/api/hello',(req,res)=>{
    res.send({message: 'hello Express!'});
});
*///클라이언트가local5000/api/hello 에 접속하면 message: hello express 보여줌
app.get('/', (req, res) => {
  //  res.set({'access-control-allow-origin': '*'});
})

app.get('/api/customer',(req,res)=>{
    //res.set({'access-control-allow-origin': '*'});//접근권한허용에 관한 문제해결
  //  res.send();
  connection.query(
      "SELECT * FROM CUSTOMER3 WHERE isDeleted=0", //isdeleted가 0인놈만 가져온다,실질적으로 DB에서 데이터를 삭제시키는방식이아니라, 삭제에대한 DB도필요할수 있기떄문
      (err,rows,fields)=>{
          res.send(rows);
      }
  );
});

app.use('/image', express.static('./upload'));//사용자의 /image경로로 서버의 upload폴더와 매핑이된다는말


//api/customers경로의 사용자가 고객추가 데이터를 전송했을때 이를 처리하는방법
app.post('/api/customer',upload.single('image'),(req,res) => {
  //  res.set({'access-control-allow-origin': '*'});
    let sql = 'INSERT INTO CUSTOMER3 VALUES(null,?,?,?,?,?,now(),0)';//디비에서 id값은 자동증가라 null로 처리,(끝에0은 처음에 추가될때는 삭제가되지않은상태로 값설정이기때문에 isdeleted값 0으로설정,또 now()함수를 써서 삽입시 그해당시간을 기록
    let image = '/image/' + req.file.filename; //사용자는 이미지경로에 있는 해당파일이름으로 이미지에 접근을하게됨
    let name = req.body.name;
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    let job = req.body.job;
    
    //실제로 데이터베이스에 값을 넣을때는 각각의 ?부분에 데이터가 바인딩되서들어감
    let params = [image,name,birthday,gender,job]//?가 5개이니 그 형태가 어떤것인지 명시해줌
    connection.query(sql,params,
    (err,rows,fields) => {
        res.send(rows);

    }
    );
});
//delete메소드로 접속을한경우 특별한 id값을 가지는 그 고객 데이터에서 isdeleted속성을 1로바꾼다
//즉 삭제완료를 의미
app.delete('/api/customer/:id', (req, res) => {
 //   res.set({'access-control-allow-origin': '*'});
    let sql = 'UPDATE CUSTOMER3 SET isDeleted = 1 WHERE id = ?';
    let params =[req.params.id];
   connection.query(sql, params,
        (err,rows,fields) => {
            res.send(rows);
        });
});

app.listen(port,()=> console.log(`Listening on port ${port}`));