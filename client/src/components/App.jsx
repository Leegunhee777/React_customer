import * as React from 'react';

import axios from 'axios';
import Customer from './Customer/Customer'
import CustomerAdd from './CustomerAdd/CustomerAdd'

import Paper from '@material-ui/core/Paper'; //컴포넌트의 외부를감싸기위해사용하는놈
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';



/*
const customers =[{
    'id':1,
    'image':'https://placeimg.com/64/64/1',
    'name' :'홍길동',
    'birthday': '961222',
    'gender': '남자',
    'job' : '대학생'

},
{
    'id':2,
    'image':'https://placeimg.com/64/64/2',
    'name' :'나탈리',
    'birthday': '941325',
    'gender': '여자',
    'job' : '직장인'

},
{
    'id':3,
    'image':'https://placeimg.com/64/64/3',
    'name' :'광판서',
    'birthday': '911027',
    'gender': '남자',
    'job' : '트레이너'

}]
*/
//데스트용인거지 기본적으로 고객정보를 clinet쪽이 가지고 있지 않는다
class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            customers:"",
            searchKeyword:"" //모든문자열은 공백을 가지고있으므로 공백일경우에는 모든 data가 나옴
        }
        this.stateRefresh = this.stateRefresh.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);

    }
   
    stateRefresh =() =>{  //추가하기 버튼 눌렀을때 전체가 새로고침되는 비효율성을 막기위한 조치 cusomeradd의 51번째,40번째줄확인
        this.setState({   
            customers:'',
            searchKeyword:''
        });
        callApi()
        .then(res => this.setState({customers:res}))
        .catch(err => console.log(err));
    }

    componentDidMount(){
        callApi()
        .then(res => this.setState({customers:res}))
        .catch(err => console.log(err));
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }
    render() {
        const filteredcomponents = (data) => {
            data = data.filter((c) => {
                return c.name.indexOf(this.state.searchKeyword) > -1;
            });
            return data.map((c) => {
                return  <Customer
                stateRefresh={this.stateRefresh}
                key={c.id}//map을 사용할때는 기본적으로 key값을 설정해줘야 에러안뜸
                id={c.id}
                image={c.image}
                name={c.name}
                birthday={c.birthday}
                gender={c.gender}
                job={c.job}
                /> 
            });
        }
     //사용자가 검색창에 입력한 문자열을 searchKeyword란 이름으로 관리하겠다
        return (
            <div> 
                 검색창:<input type ="text" name ="searchKeyword" value={this.state.serchKeyword} onChange={this.handleValueChange}/><br/>
            <Paper>
                <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell>번호</TableCell>
                            <TableCell>이미지</TableCell>
                            <TableCell>이름</TableCell>
                            <TableCell>생년월일</TableCell>
                            <TableCell>성별</TableCell>
                            <TableCell>직업</TableCell>
                            <TableCell>설정</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                        this.state.customers !== ''
                        ? 
                        filteredcomponents(this.state.customers):null
                        /*this.state.customers.map(c=>{
                            return(
                            <Customer
                            stateRefresh={this.stateRefresh}
                            key={c.id}//map을 사용할때는 기본적으로 key값을 설정해줘야 에러안뜸
                            id={c.id}
                            image={c.image}
                            name={c.name}
                            birthday={c.birthday}
                            gender={c.gender}
                            job={c.job}
                            />
                            )
                        }) 
                        : null*/
                    }
                    </TableBody>
                </Table>
             <CustomerAdd stateRefresh={this.stateRefresh}/>
            </Paper>
            </div>
        );
    }
}

const callApi = async () => {
    const response = await fetch('http://localhost:5000/api/customer')
    const body = await response.json();
    console.log(body); //consolelog찍어보면 res로 image경로가 제대로넘어오긴한다 근데 나오질않는다 시발!!!
    return body;
}


export default App;
