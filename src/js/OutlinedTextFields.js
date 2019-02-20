import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    dense: {
        marginTop: 130,
    },

    button: {
        margin: theme.spacing.unit,
    },
});

/**
 * 搜索框组件
 */
class OutlinedTextFields extends React.Component {
    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            keyWord: '',
            helperText: '',
            error: false
        }

        this.searchChange = this.searchChange.bind(this);
        this.submit = this.submit.bind(this);
        this.getConnect = this.getConnect.bind(this);
    }

    //获取页面的值
    searchChange(e) {
        this.setState({ keyWord: e.target.value })
    }


    submit() {
        this.getConnect();
    }
    //给 TextField 绑定回车键 事件
    handleKeyUp(event) {
        if (event.keyCode === 13) {
            this.getConnect();
        }
    }

    getConnect() {  //api请求函数  userIdcard: this.state.user, pwd: this.state.password 

        //如果输入有误,改变输入框的状态
        if (this.state.keyWord === '') {
            this.setState({ error: true, helperText: '请输入查询信息!' });
            return;
        } else {
            this.setState({ error: false, helperText: '' });
        }
        this.context.router.history.push(`/list/${this.state.keyWord}`);

    }

    render() {

        const { classes } = this.props;
        const error = this.state.error;
        return (

            <div style={{ width: '60%', margin: '0 auto ' }}>

                <div className={classes.container} noValidate autoComplete="off" >
                    <TextField
                        id="outlined-search"
                        label="Search"
                        type="search"
                        //自动聚焦
                        autoFocus={true}
                        onKeyUp={this.handleKeyUp.bind(this)}
                        //最大
                        fullWidth
                        helperText={this.state.helperText}
                        error={error}
                        //不好用
                        required
                        onChange={this.searchChange}
                        className={classNames(classes.textField, classes.dense)}
                        margin="normal"
                        variant="outlined"
                    />
                </div>
                <div style={{ float: 'right' }}>
                    <Button variant="contained" size="large" onClick={this.submit} type="submit" color="primary" className={classes.button}>
                        Send
                    </Button>
                </div>
            </div>
        );
    }
}

OutlinedTextFields.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedTextFields);