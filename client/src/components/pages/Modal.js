import React from 'react';

import './Modal.css';

const modal = (props) => {
    return (
        <div>
            <div className="modal-wrapper"
                style={{
                    transform: props.show ? 'translateY(1vh)' : 'translateY(-200vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                <div className="modal-header">
                    <h4>Add New Task</h4>
                    <span className="close-modal-btn" onClick={props.close}>×</span>
                </div>
                <div className="modal-body">
                    <p>
                        {props.children}
                    </p>
                    <br/><br/>
                </div>
                <div className="modal-footer">
                </div>
            </div>
        </div>
    )
}

export default modal;