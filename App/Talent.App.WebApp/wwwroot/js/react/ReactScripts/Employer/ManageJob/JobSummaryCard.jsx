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

    render() {
        return (
            <Card style={{ width: '350px', padding: '10px', height: '400px' }}>
                <Card.Content>
                <Card.Header>Test Analyst Master</Card.Header>
                <Label as='a' color='black' ribbon='right' ><Icon name='user' />0</Label>
                <Card.Meta>Auckland, New Zealand</Card.Meta>
                <Card.Description>
                    We have a position for a Test Analyst.
                </Card.Description>
                </Card.Content>
                <Card.Content extra>
                        <Button negative size='mini'>Expired</Button>
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
// const sampleJobDoc = 
// {
//     "_id" : ObjectId("6715b730951b0b9745f6b2cd"),
//     "EmployerID" : "670dd32b7652cc0758907f2f",
//     "Title" : "Master debugger",
//     "Description" : "<p>Constantly debugging</p>\n",
//     "LogoUrl" : null,
//     "Summary" : "Clear debugging",
//     "CreatedOn" : ISODate("2024-10-21T02:06:40.287Z"),
//     "ExpiryDate" : ISODate("2024-11-17T02:04:53.000Z"),
//     "ApplicantDetails" : {
//         "YearsOfExperience" : {
//             "Years" : 1,
//             "Months" : 1
//         },
//         "Qualifications" : [],
//         "VisaStatus" : []
//     },
//     "JobDetails" : {
//         "Categories" : {
//             "Category" : "Engineering",
//             "SubCategory" : "Management"
//         },
//         "JobType" : [ 
//             "partTime"
//         ],
//         "StartDate" : ISODate("2024-10-22T02:04:57.000Z"),
//         "EndDate" : ISODate("2025-01-14T02:04:45.000Z"),
//         "Salary" : {
//             "From" : 60000,
//             "To" : 83000
//         },
//         "Location" : {
//             "Country" : "Australia",
//             "City" : "Melbourne"
//         }
//     },
//     "Status" : 0,
//     "TalentSuggestions" : null,
//     "IsDeleted" : false
// };