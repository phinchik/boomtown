import React, { Component } from 'react';
import { Form, Field, FormSpy } from 'react-final-form';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import validate from './helpers/validation';
import styles from './styles';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import CheckBox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import {
  updateNewItem,
  resetNewItem,
  resetNewItemImage
} from '../../redux/modules/ShareItemPreview';

class ShareItemForm extends Component {
  constructor() {
    super();
    this.fileInput = React.createRef();
    this.state = {
      fileSelected: '',
      done: false,
      selectedTags: []
    };
  }
  generateTagsText(tags, selected) {
    return tags.tags
      .map(t => (selected.indexOf(t.id) > -1 ? t.title : false))
      .filter(e => e)
      .join(', ');
  }

  getBase64Url() {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = e => {
        resolve(
          `data:${this.state.fileSelected.type};base64, ${btoa(
            e.target.result
          )}`
        );
      };
      reader.readAsBinaryString(this.state.fileSelected);
    });
  }
  applyTags(tags) {
    return (
      tags.tags &&
      tags.tags
        .filter(t => this.state.selectedTags.indexOf(t.id) > -1)
        .map(t => ({ title: t.title, id: t.id }))
    );
  }

  dispatchUpdate(values, tags, updateNewItem) {
    if (!values.imageurl && this.state.fileSelected) {
      this.getBase64Url().then(imageurl => {
        updateNewItem({
          imageurl
        });
      });
    } else {
      updateNewItem({
        ...values,
        tags: this.applyTags(tags)
      });
    }
  }
  handleSelectTags(event) {
    this.setState({ selectedTags: event.target.value });
  }
  handleSelectFile(event) {
    this.setState({ fileSelected: this.fileInput.current.files[0] });
  }

  submitForm(form) {
    console.log('submitting!', form.getState().values);
    // Fire mutation with form values
  }
  render() {
    const { classes, tags, updateNewItem } = this.props;
    return (
      <div className={classes.root}>
        <Typography
          component="h1"
          variant="display1"
          className={classes.heading}
        >
          Share. Borrow.<br /> Prosper.
        </Typography>
        <Form
          // validate={values => validate(values)}
          onSubmit={(e, form) => this.submitForm(form)}
          render={({ handleSubmit, invalid, pristine }) => (
            <form onSubmit={e => handleSubmit(e)}>
              <FormSpy
                subscription={{ values: true }}
                component={({ values }) => {
                  // if (values) {
                  console.log(values);
                  this.dispatchUpdate(values, tags, updateNewItem);
                  // }
                  return '';
                }}
              />

              <fieldset className={this.props.classes.fieldset}>
                <Field
                  name="imageurl"
                  render={({ input, meta }) => (
                    <React.Fragment>
                      {!this.state.fileSelected ? (
                        <Button onClick={() => this.fileInput.current.click()}>
                          <Typography className={classes.selectImage}>
                            SELECT AN IMAGE
                          </Typography>
                        </Button>
                      ) : (
                        <Button
                          onClick={() => {
                            this.setState({
                              fileSelected: this.props.resetNewItemImage()
                            });
                          }}
                        >
                          <Typography className={classes.selectImage}>
                            RESET IMAGE
                          </Typography>
                        </Button>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        ref={this.fileInput}
                        hidden
                        onChange={event => this.handleSelectFile(event)}
                      />
                    </React.Fragment>
                  )}
                />

                <Field
                  name="title"
                  render={({ input, meta }) => (
                    <TextField
                      multiple
                      inputProps={{ ...input }}
                      id="itemName"
                      type="text"
                      placeholder="Name your Item"
                      className={this.props.classes.itemNameInput}
                    />
                  )}
                />
                <Field
                  name="description"
                  render={({ input, meta }) => (
                    <TextField
                      multiline
                      inputProps={{ ...input }}
                      type="text"
                      placeholder="Description"
                      className={this.props.classes.descriptionInput}
                    />
                  )}
                />
                <Field
                  name="tags"
                  render={({ input, meta }) => (
                    <Select
                      onChange={event => this.handleSelectTags(event)}
                      value={this.state.selectedTags}
                      multiple
                      className={this.props.classes.tagsInput}
                      renderValue={selectedTags => {
                        return this.generateTagsText(tags, selectedTags);
                      }}
                    >
                      {tags.tags.map(tag => (
                        <MenuItem key={tag.id} value={tag.id}>
                          <CheckBox
                            checked={
                              this.state.selectedTags.indexOf(tag.id) > -1
                            }
                          />
                          {tag.title}
                        </MenuItem>
                      ))};
                    </Select>
                  )}
                />
              </fieldset>

              <Button
                id="submit"
                type="submit"
                variant="contained"
                color="primary" // disabled={pristine || invalid}
                style={{ marginLeft: '20px' }}
              >
                SHARE
              </Button>
            </form>
          )}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateNewItem(item) {
    dispatch(updateNewItem(item));
  },
  resetNewItem() {
    dispatch(resetNewItem());
  },
  resetNewItemImage() {
    dispatch(resetNewItemImage());
  }
});

const mapStateToProps = state => {
  console.log('STATE FROM FORM>>>>', state);
  return {
    // date: state.shareItemPreview.date,
    // description: state.shareItemPreview.description,
    // imageurl: state.shareItemPreview.imageurl,
    // owner: state.shareItemPreview.owner,
    // tags: state.shareItemPreview.tags,
    // title: state.shareItemPreview.title
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ShareItemForm));
