import React from 'react';
import PrimarySearchAppBar from './PrimarySearchAppBar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import HttpUtils from './http/HttpUtils';
import CustomizedSnackbars from './utils/CustomizedSnackbars';
import Editer from './editer'
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
        marginTop: 35,
    },

    button: {
        margin: theme.spacing.unit,
    },
});

/**
 * 新增词条页面
 */
class AddArticle extends React.Component {

    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            title: '',
            summary: '',
            content: '',
            helperText: '',
            error: false
        }

        this.titleChange = this.titleChange.bind(this);
        this.summaryChange = this.summaryChange.bind(this);
        this.contentChange = this.contentChange.bind(this);

        this.submit = this.submit.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    /**
     *  获取页面的值
     * @param {*} e 
     */
    titleChange(e) {
        this.setState({ title: e.target.value })
    }
    summaryChange(e) {
        this.setState({ summary: e.target.value })
    }
    contentChange(e) {
        this.setState({ content: e })
    }

    submit() {
        let token = localStorage.getItem('myTaoAuthorization');

        if (token === null || token === '') {

            this.child.msg('success', '请先登录!');
            return;
        }
        let data = {
            atc_title: this.state.title,
            atc_summary: this.state.summary,
            atc_content: this.state.content,
        }
        this.addArticle(data)
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
    addArticle(data) {  //api请求函数   

        if (data.atc_title === '' || data.atc_summary === '' || data.atc_content === '') {
            this.child.msg('error', '请完善信息!');
            return;
        }

        //获取数据
        HttpUtils.post(`/business/article/add`, data)
            .then(data => {

                if (data['code'] === 0) {
                    this.child.msg('success', '提交成功!');
                } else {
                    this.child.msg('error', '提交失败!');
                }
            })
    }

    render() {
        let mystyle = {
            margin: '0 auto ',
            border: '1px solid #3f51b5',
            padding: '20px',
            marginTop: '1%',
            backgroundColor: '#eeeeee',
            boxShadow: '0px 0px 1px #000',
            opacity: 0.8,
            width: '60%',
        }
        const { classes } = this.props;
        return (
            <div>
                <CustomizedSnackbars msgNotice={this.msgNotice} />
                <PrimarySearchAppBar />
                <div style={mystyle}>
                    <p>New Idea</p>
                    <div className={classes.container} noValidate autoComplete="off" >
                        <TextField
                            id="outlined-title"
                            label="Title"
                            type="search"
                            //最大
                            fullWidth
                            //不好用
                            required
                            onChange={this.titleChange}
                            className={classNames(classes.textField, classes.dense)}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-summary"
                            label="Summary"
                            type="search"
                            //最大
                            fullWidth
                            //不好用
                            required
                            onChange={this.summaryChange}
                            className={classNames(classes.textField, classes.dense)}
                            margin="normal"
                            variant="outlined"
                        />
                        <div style={{ padding: '8px', width: '100%' }}>
                            <Editer contentChange={this.contentChange.bind(this)} />
                        </div>
                        <div>
                            <Button variant="contained" size="large" onClick={this.cancel} type="submit" color="primary" className={classes.button}>
                                Cancel
                        </Button>
                            <Button variant="contained" size="large" onClick={this.submit} type="submit" color="primary" className={classes.button}>
                                Submit
                        </Button>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
AddArticle.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(AddArticle);