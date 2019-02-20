import React from 'react';
import PrimarySearchAppBar from './PrimarySearchAppBar';
import InsetDividers from './utils/InsetDividers';
import HttpUtils from './http/HttpUtils';

class List extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            keyWord: props.match.params.keyWord,
            data: null,
            displayName: 'none'
        }
    }

    queryList() {
        let text = {
            keyWord: this.state.keyWord,
            pageInfo: {
                pageNo: 1,
                pageSize: 10
            }
        }
        HttpUtils.post('/business/article/queryList', text)
            .then(res => {
                if (res['code'] === 0) {

                    if (res.data.list.length > 0) {
                        this.setState({ data: res.data.list, keyWord: 'ss' });
                    } else {
                        this.setState({ displayName: 'block' });
                    }
                    console.log(this.state.data);
                } else {
                    alert('XX');
                }
            })
    }

    componentDidMount() {
        this.queryList();
    }

    render() {
        return (
            <div>
                <PrimarySearchAppBar />
                <div style={{ display: this.state.displayName }}>
                    <h1>No information was queried . . . . . </h1>
                </div>
                <div style={{ marginTop: '5%', width: '70%', marginLeft: '6%' }}>
                    {
                        this.state.data ?
                            (<InsetDividers data={this.state.data} />) : null
                    }
                </div>
            </div>
        );
    }
}

export default List;


