const SelectShelf = (getElement) => {   
  let strShelf = getElement.options[getElement.selectedIndex].value; 
  return strShelf
}

export default SelectShelf