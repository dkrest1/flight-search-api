import Select from 'react-select'


const DropDownSearch =({setSelectedOption, options, selectedOption})=>{
    const handleChange =(selectedOption)=>{
      setSelectedOption(selectedOption)
    }
    return(
      <div>
        <Select
          className='md:text-base'
          options={options}
          value={selectedOption}
          onChange={handleChange}
          isSearchable
          placeholder=''
          />
      </div>
    )
  }

  export default DropDownSearch;