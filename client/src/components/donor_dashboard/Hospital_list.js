import React, { Component } from 'react';
import axios from 'axios';
import { Card, Segment, Header, Divider, Grid, Form, Button } from 'semantic-ui-react';
import Top2 from '../Navbar/Top2';


class HospitalList extends Component {
    state = {
        hospitals: [],
        city: '',
    }

    oncheck = (event) => {
        var hospitals = [];
        axios.get(`http://localhost:5002/api/hospitals/${this.state.city}`)
            .then(res => {
                for (let i = 0; i < res.data.length; i++) {
                    const hospital = {
                        address: `Address : ${res.data[i].address}`,
                        city: res.data[i].city,
                        name: res.data[i].username,

                        img: `../../images/${res.data[i].img}`
                    }
                    hospitals.push(hospital)
                }
                console.log(hospitals);
                this.setState({ hospitals });
            })
            .catch(err => console.log("Error:" + err));
    }

    renderHospitals() {
        var hospitals = this.state.hospitals.map(hospital => {
            return {
                image: hospital.img,
                header: hospital.name,
                meta: hospital.contact,
                description: hospital.address
            };
        });
        return <Card.Group items={hospitals} centered />;
    }

    onChange = event => {
        //console.log(event.target.value);
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
                            <Form onSubmit={this.oncheck}>
                                <Form.Group width={1}>
                                    <Form.Field
                                        value={this.state.city}
                                        onChange={this.onChange}
                                        name="city"
                                        label='City'
                                        control='select'
                                        required
                                    >
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
