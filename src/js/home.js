import React from 'react';
import PrimarySearchAppBar from './PrimarySearchAppBar';
import OutlinedTextFields from './OutlinedTextFields';

/**
 * 搜索主页面
 */

class Home extends React.Component {

    render() {
        return (
            <div>
                <PrimarySearchAppBar />
                {/* 搜索框 */}
                <OutlinedTextFields />
            </div>)
    }
}

export default Home;