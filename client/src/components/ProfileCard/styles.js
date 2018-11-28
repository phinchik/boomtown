const styles = theme => ({
  div: {
    width: '100%',
    display: 'flex'
  },
  card: {
    width: '90%',
    alignContent: 'center',
    backgroundColor: 'white',
    margin: '40px auto',
    height: '250px'
  },
  avatar: {
    width: '70px',
    height: '70px',
    marginLeft: '20px',
    marginTop: '30px'
  },
  fullname: {
    height: '50px',
    width: '200px',
    fontSize: '50px',
    marginLeft: '20px',
    color: 'rgba(0, 0, 0, 0.54)',
    marginTop: '30px'
  },
  shareItems: {
    display: 'flex'
  },
  borrowedText: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: '1.3125rem',
    fontWeight: '500'
  },
  sharedText: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: '1.3125rem',
    fontWeight: '500',
    marginRight: '20px'
  },
  media: {
    display: 'flex'
  },
  bio: {
    fontSize: '20px',
    fontWeight: '200'
  }
});
export default styles;
