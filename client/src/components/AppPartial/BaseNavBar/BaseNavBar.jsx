import * as React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop } from '@fortawesome/free-solid-svg-icons/faDesktop';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// Stylesheet
import './BaseNavBar.scss';

/** Menu drawer contents list. */
const menuList = [
    {
        id: 'app-menu.item.device',
        defaultName: 'Device',
        icon: faDesktop,
        link: '/device'
    }
];

class BaseMenuDrawer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const BasemenuDrawerList = (
            <List className='menu-list'>
                {menuList.map(menu =>
                    <Link
                        className='menu-item-wrap'
                        to={menu.link}
                        key={`menu-${menu.id}`}
                    >
                        <ListItem
                            className='menu-item'
                            button
                        >
                            <ListItemIcon className='item-icon'>
                                <FontAwesomeIcon icon={menu.icon} />
                            </ListItemIcon>
                            <ListItemText
                                className='item-text'
                                primary='test'
                            />
                        </ListItem>
                    </Link>
                )}
            </List>
        );

        return (
            <>
                {/* Menu */}
                <aside className='cbkApp-Menu-Drawer'>
                    <div className='cbkApp-Menu'>

                        {/* Menu - Brand logo */}
                        <div className='menu-brand'>
                            <Link to='/'>
                                <span className='brand-name'>
                                    Cublick Signage
                                </span>
                            </Link>
                        </div>

                        {/* Menu - List */}
                        <div className='menu-list-wrap'>
                            { BasemenuDrawerList }
                        </div>

                    </div>
                </aside>

                {/* Menu padding */}
                <div className='cbkApp-Menu-Drawer-pad' />
            </>
        );
    }
}

export default BaseMenuDrawer;
