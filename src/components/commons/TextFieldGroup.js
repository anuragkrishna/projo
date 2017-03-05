/*jshint esversion: 6 */

import React from 'react';
import classnames from 'classnames';

const TextFieldGroup = ({name, value, label, error, type, onChange, isItemExists}) => {
		
	return (
			<div className={classnames("field", {error:error})}>
	            <label>{label}</label>
	            <input
	              value={value}
	              onBlur={isItemExists}
	              type={type}
	              name={name}
	              placeholder={label}
	              onChange={onChange}
	              />
	              {error && <span className="ui error message">{error}</span>}
         	</div>
		);
}

TextFieldGroup.propTypes = {
	name: React.PropTypes.string.isRequired,
	value: React.PropTypes.string.isRequired,
	label: React.PropTypes.string,
	error: React.PropTypes.string,
	type: React.PropTypes.string.isRequired,
	onChange: React.PropTypes.func.isRequired,
	checkUserExists: React.PropTypes.func
}

TextFieldGroup.defaultProps = {
	type: 'text'
}

export default TextFieldGroup;