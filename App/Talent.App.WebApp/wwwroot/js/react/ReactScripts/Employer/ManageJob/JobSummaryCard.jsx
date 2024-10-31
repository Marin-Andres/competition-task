import React from 'react';
import Cookies from 'js-cookie';
import { Label, Icon, Button, ButtonGroup, Card, Popup } from 'semantic-ui-react';
import moment from 'moment';

export class JobSummaryCard extends React.Component {
    constructor(props) {
        super(props);
        this.selectJob = this.selectJob.bind(this)
    }

    selectJob(id) {
        var cookies = Cookies.get('talentAuthToken');
        //url: 'http://localhost:51689/listing/listing/closeJob',
    }

    renderExpired(expirationDate) {
        const todayDateStr = new Date().toDateString();
        const expirationDateStr = new Date(expirationDate).toDateString();

        if (expirationDateStr < todayDateStr) {
            return <Button negative size='mini'>Expired</Button>;
        }
        else {
            return "";
        }
    }

    render() {
        const { job } = this.props;
        console.log("job:", job);
        const id = job?.id;
        const title = job?.title;
        const locationCity = job?.location?.city;
        const locationCountry = job?.location?.country;
        const jobSummary = job?.summary;
        const noOfSuggestions = (job?.noOfSuggestions > 0) ? job.noOfSuggestions : 0;
        const expiryDate = job?.expiryDate ? job.expiryDate : null ;

        return (
            <Card style={{ width: '350px', padding: '10px', height: '400px' }}>
                <Card.Content>
                <Card.Header>{title}</Card.Header>
                <Label as='a' color='black' ribbon='right' ><Icon name='user' />{noOfSuggestions}</Label>
                <Card.Meta>{locationCity}, {locationCountry}</Card.Meta>
                <Card.Description>
                    {jobSummary}
                </Card.Description>
                </Card.Content>
                <Card.Content extra>
                        {this.renderExpired(expiryDate)}
                        <ButtonGroup size='mini' basic primary floated='right'>
                            <Button ><Icon name='ban'></Icon>Close</Button>
                            <Button ><Icon name='edit'></Icon>Edit</Button>
                            <Button ><Icon name='copy'></Icon>Copy</Button>
                        </ButtonGroup>
                </Card.Content>
            </Card>
        )
    }
}
