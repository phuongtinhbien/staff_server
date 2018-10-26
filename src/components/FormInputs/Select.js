import React, {Component} from 'react';
import Select from 'react-select';


const CustomSelect = ({input, options, name, id}) => (
    <Select 
         {...input}
         id={id} 
         name={name} 
         options={options}
         value={input.value}
        
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
)

export default CustomSelect;