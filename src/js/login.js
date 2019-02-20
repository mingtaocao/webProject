import React from 'react';
import PrimarySearchAppBar from './PrimarySearchAppBar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import HttpUtils from './http/HttpUtils';
import classNames from 'classnames';
import CustomizedSnackbars from './utils/CustomizedSnackbars'
const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        // flexBasis: 200,
    },
    dense: {
        marginTop: 35,
    },

    button: {
        margin: theme.spacing.unit,
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing.unit,
    },
    withoutLabel: {
        marginTop: theme.spacing.unit * 3,
    },
});

class Login extends React.Component {

    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            name: '',
            pwd: '',
        }

        this.nameChange = this.nameChange.bind(this);
        this.pwdChange = this.pwdChange.bind(this);

        this.submit = this.submit.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    /**
     *  获取页面的值
     * @param {*} e 
     */
    nameChange(e) {
        this.setState({ name: e.target.value })
    }
    pwdChange(e) {
        this.setState({ pwd: e.target.value })
    }

    submit() {
        let data = {
            userIdcard: this.state.name,
            pwd: this.state.pwd,
        }
        this.login(data);
    }

    cancel() {
        this.context.router.history.push({ pathname: `/` })
    }
    msgNotice = (ref) => {
        this.child = ref
    }
    /**
     * http请求
     * @param {*} data 
     */
    login(data) {  //api请求函数   

        if (data.name === '' || data.pwd === '') {
            this.child.msg('success', '请先登录!');
            return;
        }

        //获取数据
        HttpUtils.post(`/platform/login`, data)
            .then(data => {
                if (data['code'] === 0) {
                    localStorage.setItem('myTaoAuthorization', data.token);
                    this.context.router.history.push(`/`);
                } else {
                    this.child.msg('error', '登录失败!');
                }
            })
    }


    render() {
        let mystyle = {
            width: '25%',
            margin: '0 auto ',
            border: '1px solid #3f51b5',
            padding: '10px',
            marginTop: '4%',
            backgroundColor: '#eeeeee',
            boxShadow: '0px 0px 1px #000',
            opacity: 0.8
        }
        const { classes } = this.props;
        return (
            <div >
                <CustomizedSnackbars msgNotice={this.msgNotice} />
                <PrimarySearchAppBar />
                <div style={mystyle}>
                    <p>Login In</p>
                    <div className={classes.container} noValidate autoComplete="off">
                        <TextField
                            id="standard-name"
                            label="Name"
                            type="search"
                            fullWidth
                            className={classNames(classes.textField, classes.dense)}
                            onChange={this.nameChange}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="standard-password-input"
                            label="Password"
                            className={classNames(classes.textField, classes.dense)}
                            type="password"
                            onChange={this.pwdChange}
                            autoComplete="current-password"
                            margin="normal"
                            fullWidth
                            variant="outlined"
                        />
                        <div style={{ marginTop: '5%' }}>
                            <Button variant="contained" size="large" onClick={this.cancel} type="submit" color="primary" className={classes.button}>
                                Cancel
                        </Button>
                            <Button variant="contained" size="large" onClick={this.submit} type="submit" color="primary" className={classes.button}>
                                Login
                        </Button>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}
Login.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Login);