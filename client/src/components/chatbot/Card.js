import React from 'react';

const Card = (props) => {
    return (
        <div  style={{ height: 290, paddingRight:10, float: 'left'}}>
            <div className="card">
                <div className="card-image" style={{ width: 200}}>
                    <img alt={props.payload.fields.header.stringValue} src={props.payload.fields.image.stringValue} />
                    <span className="card-title">{props.payload.fields.header.stringValue}</span>
                </div>
                <div className="card-content">
                
                    {props.payload.fields.description.stringValue}
                </div>
                <div className="card-action">
                    <a target="_blank" rel="noopener noreferrer" href={props.payload.fields.Link.stringValue}>Apply Now </a>
                </div>
            </div>
        </div>
    );
};

export default Card;
