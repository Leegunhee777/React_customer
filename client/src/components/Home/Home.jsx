import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextField from '@material-ui/core/TextField';

import ImageSlide from './ImageSlide';

import { searchData } from '@app/utils/search';
import { signOut } from '@app/utils/auth';
import './Home.scss';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            typing: '',
            text: {
                text: '여기에 입력해주세요.'
            },
            onLoading: false,
            errMsgId: '',
            data: '',
            allData: ''
        }
        this.imageRef = React.createRef();

        this.onInputChanged = this.onInputChanged.bind(this);
        this.onTyping = this.onTyping.bind(this);
    }

    forSignOut() {
        signOut();
    }

    render() {
        return (
            <div className='app-Home'>
                <div className='home-contents'>
                    <button onClick={this.forSignOut}>signOut</button>
                    <div className={
                        this.state.onLoading
                            ? 'home-brand brand_animation'
                            : 'home-brand'
                    }>
                        <span className='brand-name'>
                            EGEG
                        </span>
                    </div>
                    <div className='home-input'>
                        <form className='home-form' onSubmit={this.onTyping}>
                            {/* TEXT */}
                            <TextField
                                className={
                                    this.state.onLoading
                                        ? 'form-input input_animation'
                                        : 'form-input'
                                }
                                onChange={e => this.onInputChanged(
                                    'TYPING',
                                    e.target.value
                                )}
                                inputProps={{
                                    minLength: 1,
                                    maxLength: 128
                                }}
                                label={this.state.text.text}
                                error={!!this.state.errMsgId}
                                margin='dense'
                                variant='outlined'
                                autoComplete='false'
                                autoCorrect='false'
                                autoFocus
                            />
                        </form>
                    </div>
                    <div className='home-box box_animation'
                        ref={(ref) => {this.imageRef = ref}}
                        style={{
                            display: !this.state.onLoading ?
                                'none' : null
                        }}>
                            {
                                this.state.data.length <= 0 
                                ? <div className='home-box-error'>
                                    <span style={{ fontSize: '30px', color: 'red', fontWeight: 'bold', width: '100%', height:'50%'}}>
                                    입력한 값의 결과값이 존재하지 않습니다!!
                                    </span>
                                </div>
                                : <ImageSlide imageRef={this.imageRef} type='search' imgType={this.state.typing} title='입력하신 값의 결과값' data={this.state.data} />
                            }
                            {
                                this.state.allData.length <= 0 
                                ? null
                                : <ImageSlide imageRef={this.imageRef} type='show' imgType='all' title='추천 이미지' data={this.state.allData} />
                            }
                    </div>
                </div>
            </div>
        );
    }

    /**
     * On input changed.
     * @param type  Input type.
     * @param value Input value.
     */
    onInputChanged(type, value) {
        const tmpState = { typing: { ...this.state.typing } };
        switch (type) {
            case 'TYPING':
                tmpState.typing = value;
                break;
            default:
                break;
        }

        this.setState(tmpState);
    }

    
    onTyping(e) {
        e.preventDefault();
        this.setState({
            onLoading: true,
            errMsgId: ''
        }, async () => {
            const result = await searchData(this.state.typing);
            const allResult = await searchData('all');
            this.setState({ data: result, allData: allResult});
        });
    }
}

export default Home;
