const styles = theme => ({
  ShareItemForm: {},
  root: {
    border: 'none',
    width: '600px',
    height: '600px'
  },
  textField: {
    flexBasis: 200
  },
  button: {
    height: '20px',
    width: '100%'
  },
  fieldset: {
    border: 'none',
    width: '100%'
  },
  itemNameInput: {
    height: '50px',
    width: '100%'
  },
  descriptionInput: {
    height: '110px',
    width: '100%'
  },
  tagsInput: {
    width: '100%',
    fontSize: '20px'
  },
  heading: {
    fontWeight: 600,
    color: theme.palette.text.primary,
    fontSize: theme.typography.display3.fontSize,
    [theme.breakpoints.up('md')]: {
      fontSize: '50px'
    }
  },
  formControl: {
    marginBottom: theme.spacing.unit * 2,
    width: '100%'
  },
  selectImage: {
    // margin: '20px auto',
    width: '590px',
    backgroundColor: '#f9a825',
    height: '40px',
    fontSize: '25px',
    fontWeight: '300px',
    marginRight: '50px'
  }
});
export default styles;
