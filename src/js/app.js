import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './home';
import List from './list';
import AddArticle from './add_article';
import Login from './login';
import CustomizedSnackbars from './utils/CustomizedSnackbars'
import Editer from './editer'

class App extends React.Component {
    render() {
        return (
            <Router >
                <div>
                    <Route exact path="/" component={Home} />
                    <Route path="/list/:keyWord" component={List} />
                    <Route path="/add" component={AddArticle} />
                    <Route path="/login" component={Login} />
                    <Route path="/msg" component={CustomizedSnackbars} />
                    <Route path="/test" component={Editer} />
                </div>
            </Router>
        )
    }
}
export default App;
