import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class GithubSearch extends Component {
    constructor(props) {
        super(props);

        this.nextPage = this.nextPage.bind(this);
        this.searchForUser = this.searchForUser.bind(this);

        this.state = {
            user: {
                id : "",
                gravatar_id : "",
                username : "",
                login : "",
                name : "",
                fullname : "",
                location : "",
                language : "",
                type : "",
                public_repo_count : "",
                repos : "",
                followers : 0,
                followers_count : 0,
                score : "",
                created_at : "",
                created : ""
            },
            followers : [],
            page : 1,
            last_page : true
        }
    }

    searchForUser(event) {
        var self = this;
        axios.get('/api/user',{
            params: {username:document.getElementById('username').value}
        }).then(function (response) {
            console.log(response);
            self.setState({
                user: response.data.profile,
                followers: response.data.followers,
                page : 1
            });
            if( self.state.page*50 >= self.state.user.followers ) {
                self.setState({last_page : true});
            } else {
                self.setState({last_page : false});
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    nextPage(event) {
        var self = this;
        axios.get('/api/user',{
            params: {username:self.state.user.login,page:self.state.page+1}
        }).then(function (response) {
            console.log(response);
            self.setState({
                user: response.data.profile,
                followers: response.data.followers,
                page : self.state.page+1
            });
            if( self.state.page*50 >= self.state.user.followers ) {
                self.setState({last_page : true});
            } else {
                self.setState({last_page : false});
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        const renderFollowers = this.state.followers.map((follower) => {
          return (
            <div className="col-md-6" key={follower.id}>
                <div className="col-sm-2"><img className="img-responsive" src={follower.avatar_url}></img></div>
                <div className="col-sm-4"><a href={follower.html_url}>{follower.login}</a></div>
            </div>
          );
        });
        
        const isLastPage = this.state.last_page;
        let page_button = null;
        if (isLastPage) {
            page_button = <LastPageButton />;
        } else {
            page_button = <NextPageButton onClick={this.nextPage} />;
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <div className="panel panel-default">
                            <div className="panel-heading">Github User Search</div>

                            <div className="panel-body">
                                <div className="form-group">
                                    <label>Github Username</label>
                                    <input className="form-control" type="text" name="username" id="username" placeholder="taylorotwell" />
                                </div>
                                <button id="github_search_submit_button" className="btn btn-primary" onClick={this.searchForUser}><i className="fa fa-search"></i> Search</button>
                                <div className="row">
                                    <div className="col-sm-2"><img className="img-responsive" src={this.state.user.avatar_url}></img></div>
                                    <div className="col-sm-4">
                                        <h1><a href={this.state.user.html_url}>@{this.state.user.login}</a></h1>
                                        <p>Followers: {this.state.user.followers}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div id="github_search_results" className="col-md-8 col-md-offset-2">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                {renderFollowers}
                                <div className="pull-right">
                                    {page_button}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function NextPageButton(props) {
    return (
        <button className="btn btn-info" onClick={props.onClick}>Get Next Page</button>
    );
}

function LastPageButton(props) {
    return (
        <button className="btn btn-info disabled" onClick={props.onClick}>No More Data</button>
    )
}

if (document.getElementById('github_search')) {
    ReactDOM.render(<GithubSearch />, document.getElementById('github_search'));
}
