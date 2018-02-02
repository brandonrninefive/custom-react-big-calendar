
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, FormControl, Label} from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';
import TimePicker from 'react-bootstrap-time-picker';
import Select from 'react-select';
import moment from 'moment';

export default class NewEventModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      startDate: moment(),
      endDate: moment(),
      recurringDays: []
    };
    this.processNewEvent = this.processNewEvent.bind(this);
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({title: "", description: "", startDate: moment(), endDate: moment(), recuringDays: []});
  }

  processNewEvent() {
    var evt = {id: -1, title: this.state.title, start: this.state.startDate.toDate(), end: this.state.endDate.toDate(), startTime: "00:00", endTime: "00:30", recurringDays: this.state.recurringDays, desc: this.state.description};
    this.props.addEvent(evt);
  }

  handleStartChange(date) {
    this.setState({startDate: date});
  }

  handleEndChange(date) {
    this.setState({endDate: date});
  }

  render() {
    return (
      <Modal show={this.props.isOpen} onHide={this.props.close}>
        <Modal.Header closeButton>New Calendar Event</Modal.Header>
        <Modal.Body>
          <Label>Title:</Label>
          <FormControl placeholder="Your event title here..." onChange={(evt)=>{this.setState({title: evt.target.value})}}/>
          <Label>Description:</Label>
          <FormControl placeholder="Your event description here..." onChange={(evt)=>{this.setState({description: evt.target.value})}}/>
          <br/>
          <Label>Start Date: </Label><DatePicker selected={this.state.startDate} dateFormat="DD-MM-YYYY" onChange={this.handleStartChange}/>
          <br/>
          <Label>End Date: </Label><DatePicker selected={this.state.endDate} dateFormat="DD-MM-YYYY" onChange={this.handleEndChange}/>
          <br/>
          <Label>Start Time: </Label><TimePicker/>
          <br/>
          <Label>End Time:</Label><TimePicker/>
          <br/>
          <Label>Recurring Days:</Label><Select multi options={[{label: "Sunday", value: 0}, {label: "Monday", value: 1}, {label: "Tuesday", value: 2}, {label: "Wednesday", value: 3}, {label: "Thursday", value: 4}, {label: "Friday", value: 5}, {label: "Saturday", value: 6}]}/>
          <br/>
          <Button color="success" onClick={this.processNewEvent}>Add Event</Button>
        </Modal.Body>
      </Modal>

    );
  }
}

NewEventModal.defaultProps = {
  isOpen: false,
  toggleModal : null,
  addEvent: null
};

NewEventModal.propTypes = {
  isOpen: PropTypes.bool,
  toggleModal: PropTypes.func,
  addEvent: PropTypes.func
};