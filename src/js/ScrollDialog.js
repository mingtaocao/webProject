import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class ScrollDialog extends React.Component {

    //接受父组件
    componentDidMount() {
        this.props.onRef(this)
    }
    state = {
        open: false,
        scroll: 'paper',
        data: {
            title: '',
            content: ''
        }
    };
    myName(data) {
        this.setState({ open: true, data: data });
    }

    handleClickOpen = scroll => () => {
        this.setState({ open: true, scroll });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        return (
            <div >
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    scroll={this.state.scroll}
                    aria-labelledby="scroll-dialog-title">
                    <DialogTitle id="scroll-dialog-title">{this.state.data.atc_title}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <hr style={{ border: '0.5px dotted #3f51b5' }}></hr>
                            {this.state.data.atc_summary}
                        </DialogContentText>
                    </DialogContent>
                    <DialogContent>
                        <DialogContentText>
                            <hr style={{ border: '0.5px dotted #3f51b5' }}></hr>
                            <div dangerouslySetInnerHTML={{ __html: this.state.data.atc_content }}></div>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Subscribe
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default ScrollDialog;