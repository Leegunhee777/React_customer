import * as React from 'react';
import { history } from '@app/store';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons/faEye';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons/faEyeSlash';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';

import { signIn } from '@app/utils/auth';

// Stylesheets
import './SignIn.scss';


class AuthSignIn extends React.Component {
    constructor(props) {
        super(props);
        this.onSignIn = this.onSignIn.bind(this);
        this.togglePasswordVisible = this.togglePasswordVisible.bind(this);
        this.state = {
            credentials: {
                id: '',
                password: ''
            },
            onLoading: false,
            errMsgId: '',
            isPasswordVisible: false,
            text: {
                id: '사용자 이름',
                password: '비밀번호',
                login: '로그인',
                error: '오! 이런 잘못된 id, password를 입력하셨어요'
            }
        };
    }

    render() {
        return (
            <div className='app-AuthSignIn'>
                <form className='signin-form' onSubmit={this.onSignIn}>

                    {/* id */}
                    <TextField
                        className='form-input'
                        onChange={e => this.onInputChanged(
                            'UN',
                            e.target.value
                        )}
                        inputProps={{
                            minLength: 4,
                            maxLength: 128
                        }}
                        label={this.state.text.id}
                        disabled={this.state.onLoading}
                        error={!!this.state.errMsgId}
                        margin='dense'
                        variant='outlined'
                        autoComplete='false'
                        autoCorrect='false'
                        autoFocus
                    />

                    {/* Password */}
                    <TextField
                        className='form-input'
                        type={
                            this.state.isPasswordVisible ?
                                'text' : 'password'
                        }
                        onChange={e => this.onInputChanged(
                            'PW',
                            e.target.value
                        )}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton onClick={this.togglePasswordVisible}>
                                        <FontAwesomeIcon icon={
                                            this.state.isPasswordVisible ?
                                                faEyeSlash : faEye
                                        } />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        inputProps={{
                            minLength: 4,
                            maxLength: 128
                        }}
                        label={this.state.text.password}
                        disabled={this.state.onLoading}
                        error={!!this.state.errMsgId}
                        helperText={
                            this.state.errMsgId ?
                                this.state.text.error
                            :
                                null
                        }
                        margin='dense'
                        variant='outlined'
                        autoComplete='false'
                        autoCorrect='false'
                    />

                    {/* Sign in button */}
                    <Button
                        type='submit'
                        className='form-button'
                        variant='contained'
                        color='primary'
                        disabled={
                            !(
                                this.state.credentials.id.length >= 4 &&
                                this.state.credentials.password.length >= 4
                            ) ||
                            this.state.onLoading
                        }
                    >
                        <CircularProgress
                            size={15}
                            style={{
                                display: !this.state.onLoading ?
                                    'none' : null
                            }}
                        />
                        {this.state.text.login}
                    </Button>
                </form>
            </div>
        );
    }


    /**
     * On input changed.
     * @param type  Input type.
     * @param value Input value.
     */
    onInputChanged(type, value) {
        const tmpState = { credentials: { ...this.state.credentials } };
        switch (type) {
            case 'UN':
                tmpState.credentials.id = value;
                break;

            case 'PW':
                tmpState.credentials.password = value;
                break;

            default:
                break;
        }

        this.setState(tmpState);
    }


    /**
     * On sign-in button clicked.
     */
    onSignIn(e) {
        e.preventDefault();
        this.setState({
            onLoading: true,
            errMsgId: ''
        }, async () => {
            const result = await signIn(this.state.credentials.id, this.state.credentials.password);

            if (result) {
                history.push('/');
            } else {
                // If status changed, set loading false.
                this.setState({ onLoading: false }, () => {
                    // If status message exist, show message to form.
                    let errMsgId = '';
                    switch (this.props.authStatus) {
                        case 'ERR_WRONG_CREDENTIALS':
                            errMsgId = 'app-auth.signin-form.msg-error.credentials';
                            break;

                        case 'ERR_INVALID_TOKEN':
                        case 'ERR_SERVER':
                        default:
                            errMsgId = 'app-auth.signin-form.msg-error.server';
                            break;
                    }

                    // Set error message ID.
                    this.setState({ errMsgId });
                });
            }
        });
    }

    /**
     * Toggle password visibility.
     */
    togglePasswordVisible() {
        this.setState({
            isPasswordVisible: !this.state.isPasswordVisible
        });
    }
}

export default AuthSignIn;
