import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  inputWrapper: {
    backgroundColor: '$primaryLightBackground',
    flexDirection: 'row',
    height: 44,
    margin: 16,
    borderRadius: 8,
    marginTop: 5,
    padding: 5,
    justifyContent: 'center',
  },
  safeArea: {
    marginTop: 20,
  },
  icon: {
    alignSelf: 'center',
    color: '$primaryDarkGray',
    marginLeft: 16,
  },
  input: {
    color: '$primaryDarkGray',
    fontSize: 14,
    flexGrow: 1,
    paddingHorizontal: 10,
  },
  closeIconButton: {
    backgroundColor: '$iconColor',
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    justifyContent: 'center',
    alignSelf: 'center',
    marginRight: 16,
  },
  closeIcon: {
    color: '$white',
    fontSize: 16,
  },
  body: {
    marginTop: 16,
    marginRight: 24,
  },
  searhItems: {
    marginHorizontal: 30,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchItemImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '$primaryGray',
  },
  searchItemText: {
    color: '$primaryDarkGray',
    marginLeft: 10,
  },
});
