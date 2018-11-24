import React from 'react';
import Select from 'react-select';


const CustomSelect = ({input, options,placeholder,isMulti, name, id,helpText, meta: { touched, error, warning },}) => (

    <div>
    <Select 
         {...input}
         id={id} 
         name={name} 
         options={options}
         isMulti={isMulti}
         value={input.value}
          placeholder ={placeholder}
         clearable={false}
         onChange={(value) => input.onChange(value)}
         onBlur={() => input.onBlur()}
         onBlurResetsInput={false}
         theme={(theme) => ({
            ...theme,
            
            borderRadius: 2,
            spacing:{
                baseUnit: 3,
                controlHeight:30,
                menuGutter:5
                

            },
            colors: {
            ...theme.colors,
            },
          })}
         
    />
    { touched && error &&
        <label className="error" htmlFor={input.name}>{error}</label>
      }
  
      { helpText &&
        <span className="help-block">{helpText}</span>
      }
    </div>
)

export default CustomSelect;