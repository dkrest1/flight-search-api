import Select from 'react-select'


const DropDownSearch =({ setSelectedOption, rubbish, options, selectedOption})=>{
    const handleChange =(selectedOption, rubbish)=>{
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