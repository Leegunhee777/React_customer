import * as React from 'react';
import { push } from 'connected-react-router';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import store, { history } from '@app/store';

// Stylesheets
import './AuthTab.scss';

class AuthTab extends React.Component {
    constructor(props) {
        super(props);
        this.onTabChanged = this.onTabChanged.bind(this);
        this.state = {
            signIn: '로그인',
            register: '회원가입',
            tabIndex: -1
        };
    }

    componentDidMount() {
        this.setTabSelection();
    }

    componentDidUpdate(nextProps) {
        if (nextProps.currentRoute !== this.props.currentRoute) {
            this.setTabSelection();
        }
    }

    render() {
        return (
            this.state.tabIndex >= 0 ?
                <div className='app-AuthTab'>
                    <Tabs
                        value={this.state.tabIndex}
                        onChange={this.onTabChanged}
                        indicatorColor='primary'
                        textColor='primary'
                        variant='fullWidth'
                        action={
                            () => setTimeout(() => {
                                // Force emit window resize event after tab mounted,
                                // to update indicator position and size.
                                // Seems to bug of React-Mui.
                                // ref: https://github.com/mui-org/material-ui/issues/9337
                                window.dispatchEvent(new CustomEvent('resize'));
                            }, 0)
                        }
                    >
                        <Tab label={this.state.signIn} />
                        <Tab label={this.state.register} />
                    </Tabs>
                </div>
            :
                null
        );
    }


    /**
     * Determine and set tab index to select.
     */
    setTabSelection() {
        // Determine tab index.
        let tabIndex = null;
        switch (this.props.currentRoute) {
            case '/auth/signin':
                tabIndex = 0;
                break;

            case '/auth/register':
                tabIndex = 1;
                break;

            default:
                // `-1` for hide tab.
                tabIndex = -1;
                break;
        }

        // Change tab index state.
        this.setState({ tabIndex });
    }


    /**
     * On auth tab selection changed.
     */
    onTabChanged(e, tabIndex) {
        // Change route as tab index.
        switch (tabIndex) {
            case 0:  history.push('/auth/signin');   break;
            case 1:  history.push('/auth/register'); break;
            default: break;
        }
    }
}

export default AuthTab;
