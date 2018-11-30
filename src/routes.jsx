import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Dashboard from './component/Dashboard/Dashboard.jsx';
import Form from './component/Form/Form.jsx';

export default (
    <Switch>
        <Route exact path='/' component={Dashboard} />
        <Route exact path='/admin' component={Form} />
        <Route path='/admin/:id' component={Form} />
    </Switch>
)