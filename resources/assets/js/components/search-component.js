import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class GithubSearch extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <div className="panel panel-default">
                            <div className="panel-heading">Github User Search</div>

                            <div className="panel-body">
                                <div className="form-group">
                                    <label>Github Username</label>
                                    <input className="form-control" type="text" name="username" placeholder="taylorotwell" />
                                </div>
                                <button id="github_search_submit_button" className="btn btn-primary"><i class="fa fa-search"></i> Search</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div id="github_search_results" className="col-md-8 col-md-offset-2">
                        
                    </div>
                </div>

            </div>
        );
    }
}

if (document.getElementById('github_search')) {
    ReactDOM.render(<GithubSearch />, document.getElementById('github_search'));
}
