import React, { Component } from 'react';
import { Form, Field, FormSpy } from 'react-final-form';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import CheckBox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import { ADD_ITEM_MUTATION } from '../../apollo/queries';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import { VIEWER_QUERY } from '../../apollo/queries';
import { compose } from 'redux';
import { graphql } from 'react-apollo';
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

  saveItem(values, addItemMutation, tags) {
    console.log('thisss', values);
    // const {
    //   validity,
    //   files: [file]
    // } = this.fileInput.current;
    // if (!validity.valid || !file) return;
    // try {
    const itemData = {
      title: values.title,
      description: values.description,
      tags: this.applyTags(tags)
    };
    addItemMutation({
      variables: {
        item: itemData
        // image: file
      }
    });
    console.log(itemData);
    // } catch (e) {
    //   throw e;
    // }
  }

  render() {
    const { classes, tags, updateNewItem, addItemMutation } = this.props;
    return (
      <div className={classes.root}>
        <Typography
          component="h1"
          variant="display1"
          className={classes.heading}
        >
          Share. Borrow.<br /> Prosper.
        </Typography>
        <Form // validate={values => validate(values)}
          onSubmit={values => this.saveItem(values, addItemMutation, tags)}
          render={({ handleSubmit, invalid, pristine }) => (
            <form onSubmit={handleSubmit}>
              <FormSpy
                subscription={{ values: true }}
                component={({ values }) => {
                  // if (values) {
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
                type="submit"
                variant="contained"
                color="primary"
                style={
                  { marginLeft: '20px' } // disabled={pristine || invalid}
                }
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

const refetchQueries = [
  {
    query: VIEWER_QUERY
  }
];

const mapStateToProps = state => {
  return { imageurl: state.shareItemPreview.imageurl };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  compose(
    graphql(ADD_ITEM_MUTATION, {
      options: { refetchQueries },
      name: 'addItemMutation'
    }),
    withStyles(styles)
  )(ShareItemForm)
);
