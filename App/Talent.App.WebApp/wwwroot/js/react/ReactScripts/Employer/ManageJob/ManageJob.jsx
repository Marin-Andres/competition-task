import React from 'react';
import ReactDOM from 'react-dom/client';
import Cookies from 'js-cookie';
import LoggedInBanner from '../../Layout/Banner/LoggedInBanner.jsx';
import { LoggedInNavigation } from '../../Layout/LoggedInNavigation.jsx';
import { JobSummaryCard } from './JobSummaryCard.jsx';
import { BodyWrapper, loaderData } from '../../Layout/BodyWrapper.jsx';
import { Dropdown, Icon, Card, Container, Pagination } from 'semantic-ui-react';

export default class ManageJob extends React.Component {
    constructor(props) {
        super(props);
        let loader = loaderData
        loader.allowedUsers.push("Employer");
        loader.allowedUsers.push("Recruiter");
        console.log("loader", loader)
        this.state = {
            loadJobs: [],
            loaderData: loader,
            activePage: 1,
            sortBy: {
                date: "desc"
            },
            filter: {
                showActive: true,
                showClosed: true,
                showDraft: true,
                showExpired: true,
                showUnexpired: true
            },
            totalPages: 1,
            activeIndex: "",
            pageLimit:  6
        }
        this.loadData = this.loadData.bind(this);
        this.init = this.init.bind(this);
        this.loadNewData = this.loadNewData.bind(this);
        //your functions go here
    };

    init() {
        let loaderData = TalentUtil.deepCopy(this.state.loaderData);
        loaderData.allowedUsers.push("Employer");
        loaderData.allowedUsers.push("Recruiter");
        loaderData.isLoading = false;
        //this.setState({ loaderData });//comment this

        //set loaderData.isLoading to false after getting data
        this.loadData(() =>
            this.setState({ loaderData })
        )
        
        //console.log(this.state.loaderData)
    }

    componentDidMount() {
        this.init();
    };

    loadData(callback) {
        var link = 'http://localhost:51689/listing/listing/getSortedEmployerJobs';
        var cookies = Cookies.get('talentAuthToken');
        console.log("cookies", cookies);
       // your ajax call and other logic goes here
       // http://localhost:51689/listing/listing/getSortedEmployerJobs?employerId=670dd32b7652cc0758907f2f&activePage=1&sortbyDate="desc"&showActive=true&showClosed=true&showDraft=true&showExpired=true&showUnexpired=true&limit=6
       $.ajax({
        url: link,
        headers: {
            'Authorization': 'Bearer ' + cookies,
            'Content-type': 'application/json'
        },
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        data: {
            activePage: this.state.activePage,
            sortbyDate: this.state.sortBy.date,
            showActive: this.state.filter.showActive,
            showClosed: this.state.filter.showClosed,
            showDraft: this.state.filter.showDraft,
            showExpired: this.state.filter.showExpired,
            showUnexpired: this.state.filter.showUnexpired,
            limit: this.state.pageLimit
        },
        success: function(response) {
            console.log('Jobs data:', response);
        },
        error: function (response) {
            console.error('Error while retrieving jobs: ', response.status);
            console.log(response);
        }
       });
       callback();
    }

    loadNewData(data) {
        var loader = this.state.loaderData;
        loader.isLoading = true;
        data[loaderData] = loader;
        this.setState(data, () => {
            this.loadData(() => {
                loader.isLoading = false;
                this.setState({
                    loadData: loader
                })
            })
        });
    }

    render() {
        return (
            <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
                <Container>
                <h1>List of Jobs</h1>
                    <div style={{marginBottom: '10px'}}>
                        <Icon name='filter' />
                        <span>Filter:</span>
                        <Dropdown
                            inline
                            options={null}
                            value={null}
                            onChange={null}
                            placeholder='Choose filter'
                        />

                        <Icon name='calendar' />
                        <span>Sort by date:</span>
                        <Dropdown
                            inline
                            options={null}
                            value={null}
                            onChange={null}
                            placeholder='Newest first'
                        />
                    </div>
                    <Card.Group>
                        <JobSummaryCard />
                        <JobSummaryCard />
                        <JobSummaryCard />
                    </Card.Group>
                    <div style={{ textAlign: 'center', margin: '30px'}}>
                        <Pagination
                            activePage={this.state.activePage}
                            totalPages={this.state.totalPages}
                            onPageChange={null}
                        />
                    </div>

                </Container>
            </BodyWrapper>
        )
    }
}
