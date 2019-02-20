import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import Divider from '@material-ui/core/Divider';
import ScrollDialog from '../ScrollDialog';
const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
});

/**
 * 详情展示组件
 * 循环遍历 list数据
 * @param {*} props 
 */
class InsetDividers extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: props.data,
        }
    }

    submit(item) {
        this.child.myName(item);
    }

    onRef = (ref) => {
        this.child = ref
    }

    limitString(data) {

        console.log(data);
        let str = new String(data);
        if (str.length > 1) {
            return str.substring(0, 8);
        } else {
            return str;
        }
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <List>
                    {
                        this.state.data.map((item, index) => {

                            return <div key={index}>
                                <ListItem button onClick={this.submit.bind(this, item)} >
                                    <Avatar>
                                        <ImageIcon />
                                    </Avatar>
                                    <ListItemText primary={item.atc_title} secondary={<p>{item.atc_summary}<br /><p style={{maxHeight:'100px',overflow:'hidden'}}  dangerouslySetInnerHTML={{__html:item.atc_content}}></p></p>} />
                                </ListItem>
                                <Divider inset component='li' />
                            </div>
                        })
                    }
                    <ScrollDialog onRef={this.onRef} />
                </List>
            </div>
        );
    }
}

InsetDividers.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InsetDividers);