const RatingBook = (bookTitle => {
    let letra = bookTitle.substring(0,1).toUpperCase()
    if        (['1','6','A','F','K','P','U','Z'].indexOf(letra) !== -1) {  return '1'
    } else if (['2','7','B','G','L','Q','V'].indexOf(letra) !== -1)     {  return '2'
    } else if (['3','8','C','H','M','R','W'].indexOf(letra) !== -1)     {  return '3'
    } else if (['4','9','D','I','N','S','X'].indexOf(letra) !== -1)     {  return '4'            
    } else if (['5','0','E','J','O','T','Y'].indexOf(letra) !== -1)     {  return '5'
    } else { return '0' }
  }
)

export default RatingBook


