import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Consumer } from '../../context';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Contact extends Component {
    state = {
        showContactInfo: false
    };

    onShowClick = () => {
        this.setState({ showContactInfo: !this.state.showContactInfo });
    }

    onDeleteClick = async (id, dispatch) => {
        //sorround with try catch
        await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
        dispatch({
            type: 'DELETE_CONTACT',
            payload: id
        })

    }

    render() {
        const { email, phone, name, id } = this.props.contact;
        const { showContactInfo } = this.state;

        return (
            <Consumer>
                {value => {
                    const { dispatch } = value;
                    return (
                        <div className="card card-body my-2">
                            <h4>{name}
                                <i onClick={this.onShowClick}
                                    className="fas fa-sort-down mx-3"
                                    style={{ cursor: 'pointer' }}
                                />
                                <i className="fas fa-times"
                                    style={{ cursor: 'pointer', color: 'red', float: 'right' }}
                                    onClick={() => this.onDeleteClick(id, dispatch)}
                                />
                                <Link to={`/contact/edit/${id}`}>
                                <i style={{float: 'right', marginRight: '1rem', color: 'black'}}
                                className="fas fa-pencil-alt"></i>
                                </Link>
                            </h4>
                            {showContactInfo ? (
                                <ul className="list-group">
                                    <li className="list-group-item">Email: {email}</li>
                                    <li className="list-group-item">Phone: {phone}</li>
                                </ul>
                            ) : null}
                        </div>
                    );
                }}
            </Consumer>
        );
    }
}

Contact.propTypes = {
    contact: PropTypes.object.isRequired
}

export default Contact;
