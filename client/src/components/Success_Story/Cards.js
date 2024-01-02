import React from 'react'
import Card from 'react-bootstrap/Card'
import './Cards.css';


const Cards = ({ data }) => {
    return (

        <div className="cards-container">
            {data.map((element, k) => {
                return (
                    <Card key={k} className="custom-card">
                        <Card.Img variant="top" className="card-image" src={element.imgdata} />

                        <div className="card-body">
                            <div className="upper-data">
                                <h4 className="card-title">{element.rname}</h4>
                            </div>

                            <div className="extra"></div>

                            <div className="last-data">
                                <p>{element.somedata}</p>
                            </div>
                        </div>
                    </Card>
                );
            })}
        </div>


    )
}

export default Cards