import React from 'react';

const Card = (props) => {
    return (
        <div  style={{ height: 290, paddingRight:10, width :270,  float: 'left'}}>
            <div className="card">
                <div className="card-image" style={{ width: 200}}>
                <img alt={props.payload.header} src={props.payload.image} />
                  <span className="card-title">{props.payload.header}</span>

          </div>
                <div className="card-content">

                    {props.payload.fields.description.stringValue}
                </div>
                <div className="card-action">
                    <a target="_blank" rel="noopener noreferrer" href={props.payload.link}>Apply Now </a>
                </div>
            </div>
        </div>
    );
};

export default Card;
