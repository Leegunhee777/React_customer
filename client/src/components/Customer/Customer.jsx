import * as React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CustomerDelete from '../CustomerDelete/CustomerDelete';

export default class Customer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() { 
        return (
            <TableRow>
                <TableCell>{this.props.id}</TableCell>
                <TableCell><img src={"http://localhost:5000"+this.props.image}/></TableCell> 
                <TableCell>{this.props.name}</TableCell>
                <TableCell>{this.props.birthday}</TableCell>
                <TableCell>{this.props.gender}</TableCell>
                <TableCell>{this.props.job}</TableCell>
                <TableCell><CustomerDelete stateRefresh={this.props.stateRefresh} id={this.props.id}/></TableCell>
            </TableRow>
        );
    }
}

//서버쪽에 접근하기위함임 애초에 서버쪽에서 경로를 설정할때 user가 http://localhost:5000/image 경로로 접근한다고 서버코드에 명시해놨음 그래서 저부분을 써줘야하는것임
//{"http://localhost:5000"+this.props.image} 이부분에 대해서 자세히 공부해봐라

