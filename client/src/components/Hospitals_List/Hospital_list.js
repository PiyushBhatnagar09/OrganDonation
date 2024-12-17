import React, { Component } from 'react';
import axios from 'axios';
import { Card, Segment, Header, Divider, Grid, Form, Button, Icon, Image } from 'semantic-ui-react';
import Top2 from '../Navbar/Top2';

class HospitalList extends Component {
    state = {
        hospitals: [],
        city: '',
    }

    onCheck = (event) => {
        event.preventDefault();
        this.setState({hospitals: []});
        const hospitals = []; // Reset the hospitals array
        axios.get(`${process.env.REACT_APP_API_URL}/api/hospitals/${this.state.city}`)
            .then(res => {
                for (let i = 0; i < res.data.length; i++) {
                    const hospital = {
                        address: `Address : ${res.data[i].address}`,
                        city: res.data[i].city,
                        name: res.data[i].username,
                        img: 'https://static.vecteezy.com/system/resources/previews/000/354/925/original/vector-hospital-icon.jpg'
                    }
                    hospitals.push(hospital)
                }
                this.setState({ hospitals });
            })
            .catch(err => console.log("Error:" + err));
    }

    renderHospitals() {
        return (
            <Card.Group itemsPerRow={3} stackable={true}>
                {this.state.hospitals.map(hospital => (
                    <Card key={hospital._id} className="fluid">
                        <Image size="medium" src={hospital.img} wrapped ui={false} />
                        <Card.Content>
                        <Card.Header>{hospital.name}</Card.Header>
                        </Card.Content>
                        <Card.Content>
                        {hospital.address}
                        </Card.Content>
                    </Card>
                ))}
            </Card.Group>
        )
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        return (
            <>
                <Top2 />
                <Grid centered columns={2} style={{ marginTop: '60px' }}>
                    <Grid.Column width={12}>
                        <Segment>
                            <Header as="h3" color="grey" style={{ textAlign: "center" }}>
                                Please visit any one hospital from the given list, to get yourself approved! , Select a city to view the hospitals
                            </Header>
                            <Form onSubmit={this.onCheck}>
                                <Form.Group width={1}>
                                    <Form.Field
                                        value={this.state.city}
                                        onChange={this.onChange}
                                        name="city"
                                        label='City'
                                        control='select'
                                        required
                                    >
                                        <option value='' disabled selected>- Select City -</option>
                                        <option value='Gwalior'>Gwalior</option>
                                        <option value='New Delhi'>New Delhi</option>
                                        <option value='Pune'>Pune</option>
                                    </Form.Field>
                                </Form.Group>
                                <Button positive type='submit'>Check</Button>
                            </Form>
                            <Divider />
                            {this.renderHospitals()}
                        </Segment>
                    </Grid.Column>
                </Grid>
            </>
        );
    }
}

export default HospitalList;
