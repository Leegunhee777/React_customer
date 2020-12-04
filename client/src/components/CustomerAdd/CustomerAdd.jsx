import * as React from 'react';
import {post} from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';




export default class CustomerAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            file: null, //프로필이미지를 파일형태로 보내기위함
            userName:'',
            birthday:'',
            gender:'',
            job:'',
            fileName:'',
            open:false
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.addCustomer = this.addCustomer.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this); //함수내에서 this.state.에 해당하는 변수를 사용한다면 bind를시켜줘야함 그래야 state변수를 함수내에서 사용할수 있음


    }

     handleFormSubmit = (e)=>{
        e.preventDefault()//데이터가 서버로 전달됨에 있어서 오류가발생하지않도록 함수를 불러와줌  
        this.addCustomer()
        .then((response)=>{//서버로부터 response를 통해 어떠한 데이터가 왔을때 건너온 데이터를 console.log로 찍음
            console.log(response.data);
            this.props.stateRefresh(); //이런식으로 부분적으로 새로고침을해야함
            this.setState({
                file:null,
                userName:'',
                birthday:'',
                gender:'',
                job:'',
                fileName:'',
                open:false
            })
        
           // window.location.reload();//리엑트는 변화하는부분만 변화하므로 추가된 데이터를 관찰하기위해서,새로고침역할을 해주는거임
            //그래서 원래는 변화하는 부분만 통제해야하기떄문에 추가하기 버튼눌렀을때 전체가 새로고침하게 하면안됨
        })
    }
    
    
     handleFileChange = (e)=>{
        this.setState({
          
            file: e.target.files[0], //우리는 파일데이터를 하나만 넘기니 파일들중에서 [0]만저장하는거임
            fileName: e.target.value
        })
    }
    
     handleValueChange = (e)=>{
        let nextState ={};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }
     addCustomer = ()=>{
        const url = 'http://localhost:5000/api/customer';
        const formData = new FormData();
        formData.append('image',this.state.file)
        formData.append('name',this.state.userName)
        formData.append('birthday',this.state.birthday)
        formData.append('gender',this.state.gender)
        formData.append('job',this.state.job)
        //전달하고자하는 data에 파일이 포함되어있을때, 서버에 전송할때는 웹표준에 맞는 헤더를 추가해줘야한다
        const config ={
            headers:{
                'content-type':'multipart/form-data'
            }
        }
        return post(url,formData,config); //axios에 있는post라이브러리를 이용해서 해당 url의 formData를 해당환경설정에맞게 헤더를 붙여서 실제로 서버로 데이터를 보내는거임
    }

    handleClickOpen(){
        this.setState({
            open: true
        });
    }

    handleClose(){
        this.setState({
            file:null,
            userName:'',
            birthday:'',
            gender:'',
            job:'',
            fileName:'',
            open:false
        })
    }
    
    
    render() { 
       
        //하나의 폼안에서는 내부적으로 어떤 값들을 서버로 보내줄수있는지 설정하기위해 input태그를이용해 값을 설정할수 있다
        //input 태그의 name속성에 들어가는 값을 기준으로 변수가 들어가게됨(서버쪽에서는 file이라는 변수를 이용해서 해당 프로필이미지에해당하는 파일값을 받을수 있는거임)
        //button을 누르게 되면 form 의 handleFormSubmit함수가 자동으로 불러와지게 되는거임
        return (
            
            <div>
                <Button variant ="contained" color="primary" onClick={this.handleClickOpen}>
                    고객추가하기
                </Button>

                <Dialog open={this.state.open} onClose={this.handleClose}>
                    
                    <DialogTitle>고객추가</DialogTitle>
                    
                    <DialogContent>
                    프로필 이미지:<input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>

                    <br/>
                    <TextField  label="이름" type ="text" name ="userName" value= {this.state.userName} onChange={this.handleValueChange}/><br/>
                    <TextField label="생년월일" type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/>
                    <TextField label="성별" type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
                    <TextField label="직업" type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant ="contained" color ="primary" onClick={this.handleFormSubmit}> 추가 </Button>
                        <Button variant ="outlined" color ="primary" onClick={this.handleClose}> 닫기 </Button>

                    </DialogActions>
                </Dialog>
            </div>
            /*   variant는 디자인속성을 의미함
            <form onSubmit ={this.handleFormSubmit}>  
                <h1>고객추가</h1>
                프로필 이미지: <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
                이름:<input type ="text" name ="userName" value= {this.state.userName} onChange={this.handleValueChange}/><br/>
                생년월일:<input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/>
                성별:<input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
                직업:<input type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/>
                <button type="submit"> 추가하기</button>
            </form>
            다이얼창사용전방법*/
        );
    }

    
}

 

