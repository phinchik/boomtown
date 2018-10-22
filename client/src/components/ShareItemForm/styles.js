const styles = theme => ({
  root: {
    margin: '0',
    display: 'none'
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
  tagInput: {
    height: '100px',
    width: '100%'
  },
  headline: {
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
  }
});
export default styles;
