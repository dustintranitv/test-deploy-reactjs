import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            status: false
        }
    }

    onCloseForm = () => {
        this.props.onCloseForm();
        this.props.onClearTask({
            id : '',
            name : '',
            status : false
        })
    }
    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if (name === 'status') {
            value = target.value === 'true' ? true : false;
        }
        this.setState({
            [name]: value
        })
    }
    onSave = (event) => {
        event.preventDefault();
        this.props.onSaveTask(this.state);
        // cancel & close Form
        this.onClaerForm();
        this.onCloseForm();
    }
    onClaerForm = () => {
        this.setState({
            name: '',
            status: false
        })
    }

    componentDidMount() {
        if (this.props.itemEditing && this.props.itemEditing.id !== null) {
            this.setState({
                id : this.props.itemEditing.id,
                name : this.props.itemEditing.name,
                status : this.props.itemEditing.status
            })
        } else {
            this.onClaerForm();
        }
        
    }
    UNSAFE_componentWillReceiveProps (nextProps) {
            if (nextProps && nextProps.itemEditing !== null) {
                return (
                    this.setState({
                        id: nextProps.itemEditing.id,
                        name: nextProps.itemEditing.name,
                        status: nextProps.itemEditing.status
                    })
                )
                }
        else return null;
        };
    
        render() {
            var { id } = this.state;
            if (!this.props.isDisplayForm) return null;
            return (
                <div className="panel panel-warning">
                    <div className="panel-heading panel-heading-plus">
                        <h3 className="panel-title">
                            {id !== '' ? 'C???p nh???t c??ng vi???c' : 'Th??m c??ng vi???c'}
                        </h3>
                        <span
                            className="fa-solid fa-circle-xmark text-right"
                            onClick={this.onCloseForm}
                        ></span>

                    </div>
                    <div className="panel-body">
                        <form onSubmit={this.onSave}>
                            <div className="from-group">
                                <label>T??n :</label>
                                <input type="text"
                                    name="name"
                                    className="form-control"
                                    value={this.state.name}
                                    onChange={this.onChange}
                                />
                            </div>
                            <label>Tr???ng th??i :</label>
                            <select name="status"
                                className="form-control"
                                value={this.state.status}
                                onChange={this.onChange}>
                                <option value={true}>K??ch ho???t</option>
                                <option value={false}>???n</option>
                            </select><br />
                            <div className="text-center">

                                <button type="sumid" className="btn btn-warning">
                                    <span></span>L??u l???i
                                </button>&nbsp;
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={this.onClaerForm}>
                                    <span></span>H???y b???
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )
        }
    }

    const mapStateToProps = state => {
        return {
            isDisplayForm: state.isDisplayForm,
            itemEditing: state.itemEditing
        }
    };
    const mapDispatchToProps = (dispatch, props) => {
        return {
            onSaveTask: (task) => {
                dispatch(actions.saveTask(task));
            },
            onCloseForm: () => {
                dispatch(actions.closeForm());
            },
            onClearTask: (task) => {
                dispatch(actions.editTask(task));
            }
        }
    };
 

export default connect(mapStateToProps, mapDispatchToProps) (TaskForm);
