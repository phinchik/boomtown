import React from 'react';
import CardForm from '../CardForm';
import { connect } from 'react-redux';

const ShareItemPreview = ({ shareItemPreview }) => {
  return <CardForm item={shareItemPreview} />;
};
const mapStateToProps = state => {
  return { shareItemPreview: state.shareItemPreview };
};

export default connect(mapStateToProps)(ShareItemPreview);
